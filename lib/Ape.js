//Ape browser GPU programming language opensource MIT license, prototype by Ben F Rayfield ~2023-10.
//Originally from dagball.Ape but moving it to its own file that only depends on TinyGLSL.

console.log('Ape found TinyGlsl = '+TinyGlsl+' (else throw cuz not found)');
const Ap = {
	license: 'Ape programming language opensource MIT license, prototype by Ben F Rayfield ~2023-10',
	depends: 'Uses TinyGLSL.js which uses WebGL2 GLSL in browsers',
	website: 'TODO put in https://github.com/benrayfield/DagBall/tree/main/lib/Ap.js',

	whenBoot_doSimpleApeTests: true,

	parse: function(apeCode){
		throw 'TODO';
	},

	boot: function(){
		console.log('Ape found TinyGlsl = '+TinyGlsl);
	},


	/* Ape is abbrev of IntShAPE. Its a shape of memory andOr controlflow in a tinyGlsl kernel
	(and might also be useful in other projects later? For now it will be worth it just to use in tinyGlsl in dagball).
	This is a way of generating tinyGlsl code and knowing exactly how many flops it will do and that multiple of these
	used together wont interfere with eachother. The "up to 1000" float vars in tinyGlsl constant memory
	(and unknown amount of localpar memory which is readable and writable) can be modelled as just 1 of these,
	and so can each Ap.Circ be 1 of these, since they form trees.
	...
	toString returns a number so can use apeA+apeB Math.pow(apeA,apeB) apeA-apeB etc.
	...
	FIXME in threadTimeMemMemMem put Time last so the mem is defined already and it can compute sizes without complex parsing.
	That doesnt mean it has to be displayed that way.
	...
	Dagball controlflow in glsl kernel...
	Generate as tree of loops and sequences of int vars...
	Const
	+
	*
	Power
	Loop up to (so can triangle or 1<<hypercubewavedims etc).
	Do i want pow in general or just << aka powof2?
	Forestcurvefit 2 tri arrays in a square array uses forexample loop i toexcl 20: loop j toexcl i.
	Hypercubewaveindagball uses loop j toexcl 1<<i: loop k toexcl i: readat k.
	Dagballfreqsradius uses loop i toexcl const: [readat i*2; readat i*2+1].
	..
	Define controlflow and datastructs separately.
	..
	Each datastruct is a float[someintsize] in shared parr or localpar array.
	Can UNION datastructs of same size such as a 8x5 array vs a 10x2x2 array, or a 2pow7 array vs a 100array+7x4array.
	Example, 5x(2pow6)array.
	Example: triangle11array is 11+10+9..+1.
	Example union, diag11 and 2 of trinodiag11, unions to square11. Maybe 3dtriarray etc.
	..
	Controlflow is such a datastruct but not stored. A triangle loop for example vs a triangle array.
	Start with a datastruct for mem (excluding float vars in loop bodies etc),
	and a datastruct for controlflow,
	and think about those as mem is horizontal on screen and controlflow is vertical.
	Can have multi unions in mem. Maybe also in controlflow?
	At each row is a time step. Reads andor writes 0 or more things. Display those in 2d. Appears as loop unrolling.
	Theres 2 mems, parr and localpar.


	FIXME...
	a = Ap.parseApeCode(`(matmulABCLoop *
				matDimA
				matDimC
				(sumInDimBSteps +
					<sumB 0.>
					(sumInDimB_loop *
						matDimB
						{f+= sumB {f* [matAB matDimA matDimB] [matBC matDimB matDimC]}}
					)
					<[matAC matDimA matDimC] sumB>
				)
			)`).toApe().toApeCode()
	'{* {const } {const } {+ <{const } {const }> {* {const } {f+= {const } {f* [{const } {const } {const }] [{const } {const } {const }]}}} <[{const } {const } {const }] {const }>}}'
	It should look about the same, except indent isnt coded yet. 2023-10-5.


	Its a forest of (name doWhat childA childB childC...).
	{doWhat childs...} means (makeUpAName doWhat childs...).
	[childs...] means {ptr childs...} like reading or writing in an array.
	<childs...> means {f= childs..} like <sumB 0.> sets sumB to 0.
	*/
	Ape: function(name, apeType, childs, data){
		this.name = name;
		//Examples: 'const', '+', '*', '2pow', 'triNoDiag', 'triWithDiag', 'union', 'unionMax', etc.
		//'+' as controlflow is a sequence of things in loopBody. '+' in memory is concat of those child apes in memory.
		//'*' in controlflow is loop in loop (in loop... as many loops as childs).
		this.apeType = apeType;
		if(typeof(apeType) != 'string'){
			throw 'typeof(apeType) must be string but is '+typeof(this.apeType)+' and it is '+apeType;
		}
		this.childs = childs || [];
		this.data = data; //{floatVal: 2.34} if its a float literal, for example. (floatVarName float) is the mem form  of it, not a specific float val.
		let constSizeIfLeaf = 1; //FIXME?
		this.apeSize = constSizeIfLeaf || 0; //FIXME?
		this.updateApeSize();
		if(name && name.length == Ap.sizeOfHashId){ //could be a hash name, like created in Ap.prototype.Name(). Verify that name either is that or null (FIXME can it be undefined? probably shouldnt be. What about ''?)
			if(this.Name() != name){
				throw 'Cant have name the same size as hash id (Ap.sizeOfHashId) unless name is its hash id, name='+name+' hash id (generated from content) = '+this.Name();
			}
		}
	},

};


/* given parrMem which is a size 0-1000 Float32Array, and optional optionalBigMem which is another Float32Array, evals this ape's code on it,
returning another Float32Array, or throws if the code compiles to invalid GLSL code or whatever language its compiled to (might do WebGPU and OpenCL later?).
TODO this is how to separate ape language from dagball, so theres: dagball dependsOn apeLanguage dependsOn tinyGlsl depends on webGL2Glsl.
*/
Ap.Ape.prototype.call = function(parrMem, optionalBigMem){
	throw 'TODO this is how to separate ape language from dagball, so theres: dagball dependsOn apeLanguage dependsOn tinyGlsl depends on webGL2Glsl.';
};

//Ap.ApeType can be '15' or 'parrMem' or 'f+=' etc. If its '15' this is true. It can be used in loops from 0 to 15-1, in that example, or combined with {* {15} {+ {2} {3}}} etc.
//This does not include '2%5' literals etc. In that example _i/iter is 2 and _s/size is 5, as iter ranges 0 to size-1.
Ap.Ape.prototype.apeTypeIsSimpleSize = function(){
	return Number.isInteger(Number(this.apeType))
};

