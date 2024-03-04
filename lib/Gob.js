/*Ben F Rayfield offers Gob.js/GB under opensource MIT license.
...
Im merging object types in Dagball into Gob (Game OBject). Each Gob is 1 dimension with a position/p and velocity/v,
and theres dp dv kv ap av zp zv number vars that are added to, min, or max (order invariant) once per physics cycle per
query to select gobs and run a rule on them
Rules can in theory turn other rules on/off using the same physics as runs newtonian gravity, SAT solving, waves, etc,
since a rule is a gob too, and rule.p is its position (aka influence), what potentialEnergy is multiplied by.
*/
//var Sm=null, SelFn=null, RulFn=null, Gb=null, B=null, C=null, D=null, E=null, F=null, G=null, H=null, I=null, Maxdist=4, Infl=1; //used by generated code
const GB = (()=>{
	let GB = {};
	
	let Gob = GB.Gob = function(sim, optionalP, optionalV){
		//TODO this.autoincId like in DF.N.id? Or is that unnecessary cuz of using just 2 levels
		//of (SelectorFunc ..numbersAndGobs.. RuleFunc) SelectorFunc and RuleFunc instead of a variable depth forest?
		
		//this.mutid = optionalMutid || dagball.nextGobId();
		//this.rule = null; //If this gob is a (SelectorFunc ..numbersAndGobs.. RuleFunc) then this.p is its potenMul_aka_influence
		//this.pic = optionalPic || dagball.randomGobPic();
		//this.e.x.p is x position. this.e.y.p is y position. .z.p .radius.p .red.p .green.p .blue.p etc, though theyre all optional and this.e may be empty.
		//FIXME should mutid go in gob.mutid instead of gob.w.mutid?
		//Should mutids start with $ like $aFRG3456755, and if the first $ is after something like DV$dfgdrf544566d then its a DV/Dagverse id,
		//but that prefix being empty string is this. (thebEachcNearxy $dfg4345df 3.45 (...))
		//
		//Anything thats not a Gob goes in here, such as these keys: mutid, selFn, rulFn, pic, circ, ball, etc.
		//lazy filled by this.W
		this.w = {};
		
		//this.e = {}; //js {} map of varName to Gob, TODO prefill by (SelectorFunc ..numbersAndGobs.. RuleFunc)
		//lazy filled by this.M('varName') which starts as another Gob
		this.m = {};
		
		//this.w.rule (or caller of it?) should set global vars B C D MaxDist Infl etc, and set Infl to this.p (position of this dimension).
		//If this.p is 0 (0 potenMul_aka_influence) then dont run this.w.rule, especially cuz some rules are a hard 0 vs nonzero and affect ap zp av andOr zv
		//which are impulse/min/max instead of gradient or diffeq.
		
		this.p = optionalP!==undefined ? optionalP : 0; //position in this dimension
		this.v = optionalV!==undefined ? optionalV : 0; //velocity in this dimension
		
		//Order invariant (of rule updates, except roundoff) temp vars for updating this.p and this.v
		this.dp = this.dv = this.kv = 0; //dp is change of p per time. dv is change of v per time. kv is decay of v per time.
		this.ap = this.av = -Infinity; //impulse min.
		this.zp = this.zv = Infinity; //impulse max.
		
		//1 dimensions gradient of high dimensional scalarField defined by the poten func in the lisplike game scripting language
		//(poten (/ 1 (+ .01 dist)) for example, if dist is a var defined earlier.
		this.gr = 0; //this.gradient = 0;
		
		//TODO gob.lock = true or false, to prevent changing of p and v, like to lock a circ in a certain x y and radius?
		//If this.lock then this.doPhysics(dt) does nothing, does not update this.p and this.v
		this.lock = false;
		//list of gobs. childs for this.w.selFn (which calls this.w.rulFn)
		//which is a (SelectorFunc ..numbersAndGobs.. RuleFunc) if exists, and this is the numbersAndGobs part
		this.ch = [];

		//for Octree. Cache of this.m.x.p if this.m.x exists, else 0. Used in Octree.
		//FIXME for gobs that have no x y z r fields (like they are themself a field of a gob),
		//that could cause alot of gobs to be at (0,0,0) in octree which for some rules could get to be very very slow.
		//TODO update this in gob.doPhysics(dt), remove from this.sim.oct, change ox oy oz or, then add back.
		//Since these are only a cache, dont include them in toMap/toJSON/etc,
		//though they could in theory get out of sync if used with buggy code that writes .p and .v directly, but not from correct code.
		//Must be in range DB.outerBounds which is a 2**16 cube centered at (0,0,0), and it can be on the low border but high border is exclusive.
		//Each 1.0 distance in dagball is around 100 pixels at normal zoom, though zoom can extremely vary, so 2**16 is about 6553600 pixels
		//across sparsely, is big enough for a massively multiplayer game to be played in an opensource peer to peer network,
		//though big positions might run into precision problems with the GPU code which uses float32 instead of float64,
		//but for those we can simply use a smaller area closer to (0,0,0) or offset it before and after handing it to GPU, TODO to be explored.
		//In such a peer to peer network, each computer would only simulate near gobs, a few thousand of them maybe,
		//and sync them with gob.p and gob.v (most or all of the other number vars are caches and temp vars).
		this.ox = 0;
		this.oy = 0;
		this.oz = 0;
		this.or = 0;
		this.sim = sim;
		//sim.gobs.add(this);
		sim.oct.add(this);
	};

	//x. For octree each gob can be viewed as having x y z r, and its 0 for whichever of those fields dont exist.
	Gob.prototype.x = function(){
		let field = this.m.x;
		return field ? field.p : 0;
	};

	//y. For octree each gob can be viewed as having x y z r, and its 0 for whichever of those fields dont exist.
	Gob.prototype.y = function(){
		let field = this.m.y;
		return field ? field.p : 0;
	};

	//z. For octree each gob can be viewed as having x y z r, and its 0 for whichever of those fields dont exist.
	Gob.prototype.z = function(){
		let field = this.m.z;
		return field ? field.p : 0;
	};

	//radius. For octree each gob can be viewed as having x y z r, and its 0 for whichever of those fields dont exist.
	Gob.prototype.r = function(){
		let field = this.m.r;
		return field ? field.p : 0;
	};

	//[minX,maxXExcl,minY,maxYExcl,minZ,maxZExcl]. A 2**16 cube centered at (0,0,0).
	GB.outerBounds = [-(2**15), 2**15, -(2**15), 2**15, -(2**15), 2**15];

	GB.maxOctreeDepth = 24;

	//max Octree.gobs.size() before expanding deeper, but wont expand deeper than GB.maxOctreeDepth and will just make the Set ever bigger if so.
	GB.maxGobsPerOctreeNodeIf = 10;
	
	//namespace is a small string that starts with '$'. Each sim is a high dimensional vector with various other objects
	//you might call the names of the dimensions though those objects are often big and complex such as a RBM neuralnet layer goes in dagball.Circ.nn sometimes.
	let Sim = GB.Sim = function(namespace){
		this.ns = namespace;
		//TODO 2d or 3d datastruct instead of list. Maybe use a 3d dagball.processGobsWithRule once per physics cycle that they all share,
		//though that could be a problem if their distance constraints are very different.
		//Or maybe make 1 of each maxdist the rule says (which will be a gob.p) so those that share the same maxdist can share the same location hashing.
		//this.gobs = new Set();
		this.oct = new GB.Octree(GB.outerBounds);
	};

	//contains gobs using gob.x() gob.y() gob.z(), so before changing those (by dp dv kv ap av zp zv or gradient) remove remove from octree, change them, then add.
	//So TODO gob.doPhysics(dt) should do that at gob.sim.oct.
	let Octree = GB.Octree = function(bounds){
		this.bounds = bounds;
		this.size = 0; //number of gobs contained. Must update along the whole log length path from octree root whenever adding or removing a gob.
		this.ch = [null,null,null,null,null,null,null,null];
		this.gobs = new Set();
	};

	Octree.prototype.add = function(gob){
		throw new Error('TODO');
	};

	Octree.prototype.rem = function(gob){
		throw new Error('TODO');
	};

	//for(let foundGob of this.inMe()) rule(foundGob);
	Gob.prototype.inMe = function*(){
		yield* this.sim.oct.inSphere(this);
	};

	//for(let [foundGobA,foundGobB] of this.nearPairsInMe(3.45)) rule(foundGobA,foundGobB);
	//only includes pairs of gobs whose centers are both in me and are within that distance of eachother.
	Gob.prototype.nearPairsInMe = function*(maxDist){
		throw new Error('TODO');
	};

	Gob.prototype.oBounds = function(){
		return [this.ox-this.or, this.ox+this.or, this.oy-this.or, this.oy+this.or, this.oz-this.or, this.oz+this.or];
	};

	//is foundGobs center within sphere of this ox oy oz or.
	Gob.prototype.oContains = function(foundGob){
		let dx = foundGob.ox - this.ox;
		let dy = foundGob.oy - this.oy;
		let dz = foundGob.oz - this.oz;
		let distSq = dx*dx + dy*dy + dz*dz;
		return distSq <= this.or*this.or;
	};

	//Loops over all gobs in that sphere (using gob.ox gob.oy gob.oz and gob.or as radius), including all gobs whose centers are within the param sphere.
	//for(let foundGob of octree.inSphere(inGob) rule(foundGob);
	Octree.prototype.inSphere = function*(sphere){
		for(let foundGobInCube of this.inBounds(sphere.oBounds()){
			if(sphere.oContains(foundGobInCube)){
				yield foundGobInCube;
			}
		}
	};

	//minX maxXExcl, does not touch maxXExcl to maxXExcl+positiveNumber. [minX,maxXExcl,minY,maxYExcl,minZ,maxZExcl].
	DB.boundsTouchesBounds = function(boundsA, boundsB){
		//FIXME verify this generated code works...
		return boundsA[0] < boundsB[1] &&
			boundsA[1] > boundsB[0] &&

			boundsA[2] < boundsB[3] &&
			boundsA[3] > boundsB[2] &&

			boundsA[4] < boundsB[5] &&
			boundsA[5] > boundsB[4];
	};

	//iterator of gobs in bounds like GB.outerBounds or any 3d rectangle inside it (no rotation).
	Octree.prototype.inBounds = function*(xxyyzz){
		throw new Error('TODO');
	};

	Octree.prototype.Ch = function(i){
		//FIXME return this.ch[i] || (this.ch[i] = new GB.Octree());
		throw new Error('TODO lazyEval child if needed');
		return this.ch[i];
	};
	
	//if this.p is nonzero and theres this.w.selFn (a selector function, a query to select gobs to run this.w.rulFn on) then runs it.
	Gob.prototype.doRule = function(){
		Infl = this.p;
		SelFn = this.w.selFn;
		if(Infl && SelFn){ //this.p is like dagball.Circ.influence. If its 0, this rule has no effect. If its 1 the rule has a normal amount of effect.
			RulFn = this.w.rulFn;
			Sim = this.sim;
			//All theb thec thed thee (as in thebThecEachdNearxyzr etc) must be first in B C D E F G H I, so loop vars can come later and not interfere here.
			switch(this.ch.length){
				case 8:
					I = this.ch[7];
				case 7:
					H = this.ch[6];
				case 6:
					G = this.ch[5];
				case 5:
					F = this.ch[4];
				case 4:
					E = this.ch[3];
				case 3:
					D = this.ch[2];
				case 2:
					C = this.ch[1];
				case 1:
					B = this.ch[0];
				default:
			}
			//FIXME how should they call eachother? They use B C D E F G H I (however many params, loops in loops, etc there are) and Maxdist Infl etc, global vars.
			//SelFn(this.sim,RulFn);
			//reads Sim.gobs, RulFn, B C D E F G H I, Maxdist, Infl, or whichever of those it needs.
			//writes whichever of B C D E F G H I (after those set above) if any of them are used as loop vars,
			//looping over the Gobs selected by the SelFn as a query, and calling RulFn() each time which uses B C D E F G H I etc.
			SelFn();
		}
	};
	
	/*GB.newSelFn = code=>{
		throw new Error('TODO');
	};
	
	GB.newRulFn = code=>{
		throw new Error('TODO');
	};*/
	
	GB.cachedJsEval_ = {};
	
	
	
	//returns a js lambda whose toString is the code to eval to generate it,
	//though if it evals to something other than a lambda, putting that in it might be a problem.
	//Example: GB.cachedJsEval('(x,y)=>Math.sqrt(x*x+y*y)')(6,8) returns 10,
	//and GB.cachedJsEval('(x,y)=>Math.sqrt(x*x+y*y)')+'' returns '(x,y)=>Math.sqrt(x*x+y*y)'
	GB.cachedJsEval = code=>{
		//let prefix = 'js:';
		//if(code.startsWith(prefix)){
		//	code = code.substring(prefix.length);
		//}
		let ret = GB.cachedJsEval_[code];
		if(ret === undefined){
			ret = GB.cachedJsEval_[code] = eval(code);
			const CODE = code;
			ret.toString = ()=>CODE;
		}
		return ret;
	};

	GB.selFns = {
		thebNearxyzrEachc: GB.cachedJsEval(
`gob=>{ //(thebNearxyzrEachc s$3456 3.1 //the B each C, where xyz distance + the 2 radiuses <= 3.1
	let infl = gob.p;
	let rulFn = gob.w.rulFn;
	let b = gob.ch[0];
	//let maxdist = gob.ch[1].p, //FIXME should it give the gob whose gob.p is the maxdist?
	//let 
	//FIXME since maxdist is part of selFn and rulFn doesnt need it, but its affecting which var index goes into rulFn, what do I do?
	for(let c of gob.sim.gobs){
		if(b.isNearxyzr(c, 3.1))
		rulFn(infl, b, c);
	}
}`,
		),
	};

	/*TODO theres 2 kinds of maxdistance:
		-- that a rule only applies inside a certain gob (normally a wrapper of a dagball.Circ, that the rule applies to gobs whose centers are within that x y radius,
			or maybe more generally within x y z radius), and within that further select,
			but I might want some rules that only apply between gobs inside circA and gobs inside circB.
			Maybe I should generalize that to INSIDE3D and OUTSIDE3D, but i might want within the INSIDE a varying amount of influence a smooth window.
			Maybe I should do general math expr involving the insideness of given smoothWindowedSpheres, using b*c for AND, (1-(1-b)*(1-c)) for OR, etc (or maybe min and max?).
			That would be a more flexible way to select them but alot harder to optimize, and I might not be able to optimize it well enough to make the game run practically fast.
		-- After 1 area is selected, max 2d or 3d distance between certain pairs of gobs within it.

		
	
	*/
	
	GB.exampleSelFnCodes = [
		//FIXME make their toString return the code that generated them, in the lisplike game scripting language I made
		`//all gobs
		for(A of Sm.gobs) RulFn();`,
		
		/*FIXME how does RulFn() see A and B which are also global vars? No, it appears to work...
		RulFn = ()=>(A+B);
		()=>(A+B)
		for(A of [2,3,4]) for(B of [100,200,300]) RulFn();
		304
		*/
		`//all pairs
		for(A of Sm.gobs) for(B of Sm.gobs) RulFn();`,
		
		//TODO use dagball.processGobsWithRule = function(gobs, maxDistance, rule, dt) for those with distance constraints,
		//andOr have the circs (wrapped in gob) remember whats near them?
		//Share a processGobsWithRule between all SelFns in the same physics cycle that have the same Maxdist andOr within same circs radius
		
		//TODO thebEachcNearxyzr `for(A of Sm.gobs) for(B of Sm.gobs) RulFn();`,
		
	];
	
	GB.exampleRulFnCodes = [
		//FIXME make their toString return the code that generated them, in the lisplike game scripting language I made
		
		`(do //newtonian gravity, slightly adjusted to never divide by 0
			(= dy (- yCp yBp))
			(= dx (- xCp xBp))
			(= distSq (+ (sq dy) (sq dx)))
			(if distSq (do
				(= dist (sqrt distSq))
				//(+= poten (/ -1 (+ .01 dist)))
				(poten (/ -1 (+ .01 dist))) //adds to potentialEnergy
			))
		)`,
		
		
	];
	
	/*dagball.processGobsWithRule = function(gobs, maxDistance, rule, dt){
		function createGrid(maxDist){
			return {
				maxDist: maxDist,
				cells: {,
				insert: function(gob){
					const xKey = Math.floor(gob.e.x.p / maxDist);
					const yKey = Math.floor(gob.e.y.p / maxDist);
					const key = `${xKey},${yKey}`;
	
					if (!this.cells[key]){
						this.cells[key] = [];
					}
	
					this.cells[key].push(gob);
				},
				getNearby: function(gob){
					const xKey = Math.floor(gob.e.x.p / maxDist);
					const yKey = Math.floor(gob.e.y.p / maxDist);
					const nearby = [];
	
					for (let x = xKey - 1; x <= xKey + 1; x++){
						for (let y = yKey - 1; y <= yKey + 1; y++){
							const key = `${x},${y}`;
							if (this.cells[key]){
								nearby.push(...this.cells[key]);
							}
						}
					}
	
					//return nearby.filter(otherGob => gob !== otherGob);
					return nearby; //allow self edges
				}
			};
		}
	
		const grid = createGrid(maxDistance);
	
		gobs.forEach(gob => grid.insert(gob));
	
		gobs.forEach(gob => {
			const nearbyGobs = grid.getNearby(gob);
			nearbyGobs.forEach(otherGob => {
				const dx = gob.e.x.p - otherGob.e.x.p;
				const dy = gob.e.y.p - otherGob.e.y.p;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist <= maxDistance){
					rule(gob, otherGob, dt);
				}
			});
		});
	};
	*/
	
	//lazyEvals this.w[key] and sets it to optionalDefaultVal if it doesnt exist. optionalDefaultVal is normally not a Gob. Its anything.
	Gob.prototype.W = function(key,optionalDefaultVal){
		return this.w[key] || (this.w[key] = optionalDefaultVal); //TODO throw if needs optionalDefaultVal but doesnt have it?
	};
	
	//lazyEvals a Gob at a chosen var name in this.m
	Gob.prototype.M = function(key,optionalDefaultP,optionalDefaultV){
		return this.m[key] || (this.m[key] = this.sim.newGob(optionalDefaultP,optionalDefaultV));
	};
	
	Gob.prototype.toMap = function(skipNorm){
		let ret = {
			p: this.p,
			v: this.v,
			type: this.type,
			m: {},
		};
		let big = false;
		if(this.dp){
			ret.dp = this.dp;
			big = true;
		}
		if(this.dv){
			ret.dv = this.dv;
			big = true;
		}
		if(this.kv){
			ret.kv = this.kv;
			big = true;
		}
		if(this.ap !== -Infinity){
			ret.ap = this.ap;
			big = true;
		}
		if(this.av !== -Infinity){
			ret.av = this.av;
			big = true;
		}
		if(this.zp !== Infinity){
			ret.zp = this.zp;
			big = true;
		}
		if(this.zv !== Infinity){
			ret.zv = this.zv;
			big = true;
		}
		//TODO this.w
		//TODO this.m. go deep into those since they're a tree, not a forest, are my fields.
		//TODO this.ch but dont go deep into those.
		for(let key in this.m){
			let mChild = this.m[key];
			ret.m[key] = mChild.toMap(true);
			big = true;
		}
		if(!big){
			return [this.p,this.v];
		}
		if(!skipNorm){
			ret = DV.normOb(ret); //reorder map keys to be sorted, etc.
		}
		return ret;
	};
	
	//a {} map like made by Gob.toMap(), but FIXME what about the w.map
	GB.Sim.prototype.mapToGob = function(map){
		let gob = this.newGob();
		if(map.length){
			gob.p = map[0];
			gob.v = map[1];
		}else{
			gob.p = map.p;
			gob.v = map.v;
			if(map.dp !== undefined) ret.dp = map.dp;
			if(map.dv !== undefined) ret.dv = map.dv;
			if(map.kv !== undefined) ret.kv = map.kv;
			if(map.ap !== undefined) ret.ap = map.ap;
			if(map.av !== undefined) ret.av = map.av;
			if(map.zp !== undefined) ret.zp = map.zp;
			if(map.zv !== undefined) ret.zv = map.zv;
			//FIXME look up map.ch/gob.ch childs by mutid, cuz cant store them cuz that can be dag, unlike gob.m which is its own fields.
			for(let key in map.m){
				let mChild = map.m[key];
				gob.m[key] = this.mapToGob(mChild);
			}
		}
		return gob;
	};
	
	//updates this.p and this.v based on this.dp dv kv ap zp av zv gradient and lock.
	//Resets dp dv kv ap zp av zv and gradient back to their defaults which are all 0, -Infinity, or Infinity.
	Gob.prototype.doPhysics = function(dt){
		if(!this.lock){
			let nextP = this.p+dt*this.v;
			let nextV = this.v*Math.exp(-dt*this.velDecay)-dt*this.gradient;
			if(this.ap <= this.zp){
				nextPos = Math.max(this.ap, Math.min(nextPos, this.zp));
			}
			if(this.av <= this.zv){
				nextV = Math.max(this.av, Math.min(nextV, this.zv));
			}

			this.p = nextP;
			this.v = nextV;
			
			//for next physics cycle
			this.dp = this.dv = this.kv = 0;
			this.ap = this.av = -Infinity;
			this.zp = this.zv = Infinity;
		}
	};

	//Removes this from this.sim.oct, updates this.ox .oy .oz and .or, then adds back into this.sim.oct.
	Gob.prototype.updateOctree = function(){
		this.sim.oct.rem(this);
		this.ox = this.x();
		this.oy = this.y();
		this.oz = this.z();
		this.or = this.r();
		this.sim.oct.add(this);
	};
	
	//toJSON func is automatically called if in a Proxy
	Gob.prototype.toJSON = function(){
		return DV.normedObToJson(this.toMap());
	};
	
	Gob.prototype.toString = function(){
		return this.toJSON();
	};
	
	GB.sim = new GB.Sim('$testNs'); //a default sim to get started fast
	
	Sim.prototype.newGob = function(optionalP,optionalV){
		return new GB.Gob(this,optionalP,optionalV);
	};
	
	Sim.prototype.gobsList = function(){
		return [...(this.gobs)];
	};
	
	Sim.prototype.wrap = function(wKey, wVal){
		let gob = new GB.Gob(this);
		gob.w[wKey] = wVal;
		gob.p = 1; //influence_and_potenMul
		return gob;
	};
	
	Gob.prototype.type = 'gob';
	
	//contents of params are all gobs. If you want a number param, use params[n].p aka position in that dimension.
	//TODO selFn and rulFn are js lambdas whose toString returns the code which was evaled to return them.
	Sim.prototype.newRuleGob = function(selFn, rulFn, ...params){
		let gob = new GB.Gob(this);
		gob.w.selFn = selFn;
		gob.w.rulFn = rulFn;
		gob.ch = params;
		gob.p = 1; //influence_and_potenMul
		return gob;
	};
	
	//wraps a wikibinator203 (or later version?) universal-pattern-calculus-combinator that is also a js lambda.
	//you have to include Wikibinator203VM.js, for example, though it might be a later version when I get around to including it.
	Sim.prototype.newWikibGob = function(wikibFn){
		return this.wrap('wikib',wikibFn);
	};
	
	//wraps a dagball.Circ
	Sim.prototype.newCircGob = function(circ){
		throw new Error('TODO');
	};
	
	//wraps a dagball.Ball
	Sim.prototype.newBallGob = function(ball){
		throw new Error('TODO');
	};
	
	//a dagball.Bloomtree andOr Bitpic (TODO choose which, Bitpic normally contains Bloomtree when stored, and mutable bytes when in use),
	//but in terms of gobs it should come in more pieces (Bloomtree is already a sparse datastruct).
	Sim.prototype.newWallGob = function(wall){
		return this.wrap('wall',wall);
	};
	
	//wraps a checkbox option in dagball, though the actual checkbox is not stored here, todo hook it into dagball.chk(name)?
	Sim.prototype.newChkOptionGob = function(chk){
		throw new Error('TODO');
	};
	
	//wraps a numberbox option in dagball, though the actual numberbox is not stored here, todo hook it into dagball.num(name)?
	Sim.prototype.newNumOptionGob = function(num){
		throw new Error('TODO');
	};
	
	//Pubkeys are user accts.
	//param  is TODO which of these?... the string form vs a DV/Dagverse.js publickey object
	//(did i change that to just 'ED$thenbase64digitsofthe32bytes? i think so, todo look around for various implementations)')
	Sim.prototype.newPubkeyGob = function(pubkey){
		return this.wrap('pubkey',pubkey);
	};
	
	/*
	`(eachTheNearxyzr B C 3.1 (do //each B the C, where xyz distance + the 2 radiuses <= 3.1
		TODO
	))
	`,
	
	`(theTheThe B C D (do //the B the C the D
		TODO
	))
	`,
	
	`(eachEachNearxy B C 5.67 (do //each pair of B C within 5.67 of eachother in x y not counting radiuses
		TODO
	))
	`,
	
	/*`(do
		(eachTheNearxyzr B C 3.1 (do //each B the C, where xyz distance + the 2 radiuses <= 3.1
			TODO
		))
		(theTheThe B C D (do //the B the C the D
			TODO
		))
		(eachEachNearxy B C 5.67 (do //each pair of B C within 5.67 of eachother in x y not counting radiuses
			TODO
		))
		(eachEachNearxy B C 4 (do //newtonian gravity, slightly adjusted to never divide by 0
			(= dy (- yCp yBp))
			(= dx (- xCp xBp))
			(= distSq (+ (sq dy) (sq dx)))
			(if distSq (do
				(= dist (sqrt distSq))
				(= normDy (/ dy dist))
				(= normDx (/ dx dist))
				(= force (/ .001 (+ .01 distSq)))
				(= addY (* force normDy .5))
				(= addX (* force normDx .5))
				(-= yCdv addY)
				(+= yBdv addY)
				(-= xCdv addX)
				(+= xBdv addX)
			))
		))
	)
	`,*
	
	(do
		(thebEachcNearxyzr s$3456 3.1 //the B each C, where xyz distance + the 2 radiuses <= 3.1
			TODO
		)
		(thebThecThed s$3 s$156 s$9893 //the B the C the D
			TODO
		)
		//TODO generate code that calls dagball.processGobsWithRule = function(gobs, maxDistance, rule, dt)
		(eachbEachcNearxy 5.67 //each pair of B C within 5.67 of eachother in x y not counting radiuses
			TODO
		)
		(eachbEachcNearxy 4 //newtonian gravity, slightly adjusted to never divide by 0
			(= dy (- yCp yBp))
			(= dx (- xCp xBp))
			(= distSq (+ (sq dy) (sq dx)))
			(if distSq (do
				(= dist (sqrt distSq))
				(= normDy (/ dy dist))
				(= normDx (/ dx dist))
				(= force (/ .001 (+ .01 distSq)))
				(= addY (* force normDy .5))
				(= addX (* force normDx .5))
				(-= yCdv addY)
				(+= yBdv addY)
				(-= xCdv addX)
				(+= xBdv addX)
			))
		)
	)
	`,
	
	//TODO anything that names specific nodes (gob, DF.N, etc, but lets just make them all be gobs and merge those...)
	//should be in parents list of it, instead of the main list, or at least if its a sparseScalarField kind for gradient
	//but maybe not if its a a diffeq/minmaximpulse kind? The DF/dagfield.js system is for sparse high dimensional gradients
	//and TODO should be merged with the variable number and varnames of fields in gobs as in C.e.manaRefillRate.p aka manaRefillRateCp.
	To generalize this, add a global poten var.
	(eachbEachcNearxy 4
		(= dy (- yCp yBp))
		(= dx (- xCp xBp))
		(= distSq (+ (sq dy) (sq dx)))
		(if distSq (do
			(= dist (sqrt distSq))
			//(+= poten (/ -1 (+ .01 dist)))
			(poten (/ -1 (+ .01 dist))) //adds to potentialEnergy
		))
	)
	Yes, that makes sense, merges the lisplike game language, diffeqs/minmaximpuls, and scalarField math.
	BUT if theres loops adding to poten, its likely to lose the benefit of being a sparse high dimensional scalarField.
	Still, could use it with thebThecThed and thebEachcNearxyzr etc.
	How would thebEachcNearxyzr work for the eachcNearxyzr part?
			
	Remember, each of these gameRules exists or it doesnt, and for poten rules (no diffeq/etc) their existence can be gradual (.influence).
	The diffeq part could be gradual. But how would minmaximpulse be gradual?
	
	
	Make each (...) list, or just some of them right inside a thebEachcNearxy etc, be compiled to a js lambda,
	like (poten (/ -1 (+ .01 dist))) could be a js lambda,
	and (do (= lifeBp (rnd)) (= manaBp (rnd))) could be a js lambda so it could be reused like
	(theb s$4564 theLifeManaRandomizer#(do (= lifeBp (rnd)) (= manaBp (rnd))))
	(theb s$9871 theLifeManaRandomizer)
	Set influence of both of those to 1 to make them exist, set to 0 to make them not exist.
	In the tree replace s$4564 with the gob whose mutid is that, and in thebEachc have a slot in the tree for replacing c?
	Or simply, have global vars called B C D E F G H I which are gobs, and all such funcs.
	(influence SelectorFunc ..numbersAndGobs.. RuleFunc)
	(influence SelectorFunc ..numbersAndGobs.. RuleFunc)
	(1 theb s$6453 (do (= lifeBp (rnd)) (= manaBp (rnd))))
	(0 theb s$6453 (do (= lifeBp (rnd)) (= manaBp (rnd))))
	"influence" is the "missing var in algebra" thats similar to opencogTruthvalue but in a potentialEnergy way so not exactly.
	That first var such as 1 in (1 theb s$6453 RuleFunc) is influence.
	In DF/Dagfield.js i was about to change node.potenMul to be a node (with a base case of a literal {pos:1} maybe)
	when I started merging this loop stuff in so it could also do rockPaperScissors gobs like in those videos i made 2024-3.
	Getting back to potenMul_aka_influence becoming a node,
	how should that be written, and what data structure, in this?
	(1 theb s$6453 (do (= lifeBp (rnd)) (= manaBp (rnd))))
	(HOWDOESTHISBECOMEANODE? theb s$6453 (do (= lifeBp (rnd)) (= manaBp (rnd))))
	(s$73443 theb s$6453 (do (= lifeBp (rnd)) (= manaBp (rnd)))) but where does the influence var go, s$73443.e.influence.p?
	Consider that gob.e has varying number and different varnames of its fields, that each have p v dp dv kv minp maxp minv maxv.
	If each (SelectorFunc ..numbersAndGobs.. RuleFunc) is a dim, is it a gob or a field in a gob?
	This can be figured out by putting a thebThec where B is another rules influence var and C is a gob
	and add to the influence something from the gobs fields, a rule that turns another rule on/off (or gradually between)
	depending on a specific gob.
	Make influence (or just call it Infl) be a global var: B C D E F G H I Maxdist Infl, that SelectorFuncs and RuleFuncs read and write.
	B..I are gobs, or possibly dims. Maxdist and Infl are numbers. Infl is the number of the current influence
	of the current (SelectorFunc ..numbersAndGobs.. RuleFunc). Infl must have gradient computed on it the same as any other dim,
	though im unsure if the Infl child of a (InflNode SelectorFunc ..numbersAndGobs.. RuleFunc)
	should be 1 dim vs a gob as a sparse set of dims.
	Maybe gob should be both, have the vars for a single dim AND .e as a js {} of string to gob.
	Fixme dont name clash with wikibinator203 as some html files set global vars for some of the opcodes
	but Wikibinator203.js only sets 1 global var: Wikibinator203.
	var SelectorFunc=null, RuleFunc=null, B=null, C=null, D=null, E=null, F=null, G=null, H=null, I=null, MaxDist=4, Infl=1;
	dagball.Gob = function(){
		//TODO this.autoincId like in DF.N.id? Or is that unnecessary cuz of using just 2 levels
		//of (SelectorFunc ..numbersAndGobs.. RuleFunc) SelectorFunc and RuleFunc instead of a variable depth forest?
		
		//this.mutid = optionalMutid || dagball.nextGobId();
		//this.rule = null; //If this gob is a (SelectorFunc ..numbersAndGobs.. RuleFunc) then this.p is its potenMul_aka_influence
		//this.pic = optionalPic || dagball.randomGobPic();
		//this.e.x.p is x position. this.e.y.p is y position. .z.p .radius.p .red.p .green.p .blue.p etc, though theyre all optional and this.e may be empty.
		//FIXME should mutid go in gob.mutid instead of gob.w.mutid?
		//Should mutids start with $ like $aFRG3456755, and if the first $ is after something like DV$dfgdrf544566d then its a DV/Dagverse id,
		//but that prefix being empty string is this. (thebEachcNearxy $dfg4345df 3.45 (...))
		this.w = {}; //Anything thats not a Gob goes in here, such as these keys: mutid, rule, pic, circ, ball, etc.
		this.m = {}; //this.e = {}; //js {} map of varName to Gob, TODO prefill by (SelectorFunc ..numbersAndGobs.. RuleFunc) filled by this.E('varName') which starts as {p:0, v:0, dp:0, dv:0, kv:0}
		
		//this.w.rule (or caller of it?) should set global vars B C D MaxDist Infl etc, and set Infl to this.p (position of this dimension).
		//If this.p is 0 (0 potenMul_aka_influence) then dont run this.w.rule, especially cuz some rules are a hard 0 vs nonzero and affect ap zp av andOr zv
		//which are impulse/min/max instead of gradient or diffeq.
		
		this.p = 0;
		this.v = 0;
		this.dp = 0;
		this.dv = 0;
		this.kv = 0;
		this.ap = -Infinity;
		this.zp = Infinity;
		this.av = -Infinity;
		this.zv = Infinity;
		this.gradient = 0;
		this.lock = false; //TODO gob.lock = true or false, to prevent changing of p and v, like to lock a circ in a certain x y and radius?
		//list of gobs. childs for this.w.rule which is a (SelectorFunc ..numbersAndGobs.. RuleFunc) if exists, and this is the numbersAndGobs part
		this.ch = [];
		
		TODO since theres this.ch for SelectorFunc params, should it be this.w.selectorFunc and this.w.ruleFunc? call them this.w.selFn and this.w.rulFn?
				
		TODO split this.w.rule into this.w.potenRule (that only calls (poten addToPotenExpr))
			and this.w.diffeqRule(that contains diffeq andOr min/max/impulse?)? Or just have it say what kind of rule it is in this.w.rule value?
					
		TODO asap define the  (SelectorFunc ..numbersAndGobs.. RuleFunc) datastruct in gob.w.rule, or is it gob.ch for list of childs andOr rule numbers?
			or should all rule numbers be someGob.p so gob.ch (or gob.w.rule.ch?)
			would always be a list of gobs that the rule copies to B C D Maxdist Infl etc global vars?
			Then rebuild rockPaperScissors in it, what happened in those videos, make it work with gobs.
		Should a (SelectorFunc ..numbersAndGobs.. RuleFunc) be a js lambda that takes a gob as a param, the gob whose
		gob.w.rule is that (SelectorFunc ..numbersAndGobs.. RuleFunc) and whose gob.p is its potenMul_aka_influence?
		
		Use cases:
		-- A big circ with a gob containing a rule that in that circ gobs play rockPaperScissors using teamBp teamCp,
			but only if they have rpsBp and rpsCp, or something like that. TODO make an influence 
		-- A small circ that defines that in a certain area, 2d velocity (or 3d in some volumes later?) is added into
			to accel in a certain direction.
			
		Merge all dagball object types (ball, circ, sparsePieceOfBitpicBloomtree, uiOptions_chk_or_num_etc) merge with Gob,
			and ballGob.p is influence of ballGob, and circGob.p is influence of circGob, etc.
			Still compute circs and balls using dagball.circles and dagball.balls etc since those are already well optimized
			but have either a copy or a pointer of them in gobs, using gob.w.text for example being the same as circ.text
			which starts with "ape:" or "txt:" etc.
	*/
	
	return GB;
})();
//