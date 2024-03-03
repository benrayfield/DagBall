//Ben F Rayfield offers Gob.js/GB under opensource MIT license.
var SelFn=null, RuleFn=null, B=null, C=null, D=null, E=null, F=null, G=null, H=null, I=null, MaxDist=4, Infl=1; //used by generated code
const GB = (()=>{
	let GB = {};
	
	let Gob = GB.Gob = function(sim, optionalP, optionalV){
		this.sim = sim;
		sim.gobs.add(this);
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
		
		this.p = optionalP!==undefined ? optionalP : 0;
		this.v = optionalV!==undefined ? optionalV : 0;
		this.dp = this.dv = this.kv = 0;
		this.ap = this.av = -Infinity; //impulse min
		this.zp = this.zv = Infinity; //impulse max
		//1 dimensions gradient of high dimensional scalarField defined by the poten func in the lisplike game scripting language
		//(poten (/ 1 (+ .01 dist)) for example, if dist is a var defined earlier.
		this.gradient = 0;
		//TODO gob.lock = true or false, to prevent changing of p and v, like to lock a circ in a certain x y and radius?
		//If this.lock then this.doPhysics(dt) does nothing, does not update this.p and this.v
		this.lock = false;
		//list of gobs. childs for this.w.rule which is a (SelectorFunc ..numbersAndGobs.. RuleFunc) if exists, and this is the numbersAndGobs part
		this.ch = [];
	};
	
	//namespace is a small string that starts with '$'. Each sim is a high dimensional vector with various other objects
	//you might call the names of the dimensions though those objects are often big and complex such as a RBM neuralnet layer goes in dagball.Circ.nn sometimes.
	let Sim = GB.Sim = function(namespace){
		this.ns = namespace;
		//TODO 2d or 3d datastruct instead of list. Maybe use a 3d dagball.processGobsWithRule once per physics cycle that they all share,
		//though that could be a problem if their distance constraints are very different.
		//Or maybe make 1 of each maxdist the rule says (which will be a gob.p) so those that share the same maxdist can share the same location hashing.
		this.gobs = new Set();
	};
	
	/*dagball.processGobsWithRule = function(gobs, maxDistance, rule, dt){
		function createGrid(maxDist){
			return {
				maxDist: maxDist,
				cells: {},
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
	
	Sim.prototype.newGob = function(optionalP,optionalV){
		return new GB.Gob(this,optionalP,optionalV);
	};
	
	Sim.prototype.wrap = function(wKey, wVal){
		let gob = new GB.Gob(this);
		gob.w[wKey] = wVal;
		gob.p = 1; //influence_and_potenMul
		return gob;
	};
	
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
	//(did i change that to just 'DV$thenbase64digitsofthe32bytes? i think so, todo look around for various implementations)')
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