/* Ben F Rayfield offers Dagfield (DF) under opensource MIT license.
...
It computes high dimensional scalar field gradients really fast in CPU, though not as fast as GPU does in dagball,
this is for alot more data and sparse constraints such as springlike constraints or more complex NP math constraints such as SAT solving.
Incomplete code but this is gonna do high dimensional sparse gradient of scalar fields in CPU fast for few thousand variable size varying
color sphere voxels (x y z red green blue radius so 7 dimensions per voxel), or slower could do millions of dimensions
https://github.com/benrayfield/DagBall/blob/main/lib/Dagfield.js
This should be able to do any NP math such as SAT solving, springs, hinges, wheels, graphs of sum of sine waves at varying amplitude and phase,
superexponential curves, and generally any game logic you want thats timeless and frictionless.
This high dimensional sparse gradient algorithm has a bigO of numConstraints*averageNumConstraintsPerVar
which effectively is near linear of number of constraints.
*/
const DF = (()=>{
	const DF = {};
	
	DF.nextId = 1;
	
	DF.ops = [
		[//0 params
			ch=>0, //constant 0
			ch=>1, //constant 1
			ch=>2, //constant 2
			ch=>3, //constant 3
			ch=>4, //constant 4
			ch=>5, //constant 5
			ch=>-1, //constant -1
			ch=>-2, //constant -2
			ch=>-3, //constant -3
			ch=>-4, //constant -4
			ch=>-5, //constant -5
			ch=>.5, //constant .5
			ch=>-.5, //constant -.5
			ch=>Math.PI, //constant PI
			ch=>Math.E, //constant E
		],
		[//1 param
			ch=>(ch[0].pos), //identityFunc
			ch=>(-ch[0].pos),
			ch=>(1/ch[0].pos),
			ch=>(ch[0].pos**2),
			ch=>Math.sqrt(ch[0].pos),
			ch=>Math.cbrt(ch[0].pos),
			ch=>Math.sin(ch[0].pos),
			ch=>Math.cos(ch[0].pos),
			ch=>Math.tanh(ch[0].pos),
			ch=>(1/(1+Math.exp(-ch[0].pos))), //sigmoid, an affine transform of tanh.
			ch=>Math.asin(ch[0].pos),
			ch=>Math.acos(ch[0].pos),
			ch=>Math.exp(ch[0].pos),
			ch=>Math.log(ch[0].pos),
			ch=>Math.abs(ch[0].pos),
			ch=>Math.floor(ch[0].pos),
			ch=>Math.ceil(ch[0].pos),
			ch=>Math.round(ch[0].pos),
			//TODO isNaN and check for infinity and one that checks for both
			
			//get velocity. FIXME this might break the scalar field math to know the velocity ch=>(ch[0].vel),
			//get id. FIXME this might break the scalar field math to know the id ch=>(ch[0].id),
			//isLeaf return 1 or 0. FIXME this might break the scalar field math to know if the param is a leaf or not ch=>(ch[0].op?0:1),
		],
		[//2 params
			ch=>((ch[0].pos+ch[1].pos)/2),
			ch=>(ch[0].pos*ch[1].pos),
			ch=>(ch[0].pos+ch[1].pos),
			ch=>(ch[0].pos-ch[1].pos),
			ch=>(ch[0].pos/ch[1].pos),
			ch=>Math.pow(ch[0].pos,ch[1].pos),
			ch=>Math.max(ch[0].pos,ch[1].pos),
			ch=>Math.min(ch[0].pos,ch[1].pos),
		],
		[//3 params
		],
		[//4 params
			//squared 2d distance
			ch=>{
				let dx = ch[0].pos-ch[1].pos, dy = ch[2].pos-ch[3].pos;
				return dx*dx+dy*dy;
			},
		],
		[//5 params
		],
		[//6 params
			//squared 3d distance
			ch=>{
				let dx = ch[0].pos-ch[1].pos, dy = ch[2].pos-ch[3].pos, dz = ch[4].pos-ch[5].pos;
				return dx*dx+dy*dy+dz*dz;
			},
			//manhattan 3d distance
			ch=>(Math.abs(ch[0].pos-ch[1].pos)+Math.abs(ch[2].pos-ch[3].pos)+Math.abs(ch[4].pos-ch[5].pos)),
		],
		[//7 params
			//x x y y z z targetDistance, returns squared diff of that 3d distance vs targetDistance,
			//a spring constraint, though caller should probably multiply it by a number for strength/tightness/etc 
			ch=>((Math.hypot(ch[0].pos-ch[1].pos,ch[2].pos-ch[3].pos,ch[4].pos-ch[5].pos)-ch[6].pos)**2),
		],
		//TODO bring in some of the evolvable small pieces of code from audivolv, though that writes more than 1 var at a time, some parts could be reused.
	]
	
	//node, that has 1 dimension (position and velocity for it)
	//or 2 (possibly more later?) childs to do a*b Math.pow(a,b) Math.sin(a) etc on to update this.value
	let N = DF.N = function(optionalId, optionalOp, childs){
		this.id = optionalId || DF.nextId++;
		this.pos = 0; //position of this dimension in the high dimensional scalar field
		this.prevPos = 0; //prev this.pos for use during sparse gradient calculation
		this.vel = 0; //velocity of this dimension in the high dimensional scalar field
		this.velDecay = 0;
		this.gradient = 0;
		//The scalarField has as many dimensions as nodes/DF.N's, and position in that dimension is node.potenMul.
		//There are around a googolplex number of possible nodes up to a few hundred deep
		//(see x=>x*x+1 for computing number of binary forest nodes up to height x in wikibinator203,
		//though this can have more childs per node such as 0 1 2 6 7),
		//and in those googolplex number of dimensions, you can navigate a surface area of a googolplexian
		//which contains all the possible scalarFields that this system can represent,
		//though practically you can only explore as many of them as fits in memory.
		//You can dotProduct scalarFields with eachother by dotProducting their potenMuls,
		//though for that not to have exploding/vanishing/NaN/etc should probably
		//norm 1000*tanh(node.pos/1000) andOr weightedSum of many potenMul*pos etc (TODO).
		this.potenMul = 0;
		//should be null if this is an input node, nonnull if childs exist. Js lambda that takes childs array as param and returns number.
		this.op = optionalOp || null;
		this.ch = childs;
		this.parents = [];
		this.deepParents = null;
		for(let child of childs){
			child.addParent(this);
		}
	};
	
	N.prototype.sortParents = function(){
		throw new Error('TODO sort by ascending node.id');
	};
	
	//caller should do updateDeepParents some time after this
	N.prototype.addParent = function(parent){
		if(this.parents.indexOf(parent) == -1){
			this.parents.push(parent);
			this.sortParents();
		}
	};
	
	//caller should do updateDeepParents some time after this
	N.prototype.removeParent = function(parent){
		this.parents = this.parents.filter(x=>(x!==parent));
	};
	
	//updates this.deepParents based on node.parents recursively, to whatever is reachable along parent ptrs, but not downward reachable from there to other nodes.
	//Its a traversal of node.parents recursively and sorted by node.id. since each node.parents list stays sorted by ascending parentNode.id,
	//this might (TODO) be efficiently computable without a sort at the end,
	//or the simpler way though slower would be to use a Set of nodes then copy to list and sort them.
	//You can compute this once for relevant or all nodes whenever the forest shape changes then do lots of gradient calculations
	//without computing this again, replacing node.pos andOr node.vel with chosen values and keep computing updated high dimensional gradients,
	//reusing the deepParents lists (1 deepParents list per input node, none per internal node).
	N.prototype.updateDeepParents = function(){
		throw new Error('TODO');
	};
	
	N.prototype.updatePosFromDirectChilds = function(){
		if(this.op){
			//this.pos = this.op(this.ch[0].pos,this.ch[1].pos);
			//this.op must be one of DF.ops[this.ch.length] to match the number of params,
			//though technically the op could have less params than the childs list that would create waste in deepParents etc.
			this.pos = this.op(this.ch);
		}
		return this.pos;
	};
	
	N.prototype.doPhysics = function(dt){
		let nextPos = this.pos+dt*this.vel;
		let nextVel = this.vel*Math.exp(-dt*this.velDecay)-dt*this.gradient;
		this.pos = nextPos;
		this.vel = nextVel;
	};
	
	DF.epsilon = .0001;
	
	//nodes should be a list of DF.N/nodes sorted ascending by node.id.
	//This does not update parents or deepParents list. Caller should have done that some time since the forest shape last changed.
	DF.stepAOfUpdateGradient = function(nodes){
		for(let node of nodes){
			node.updatePosFromDirectChilds();
			node.prevPos = node.pos;
			node.gradient = 0;
		}
	};
	
	DF.stepBOfUpdateGradient = function(nodes){
		for(let node of nodes){
			if(!node.op){ //only input nodes
				node.stepBOfUpdateGradient();
			}
		}
	};
	
	//returns the scalar from the scalarField defined in the nodes list, the total potentialEnergy at the high dimensional position of the inputs param.
	//Inputs overwrites the node.pos of the first inputs.length nodes which is where you should put the inputs,
	//though technically this could be generalized by checking which node is input by isInput=!node.op.
	//It then loops over all nodes updating pos, and not computing gradients, summing node.pos*node.potenMul.
	DF.computeForward = function(nodes, ...inputs){
		let sum = 0;
		for(let i=0; i<inputs.length; i++){
			nodes[i].pos = inputs[i];
		}
		for(let i=inputs.length; i<nodes.length; i++){
			sum += nodes[i].pos*nodes[i].potenMul;
		}
		return sum;
	};
	
	//length of a scalarField as a vector. This is a sparse vector in a googolplex number of dimensions.
	DF.len = function(nodes){
		let sumOfSquares = 0;
		for(let node of nodes){
			sumOfSquares += node.potenMul*node.potenMul;
		}
		return Math.sqrt(sumOfSquares);
	};
	
	//dotProduct between 2 scalarFields, not by their contents but by the dimensions of forest of math ops they use to compute potentialEnergy aka scalar.
	DF.dotProd = function(nodesA, nodesB){
		throw new Error('Match nodes by forest shape and include potenMul as part of the forest shape so different vectors (each defines a NP math quality scalarField) are different nodes and dedup correctly. Use a hashtable whose low half is linked lists and whose high half is first node per hashtable bucket');
	};
	
	//TODO funcs to update forest shape and compute all the gradient at once which gets stored in node.gradient
	
	//this.prevPos and this.pos should already have been updated by the normal update process running thru all nonleaf/noninput nodes in order of id once.
	//You then call this on each input node, or any set of input nodes in any order. It leaves everything the same except this.gradient is updated.
	//Caller should have called this.updateDeepParents() some time before this, though you can compute many gradients without updating deepParents again
	//since it only needs to be updated when and where forest shape changes.
	//Updates and returns this.gradient, but it will likely be the wrong gradient if stepA was not done first.
	N.prototype.stepBOfUpdateGradient = function(){
		if(!this.deepParents){
			throw new Error('Theres no deepParents. This should only be called from input node.')
		}
		this.prevPos = this.pos;
		let epsilon = DF.epsilon;
		this.pos += epsilon;
		let potenSumWithoutPlusEpsilon = 0;
		let potenSumWithPlusEpsilon = 0;
		for(let node of this.deepParents){
			potenSumWithoutPlusEpsilon += node.pos*node.potenMul;
			node.updatePosFromDirectChilds();
			potenSumWithPlusEpsilon += node.pos*node.potenMul;
		}
		for(let node of this.deepParents){ //undo the temp mutable changes to the other nodes in case theyre shared with other nodes in the forest.
			node.pos = node.prevPos;
		}
		this.pos = this.prevPos;
		return this.gradient = (potenSumWithPlusEpsilon-potenSumWithoutPlusEpsilon)/epsilon;
	};
	
	//voxel made of 7 dimensions
	let V = DF.V = function(x, y, z, red, green, blue, radius){
		this.x = x;
		this.y = y;
		this.z = z;
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.radius = radius;
	};
	
	
	return DF;
})();
console.log('Dagfield.js, DF = '+DF);