Ap.Ape.prototype.updateApeSize = function(){
	//FIXME check for int overflow, or given max vars such as 1000?
	switch(this.apeType){
		case 'floatVal':{
			//this.apeSize = 1; //1 float, not array. Mem for it is like (varName float). Val for it is written like 2.34
			this.apeSize = 0; //FIXME should this be 0 or 1? 0 to not count it in the memory since it goes on GLSL stack in an apeType=='float' var whose memory is already counted. 1 to count it again. ??
		}break;case 'float':{
			this.apeSize = 1; //Example: (varNameX float) which goes in a memory area, a float var but not specific float val.
		}break;case 'parrMem':case 'localparMem':{
			//parrMem defines the main kind of input memory in tinyGlsl, a uniform/constant memory shared between all GPU cores (par)
			//but copied to parr in mutable local memory to do calculus gradients (but still use it as readonly).
			//localparMem is local memory ur allowed to modify.
			//The GPU thread ends with freturn of 1 float.
			//
			//size is the multiply of sizes of childs, defining a tensor or loop in loop in loop. Examples:
			//(fcfDoubleTriangleWeights parrMem (numForestCurveFitNodes 12) numForestCurveFitNodes)
			//(fcfNodeMathOpWeights parrMem numForestCurveFitNodes (numForestCurveFitMathOps 5))
			//
			//TODO merge duplicate code with case '*'?
			this.apeSize = 1;
			for(let c of this.childs){
				this.apeSize *= c.size();
			}
		}break;case 'const':{
			throw 'Getting rid of the const apeType and use string of positive integer as apeType instead such as (matDimA 5) means float[5].';
			//this.apeSize = this.data.const;
		}break;case '+':{
			this.apeSize = 0;
			for(let c of this.childs){
				this.apeSize += c.size();
			}
		}break;case '*':{
			//TODO merge duplicate code with "}break;case 'parrMem':case 'localparMem':{"?
			this.apeSize = 1;
			for(let c of this.childs){
				this.apeSize *= c.size();
			}
		}break;case 'iftri':{
			//used to make triangle loops in square loops, which may get (TODO) optimized that way in tinyGlsl
			//without the if and instead looping inner loop counter up to outer loop counter.
			if(this.childs.length != 3){
				throw '2pow apeType must have exactly 3 childs: 2 _i and 1 thing to do inside it: '+this.childs.length;
			}
			this.apeSize = this.childs[2].size(); //FIXME add a flop for comparing the 2 _i's?
		}break;case '2pow':{
			if(this.childs.length != 1){
				throw '2pow apeType must have exactly 1 child: '+this.childs.length;
			}
			this.apeSize = 1<<this.childs[0]; //TODO use 2**this.childs[0] instead? Its slower but can go up to 2**53. Dont think that will be needed except when outerjoin threads,time,mems.
		}break;case 'pow':{
			if(this.childs.length != 2){
				throw 'pow apeType must have exactly 2 childs: '+this.childs.length;
			}
			this.apeSize = this.childs[0].size()**this.childs[1].size();
		/*}break;case 'triNoDiag':{ //same as triWithDiag of 1 less
			if(this.childs.length != 1){
				throw 'triNoDiag apeType must have exactly 1 child: '+this.childs.length;
			}
			let c = this.childs[0];
			if(c < 2){
				throw 'triNoDiag apeType must have child >= 2 (so apeSize>=1): '+c;
			}
			this.apeSize = c*(c-1)/2; //triNoDiag4 is 3+2+1. triWithDiag4 is 4+3+2+1
		}break;case 'triWithDiag':{ //same as triNoDiag of 1 more
			if(this.childs.length != 1){
				throw 'triNoDiag apeType must have exactly 1 child: '+this.childs.length;
			}
			let c = this.childs[0];
			if(c < 1){
				throw 'triWithDiag apeType must have child >= 1 (so apeSize>=1): '+c;
			}
			this.apeSize = (c+1)*c/2; //triNoDiag4 is 3+2+1. triWithDiag4 is 4+3+2+1
		/*}break;case 'doubleTriInSquare':{ //like in forestCurveFit.
			//figuring out the params...
			//
			//Given a diagIndex and lowIndex (where lowIndex < diagIndex),
			//theres 2 floats, one in same row as diag, and one in same col as diag.
			//This excludes the diag (where lowIndex==diagIndex)
			//cuz if it included that, it would have duplicate view of it.
			//I could put another param thats always 0 or 1 to choose row vs col.
			//Or more generally maybe it should be indexed as row_col one way
			//and col_row the other, both of square.
			//That could be done with a union.and maybe some copy ops,
			//without needing this doubleTriInSquare. Try that.
			//
			throw 'TODO';
			*/
		}break;case 'copy':{
			//another variable the same size as a given variable (its child) that can vary independently,
			//like looping over an array and inside that loop over the same array,
			//or reading 2 indexs at the same time in the same array.
			if(this.childs.length != 1){
				throw 'copy apeType must have exactly 1 child: '+this.childs.length;
			}
			this.apeSize = this.childs[0].size();
		}break;case 'todo_convolutionOpInVariableNumberOfDimsOrJustMergeTheDimsIntoASingleOffsetMaybe?':{
			throw Error('TODO');
		/*}break;case 'todo_factorial?':{
			throw Error('TODO');
		}break;case 'todo_fibonacci?':{
			throw Error('TODO');
		*/
		}break;case 'union':{
			if(this.childs.length < 1){
				throw 'union apeType must have at least 1 child (and at least 2 to do any useful unioning): '+this.childs.length;
			}
			this.apeSize = this.childs[0].size();
			for(let c=1; c<this.childs.length; c++){
				if(this.childs[c].size() != this.apeSize){
					throw 'union apeType must have all childs same size. First child is size '+this.apeSize+'. Child '+c+' is size '+this.childs[c].size();
				}
			}
		}break;case 'unionMax':{
			//like union but childs can be different sizes. Takes the max size of them. Ignores the others.
			//FIXME this might break the addressing model and if so replace each child
			//with (name + thatChild (otherName const whateverRemainingSize)) so theyre all the same size.
			//unionMax is normally used in localparMem since the different gpucircs take turns using localparMem
			//and must write the first n indexs before reading them, for an often-different n per gpucirc.
			if(this.childs.length < 1){
				throw 'unionMax apeType must have at least 1 child (and at least 2 to do any useful unioning): '+this.childs.length;
			}
			this.apeSize = 0;
			for(let child of this.childs){
				this.apeSize = Math.max(this.apeSize, child.size()); //child+0 so it doesnt put the child itself in this.apeSize
			}
		}break;case 'threadTimeMemMemMem':{
			//Index can be 0 to 2**53-1 and points at a (math abstraction of, not actually computed this way normally)
			//value at a certain memory address, in a certain thread, at a certain time cycle.
			//This is outermost Ape type that generates GLSL code to run in TinyGlsl.
			//Returns new Float32Array(numGpuThreads) that each uses (this.childs[2]+this.childs[3]) amount of mem
			if(this.childs.length != 5){
				throw 'threadMemTime apeType is outermost and must have 4 childs: numGpuThreads time parrMem localparMem: '+this.childs.length;
			}
			//the actual compute time is this.childs[0]*this.childs[1] (numGpuThreads*time) but as a math address space its 3d.
			//FIXME should this.childs[2] (parrMem) be added outside the multiply since theres only 1 uniform/constant copy of it per GPU call?
			//But theres another copy of it in local mem the same size that epsilon is added to 1 index of depending on which GPU thread index
			//when computing gradient in numDimensions+1 GPU threads.
			//this.childs[3] (localparMem) differs in each GPU thread.
			//TODO should this just multiply all 4 of them anyways, instead of this.childs[0]*this.childs[1]*(this.childs[2]+this.childs[3])? Its just a math index.
			//this.childs[4] is stackMem, local float variables in glsl code.
			this.apeSize = this.childs[0].size()*this.childs[1].size()*(this.childs[2].size()+this.childs[3].size()+this.childs[4].size());
		}break;case 'i%s':{
			this.apeSize = this.data.size;
		}break;case 'f*':case 'f+=':case 'f+':case 'f=':case 'ptr':case 'freturn':{
			this.apeSize = 0;
			for(let child of this.childs){
				this.apeSize += child.apeSize;
			}
		}break;default:{
			try{
				//Example: (matDimA 5) means matDimA is a float[5] but doesnt specify which 5 float vals.
				let apeSize = parseInt(this.apeType);
				if(apeSize <= 0){
					throw 'apeSize='+apeSize+' must be positive if its an int literal';
				}
				this.apeSize = apeSize;
			}catch(e){
				throw 'unkown apeType: '+this.apeType;
			}
		}	
	}
	if(typeof(this.apeSize) != 'number'){
		throw 'apeSize must be a number but is a '+typeof(this.apeSize)+': '+this.apeSize;
	}
	return this.apeSize;
};


//FIXME any code using {} should use this instead so Ap.builtInApeTypesOtherThanPositiveInts.toString etc wont be there for example.
Ap.newEmptyMap = function(){
	let ret = {};
	Object.setPrototypeOf(ret, null);
	return ret;
};

Ap.builtInApeTypesOtherThanPositiveInts = Ap.newEmptyMap();
//floatVal is not actually written. It appears as 2.34 instead. But Ap.parseApeCode('2.34').apeType=='floatVal'.
//FIXME this is likely to get out of sync as new apeTypes_aka_opcodes are added. Find a way to write it all in 1 place so they tend to get updated together.
//Once the Ap.Ape language is finised, there might be 30 or so standard apeTypes and no more will be added, plus all the the positive integers as strings.
'ptr f= float floatVal + * 2pow pow triNoDiag triWithDiag union unionMax copy factorial fibonacci threadTimeMemMemMem f* f+= f+ doLast x y z parrMem localparMem bigMem freturn flast iftri'.split(' ').forEach(x=>{
	Ap.builtInApeTypesOtherThanPositiveInts[x] = true;
});

//One of a small set of constant strings or a string of a positive integer less than 2**53 (cuz thats what fits in float64).
Ap.isValidApeType = function(string){
	if(Ap.builtInApeTypesOtherThanPositiveInts[string]){
		return true;
	}
	let intValue = Number(str);
	return /^[1-9]\d*$/.test(string) && 0<intValue && intValue<2**53;
};

//returns a number so can use apeA+apeB Math.pow(apeA,apeB) (aka apeA**apeB) apeA-apeB etc.
//If its for time, its the number of flops. If its for mem, its the mem size in floats (not including ints as loop vars).
//If its threadTimeMemMemMem, its the float value at a certain memory address, in a certain thread, at a certain time cycle, though thats
//just a math abstraction and not actually readable as randomAccess that way normally but in theory it could be if you want to unroll the memory.
//double can do all integers exactly between plus/minus 2**53, so if theres 2**12 floats (only read or write 1 per cycle, but as unrolled its 2**12),
//and 2**20 GPU threads (such as 1024x1024 video, each returning a float with 8 bits of red, 8 green, 8 blue), and 2**14 cycles per GPU thread,
//then that address space (including thread, time, and 3 kinds of memory, but just 1 kind of memory in this simple example) is 2**(12+20+14)=2**46.
//2**46 < 2**53 so it fits in double and the Ap.Ape of the threadTimeMemMemMem defining that calculation would have indexs 0 to (2**46)-1.
//
//Rewrote some of that...
//if theres 2^12 floats (read/write 1 per cycle) and 2^20 GPU threads (1024x1024 pic of floatRGB color), and 2^14 cycles per GPU thread,
//then every float at a thread, time, and memory address has an id 0 to 2^46-1 in that 16 gigaflop calculation using 4k floats of mem per GPU core
//https://twitter.com/DagBallGame/status/1708514031139533263
//
Ap.Ape.prototype.toString = function(){
	//return this.apeSize; //TODO stop doing this and use ape.size() instead. Make toString be its .Name() or expanded form or something.
	return this.toApeCode();
};

Ap.Ape.prototype.size = function(){
	return this.apeSize;
};

//apeCode is (name apeType childs...). There are abbrevs:
//{apeType childs...} means (generatedName apeType childs...).
//[childs...] means {ptr childs...}.
//<childs...> means {f= childs...} and f= always takes 2 params.
Ap.Ape.prototype.toApeCode = function(){
	return this.toApeCodeRecurse({});
};

