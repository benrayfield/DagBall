//Ben F Rayfield offers Axgob.js/AG under opensource Wikibinator203 license (GNU AGPL3 + 3 extra permissions including classpath exception),
//though an earlier version of Axgob was MIT licensed on github 2024-3-7 as 33kB of incomplete code before "closing the quine knot".
//
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
//
const AG = (()=>{
	const AG = {};

	const cubeSide = AG.cubeSide = 2**16;
	const halfSide = AG.halfSide = cubeSide/2;

	const maxint = AG.maxint = 2**31-1;
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
	//returns an Axgob of this op int in the given Sim. You need new Axgobs for each Sim
	//since they dont directly interact with eachother and have a different sim.ns/namespaceString.
	Op.prototype.new = function(sim){
		return sim.i(this.op);
	};
	const ops = AG.ops = [];
	//skip first 100 indexs so those numbers appear as themself,
	//but 100 appears as 100Infcur 101Nondet 102Ax etc (or whatever those ops are, might reorder them).
	for(let i=0; i<100; i++) ops.push(null);
	AG.op = {}; //map of op.name to op
	//TODO should all the negatives be wait for abs(that) number of curries (1 to 2**31-1 curries, cuz 2**31-1 is max positive int)?
	//If so, then when it reaches that last number of curries it calls the first param on (Pair (...all params except last...) lastParam)
	//as usual in wikibinator though in wikibinator203 it became a LamNs object.
	//new Op('Curz',2,'TODO use this for (-4 FuncBody b c d) calling (FuncBody (Lazy (-4 FuncBody b c d))), where -4 evals after 4 more params, -n evals after n more params. Same as Cur but looks into thing of (Lazy thing) if its a (Lazy thing), max 1 Lazy deep, else is just (Cur thing).'),
	//new Op('Pz',2,'Similar to Curz in how it deals with Lazy, but other than that is same as P.'),
	//
	//new Op('noop',maxint,'does nothing. keeps currying forever. Does that make this be like wikibinator203 Infcur aka the [...] lists?'),
	new Op('Infcur',maxint,'just keeps currying next param, never evals (always evals to itself).');
	new Op('Nondet',1,'This is where to hook in other systems such as Dagball, Dagplace, or anything you want etc as long as it can be viewed as lambda called on lambda finds/creates lambda, and this is a nondeterministic layer so it can have roundoff and peer to peer disagreements that converge together. Infloops if called at deterministic level. This takes only 1 param but you can make it take more by wrapping it in one of the ops that curries more params such as the op -17 takes 17 param (16 if you dont include the FuncBody which is first param). If called above the deterministic layer (which is the lowest layer) then can mount any plugins you want here such as gob game rules using sim.oct/octree looping nondeterministicly over pairs of near gobs within some max distance of eachother where both are within a given gobs x y z radius, or whatever you want to mount there.');
	new Op('Ax',0,'similar to wikibinator203 VarargAx opcode. Can only halt at deterministic layer.');
	new Op('HasAx',1,'(HasAx thing) -> 1 as true or 0 as false for does thing contain a call of Ax opcode, but Ax by itself does not count, only if it has enuf params (is that 1 or 2 params?) that it has to be verfied. Normally verifying may take up to any finite time to prove a true statement is true, and can never prove a false statement is true. Halts means true in thise case. If HasAx is false then its easier to verify. Remember that every forest node is valid whether it halts or not, but (Ax funcBody ...params...) evals to itself if true, infinite loops (if go along red edge aka evalsto edge aka axgob.e which starts null and is filled in if it evals to something). Does not count (Lazy x) where (HasAx x).');
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
		g=>g.sim.i((-g.r.i)|0),
		g=>((-g.r.i)|0));
	new Op('Abs',1,'int->int absolute value',
		g=>g.sim.i(Math.abs(g.r.i)|0), //FIXME what if its minint? Theres no positive for that.
		g=>(Math.abs(g.r.i)|0));
	new Op('-',2,'(int,int)->int minus',
		g=>g.sim.i((g.l.r.i-g.r.i)|0),
		g=>((g.l.r.i-g.r.i)|0));
	new Op('+1',1,'int->int plus 1. Wraps around twosComplement int32 as usual.');
	new Op('-1',1,'int->int minus 1 Wraps around twosComplement int32 as usual.');
	new Op('+',2,'(int,int)->int add. Wraps around twosComplement int32 as usual.',
		g=>g.sim.i((g.l.r.i+g.r.i)|0),
		g=>((g.l.r.i+g.r.i)|0));
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
	new Op('G',2,'(G utf8Bytes) as string');
	new Op('GG',2,'(GG utf16Bytes) as string');
	new Op('Ty',2,'Its called TypevalB in wikibinator203, Ty here. (Ty "application/json" jsonBytes) for example, any type string (by G or maybe GG?) and 1000000... padded bytes the same as cbt padding in wikibinator203.');
	new Op('H',1,'(H thing) gets height of thing as an int or maxint aka 2**31-1 if its higher than maxint.');
	new Op('Cur',1,'(Cur thing) gets the number of params of thing, how far of thing.l.l.l.l... youd have to go to reach a leaf (or is it + or - 1 from that? Align to P opcode).');
	new Op('P',2,'(P thing n) gets the nth param of thing. 0 is a leaf. 1 is the first param of that leaf. 2 is second param of that leaf, and so on.');
	new Op('Curz',2,'TODO use this for (-4 FuncBody b c d) calling (FuncBody (Lazy (-4 FuncBody b c d))), where -4 evals after 4 more params, -n evals after n more params. Same as Cur but looks into thing of (Lazy thing) if its a (Lazy thing), max 1 Lazy deep, else is just (Cur thing).');
	new Op('Pz',2,'Similar to Curz in how it deals with Lazy, but other than that is same as P.');
	//new Op('Ileaf',maxint,'Should Iget and Iput take lazy cbt, vs do this?... (Ileaf int (Ileaf int) (Ileaf int (Ileaf int))) and so on. For use with Iget and Iput, since you cant call int on int directly for all possible ints without it meaning to call opcodes, or maybe Iget and Iput should be similar to LazyL LazyR Lazy LazyLR LazyE etc? Not sure if i want to complicate it that way.');
	new Op('Cbt',maxint,'This is being redesigned from axgob having just .i (32 bits) to axgob having .i and .j (64 bits) but still most ops only use .i and .j can be thought of as extra data storage that takes longer to use. (Cbt 64bits) Should Iget and Iput take lazy cbt, vs do this?... (Cbt 64bits (Cbt 64bits) (Cbt 64bits (Cbt 64bits))) and so on, but only uses int32 (the first 32 of 64bits) as addresses. For use with Iget and Iput, since you cant call int on int directly for all possible ints without it meaning to call opcodes, or maybe Iget and Iput should be similar to LazyL LazyR Lazy LazyLR LazyE etc? Not sure if i want to complicate it that way.');
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
	const Axgob = AG.Axgob = function(sim, i, j, l, r){
		
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
		//Theres 2**64 possible leafs. These 64 bits can be viewed as anything, but if you use it as float64 with nondeterministic roundoff,
		//its got to be at nondeterministic level (above deterministic level where all ops must happen by ints, see IsDet op).
		//See I, J, SetI, SetJ, SwapIJ, etc ops. Having 64 bits also allows enough room for storing an axgob.agId (uint53) in a single axgobs bits,
		//though youd also have to be a nondeterministic level to read it since thats not derived from forest shape but is local to a Sim.
		//TODO Use IJLeaf instead of Ileaf, so can store 64 bits per node instead of 32. Raises storage efficiency that way.
		this.i = i|0; //low int32, the main one, used more often than this.j, and sometimes both.
		//TODO  use this as part of perfectDedup, and convert in an overlapping Float64Array(1) Int32Array(2). axgobNeedsNondetFloat64ToDealWithGameRulesSoMaybeShouldHave2IntsPerNode
		this.j = j|0; //high int32
		this.l = l; //left/func/l Axgob. The left of every universal-pattern-calculus-combinator is another such combinator.
		this.r = r || this; //right/param/r Axgob. The right of every universal-pattern-calculus-combinator is another such combinator.
		//height of this forest node, 0 if leaf. FIXME should this be limited to maxint aka 2**31-1? or maxUint53?
		//It cant have such a limit since all forest shapes are allowed. It cant infloop to prevent such things.
		//But practically its not gonna exceed 2**53-1 on one computer unless you try to (would have to involve garbcol to fit in memory).
		//
		this.h = l ? Math.max(l.h,r.h)+1 : 0; //before bootCloseTheQuineLoop changes it? FIXME why would it change the l var? It should only change this.l.
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
		this.isCbt = false;
		//the this.i copied from leftmost axgob, the opcode if its certain int values (maybe 0 to 31? most of them do nothing).
		this.op = this.h ? l.op : this.i; //TODO put some of these derived axgob fields in a header int or multiple header ints, vs having their own field each?
		this.cur = this.h ? Math.min(l.cur+1,maxint) : 0;
		//this.curMore = AG.opCurMore(this.op,this.cur); //How many more curries until need to eval?
		this.curMore = AG.opCurMore(this.op,this.cur); //How many more curries until need to eval?

		//Mutable universal-pattern-calculus-combinator stuff. Combinators are primaryKeys of the gob numbers.
		//since it can exactly represent every possible value here in combo with the i l and r lambda childs.
		this.e = null; //deterministic redEdge from here, what this lambda call evals to, lazyEvaled. Axgob or null.
		this.ee = null; //nondeterministic (op Nondet) redEdge from here, what this lambda call evals to, lazyEvaled. Axgob or null.
		//wikibinator203 uses a touch time for garbage collection of old funcall caches (func called on param returns returnVal).
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

	Axgob.prototype.OpName = function(){
		return AG.ops[this.op] ? AG.ops[this.op].name : ''+this.op;
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
			return this.cp(optionalAxgob).Eval(optionalGas);
		}else{
			return this.Eval(optionalGas);
		}
	};

	Axgob.prototype.Eval = function(optionalGas){
		//FIXME return this.e or this.ee depending if its deterministic or nondeterministic. Check op IsDet, but more efficiently it should be stored somewhere.
		//Also I might want a third level of that above nondeterministic that allows running arbitrary javascript code (still in browser sandbox).
		if(!this.e){
			if(optionalGas!==undefined){
				throw new Error('TODO set sim.gas to that and recursive calls reduce it, dont let it go negative and end early if it tries. Have a tryspend/else like in wikibinator203 but only in the Nondet/Wiki op.');
			}
			if(this.curMore > 0){
				this.e = this; //waiting on more curries so is halted on self
			}else{
				let opObject;
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
				}
			}
		}
		return this.e;
	};

	//get parameter number. 0 is the leaf (whichever leaf it started as, of the 2**32 possible leafs). 1 is first param after that. 2 is second param after that. and so on.
	//If i is more than the number of params so far (this.cur, I think, TODO figure this stuff out).
	Axgob.prototype.par = function(i){
		throw new Error('TODO');
	};

	Axgob.prototype.toString = function(){
		try{
			if(this.h == 1 && this.l.h == 1){
				throw new Error('this.h == 1 && this.l.h == 1, FIXME bootCloseTheQuineLoop should not have allowed those heights/h to happen in the first place. Something is broken in Sim constructor or Axgob constructor.');
			}

			//TODO use axgob.locid()+'#(...)' to define it, and maybe the wikibinator203 {...} syntax for SCurryLists,
			//but just axgob.locid() if it occurs again, sharing branches.
			let iStr = AG.iToString(this.i,true);
			if(this.isU()){
				return iStr;
			}else{
				let l = this.l.toString();
				let r = this.r.toString();
				if(l.startsWith('(')){
					return iStr+'('+l.substring(1,l.length-1)+' '+r+')';
				}else{
					return iStr+'('+l+' '+r+')';
				}
			}
		}catch(e){
			console.error(e);
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
		//TODO this is the more efficient way: return !this.h;
		return !this.r || (this.r===this); //TODO do the more efficient way above
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
		if(this.i === AG.symField){
			return this.l;
		}else{
			throw new Error('TODO this is not a symField axgob so what should this return? this? u aka 0 aka this.u? (S I I (S I I)) aka an infinite loop?');
		}
	};

	//call pair (cp). returns a forest node whose l is this, r is the given r, and if you give the optionalInt param uses that, else uses 0 as the int.
	Axgob.prototype.cp = function(r,optionalI,optionalJ){
		return this.sim.ijlr(optionalI|0,optionalJ|0,this,r);
	};

	//returns an axgob whose int32 .i is the param. The combinators are immutable so returns a forkEdited one.
	Axgob.prototype.setI = function(int){
		return this.sim.ijlr(int|0,this.j,this.l,this.r);
	};

	//returns an axgob whose int32 .j is the param. The combinators are immutable so returns a forkEdited one.
	Axgob.prototype.setJ = function(int){
		return this.sim.ijlr(this.i,int|0,this.l,this.r);
	};

	//returns an axgob whose l is the param axgob. The combinators are immutable so returns a forkEdited one.
	Axgob.prototype.setL = function(l){
		return this.sim.ijlr(this.i,this.j,l,this.r);
	};

	//returns an axgob whose r is the param axgob. The combinators are immutable so returns a forkEdited one.
	Axgob.prototype.setR = function(l){
		return this.sim.ijlr(this.i,this.j,this.l,r);
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

	AG.testEqq = function(b, c, optionalMessage){
		if(b !== c){
			throw new Error('testEqq failed. b='+b+' c='+c+' '+optionalMessage);
		}
		console.log('testEqq pass: '+optionalMessage);
	};

	let Sim = AG.Sim = function(namespaceString){
		this.ns = namespaceString || AG.newRandNsStr();
		this.booted = false;
		//this.lastId = 2**32; //dont overlap any of the int32s or uint32s.
		//dont overlap any of the int32s or uint32s. TODO make this start at a random uint53 between 2**50 and 2**51,
		//or something like that, so different computers tend to not overlap their ids?
		this.idOffset = 10000000000;
		this.lastId = this.idOffset;

		//TODO make a faster hashtable
		this.slowDedup = {};

		//old comments about this.oct...
		//TODO 2d or 3d datastruct instead of list. Maybe use a 3d dagball.processGobsWithRule once per physics cycle that they all share,
		//though that could be a problem if their distance constraints are very different.
		//Or maybe make 1 of each maxdist the rule says (which will be a gob.p) so those that share the same maxdist can share the same location hashing.
		//this.gobs = new Set();

		//Octree containing axgobs organized in 3d space by axgob.ox, axgob.oy, axgob.oz (x y z center in 3d space) and axgob.orad (radius).
		//axgob.updateOctree() removes from this Octree, updates those 4 vars, then adds back to this octree.
		//Only include those in the octree whose .orad is positive (or at least nonzero, so those used only as lambdas can leave orad as the default of 0
		//to not waste the octree). If axgob.i===AG.symField then its a field (axgob.r is field name, and axgob.l is the object its a field of),
		//and similarly if axgob.i===AG.symRule then its a game rule like in the Rock Paper Scissors team color capturing experiment in some dagball videos
		//but far more general since lambdas are turing complete and the game world is supposed to be made mostly of user created turing complete content.
		this.oct = new AG.Octree(AG.outerBounds);

		//FIXME this is likely to cause infiniteloops until the quine loop is closed the right way, will take some experimenting like it did in wikibinator203.
		//a few Axgobs to get started with. Only need U and (F U) to bootCloseTheQuineLoop but added T Pair and S too, cuz its early experiments and i wanna see it work.
		this.U = this.i(0); //1 of the 2**64 possible leafs (0).
		console.log('Sim.U = '+this.U.toStringC());
		AG.testEqq(this.U.r, this.U, 'U. leaf starts with .r as itself, and during boot, .l is filled in as Ide/identityFunc soon');
		AG.testEqq(this.U.h, 0, 'U. Every leaf height is 0.');
		//this.T = this.i(AG.op.T.op);
		this.F = this.i(AG.op.F.op);
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
	};

	//FIXME this is likely to cause infiniteloops until the quine loop is closed the right way, will take some experimenting like it did in wikibinator203.
	//cause (L x (R x)) equals x forall x, to be true by filling in leaf.l and leaf.r for all existing leafs.
	Axgob.prototype.bootCloseTheQuineLoop = function(){
		if(!this.l){
			this.l = this.sim.Ide; //identityFunc. called on this evals to this.
			this.r = this;
		}
	};

	//returns a string for sim.slowDedup
	Sim.prototype.slowDedupKey = function(i,j,l,r){
		return l ? ('I'+i+'J'+j+'L'+l.agId+'R'+r.agId) : ('I'+i); //if theres no l, its a leaf/u so just the int.
	};
	Sim.prototype.nextId = function(){
		return ++this.lastId;
	};
	//like wikibinator203's cp(l,r) func but with (int,lambda,lambda) instead of just (lambda,lambda).
	Sim.prototype.ilr = function(i,l,r){
		return this.ijlr(i,0,l,r);
	};

	Sim.prototype.ijlr = function(i,j,l,r){
		let slowKey = this.slowDedupKey(i,j,l,r);
		return this.slowDedup[slowKey] || (this.slowDedup[slowKey] = new Axgob(this,i,j,l,r));
		//TODO store slowKey in axgob? would that be of any use, since they're all instantly deduped? Probably would not, so dont do it.
		//throw new Error('TODO this.i = i|0; //int32 //TODO  use this as part of perfectDedup, and convert in an overlapping Float64Array(1) Int32Array(2). axgobNeedsNondetFloat64ToDealWithGameRulesSoMaybeShouldHave2IntsPerNode this.j = j|0; //int32');
		//return this.slowDedup[slowKey] || (this.slowDedup[slowKey] = new Axgob(this,i,j,l,r));
	};

	//make a list of all the nonnegative ops (negatives are curry abs(int) number of params then eval).
	Sim.prototype.opsList = function(){
		return AG.ops.filter(op=>!!op).map(op=>this.i(op.op)); //exclude nulls
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

	AG.sim = new Sim('$testNs567'); //a sim to get started
	
	return AG;
})();
console.log('Axgob.js AG = '+AG);
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
console.log('Axgob.js/AG booted.');
console.log('...');