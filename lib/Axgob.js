//Ben F Rayfield offers Axgob.js/AG under opensource MIT license.
//Axgob is a variant of Gob.js that merges the wikibinator203 VarargAx opcode with Gob objects.
//Axgob is a universal-pattern-calculus-combinator as a pure deterministic layer
//and on top of that has mutable sparse-dimensional-vectors like in Gob.js/GB using such
//combinators as primaryKeys of the dimensions the vectors are positions in.
//Axgobs are comparable and sortable and theres superexponentially many of them possible of height
//so has more than enough room for a multiverse of possible game rules to be explored.
//Its for massively multiplayer turing-complete-customizable game rules
//to vary like exploring a multiverse of many possible game rules with millions of other people live,
//and some of the players might decide to explore different game rules,
//and some of the other players follow them into that area of multiverse and some dont or other combos.
const AG = (()=>{
	const AG = {};

	//[minX,maxXExcl,minY,maxYExcl,minZ,maxZExcl]. A 2**16 cube centered at (0,0,0). Must be a powOf2.
	AG.outerBounds = [-(2**15), 2**15, -(2**15), 2**15, -(2**15), 2**15];
	
	AG.symNeutral = 0;
	//AG.symField = gob field. TODO choose an int to be that symbol; maybe use 4 UTF8/ASCII bytes so it can be a string size 4?
	//AG.symRule = gob game rule. TODO choose an int to be that symbol; maybe use 4 UTF8/ASCII bytes so it can be a string size 4?
	
	//each Axgob is a forest node that has an int32, and a left/func/l Axgob, and a right/param/r Axgob,
	//similar to in wikibinator203 (L x (R x)) equals x forall x, but with a third child thats always an int.
	//That int represents exactly itself (no other axgob childs etc needed) if its one of the 2**32 leaf Axgobs.
	//(L aLeaf) is (F U) aka identityFunc. (R aLeaf) is aLeaf, whichever of the 2**32 possible leafs it is.
	//(L 345 (R 345)) equals 345.
	//Axgob opcodes will be simple, much fewer of them than wikibinator203 opcodes,
	//and will have S Pair T F L R GetInt Isleaf Iadd Ineg Imul Ishll Ishrr Ishrrr Iand Ior Inot Idiv etc.
	//Axgob always has perfect dedup since combinators are used as primaryKeys.
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
		
		//uint53, which fits in a float64. Sim.ilr(i,l,r) should dedup and return the existing or create new Axgob.
		//These agIds will differ from one computer to another in the same sim.ns/namespaceString
		//so if you want to sync in opensource peer to peer network then
		//use the 256 bit lazyEvaled global id which will be something like
		//192 bits of hash (or up to 128 bits of literal data),
		//32 bits of gob.i/int32, and 32 bits of header, a little similar to wikibinator203 ids.
		//Im not even sure if need agId but it might be useful for something. TODO figure it out.
		//This is an id of a combinator (i, l, r), not its mutable value (p v dp dv kv ap zp av zv, etc).
		this.agId = sim.nextId();
		
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
		this.l = l; //left/func/l Axgob. The left of every universal-pattern-calculus-combinator is another such combinator.
		this.r = r; //right/param/r Axgob. The right of every universal-pattern-calculus-combinator is another such combinator.
		//FIXME might be better to derive IFPR (int func param return funcall caching) from VarargAx
		//since it can exactly represent every possible value here in combo with the i l and r lambda childs.
		this.e = null; //redEdge from here, what this lambda call evals to, lazyEvaled. Axgob or null.
		//wikibinator203 uses a touch time for garbage collection of old funcall caches (func called on param returns returnVal).
		//Not sure if i'll use it here that way but try it. Its especially important about lazyevals of lambdas that are only
		//there for their axgob.e/redEdge/whatItEvalsTo. TODO maybe this should be in units of sim.lastId which is what
		//the last call of sim.nextId() returned so not to call the system clock.
		this.touchTime = 0;
		//height of this forest node, 0 if leaf. FIXME should this be limited to maxint aka 2**31-1? or maxUint53?
		//It cant have such a limit since all forest shapes are allowed. It cant infloop to prevent such things.
		//But practically its not gonna exceed 2**53-1 on one computer unless you try to (would have to involve garbcol to fit in memory).
		this.h = l ? Math.max(l.h,r.h)+1 : 0;
		
		//Mutable gob stuff. The immutable combinators are primaryKeys of the gob numbers.
		//TODO also doubles for the gob p v dp dv kv ap zp av zv parts?
		//Use one of the ints as the symbol for gobField, and one for gobRule, etc,
		//and be careful not to interpret them that way if its a leaf (the int itself).
		//Each physics cycle, [dp dv kv ap zp av zv] along with dt (change in time) are used to
		//update p/position and v/velocity set to certain constants (0, -Infinity, or Infinity),
		//then removed from the octree, update ox oy oz orad, then added to octree,
		//BUT if !this.isGob() aka if this.orad==0 then physics should not be done at all, just use it as combinator.
		this.p = this.v = this.dp = this.dv = this.kv = this.ap = this.zp = this.av = this.zv = 0;
		//the 3d sphere location/radius cache for octree (Sim.oct) as in Gob.js/GB
		//TODO only include axgobs in that octree whose axgob.orad (aka radius in 3d dagball game coordinates) is not 0 (this.isGob()).
		this.ox = this.oy = this.oz = this.orad = 0;
	};

	//updates this.p and this.v based on this.dp (for chuasCircuit etc) dv (accel) kv (velocityDecayRate) ap zp av zv gr (gradient)
	//and lock(TODO does axgob have lock? or is that only in Gob.js?).
	//Resets dp dv kv ap zp av zv and gradient back to their defaults which are all 0, -Infinity, or Infinity.
	//This is designed to be order invariant (of order gob rules happen including loops in loops of them)
	//so theres astronomically or likely superexponentially many possible automorphisms which should reduce lag in peer to peer game sync.
	//Game rules should only modify [dp dv kv ap zp av zv] and not modify [p v] directly. doPhysics(dt) modifies p and v (do a loop of all gobs)
	//then in a later loop of all gobs updateOctree() updates the octree.
	Axgob.prototype.doPhysics = function(dt){
		//if(!this.lock){
		if(this.isGob()){
			let nextP = this.p+dt*(this.dp+this.v);
			let nextV = this.v*Math.exp(-dt*this.kv)+dt*(this.dv-this.grad);
			if(this.ap <= this.zp){
				nextP = Math.max(this.ap, Math.min(nextPos, this.zp));
			}
			if(this.av <= this.zv){
				nextV = Math.max(this.av, Math.min(nextV, this.zv));
			}

			this.p = nextP; //position
			this.v = nextV; //velocity
		//}
			//for next physics cycle
			this.dp = this.dv = this.kv = 0;
			this.ap = this.av = -Infinity;
			this.zp = this.zv = Infinity;
		}
	};

	//Removes this from this.sim.oct, updates this.ox .oy .oz and .or, then adds back into this.sim.oct.
	//But does it with sim.add and sim.rem which calls those.
	//Is optimized to not add/remove from the octree if xyzr is same as last time.
	//TODO only call doPhysics if this did rem/add in octree (if xyzr changed).
	//Have this return true/false for did it change, and have the code that calls doPhysics
	//(but still need to call all the doPhysics in a loop first then all the updateOctree, is that a dependcyc?)
	Axgob.prototype.updateOctree = function(){
		if(this.isGob()){ //fixme what if it BECOMES a gob b (AG.symField this 'rad') changing from 0 to positive?
			let newOx = this.x();
			let newOy = this.y();
			let newOz = this.z();
			let newOrad = this.rad();
			if(newOx !== this.ox || newOy !== this.oy || newOz !== this.oz || newOrad !== this.orad){
				this.sim.oct.rem(this);
				this.ox = newOx;
				this.oy = newOy;
				this.oz = newOz;
				this.orad = newOrad;
				this.sim.oct.add(this);
			}
		}
	};

	//x. For octree each gob can be viewed as having x y z r, and its 0 for whichever of those fields dont exist.
	Axgob.prototype.x = function(){
		let field = this.m.x; //FIXME use sim.ilr(AG.symField,this,this.sim.wrapString('x')) or something like that? Vs need to cache that in this.m as js {} map?
		return field ? field.p : 0;
	};

	//y. For octree each gob can be viewed as having x y z r, and its 0 for whichever of those fields dont exist.
	Axgob.prototype.y = function(){
		let field = this.m.y; //see FIXME in Agbog.prototype.x
		return field ? field.p : 0;
	};

	//z. For octree each gob can be viewed as having x y z r, and its 0 for whichever of those fields dont exist.
	Axgob.prototype.z = function(){
		let field = this.m.z; //see FIXME in Agbog.prototype.x
		return field ? field.p : 0;
	};

	//radius. For octree each gob can be viewed as having x y z rad, and its 0 for whichever of those fields dont exist.
	Axgob.prototype.rad = function(){
		let field = this.m.rad; //see FIXME in Agbog.prototype.x
		return field ? field.p : 0;
	};

	//Similar to this.L() and this.R(), but defaults to this gob if there is no this.up (FIXME?).
	Axgob.prototype.UP = function(){
		//return this.up || this;
		if(this.i === AG.symField){
			return this.l;
		}else{
			throw new Error('TODO this is not a symField axgob so what should this return? this? u aka 0 aka this.u? (S I I (S I I)) aka an infinite loop?');
		}
	};

	//call pair (cp). returns a forest node whose l is this, r is the given r, and if you give the optionalInt param uses that, else uses 0 as the int.
	Axgob.prototype.cp = function(r,optionalInt){
		return this.sim.ilr(optionalInt|0,this,r);
	};

	//returns an axgob whose int32 is the param. The combinators are immutable so returns a forkEdited one.
	Axgob.prototype.setI = function(int){
		return this.sim.ilr(int|0,this.l,this.r);
	};

	//returns an axgob whose l is the param axgob. The combinators are immutable so returns a forkEdited one.
	Axgob.prototype.setL = function(l){
		return this.sim.ilr(this.i,l,this.r);
	};

	//returns an axgob whose r is the param axgob. The combinators are immutable so returns a forkEdited one.
	Axgob.prototype.setR = function(l){
		return this.sim.ilr(this.i,this.l,r);
	};

	//Axgob.prototype.u = TODO the 0 Axgob, create it.

	let Sim = AG.Sim = function(namespaceString){
		this.ns = namespaceString;
		//this.lastId = 2**32; //dont overlap any of the int32s or uint32s.
		//dont overlap any of the int32s or uint32s. TODO make this start at a random uint53 between 2**50 and 2**51,
		//or something like that, so different computers tend to not overlap their ids?
		this.idOffset = 10000000000;
		this.lastId = this.idOffset;

		//TODO make a faster hashtable
		this.slowDedup = {};

		//TODO 2d or 3d datastruct instead of list. Maybe use a 3d dagball.processGobsWithRule once per physics cycle that they all share,
		//though that could be a problem if their distance constraints are very different.
		//Or maybe make 1 of each maxdist the rule says (which will be a gob.p) so those that share the same maxdist can share the same location hashing.
		//this.gobs = new Set();
		this.oct = new GB.Octree(GB.outerBounds);
	};
	//returns a string for sim.slowDedup
	Sim.slowDedupKey = function(i,l,r){
		return 'I'+i+"L"+l.agId+"R"+r.agId;
	};
	Sim.prototype.nextId = function(){
		return ++this.lastId;
	};
	//like wikibinator203's cp(l,r) func but with (int,lambda,lambda) instead of just (lambda,lambda).
	Sim.prototype.ilr = function(i,l,r){
		let slowKey = this.slowDedupKey(i,l,r);
		return this.slowDedup[slowKey] || (this.slowDedup[slowKey] = new Axgob(this,i,l,r));
		//TODO store slowKey in axgob? would that be of any use, since they're all instantly deduped? Probably would not, so dont do it.
	};

	//returns this Axgob so you can chain this for convenience.
	Axgob.prototype.touch = function(){
		this.touchTime = this.sim.lastId;
		return this;
	};

	//if true, should be in this.sim.oct aka 1 of the local approximations of the game state in an octree of this namespaceString.
	Axgob.prototype.isGob = function(){
		return this.orad !== 0;
	};


	Sim.prototype.add = function(axgob){
		this.ilr(axgob.i,axgob.l,axgob.r);
		if(axgob.isGob()){
			this.oct.add(gob);
		}
	};

	Sim.prototype.rem = function(gob){
		//TODO remove from this.slowDedup if theres 0 incoming ptrs?
		this.oct.rem(gob);
	};

	//contains gobs using gob.x() gob.y() gob.z(), so before changing those (by dp dv kv ap av zp zv or gradient) remove remove from octree, change them, then add.
	//So TODO gob.doPhysics(dt) should do that at gob.sim.oct.
	let Octree = AG.Octree = function(bounds){
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
	Axgob.prototype.nearPairsInMe = function*(maxDist){
		throw new Error('TODO');
	};

	Axgob.prototype.oBounds = function(){
		return [this.ox-this.or, this.ox+this.or, this.oy-this.or, this.oy+this.or, this.oz-this.or, this.oz+this.or];
	};

	//is foundGobs center within sphere of this ox oy oz or.
	Axgob.prototype.oContains = function(foundGob){
		let dx = foundGob.ox - this.ox;
		let dy = foundGob.oy - this.oy;
		let dz = foundGob.oz - this.oz;
		let distSq = dx*dx + dy*dy + dz*dz;
		return distSq <= this.or*this.or;
	};

	//Loops over all gobs in that sphere (using gob.ox gob.oy gob.oz and gob.or as radius), including all gobs whose centers are within the param sphere.
	//for(let foundGob of octree.inSphere(inGob)) rule(foundGob);
	Octree.prototype.inSphere = function*(sphere){
		for(let foundGobInCube of this.inBounds(sphere.oBounds()){
			if(sphere.oContains(foundGobInCube)){
				yield foundGobInCube;
			}
		}
	};

	//minX maxXExcl, does not touch maxXExcl to maxXExcl+positiveNumber. [minX,maxXExcl,minY,maxYExcl,minZ,maxZExcl].
	AG.boundsTouchesBounds = function(boundsA, boundsB){
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
	
	/*TODO should opcodes be defined by int param like (U_aka_0 31) is opcode 31? 0 is U of course,
	so could write it as (0 31 x) returns x.l, or whatever opcode it is.
	Could &31 the int to make it always have 32 possible values.
	Or even simpler could just use the ints 0..31 as such opcodes, if you call them as lambdas.
	That could interfere with cbt. Not sure if i wanna derive cbt from varargax
	vs build in Bit0 and Bit1 opcodes like i did in wikibinator203
	vs build in 64k+32k+16k...+4+2+1=128k-1 cbts (see binheap indexing) in the int values etc.
	*/
	
	return AG;
})();