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
//When I get this working, it will be primaryKeyA(primaryKeyB)->lazyEvalAB and lazyEvalAB-evalAndCache->primaryKeyC.
//This can compute every possible combo of the iota universal combinator given to it.
//Iota equals churchPairLambda(sLambda)(churchTrueLambda), that is, in math, excluding if your browser javascript
//is buggy or something, but we will have turing-complete-challenge-response in peer to peer swarms to help with
//those hopefully rare occurrences. See turing-complete-challenge-response theory in wikibinator203 docs.
//Lazy-evals are also primaryKeys and can in theory have x y z radius red green blue life mana manaRefillRate
//isMonsterType55007 etc fields (which are each another combinator derived from them, adjusted in the
//shared peer to peer manifold.
//In theory in this superexponentially big turing complete address space u could have game objects
//representing RSA and ed25519 signing eachother, along with a huge swarm of every sig and hash algorithm
//.signing and hashing a bunch of combos of eachother and paint them as voxels.
//For example, given any pure-lambda definition of an AI software, a pure-lambda which uses/includes
//the VarargAx opcode (to do various lambda calls in strange combos together) could be a proof that such
//an AI would output "world" when called on "hello".
//[[[[I am not trying to use numbers bigger than a googolplex, but I think the user experience would be alot worse if
//the system lacks that ability. So far only rarely has it ever gone that far, but its just a few hundred
//forest height deep cuz of naturally being superexponential]]]] --I said in https://twitter.com/benrayfield/status/1765506772150698146 2024-3-6
//Any user will be able to anonymously calculate many more numbers bigger or smaller than a googoplex and share and play with in
//new multiverse vectors of possible game rules, numbers around a googolplex, and so on deeply recursive.
j//
const AG = (()=>{
	const AG = {};

	const cubeSide = AG.cubeSide = 2**16;
	const halfSide = AG.halfSide = cubeSide/2;

	const maxint = AG.maxint = 2**31-1;
	let Op = AG.Op = function(name,cur,description){
		this.op = AG.ops.length;
		//this.opMin = AG.ops.length;
		//this.opMax = this.opMin+1;
		this.name = name;
		this.cur = cur;
		this.desc = description;
		AG.ops.push(this);
	};
	const ops = AG.ops = [
		//TODO should all the negatives be wait for abs(that) number of curries (1 to 2**31-1 curries, cuz 2**31-1 is max positive int)?
		//If so, then when it reaches that last number of curries it calls the first param on (Pair (...all params except last...) lastParam)
		//as usual in wikibinator though in wikibinator203 it became a LamNs object.
		new Op('noop',maxint,'does nothing'),
		new Op('Nondet',1,'Infloops if called at deterministic level. This takes only 1 param but you can make it take more by wrapping it in one of the ops that curries more params. If called above the deterministic layer (which is the lowest layer) then can mount any plugins you want here such as gob game rules using sim.oct/octree looping nondeterministicly over pairs of near gobs within some max distance of eachother where both are within a given gobs x y z radius, or whatever you want to mount there.'),
		new Op('ax',0,'similar to wikibinator203 VarargAx opcode'),
		new Op('-',1,'int->int neg'),
		new Op('abs',1,'int->int absolute value'),
		//new Op('ii-',0,'(int,int)->int minus'),
		new Op('+',2,'(int,int)->int add'),
		new Op('+1',1,'int->int plus 1'),
		new Op('-1',1,'int->int minus 1'),
		new Op('Eq',2,'(Eq x y) -> T or F depending if x===y aka are the same forest shape including int l r recursively.'),
		new Op('Glt',2,'GodelLessThan, like in that wikibinator203 opcode, but for 3 childs instead of 2. One child is an int. Compares first by height, then breakes ties by the int, then (if left agIds are not equal, as an optimization to skip this step) breaks ties by recursing left, then breaks ties by recursing right. Has BigO of min height of the 2 childs cuz it only recurses left or right but never both.'),
		new Op('<',2,'(int,int)->int and that returned int is 0 or 1'),
		new Op('<=',2,'(int,int)->int and that returned int is 0 or 1'),
		new Op('>',2,'(int,int)->int and that returned int is 0 or 1'),
		new Op('>=',2,'(int,int)->int and that returned int is 0 or 1'),
		new Op('!',1,'int->int that turns 0 to 1 and turns nonzero to 0'),
		new Op('iii+',2,'(int,int,int)->int add'),
		new Op('*',2,'(int,int)->int multiply'),
		new Op('/',2,'(int,int)->int divide. FIXME what should divide by 0 return? positive/0? 0/0? negative/0?'),
		new Op('%',2,'(int,int)->int mod aka remainder. FIXME what should mod by 0 return?'),
		new Op('~',1,'int->int not'),
		new Op('<<',2,'(int,int)->int shift left'),
		new Op('>>',2,'(int,int)->int signed shift right'),
		new Op('>>>',2,'(int,int)->int unsigned shift right'),
		new Op('&',2,'(int,int)->int AND'),
		new Op('|',2,'(int,int)->int OR'),
		new Op('T',2,'the churchTrue lambda'),
		new Op('F',2,'the churchFalse lambda. (F U) is identityFunc and is the L of every leaf.'),
		new Op('S',3,'the S lambda'),
		new Op('Pair',3,'the churchPair lambda'),
		new Op('L',1,'get L/left/func of param. The L of every leaf is (F U) aka identityFunc.'),
		new Op('R',1,'get R/right/param of param. The R of every leaf is that same leaf, whichever of the 2**32 possible leafs it is.'),
		new Op('IsLeaf',1,'T or F, is the param 1 of the 2**32 leafs (just an int) or not?'),
		new Op('Int',1,'Get the int32 of the param, as a leaf, one of the 2**32 leafs.'),
		new Op('SetI',2,'(SetI prototype newInt) -> prototype forkEdited to have that int (returned by Int op).'),
		new Op('SetL',2,'(SetI prototype newL) -> prototype forkEdited to have that L (returned by L op).'),
		new Op('SetR',2,'(SetI prototype newR) -> prototype forkEdited to have that R (returned by R op).'),
		new Op('Lazy',2,'(Lazy x y) -> (x y), but (Lazy x) does not trigger lazyEval of x (go along its red/evalsTo edge to see what it evals to).'),
		new Op('LazyI',1,'(LazyI (Lazy x)) -> x.i.'),
		new Op('LazyII',1,'(LazyII (Lazy x)) -> (Lazy x.i), despite that x.i cant be a lazyeval cuz is an int but to stay consistent with LazyL and LazyR it wraps it in a Lazy.'),
		new Op('LazyL',1,'(LazyL (Lazy x)) -> (Lazy x.l)'),
		new Op('LazyR',1,'(LazyR (Lazy x)) -> (Lazy x.r)'),
		new Op('LazyLR',2,'(LazyLR l r) -> (LazyILR 0 l r), a normal lambda call'),
		new Op('LazyILR',3,'(LazyILR int l r) -> (Lazy x) where x is the lazyEval of .i is its int, .l is its l, .r is its r.'),
		new Op('LazyE',1,'(LazyE (Lazy x)) -> triggers lazyEval of x and returns the e/redEdge/evalsToEdge of x. (LazyE (LazyLR func param)) -> (func param).'),
		new Op('IsDet',1,'FIXME should this take 0 or 1 params? If 0, it could just be set to T or F depending which of 2 levels its called at (pure deterministic vs allow op Nondet). Is deterministic, the lowest level of lambda calls? Returns T or F. If T then (Nondet anything) evals to (S Ident Ident (S Ident Ident)) where Ident/identityFunc is (F U). If F then (Nondet someThings) may return something, but careful to not call the same thing twice expecting a different return value, cuz even though its nondeterministic and it could (from float64 roundoff for example) its likely to get funcallCached and return the same thing (from azgob.e/redEdge/evalsToEdge) it did before, unless that is uncached, and one way to get around that is to salt calculations by including some different ints in them.'),
	];

	console.error('TODO the optimization of not creating curries for some calculations, give multiple params at once, but likely will just do that for some of the gob game rule math that modifies the p v dp dv etc and loops using sim.oct/octree etc cuz game rules calling eachother will happen many millions of times per second including loops and i dont want to slow it down. The pure lambdas (IsDet 0) will be F if thats allowed.')

	//TODO gradMul, gobPtr, gobMem, gob, etc, as if i was gonna merge it with Ap.js language but instead i want to
	//have AG/Axgob.js generate (as user editable content) close enough approximations of dagball and other
	//un minigames and experiments that Ive made in a more math-precise way. I need the turing complete addressing
	//to be efficient enough that im willing to "eat my own dogfood" and use it in the live game rules,
	//even though its a loss of efficiency traded for turing complete flexibility.

	//[minX,maxXExcl,minY,maxYExcl,minZ,maxZExcl]. A 2**16 cube centered at (0,0,0). Must be a powOf2.
	//Game coordinates are doubles/float64s in this cube, one such cube per namespaceString,
	//that peer to peer networks can converge on a shared game state per namespaceString or
	//fork and merge disagreeing with eachother in the normal ways of opensource,
	//and for such forking and merging hopefully it will help to have a turing-complete address system
	//which is what it means to have combinators be the primaryKeys of the gob numbers.
	//The addressing system literally and efficiently will support numbers exceeding a googolplex
	//since thats how many possible lambdas there are up to height of a few hundred (however long it takes h=>(h*h+1)
	//to exceed a googolplex, if all the lambdas have int of 0, and even faster if allowing any int32 in them).
	//Each namespace is therefore a sparse dimensional swarmable manifold of around a googolplexian surface area.
	//That surface is the multiverse of all possible game rules and many players (by pubkey) playing it together.
	//Ed25519 pubkeys could in theory be derived as one of those dimensions, though it would be alot faster to hardcode it.
	AG.outerBounds = [-halfSide, halfSide, -halfSide, halfSide, -halfSide, halfSide];
	
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
		//
		this.h = l ? Math.max(l.h,r.h)+1 : 0;
		//the this.i copied from leftmost axgob, the opcode if its certain int values (maybe 0 to 31? most of them do nothing).
		this.op = this.h ? l.u : this.i; //TODO put some of these derived axgob fields in a header int or multiple header ints, vs having their own field each?
		this.cur = this.h ? (l.cur+1) : 0;
		//this.curMore = AG.opCurMore(this.op,this.cur); //How many more curries until need to eval?
		this.curMore = AG.opCurMore(this.op,this.cur); //How many more curries until need to eval?
		
		//Mutable gob stuff. The immutable combinators are primaryKeys of the gob numbers.
		//TODO also doubles for the gob p v dp dv kv ap zp av zv parts?
		//Use one of the ints as the symbol for gobField, and one for gobRule, etc,
		//and be careful not to interpret them that way if its a leaf (the int itself).
		//Each physics cycle, [dp dv kv ap zp av zv] along with dt (change in time) are used to
		//update p/position and v/velocity set to certain constants (0, -Infinity, or Infinity),
		//then removed from the octree, update ox oy oz orad, then added to octree,
		//BUT if !this.isGob() aka if this.orad==0 then physics should not be done at all, just use it as combinator.
		//this.p = this.v = this.dp = this.dv = this.kv = this.ap = this.zp = this.av = this.zv = 0;
		//same as in resetGobTempVars(), but do it here in constructor so its easier for the javascript JIT compiler to know these exist.
		this.dp = this.dv = this.kv = 0;
		this.ap = this.av = -Infinity;
		this.zp = this.zv = Infinity;
		//the 3d sphere location/radius cache for octree (Sim.oct) as in Gob.js/GB
		//TODO only include axgobs in that octree whose axgob.orad (aka radius in 3d dagball game coordinates) is not 0 (this.isGob()).
		this.ox = this.oy = this.oz = this.orad = 0;
	};

	//op is any int32. cur is number of curries so far. VarargAx is strange in that it has to eval at each next curry
	//and has to be verified even if its already halted (on itself). If I decide to include Bit0, Bit1, andOr Cbt in this combinator design
	//then it might prevent calling it on things other than a cbt of same height (bit0 and bit1 are cbts of the lowest height)
	//or in some versions of wikibinator cbt can be joined with noncbts since its more efficient not to check.
	//This opCurMore func can be defined various possible ways to implement those strange rules along with the normal rules.
	AG.opCurMore = function(op, cur){

	};

	Axgob.prototype.curriesLeft = function(){
		return this.opNum_ || (this.opNum_ = this.isU() ? this.opNum_ = );
	};



	//There are 2**32 possible leafs aka the set of combinators which all l and r paths lead to. Returns true if this is any of them. isU/isLeaf.
	Axgob.prototype.isU = function(){
		return !this.h;
	};

	//is the leaf whose int32 is 0?
	Axgob.prototype.isU0 = function(){
		return !this.h && !this.i;
	};

	/*unnecessary, just use ===. Axgob.prototype.equals = function(otherAxgob){
		//could also use this===otherAxgob.
		//return this.agId === otherAxgob.agId;
		return this===otherAxgob;
	};*/

	//The simplest comparator of 2 axgobs. Never has collisions.
	//This should be used to break ties after comparing by 256 bit global id in case of collisions (like wikibinator203 treemaps do),
	//or technically you can use it directly.
	AG.godelLessThan = (a,b)=>a.compareTo(b);

	//by AG.godelLessThan, which is not the most efficient way but is simple and correct math.
	//TODO another func to sort first by global 256 bit id (lazyEval such ids) then by this to break ties.
	//This function can just_barely_efficiently_enough_for_gaming sort millions of numbers that
	//are all bigger than a googolplex. Each axgob as a primaryKey is such a number.
	AG.sortAxgobs = function(axgobs){
		axgobs.sort(AG.godelLessThan);		
		return axgobs;
	};

	//Returns -1, 0, or 1, as usual for a comparator, viewed from THIS axgob.
	Axgob.prototype.compareTo = function(otherAxgob){
		if(this === otherAxgob){ //sim.ilr does perfect dedup
			return 0;
		}

		//Compare by height first (if theyre equal, theyre the same height so neither of these conditions will be triggered so is ok to delay
		//this until after ===, will do same thing as if it was before which is the more natural way to think of it or read the code).
		if(this.h < otherAxgob.h){
			return -1;
		}
		if(this.h > otherAxgob.h){
			return 1;
		}
		
		// If heights are equal, check for exact identity using agId
		//if(this.agId === otherAxgob.agId){
		//	return 0;
		//}

		if(this.l !== otherAxgob.l){
			//FIXME leafs have null l and r, FIXME fill those in to be identityFunc as l and that leaf as r.
			return this.l.compareTo(otherAxgob.l);
		}else{
			//FIXME leafs have null l and r, FIXME fill those in to be identityFunc as l and that leaf as r.
			return this.r.compareTo(otherAxgob.r);
		}

		
		
		/*
		// If not identical, compare left children recursively, if they exist
		if (this.l && otherAxgob.l) {
			const leftComparison = this.left.compareTo(otherAxgob.left);
			if(leftComparison !== 0) return leftComparison;
		} else if (this.left || otherAxgob.left) {
			// If one has a left child and the other doesn't, the one with the child is "greater"
			return this.left ? 1 : -1;
		}
		
		// If left children are equal or non-existent, compare right children
		if (this.right && otherAxgob.right) {
			return this.right.compareTo(otherAxgob.right);
		} else if (this.right || otherAxgob.right) {
			// If one has a right child and the other doesn't, the one with the child is "greater"
			return this.right ? 1 : -1;
		}
		*/
		
		// If all else is equal (which is unlikely given the agId for identity),
		// the objects are considered equal in this context
		//return 0;
		//throw new Error('Found 2 duplicate axgobs with different agIds: '+this.agId+' and '+otherAxgob.agId);
	};
	

	//Like wikibinator203 treemaps (using GodelLessThan opcode) sort by (for efficiency first by 256 bit id then breaking ties by...)...
	//I sort them first by height, then break ties by the int (axgob.i), then break ties by sorting left child
	//recursively (this step can be skipped if id equals), then break ties by sorting right child recursively.
	//This has a bigO per compare of max height of the 2 axgobs being compared. Except theres an extra int32 here.

	//Sim.prototype.I TODO identityFunc whose int is 0, the l of every leaf, so when identityFunc
	//is called on the r of such a leaf (that same leaf) returns that leaf so (L x (R x)).redEdge equals x forall x.
	//Sim.prototype.I = 

	//updates this.p and this.v based on this.dp (for chuasCircuit etc) dv (accel) kv (velocityDecayRate) ap zp av zv grad (gradient)
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
				nextP = Math.max(this.ap, Math.min(nextP, this.zp));
			}
			if(this.av <= this.zv){
				nextV = Math.max(this.av, Math.min(nextV, this.zv));
			}

			this.p = nextP; //position
			this.v = nextV; //velocity
		//}
			//for next physics cycle
			this.resetGobTempVars();
		}
	};

	Axgob.prototype.resetGobTempVars = function(){
		this.dp = this.dv = this.kv = 0;
		this.ap = this.av = -Infinity;
		this.zp = this.zv = Infinity;
	};

	//Removes this from this.sim.oct, updates this.ox .oy .oz and .or, then adds back into this.sim.oct.
	//But does it with sim.add and sim.rem which calls those.
	//Is optimized to not add/remove from the octree if xyzr is same as last time.
	//TODO only call doPhysics if this did rem/add in octree (if xyzr changed).
	//Have this return true/false for did it change, and have the code that calls doPhysics
	//(but still need to call all the doPhysics in a loop first then all the updateOctree, is that a dependcyc?)
	Axgob.prototype.updateOctree = function(){
		if(this.isGob()){ //fixme what if it BECOMES a gob by (AG.symField this 'rad') changing from 0 to positive?
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
		let field = this.m.y; //see FIXME in Axgob.prototype.x
		return field ? field.p : 0;
	};

	//z. For octree each gob can be viewed as having x y z r, and its 0 for whichever of those fields dont exist.
	Axgob.prototype.z = function(){
		let field = this.m.z; //see FIXME in Axgob.prototype.x
		return field ? field.p : 0;
	};

	//radius. For octree each gob can be viewed as having x y z rad, and its 0 for whichever of those fields dont exist.
	Axgob.prototype.rad = function(){
		let field = this.m.rad; //see FIXME in Axgob.prototype.x
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

	AG.randInt = function(max){
		return (Math.random()*max)|0;
	};

	AG.nineRandomBaseTenDigitsStr = function(){
		return (''+AG.randInt(2000000000)).substring(1); //TODO use padStart in js string?
	};

	AG.randUniqueString = function(){
		return AG.nineRandomBaseTenDigitsStr()+AG.nineRandomBaseTenDigitsStr()+AG.nineRandomBaseTenDigitsStr(); //27 random baseTen digits. TODO DV base64 so its shorter?
	};

	AG.newRandNsStr = function(){
		return '$randAxgobNs'+AG.randUniqueString();
	};

	let Sim = AG.Sim = function(namespaceString){
		this.ns = namespaceString || AG.newRandNsStr();
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
	
	//returns the wrapper of the int32, one of the 2**32 possible leafs. sim.i(x)===sim.i(x) is true for all int32 x.
	Sim.prototype.i = function(int){
		return this.ilr(int,null,null); //FIXME the 2 nulls, in math are supposed to be identityFunc as l and the leaf itself as r.
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

	//[minX,maxXExcl,minY,maxYExcl,minZ,maxZExcl]. Somewhere inside AG.outerBounds which is a 2**16 cube centered at (0,0,0).
	Axgob.prototype.oBounds = function(){
		return [this.ox-this.or, this.ox+this.or, this.oy-this.or, this.oy+this.or, this.oz-this.or, this.oz+this.or];
	};

	//is foundGobs center within sphere of this ox oy oz or.
	Axgob.prototype.oContains = function(foundGob){
		let dx = foundGob.ox - this.ox;
		let dy = foundGob.oy - this.oy;
		let dz = foundGob.oz - this.oz;
		let distSq = dx*dx + dy*dy + dz*dz;
		return distSq <= this.orad*this.orad;
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