//ns is js {} of string name to Ap.Ape whose .name is that.
//Its used to only expand apes the first time, like (matAB * (sizeA 3) sizeA) instead of (matAB * (sizeA 3) (sizeA 3)).
//Without that, the output string could be exponential size. Doesnt dedup those with lazyEvaled names that are null such as the {} <> and [] syntaxs.
//You can write any of those as () syntax, which should appear if the name is not the hash of its content (apeType and childs).
Ap.Ape.prototype.toApeCodeRecurse = function(ns){
	if(this.name === undefined){
		throw 'Name cant be undefined';
	}
	if(this.name != null){
		if(ns[this.name]){
			return this.name; //Example: the second sizeA in (matAB * (sizeA 3) sizeA). Dont display as (matAB * (sizeA 3) (sizeA 3)).
		}else{
			ns[this.name] = this; //Example: the (sizeA 3) in (matAB * (sizeA 3) sizeA). sizeA is name in both places, and its the same Ape twice.
		}
	}
	//FIXME only if name is hash of content, instead of some arbitrary name. If name is null, then it means lazyEval of hash of content, so null counts too.
	let skipName = this.name==null || this.apeType=='f=' || this.apeType=='ptr' || this.apeType=='floatVal';
	//TODO special code here for types???: float
	let ret;
	if(this.apeType == 'floatVal'){
		if(this.data.floatVal === undefined){
			throw 'apeType=floatVal apeType must have Ap.data.floatVal';
		}
		return ''+this.data.floatVal; //Example: '2.34'
	}else if(skipName && this.apeType == 'ptr'){
		ret = '['+this.childs.map(c=>c.toApeCodeRecurse(ns)).join(' ')+']';
	}else if(skipName && this.apeType == 'f='){
		ret = '<'+this.childs.map(c=>c.toApeCodeRecurse(ns)).join(' ')+'>';
	}else if(skipName){
		let spaceOrNot = this.childs.length == 0 ? '' : ' ';
		ret = '{'+this.apeType+spaceOrNot+this.childs.map(c=>c.toApeCodeRecurse(ns)).join(' ')+'}';
	}else{ //do it the long simple way: (name apeType childs...)
		let spaceOrNot = this.childs.length == 0 ? '' : ' ';
		ret = '('+this.name+' '+this.apeType+spaceOrNot+this.childs.map(c=>c.toApeCodeRecurse(ns)).join(' ')+')';
	}
	return ret;
};

Ap.oppositeSyntaxChar = {'{':'}', '[':']', '<':'>', '(':')', ')':'(', '>':'<', ']':'[', '}':'{'};

Ap.ParseApe = function(listType){
	this.listType = listType; //One of: [ < { ( l. l means literal.
	this.literal = null;
	this.childs = [];
};
Ap.ParseApe.prototype.toString = function(){
	if(this.listType == 'l'){
		return this.literal;
	}else{
		return this.listType+this.childs.join(' ')+Ap.oppositeSyntaxChar[this.listType];
	}
};

//returns a Ap.Ape
Ap.ParseApe.prototype.toApe = function(){
	return this.toApeRecurse('child',{});
};

//returns a Ap.Ape. The main difference is it has .name and .apeType fields instead of those being the first childs.
//Ap.Ape = function(name, apeType, childs, data)
//syty is 1 of: 'name', 'apeType', or 'child'.
//ns is a namespace, a js {} of string name to Ap.Ape whose .name is that.
//If .name is null then dont put it in the {} and leave it as lazyEval of name to make by hash later if ever.
Ap.ParseApe.prototype.toApeRecurse = function(syty,ns){
	if(Ap.logApeDebug) console.log('toApeRecurse '+this);
	if(syty === undefined){
		throw 'Undefined syty';
	}
	//if(syty === undefined){
	//	console.warn('Converting toApe() to toApe("child")');
	//	syty = 'child';
	//}
	if(this.listType == 'l'){
		if(syty == 'name'){
			throw 'Should not convert syty=name literal to Ap. Should convert it to string with literalOrThrow(). this='+this;
			/*if(this.literal == null || this.literal === undefined){
				throw 'syty is name but no ParseAp.literal: '+this;
			}
			let name = this.literal;
			let foundApe = ns[this.literal];
			if(foundApe){
				//Example: In code (matAB * (sizeA 3) sizeA), the (sizeA 3) Ape occurs twice. The second time,
				//its just name as ParseAp.literal is "sizeA" and finds ns.sizeA is an Ape to reuse.
				//It should get into ns when listType is '(' and the next thing after that is name.
				return foundApe;
			}
			throw 'No Ape found of name '+name+'. Youre supposed to define it earlier like sizeA in (matAB * (sizeA 3) sizeA). thisParseApe='+this;
			*/
			//throw 'Should not convert syty=name literal=const to Ape: this='+this;
			//throw 'This is not an Ape: return this.literal;';
		}else if(syty == 'apeType'){
			throw 'Should not convert syty=apeType literal to Ape: this='+this;
			/*
			//throw 'Should not convert an apeType to Ap. apeType is 1 of a small constant set of strings such as f= ptr + * (UPDATE: positive integers can also go there like (matDimA 7))';

			//Example: the 7 in (matDimA 7) is apeType meaning float[7].
			let floatArraySizeAsInt;
			try{
				floatArraySizeAsInt = parseInt(this.literal);
			}catch(e){
				throw 'apeType literal '+this.literal+' did not parseInt to number';
			}
			return new Ap.Ape(null, floatArraySizeAsInt, [], {}); //FIXME should it be floatArraySizeAsInt or ''+floatArraySizeAsInt (so apeType is always string)?
			*/
		}else if(syty == 'child'){
			if(this.literal == null || this.literal === undefined){
				throw 'ParseAp.listType is a literal type, but theres no literal. thisParseApe='+this;
			}
			//if(/^\d+%\d+$/.test(this.literal)){
			if(/^\d+%\d*$/.test(this.literal)){ //allow second number to be empty, and if so make it 0
				//Example: 17%203 is a literal whose _i is always 17 and _s is always 203.
				//Examples where the 2 and 3 are chosen _i in numForestCurveFitMathOps which has _s 5:
				//(fcfNodeMathOpWeights parrMem numForestCurveFitNodes (numForestCurveFitMathOps 5)):
				//{f* [fcfNodeMathOpWeights diag 2%5] {ftanh {fatan weightedSumCol}}}
				//{f* [fcfNodeMathOpWeights diag 3%5] {ftanh {fmax weightedSumCol weightedSumRow}}}
				//TODO 2%numForestCurveFitMathOps and 3%numForestCurveFitMathOps look up numForestCurveFitMathOps.SizeName() during compiling.
				let intStrings = this.literal.split('%');
				let iter = parseInt(intStrings[0]);
				let size = parseInt(intStrings[1] || '0');
				//TODO dedup it by its string as name in ns? or leave it as potentially dup literal?
				return new Ap.Ape(null, 'i%s', [], {
					floatVal: iter, //FIXME get rid of this and just have iter
					iter: iter,
					size: size
				});
			}else{
				let literalAsNum = parseFloat(this.literal); //Example: '2.34' or '2' or 'NaN' or 'Infinity' or '-Infinity'. parseFloat('sizeA') and parseFloat('NaN') both return NaN.
				if(Number.isFinite(literalAsNum)){
					return new Ap.Ape(null, 'floatVal', [], {floatVal:literalAsNum});
				}else{
					let name = this.literal;
					//FIXME name could be 'NaN' or 'Infinity' or '-Infinity' since checked Number.isFinite(literalAsNum). Do I want those 3 strings to be counted as numbers or names?
					if(name == 'NaN' || name == 'Infinity' || name == '-Infinity'){
						throw "FIXME name could be 'NaN' or 'Infinity' or '-Infinity' since checked Number.isFinite(literalAsNum). Do I want those 3 strings to be counted as numbers or names? name="+name;
					}
					let foundApe = ns[this.literal];
					if(foundApe){
						//Example: In code (matAB * (sizeA 3) sizeA), the (sizeA 3) Ape occurs twice. The second time,
						//its just name as ParseAp.literal is "sizeA" and finds ns.sizeA is an Ape to reuse.
						//It should get into ns when listType is '(' and the next thing after that is name.
						return foundApe;
					}
					throw 'It didnt work in parseFloat so not a float string, and no Ape found of name '+name+
					'.\nIf name, youre supposed to define it earlier like sizeA in (matAB * (sizeA 3) sizeA).'+
					'\nthisParseApe='+this+'\nnsKeys='+Object.keys(ns);
				}
			}
		}else throw 'Unknown syty='+syty+' in toApe of ParseApe: '+this;
	}else if(this.listType == '('){
		let name = this.childs[0].literalOrThrow(); //string
		if(ns[name]){
			throw 'Already defined name '+name;
		}
		let ape = new Ap.Ape(name, this.childs[1].literalOrThrow(), this.childs.slice(2).map(c=>c.toApeRecurse('child',ns)), {});
		ns[name] = ape;
		if(Ap.logApeDebug) console.log('Defined name '+name+' as '+ape.toApeCode());
		return ape;
	}else if(this.listType == '{'){
		return new Ap.Ape(null, this.childs[0].literalOrThrow(), this.childs.slice(1).map(c=>c.toApeRecurse('child',ns)), {});
	}else if(this.listType == '<'){
		return new Ap.Ape(null, 'f=', this.childs.map(c=>c.toApeRecurse('child',ns)), {});
	}else if(this.listType == '['){
		return new Ap.Ape(null, 'ptr', this.childs.map(c=>c.toApeRecurse('child',ns)), {});
	}else{
		throw 'Unknown listType: '+this.listType;
	}
};

Ap.ParseApe.prototype.literalOrThrow = function(){
	if(this.listType != 'l'){
		throw 'Not a literal: '+this;
	}
	return this.literal;
};

