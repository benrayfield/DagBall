//Ben F Rayfield offers Axgob.js/AG under opensource Wikibinator203 license (GNU AGPL3 + 3 extra permissions including classpath exception),
//though an earlier version of Axgob was MIT licensed on github 2024-3-7 as 33kB of incomplete code before "closing the quine knot" (see lib/old dir).
//if(Math.random()<.01) throw new Error('TODO op8 sym8 primitiveInfo8 curMore8 bize32 i32 j32 l r, so 4 ints and 2 childs. redesignAxgobToHave3IntsOr1ByteAnd2IntsPerNodeOneIsChosenOpcode')
//
//
//Axgob is a universal-pattern-calculus-combinator as a pure deterministic layer
//and on top of that has mutable sparse-dimensional-vectors like in Gob.js/GB using such
//combinators as primaryKeys of the dimensions the vectors are positions in.
//Axgobs are comparable and sortable and theres superexponentially many of them possible of height
//so has more than enough room for a multiverse of possible game rules to be explored.
//
//Axgob is a variant of Gob.js that merges the wikibinator203 VarargAx opcode (a turing complete proof system) with Gob objects.
//In wikibinator203 the VarargAx opcode is likely incomplete andOr buggy, but variants of it worked in earlier versions of wikibinator,
//and its a simple math concept: A vararg function that, at each next curry the FuncBody (which is the first param)
//can halt on itself (by returning a certain symbol) or halt on some other lambda or never halt.
//It could make a list type that can only contain twin-primes, for example, and if you call the list on something else it infinite loops.
//On the other hand, every possible axgob (starting from the 2**64 possible leafs of 64 bits of the i and j ints) is valid as a lazyEval.
//
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
//You start with all 2^32 = about 4 billion possible ints, the core lambdas. U can take any 2 lambdas and another int (3 childs)
//to find/create a lazyEvaled lambda, with an EvalsTo edge. Millions of ppl will navigate the multiverse of possible games like that.
//These balls moving around, chasing eachother to capture eachother to team color, & other experimental game physics and gameplay
//rules, are gonna be lambdas. The balls as lambdas. The x y z and radius of each ball 4 lambdas. And if u wanna see radius as a separate
//lambda, recurse. As lambdas, they'll be shareable and buildable together in massively multiplayer by copy/paste. Each lambda is a
//position in a superexponentially sparse vector system that has an address space bigger than a googolplex number of possible lambdas
//up to a few hundred deep.
//I think of massively multiplayer games as cellular automata expanding across millions of computers and ppl using them or
//shrinking/failing. Its described by Kfactor. >1 expands. If I make something small simple fun and turing complete a new species
//expands. Toward this goal I'm cutting the fat by making a new kind of lambdas optimized for massively multiplayer gaming. Lambda
//called on lambda finds or creates lambda as usual, but now they each come with a mutable position and velocity and some temp vars
//for updating those in swarms.
//I think Ive fixed something in gametheory in general, a problem where many minds fight over what name means what thing, and I
//fixed it by having more than a googolplex number of names already preallocated within just the first few hundred stuff deep.
//Using lambdas as primaryKeys.
//I'd like to have billions or trillions of new pure-lambdas per second created shared and searched per second, most of which get
//quickly garbage-collected, in peer to peer networks of Humans and AIs exploring the multiverse of all possible softwares together.
//U could put breakpoints in an AGI. In "billions or trillions of new pure-lambdas per second created shared and searched per second",
//anyone could call debugStepInto debugStepOver dovetail or explore combos of it. Those funcs could be DERIVED as user created
//content and shared.
//Wikibinator203 would have a hard time dovetailing cuz of the complexity added by the optimizations, but dagball/lib/Axgob.js
//should in theory be very efficient at sparse exploring (or if you must, densely) of dovetailing in addressing
//exceeding googolplex in massively multiplayer.
//[My peer to peer network will in theory stream many lambdas really fast at low lag, turing complete streaming.
//So far the new Axgob lambdas are 128 bits plus 2 child pointers. 2024-3-10].
//64 bits are any data u want. 32 bits of bitstring size, up to 1 gigabit. 8 bits opcode.
//8 bits of how many more curries (or unlimited). 4 bits of which primitive type, int uint unicode float other etc.
//4 bits of primitive size. 8 bits of symbol (symField, symRule, etc). 2 childs.
//Unlike Wikibinator203, Axgob lambdas are constant size and always perfect deduplicated even without computing their 256 bit
//global ids. They use local uint53 ids (in a float64 called agId) so in theory u could create 9,007,199,254,740,992 lambdas
//locally including those garbcoled.
//You could for example have a huge SQL database containing trillions of lambdas using a 64 bit id (53 bits of it)
//and 2 child 64 bit ids and 128 bits of data plus some caches for efficiency, though its meant to run in a browser.
//In theory you could eval lambdas in pure SQL, though the query would be big slow and complex, but since its based
//on lazyEval and func_param_return caching, the work can be divided into small chunks.
//Axgob.js is designed to be a superexponentially sparse-dimensional matrix. In each number cell theres a p/position, v/velocity,
//dp and dv of the change of p and v per time, kv velocity decay per time, and ap zp to instantly set p by tightening min/max,
//and similarly av zv  for v.
//My games are going to be a single matrix that exists across many computers in peer to peer, though u can fork other namespaces
//if u want in same network, like game rooms that dont directly interact with eachother except can copy/paste lambdas between them.
//In my matrix, a possible game, of any possible rules and any possible quicksave/quickload/state of the game (which will include
//custom physics and gameplay rules, publickeys of who is playing, etc)... is a single vector, a position in many dimensions.
//https://en.wikipedia.org/wiki/Hilbert_space
//In theory the VarargAx opcode (called Ax in axgob) can represent the statement and a proof of it, that a given ed25519
//digital signature is correct, that the given publicKey said that. Such a statement/proof will be an ordinary axgob node,
//and if axgob.e===axgob then its verified. Similarly, Ax can make turing-complete typed lists, like a list that can only
//contain twin-primes or only text that does not contain words from a given list of words you dislike.
//x.e===x means the lazy lambda call of (L x) on (R x) (FIXME is that LzL and LzR in combo with (Lz x) etc, something like that)
//has been evaled (cached in x.e) and evaled to itself, aka is halted
//on itself. Typed statements which do not match the turing complete rules (defined in calls of Ax) would
//infinite loop (S Ident Ident (S Ident Ident)).
//The superexponentially sparse-dimensional matrix is so sparse that already has a dimension for every possible publickey,
//sig, proof, and every finite democracy algorithm involving any number of publickeys where at least n number of them have
//signed eachother, etc, and game rules. Also it has a dimension for every possible finite AGI. The AGI is a lambda.
//Very self referencing swarms of lambdas measuring, combining, and exploring combos of eachother.
//https://en.wikipedia.org/wiki/Formal_verification
//When I talk about swarming many lambdas in a peer to peer network, I mean actual javascript lambdas that you can use on
//browser console, but with the new ability that its a massively multiplayer javascript console with potentially millions
//of other computers in there with u. Also, 100% of the lambdas are quines. Nonquines are simply not supported except
//for lazyEvals. Forall halted lambda x, (L x (R x)) evals to x. https://en.wikipedia.org/wiki/Quine_(computing)
//https://en.wikipedia.org/wiki/Pattern_calculus
//Axgob is a universal-pattern-calculus-combinator in the pure deterministic layer (see IsDet opcode).
//https://en.wikipedia.org/wiki/Homoiconicity
//some parts of https://en.wikipedia.org/wiki/Church_encoding
//
const INT = x=>(Math.floor(x)|0);
if(INT(-4.9)!==-5 || INT(-.9)!==-1 || INT(.9)!==0 || INT(4.9)!==4 || INT(2**39-4.9)!==INT(-4.9)) throw new Error('INT function is broken');
const AG = (()=>{
	const AG = {};

	//AG.loglev is 0 for no logging (FIXME theres probably still some), and higher numbers for more logging.
	AG.loglev = 1;
	if(AG.loglev>0) console.log('Axgob/AG loglev='+AG.loglev);

	const cubeSide = AG.cubeSide = 2**16;
	const halfSide = AG.halfSide = cubeSide/2;

	const maxint = AG.maxint = 2**31-1;
	//const maxFiniteCur = AG.maxFiniteCurMore = 126; //max finite curries more
	//const infiniteCurMore = AG.infiniteCurMore = 127; //infinite curries more
	const maxFiniteCur = AG.maxFiniteCurMore = 62; //max finite curries more
	const infiniteCurMore = AG.infiniteCurMore = 63; //infinite curries more
	const Op = AG.Op = function(name,cur,description,func,funcI){
		this.op = AG.ops.length;
		//this.opMin = AG.ops.length;
		//this.opMax = this.opMin+1;
		this.name = name;
		this.cur = cur;
		this.desc = description;
		//a js lambda of 1 Axgob param that returns an Axgob, as a default implementation,
		//though more optimized implementations might be added later similar to the Evaler system in wikibinator203,
		//especially 
		this.func = func;
		this.funcI = null; //TODO same as this.func(param).i, returns the int value, but todo optimize this so it doesnt create any Axgobs to return the int.
		AG.ops.push(this);
		AG.op[name] = this;
	};
	Op.prototype.toString = function(){
		return '[AxgobOp '+JSON.stringify(this)+']';
	};
	//returns an Axgob of this op int in the given Sim. You need new Axgobs for each Sim
	//since they dont directly interact with eachother and have a different sim.ns/namespaceString.
	Op.prototype.new = function(sim){
		let sym = AG.symNeutral;
		let primz = 0; //2**0 is 1 bit
		let primt = AG.primtOther;
		let isb = this.name=='Arr' ? 1 : 0; //isBitstring
		let o = AG.symPrimzPrimtIsbCurmOpToO(sym,primz,primt,isb,this.cur,this.op);
		let b = 0; //bize/bitstringSize
		//this is where to put up to 64 bits of general data,
		//but its not used for ops other than the Arr op, and even then its still valid to be an empty array so is an ok prototype.
		let i = 0, j = 0;
		return sim.obij(o,b,i,j);
	};
	const ops = AG.ops = [];
	
	//TODO use first 64 ops for 0 means evaling, 1-62 means curry that many params before evaling firstParam on (Lz theCallSoFar) aka a lazyEval of theCallSoFar,
	//and 63 means like Infcur aka keep taking more params and never eval,
	//and use the other 192 opcodes for the given "new Op" calls below (TODO generate those 64 before the calls below). So no nulls. Also ive fixed the problem of
	//"but 100 appears as 100Infcur 101Nondet 102Ax etc (or whatever those ops are, might reorder them)"
	//by putting the o8/op byte (axgob.o8()) as part of the 128 bits of data (4 ints .o .b .i .j) per axgob so there are somewhere between 2**64 and 2**128 possible leafs.
	//
	//skip first 100 indexs so those numbers appear as themself,
	//but 100 appears as 100Infcur 101Nondet 102Ax etc (or whatever those ops are, might reorder them).
	//for(let i=0; i<100; i++) ops.push(null);

	AG.op = {}; //map of op.name to op
	//OLD, moved to o8/op byte in axgob.o, not its .i or .j value which are now used only for storing data, especially in cbt/bitstring/typedarrays.
	//TODO should all the negatives be wait for abs(that) number of curries (1 to 2**31-1 curries, cuz 2**31-1 is max positive int)?
	//If so, then when it reaches that last number of curries it calls the first param on (Pair (...all params except last...) lastParam)
	//as usual in wikibinator though in wikibinator203 it became a LamNs object.
	//new Op('Curz',2,'TODO use this for (-4 FuncBody b c d) calling (FuncBody (Lazy (-4 FuncBody b c d))), where -4 evals after 4 more params, -n evals after n more params. Same as Cur but looks into thing of (Lazy thing) if its a (Lazy thing), max 1 Lazy deep, else is just (Cur thing).'),
	//new Op('Pz',2,'Similar to Curz in how it deals with Lazy, but other than that is same as P.'),
	//
	//new Op('noop',maxint,'does nothing. keeps currying forever. Does that make this be like wikibinator203 Infcur aka the [...] lists?'),
	new Op('Evaling',0,'opcode that means is evaling now (even if its a lazyEval frozen in time youre just looking at). Its L has either 0 or 1 curries left, so 1 more curry by pairing l.cp(r) results in 0 curries left.');
	for(let i=1; i<infiniteCurMore; i++){
		let name = 'C'+i;
		let desc = 'curry '+i+' params then evals to (funcBody (Lz ('+name+' funcBody ...params...)))';
		new Op(name,i,desc);
	}
	if(infiniteCurMore != 63){
		throw new Error('infiniteCurMore must be 63 but is '+infiniteCurMore);
	}
	new Op('Infcur',infiniteCurMore,'just keeps currying next param, never evals (always evals to itself).');
	new Op('U',infiniteCurMore,'basically a constant, doesnt do anything, but need to choose one for (F U) to be the L of every leaf.');
	new Op('Nondet',1,'This is where to hook in other systems such as Dagball, Dagplace, or anything you want etc as long as it can be viewed as lambda called on lambda finds/creates lambda, and this is a nondeterministic layer so it can have roundoff and peer to peer disagreements that converge together. Infloops if called at deterministic level. This takes only 1 param but you can make it take more by wrapping it in one of the ops that curries more params such as the op -17 takes 17 param (16 if you dont include the FuncBody which is first param). If called above the deterministic layer (which is the lowest layer) then can mount any plugins you want here such as gob game rules using sim.oct/octree looping nondeterministicly over pairs of near gobs within some max distance of eachother where both are within a given gobs x y z radius, or whatever you want to mount there.');
	new Op('Ax',0,'similar to wikibinator203 VarargAx opcode. Can only halt at deterministic layer.');
	new Op('HasAx',1,'(HasAx thing) -> 1 as true or 0 as false for does thing contain a call of Ax opcode, but Ax by itself does not count, only if it has enuf params (is that 1 or 2 params?) that it has to be verfied. Normally verifying may take up to any finite time to prove a true statement is true, and can never prove a false statement is true. Halts means true in this case. If HasAx is false then its easier to verify. Remember that every forest node is valid whether it halts or not, but (Ax funcBody ...params...) evals to itself if true (cuz funcBody (Lz (Ax funcBody ...params...)) evals to U to mean halts on itself else evals to (U returnVal) to halt on returnVal, else such a call of Ax may infinite loop during verifying in which case the Ax correctly infinite loops (evalsto meaning go along red edge aka evalsto edge aka axgob.e which starts null and is filled in if it evals to something). Does not count [lazyEval of x aka (Lz x)] where (HasAx x).');
	new Op('Arr',infiniteCurMore,'Array of type int uint float unicode other etc (see primt for which of those) and primitive sizes from 0 to 2**15 bits (such as int32 is 2**5 bits). Cbt aka complete binary tree of bits, though it might not always be a complete tree, might in later versions of this software count bize (this.b) as just sum of 2 child bizes and maybe if want to use 0-64 bits of this.i and this.j set this.b to this.l.b.+this.j.b+zeroTo64OfBitsWantToUseHere. But normally it will be a complete binary tree, and this.b/bize will be anywhere between 0 and that powOf2 number of bits, so you can forkEdit it to stream append. You could have a double[37] or utf8[23] for example, using primt and primz. If opcode is something other than Arr, the .i and .j bits can still be used but just sit there, dont do anything except what other lambdas might do after observing them.');
	new Op('M',infiniteCurMore,'Similar to Infcur. jsonlike map object alternating key val key val in any order. Keys are forced to be strings (see primitiveInfo8). This combined with [] and doubles and T and F and Null, will make Axgob able to process jsonmaps like used in dagball etc. inAxgobGiveMeAJsonMapOpcodeSoICanProcessDagballJsonAndItsObjectForm Keep [] as Infcur. Make {} be such json. Already have defined strings and float64s and T and F. Todo also define null. () is for lambda calls. So maybe I should use <> as SCall? Or maybe <> as normal call and () as SCall? Or maybe give <> to json/maps, since <> is the hardest one to use in text editors. Whichever I pick, lets call it {} for now. {"key": [3,4,5.6]} would mean (M key [3,4,5.6]) (M keyA [3,4,5.6] keyB hello) and so on, a kind of Infcur but keys are forced to be strings and will maybe have special syntax.',
		null,null);
	new Op('Null',1,'null for use with M/jsonlikemap, since nulls can exist in json.');
	new Op('Wh',3,'while loop. (Wh condition loopBody state) does while(condition(state).i) state = loopBody(state); return state; Normally state would be an avlTree, maybe with GoO OO etc like in wikibinator203. Works with If.');
	new Op('If',3,'if. works with Wh/while. (If condition ifTrue state) does (condition(state).i ? ifTrue(state) : state).');
	new Op('Ife',4,'if/else. works with Wh/while. (If condition ifTrue ifFalse state) does (condition(state).i ? ifTrue : ifFalse)(state).');
	
	//START mutable high dimensional vector ops.
	//Axgob uses pure-lambdas as primaryKeys (universal pattern calculus combinators) and p/position and v/value as values (and some temp vars to update those once per physics cycle).
	//These few ops are for reading and updating those float64 values and can only be done in ee/EE/nondeterministic or maybe that should be eee/EEE even farther cuz its also mutable.
	new Op('Pos',1,'(Pos axgob) -> the current mutable position of that axgob aka axgob.p, viewed as an Axgob whose b is 64 and whose .i and .j are the 64 bits of that double/float64, or if running in symRule then likely will be compiled to javascript code and run 100million ops/sec. The caches of these should be cleared once per physics cycle. .p/position and .v/velocity change only once per physics cycle.');
	new Op('Vel',1,'(Vel axgob) -> the current mutable velocity of that axgob aka axgob.v, viewed as an Axgob whose b is 64 and whose .i and .j are the 64 bits of that double/float64, or if running in symRule then likely will be compiled to javascript code and run 100million ops/sec.');
	new Op('Poten',1,'(Poten addToPotentialEnergy) -> 0.0, add to total potentialEnergy of the whole game state, optimized using gradLoop that adds to .grad aka gradient of a few relevant axgobs, axgob.grad, see Dp op.');
	new Op('Dpos',2,'(Dp axgob addToDp) -> 0.0, and statefully does axgob.dp += addToDp, which will be used in doPhysics later to update p and v. Youre not allowed to read dp dv kv, only add to them, and not allowed to read ap av zp zv, only update them by min or max. Float64 in all those cases.');
	new Op('Dvel',2,'(Dv axgob addToDv) -> 0.0, add to axgob.dv, see Dp op.');
	new Op('Kvel',2,'(Kv axgob addToKv) -> 0.0, add to axgob.Kv, see Dp');
	new Op('Apos',2,'(Ap axgob raiseApTo) -> 0.0, sets axgob.ap to Math.max(axgob.ap,raiseApTo), see Dp op. If at end of a physics cycle, ap<=zp then truncates p into that range, as a way to set p while being order invariant, but if zp<ap (max<min) then ignores ap and zp in that cycle for that axgob. Similar for av and zv.');
	new Op('Avel',2,'(Av axgob raiseAvTo) -> 0.0, sets axgob.av to Math.max(axgob.av,raiseAvTo), see Dp op');
	new Op('Zpos',2,'(Zp axgob lowerZpTo) -> 0.0, sets axgob.zp to Math.min(axgob.zp,lowerZpTo), see Dp op');
	new Op('Zvel',2,'(Zv axgob lowerZvTo) -> 0.0, sets axgob.zv to Math.min(axgob.zv,lowerZvTo), see Dp op');
	new Op('AZpos',2,'(AZpos axgob setPosTo) -> 0.0, does Apos and Zpos both with these same 2 params, but keep in mind if the mins and maxs contradict eachother it will have no effect this physics cycle, see Dp op');
	new Op('AZvel',2,'(AZvel axgob setVelTo) -> 0.0, does Avel and Zvel both with these same 2 params, but keep in mind if the mins and maxs contradict eachother it will have no effect this physics cycle, see Dp op');
	//END mutable high dimensional vector ops.
	
	//START mutable symRule ops that should be used with Pos Vel Dpos Dvel Kvel Apos Avel Zpos Zvel AZpos AZvel ops.
	new Op('DoRule',3,'(DoRule query rule state). But state is normally ignored, just a placeholder to mean whatever the current .p and .v mutable state is, as if it were represented in an AVL tree (like in Wikibinator203 Treemap and GodelLessThan and OO and GoO etc opcodes), returns next state. In a given query results (list of gobs or list of [gobA,gobB] etc), do the given rule on those gobs or pairs of gobs. TODO maybe it should always be a [gobA] even if its only 1 gob? In Gob.js the query is called SelFn (select query/function), and rule is called RulFn (rule function), though 2024-3 that code was not finished and I moved on to Axgob.js this file.');
	new Op('InGob',2,'But state is normally ignored, just a placeholder to mean whatever the current .p and .v mutable state is, as if it were represented in an AVL tree (like in Wikibinator203 Treemap and GodelLessThan and OO and GoO etc opcodes). For making single loops in symRule system, for making custom game physics and gameplay rules. (InGob gob state) -> [...]. Uses sim.oct/Octree to find gobs whose centers are in a sphere volume. Returns a [] list of axgobs (UPDATE: list of lists of axgobs, and the inner lists list are always size 1) that have an x y z and rad field, which defines a sphere, and are inside the given axgobs sphere, if it also has those fields. TODO This might be optimized as a js [] list or a js Iterator/Generator function* or yield* inside such functions.');
	new Op('NearPairsInGob',3,'But state is normally ignored, just a placeholder to mean whatever the current .p and .v mutable state is, as if it were represented in an AVL tree (like in Wikibinator203 Treemap and GodelLessThan and OO and GoO etc opcodes). For making double loops in symRule system, for making custom game physics and gameplay rules, like within a sphere volume in the game world the Rock Paper Scissors team color capturing experiment I did in videos where colored balls chased eachother, expanding their color exponentially while keeping the total number of balls constant (changing balls color when 2 balls meet depending on their current colors in a rock paper scissors size 3 tournamentGraph). (NearPairsInnGob gob maxDist state) -> [[a,b],[a,c],[d,f]...]. Uses sim.oct/Octree to find near pairs of gobs that are both inside the given gob, and each such pair is at most maxDist (a float64) from eachother. TODO This might be optimized as a js [] list or a js Iterator/Generator function* or yield* inside such functions.');
	new Op('GobSearch',3,'But state is normally ignored, just a placeholder to mean whatever the current .p and .v mutable state is, as if it were represented in an AVL tree (like in Wikibinator203 Treemap and GodelLessThan and OO and GoO etc opcodes). A hard to optimize turing-complete query using the Octree and lambdas in general any way you want. (GobSearch nGobsPerResult predicate state) -> [...list of [...n gobs...],[...n gobs...],...] where predicate([...n gobs...]).i is nonzero. This op should in theory be able to simulate InGob and NearPairsInGob but is so much more flexible and hard to optimize its for future research. You normally use it in DoRule the same as you use InGob and NearPairsInGob in DoRule.');
	//TODO forall outputs of InGob or NearPairsInGob etc, an op that prefixes (or suffixes?) a given list of axgobs to it, like the literal gobs in Gob.js, remember the B C D E F G H I global gob vars there.
	new Op('GradLoop',3,'TODO how many params? TODO i had written somewhere about a "gradient loop", like i used in 15000+ dimensional (1 dimension per pixel in a small 124x124 cellular automata grid) convolutional scalar field that converged to rule110 as I painted it with 1 mouse buttons ConvFieldDemo3.html. Generalize that. I had summarized somewhere... "bayes3x3x3x3x... wheelAndAxleGobs rule110convfield gradLoop gobPtr gobMem" (the ptr and mem parts referring to a possible merging of gob and ap.js.');
	new Op('Field',2,'(Field axgob fieldName) -> the symField version of the given axgob callpaired on fieldName, same as axgob.cp(fieldName).setSym(AG.symField) but likely will be more optimized. The most common 4 fields are x y z rad (defines a 3d sphere volume) in the game space, normally marked by (Dpos (Field someGob2233 "rad")) being a positive radius (is 0 by default cuz .p and .v are 0 by default), and similar for "x", "y", and "z", which likely ill make a syntax for that tokens that start with a lowercase letter and have no whitespace are a string literal so (Dpos (Field someGob2233 rad)) with no quotes, and likely some more complicated syntax you can just write it as someGob2233.rad.x if you want to see the x position of the radius of someGob2233 but normally you would only go up to 1 level deep someGob2233.x or someGob2233.rad but not view its radius as an object in the game world too, but its important to have self awareness self reference pattern-calculus etc to think about thoughts and compute about computing etc.');
	new Op('Rule',1,'(Rule axgob) -> same as axgob.setSym(AG.symRule) but likely will be more optimized. rule.p is like dagball.Circ.influence in that its 1 to include a rule and 0 to exclude that rule (default p and v are 0) and gradually can be any finite float64 value. Rules can therefore turn on/off other rules or vary their strength. A gob, like a team colored ball in the Rock Paper Scissors team color capturing experiments (see videos), also has a .p used like .influence, that if such balls .p is 0 it means to not include that ball in physics calculations, and if 1 then include it.');
	new Op('GetState',1,'State is a mapping of pure-lambda to 2 float64s [position,velocity]. Can be used for SAVE game state / quicksave. (GetState U) -> the state as described in a few other opcodes as "But state is normally ignored, just a placeholder to mean whatever the current .p and .v mutable state is, as if it were represented in an AVL tree (like in Wikibinator203 Treemap and GodelLessThan and OO and GoO etc opcodes)", but keep in mind this is normally called at nondeterminstic/axgob.ee(instead of deterministic/axgob.e) level so there can be nondeterministic roundoff, disagreements in peer to peer net on the exact values of the .p/position and .v/velocity state of exact pure-lambdas as primaryKeys. State only changes once per physics cycle. This cache should be cleared once per physics cycle, and only created in a lazy way meaning if you dont call GetState it doesnt bother to create the pure-lambda form of that state which is some kind of AVL tree.');
	new Op('SetState',1,'State is a mapping of pure-lambda to 2 float64s [position,velocity]. Can be used for LOAD game state / quickload. (SetState (GetState U)) -> U, has no effect (the U param/return dont mean anything here, but lambdas must take at least 1 param), but if you (SetState someEarlierOrCustomBuiltState) it will have an effect. See GetState op. This can only be done between physics cycles, not during it, and if done during it should infinite loop. This may be a partial/sparse state, just a near (in 3d) volume of the huge game world (see AG.outerBounds which is big enough for millions of players to game together in a single game room / namespaceString in theory, or it may be a complete state.');
	//END mutable symRule ops that should be used with Pos Vel Dpos Dvel Kvel Apos Avel Zpos Zvel AZpos AZvel ops.

	if(Math.random() < .01) throw new Error('TODO AVL tree, GoO, OO, (O?), getter and setter syntax, as in what GetState, SetState, If, Ife, and Wh use, etc?');
	
	new Op('SwapIJ',1,'Swap the 2 ints in this node, to make another node with them swapped',
		g=>{ let p = g.r; return g.sim.ijlr(p.j,p.i,p.l,p.r) },
		null);
	new Op('SwapLR',1,'Swap the 2 axgob childs in this node, to make another node with them swapped',
		g=>{ let p = g.r; return g.sim.ijlr(p.i,p.j,p.r,p.l) },
		null);
	new Op('I',1,'Get the first int32 of the param, as a leaf, one of the 2**32 leafs. UPDATE: 2**64 leafs now that theres 2 ints. TODO rename JJJJget JJJJput getc to not use j cuz I and J are used for those 2 ints.',
		g=>g.sim.i(g.r.i),
		null);
	new Op('J',1,'Get the second int32 of the param, as a leaf, one of the 2**32 leafs. UPDATE: 2**64 leafs now that theres 2 ints. TODO rename JJJJget JJJJput getc to not use j cuz I and J are used for those 2 ints.',
		g=>g.sim.i(g.r.j),
		null);
	new Op('L',1,'get L/left/func of param. The L of every leaf is (F U) aka identityFunc.',
		g=>g.r.l,
		null);
	new Op('R',1,'get R/right/param of param. The R of every leaf is that same leaf, whichever of the 2**32 possible leafs it is.',
		g=>g.r.r,
		null);
	new Op('SetI',2,'(SetI prototype newInt) -> prototype forkEdited to have that int (returned by I op).');
	new Op('SetJ',2,'(SetJ prototype newInt) -> prototype forkEdited to have that int (returned by J op).');
	new Op('SetIJ',2,'(SetIJ prototype new2Ints) -> prototype forkEdited to have those 2 ints.');
	new Op('IsU',1,'Should this return 0 or 1 vs T or F, is the param 1 of the 2**32 leafs (just an int) or not?',
		g=>g.sim.i(g.r.isU()?1:0),
		null);
	new Op('SetL',2,'(SetL prototype newL) -> prototype forkEdited to have that L (returned by L op).');
	new Op('SetR',2,'(SetR prototype newR) -> prototype forkEdited to have that R (returned by R op).');
	new Op('Lz',2,'Lz means lazyEval. (Lz x y) -> (x y), but (Lz x) does not trigger lazyEval of x (go along its red/evalsTo edge to see what it evals to).');
	new Op('LzI',1,'Lz means lazyEval. (LzI (Lazy x)) -> x.i.');
	new Op('LzII',1,'Lz means lazyEval. (LzII (Lz x)) -> (Lazy x.i), despite that x.i cant be a lazyeval cuz is an int but to stay consistent with LazyL and LazyR it wraps it in a Lazy.');
	new Op('LzL',1,'Lz means lazyEval. (LzL (Lz x)) -> (Lz x.l)');
	new Op('LzR',1,'Lz means lazyEval. (LzR (Lz x)) -> (Lz x.r)');
	new Op('LzLR',2,'Lz means lazyEval. (LzLR l r) -> (LzILR 0 l r), a normal lambda call');
	new Op('LzILR',3,'Lz means lazyEval. (LzILR int l r) -> (Lz x) where x is the lazyEval of .i is its int, .l is its l, .r is its r.');
	new Op('LzIJLR',3,'Lz means lazyEval. (LzIJLR intI intJ l r) -> (Lz x) where x is the lazyEval of .i is its first int, .j is its second int, .l is its l, .r is its r.');
	new Op('LzSetI',1,'Lz means lazyEval. (LzSetI (Lz x)) -> (Lz xForkEditedToHaveThatInt)');
	new Op('LzSetL',1,'Lz means lazyEval. (LzSetL (Lz x)) -> (Lz xForkEditedToHaveThatL)');
	new Op('LzSetR',1,'Lz means lazyEval. (LzSetR (Lz x)) -> (Lz xForkEditedToHaveThatR)');
	new Op('LzE',1,'Lz means lazyEval. (LzE (Lz x)) -> triggers lazyEval of x and returns the e/redEdge/evalsToEdge of x. (LzE (LzLR func param)) -> (func param).');
	new Op('I-',1,'int->int neg.  Wraps around twosComplement int32 as usual.',
		g=>g.sim.i(INT(-g.r.i)),
		g=>(INT(-g.r.i)));
	new Op('Abs',1,'int->int absolute value',
		g=>g.sim.i(INT(Math.abs(g.r.i))), //FIXME what if its minint? Theres no positive for that.
		g=>(INT(Math.abs(g.r.i))));
	new Op('-',2,'(int,int)->int minus',
		g=>g.sim.i(INT(g.l.r.i-g.r.i)),
		g=>(INT(g.l.r.i-g.r.i)));
	new Op('+1',1,'int->int plus 1. Wraps around twosComplement int32 as usual.');
	new Op('-1',1,'int->int minus 1 Wraps around twosComplement int32 as usual.');
	new Op('+',2,'(int,int)->int add. Wraps around twosComplement int32 as usual.',
		g=>g.sim.i(INT(g.l.r.i+g.r.i)),
		g=>(INT(g.l.r.i+g.r.i)));
	new Op('III+',3,'(int,int,int)->int add.  Wraps around twosComplement int32 as usual.');
	new Op('IIII+',4,'(int,int,int,int)->int add.  Wraps around twosComplement int32 as usual.');
	new Op('IIIII+',5,'(int,int,int,int)->int add.  Wraps around twosComplement int32 as usual.');
	new Op('*',2,'(int,int)->int multiply.  Wraps around twosComplement int32 as usual.');
	new Op('III*',3,'(int,int,int)->int multiply.  Wraps around twosComplement int32 as usual.');
	new Op('IIII*',4,'(int,int,int,int)->int multiply.  Wraps around twosComplement int32 as usual.');
	new Op('IIIII*',5,'(int,int,int,int,int)->int multiply.  Wraps around twosComplement int32 as usual.');
	new Op('Eq',2,'(Eq x y) -> T or F depending if x===y aka are the same forest shape including int l r recursively.');
	new Op('Glt',2,'GodelLessThan, like in that wikibinator203 opcode, but for 3 childs instead of 2. One child is an int. Compares first by height, then breakes ties by the int, then (if left agIds are not equal, as an optimization to skip this step) breaks ties by recursing left, then breaks ties by recursing right. Has BigO of min height of the 2 childs cuz it only recurses left or right but never both.');
	new Op('<',2,'(int,int)->int and that returned int is 0 or 1');
	new Op('<=',2,'(int,int)->int and that returned int is 0 or 1');
	new Op('>',2,'(int,int)->int and that returned int is 0 or 1');
	new Op('>=',2,'(int,int)->int and that returned int is 0 or 1');
	new Op('!',1,'int->int that turns 0 to 1 and turns nonzero to 0');
	new Op('/',2,'(int,int)->int divide. FIXME what should divide by 0 return? positive/0? 0/0? negative/0?');
	new Op('%',2,'(int,int)->int mod aka remainder. FIXME what should mod by 0 return?');
	new Op('~',1,'int->int not');
	new Op('<<',2,'(int,int)->int shift left');
	new Op('>>',2,'(int,int)->int signed shift right');
	new Op('>>>',2,'(int,int)->int unsigned shift right');
	new Op('Rot',2,'(int,int)->int rotate. Only uses the lowest 5 bits of the second param cuz the others would have no effect even if they were used, so you can rotate either direction with positive or negative ints but theyll still be wrapped to uint5.');
	new Op('&',2,'(int,int)->int AND');
	new Op('|',2,'(int,int)->int OR');
	new Op('^',2,'(int,int)->int XOR');
	//new Op('III^',3,'(int,int,int)->int XOR');
	//new Op('IIII^',4,'(int,int,int,int)->int XOR');
	//new Op('IIIII^',5,'(int,int,int,int,int)->int XOR');
	new Op('T',2,'the churchTrue lambda',
		g=>g.l.r,
		null);
	new Op('F',2,'the churchFalse lambda. (F U) is identityFunc and is the L of every leaf.',
		g=>g.r,
		null);
	new Op('S',3,'the S lambda',
		g=>{
			let x = g.l.l.r;
			let y = g.l.r;
			let z = g.r;
			return x.E(z).E(y.E(z));
		},
		null);
	new Op('Pair',3,'the churchPair lambda',
		g=>{
			let x = g.l.l.r;
			let y = g.l.r;
			let z = g.r;
			return z.E(x).E(y);
		},
		null);
	new Op('IsDet',1,'FIXME should this take 0 or 1 params? If 0, it could just be set to T or F depending which of 2 levels its called at (pure deterministic vs allow op Nondet). Is deterministic, the lowest level of lambda calls? Returns T or F. If T then (Nondet anything) evals to (S Ident Ident (S Ident Ident)) where Ident/identityFunc is (F U). If F then (Nondet someThings) may return something, but careful to not call the same thing twice expecting a different return value, cuz even though its nondeterministic and it could (from float64 roundoff for example) its likely to get funcallCached and return the same thing (from azgob.e/redEdge/evalsToEdge) it did before, unless that is uncached, and one way to get around that is to salt calculations by including some different ints in them.');
	//replaced by axgob.primz() and axgob.primt() and axgob.b which are both uint4s that together can define utf8, utf16, or utf32, or double[37] etc. new Op('G',2,'(G utf8Bytes) as string');
	//replaced by axgob.primz() and axgob.primt() and axgob.b which are both uint4s that together can define utf8, utf16, or utf32, or double[37] etc. new Op('GG',2,'(GG utf16Bytes) as string');
	new Op('Ty',2,'Its called TypevalB in wikibinator203, Ty here. (Ty "application/json" jsonBytes) for example, any type string (by G or maybe GG?) and 1000000... padded bytes the same as cbt padding in wikibinator203.');
	new Op('H',1,'(H thing) gets height of thing as an int or maxint aka 2**31-1 if its higher than maxint.');
	new Op('Cur',1,'(Cur thing) gets the number of params of thing, how far of thing.l.l.l.l... youd have to go to reach a leaf (or is it + or - 1 from that? Align to P opcode).');
	new Op('P',2,'(P thing n) gets the nth param of thing. 0 is a leaf. 1 is the first param of that leaf. 2 is second param of that leaf, and so on.');
	new Op('Curz',2,'TODO use this for (-4 FuncBody b c d) calling (FuncBody (Lazy (-4 FuncBody b c d))), where -4 evals after 4 more params, -n evals after n more params. Same as Cur but looks into thing of (Lazy thing) if its a (Lazy thing), max 1 Lazy deep, else is just (Cur thing).');
	new Op('Pz',2,'Similar to Curz in how it deals with Lazy, but other than that is same as P.');
	//new Op('Ileaf',maxint,'Should Iget and Iput take lazy cbt, vs do this?... (Ileaf int (Ileaf int) (Ileaf int (Ileaf int))) and so on. For use with Iget and Iput, since you cant call int on int directly for all possible ints without it meaning to call opcodes, or maybe Iget and Iput should be similar to LazyL LazyR Lazy LazyLR LazyE etc? Not sure if i want to complicate it that way.');
	//new Op('Cbt',maxint,'This is being redesigned from axgob having just .i (32 bits) to axgob having .i and .j (64 bits) but still most ops only use .i and .j can be thought of as extra data storage that takes longer to use. (Cbt 64bits) Should Iget and Iput take lazy cbt, vs do this?... (Cbt 64bits (Cbt 64bits) (Cbt 64bits (Cbt 64bits))) and so on, but only uses int32 (the first 32 of 64bits) as addresses. For use with Iget and Iput, since you cant call int on int directly for all possible ints without it meaning to call opcodes, or maybe Iget and Iput should be similar to LazyL LazyR Lazy LazyLR LazyE etc? Not sure if i want to complicate it that way.');
	new Op('Cat',2,'This is how you do binary streaming, append stuff to end of bitstring to forkEdit it. Concat 2 bitstrings using axgob.b as bize32/bitstringSize in each, if they are both such bitstrings. TODO should this keep the primitiveInfo8 (4 bits of which primitive type, 4 bits of size per primitive) axgob.o of the first param, or only if theyre both the same of that?');
	new Op('JJJJget',2,'TODO choose a different letter than J to mean 2 ints cuz J means the second int in an axgob. Like Iget but is 8 ints. Normally used for 256 bit global ids.');
	new Op('JJJJput',3,'TODO choose a different letter than J to mean 2 ints cuz J means the second int in an axgob. Like Iput but is 8 ints. Normally used for 256 bit global ids.');
	new Op('JJget',2,'TODO choose a different letter than J to mean 2 ints cuz J means the second int in an axgob. Like Iget but is 4 ints');
	new Op('JJput',3,'TODO choose a different letter than J to mean 2 ints cuz J means the second int in an axgob. Like Iput but is 4 ints');
	new Op('Jput',2,'TODO choose a different letter than J to mean 2 ints cuz J means the second int in an axgob. Like Iput but val is is 2 ints (Ileaf 335345 (Ileaf 1007))');
	new Op('Iget',2,'(Iget cbtOfInts index) -> int at that index in the array, or 0 is out of bounds. TODO array might always be a powOf2 number of ints?');
	new Op('Iput',3,'(Iput cbtOfInts index intVal) -> cbtOfInts forkEdited to have that intVal at that index, though this is very inefficient cuz of creating a new cbt for every change. Maybe it should just replace log number of nodes per write instead of wrapping a js Int32Array?');
	new Op('Sget',2,'Like Iget but in units of shorts/chars, returns a uint8 as an int.');
	new Op('Sput',3,'Like Iput but in units of shorts/chars, returns a forkEdited cbtOfInts.');
	new Op('Bget',2,'Like Iget but in units of bytes, returns a uint8 as an int.');
	new Op('Bput',3,'Like Iput but in units of bytes, returns a forkEdited cbtOfInts.');
	new Op('ZZZZget',2,'Like Bget but is 4 bits. Might use this for dagplace which uses 4 bit blocks that are 14 colors, transparent, or 2x2 fork as a sparse pic format.');
	new Op('ZZZZput',3,'Like Bput but is 4 bits. Might use this for dagplace which uses 4 bit blocks that are 14 colors, transparent, or 2x2 fork as a sparse pic format');
	new Op('ZZget',2,'Like Bget but is 2 bits. Might use this for dagball bitpic/bloomtree which uses 2 bit blocks, 11 for fork 2x2, 10 or 01 for white or black (is that backward?) or 00 for transparent.');
	new Op('ZZput',3,'Like Bput but is 2 bits. Might use this for dagball bitpic/bloomtree which uses 2 bit blocks, 11 for fork 2x2, 10 or 01 for white or black (is that backward?) or 00 for transparent.');
	new Op('Zget',2,'Like Iget but in units of bits, returns 1 or 0 as an int.');
	new Op('Zput',3,'Like Iput but in units of bits, returns a forkEdited cbtOfInts.');
	new Op('Clz',1,'int->int of number of leading 0s, Math.clz32(int) in js for example.');
	//
	//TODO derive (not hardcode as ops) AvlTree (use Ax to prove its childs are AvlTrees), If/Else, loops, set and get of things in the AvlTree
	//used as forkEditable namespace that If/Else and loops etc take avltree as param and return avltree, etc.
	//TODO use Axgob to reproduce the RockPaperScissors team color capturing experiment done in those dagball videos.
	//TODO use Axgob to form some representation of dagball.Circ, dagball.Ball, dagball.Bitpic/Bloomtree/walls, dagball chk and num options, etc,
	//though likely it will just be a string of ape code without evaling it here, eval it at nondeterministic level which is above the deterministic level.
	//I want to start using Axgob in the dagball gaming window to build more experimental game rules, GPU_circle curves that balls reshape, etc.
	//Remember, Axgobs as combinators are primaryKeys, of the p v dp dv etc vars, including symRule for game rules (p is influence_aka_potenMul) and symField for x y z rad etc,
	//and since its primaryKeys the combinators dont have to be nearly as fast to create or lookup as the game rules run at nondeterministic level,
	//game rules that will be calls of the Nondet opcode on strings or ints or something to
	//choose which nondeterministic/approximate calculation to run many millions of times per second.
	//TODO get Axgobs on screen asap with green arrow pointing at L, blue arrow pointing at R, the int displayed at self,
	//orange arrow pointing at e (deterministic evals to), red arrow pointing at ee (nondeterministic evals to), and anyone can explore any combo of them.
	//The blue and green arrows and ints can be anything, but the orange and red arrows only come sometimes, and there can be disagreement where the red arrows point.
	//These are all lazyEvaled lambdas. They can also have small ByteRect pics like in the gob experiments in dagball.
	//They can all be given x y z rad fields but dont have to be. Pick any 2 of them and an int (default is 0 so u can just pick any 2)
	//and join them to get parent whose L and R are those 2.
	//
	new Op('Dsin',1,'See sim.dops');
	new Op('Dasin',1,'See sim.dops');
	new Op('Dsinh',1,'See sim.dops');
	new Op('Dasinh',1,'See sim.dops');
	new Op('Dcos',1,'See sim.dops');
	new Op('Dacos',1,'See sim.dops');
	new Op('Dcosh',1,'See sim.dops');
	new Op('Dacosh',1,'See sim.dops');
	new Op('Dtan',1,'See sim.dops');
	new Op('Datan',1,'See sim.dops');
	new Op('Datan2',2,'See sim.dops');
	new Op('Dtanh',1,'See sim.dops');
	new Op('Datanh',1,'See sim.dops');
	new Op('Dsigmoid',1,'See sim.dops');
	new Op('Dadd',2,'See sim.dops');
	new Op('DDDadd',3,'See sim.dops');
	new Op('DDDDadd',4,'See sim.dops');
	new Op('DDDDDadd',5,'See sim.dops');
	new Op('Dmul',2,'See sim.dops');
	new Op('DDDmul',3,'See sim.dops');
	new Op('DDDDmul',4,'See sim.dops');
	new Op('DDDDDmul',5,'See sim.dops');
	new Op('Ddiv',2,'See sim.dops');
	new Op('Dneg',1,'See sim.dops');
	new Op('Dminus',2,'See sim.dops');
	new Op('Dmin',2,'See sim.dops');
	new Op('Dmax',2,'See sim.dops');
	new Op('Dfloor',1,'See sim.dops');
	new Op('Dceil',1,'See sim.dops');
	new Op('Dround',1,'See sim.dops');
	new Op('Dfround',1,'See sim.dops');
	new Op('Dsqrt',1,'See sim.dops');
	new Op('Dcbrt',1,'See sim.dops');
	new Op('Dpow',2,'See sim.dops');
	new Op('Dexp',1,'See sim.dops');
	new Op('Dexpm1',1,'See sim.dops');
	new Op('Dabs',1,'See sim.dops');
	new Op('Dhypot2',2,'See sim.dops');
	new Op('Dhypot3',3,'See sim.dops');
	new Op('Dhypot4',4,'See sim.dops');
	new Op('Dlog',1,'See sim.dops');
	new Op('Dlog1p',1,'See sim.dops');
	new Op('Dlog2',1,'See sim.dops');
	new Op('Dlog10',1,'See sim.dops');
	new Op('Dsign',1,'See sim.dops');
	new Op('Dtrunc',1,'See sim.dops');
	while(AG.ops.length < 256){
		new Op('Op'+AG.ops.length+'ReservedForFutureExpansion',1,'TODO make this infloop so when its replaced it doesnt return something different than it returned in an earlier version.');
	}

	console.log('TODO the optimization of not creating curries for some calculations, give multiple params at once, but likely will just do that for some of the gob game rule math that modifies the p v dp dv etc and loops using sim.oct/octree etc cuz game rules calling eachother will happen many millions of times per second including loops and i dont want to slow it down. The pure lambdas (IsDet 0) will be F if thats allowed.')

	const numOps = AG.numOps = Object.keys(AG.ops).length;
	if(Object.keys(AG.ops).length != 256){
		throw new Error('Must be exactly 256 ops (see o8/op byte that goes in axgob.o int32) but is '+AG.numOps);
	}

	//TODO gradMul, gobPtr, gobMem, gob, etc, as if i was gonna merge it with Ap.js language but instead i want to
	//have AG/Axgob.js generate (as user editable content) close enough approximations of dagball and other
	//fun minigames and experiments that Ive made in a more math-precise way. I need the turing complete addressing
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


	//FIXME TODO axgob.o will contain 8 bits of sym. symField and symRule will be 2 of those. Users can set them to whatever user wants.
	//Its 8 bits of arbitrary data, though simField has a meaning in sim.oct the Octree of how it gets ox oy oz orad (a 3d sphere of float64s/doubles).
	AG.symNeutral = 0;
	//axgob.p is viewed as a chance (or scaled somehow, maybe using inverse sigmoid, or maybe as a loss/poten)
	//that the lambda call of that axgob halts aka will axgob.E() return something ever.
	//AG.symHalts = 1;
	AG.symHalt = 1; //Gradual. If 0, means nothing. If 1, means axgob.E() would halt, though its a simulated experimental approximation or guess in game space, not a proof.
	AG.symNohalt = 2; //Gradual. If 0, means nothing. If 1, means axgob.E() would not halt, though its a simulated experimental approximation or guess in game space, not a proof.
	//gob field. x y z rad red green blue, are the most common 7 fields to use in a gob/gameobject.
	//Might also have isMonsterType55, smoothness, jumpyness, life, mana, manaRefillRate, etc.
	//If g is a game object (gob) then g.cp('manaRefillRate').setSym(AG.symField).p is position and .v is velocity of g's manaRefillRate,
	//and if you want to see g's manaRefillRate as a separate object on screen give it x y z rad (and maybe red green blue too) fields,
	//similar to g already has x y z rad red green blue (and manaRefillRate etc).
	//Use a symRule to define that within a certain sphere volume in game coords (sim.oct Octree using ox oy oz orad) that gobs which have a mana and manaRefillRate
	//mod mana that way considering dt (change in time param of doPhysics), using the dp dv kv ap zp av zv vars to adjust it during 1 physics cycle (doPhysics(dt))
	//then Axgob system automatically updates p and v from those, so the mana field refills at the rate of manaRefillRate.
	//This can in theory handle any differential equation such as chuas circuit, 3body, webs of springs and gears, hinges, axles, and other game objects.
	AG.symField = 3;
	//gob game rule, like the rock paper scissors team color capturing experiment in dagball, see videos,
	//but is a turing complete way to make a variety of games and simulations.
	AG.symRule = 4;

	//TODO hook in Ap.js andOr TinyGLSL.js for GPU optimizations (up to a few teraflops in a good gaming computers browser, todo doesnt work in linux or android yet 2024-3).
	//Hook in GPU thru Axblob so can do neuralnets in peer to peer network, and maybe hook in OpenCL thru LWJGL2's OpenCL API, WebGPU, andOr other GPU APIs later.
	//This is a separate js class from Axgob so that complexity doesnt slow it down when not being used.
	//
	//An Axblob contains either or both of: (1) an array (such as of ints or doubles etc) and range in it,
	//andOr (2) an Axgob, either way representing the same lambda but different ways of optimizing it, and Axblob is not always deduped. Axgob is always perfect deduped.
	//If you use alot of arrays, you could use ONLY Axblobs, and when you need nonarrays use axblobs as wrappers of those nonarray axgobs.
	//
	//As of 2024-3-12, Azlazy does not exist and has been merged with Axblob, calling both of them together Axblob.
	//
	//If optionalBlob.blobId then uses that as blobId, else uses optionalAxgob.agId as blobId.
	//
	//This is an optimization to combine arrays that may be duplicated and powOf2 aligned ranges in them, combine that with Axgobs which always have perfect dedup.
	//TODO mergingb Axblobs array and range into Axlazy. And lets call them both axblob, since its an optimization to have blobs sometimes.
	//Wraps either an Axgob or Axblob, representing the same lambda either way, but more efficiently for big array calculations
	//cuz Axlazy is not always deduped. Axgob is always perfect deduped.
	//This is like how Wikibinaator203 has alot of dup objects involving arrays but still does dedup above those.
	//TODO like in wikibinator203, should this use [blobFrom, blobTo, and localIdOfTheArray(agId in this case)] as id for partialDedup?
	//TODO maybe this should be a Proxy?
	//AG.Axlazy = function(optionalAxgob, optionalBlob, optionalBlobFrom, optionalBlobTo, optionalEvaler){
	const Axblob = AG.Axblob = function(sim, optionalAxgob, optionalBlob, optionalBlobFrom, optionalBlobTo, optionalParent){

		//FIXME moved this func to Sim.prototype, so dont call AG.stuff unless sure it exists.
		//let powOf2NumberOfInts = AG.sameOrBiggerIntArrayToNextPowOf2Size(wrapMe); //padded with 0s if needed
		//if(wantAxblob){
		//	//FIXME Axblob should have 3 ints, not just the 2 of blobFrom and blobTo, cuz need an int for bize (in units of array primitive type?) for if whole array isnt used.
		//	return this.arrToBlob(powOf2NumberOfInts);
		//}else{
		throw new Error('(also, very important, i want blobTo to be merged with this third var, which will complicate the (this.blobFrom+this.blobTo)/2 calculations in axblob.L and axblob.R but should be computable using Math.clz32 or something like that efficiently. Also a possible problem, i might want a stream append ability within same array, to grow the array, and since every arr_and_from_and_to only exists where the bits have been decided (wont change again), they are all correct at all time steps during the appending, even if such appending happens over a short or long time. FIXME Axblob should have 3 ints, not just the 2 of blobFrom and blobTo, cuz need an int for bize (in units of array primitive type?) for if whole array isnt used.');


		//PrimaryKey of an Axblob is [blobId,blobFrom,blobTo]. IF there is an axgob but no blob, then blobId equals axgob.agId
		//(TODO? No, dont: make it be axgob.agId+1 of the normed form of that array? Probably shouldnt cuz that would require deduping the whole array)
		//and blobFrom and blobTo are both 0.
		//So ids are 128 bits (or 32+32+53=117 bits if you only count the integer part of the float64 agId and blobId are stored in), like in Wikibinator203,
		//which is one of the reasons for separating Axblob into its own class and leaving Axgob simpler, that it may wrap axgob andOr range of blob.
		//TODO use that in AG.slowDedupKey, but make a slowDedupKeyOfAxblob or simply Axblob.prototype.slowDedupKey.
		//this.blobId = typeof(optionalBlob_or_agId_of_the_array)=='number' ? optionalBlob_or_agId_of_the_array : sim.nextAxgobId();

		this.sim = sim;
		
		this.blob = optionalBlob || null;
		//Parent is an optimization for when a blob creates a l or r child viewing half its range in an array, so l and r remember parent to return it if
		//paired that way again, to return a bigger range in same array.
		this.parent = optionalParent || null;
		this.axgob = optionalAxblob || null;
		if(!this.blob && !this.axgob){
			throw new Error('Must be 1 or both of blob and axgob');
		}
		if(this.blob){
			if(!this.blob.blobId){
				this.blob.blobId = sim.nextBlobId(); //axgobs have positive even id. blobs have positive odd id. sim.lastId counts up by 2
				//throw new Error('If blob is used, its blobId='+this.blob.blobId+' must be the same as this.blobId='+this.blobId);
			}
			this.blobId = this.blob.blobId;
			this.blobFrom = optionalBlobFrom || 0; //int32. inclusive. part of id of axblob even if it doesnt have a blob and only has an axgob.
			this.blobTo = optionalBlobTo!==undefined ? optionalBlobTo : this.blob.length; //int32. exclusive. part of id of axblob even if it doesnt have a blob and only has an axgob.
		}
		if(this.axgob){
			this.blobId = this.axgob.agId;
			this.blobFrom = this.blobTo = 0; //int32s. part of id of axblob even if it doesnt have a blob and only has an axgob.
		}
		//this.evaler = optionalEvaler || null;
		this.evaler = null; //TODO see Evaler optimization in Wikibinator203.
		this.e = null; //deterministic dup. lazyEvaled what this evals to, other than it may be a dup (not always perfect deduped) form of it, same by forest shape. See axgob.e.
		this.ee = null; //nondeterministic dup. lazyEvaled what this evals to at nondeterministic level. See axgob.ee.
	};

	//see Axblob.slowDedupKey, for when an Axblob wraps an Axgob,
	//the slowDedupKey of the axblob is this prefix concat slowDedupKey of the axgob it wraps. TODO like in wikibinator203 make a faster hashtable than slowDedupKey/sim.slowDedup.
	AG.blobGobPrefix = 'B';

	//the slowDedupKey of an axgob and of an axblob which wraps that axgob are different (by a prefix).
	//Its even more different if it wraps a range of an array AND NOT wraps an axgob,
	//but if it wraps both then it ignores the range and returns the prefix+axgob.slowDedupKey()
	//cuz whatever range and array content it is it must be the same array bits as the axgob form of it.
	Axblob.prototype.slowDedupKey = function(){
		//return this.axgob ? (AG.blobGobPrefix+this.axgob.slowDedupKey()) : ('b'+this.blobId+'a'+this.blobFrom+'z'+this.blobTo);
		return this.axgob ? (AG.blobGobPrefix+this.axgob.slowDedupKey()) : this.sim.slowDedupKeyOfArrFromTo(this.blob,this.blobFrom,this.blobTo);
	};

	//deterministic kind. lambda called on lambda finds/creates lambda, an Axlazy in this case which is a dup-allowing (not always dedupe) array optimization.
	Axblob.prototype.E = function(){
		throw new Error('TODO use this.axgob.E or this.axblob.E depending which exists. Do that in evaler?');
	};

	//nondeterministic kind. lambda called on lambda finds/creates lambda, an Axlazy in this case which is a dup-allowing (not always dedupe) array optimization.
	Axblob.prototype.EE = function(){
		throw new Error('TODO use this.axgob.EE or this.axblob.EE depending which exists. Do that in evaler?');
	};

	Axblob.prototype.L = function(){
		if(!this.l){
			if(this.blob){
				//this.l = new AG.Axblob(this.blob, this.blobFrom, (this.blobFrom+this.blobTo)/2);
				//FIXME if its 64 bits or smaller, make it a leaf
				let axgobL = this.axgob ? this.axgob.l : null;
				this.l = new AG.Axblob(this.sim, axgobL, this.blob, this.blobFrom, (this.blobFrom+this.blobTo)/2);
			}else{
				throw new Error('TODO');
			}
		}
		return this.l;
	};

	AG.Axblob.prototype.R = function(){
		if(!this.r){
			let axgobR = this.axgob ? this.axgob.r : null;
			this.r = new AG.Axblob(this.sim, axgobR, this.blob, (this.blobFrom+this.blobTo)/2, this.blobTo);
			//FIXME if its 64 bits or smaller, make it a leaf
		}
		return this.r;
	};

	/*AG.Axblob = function(blob, blobFrom, blobTo, optionalParent){
		this.blob = blob;
		this.blobFrom = blobFrom;
		this.blobTo = blobTo;
		this.parent = optionalParent || null; //an optimization to return parent if l is called on r (see .L() and .R() funcs), to return a bigger range in same array.
	};

	//deterministic kind. lambda called on lambda finds/creates lambda, an Axlazy in this case which is a dup-allowing (not always dedupe) array optimization.
	//This checks if (this paramThing) is the parent and returns that parent (a bigger range in same array) if so. Else todo return an Axlazy of this and thing,
	//but might need to transform the type of thing first (such as by Sim.W/wrap or maybe its an Axgob when it should be an Azlazy?).
	AG.Axblob.prototype.E = AG.Axblob.prototype.EE = function(thing){
		if(this.parent && thing === this.parent.r && this == this.parent.l){
			return this.parent;
		}
		throw new Error('TODO');
	};

	AG.Axblob.prototype.L = function(){
		if(!this.l){
			this.l = new AG.Axblob(this.blob, this.blobFrom, (this.blobFrom+this.blobTo)/2);
			//FIXME if its 64 bits or smaller, make it a leaf
		}
		return this.l;
	};

	AG.Axblob.prototype.R = function(){
		if(!this.r){
			this.r = new AG.Axblob(this.blob, (this.blobFrom+this.blobTo)/2, this.blobTo);
			//FIXME if its 64 bits or smaller, make it a leaf
		}
		return this.r;
	};*/
	
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
	//
	/*TODO redesigning Axgob 2024-3-10...
	so can choose the opcode of leaf but it gets copied from left child for nonleafs.
	This will fix the problem of displaying things like 165OpcodeName.
	This will fix the problem of Ileaf IJLeaf etc since an axgob itself can be a cbt, and can have bit sizes of cbt of 1 2 4 8 16 32 64
	within 1 leaf axgob, and you just pair 2 64 bit axgobs to make a 128 and so on.
	It might create inefficiency if i check that i and j (the 2 data ints) are 0 to do the opcode or not. Maybe I should ignore them for
	opcode purposes.
	Height and curMore are derived and cached, not part of the opcode.
	I could be happy with around 128 max curries for finite size and 128 means infcur, or something like that, and the other up to 128 are
	opcodes such as S T F Pair.
	Do I want symField and symRule to be opcodes? I had originally wanted axgob.i to be that. No, they cant be in the opcode, but putting
	them in the high 24 bits of that extra int could work. Could view it as 4 base64 digits or slightly more than 5 (so 5 else display as uint24)
	a-z chars. "field". fldzz rulex etc. That might be weird to be allowed to set 24 bits of an int but not able to set the other 8 (except by
		setting it in a leaf and deriving upward). I could make it 16 bits of sym (symField, symRule, etc, maybe represent them by chars, some
			of which are emojis, etc), and keep that in an int with 8 bits of opcode and 7 bits of cache of curMore, where curMore is 127 if
			unlimited more curries, and 1 bit for isDet. But in wikibinator203 I needed a whole int for header (and an int for
				bize/bitstringsize). Maybe I should leave the op byte in a var by itself, and make a separate sym int. sim.soijlr(sym, op, i, j, l, r)
		 6 things... It started as 3 (ilr) and now im thinking of having 4 ints (1 of them is a byte). This is getting too heavy.
	Also in the extra bits i might want a way to define the up to 64 data bits as a float64, 1 float32, 2 float32s, etc, BUT i cant have float32
	 and float64 ops at deterministic level. Has to be int based there. Those would be extra bits along side whatever definition of cbt.
	Also, i might want a chosen length header in the extra bits so i dont have to track the last bit in cbt, maybe a count of
	bits up to 2**30 bits aka 128mB.
	Maybe 2 such ints, a from and to. No, that seems wasteful, just use an extra axgob if u want a range like that.
	...
	Thats getting to be alot of features i might want in the extra bits (after the i j 64 bits). List these possible datastructs:
	* i j 64 bits of data
	* o8 opcode, including 128 curry sizes and up to 128 basic opcodes such as S T F Pair Ax.
	* sym, such as symField, symRule, symUserDefinedMonster55, etc, but at most 32 bits for this.
	* bizeFrom32
	* bizeToExcl32 (like wikibinator203 has).
	* cbtSize1To64InDataIJ
	* isSignedPrimitive (used with cbtSize)
	* isFloatPrimitive (used with cbtSize)
	* primitiveSize (can be less than cbtSize to have an array of them, would work well with bize* vars though might need to limit their values
		in that case).
	* isDet, and more generally, detLev as 0 for pure deterministic, 1 for can run game rules using the octree etc, 2 for can run arbitrary js, etc.
	Wikibinator203 has various permissions as bits instead of such levels. Maybe axgob should use a bit mask instead of levels? Also do I want
	saltForNondet like wikibinator203 has 128 bits of it in StackStuff?
	* hasAxConstraint.
	* saltForNondet like wikibinator203 has 128 bits of it in StackStuff
	...
	Also consider that if i give users the ability to store bits other than the 64 data bits, they will use those bits to store data outside the
	cbt system, so dont put too much extra bits in. Also remember that this must be perfectDeduped always, so extra bits slow things down.
	I might be happy with 8 bits of sym, as ive only come up with symField and symRule so far.
	...
	stored: op8 sym8 primitiveInfo8(cuz op8 tells if its a cbt and size 1..64 of data bits, vs other opcodes)
	cache: curMore8  height32
	removed: maskBits8 (see explanation below).
	Im not sure how maskBits8 would work as data in an axgob since it includes a permission system AND all possible axgobs are allowed as lazys.
	The axgob.ee edge is where nondet points, and axgob.e is where det points, so each axgob has BOTH, so that seems to be something that doesnt
	apply here.
	...
	A possible way:
	op8 sym8 primitiveInfo8 curMore8 height32 i32 j32 l r. So 3 ints and 2 childs and the rest (including height32) is cache/derived.
	op8 sym8 primitiveInfo8 curMore8 i32 j32 l r.
	op8 can only be chosen in leaf and is copied from left child upward. curMore8 is derived from op8 and cant be chosen.
	sym8 and primitiveInfo8 and i32 and j32 can be chose and are arbitrary data so 80 bits of arbitrary data user can choose.
	Lets include utf8Byte and utf16Char and maybe also utf32Int in the primitive types of primitiveInfo8.
	bize32 would really help me here, of number of bits, so 1 node could for example hold an array of 2 float32 or of 0 1 2 3 4 5 6 7 or 8 utf8
	bytes or of 57 bits.
	Im hesitant to include 2 bize vars for a range of bitstring (which could help with concatting), but lets look at it with just 1 bize32...
	op8 sym8 primitiveInfo8 curMore8 bize32 i32 j32 l r, so 4 ints and 2 childs.
	I could split into bizeFrom16 and bizeToExcl16 but 8kB isnt big enuf.
	Also what about the salt128 in wikibinator203 for nondet stuff (which i didnt much use except for testing)? In the worst case that could be part of the
	derived lambdas, dont think i really need it, complicates stuff too much.
	BizeFrom32 would complicate things cuz ints chars etc wouldnt always start at powOf2 bit index. Just 1 bize var is enough for stream appending. Do that.
	...
	op8 curMore8 sym8 primitiveInfo8 bize32 i32 j32 l r, so 4 ints and 2 childs.
	sim.obijlr
	sim.ijoblr
	sim.obijlr
	ill find some way to write it.
	Keep in mind 
	...
	OK, that seems to be a good way to do the data and int ops.
	BUT i need a way to represent game rules as in symRule, which p v dp dv kv etc do, along with use of the octree, distance based double loops,
	etc. Some of it very nondeterministic. Some of it only float64 roundoff. The Nondet opcode is where to put such thing (UPDATE: sim.dops) but id still like a
	place to put the (double,double)->double ops, despite theyd only be used at nondeterministic level. I could of course just put them in
	(-4 Nondet "dmul") so (-4 Nondet "dmul" 10. 5.) -> 50.000000000001 or something like that.
	I can at least deterministicly write 10. and 5. as float64s and 10f as float32, using primitiveInfo8.
	And, instead of -4, that would go in op8 which can do up to around 126 curries or Infcur. Ax would have curMore of 1 or possibly 0?
	*/
	const Axgob = AG.Axgob = function(sim, o, b, i, j, l, r){
		
		//uint53, which fits in a float64. Sim.ilr(i,l,r) (UPDATE: sim.obijlr(...)) should dedup and return the existing or create new Axgob.
		//These agIds will differ from one computer to another in the same sim.ns/namespaceString
		//so if you want to sync in opensource peer to peer network then
		//use the 256 bit lazyEvaled global id which will be something like
		//192 bits of hash (or up to 128 bits of literal data),
		//32 bits of gob.i/int32, and 32 bits of header, a little similar to wikibinator203 ids.
		//Im not even sure if need agId but it might be useful for something. TODO figure it out.
		//This is an id of a combinator (i, l, r), not its mutable value (p v dp dv kv ap zp av zv, etc).
		this.agId = sim.nextAxgobId();
		
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

		//Immutable universal-pattern-calculus-combinator stuff (o b i j l r).
		//Search for "//See o8 curm primt primz and sym funcs for what the o int contains" in this file to find what goes in this.o.
		this.o = INT(o); //int32 containing 4 bytes, each used for a different thing.
		//allow this cuz its needed for AG.op.Evaling. if(!this.o){
		//	throw new Error('Im not sure if 0 is allowed for o (likely is in some case) but usually it should be nonzero, so for now im throwing whenever its 0.');
		//}

		//throw new Error('Use INT(x). FIXME stop using |TODOUseMathDotFloor to Math.floor. its used various places. find the most optimized way to do it and stick with that.')

		//Immutable universal-pattern-calculus-combinator stuff (o b i j l r).
		//int32 bize aka bitstring size, from 0 to 2**30. Data is stored in .i and .j, and just cp/callpair such 64 bits together to make 128 bits,
		//2 of those to make 256 bits, and so on up to 2**30 bits. Choose any bize/bitstringSize from 0 to the number of bits it contains.
		//Can stream append for log cost per append. Unlike wikibinator203, Axgob always has perfect dedup since its used as primaryKeys
		//of the p/position v/velocity dp dv kv etc, and that includes if you have such a gigabit it is the same Axgob object as if you
		//create that gigabit again in the same sim or in the same peer to peer network. It can share branches so that could be done with only around 24 objects (25?)
		//which each contain 64 of the bits or are an internal node joining the leaf nodes which contain the data.
		//The max 1 gigabit per object is a limit of the cbt (complete binary tree of bits) system,
		//but if you need more, make an Infcur list or Pair etc of many gigabits.
		//Those 0..(2**30) bits can be labeled by the primitiveInfo8 (4 bits of whichPrimitiveTypeOrOther, 4 bits of sizePerPrimitive)
		//as float array, double array, float16 array, float128 array, uint256 array, int32 array, uint16 array, or singles of any of those,
		//or other combos. The 16 primitive types should include float, int, uint, unicode, other, etc, and the 4 bits of sizePerPrimitive tells which subtype of those,
		//so putting it all together you could make an Axgob that means a double[379] or a utf8[17] etc,
		//though thats only for representing the data, the opcodes still only handle ints and depending on sim.dops also doubles deterministicly
		//(implementation of double ops as int ops goes in sim.dops) or use double ops (such as AG.op.Dtanh) only
		//at nondeterministic level (axgob.ee, instead of deterministic is axgob.e).
		this.b = INT(b);

		
		//Immutable universal-pattern-calculus-combinator stuff (o b i j l r). Combinators are primaryKeys of the gob numbers.
		//Theres 2**64 possible leafs. These 64 bits can be viewed as anything, but if you use it as float64 with nondeterministic roundoff,
		//its got to be at nondeterministic level (above deterministic level where all ops must happen by ints, see IsDet op).
		//See I, J, SetI, SetJ, SwapIJ, etc ops. Having 64 bits also allows enough room for storing an axgob.agId (uint53) in a single axgobs bits,
		//though youd also have to be a nondeterministic level to read it since thats not derived from forest shape but is local to a Sim.
		//TODO Use IJLeaf instead of Ileaf, so can store 64 bits per node instead of 32. Raises storage efficiency that way.
		//
		//FIXME should i be the high 32 bits, so when axgob.i is used as 0 vs nonzero
		//	it (other than float64 subnormals and -9 etc?) is 0 for float64 value of 0 and for int32 value of 0?
		//
		this.i = INT(i); //low int32, the main one, used more often than this.j, and sometimes both.
		//TODO  use this as part of perfectDedup, and convert in an overlapping Float64Array(1) Int32Array(2). axgobNeedsNondetFloat64ToDealWithGameRulesSoMaybeShouldHave2IntsPerNode
		this.j = INT(j); //high int32
		this.l = l; //left/func/l Axgob. The left of every universal-pattern-calculus-combinator is another such combinator.
		this.r = r || this; //right/param/r Axgob. The right of every universal-pattern-calculus-combinator is another such combinator.
		//height of this forest node, 0 if leaf. FIXME should this be limited to maxint aka 2**31-1? or maxUint53?
		//It cant have such a limit since all forest shapes are allowed. It cant infloop to prevent such things.
		//But practically its not gonna exceed 2**53-1 on one computer unless you try to (would have to involve garbcol to fit in memory).
		//
		this.h = l ? Math.max(l.h,r.h)+1 : 0; //forest height. //before bootCloseTheQuineLoop changes it? FIXME why would it change the l var? It should only change this.l.
		console.log('new Axgob, h='+this.h+(l?(' l.h='+l.h+' r.h='+r.h):''));
		if(!this.l){
			if(sim.booted){
				//FIXME this is likely to cause infiniteloops until the quine loop is closed the right way, will take some experimenting like it did in wikibinator203.
				console.log('Doing bootCloseTheQuineLoop cuz Sim has booted, thisAxgob='+this);
				this.bootCloseTheQuineLoop();
			}else{
				console.log('Skipping bootCloseTheQuineLoop cuz Sim has not booted yet, thisAxgob='+this);
			}
		}else{
			//TODO remove this test after bootCloseTheQuineLoop is working
			if(this.h > 0 && this.l.h !== this.h-1){
				throw new Error('this.l.h='+this.l.h+' but this.h='+this.h+' which must be either 1 bigger or maxint to mean unlimited');
			}
		}
		//FIXME might be better to derive IFPR (int func param return funcall caching) from VarargAx
		//FIXME this should be true for (Ileaf int) and any completeBinaryTree of them, but only up to maxint-1 height
		//which would be about 2**(2**31) ints though could actually do it cuz can share branches creating extreme duplication.
		//The Iget and Iput ops use this in height time each and Iput also uses height mem to forkEdit.
		//Does not wrap primitive arrays like in wikibinator203, stores everything in Axgobs with perfect dedup.
		//replaced by this.isb() which gets 1 bit from this.o (is 1 or 0). this.isCbt = false; //FIXME replace this with this.isb() which gets 1 of the bits in this.o and returns it as true/false.
		//the this.i copied from leftmost axgob, the opcode if its certain int values (maybe 0 to 31? most of them do nothing).
		//FIXME replace this.op and this.curMore each with 8 of the bits in this.o. Keep cur as a cache of number of curries so far?
		//Search for "//See o8 curm primt primz and sym funcs for what the o int contains" in this file to find what goes in this.o.
		//Replaced by this.o8() which gets 8 bits from this.o: this.op = this.h ? l.op : this.i; //TODO put some of these derived axgob fields in a header int or multiple header ints, vs having their own field each?
		this.cur = this.h ? Math.min(l.cur+1,infiniteCurMore) : 0;
		//this.curMore = AG.opCurMore(this.op,this.cur); //How many more curries until need to eval?
		//replaced by this.curm() which gets 7 bits from this.o; this.curMore = AG.opCurMore(this.op,this.cur); //How many more curries until need to eval?
		//console.error('where does curm go? that replaces axgob.curMore? It goes in this.o of course, see this.curm(). But where should it be computed? This constructor is taking the o param directly.')

		//Mutable universal-pattern-calculus-combinator stuff. Combinators are primaryKeys of the gob numbers.
		//since it can exactly represent every possible value here in combo with the i l and r lambda childs.
		this.e = null; //deterministic redEdge from here, what this lambda call evals to, lazyEvaled. Axgob or null.
		this.ee = null; //nondeterministic (op Nondet) redEdge from here, what this lambda call evals to, lazyEvaled. Axgob or null.
		//wikibinator203 uses a touch time for (incompletely coded) garbage collection of old funcall caches (func called on param returns returnVal).
		//Not sure if i'll use it here that way but try it. Its especially important about lazyevals of lambdas that are only
		//there for their axgob.e/redEdge/whatItEvalsTo. TODO maybe this should be in units of sim.lastId which is what
		//the last call of sim.nextId() returned so not to call the system clock.
		this.touchTime = 0;
		
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
		this.p = 0; //mutable position of the dimension that this immutable combinator is primaryKey of.
		this.v = 0; //mutable velocity of the dimension that this immutable combinator is primaryKey of.
		this.dp = 0; //change of p per time. Temp var for use during 1 physics cycle, to update this.p and this.v.
		this.dv = 0; //change of v per time. Temp var for use during 1 physics cycle, to update this.p and this.v.
		this.kv = 0; //decay of v per time. Temp var for use during 1 physics cycle, to update this.p and this.v.
		//min/a and max/z impulse of p and v (only affects anything if min<=max at end of doPhysics. Temp var for use during 1 physics cycle, to update this.p and this.v.
		this.ap = this.av = -Infinity;
		this.zp = this.zv = Infinity;
		//the 3d sphere location/radius cache for octree (Sim.oct) as in Gob.js/GB
		//TODO only include axgobs in that octree whose axgob.orad (aka radius in 3d dagball game coordinates) is not 0 (this.isGob()).
		this.ox = this.oy = this.oz = this.orad = 0;

		this.originalAxgob = this; //for optional: axgob.lam() Proxy stuff. TODO rename to .n (like in wikibinator203) or .ag or something smaller than originalAxgob.
	};

	Axgob.prototype.slowDedupKey = function(){
		return this.sim.slowDedupKey(this);
	};

	let Sim = AG.Sim = function(namespaceString){
		this.ns = namespaceString || AG.newRandNsStr();
		this.dops = [];
		//The op byte (its called o8 in wikibinator203) chooses which op. Some of those are Dpow Dmul Dexp Dsin Dcos etc. 256 possible ops
		//but only the double->double and (double,double)->double ops need to be implemented here, and others even if implemented here will be ignored.
		//TODO or should AG.ops/AG.op (AG.Op instances) be merged with Sim?
		for(let i=0; i<256; i++) this.dops.push(null);
		this.booted = false;
		//this.lastId = 2**32; //dont overlap any of the int32s or uint32s.
		//dont overlap any of the int32s or uint32s. TODO make this start at a random uint53 between 2**50 and 2**51,
		//or something like that, so different computers tend to not overlap their ids?
		this.idOffset = 10000000000;
		if(this.idOffset&1){
			throw new Error('idOffset must be even so axgobs have even id and axblobs(which can wrap a range of a blob/array or wrap an axgob) have odd id.');
		}
		this.lastId = this.idOffset;

		//TODO make a faster hashtable
		this.slowDedup = {};

		//TODO raise this. Its what to refill this.gas to at the start of any axgobA.E(axgobB) lambda call that doesnt give an axgobA.E(axgobB,maxGasToSpend).
		//Spend means number of axgob objects created locally andOr similar amount of compute time, not actual money. It prevents infinite loops etc, gives up early.
		this.defaultGas = 10000;

		this.gas = this.defaultGas;

		//old comments about this.oct...
		//TODO 2d or 3d datastruct instead of list. Maybe use a 3d dagball.processGobsWithRule once per physics cycle that they all share,
		//though that could be a problem if their distance constraints are very different.
		//Or maybe make 1 of each maxdist the rule says (which will be a gob.p) so those that share the same maxdist can share the same location hashing.
		//this.gobs = new Set();

		//Octree containing axgobs organized in 3d space by axgob.ox, axgob.oy, axgob.oz (x y z center in 3d space) and axgob.orad (radius).
		//axgob.updateOctree() removes from this Octree, updates those 4 vars, then adds back to this octree.
		//Only include those in the octree whose .orad is positive (or at least nonzero, so those used only as lambdas can leave orad as the default of 0
		//to not waste the octree). If axgob.i===AG.symField then its a field (axgob.r is field name, and axgob.l is the object its a field of),
		//and similarly if axgob.i===AG.symRule (UPDATE: sym is 8 bits in axgob.o you get by axgob.sym(), TODO update comments and code)
		//then its a game rule like in the Rock Paper Scissors team color capturing experiment in some dagball videos
		//but far more general since lambdas are turing complete and the game world is supposed to be made mostly of user created turing complete content.
		this.oct = new AG.Octree(AG.outerBounds);

		//FIXME this is likely to cause infiniteloops until the quine loop is closed the right way, will take some experimenting like it did in wikibinator203.
		//a few Axgobs to get started with. Only need U and (F U) to bootCloseTheQuineLoop but added T Pair and S too, cuz its early experiments and i wanna see it work.
		//this.U = this.i(0); //1 of the 2**64 (UPDATE 2024-3-10+: is now somewhere between 2**64 and 2**128) possible leafs (0).
		this.U = AG.op.U.new(this);
		console.log('Sim.U = '+this.U.toStringC());
		AG.testEqq(this.U.r, this.U, 'U. leaf starts with .r as itself, and during boot, .l is filled in as Ide/identityFunc soon');
		AG.testEqq(this.U.h, 0, 'U. Every leaf height is 0.');
		//this.T = this.i(AG.op.T.op);
		//this.F = this.i(AG.op.F.op); //FIXME use 8 bit op, see axgob.o8() which gets 8 of the bits from axgob.o, instead of this 32 bit op from earlier design.
		this.F = AG.op.F.new(this);
		console.log('Sim.F = '+this.F.toStringC());
		AG.testEqq(this.F.r, this.F, 'F. leaf starts with .r as itself, and during boot, .l is filled in as Ide/identityFunc soon');
		AG.testEqq(this.U.h, 0, 'F. Every leaf height is 0.');
		//this.Pair = this.i(AG.op.Pair.op);
		//this.S = this.i(AG.op.S.op);
		//identityFunc
		this.Ide = this.F.cp(this.U);
		console.log('Sim.Ide = '+this.Ide.toStringC());
		AG.testEqq(this.Ide.l, this.F, 'Ide.l is F');
		AG.testEqq(this.Ide.r, this.U, 'Ide.r is U');
		AG.testEqq(this.Ide.h, 1, 'Ide as (F U), height should be 1.');
		//bootCloseTheQuineLoop
		console.log('Setting this.U.l = this.F.l = this.Ide.l = this.Ide');
		this.U.l = this.F.l = this.Ide.l = this.Ide; //the leaf.l's are the quine loop problem, hopefully solved here (TODO keep testing 2024-3-8-5pET+)
		console.log('2Sim.U = '+this.U.toStringC());
		console.log('2Sim.F = '+this.F.toStringC());
		console.log('2Sim.Ide = '+this.Ide.toStringC());
		AG.testEqq(this.U.l, this.Ide, 'U. L of every leaf is Ide');
		AG.testEqq(this.F.l, this.Ide, 'F. L of every leaf is Ide');
		AG.testEqq(this.U.r, this.U, 'U. AGAIN: leaf starts with .r as itself, and during boot, .l is filled in as Ide/identityFunc soon');
		AG.testEqq(this.F.r, this.F, 'F. AGAIN: leaf starts with .r as itself, and during boot, .l is filled in as Ide/identityFunc soon');
		//all the .r of leafs are already those same leafs cuz of this code in Axgob constructor: this.r = r || this;
		this.booted = true;
		console.log('Sim.booted = '+this.booted);
		console.log('TODO fill in sim.dops with int based deterministic implementations of (double,double)->double ops such as Math.pow, else make sure to infinite loop if those ops are called at deterministic level. At nondeterministic level (axgob.ee) its ok to use the javascript implementation, and maybe even float32 implementation in GPU though id prefer to have separate float vs double ops, TODO figure something out. this.dops='+this.dops.join(', '));
	};

	//wrap a string, Float64Array, Int32Array, number/double, etc.
	Sim.prototype.W = function(wrapMe,wantAxblob){
		if(wrapMe instanceof Float64Array){
			throw new Error('TODO');
		}else if(wrapMe instanceof Float32Array){
			throw new Error('TODO');
		}else if(wrapMe instanceof Int32Array){
			if(wrapMe.length === 0){
				throw new Error('Wrap 0 ints, an empty int array but still use primt and primz');
			}else if(wrapMe.length === 1){
				throw new Error('Wrap just 1 int, axgob.i, but still use primt and primz');
			}else{
				//FIXME moved this func to Sim.prototype, so dont call AG.stuff unless sure it exists.
				let powOf2NumberOfInts = AG.sameOrBiggerIntArrayToNextPowOf2Size(wrapMe); //padded with 0s if needed
				if(wantAxblob){
					//FIXME Axblob should have 3 ints, not just the 2 of blobFrom and blobTo, cuz need an int for bize (in units of array primitive type?) for if whole array isnt used.
					return this.arrToBlob(powOf2NumberOfInts);
				}else{
					//throw new Error('have powOf2SizeIntArrayToAxgob set its bize(axgob.b) to only the ints its using, not always the whole powOf2 number of ints.');
					//return AG.powOf2SizeIntArrayToAxgob(powOf2NumberOfInts);
					//FIXME moved this func to Sim.prototype, so dont call AG.stuff unless sure it exists.
					return this.powOf2SizeIntArrayToAxgob(powOf2NumberOfInts).setB(wrapMe.length*32); //FIXME this only sets it for the top node but not that.r that.r.r and so on.
				}
			}
		}else if(wrapMe instanceof Uint32Array){
			throw new Error('TODO');
		}else if(wrapMe instanceof Int16Array){
			throw new Error('TODO');
		}else if(wrapMe instanceof Uint16Array){
			throw new Error('TODO');
		}else if((wrapMe instanceof Uint8Array) || (wrapMe instanceof Uint8ClampedArray)){
			throw new Error('TODO');
		}else if(wrapMe instanceof Int8Array){
			throw new Error('TODO');
		}else{
			let ty = typeof(wrapMe);
			if(ty === 'string'){
				throw new Error('TODO');
			}else if(ty == 'number'){
				throw new Error('TODO');
			}else{
				throw new Error('TODO');
			}
		}
		//throw new Error('TODO use primz primt cbt etc');
	};

	Axgob.prototype.OpName = function(){
		//throw new Error('Use axgob.o8() which returns 0 to 255 aka which op, instead of the below old design that used 2**32 possible ops. Op is always copied from left child unless isleaf/isU/heightIs0 or if its a lazyEval (which all axgobs are by default until their .e andOr .ee are filled in, pointing at another axgob, and even then can still be used as lazyeval or cross those e/ee/evalsto edges to what the lazyEval evals to, so its separate lambdas for the lazy vs evaled forms unless it happens to eval to itself in which case its the same lambda which happens in Ax opcode (a turing-complete formal-verification opcode for proofs of any finite size that a thing halts) and the opcodes 1..63 which are waiting on at least 1 more curry before eval) in which case op becomes 0/evaling in the new axgob whose .l and .r childs are 2 chosen axgobs.');
		//return AG.ops[this.op] ? AG.ops[this.op].name : ''+this.op;
		return AG.ops[this.o8()].name;
	};

	//op is any int32. cur is number of curries so far. VarargAx is strange in that it has to eval at each next curry
	//and has to be verified even if its already halted (on itself). If I decide to include Bit0, Bit1, andOr Cbt in this combinator design
	//then it might prevent calling it on things other than a cbt of same height (bit0 and bit1 are cbts of the lowest height)
	//or in some versions of wikibinator cbt can be joined with noncbts since its more efficient not to check.
	//This opCurMore func can be defined various possible ways to implement those strange rules along with the normal rules.
	AG.opCurMore = function(op, cur){
		if(op < 0){
			let curries = -op; //fIXME what if its minint which doesnt have an abs in int32?
			return curries-cur;
		}else if(AG.ops[op]){
			return AG.ops[op].cur-cur; //FIXME what if cur is more than that, went past the number of currries before it evals and kept lazying?
		}else{
			return maxint; //is like Infcur, just keep currying more?
			//throw new Error('TODO the int has nothing defined that theyre supposed to do. Should they return some constant, be halted themself, act as identityFunc?');
		}
	};

	//int param to string. If its one of the positive ops/opcodes then its number concat name of the opcode, else its just the number in baseTen as usual.
	//Returns empty string if its 0 if zeroIsEmptyString.
	AG.iToString = function(i,zeroIsEmptyString){
		if(!i && zeroIsEmptyString){
			return '';
		}
		return AG.ops[i] ? i+AG.ops[i].name : i.toString();
	};

	AG.ijToString = function(i,j,zeroIsEmptyString){
		if(i){
			if(j){
				return 'i'+i+'j'+j;
			}else{
				return 'i'+i;
			}
		}else{
			if(j){
				return 'j'+j;
			}else{
				if(zeroIsEmptyString){
					return '';
				}else{
					return 'ij0';
				}
			}
		}
	};

	//local id. Example: '$29872343456' or maybe it should be 'AG$29872343456'? Ive been using $ as prefix for mutable objects, a mutid id.
	//Axgobs have mutable p/position and v/velocity but their combinator parts are immutable.
	Axgob.prototype.locid = function(){
		return '$'+this.agId;
		//return 'AG$'+this.agId;
	};

	//If you give optionalAxgob, it callpairs (cp) this with that then evals, else just evals this as it is.
	//OptionalGas is a number, generally in units of the number of Axgobs created but that can be vague
	//(so only applies during nondeterministic calculations) cuz of different optimizations on different systems.
	Axgob.prototype.E = function(optionalAxgob, optionalGas){
		if(optionalAxgob!==undefined){
			let lazy = this.cp(optionalAxgob);
			return lazy.Eval(optionalGas);
		}else{
			return this.Eval(optionalGas);
		}
	};

	Axgob.prototype.Eval = function(optionalGas){
		/*if(optionalGas!==undefined){
			//FIXME, like in wikibinator203 gas (gasTime gasMem etc, or what were they called) are recursive,
			//	when 1 limit starts it remembers the prev limit in a local var, does a try/finally, and in the finally restores it, except what was spent.
			//FIXME do I want more than number of spend, like 1 for compute cycles and 1 for memory and 1 for network bandwidth etc?
			//	Axgob is supposed to be simpler so hopefully 1 will be enough?
			this.sim.gas = optionalGas&0x7fffffff; //0 to maxint and make it be an int
		}*/
		//this.sim.spend(1);
		//FIXME return this.e or this.ee depending if its deterministic or nondeterministic. Check op IsDet, but more efficiently it should be stored somewhere.
		//Also I might want a third level of that above nondeterministic that allows running arbitrary javascript code (still in browser sandbox).
		if(!this.e){
			if(optionalGas!==undefined){
				throw new Error('TODO set sim.gas to that and recursive calls reduce it, dont let it go negative and end early if it tries. Have a tryspend/else like in wikibinator203 but only in the Nondet/Wiki op.');
			}
			if(this.curm() > 0){
				this.e = this; //waiting on more curries so is halted on self
			}else{
				let op = this.o8();
				let opObject = AG.ops[op];
				if(opObject.func){
					this.e = opObject.func(this);
				}else{
					throw new Error('TODO op='+opObject.name+' has no op.func. To add that search Axgob.js for "new Op(\''+opObject.name+'\'" and add the func there.');
				}
				/*let opObject;
				if(this.op < 0){
					//abs(op) is number of curries (after U/leaf) before eval. First param is FuncBody. Calls FuncBody on (Lazy (...wholeCall...)).
					//TODO check if whats curried so far is halted, and if not, then eval it first.
					//FIXME how to get ops by name? AG.op.Lz aka lazyEval (but that doesnt exist yet 2024-3-7-552pET)
					let lazyOfThis = AG.op.Lz.cp(this);
					let funcBody = this.par(1); //get first param aka funcBody
					//TODO use optionalGas, but consume some for each little thing done.
					this.e = funcBody.E(lazyOfThis);
					//throw new Error('TODO get op int (from this.l.l.l.l...) then look up in AG.ops[num].func or AG.ops[num].funcI');
				}else if(opObject = AG.ops[this.op]){
					this.e = opObject.func(this);
				}else{ //op is some int that doesnt have a meaning in this combinator system. TODO return some constant, act as identityFunc, or do what?
					//throw new Error('TODO');
					this.e = this; //always waiting on more curries, never eval, like Infcur.
				}*/
			}
		}
		return this.e;
	};

	//get parameter number. 0 is the leaf (whichever leaf it started as, of the 2**32 possible leafs). 1 is first param after that. 2 is second param after that. and so on.
	//If i is more than the number of params so far (this.cur, I think, TODO figure this stuff out).
	Axgob.prototype.par = function(i){
		throw new Error('TODO');
	};

	AG.obijDetailString = function(o,b,i,j){
		let sym = AG.oToSym(o);
		let primz = AG.oToPrimz(o);
		let primt = AG.oToPrimt(o);
		let curm = AG.oToCurm(o);
		let o8 = AG.oToO8(o);
		return 'sym'+sym+'_primz'+primz+'_primt'+primt+'_curm'+curm+'_op'+o8+AG.ops[o8].name+'_b'+b+'_i'+i+'_j'+j;
	};

	Axgob.prototype.toString = function(){
		try{
			if(this.h == 1 && this.l.h == 1){
				throw new Error('this.h == 1 && this.l.h == 1, FIXME bootCloseTheQuineLoop should not have allowed those heights/h to happen in the first place. Something is broken in Sim constructor or Axgob constructor.');
			}

			//TODO use axgob.locid()+'#(...)' to define it, and maybe the wikibinator203 {...} syntax for SCurryLists,
			//but just axgob.locid() if it occurs again, sharing branches.
			//let ijStr = AG.ijToString(this.i,this.j);
			let obijDetailString = AG.obijDetailString(this.o,this.b,this.i,this.j);
			if(this.isU()){
				return obijDetailString;
			}else{
				let l = this.l.toString();
				let r = this.r.toString();
				if(l.startsWith('(')){
					return obijDetailString+'('+l.substring(1,l.length-1)+' '+r+')';
				}else{
					return obijDetailString+'('+l+' '+r+')';
				}
			}
		}catch(e){
			console.log('During Axgob.toString, error happened so calling toStringB instead', e);
			return this.toStringB();
		}
	};

	Axgob.prototype.toStringD = function(thiz){
		thiz = thiz || this;
		if(this === null){
			return 'Dnull';
		}else if(this === undefined){
			return 'Dundefined';
		}else if(this === thiz){
			return 'Dthiz';
		}else if(this === this.sim.Ide){
			return 'DIde';
		}else if(this === this.sim.U){
			return 'DU';
		}else if(this === this.sim.F){
			return 'DF';
		}else{
			return 'D'+this.toStringB();
		}
	};

	//a simpler toString that may expand exponentially. Its for when normal toString goes wrong during early experiments.
	Axgob.prototype.toStringB = function(){
		let s = 'B';
		if(this.j) s += 'j'+this.j;
		if(this.i) s += 'i'+this.i;
		//if(this.isU() && this.l && this.r){
		//	return s;
		//}else{
			let lStr = this.l===null ? 'Bnull' : this.l.toStringD(this);
			let rStr = this.r===null ? 'Bnull' : this.r.toStringD(this);
			return s+'('+lStr+' '+rStr+')';
		//}
	};

	Axgob.prototype.toStringC = function(){
		let s = 'this.toStringB()='+this.toStringB();
		if(this.l!==null) s +=  '\nthis.l.toStringB()='+this.l.toStringB();
		if(this.r!==null) s += '\nthis.r.toStringB()='+this.r.toStringB();
		return s;
	};

	/*use axgob.curMore instead.
	Axgob.prototype.curriesLeft = function(){
		//return this.opNum_ || (this.opNum_ = this.isU() ? this.opNum_ = );
		throw new Error('TODO');
	};*/

	//There are 2**32 possible leafs aka the set of combinators which all l and r paths lead to. Returns true if this is any of them. isU/isLeaf.
	Axgob.prototype.isU = function(){
		return !this.h;
		//TODO this is the more efficient way: return !this.h;
		//return !this.r || (this.r===this); //TODO do the more efficient way above
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
		//FIXME .m.fieldName is something in Gob.js that Axgob.js/AG was designed to be a combo of that and lambdas. Will take some careful designing to make that efficient.
		let field = this.m.x; //FIXME use sim.ilr(AG.symField,this,this.sim.wrapString('x')) or something like that? Vs need to cache that in this.m as js {} map?
		//FIXME use sim.ijlr instead of sim.ilr
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
		//if(this.i === AG.symField){ //FIXME sym goes in 8 bits of axgob.o which is an int32.
		if(this.sym() === AG.symField){ //FIXME sym goes in 8 bits of axgob.o which is an int32.
			return this.l;
		}else{
			throw new Error('TODO this is not a symField axgob so what should this return? this? u aka 0 aka this.u? (S I I (S I I)) aka an infinite loop?');
		}
	};

	//returns 'Uint8Array' or 'Float64Array' or 'object' or 'number' or 'string' for example.
	//https://stackoverflow.com/questions/58280379/how-to-find-the-type-of-a-typedarray
	//FIXME also check (x instanceof DataView)?
	//TODO also check vm.isWikibinator203Lambda(x) and return 'fn' if so?
	AG.jsType = x=>(ArrayBuffer.isView(x) ? x.constructor.name : typeof(x)), //copied from TinyGlsl.jsType 2024-3-11.

	//call pair (cp). returns a forest node whose l is this, r is the given r, and if you give the optionalInt param uses that, else uses 0 as the int.
	Axgob.prototype.cp = function(r,optionalI,optionalJ,optionalO,optionalB){
		//this.sim.spend(1);
		//throw new Error('TODO obijlr');
		let o, b;
		let i=INT(optionalI), j=INT(optionalJ);
		if(optionalO!==undefined){
			o = INT(optionalO);
		}else{
			let sym = AG.symNeutral;
			let primz = this.primz();
			let primt = this.primt();
			let isb = this.isb() && r.isb() && this.h==r.h; //both are bitstrings and same height
			let thisCurm = this.curm();
			//curm of 0 means evaling, so alot of the stuff in .o isnt used, is waiting to be evaled and use the .o of what that returns (.e.o or .ee.o).
			let curm = thisCurm===0 ? 0 : (thisCurm===infiniteCurMore ? infiniteCurMore : thisCurm-1);
			let o8 = this.o8(); //copy o8/op from left child if this is not a leaf.
			o = AG.symPrimzPrimtIsbCurmOpToO(sym,primz,primt, isb,curm,o8);
		}
		if(optionalB!==undefined){
			b = INT(optionalB);
		}else{
			b = this.b+r.b; //bitstring size is sum of those 2 bitstring sizes
		}
		return this.sim.obijlr(o,b,i,j,this,r);
	};

	Sim.prototype.obij = function(o,b,i,j){
		return this.obijlr(o,b,i,j,null,null);//FIXME can these be null? .i and .j have to get filled in see "tie the quine knot"/"close the quine loop".
	};

	AG.isPowOf2 = x=>!(x&(x-1));

	AG.nextPowOf2 = x=>{
		//TODO optimize: use Math.clz32.
		if(AG.isPowOf2(x)) return x;
		let powOf2Size = 1;
		while(powOf2Size < x){
			powOf2Size <<= 1;
		}
		return powOf2Size;
	}

	//returns same array if its already a powOf2 size, else creates a bigger one and copies the ints from index 0 up.
	AG.sameOrBiggerIntArrayToNextPowOf2Size = function(ints){
		if(AG.isPowOf2(ints.length)){
			return ints;
		}
		let ret = new Int32Array(AG.nextPowOf2(ints.length));
		ret.set(ints);
		return ret;
	};

	//Must be at least 2 ints. from and toExcl are a powOf2 aligned range in the array. If you dont give those params, it uses the whole array.
	Sim.prototype.powOf2SizeIntArrayToAxgob = function(ints, optionalFrom, optionalToExcl){
		if(ints.length < 2 || !AG.isPowOf2(ints.length)){
			throw new Error('ints.length must be at least 2 and a powOf2, but its '+ints.length);
		}
		let from = optionalFrom || 0;
		let toExcl = optionalToExcl || ints.length;
		let numInts = toExcl-from;
		if(numInts < 2){
			throw new Error('from='+from+' toExcl='+toExcl);
		}
		if(numInts === 2){
			let i = ints[from];
			let j = ints[from+1]; //FIXME should that be reversed? i is supposed to be the low bits, it says in Axgob constructor.
			return this.symPrimzPrimtIsbCurmOpBIJToAxgob(0, 5, AG.primtInt, 1, infiniteCurMore, AG.op.Arr.op, 64, i, j);
		}else{ //numInts > 2
			let l = this.powOf2SizeIntArrayToAxgob(ints,from,from+numInts/2);
			let r = this.powOf2SizeIntArrayToAxgob(ints,from+numInts/2,toExcl);
			let bize = l.b+r.b;
			//2**5 is size of int
			return this.symPrimzPrimtIsbCurmOpBIJLRToAxgob(0, 5, AG.primtInt, 1, infiniteCurMore, AG.op.Arr.op, bize, 0, 0, l, r);
		}
	};

	//returns true (bigEndian) or false (littleEndian) or throws if overlapping Uint8Array and Float64Array dont store pi correctly either way.
	//copied from TinyGlsl.isBigEndian 2024-3-11.
	AG.isBigEndian = ()=>{
		let bytes = new Uint8Array(8);
		//java at https://www.tutorialspoint.com/compile_java_online.php
		//says Long.toHexString(Double.doubleToLongBits(5 FIXME THIS COMMENT IS OLD)) is 400921fb54442d18L, and thats a bigEndian tostring of the long (regardless of how it is in memory).
		bytes[0] = 0x40;
		bytes[1] = 0x09;
		bytes[2] = 0x21;
		bytes[3] = 0xfb;
		bytes[4] = 0x54;
		bytes[5] = 0x44;
		bytes[6] = 0x2d;
		bytes[7] = 0x18;
		let doubles = new Float64Array(bytes.buffer);
		if(doubles[0] == Math.PI) return true; //bigEndian
		bytes[7] = 0x40;
		bytes[6] = 0x09;
		bytes[5] = 0x21;
		bytes[4] = 0xfb;
		bytes[3] = 0x54;
		bytes[2] = 0x44;
		bytes[1] = 0x2d;
		bytes[0] = 0x18;
		if(doubles[0] == Math.PI) return false; //littleEndian
		throw 'Is not bigEndian or littleEndian as tested by overlapping Uint8Array and Float64Array on pi';
	};

	if(AG.isBigEndian()){
		throw 'Axgob using code copied from... TinyGlsl detected bigEndian, which was not needed until 2023-10-19 (coding Dagball072), but that is not supported in the TinyGlsl.timeId code (which needs to overlap a Float64Array with an Int32Array and is not supported in Wikibinator203, for example.';
	}else{
		console.log('Axgob using code copied from... TinyGlsl VM detected littleEndian and may use that for overlapping .buffer in Uint8Array, Int32Array, Float32Array, Float64Array, etc. Despite that bigEndian is how people usually write things, most hardware seems to be littleEndian.');
	}

	//primt is a uint4 in axgob.o. Use axgob.primt() or AG.oToPrimt(axgob.o) or AG.symPrimzPrimtIsbCurmOpToO.
	AG.primtOther = 0; //general bits
	AG.primtInt = 1; //signed ints.
	AG.primtUint = 2; //unsigned ints.
	AG.primtFloat = 3; //float16 float32 float64 float128 etc, but ops normally only use float64 or int32. For future expansion.
	AG.primtUnicode = 4; //UTF8, UTF16, or UTF32.
	//Example: a 256 bit global id of an Axgob, or a 64 bit (actually only using 53 of the bits for the positive integer part) agId/locid of it,
	//or a 128 bit id of an Axblob which may wrap an Axgob andOr a range of any primitive array type, including blobId53, blobFrom32, and blobToExcl32.
	AG.primtAxgobId = 5;
	AG.primtOtherId = 6; //ids other than axgob.
	//these can go up to 15

	//primz ranges 0 to 15 and means primitive size 2**0 to 2**15. For example, int32 has primz of 5 cuz its 2**5 bits,
	//and float64 has primz of 6 cuz its 2**6 bits, and a single bit has primz of 0, and 256 bit ids have primz of 8. Primz/size is used with primt/type.

	Sim.prototype.symPrimzPrimtIsbCurmOpBIJToAxgob = function(sym8,primz4,primt4,isb1,curm7,op8,b,i,j){
		return this.symPrimzPrimtIsbCurmOpBIJLRToAxgob(sym8,primz4,primt4,isb1,curm7,op8,b,i,j,null,null); //FIXME the 2 nulls. tie the quine knot / close the quine loop.
	};

	//Like AG.obijlr but takes multiple params to make the o.
	Sim.prototype.symPrimzPrimtIsbCurmOpBIJLRToAxgob = function(sym8,primz4,primt4,isb1,curm7,op8,b,i,j,l,r){
		return this.obijlr(AG.symPrimzPrimtIsbCurmOpToO(sym8,primz4,primt4,isb1,curm7,op8),b,i,j,l,r);
	};

	//puts some parts of an int together into an axgob.o int
	//TODO make curm be 6 bits aka curm6 instead of curm7. Mark that as a bit reserved for future expenaion, such as maybe ill make it be a cache of (HasAx thisAxgob),
	//and this bit came from reducing the number of curriesMore/curm from 128 to 64 cuz needed more space for opcodes
	//and there will be 192 opodes (see "new Op" in code above) after those 64 opcodes.
	AG.symPrimzPrimtIsbCurmOpToO = (sym8,primz4,primt4,isb1,curm7,op8)=>
		(((sym8&0xff)<<24) | ((primz4&0xf)<<20) | ((primt4&0xf)<<16) | ((isb1&1)<<15) | ((curm7&0x7f)<<8) | (op8&0xff));


	/*My peer to peer network will in theory stream many lambdas really fast at low lag, turing complete streaming.
	So far the new Axgob lambdas are 128 bits plus 2 child pointers.
	64 bits are any data u want. 32 bits of bitstring size, up to 1 gigabit. 8 bits opcode. 8 bits of how many more curries (or unlimited).
	4 bits of which primitive type, int uint unicode float other etc. 4 bits of primitive size. 8 bits of symbol (symField, symRule, etc). 2 childs.
	*/

	AG.oToO8 = o=>(o&0xff);

	//This must be copied from l.o8.
	//8 bits in the axgob.o int.
	Axgob.prototype.o8 = function(){ //FIXME rename this to op after axgob.op is replaced by 8 of the bits in axgob.o.
		return AG.oToO8(this.o);
	};

	//axgob.o int to curriesMore, how many more curries until eval. If it equals infiniteCurMore (127) then it doesnt decrease with each next curry.
	AG.oToCurm = o=>((o>>>8)&0x7f);

	//throw new Error('TODO change infiniteCurMore to 63, maxFiniteCurMore to 62, and have up to 192 opcodes and 64 general currying type opcodes. This is a range of 64 in the o8 byte.')

	//this must be derived from o8 at leaf then decreased by 1 in each next curry (by forkEditing, in parent, not modifying it here)
	//unless its 255 which is Infcur/etc in which case it stays 255. FIXME it should be 127, not 255? So only need 7 bits for this?
	//7 bits in the axgob.o int. number of CURries More aka curMore, or 255 if Infcur aka to take unlimited curries and never eval.
	Axgob.prototype.curm = function(){
		return AG.oToCurm(this.o);
	};

	//isBlob/isCbt? is it a cbt/blob? This is 1 of the bits in axgob.o, the one just above curm. Returns it as true/false.
	Axgob.prototype.isb = function(){
		//return !!(this.o&0x80);
		return (this.o>>>15)&1;
	};

	AG.oToPrimt = o=>((o>>>16)&0xf);

	//4 bits in the axgob.o int.
	//get 4 bits of which primitive type (ignoring size such as int16 vs int32 or utf8 vs utf16 or float32 vs float64), and there is an 'other' type.
	//The primitive size is also 4 bits so 2**0 to 2**15 bits per primitive.
	//
	//int. uint. unicode. float. other. TODO should it also include the 2 bit dagball_bloomtree
	//andOr 4 bit dagplace nodes that are 14 colors, transparent, or fork 2x2? Or just leave those as uint2 and uint4?
	//
	Axgob.prototype.primt = function(){
		return AG.oToPrimt(this.o);
	};

	AG.oToPrimz = o=>((o>>>20)&0xf);

	//4 bits in the axgob.o int.
	//primitive size as 4 bits, meaning each primitive is 2**0 to 2**15 bits. See primt for the 4 bits of which primitive type.
	//If not primitive array, use primt of 'other' (1 of the 16 possible types).
	Axgob.prototype.primz = function(){
		return AG.oToPrimz(this.o);
	};

	AG.oToSym = o=>(o>>>24);

	//8 bits in the axgob.o int.
	Axgob.prototype.sym = function(){
		return AG.oToSym(this.o);
	};

	//Forkedit to replace the sym 8 bits in axgob.o with the given 8 bits. Common sym values are
	//AG.symNeutral, AG.symField, and AG.symRule.
	//AG.symNeutral is used for most lambdas that are not on screen, but a lambda is computed in physics and displayed
	//on screen exactly if its "rad"/radius field has a nonzero position aka this.cp(this.sim.W("rad"))).p or may be a
	//shortcut to it this.m.rad.p, caching symField callpairs that this is the L of in this.m a js {} like it was (incomplete code) done in Gob.js..
	//Users can in theory at runtime use the other possible uint8 values of axgob's sym byte for whatever they want, using the turing complete math.
	Axgob.prototype.setSym = function(sym8){
		throw new Error('TODO');
	};





	//Every axgob is uniquely identified by its 4 ints (o b i j) and 2 axgob childs (l r) and sim.ns/namespaceString and sim.dops. Ids are just names of those.
	//See o8 curm primt primz and sym funcs for what the o int contains.
	//returns an axgob whose int32 .o is the param. The combinators are immutable so returns a forkEdited one.
	//Careful with .o and .b cuz theres logical rules about them.
	Axgob.prototype.setO = function(int){
		return this.sim.obijlr(INT(int),this.b,this.i,this.j,this.l,this.r);
	};

	//Every axgob is uniquely identified by its 4 ints (o b i j) and 2 axgob childs (l r) and sim.ns/namespaceString and sim.dops. Ids are just names of those.
	//returns an axgob whose int32 .b is the param. The combinators are immutable so returns a forkEdited one.
	//Careful with .o and .b cuz theres logical rules about them.
	Axgob.prototype.setB = function(int){
		return this.sim.obijlr(this.o,INT(int),this.i,this.j,this.l,this.r);
	};

	//Every axgob is uniquely identified by its 4 ints (o b i j) and 2 axgob childs (l r) and sim.ns/namespaceString and sim.dops. Ids are just names of those.
	//returns an axgob whose int32 .i is the param. The combinators are immutable so returns a forkEdited one.
	Axgob.prototype.setI = function(int){
		return this.sim.obijlr(this.o,this.b,INT(int),this.j,this.l,this.r);
	};

	//Every axgob is uniquely identified by its 4 ints (o b i j) and 2 axgob childs (l r) and sim.ns/namespaceString and sim.dops. Ids are just names of those.
	//returns an axgob whose int32 .j is the param. The combinators are immutable so returns a forkEdited one.
	Axgob.prototype.setJ = function(int){
		return this.sim.obijlr(this.o,this.b,this.i,INT(int),this.l,this.r); //FIXME might need to adjust o and b
	};

	//Every axgob is uniquely identified by its 4 ints (o b i j) and 2 axgob childs (l r) and sim.ns/namespaceString and sim.dops. Ids are just names of those.
	//returns an axgob whose l is the param axgob. The combinators are immutable so returns a forkEdited one.
	Axgob.prototype.setL = function(l){
		return this.sim.obijlr(this.o,this.b,this.i,this.j,l,this.r); //FIXME might need to adjust o and b
	};

	//Every axgob is uniquely identified by its 4 ints (o b i j) and 2 axgob childs (l r) and sim.ns/namespaceString and sim.dops. Ids are just names of those.
	//returns an axgob whose r is the param axgob. The combinators are immutable so returns a forkEdited one.
	Axgob.prototype.setR = function(r){
		return this.sim.obijlr(this.o,this.b,this.i,this.j,this.l,r); //FIXME might need to adjust o and b
	};

	//Axgob.prototype.u = TODO the 0 Axgob, create it.

	AG.randInt = function(max){
		return (Math.random()*max)|0; //dont need INT(x) if its nonnegative.
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

	AG.testEqq = function(b, c, optionalMessage){
		if(b !== c){
			throw new Error('testEqq failed. b='+b+' c='+c+' '+optionalMessage);
		}
		console.log('testEqq pass: '+optionalMessage);
	};

	Sim.prototype.spend = function(spendGas){
		spendGas &= 0x7fffffff; //0 to maxint, and force it to be an int if its not.
		let newGas = this.gas - spendGas;
		if(newGas <= 0){
			throw new Error('Out of gas, sim.gas='+this.gas+' spendGas='+spendGas);
		}
	};

	//FIXME this is likely to cause infiniteloops until the quine loop is closed the right way, will take some experimenting like it did in wikibinator203.
	//cause (L x (R x)) equals x forall x, to be true by filling in leaf.l and leaf.r for all existing leafs.
	Axgob.prototype.bootCloseTheQuineLoop = function(){
		if(!this.l){
			this.l = this.sim.Ide; //identityFunc. called on this evals to this.
			this.r = this;
		}
	};

	//blobId is an odd uint53 (cuz evens are axgobs and odds are axblobs).
	//From and to are ints ranging 0 to (2**30)/numBitsPerPrimitiveInArrayType. Max array size is 2**30 bits.
	//Creates arr.blobId if it doesnt have one. Reuses it for other ranges of same array, which should always be powOf2 aligned ranges.
	Sim.prototype.slowDedupKeyOfArrFromTo = function(arr,from,to){
		if(!arr.blobId){
			arr.blobId = this.nextBlobId();
		}
		return 'b'+this.blobId+'a'+this.blobFrom+'z'+this.blobTo;
	};

	//returns a string for sim.slowDedup
	Sim.prototype.slowDedupKey = function(o,b,i,j,l,r){
		let s = 'O'+o+'B'+b+'I'+i+'J'+j;
		return l ? (s+'L'+l.agId+'R'+r.agId) : s; //if theres no l, its a leaf/u so just the 4 ints.
	};
	Sim.prototype.nextBaseId = function(){
		this.lastId += 2;
		return this.lastId;
	};
	Sim.prototype.nextAxgobId = function(){
		return this.nextBaseId();
	};
	Sim.prototype.nextBlobId = function(){
		return this.nextBaseId()+1;
	};
	//like wikibinator203's cp(l,r) func but with (int,lambda,lambda) instead of just (lambda,lambda).
	Sim.prototype.ilr = function(i,l,r){
		return this.ijlr(i,0,l,r);
	};

	//Similar to "Sim.prototype.obijlr = function(o,b,i,j,l,r)" but one of the ways of making an Axblob (not an Axgob).
	//wraps an Axgob in an Axblob, without expanding it to an array (if it has one at all).
	//Stores in gob.axblob instead of sim.slowDedup.
	Sim.prototype.gobToBlob = function(gob){
		if(!gob.axblob){
			gob.axblob = new Axblob(this,gob);
		}
		return gob.axblob;
	};

	//like gobToBlob but wraps an Int32Array, Float64Array, Uint8Array, etc (FIXME should it always have to be an int array?) in an Axblob.
	//from and to are in units of the arrays primitive type (ints, floats, bytes, etc). Max array size is 2**30 bits (see axgob.b aka bize aka bitstringSize).
	Sim.prototype.arrToBlob = function(arr, optionalFrom, optionalTo){
		let from = optionalFrom || 0;
		let to = optionalTo!==undefined ? optionalTo : arr.length;
		let slowKey = this.slowDedupKeyOfArrFromTo(arr, from, to);
		if(!arr.slowDedup){ //put the slowDedup js {} map in the array itself to help garbcol the wrappers of ranges of it
			arr.slowDedup = {};
		}
		return arr.slowDedup[slowKey] || (arr.slowDedup[slowKey] = new Axblob(this,null,arr,from,to,null));
	};

	//An axgob is uniquely identified by its 4 ints and 2 child axgobs.
	Sim.prototype.obijlr = function(o,b,i,j,l,r){
		//this.spend(1);
		let slowKey = this.slowDedupKey(o,b,i,j,l,r);
		return this.slowDedup[slowKey] || (this.slowDedup[slowKey] = new Axgob(this,o,b,i,j,l,r)); //FIXME dont put 2 0s in for o and b ints.
		//TODO store slowKey in axgob? would that be of any use, since they're all instantly deduped? Probably would not, so dont do it.
		//throw new Error('INT(x)... TODO this.i = i|TODOUseMathDotFloor; //int32 //TODO  use this as part of perfectDedup, and convert in an overlapping Float64Array(1) Int32Array(2). axgobNeedsNondetFloat64ToDealWithGameRulesSoMaybeShouldHave2IntsPerNode this.j = j|TODOUseMathDotFloor; //int32');
		//return this.slowDedup[slowKey] || (this.slowDedup[slowKey] = new Axgob(this,i,j,l,r));
	};

	Sim.prototype.ijlr = function(i,j,l,r){
		return this.obijlr(0,0,i,j,l,r); //FIXME dont put 2 0s in for o and b ints.
	};

	//make a list of all the nonnegative ops (negatives are curry abs(int) number of params then eval).
	Sim.prototype.opsList = function(){
		//return AG.ops.filter(op=>!!op).map(op=>this.i(op.op)); //exclude nulls
		//theres no nulls anymore. it must be 256 ops, named by axgob.o&0xff aka axgob.o8().
		return AG.ops.map(op=>op.new(this));
	};

	//fill window.opname etc. careful cuz different sims have different ops, differing by theLambda.sim.ns which is the namespaceString

	Sim.prototype.putOpsOnBrowserConsole = function(){
		let ops = this.opsList();
		for(let op of ops){
			window[op.OpName()] = op;
			console.log('window.'+op.OpName()+' = '+op);
		}
	};
	
	//returns the wrapper of the int32, one of the 2**32 possible leafs. sim.i(x)===sim.i(x) is true for all int32 x.
	Sim.prototype.i = function(i){
		//return this.ilr(int,null,null); //FIXME the 2 nulls, in math are supposed to be identityFunc as l and the leaf itself as r.
		let o = AG.symPrimzPrimtIsbCurmOpToO(AG.symNeutral, 5, AG.primtInt, 1, infiniteCurMore, AG.op.Arr.op); //int[1]
		let b = 32; //number of bits in the int[1]
		let j = 0; //ignore. FIXME i is the low 32 of the i j 64 bits? i comes first? endian? Did I get things mixed up?
		return this.obij(o,b,i,j);
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

	//For convienence but these wrappers make it alot slower for some calculations, but for game rules thats gonna run a different way anyways.
	//wrap this Axgob in a Proxy so can call it as a js lambda on other such proxys or axgobs (auto wraps them) and returns such a proxy.
	//Proxy called on Proxy finds/creates Proxy. Can go back to axgob by axgob.lam().ag.
	/*Axgob.prototype.lam = function(){
		if(!this.lam_){
			//TODO set this.lam_ to the proxy
			throw new Error('TODO');
		}
		return this.lam_;
	};*/
	/*Axgob.prototype.lam = function() {
		if (!this.lam_) {
			const originalAxgob = this;
			const lambdaFunction = (arg) => {
				if (arg === undefined) {
					return originalAxgob;
				}
				const effectiveArg = arg instanceof Axgob ? arg.lam() : arg;
				return originalAxgob.E(effectiveArg);
			};
	
			this.lam_ = new Proxy(lambdaFunction, {
				apply: (target, thisArg, args) => {
					return Reflect.apply(...arguments);
				},
				get: (target, prop, receiver) => {
					// Intercept property access and redirect to originalAxgob
					if (Reflect.has(originalAxgob, prop)) {
						return Reflect.get(originalAxgob, prop, receiver);
					}
					// Default behavior for properties not found on originalAxgob
					return Reflect.get(target, prop, receiver);
				}
			});
		}
		return this.lam_;
	};*/
	// Define a single reusable proxy handler
	const axgobProxyHandler = AG.axgobProxyHandler = {
		apply: (target, thisArg, args) => {
			const originalAxgob = target.originalAxgob;
			if (args.length === 0 || args[0] === undefined) {
				return originalAxgob;
			}
			const effectiveArg = args[0] instanceof Axgob ? args[0].lam() : args[0];
			return originalAxgob.E(effectiveArg);
		},
		get: (target, prop, receiver) => {
			const originalAxgob = target.originalAxgob;
			if (Reflect.has(originalAxgob, prop)) {
				return Reflect.get(originalAxgob, prop, receiver);
			}
			return Reflect.get(target, prop, receiver);
		}
	};

	// This lambda function is just a placeholder for the function object needed by the Proxy.
	// It doesn't contain specific logic but holds the originalAxgob property.
	const lambdaFunction = function() {};

	Axgob.prototype.lam = function() {
		if (!this.lam_) {
			// Create the function object and assign the originalAxgob reference
			const functionObject = lambdaFunction;
			functionObject.originalAxgob = this;

			// Create a proxy with the functionObject and the shared handler
			this.lam_ = new Proxy(functionObject, axgobProxyHandler);
		}
		return this.lam_;
	};

	


	Sim.prototype.add = function(axgob){
		//this.ilr(axgob.i,axgob.l,axgob.r);
		this.obijlr(axgob.o,axgob.b,axgob.i,axgob.j,axgob.l,axgob.r);
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
	Axgob.prototype.inMe = function*(){
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
		for(let foundGobInCube of this.inBounds(sphere.oBounds())){
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

	//AG.sim = new Sim('$testNs567Evilbit0'); //a sim to get started
	AG.sim = new Sim('$testNs567Evilbit1'); //a sim to get started


	//AG.htmlForExtraTests = ()=>{
	//	let html = 'AG.htmlForExtraTests... (TODO)';
	//	return html;
	//};

	console.log('Starting to define AG.extraTests (each AG.xt adds one), which wont run automatically in this (UPDATE: Axgob.js instead of wikibinator) Wikibinator203VM.js file and are normally run in a html UI as vm.htmlForExtraTests() generates buttons html.');
	
	AG.extraTests = [];

	/*let Ev = vm.eval; //eval of that wikibinator code
	let Evv = code=>{
		let ret = ()=>Ev(code); //lazyeval of that wikibinator codr
		ret.toString = ()=>code;
		return ret;
	};*/

	AG.test = (testName, a, b)=>{
		if(a == b){
			if(0<=AG.loglev)console.log('Test pass: '+testName+', both equal '+a);
		}else{
			throw ('Test '+testName+' failed cuz '+a+' != '+b);
		}
	};
	
	AG.Test = function(name, getX, getY){
		this.name = name;
		this.getX = getX;
		this.getY = getY;
	};
	AG.Test.prototype.run = function(){
		AG.test(this.name, this.getX(), this.getY());
	};
	AG.Test.prototype.toString = function(){
		return '[vm.Test name['+this.name+'] getX['+this.getX+'] getY['+this.getY+']]';
	};
	
	//create a lazyevaled extraTest to be done later if user pushes button made by vm.htmlForExtraTests()
	AG.xt = function(name, getX, getY){
		AG.extraTests.push(new AG.Test(name, getX, getY));
	};

	AG.xtTodo = function(name){
		if(!name.startsWith('TODO ')){
			name = 'TODO '+name; //so can count todos in the "count fails" button.
		}
		AG.xt(name, ()=>true, ()=>false);
	};
	
	//TODO fix wikibTostringBugTheOldNamesArentGettingClearedAndAppearInNewCodeThatHasntDefinedThemYet then uncomment the next 2 tests.
	AG.xt('Trivial test to make sure the extraTest buttons work, always passes', ()=>1, ()=>1);
	AG.xt('(iota iota) returns (S T (T T))', ()=>iotaIota, ()=>(S.cp(T).cp(T.cp(T))));
	AG.xt('(iota (iota (iota iota))) returns T', ()=>Iota.E(Iota.E(Iota.E(Iota))), ()=>T);
	AG.xt('(iota (iota (iota (iota iota)))) returns "this should fail"', ()=>Iota.E(Iota.E(Iota.E(Iota.E(Iota)))), ()=>'this should fail');
	AG.xt('(iota (iota (iota (iota iota)))) returns S', ()=>Iota.E(Iota.E(Iota.E(Iota.E(Iota)))), ()=>S);

	AG.extraTests.reverse();
		
	AG.htmlForExtraTests = ()=>{
		if(!AG || !AG.extraTests) throw 'Couldnt find AG (Axgob.js defines AG) or AG.extraTests';
		let html = '<div id=agExtraTests>';
		//let idPrefix = 'extraTestBtn_'+randIntSize(1e9)+randIntSize(1e9)+'_';
		let idPrefix = 'extraTestBtn_'+AG.randUniqueString()+'_';
		let testAllBtn = '<input type=button onclick="for(let i=0; i<AG.extraTests.length; i++) try{ document.getElementById(\''+idPrefix+'\'+i).click(); }catch(e){}" value="Test ALL"></input>&nbsp;&nbsp;&nbsp;';
		//background-color: red
		let countFails = '<input type=button onclick="let countFails = 0; let countTodos = 0; let countPasses = 0; for(let i=0; i<AG.extraTests.length; i++){ let btn = document.getElementById(\''+idPrefix+'\'+i); if(btn.style[\'background-color\'] == \'orange\') countTodos++; else if(btn.style[\'background-color\'] == \'red\') countFails++; else if(btn.style[\'background-color\'] == \'green\') countPasses++; } alert(\'countFails=\'+countFails+\' countTodos=\'+countTodos+\' countPasses=\'+countPasses+\' total=\'+(countFails+countTodos+countPasses)+\' but u have to click Test ALL or click individual tests first. It counts red buttons.\');" value="Count fails (2023-3-14 am still building this testing system for Axgob.js, but in wikibinator it says things like... countFails=10 countTodos=42 countPasses=344 total=396)"></input>&nbsp;&nbsp;&nbsp;';
		html += testAllBtn;
		html += countFails;
		//html += '<input type=button onclick="if(!vm) throw \'No vm. TODO get it from Wikibinator203.n.vm or U.n.vm?\'; vm.clearCache()" value="Clear cache (warning, may cause dedup problems)"></input> (advanced and newer tests first (buttons below), and farther below are basic tests)<br>';
		for(let i=0; i<AG.extraTests.length; i++){
			let x = AG.extraTests[i];
			let name = AG.extraTests[i].name;
			html += '<br>\n';
			html += '<input id="'+idPrefix+i+'" type=button onclick="try{ console.log(\'Testing AG.extraTests['+i+'] = \'+AG.extraTests['+i+']); AG.extraTests['+i+'].run(); this.style.backgroundColor=\'green\'; }catch(e){ if(this.value.includes(\'].run(); // TODO\') || this.value.includes(\'].run(); // FIXME\')){ this.style.backgroundColor=\'orange\'; console.log(\'Button becomes orange for TODO: \'+this.value); }else{ this.style.backgroundColor=\'red\'; throw e; } }" value="AG.extraTests['+i+'].run(); // '+name+'"></input>';
			html += '<input type=button onclick="console.log(\'AG.extraTests['+i+'] = \'+AG.extraTests['+i+']);" value="get code" title="display code of this on browser console without evaling it"></input>';
		}
		html += '<br>\n';
		html += testAllBtn;
		html += '<div id=agExtraTests>';
		return html;
	};
	
	return AG;
})();
console.log('Axgob.js AG = '+AG);
console.log('Object.values(AG.ops).filter(x=>!!x).length (try to get this under 128, or under 256 if including the approx 126 curry sizes and 127 as Infcur) = '+Object.values(AG.ops).filter(x=>!!x).length);
console.log('Axgob.js AG.sim.i(100) = '+AG.sim.i(100));
AG.sim.putOpsOnBrowserConsole(); //FIXME dont pollute the global namespace, but just for now...
window.ll = L.E(L); //test case, todo stop polluting global namespace
window.aboutToLLTest = true;
console.log('aboutToLLTest='+window.aboutToLLTest);
console.log('ll = '+ll);
window.Iota = Pair.E(S).E(T); //the iota combinator, which proves turing completeness.
console.log('Iota = '+Iota);
window.iotaIota = Iota.E(Iota);
console.log('(Iota Iota) = '+iotaIota);
AG.testEqq(iotaIota, S.cp(T).cp(T.cp(T)), '(iota iota) returns (S T (T T))');
AG.testEqq(Iota.E(Iota.E(Iota.E(Iota))), T, '(iota (iota (iota iota))) returns T');
AG.testEqq(Iota.E(Iota.E(Iota.E(Iota.E(Iota)))), S, '(iota (iota (iota (iota iota)))) returns S');
let W = wrapMe=>AG.sim.W(wrapMe);
let test4Ints = W(Int32Array.of(100,101,102,103));
console.log('test4Ints = '+test4Ints);
console.log('Axgob.js/AG booted.');
console.log('...');
