//Ben F Rayfield offers Axgob.js/AG under opensource MIT license.
//Axgob is a variant of Gob.js that merges the wikibinator203 VarargAx opcode with Gob objects.
//Axgob is a universal-pattern-calculus-combinator as a pure deterministic Layer
//and on top of that has sparse-dimensional-vectors like in Gob.js/GB
//using such combinators as primaryKeys.
const AG = (()=>{
	const AG = {};
	
	AG.symNeutral = 0;
	//AG.symField = TODO choose an int to be that symbol; maybe use 4 UTF8/ASCII bytes so it can be a string size 4?
	//AG.symRule = TODO choose an int to be that symbol; maybe use 4 UTF8/ASCII bytes so it can be a string size 4?
	
	//each Axgob is a forest node that has an int32, and a left/func/l Axgob, and a right/param/r Axgob,
	//similar to in wikibinator203 (L x (R x)) equals x forall x, but with a third child thats always an int.
	//That int represents exactly itself (no other axgob childs etc needed) if its one of the 2**32 leaf Axgobs.
	//(L aLeaf) is (F U) aka identityFunc. (R aLeaf) is aLeaf, whichever of the 2**32 possible leafs it is.
	//(L 345 (R 345)) equals 345.
	//Axgob opcodes will be simple, much fewer of them than wikibinator203 opcodes,
	//and will have S Pair T F L R GetInt Isleaf Iadd Ineg Imul Ishll Ishrr Ishrrr Iand Ior Inot Idiv etc.
	//TODO Axgob always has perfect dedup.
	//TODO also doubles for the gob p v dp dv kv ap zp av zv parts?
	//All possible Axgob forest shapes are valid,
	//and you (see hyperquasicrystal and urbit_nock for similar) go along the redEdge to eval it,
	//which may halt (halts on itself if its a true VarargAx call or is waiting for more curries)
	//or halts on something else as lambdas called on lambdas find/create lambdas, or may never halt.
	//If need math abstraction of something not halting, could define an edge type
	//that points at (T returnVal) if halts else (F U) if does not halt,
	//or (U returnVal) if halts else U if not halt,
	//or like VarargAx works its U to halt on itself, (U returnVal) to halt on returnVal,
	//and not halt to mean not halt, though I might want to redesign some of that in Axgob.
	let Axgob = AG.Axgob = function(sim, i, l, r){
		
		//In Gob.js there is a Sim/simulation object that has a namespace string like '$testNs567'.
		//Gobs dont directly interact with gobs outside their namespace, so its just copied. Sim.ns is that string.
		//If you find axgobs across the internet, you can sync with their namespace. The combinators
		//are primaryKeys so there is no ambiguity in keys, only disagreements on number values,
		//though VarargAx can take up to any finite time
		//to prove true statements are true, and can never prove false statements are true,
		//and can be used as a formal-verifier for statements that take finite time to verify.
		//The purpose of sim/namespace is to hold an Octree of axgobs
		//(int value of AG.symField can make x y z rad fields of any axgob) especially the gob parts
		//and to be part of the compositeKey of (namespaceString,combinator) so you can have
		//multiple vectors that disagree on the gob numbers (position/p and velocity/v)
		//at the dimensions named by the combinators. Each namespaceString is 1 mutable vector
		//in up to around a googolplex number of dimensions (see h=>h*h+1 reach googolplex a few hundred
		//cycles deep, the number of unique binary forest shapes, explained in wikibinator203 docs), sparsely.
		this.sim = sim;
		
		//Immutable universal-pattern-calculus-combinator stuff. Combinators are primaryKeys of the gob numbers.
		this.i = i|0; //int32
		this.l = l; //left/func/l
		this.r = r; //right/param/r
		//FIXME might be better to derive IFPR (int func param return funcall caching) from VarargAx
		//since it can exactly represent every possible value here in combo with the i l and r lambda childs.
		this.e = null; //redEdge from here, lazyEvaled.
		
		//Mutable gob stuff. The immutable combinators are primaryKeys of the gob numbers.
		//TODO also doubles for the gob p v dp dv kv ap zp av zv parts?
		//Use one of the ints as the symbol for gobField, and one for gobRule, etc,
		//and be careful not to interpret them that way if its a leaf (the int itself).
		this.p = this.v = this.dp = this.dv = this.kv = this.ap = this.zp = this.av = this.zv = 0;
		
	};
	
	TODO should opcodes be defined by int param like (U_aka_0 31) is opcode 31? 0 is U of course,
	so could write it as (0 31 x) returns x.l, or whatever opcode it is.
	Could &31 the int to make it always have 32 possible values.
	Or even simpler could just use the ints 0..31 as such opcodes, if you call them as lambdas.
	That could interfere with cbt. Not sure if i wanna derive cbt from varargax
	vs build in Bit0 and Bit1 opcodes like i did in wikibinator203 vs build in 64k cbts in the int values etc.
	
	return AG;
})();