/* TODO test this. should be the inverse of toAp.
FIXME you cant have matDimA by itself. It must be defined earlier in code such as (matDimA 5).
a = Ap.parseApeCode(`(matmulABCLoop *
			matDimA
			matDimC
			(sumInDimBSteps +
				<sumB 0.>
				(sumInDimB_loop *
					matDimB
					{f+= sumB {f* [matAB matDimA matDimB] [matBC matDimB matDimC]}}
				)
				<[matAC matDimA matDimC] sumB>
			)
		)`)+''
'(matmulABCLoop * matDimA matDimC (sumInDimBSteps + <sumB 0.> (sumInDimB_loop * matDimB {f+= sumB {f* [matAB matDimA matDimB] [matBC matDimB matDimC]}}) <[matAC matDimA matDimC] sumB>))'



x = Ap.parseApeCode('(matDimA 5)')

Ap.ParseApe {listType: '(', literal: null, childs: Array(2)}
y = x.toApe('child')
Ap.Ape {name: 'matDimA', apeType: '5', childs: Array(0), data: {…}, apeSize: 5}
y.toApeCode()
'(matDimA 5)'
6[Violation] 'requestAnimationFrame' handler took <N>ms
x = Ap.parseApeCode('(varX float)').toApe('child')

Ap.Ape {name: 'varX', apeType: 'float', childs: Array(0), data: {…}, apeSize: 1}
x = Ap.parseApeCode('(varX float)').toApe('child').toApeCode()

'(varX float)'
x = Ap.parseApeCode('[a (varX float) c]').toApe('child').toApeCode()

THIS PART IS WRONG[
'[(null float) (varX float) (null float)]'
x = Ap.parseApeCode('[(a 2) (varX float) (c 3)]').toApe('child').toApeCode()
]

'[(a 2) (varX float) (c 3)]'
x = Ap.parseApeCode('[(a 2) (varX float) (c 3)]').toApe('child').childs[0].toApeCode()

'(a 2)'
x = Ap.parseApeCode('[(a 2) (varX float) (c 3)]').toApe('child').childs[1].toApeCode()

'(varX float)'
x = Ap.parseApeCode('[(a 2) (varX float) (c 3)]').toApe('child').childs[2].toApeCode()

'(c 3)'
*/
Ap.Ape.prototype.toParseApe = function(){
	let parseApe = new Ap.ParseApe();
	if(this.apeType == 'floatVal'){ //unlike (varName float) which is a float var that goes in a memory branch but not a specific float value (which goes in time/code area).
		let literalParseApeOfFloatAsString = new Ap.ParseApe();
		literalParseApeOfFloatAsString.listType = 'l';
		literalParseApeOfFloatAsString.literal = this.literal;
		return literalParseApeOfFloatAsString;
	}else if(this.apeType === 'const'){
		throw 'const apeType is being removed. Use a positive int instead (or maybe it will be the string form of that int?)';
		//parseApe.listType = 'l';
		//parseApe.literal = this.data.const;
	}else if (this.apeType === 'ptr'){
		parseApe.listType = '[';
		this.childs.forEach(child=>{
			parseApe.childs.push(child.toParseApe());
		});
	}else if (this.apeType === 'f='){
		parseApe.listType = '<';
		this.childs.forEach(child => {
			parseApe.childs.push(child.toParseApe());
		});
	}else{
		if (this.name){
			parseApe.listType = '(';
			let nameParseApe = new Ap.ParseApe();
			nameParseAp.listType = 'l';
			nameParseAp.literal = this.name;
			parseApe.childs.push(nameParseApe);
		}else{
			parseApe.listType = '{';
		}
		let typeParseApe = new Ap.ParseApe();
		typeParseAp.listType = 'l';
		typeParseAp.literal = this.apeType;
		parseApe.childs.push(typeParseApe);

		this.childs.forEach(child=>{
			parseApe.childs.push(child.toParseApe());
		});
	}
	return parseApe;
};

//returns a Ap.ParseApe, which you should then convert to a Ap.Ape, and then in some cases to tinyGlsl code.
Ap.parseApeCode = function(apeCode){
	return Ap.parseApeTokens(Ap.tokenizeApeCode(apeCode));
};

//js [] list of tokens. Example tokens: [ ] < >  { } ( ) ptr f= varName55
Ap.parseApeTokens = function(apeTokens){
	return Ap.parseApeTokensRecurse(apeTokens, new Set());
};

