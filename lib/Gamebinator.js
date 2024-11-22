//Ben F Rayfield offers Gamebinator as opensource MIT license.
//GAME comBINATOR, a universal pattern-calculus combinator similar to wikibinator203
//specialized in determinism and int32 calculations.
//In general a game could be made of a forest of pure-funcs, each viewed as a game object (gob),
//and for all pairs (or 2d near pairs), in a random order (or nearest pairs first) replace x and y
//with x(x,y,dt) then replace x and y with y(y,x,dt). Could include mana refill rates etc.
const G = (()=>{
	let G = {};
	
	//Call Pair (CP), data structure
	G.intsPerNode = 0;
	G.HEADER = G.intsPerNode++; //header etc. chooses from 3+ standard data structures that are each 8 ints.
	G.INPTRS = G.intsPerNode++; //literal int32 data, if relevant
	G.NEXT = G.intsPerNode++;
	G.ME = G.intsPerNode++;
	G.CP_EVALSTO = G.intsPerNode++;
	//G.CP_LIT = G.intsPerNode++; //todo USE L and R as literal data depending on HEADER?
	G.CP_L = G.intsPerNode++;
	G.CP_R = G.intsPerNode++;
	G.CP_LITERALA = G.intsPerNode++; //literal int32 data, if relevant
	//G.LITERALB = G.intsPerNode++; //literal int32 data, if relevant
	//G.LITERALC = G.intsPerNode++; //literal int32 data, if relevant
	//G.CP_RESERVEDFORFUTUREEXPANSION = G.intsPerNode++;
	const intsPerNode = G.END = G.intsPerNode;
	
	//literal data up to 128 bits aka 4 ints, data structure
	G.intsPerNode = 0;
	G.HEADER = G.intsPerNode++; //header etc. chooses from 3+ standard data structures that are each 8 ints.
	G.INPTRS = G.intsPerNode++; //literal int32 data, if relevant
	G.NEXT = G.intsPerNode++;
	G.ME = G.intsPerNode++;
	//G.EVALSTO = G.intsPerNode++;
	//G.LIT_RESERVEDFORFUTUREEXPANSION = G.intsPerNode++;
	G.LIT_A = G.intsPerNode++; //literal int32 data
	G.LIT_B = G.intsPerNode++; //literal int32 data
	G.LIT_C = G.intsPerNode++; //literal int32 data
	G.LIT_D = G.intsPerNode++; //literal int32 data
	
	//avl tree node, an optimization and specialization and subset of (except for the header bits marking it as an AVL node) a CP_ node.
	G.intsPerNode = 0;
	G.HEADER = G.intsPerNode++; //header etc. chooses from 3+ standard data structures that are each 8 ints.
	G.INPTRS = G.intsPerNode++; //literal int32 data, if relevant
	G.NEXT = G.intsPerNode++;
	G.ME = G.intsPerNode++;
	G.AVL_L = G.intsPerNode++;
	G.AVL_R = G.intsPerNode++;
	G.AVL_RESERVEDFORFUTUREEXPANSION_A = G.intsPerNode++;;
	G.AVL_RESERVEDFORFUTUREEXPANSION_B = G.intsPerNode++;;
	FIXME avlleaf vs avlbranch vs thingsthatarenotavl;
	
	G.intsPerNode = 0;
	G.HEADER = G.intsPerNode++; //header etc. chooses from 3+ standard data structures that are each 8 ints.
	G.INPTRS = G.intsPerNode++; //literal int32 data, if relevant
	G.NEXT = G.intsPerNode++;
	G.ME = G.intsPerNode++;
	G.UI_PTR = G.intsPerNode++; //THE other node this UI node wraps
	G.UI_WH = G.intsPerNode++; //width16 and height16
	G.UI_YX = G.intsPerNode++;; //Y16 and X16`
	G.UI_TODOA = G.intsPerNode++;
	
	
	
	TODO fork 2 data structures, one thats a normal function call pair (cp)
	and one thats specialized in AVL tree (everything has perfect dedup),
	and maybe a third data structure thats specialized in literal data of powOf2 size (see cbt in wikibinator203),
	and maybe a few more types but those seem the most important and others can be derived from their combos.
	TODO do i want VarargAx opcode?
	TODO i want opcodes for all the js (int,int)=>int ops, including Math.imul, & | + / etc.
	Use optimization that a node is always 8 ints. Make literals be up to 4 ints, every possible powOf2 size.
	Have trySpend/else opcode thats deterministic, with 2 units of spending:
		numComputeCycles, numMemory (in units of nodes), similar to in wikibinator203.
	Make it have perfectDedup and be efficient enough to simulate all pairs of 200 objects on screen at once,
	hopefully alot more.
	
	//stream of Gamebinator combinators, a hashtable in an Int32Array whose top half
	//is first node in each bucket and whose bottom half is linkedList of nodes in each bucket.
	//Each node has a NEXT int ptr to the next node in that bucket/linkedList.
	//TODO make garbageCollection (garbcol) work without needing to rehash.
	//The actual number of nodes it can store should be around 3/4 of maxNodes.
	//Each node is someSmallConstantInt number of ints.
	let Gream = G.Gream = function(maxNodes){
		if(maxNodes&1) throw new Error('maxNodes='+maxNodes+' is odd');
		this.ints = new Int32Array(maxNodes);
		this.nextLinkedNode = intsPerNode; //use ptr 0 as null, so dont use the first intsPerNode ints.
	};
	
	G.prototype
	
	
	return G;
})();