/*Ap.parseApeTokensRecurse = function(apeTokens, set){
	throw 'TODO';
};*/
/*Ap.parseApeTokensRecurse = function(apeTokens, set) {
	if (apeTokens.length === 0) {
		throw "Unexpected end of tokens";
	}

	let token = apeTokens.shift(); // Pop the first token

	let parseApe = new Ap.ParseApe();

	switch(token) {
		case '[':
			parseApe.listType = '[';
			while(apeTokens[0] !== ']') {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ']'
			break;
		case '<':
			parseApe.listType = '<';
			while(apeTokens[0] !== '>') {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the '>'
			break;
		case '{':
			parseApe.listType = '{';
			parseApe.ApeType = apeTokens.shift(); // Assume next token is the apeType
			while(apeTokens[0] !== '}') {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the '}'
			break;
		case '(':
			parseApe.listType = '(';
			parseApe.name = apeTokens.shift(); // Assume next token is the name
			parseApe.ApeType = apeTokens.shift(); // Next token is the apeType
			while(apeTokens[0] !== ')') {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ')'
			break;
		default:
			parseApe.listType = 'l';
			parseApe.literal = token;
	}

	return parseApe;
};*/
/*Ap.parseApeTokensRecurse = function(apeTokens, set) {
	if (apeTokens.length === 0) {
		throw "Unexpected end of tokens";
	}

	let token = apeTokens.shift(); // Pop the first token

	let parseApe = new Ap.ParseApe();

	switch(token) {
		case '[':
			parseApe.listType = '[';
			while(apeTokens[0] !== ']') {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ']'
			break;
		case '<':
			parseApe.listType = '<';
			while(apeTokens[0] !== '>') {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the '>'
			break;
		case '{':
			parseApe.listType = '{';
			parseApe.ApeType = apeTokens.shift(); // Assume next token is the apeType
			while(apeTokens[0] !== '}') {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the '}'
			break;
		case '(':
			parseApe.listType = '(';
			while(apeTokens[0] !== ')') {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ')'
			break;
		default:
			parseApe.listType = 'l';
			parseApe.literal = token;
	}

	return parseApe;
};*/
/*Ap.parseApeTokensRecurse = function(apeTokens, set) {
	if (apeTokens.length === 0) {
		throw "Unexpected end of tokens";
	}

	let token = apeTokens.shift(); // Pop the first token
	let parseApe = new Ap.ParseApe();

	switch(token) {
		case '[':
			parseApe.listType = '[';
			while(apeTokens[0] !== ']') {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ']'
			break;
		case '<':
			parseApe.listType = '<';
			while(apeTokens[0] !== '>') {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the '>'
			break;
		case '{':
			parseApe.listType = '{';
			parseApe.ApeType = apeTokens.shift(); // Assume next token is the apeType
			while (apeTokens[0] !== '}') {
				if (apeTokens[0] === '{') {
					parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
				} else {
					let innerApe = new Ap.ParseApe();
					innerAp.listType = 'l';
					innerAp.literal = apeTokens.shift();
					parseApe.childs.push(innerApe);
				}
			}
			apeTokens.shift(); // Pop the '}'
			break;
		case '(':
			parseApe.listType = '(';
			while(apeTokens[0] !== ')') {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ')'
			break;
		default:
			parseApe.listType = 'l';
			parseApe.literal = token;
	}

	return parseApe;
};*/
Ap.parseApeTokensRecurse = function(apeTokens, set) {
	if (apeTokens.length === 0) {
		throw "Unexpected end of tokens";
	}

	let token = apeTokens.shift(); // Pop the first token
	let parseApe = new Ap.ParseApe(); //FIXME give listType in constructor of parseape?

	switch(token) {
		case '[':
		case '<':
		case '{':
		case '(':
			let endToken;
			if (token === '[') {
				parseApe.listType = '[';
				endToken = ']';
			} else if (token === '<') {
				parseApe.listType = '<';
				endToken = '>';
			} else if (token === '{') {
				parseApe.listType = '{';
				//parseApe.ApeType = apeTokens.shift(); // Assume next token is the apeType
				endToken = '}';
			} else { // '('
				parseApe.listType = '(';
				endToken = ')';
			}

			while (apeTokens[0] !== endToken) {
				parseApe.childs.push(Ap.parseApeTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the corresponding end token
			break;

		default:
			parseApe.listType = 'l';
			parseApe.literal = token;
	}

	return parseApe;
};




Ap.tokenizeApeCode = function(apeCode){
	//let matches = apeCode.match(/({|\[|<|\(|\)|>|\]|}|\s+|\S+)/g);
	//let matches = apeCode.match(/({|\[|<|\(|\)|>|\]|}|[a-zA-Z0-9._]+|\s+)/g);
	//let matches = apeCode.match(/([{}[\]<>()])|(\S+)/g);
	let matches = apeCode.match(/([{}[\]<>()])|([^{}[\]<>()\s]+)|(\s+)/g);
	return matches.filter(token => !token.match(/^\s+$/)); // Remove pure whitespace matches
};

Ap.Ape.prototype.sharedArrayName = function(){
	if(this.apeType != 'ptr'){
		throw 'Not ptr apeType='+this.apeType;
	}
	if(!this.childs.length){
		throw 'No childs. First child tells mem type.';
	}
	let array = this.childs[0];
	if(array.apeType == 'parrMem'){
		return 'parr'; //use as readOnly despite it technically could be written
	}else if(array.apeType == 'localparMem'){
		return 'localpar'; //readable and writable
	}else if(array.apeType == 'big'){
		//sharedArrayName = 'bigMem';
		throw 'TOOD write code for bigMem (mem that doesnt fit in a GPU core, and is used as readOnly)';
	}else{
		throw 'apeType='+array.apeType+' is not a mem type (parrMem, localparMem, bigMem, and float is another mem type but is not an array)';
	}
};

Ap.Ape.prototype.outermostIsDeclaringMem = function(){
	return this.apeType=='parrMem' || this.apeType=='localparMem' || this.apeType=='bigMem' || this.apeType=='float';
};

//Code that can be used as an L-value (to write float at) or R-value (to read float at).
//If apeType is 'f+=' 2 of the params x y might be used like x.ptrCode()+' += '+y.ptrCode()+';'
//The syntax [a b c] means {ptr a b c} aka (GeneratedName324 ptr a b c), so check for apeType of 'ptr'.
//If its just a single variable such as sumB ((sumB const 1) in stackMem) then it should return sumB.
//Maybe 'const' isnt the right apeType for that? So Im changing it to (sumB float) in stackMem.
//No more (name const 1) in stackMem since that means an array of floats size 1. Its now (sumB float) and (someSize 12).
Ap.Ape.prototype.ptrCode = function(){
	/*TODO get rid of ptrCode and indexCode and merge into this code in toTinyGlslCodeRecurse (which im modifying...)???...
	}else if(this.apeType == 'ptr'){
	if(this.childs.length < 2){
		throw 'ptr. Must be at least 2 childs (arrayName and index, or can have multiple indexs or other ptr arithmetic) is '+this.childs.length;
	}
	if(this.childs.length == 2){
		return this.childs[0].ArrayName()+'['+this.childs[1].LoopName()+']';
	}else if(this.childs.length == 3){
		//return this.childs[0].ArrayName()+'['+this.childs[1].LoopName()+'*'+this.childs[2].SizeName()+'+'+this.childs[2].LoopName()+']';
		return this.childs[0].ArrayName()+'['+this.childs[1].LoopName()+'*'+this.childs[2].SizeName()+'+'+this.childs[2].LoopName()+']';
	}else{
		throw 'TODO generalize for any number of childs, just do the normal x*sizeY+y thing if its not the more complex pointer arithmetic kind of child';
	}
	*/


	if(this.apeType == 'float'){
		//FIXME float vs floatVal apeTypes?
		//return this.name;
		return this.FloatName();
	}else if(this.apeType == 'ptr'){
		//FIXME verify the loop vars are connected to the thing they're looping over, thru union, unionMax, copy, or directly.
		if(this.childs.length == 0){
			throw 'No array';
		}
		let array = this.childs[0];
		let sharedArrayName = this.sharedArrayName();
		if(this.childs.length == 2){
			let index = this.childs[1];
			//FIXME must use parr[offset+...], localpar[offset+...] and only give stackMem (sumB float) etc names.
			//Use this.name in the offsets, so its still Human readable, though Humans will normally read it in a new language Im making that generates the glsl code.
			//return 'TODO'+sharedArrayName+'_FIXME__'+array.ptrCode()+'['+index.indexCode()+']';
			return sharedArrayName+'['+array.OffsetName()+'+'+index.indexCode()+']';
		}else if(this.childs.length == 3){
			//return 'TODO'+sharedArrayName+'_FIXME__'+array.ptrCode()+'[todotwothings '+this.childs[1].indexCode()+'*something +'+this.childs[2].indexCode()+']';
			return sharedArrayName+'['+array.OffsetName()+this.childs[1].indexCode()+'*'+this.childs[2].size()+'+'+this.childs[2].indexCode()+'] /*FIXME WHY ISNT THIS GETTING CALLED IN ptrCode*/';
		}else throw 'TODO more general ptr indexing, numChilds='+this.childs.length;
	}else{
		return this.Name()+'_fromPtrcode_FIXME';
		//throw Error('TODO? Or maybe it should just be float and ptr apeTypes that can do ptrCode? apeType='+this.apeType);
	}
};

//returns string of apeType then .data as json then Name() of each child, separated by space. Or FIXME just make it a json of that and hash the tostring of that.
//FIXME make sure to sort keys before making json since different orders of adding them may result in different json string out so different id?
Ap.Ape.prototype.contentToHash = function(){
	let ob = {type: 'ape', apeType: this.apeType, data: this.data, childs: []};
	for(let child of this.childs) ob.childs.push(child.Name());
	return JSON.stringify(ob);
	/*let ob = ['ape', this.apeType, this.data];
	for(let child of this.childs) ob.push(child.Name());
	return JSON.stringify(ob);
	*/
};

//triggers lazyEval of name or just returns name.
Ap.Ape.prototype.Name = function(){
	if(!this.name){
		if(this.apeType == 'floatVal'){
			this.name = Ap.syncTypeToChar.const+this.data.floatVal; //FIXME should it just be '2.34' if thats the floatVal?
		}else{
			this.name = Ap.syncTypeToChar.const+Ap.sha256HexOfString(this.contentToHash());
		}
	}
	return this.name;
};

//for counting memory offsets in parrMem and localparMem and maybe later bigMem.
Ap.Ape.prototype.OffsetName = function(){
	return this.Name()+'_o';
};

Ap.Ape.prototype.SizeName = function(){
	/*if(this.apeType == 'floatVal'){ //FIXME?
		if(Math.floor(this.data.floatVal) != this.data.floatVal) throw 'Not an integer '+this.data.floatVal;
		return this.data.floatVal;
	}*/
	if(this.apeType == 'i%s') return this.data.size; //this is like 17%203 but what if its like 17%someName (a planned feature)? Should return someName.SizeName() in that case.
	return this.Name()+'_s';
};

//name of the loop var. .Name itself is the size.
Ap.Ape.prototype.LoopName = function(){
	/*if(this.apeType == 'floatVal'){ //FIXME?
		if(Math.floor(this.data.floatVal) != this.data.floatVal) throw 'Not an integer '+this.data.floatVal;
		return this.data.floatVal;
	}*/
	if(this.apeType == 'i%s') return this.data.iter;
	return this.Name()+'_i';
};

Ap.Ape.prototype.ArrayName = function(){
	return this.Name()+'_a';
};

Ap.Ape.prototype.FloatName = function(){
	return this.Name()+'_f';
};

//same tablev as caller. Called by toTinyGlslCodeRecurse for f+ f* and maybe others later but its likely just those 2 that are vararg that way???
Ap.Ape.prototype.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc = function(tablev, opString){
	let code = '';
	let multiLine = true; //FIXME check how long the line would be
	if(this.childs.length == 0) throw 'No childs';
	if(this.childs.length > 1) code += '(';
	for(let i=0; i<this.childs.length; i++){
		let ch = this.childs[i];
		if(i>0){
			if(opString != ',') code += ' ';
			code += opString;
			if(!multiLine) code += ' '; //' * ' for single line, ' *\n' for multiline.
		}
		//if(multiLine) code += Ap.nline(tablev+1)+ch.toTinyGlslCodeRecurse(tablev+1);
		if(multiLine) code += (i>0 ? Ap.nline(tablev+1) : '')+ch.toTinyGlslCodeRecurse(tablev+1);
		else code += ch.toTinyGlslCodeRecurse(0).trim();
	}
	if(multiLine) code += Ap.nline(tablev);
	code = code.trim();
	if(this.childs.length > 1) code += ')';
	return code;
	//return code.trim();
};

Ap.Ape.prototype.toTinyGlslCodeRecurse_tanhPowSinExpEtc = function(tablev, glslFuncName){
	//return glslFuncName+'('+this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(tablev, ',')+')';
	return glslFuncName+this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(tablev, ',');
};

Ap.Ape.prototype.updateEdGroups = function(circ){
	//console.log('Updating Eds and EdGroups in circ='+circ);
	if(Ap.logEdGroupStuff) console.log('Updating Eds and EdGroups in a circ');
	let ret = []; //list of edGroups, existing or new.
	let parrMems = this.searchApes(ape=>(Ap.ApeType=='parrMem'));
	//TODO also single floats if create a floatParrMem apeType (which 2023-10-23 doesnt exist and the float apeType means on glsl stack, not in parrMem).
	let targetNumEds = 0;
	for(let ape of parrMems){
		targetNumEds += ape.size();
	}
	while(targetNumEds < circ.edsOut.length){
		circ.edsOut.pop();
	}
	while(circ.edsOut.length < targetNumEds){
		circ.edsOut.push(new Ap.Ed(circ, 0, 0, 0, 0, 0)); //FIXME update those numbers
	}
	let edIndex = 0;
	for(let ape of parrMems){
		let targetNumEdsInThisGroup = ape.size();
		let existingEdGroup = circ.edsOut[edIndex].edGroup;
		if(existingEdGroup && existingEdGroup.eds.length == targetNumEdsInThisGroup){
			//TODO check if this is true for all eds in that group, and that they are the next eds in circ.edsOut. 
			if(Ap.logEdGroupStuff) console.log('Not changing existingEdGroup='+existingEdGroup);
			ret.push(existingEdGroup);
		}else{
			let eds = [];
			for(let i=0; i<targetNumEdsInThisGroup; i++){
				eds.push(circ.edsOut[edIndex+i]);
			}
			let newEdGroup = new Ap.EdGroup('edGroup for '+ape, eds); //sets each ed.edGroup, so that hooks it into the circ at circ.edsOut[index].edGroup.
			ret.push(newEdGroup);
			//newEdGroup.pointAtYXR(circ.x+(Math.random()*2-1)*.3, circ.y+(Math.random()*2-1)*.3, circ.r/3);
			newEdGroup.pointAtYXR(circ.y+(Math.random()*2-1)*.8, circ.x+(Math.random()*2-1)*.8, circ.r/5);
			if(Ap.logEdGroupStuff) console.log('Making edGroup for ape='+ape+' in circ.eds['+edIndex+'..'+(edIndex+targetNumEdsInThisGroup-1)+'], newEdGroup='+newEdGroup);
		}
		edIndex += targetNumEdsInThisGroup;
	}
	return ret;
};

Ap.Ape.prototype.toTinyGlslCode = function(){
	let code = '';
	let parrMems = this.searchApes(ape=>(Ap.ApeType=='parrMem'));
	let localparMems = this.searchApes(ape=>(Ap.ApeType=='localparMem'));
	let floatMems = this.searchApes(ape=>(Ap.ApeType=='float'));
	let tablev = 0;
	let parrMemOffset = 3; //FIXME get this from oGlo/nGlo? But for now just hardcode this as 3 since theres {x} {y} {z} apeTypes.
	for(let parrMemApe of parrMems){
		//TODO merge duplicate code between parrMem, localparMem, and maybe bigMem
		//code += Ap.nline(tablev)+'parrMem TODO: '+parrMemAp.Name()+'['+parrMemAp.size()+']';
		let size = parrMemAp.size();
		code += Ap.nline(tablev)+'const int '+parrMemAp.OffsetName()+' = '+parrMemOffset+'; //array offset in parrMem';
		code += Ap.nline(tablev)+'const int '+parrMemAp.SizeName()+' = '+size+'; //array size in parrMem';
		parrMemOffset += size;
		if(parrMemOffset > 1000){ //FIXME get this var from somewhere, maybe in TinyGlsl. max something (var name).
			throw 'parrMemOffset='+parrMemOffset+' so far, which is too big. the last parrMemApe is '+parrMemApe;
		}
	}
	let localparMemOffset = 0;
	for(let localparMemApe of localparMems){
		//TODO merge duplicate code between parrMem, localparMem, and maybe bigMem
		//code += Ap.nline(tablev)+'localparMem TODO: '+localparMemAp.Name()+'['+localparMemAp.size()+']';
		let size = localparMemAp.size();
		code += Ap.nline(tablev)+'const int '+localparMemAp.OffsetName()+' = '+localparMemOffset+'; //array offset in localparMem';
		code += Ap.nline(tablev)+'const int '+localparMemAp.SizeName()+' = '+size+'; //array size in localparMem';
		localparMemOffset += size;
		if(parrMemOffset > 3000){ //FIXME get this var from somewhere, maybe in TinyGlsl. max something (var name). As of 2023-10-14 tinyGlsl doesnt have a localparMem or bigMem, just parrMem.
			throw 'localparMemOffset='+localparMemOffset+' so far, which is too big. the last localparMemApe is '+localparMemApe;
		}
	}
	//TODO bigMem (that doesnt fit in GPU core)?
	for(let floatMemApe of floatMems){
		//code += Ap.nline(tablev)+'floatMem TODO: '+floatMemAp.Name();
		code += Ap.nline(tablev)+'float '+floatMemAp.FloatName()+' = 0.;';
	}
	code += this.toTinyGlslCodeRecurse(tablev);
	if(code.startsWith('\n')) code = code.substring(1);
	return code;
};

Ap.Ape.prototype.toTinyGlslCodeRecurse = function(tablev){
	let code = '';
	if(this.apeType == '*'){
		for(let c=0; c<this.childs.length-1; c++){
			let ch = this.childs[c];
			//code += Ap.nline(tablev+c)+'for(int '+ch.LoopName()+'=0; '+ch.LoopName()+'<'+ch.SizeName()+'; '+ch.LoopName()+'++){';
			code += Ap.nline(tablev+c)+'for(int '+ch.LoopName()+'=0; '+ch.LoopName()+'<'+ch.size()+'; '+ch.LoopName()+'++){';
		}
		let lastIndex = this.childs.length-1;
		code += this.childs[lastIndex].toTinyGlslCodeRecurse(tablev+lastIndex);
		for(let c=this.childs.length-2; c>=0; c--){
			let ch = this.childs[c];
			code += Ap.nline(tablev+c)+'}';
			if(Ap.toTinyGlslCode_putsLoopNameInClosingBraceComment){
				code += '//'+ch.Name();
			}
		}
		//code += Ap.nline(tablev)+'for(let '+this.Name()+'=0; '+this.Name()+'<TODO; '+this.Name()+'++){';
		//code += 'for(let '+this.Name()+'=0; '+this.Name()+'<'+this.childs[0].ptrCode()+'.length; '+this.Name()+'++){\n';
		//FIXME gpt made up this.childs[0].ptrCode(), what should be there instead
		//code += Ap.nline(tablev+1)+'TODO inner loops/forks'+n;
		//code += Ap.nline(tablev)+'}'+n;
	}else if(this.apeType == 'iftri'){
		code += Ap.nline(tablev)+'if('+this.childs[0].LoopName()+'<'+this.childs[1].LoopName()+'){ //iftri. TODO optimize this as triangle loop if its parents can';
		code += this.childs[2].toTinyGlslCodeRecurse(tablev+1);
		code += Ap.nline(tablev)+'}';
	}else if(this.apeType == '+'){
		for(let child of this.childs){
			if(child.outermostIsDeclaringMem()){
				code +=  Ap.nline(tablev)+'//outermostIsDeclaringMem '+child.Name();
			}else{
				code += child.toTinyGlslCodeRecurse(tablev);
			}
		}
	}else if(this.apeType == 'f='){
		if(this.childs.length != 2) throw 'f= must have 2 params';
		//code += Ap.nline(tablev)+this.childs[0].ptrCode()+' = '+this.childs[1].toTinyGlslCodeRecurse(tablev+1).trim()+';'; //FIXME make a func that does it in 1 line
		code += Ap.nline(tablev)+this.childs[0].toTinyGlslCodeRecurse(tablev+1)+' = '+this.childs[1].toTinyGlslCodeRecurse(tablev+1).trim()+';'; //FIXME one line or multiline depending on length
	}else if(this.apeType == 'f+='){
		code += Ap.nline(tablev)+this.childs[0].ptrCode()+' += '+this.childs[1].toTinyGlslCodeRecurse(tablev+1).trim()+';'; //FIXME make a func that does it in 1 line
	}else if(this.apeType == 'f*='){
		//FIXME if more params, * them all like in f*
		code += Ap.nline(tablev)+this.childs[0].ptrCode()+' *= '+this.childs[1].toTinyGlslCodeRecurse(tablev+1).trim()+';'; //FIXME make a func that does it in 1 line
	}else if(this.apeType == 'f/='){
		code += Ap.nline(tablev)+this.childs[0].ptrCode()+' /= '+this.childs[1].toTinyGlslCodeRecurse(tablev+1).trim()+';';
	}else if(this.apeType == 'f+'){
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(tablev, '+');
	}else if(this.apeType == 'f-'){
		if(this.childs.length == 1){
			code += '-'+this.childs[0].toTinyGlslCodeRecurse(tablev+1).trim();
		}else if(this.childs.length == 2){
			code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(tablev, '-');
		}else throw 'f- must have 1 or 2 params';
	}else if(this.apeType == 'f*'){
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(tablev, '*');
		/*let multiLine = true; //FIXME check how long the line would be
		code += '(';
		for(let i=0; i<this.childs.length; i++){
			let ch = this.childs[i];
			if(i>0) code += ' * ';
			if(multiLine) code += Ap.nline(tablev+1)+ch.toTinyGlslCodeRecurse(tablev+1);
			else code += ch.toTinyGlslCodeRecurse(0).trim();
		}
		if(multiLine) code += Ap.nline(tablev);
		code += ')';
		//code += ';';
		*/
	}else if(this.apeType == 'sigmoid'){
		code += '(1./(1.+exp(-'+this.childs[0].toTinyGlslCodeRecurse(tablev+1).trim()+')))';
	}else if(this.apeType == 'ftanh'){
		//code += 'tanh('+this.childs[0].toTinyGlslCodeRecurse(tablev+1).trim()+')';
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(tablev, 'tanh');
	}else if(this.apeType == 'fatan'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(tablev, 'atan');
	}else if(this.apeType == 'fsin'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(tablev, 'sin');
	}else if(this.apeType == 'fcos'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(tablev, 'cos');
	}else if(this.apeType == 'fhypot'){
		if(2 <= this.childs.length && this.childs.length <= 4){
			code += 'length(vec'+this.childs.length+this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(tablev,',')+')';
			//Example: length(vec2(3., 4.)) returns 5 except roundoff
		}
	}else if(this.apeType == 'fmax'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(tablev, 'max');
	}else if(this.apeType == 'fmin'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(tablev, 'min');
	}else if(this.apeType == 'fmod'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(tablev, 'fmod'); //FIXME check for divide by 0? or just let it become NaN or plus/minus infinity?
	}else if(this.apeType == 'f/'){
		//code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(tablev, '/'); //FIXME check for divide by 0? or just let it become NaN or plus/minus infinity?
		code += Ap.nline(tablev)+this.childs[0].toTinyGlslCodeRecurse(tablev)+'/'+this.childs[1].toTinyGlslCodeRecurse(tablev+1).trim();
	}else if(this.apeType == 'fexp'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(tablev, 'exp'); //FIXME is it fexp?
	}else if(this.apeType == 'f**'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(tablev, 'pow'); //FIXME is it fpow?
	}else if(this.apeType == 'float'){ //a float var name
		//code += Ap.nline(tablev)+this.FloatName();
		code += this.FloatName(); //FIXME nline?
	}else if(this.apeType == 'floatVal'){
		code += Ap.jsNumToGlslFloat(this.data.floatVal);
	}else if(this.apeType == 'freturn'){
		if(this.childs.length != 1){
			throw 'x. Must be 1 childs if apeType freturn but is '+this.childs.length;
		}
		code += Ap.nline(tablev)+'return '+this.childs[0].toTinyGlslCodeRecurse(0).trim()+';'; //FIXME make a func that does it in 1 line
	}else if(this.apeType == 'flast'){ //get last float in an array
		//return this.childs[0].ArrayName()+'['+this.childs[0].SizeName()+'-1]';
		return this.childs[0].ArrayName()+'['+(this.childs[0].size()-1)+']';
	}else if(this.apeType == 'doLast'){
		if(this.childs.length < 1){
			throw 'Must be at least 1 child: '+this.childs.length;
		}
		//TODO might still be some arrays in the earlier childs need to allocate parr_vs_localpar_vs_stack_vs_bigGlobalMem
		code += this.childs[this.childs.length-1].toTinyGlslCodeRecurse(tablev); //last child
	}else if(this.apeType == 'ptr'){
		if(this.childs.length < 2){
			throw 'ptr. Must be at least 2 childs (arrayName and index, or can have multiple indexs or other ptr arithmetic) is '+this.childs.length;
		}
		let sharedArrayName = this.sharedArrayName();
		let array = this.childs[0];
		if(this.childs.length == 2){
			//return this.childs[0].ArrayName()+'['+this.childs[1].LoopName()+']';
			return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].LoopName()+']';
		}else if(this.childs.length == 3){
			//return this.childs[0].ArrayName()+'['+this.childs[1].LoopName()+'*'+this.childs[2].SizeName()+'+'+this.childs[2].LoopName()+']';
			//return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].LoopName()+'*'+this.childs[2].SizeName()+'+'+this.childs[2].LoopName()+']';
			return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].LoopName()+'*'+this.childs[2].size()+'+'+this.childs[2].LoopName()+']';
		}else if(this.childs.length == 4){
			//TODO optimize by this part being just 1 number: '*('+this.childs[2].SizeName()+'*'+this.childs[3].SizeName()+')+'+
			//return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].LoopName()+'*('+this.childs[2].SizeName()+'*'+this.childs[3].SizeName()+')+'+
			//	this.childs[2].LoopName()+'*'+this.childs[3].SizeName()+'+'+this.childs[3].LoopName()+']';
			return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].LoopName()+'*'+(this.childs[2].size()*+this.childs[3].size())+
				this.childs[2].LoopName()+'*'+this.childs[3].size()+'+'+this.childs[3].LoopName()+']';
		}else{
			throw 'TODO generalize for any number of childs, just do the normal x*sizeY+y thing if its not the more complex pointer arithmetic kind of child';
		}
	}else if(this.apeType == 'x'){
		//read-only x dimension if this is a 2d or 3d cross-section of a many dimensional scalar field.
		//TODO generalize this to the oGlo/nGlo vars so its not specific to x y and z. More generally, Ap.Ape is many GPU codes run on many shared vars in many combos,
		//so far only up to 1000 float vars / dimensions at once but when global memory is added in tinyGlsl (which is much slower than parrMem and localparMem) that could change.
		return 'x';
		if(this.childs.length){
			throw 'x. Must be 0 childs if apeType is x, y  or z (or more generally any of the oGlo/nGlo vars) but is '+this.childs.length;
		}
	}else if(this.apeType == 'y'){ //similar to x
		if(this.childs.length){
			throw 'y. Must be 0 childs if apeType is x, y  or z (or more generally any of the oGlo/nGlo vars) but is '+this.childs.length;
		}
		return 'y';
	}else if(this.apeType == 'z'){ //similar to x
		if(this.childs.length){
			throw 'z. Must be 0 childs if apeType is x, y  or z (or more generally any of the oGlo/nGlo vars) but is '+this.childs.length;
		}
		return 'z';
	}else if(this.apeTypeIsSimpleSize()){
		code += 'float('+this.LoopName()+')';
	}
	if(!code){
		code = Ap.nline(tablev)+'TODO apeType='+this.apeType+' toTinyGlslCodeRecurse here, ape='+Ap.limitStringLen(this.toApeCode(),35); //TODO make sure this toApeCode is 1 line
	}
	return code;
};

//returns a list of Ape matching query(ape)->true in depthFirst order
//Example: ape.seachApes(ape=>(Ap.ApeType=='parrMem'))
Ap.Ape.prototype.searchApes = function(query){
	let list = [];
	let set = new Set(); //avoids dups
	this.searchApesRecurse(query, list, set);
	return list;
};

Ap.Ape.prototype.searchApesRecurse = function(query, list, set){
	for(let child of this.childs){
		child.searchApesRecurse(query, list, set);
	}
	if(!set.has(this) && query(this)){
		list.push(this);
		set.add(this);
	}
};

Ap.Ape.prototype.indexCode = function(){ //FIXME i think this has been replaced by ape.LoopName()??
	return this.name+'_i'; //FIXME check if this duplicates another name
};

Ap.Ape.prototype.code = function(){
	throw 'TODO';
};

Ap.doSimpleApeTests = function(){
	console.log('START Ap.doSimpleApeTests()');
	let apeCodes = [ //TODO more tests
		'(sizeB 5)',
		'(matAB * (sizeA 3) sizeA)',
		'[(sizeA 2) (sizeB 3) (sizeC 4)]',
		'(matAB * (sizeA 5) (sizeB 7))',
		'{* (sizeA 5) (sizeB 7)}',
		'{5}',
		'{* {5} (sizeB 7)}',
		'{* {5} {7}}',
		'{* (sizeA 5) {7}}',
		'2.34',
		'<(varB float) 2.34>',
		'<(varB float) (varC float)>',
		'[(matAB * (sizeA 5) (sizeB 7)) sizeA sizeB]',
		'{x}',
		'{y}',
		'{z}',
		'{f+ {x} {y} {z} 1000}',
	];
	for(let apeCode of apeCodes){
		console.log('\nTesting apeCode='+apeCode);
		let parseApe = Ap.parseApeCode(apeCode);
		console.log('parseApe='+parseApe);
		let ape = parseApe.toApe();
		let backToApeCode = ape.toApeCode();
		console.log('backToApeCode='+backToApeCode);
		//FIXME indented/etc code will look different than messy inputs like (matAB *    (sizeA\n\n\n 3) sizeA) vs (matAB * (sizeA 3) sizeA)
		if(apeCode != backToApeCode){
			throw 'apeCode:\n'+apeCode+'\n!= backToApeCode:\n'+backToApeCode+'\nbut FIXME is it just indenting/etc? FIXME check it with normed whitespace. Make a func to norm whitespace.';
		}
		console.log('Test pass, apeCode='+apeCode+'\n');
	}
	console.log('END Ap.doSimpleApeTests(), all tests pass.');
};

/*2023-10-6-1232pET
Test pass, apeCode=(sizeB 5)

Dagball056.html:3664 Test pass, apeCode=(matAB * (sizeA 3) sizeA)

Dagball056.html:3664 Test pass, apeCode=[(sizeA 2) (sizeB 3) (sizeC 4)]

Dagball056.html:3664 Test pass, apeCode=(matAB * (sizeA 5) (sizeB 7))

Dagball056.html:3664 Test pass, apeCode={* (sizeA 5) (sizeB 7)}

Dagball056.html:3664 Test pass, apeCode={5}

Dagball056.html:3664 Test pass, apeCode={* {5} (sizeB 7)}

Dagball056.html:3664 Test pass, apeCode={* {5} {7}}

Dagball056.html:3664 Test pass, apeCode={* (sizeA 5) {7}}

Dagball056.html:3664 Test pass, apeCode=2.34

Dagball056.html:3664 Test pass, apeCode=<(varB float) 2.34>

Dagball056.html:3664 Test pass, apeCode=<(varB float) (varC float)>

Dagball056.html:3664 Test pass, apeCode=[(matAB * (sizeA 5) (sizeB 7)) sizeA sizeB]

Dagball056.html:3666 END Ap.doSimpleApeTests(), all tests pass.
Dagball056.html:933 tenThousandFloatsOut test pass
Dagball056.html:953 TinyGlsl.simple test A pass
Dagball056.html:987 TinyGlsl.simple test B pass
Dagball056.html:1003 tenThousandFloatsOutB test pass
Ap.parseApeCode('{* {5} (sizeB 2)}').toApe().contentToHash()
'{"type":"ape","apeType":"*","data":{},"childs":["c1efccd6afd44eede3f5fdec9fe2956d3f5ad80a8c3d277e2a28f2649aca7c44a","sizeB"]}'
Ap.parseApeCode('2.34').toApe().contentToHash()
'{"type":"ape","apeType":"floatVal","data":{"floatVal":2.34},"childs":[]}'
Ap.parseApeCode('2.34').toApe().Name()
'c2.34'
Ap.parseApeCode('{* {5} (sizeB 2)}').toApe().Name()
'c93f881ed79ef1e9d1a9201eb52c0a96416e4f40a0e9671ddeb8b6d5b6082f31f'
Ap.parseApeCode('(mulXX * {5} (sizeB 2))').toApe().Name()
'mulXX'
Ap.parseApeCode('(mulXX * {5} (sizeB 2))').toApe().childs[0].Name()
'c1efccd6afd44eede3f5fdec9fe2956d3f5ad80a8c3d277e2a28f2649aca7c44a'
Ap.parseApeCode('(mulXX * {5} (sizeB 2))').toApe().childs[0].toApeCode()
'{5}'
*/

if(Ap.whenBoot_doSimpleApeTests){
	Ap.doSimpleApeTests();
}

//Ap.Ape.prototype.codeToReadFloat = function()


/*
Write example Apes as (name apeType childs...)...

//TODO capital name like MatDimC means the size. lowercase first letter of the same like matDimC means the loop var from 0 to MatDimC-1.
//Or maybe merge those and use lowercase for both and let which param it is decide.
//
//TODO should [...] be a separate object type than (name type params...)? [...] would be an address like in
//(AddToSumB f= SumB (MultiplyStuff3445 f* [MatAB matDimA matDimB] [MatBC matDimB matDimC]))
//(TODO... copy sumB into in matAC at matDimA_loopIndex*matDimB+matDimC_loopIndex)
//(CopySumBIntoMatAC f= [MatAC MatDimA MatDimC] SumB)
//Might want recursive addresses [Thing LoopVarA [InnerThing LoopVarB LoopVarC] LoopVarD] or something like that.
//Maybe use apeType of 'ptr' (pointer) with those so [MatAC MatDimA MatDimC] means (SomeNameNotDisplayed ptr MatAC MatDimA MatDimC).
//It can be used for reading float or writing float.
//Use the {...} syntax to skip giving a name and have it generated from content (TODO by sha256?),
//and prevent other names from being a hash unless its also the hash of their content.
//
//[Thing LoopVarA [InnerThing LoopVarB LoopVarC] LoopVarD]
//{ptr Thing LoopVarA {ptr InnerThing LoopVarB LoopVarC} LoopVarD}
//(TheHash34234 ptr Thing LoopVarA (OtherHash444 ptr InnerThing LoopVarB LoopVarC) LoopVarD)
//
//And Ill take <...stuff> syntax for {f= ...stuff} aka (GeneratedName435 f= ...stuff)
//{f= [MatAC MatDimA MatDimC] SumB} aka <[MatAC MatDimA MatDimC] SumB>
//aka (GeneratedName3344 f= (OtherGenName446 ptr MatAC MatDimA MatDimC) SumB).
//
(root threadTimeMemMemMem
	//(NumGpuThreads const 1001)
	//thread id must be the multiply of 2 ints each within 16k or 8k or 4k or something like that, which is a webgl2 GLSL limit, varies by computer.
	(numGpuThreadsY const 1001)
	(numGpuThreadsX const 1)
	(time +
		(doRadiusWaves +
			(TOOD...)
			(TOOD...)
		)
		//FIXME forEach_hypercubewaveDim should loop toExcl hypercubewaveDims, not a *???
		(forEach_hypercubewaveDim *
			(hypercubewaveExponentialLoop pow (hyperTwo const 2) (hypercubewaveDims const 7))
			hypercubewaveDims
		)
		(raymarchMandelbulbTODO const 1)
		(forestCurveFitDoubleTriangleNeuralnet +
			(TOOD...)
			(TOOD...)
		)
		(matmulABCLoop *
			matDimA
			matDimC
			(sumInDimBSteps +
				<sumB 0.>
				(sumInDimB_loop *
					matDimB
					{f+= sumB {f* [matAB matDimA matDimB] [matBC matDimB matDimC]}}
				)
				<[matAC matDimA matDimC] sumB>
			)
		)
	)
	(parrMem +
		(one const 1) //TODO code shoudl fill this with float 1. The 1 here means size in memory, 1 float.
		(radiusWaves * (waveSize const 2) (numWaves const 5))
		(hypercubewaveAftransToYX * hyperTwo hypercubewaveDims)
		(matmulABCMem +
			(matAB * (matDimA const 7) (matDimB const 3))
			(matBC * matDimB (matDimC const 5))
			(matAC * matDimA matDimC)
		)
	)
	(localparMem unionMax
		(doubleTriangleStuff +
			(doubleTriangleWeights * (numForestCurveFitNodes const 12) numForestCurveFitNodes)
			(outerJoinForestCurveFitNodeWithMathOp *
				numForestCurveFitNodes
				(forestCurveFitNumMathOpsTodoAllApprox20OfThem const 5)
			)
		)
		(todoOtherUsesOfLocalparMem const 10)
		(bayes6Node + (pow (numBayesColors const 3) (bayesVarsPerNode const 6)) )
	)
	(stackMem +
		(returnFloat float)
		(takeTurnsUsingStackMem unionMax
			(doRadiusWaves_stackVars +
				(d float)
				(e float)
				(f float)
				(g float)
				(h float)
			)
			(hypercubewave_stackVars +
				(TODO...)
			)
			(raymarchMandelbulb_stackVars +
				(TODO...)
			)
			(matmulABC_stackVars +
				(sumB float)
			)
		)
	)
)







(forestCurveFitTest doLast
	(fcfDoubleTriangleWeights parrMem {union
		{* (numForestCurveFitNodes 12) (numForestCurveFitMathOps 5)})
		{}
	})
	(fcfNodeOps parrMem {* numForestCurveFitNodes numForestCurveFitMathOps})
	(fcfDiag localparMem numForestCurveFitNodes)
	{+
		{*
			numForestCurveFitNodes
			TODO...
		}
		(TOOD...)
		(TOOD...)
	}
)


(forestCurveFitTest doLast
	(numForestCurveFitNodes 12)
	(numForestCurveFitMathOps 5)
	(fcfRow copy numForestCurveFitNodes)
	(fcfCol copy numForestCurveFitNodes)
	(fcfDoubleTriangleWeights parrMem {union
		{* fcfCol fcfRow}
		{* fcfRow fcfCol}
	})
	(fcfNodeOps parrMem {* numForestCurveFitNodes numForestCurveFitMathOps})
	(fcfDiag localparMem numForestCurveFitNodes)
	{+
		{*
			numForestCurveFitNodes
			TODO...
		}
		(TOOD...)
		(TOOD...)
	}
)












OLD parrMem before converted (matDimA const 7) to just (matDimA 7) so 7 is a type cuz it means float[7] and I dont want the 7 in the childs area.
	FIXME but then how to do (matAB * (matDimA const 7) (matDimB const 3)). Would that be (matAB * (matDimA 7) (matDimB 3))?
	(parrMem +
		(one const 1) //TODO code shoudl fill this with float 1. The 1 here means size in memory, 1 float.
		(radiusWaves * (waveSize const 2) (numWaves const 5))
		(hypercubewaveAftransToYX * hyperTwo hypercubewaveDims)
		(matmulABCMem +
			(matAB * (matDimA const 7) (matDimB const 3))
			(matBC * matDimB (matDimC const 5))
			(matAC * matDimA matDimC)
		)
	)
//Each Ap.Circ should give 1 parrMem, 1 localparMem, and 1 stackMem.
//Some parts will be generated but do need to be in the math model. All the varNames for a Ap.Circ
//will be prefixed by something unique to that circ so they dont overlap vars from other circs.
*/


//console.log('Ap.doSimpleApeTests()...');
//Ap.doSimpleApeTests();

/*2023-10-30-1015pET:
Ape found TinyGlsl = [object Object] (else throw cuz not found)
Ape.js:1521 Ap.doSimpleApeTests()...
Ape.js:1255 START Ap.doSimpleApeTests()
Ape.js:1276 
Testing apeCode=(sizeB 5)
Ape.js:1278 parseApe=(sizeB 5)
Ape.js:1281 backToApeCode=(sizeB 5)
Ape.js:1286 Test pass, apeCode=(sizeB 5)

Ape.js:1276 
Testing apeCode=(matAB * (sizeA 3) sizeA)
Ape.js:1278 parseApe=(matAB * (sizeA 3) sizeA)
Ape.js:1281 backToApeCode=(matAB * (sizeA 3) sizeA)
Ape.js:1286 Test pass, apeCode=(matAB * (sizeA 3) sizeA)

Ape.js:1276 
Testing apeCode=[(sizeA 2) (sizeB 3) (sizeC 4)]
Ape.js:1278 parseApe=[(sizeA 2) (sizeB 3) (sizeC 4)]
Ape.js:1281 backToApeCode=[(sizeA 2) (sizeB 3) (sizeC 4)]
Ape.js:1286 Test pass, apeCode=[(sizeA 2) (sizeB 3) (sizeC 4)]

Ape.js:1276 
Testing apeCode=(matAB * (sizeA 5) (sizeB 7))
Ape.js:1278 parseApe=(matAB * (sizeA 5) (sizeB 7))
Ape.js:1281 backToApeCode=(matAB * (sizeA 5) (sizeB 7))
Ape.js:1286 Test pass, apeCode=(matAB * (sizeA 5) (sizeB 7))

Ape.js:1276 
Testing apeCode={* (sizeA 5) (sizeB 7)}
Ape.js:1278 parseApe={* (sizeA 5) (sizeB 7)}
Ape.js:1281 backToApeCode={* (sizeA 5) (sizeB 7)}
Ape.js:1286 Test pass, apeCode={* (sizeA 5) (sizeB 7)}

Ape.js:1276 
Testing apeCode={5}
Ape.js:1278 parseApe={5}
Ape.js:1281 backToApeCode={5}
Ape.js:1286 Test pass, apeCode={5}

Ape.js:1276 
Testing apeCode={* {5} (sizeB 7)}
Ape.js:1278 parseApe={* {5} (sizeB 7)}
Ape.js:1281 backToApeCode={* {5} (sizeB 7)}
Ape.js:1286 Test pass, apeCode={* {5} (sizeB 7)}

Ape.js:1276 
Testing apeCode={* {5} {7}}
Ape.js:1278 parseApe={* {5} {7}}
Ape.js:1281 backToApeCode={* {5} {7}}
Ape.js:1286 Test pass, apeCode={* {5} {7}}

Ape.js:1276 
Testing apeCode={* (sizeA 5) {7}}
Ape.js:1278 parseApe={* (sizeA 5) {7}}
Ape.js:1281 backToApeCode={* (sizeA 5) {7}}
Ape.js:1286 Test pass, apeCode={* (sizeA 5) {7}}

Ape.js:1276 
Testing apeCode=2.34
Ape.js:1278 parseApe=2.34
Ape.js:1281 backToApeCode=2.34
Ape.js:1286 Test pass, apeCode=2.34

Ape.js:1276 
Testing apeCode=<(varB float) 2.34>
Ape.js:1278 parseApe=<(varB float) 2.34>
Ape.js:1281 backToApeCode=<(varB float) 2.34>
Ape.js:1286 Test pass, apeCode=<(varB float) 2.34>

Ape.js:1276 
Testing apeCode=<(varB float) (varC float)>
Ape.js:1278 parseApe=<(varB float) (varC float)>
Ape.js:1281 backToApeCode=<(varB float) (varC float)>
Ape.js:1286 Test pass, apeCode=<(varB float) (varC float)>

Ape.js:1276 
Testing apeCode=[(matAB * (sizeA 5) (sizeB 7)) sizeA sizeB]
Ape.js:1278 parseApe=[(matAB * (sizeA 5) (sizeB 7)) sizeA sizeB]
Ape.js:1281 backToApeCode=[(matAB * (sizeA 5) (sizeB 7)) sizeA sizeB]
Ape.js:1286 Test pass, apeCode=[(matAB * (sizeA 5) (sizeB 7)) sizeA sizeB]

Ape.js:1276 
Testing apeCode={x}
Ape.js:1278 parseApe={x}
Ape.js:1281 backToApeCode={x}
Ape.js:1286 Test pass, apeCode={x}

Ape.js:1276 
Testing apeCode={y}
Ape.js:1278 parseApe={y}
Ape.js:1281 backToApeCode={y}
Ape.js:1286 Test pass, apeCode={y}

Ape.js:1276 
Testing apeCode={z}
Ape.js:1278 parseApe={z}
Ape.js:1281 backToApeCode={z}
Ape.js:1286 Test pass, apeCode={z}

Ape.js:1276 
Testing apeCode={f+ {x} {y} {z} 1000}
Ape.js:1278 parseApe={f+ {x} {y} {z} 1000}
Ape.js:1281 backToApeCode={f+ {x} {y} {z} 1000}
Ape.js:1286 Test pass, apeCode={f+ {x} {y} {z} 1000}

Ape.js:1288 END Ap.doSimpleApeTests(), all tests pass.
*/