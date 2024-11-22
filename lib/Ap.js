//Ap.Ape browser GPU programming language opensource MIT license, prototype by Ben F Rayfield ~2023-10.
//Originally from dagball.Ape but moving it to its own file that only depends on TinyGLSL.
//
//No to: Requires Gob.js?? (nevermind that, switching to Axgob.js?? in dagball, unknown if will hook in here, no, todo Wikibinator305)
//only if you use nonempty array of GB.Gob objects in Ap.Call and gpucpu apeType/opcode's third param.

/*ape/Ap.js (FIXME theres also another ape language out there so i renamed it to Ap) language uses this syntax:
{name op params...} is the most general form and can do () {} and [] too.
(op params...) generates a name.
<lvalue rvalue> reads a float from rvalue and writes it in lvalue. lvalue and rvalue may be a float
	var or [] expr for tensors.
[arrayName indexA indexB indexC...] where each index var has a count and size, as in a loop from
	0 to size-1. it can be any count and size even if that array is a different size or number of dimensions.

//Things to move to dagball html/js:
//Ap.Ape.prototype.updateEdGroups = function(circ)

/*TODO make Ap.Ape able to contain Float32Array and the idh idw floatsPerGpuThread numbers etc,
and simply add an eval func to Ap.Ape so Ape->Ape.
Should Float32Array go in ape.data.floats?
See Ap.Ape.prototype.eval
*/




/* delay this until TinyGlsl2 since its a major redesign...

TODO TinyGLSL2 keeps memory in GPU but uses javascript objects wrapping it,
and each of those objects represents an immutable array of floats, and if you free it
then that memory in GPU remains but can be written then allocated to other such immutable objects?
TinyGlsl2.Mem
TinyGlsl2.call(code and mems etc) -> Mem.
Mem.free()
Mem.read() -> Float32Array.
TinyGlsl2.wrap(aFloat32Array) -> Mem.
The calls within gpu seem fast enuf. The bottleneck this improves is need to copy between cpu and gpu less often.
*/















//Done, and if its just ptr u write it as [matAb a b] else (parPtr matAb a b) or (locPtr matAb a b): console.log('TODO {parPtr matAB a b} {locPtr matAB a b} (matAB parlocMem ...) etc');
/*
leave bigMem for future upgrade to tinyglsl1. just do par and loc for now.
...
Few details to work out, but this is whats happening in Ape redesign,
and its going to result in no separate potenForDisplay vs poten (for gradient) funcs (merged)...
...
(matAB parMem ...) //only par
(matAB parlocMem ...) //par and loc, par as default
(matAB locparMem ...) //par and loc, loc as default
(matAB locMem ...) // only loc
(matAB bigMem ...) //only big
{par}
{loc}
{big}
[matAB a b] uses default mem.
How about instead of adding a param to [], make parPtr locPtr bigPtr apetypes.
{parPtr matAB a b}
{locPtr matAB a b}
{bigPtr matAB a b}
...
some parts OLD, wrote while figuring it out...
...
Ape new syntax
[] vs <> is par vs parr
() vs {} swap.
(= lval rval)
bigPtr
[memtype arr params]
...
{matAB arr (5))
...
arr //overlaps on par parr big
big //all bigMems together
par //all parMems together
parr //all parrMems together
[big matAB a b]
..
Maybe keep [...] with just extra param
to say which mem type?
or should mem type be apeType?
...
[1 matAB a b] is ptr in parMem
[2 matAB a b] in parrMem
[3 matAB a b] in bigMem
If give [matAB a c] then use which default?
Use default of whichever mem type matAB is defined in?
So [0 matAB a b] takes it from matAB.
(matAB parrMem (sizeA 5) (sizeB 7))?
Or do i want just paMem and bigMem?
Let them specify parrMem vs parMem
but nomatter which mem type,
parMem overlaps all of them
as first n floats.
And par parr big, are arrays that cover
all of their mem type.
Do i want {bptr matAB a b} vs [3 matAB a b]?
The default [matAB a b] makes me prefer
[].
Yes. Build this 
First code matmul and other ape codes
in the new syntax, make sure i like it.
Rename parr to local or something.
Wait, how do u get size of {par} {loc} and {big}? Size is supposed to be known
by its childs, but those depend on
whole ape of mant code and arrays.
Just set them to size 0 since theyre an overlapping view, and prove it separately.
...
(matAB parMem ...) //only par
(matAB parlocMem ...) //par and loc, par as default
(matAB locparMem ...) //par and loc, loc as default
(matAB locMem ...) // only loc
(matAB bigMem ...) //only big
{par}
{loc}
{big}
[matAB a b] uses default mem.
How about instead of adding a param to [], make parPtr locPtr bigPtr apetypes.
{parPtr matAB a b}
{locPtr matAB a b}
{bigPtr matAB a b}
[matAB a b] means whichever of those
is default mem type for matAB.
Yes. Build this. Write sample ape code first, incl potenForDisplay and poten for gradient.
Only par and big are given as float32Arrays.
Do i want  int mems? Maybe later.
Multi kernels in gpu at once for low lag?
Maybe later. Make new language for that after tinyglsl ape dagball and wikib goviral together.
Put floats in per ape.
{putFloats matAB theFloats}
Or maybe as part of ape.eval(loc,big)?
Also maybe swap the symbols () vs {}.

//ids should be par.length+1
{gpu
	TODO
	{+
		{+
			<(floatEpsilon float) .0001>
			(copyParToLoc *
				(p + {par} {1})
				{+
					<{locPtr {loc} p} {parPtr {loc} p}>
				}
			}
			{f+= {locPtr {loc} FIXME_how_to_parLengthPlusOne} floatEpsilon>
		}
		{doLast
			(matAB locparMem (matDimA 200) (matDimB 300))
			(matBC locparMem matDimB (matDimC 500))
			(matAC locMem matDimB (matDimC 500))
			(matmulABCLoop *
				matDimA
				matDimC
				{+
					<(sumB float) 0>
					{*
						matDimB
						{f+= sumB {f* [matAB matDimA matDimB] [matBC matDimB matDimC]}}
					}
					(<[matAC matDimA matDimC] sumB>)
				}
			)
		}
	}
}


TODO get rid of .wrap and make ape.eval take parMem and bigMem params which are Float32Arrays. Both are optional.
Also take the idh idw floatsPerGpuThread params, same as tinyglsl.
Add to ape a func to say where it is in par, and where it is in big, and where it is in loc. It may be in 0 or more of those. Return int,
so user can copy floats into and out of those Float32Arrays at that offset.


Ap.eval = function(apeCode, parMem) -> Float32Array
ape.eval = function(parMem) -> Float32Array
*/



console.log('Ape found TinyGlsl = '+TinyGlsl+' (else throw cuz not found)');
console.log('TODO rename to the Ap programming language since there appears to already be an Ape programming language. Ap.Ape is the main object type here.');
const Ap = {
	license: 'Ap.Ape programming language opensource MIT license, prototype by Ben F Rayfield ~2023-10',
	depends: ['TinyGLSL.js', 'headless_WebGL2_GLSL', 'browser', 'GPU'],
	website: 'https://github.com/benrayfield/DagBall/blob/main/lib/Ape.js',
	howToUse: 'let call = Ap.lazyEval(stringOfApeCode); let parArrays = call.par.childs; call.par.put(parArrays[3],5,6.78); That sets the 5th float in that array to 6.78. Do that for any or all in parArrays. Set call.numGpuThreads. Set call.floatsPerGpuThread to 1 or 4. let floatsFromGpu = call.eval(); That should get you around 1 teraflop on a good gaming computers browsers.',

	todos:[
		'2024-5-16 fix this Ap.Ape.prototype.transformFloatValsToVArray_readVAtIndex = (V,i)=>(i<3 ? Ap.num([0.0009765625,.5,0][i]) : Ap.ptr(V,Ap.num(i))); dont hardcode these first 3. see generated glsl for why its hardcoded, the part near codeMaker where it adds epsilon for gradient.',
		'//TODO merge duplicate code between Ape.jsLambdaCode and the "for(let funcApe of funcApes)" code in Ape.toMem',
		"This text occurs 2 places in Ap.js: TODO merge duplicate code between Ap.Ape.prototype.ptrCode and the *ptr parts of Ap.Ape.prototype.toTinyGlslCodeRecurse which these 2 lines are from",
		"make it work with numExtraFloatsFIXME of 0. code += Ap.nline(tablev)+'float extraFloatsFIXME['+Ap.numExtraFloatsFIXME+']; //See onlyLowestIndexedNBallsRollOnCurvesTheOthersJustDoVelocity bug 2023-12-2, trying to fix it';",
		'do this more places, not just in apetypes of +/listofthingstodo and */loop: if(innerCode.endsWith(\')\')){ //is an expr like sin(x_f*y_f) or (x_f*y_f). generateSemicolonAfterFuncCall.',
		'change all toTinyGlslCodeRecurse(lang,tablev) to toTinyGlslCodeRecurse(lang,tablev,forceInt) but make sure forceInt exists there and make sure it wasnt meant to always return floats.',
		'this.apeSize = this.childs.length ? this.childs[0].size() : 0; //FIXME this could break the _i/_s system, not counting size right.',
		'rename apeType="?:" and get rid of Ap.mergeTokens, and just dont have any "?" in apetypes or names except if the apetype is exactly "?", so its simpler to parse. I can parse it, but i dont want to create that complexity for other systems that might also parse it, and it makes it easier to read if "?" only means one thing: means func. @ means call.',
		'2023-11-26-6p its moving the bell2d valleys but not attracting them to eachother as chain links, and its not verifying the number of params The @doSpring call doesnt throw when i remove or add params. Problem is "}}}}}}}" has 1 too many "]" and ends the code there. Im gonna check for that and throw if theres any code left after last pop, put that in Ap.Todos. TODO get that code from use?func@callToMakeSmaller(circChain)Code but its easy to reproduce probably, just append any code after a valid code and make sure it throws.',
		'Should it be pfloat instead of float so those float vars dont stay modified when used outside of funcA? This overlap of namespaces is likely to create problems. {+ (funcA func (a float) (b float) {fsin {f* a b}}) <potenCirc$ {call funcA {call funcA x$ x$} {f* 3 y$}}>} It should be generating this too float a_f = 0.; float b_f = 0.;',
		'check for vars read, vars written, and varsReadBeforeWritten',
		"to prevent player created/shared GPU code from destroying the game world... the memory fencing part of FormalVerification: Ap.Ape.prototype.possibleInts = function(){ Todo('For each of the apeTypes that returns int, including i+ (someName 55) (someArray parMem {30} (someName 55) {10}) i/ imod, etc, call nrange.multiply(nrange) nrange.union(nrange) etc on child apes to generate this.');",
		'FIXME should other calls of LoopName be replaced by recursion of toTinyGlslCodeRecurse like here? This will likely come up as more Ap.Ape code is written that uses other combos of apes.',
		'This is being copied from Dagball to this Ap.js todos, and is the solution to preventing code from users from causing the losing of gl context (too many contexts error), see "Its about memory fencing. If it goes outside of" in comment in this Ap.js file that refers to a bug fix done in Dagball (one of the 090 versions) involving menory fencing after codeMaker in gradient: Its not doing its own memory fencing yet and is passing out of range requests to the browsers webgl2. These seem already protected but since I dont want the multiple GPU codes made by the players of this game to read/write eachother, ive got to formal-verify my pointer arithmetic .... As long as you dont go more than maybe around 15 indent levels deep, I should be able to simply brute-force it in CPU, to verify that 2 untrusted GPU softwares merged together to display and play with on your screen, cant read or write parts of eachother except the parts they say .... Memory range and number of flops per ape (tree of apes) of code (...) {...} [...] <...> is constant. A simple list of possible memory ranges [fromA toA fromB toB fromC...] can derive more such lists recursively, but expands exponentially with tree height. .... https://twitter.com/DagBallGame/status/1722724456903172183 ........... Its not doing its own memory fencing yet and is passing out of range requests to the browsers webgl2. These seem already protected but since I dont want the multiple GPU codes made by the players of this game to read/write eachother, ive got to formal-verify my pointer arithmetic ( https://twitter.com/benrayfield/status/1722717597802659976 is this)',
		'Trying to fix: "TinyGLSL.js:511 WARNING: Too many active WebGL contexts. Oldest context will be lost." That bug was fixed in Dagball090.html 2023-11-18 by this code. Its likely some of the Ap tests are using it wrong the same way.',
		'Make a map of apeTypes to rename, from what to what, such as rename f+= to += and rename + and * to something since those are controlflow not float or int math ops. Do it all at once, and verify with tests. Also, swap () vs {} syntax so (apeType params...) means {generateAName apeType params...}. Leave [] and <> as they are. Do this before too much code gets written, cuz it keeps getting harder to change it.',
		'let rvalue = forceInt ? this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1,forceInt) : this.childs[1].floatCode(lang,tablev+1).trim(); //TODO merge floatCode and toTinyGlslCodeRecurse and the forceInt param.',
		'search code for: The forceInt param will not force int in most cases (FIXME) but will in this case: was added 2023-11-16 for',
		'Dont create duplicate apes like led to this log line where c4_matAB was returned twice by a call of searchApes: has these mems: c4_matAB,c4_matBC,c4_matAC,c4_matAB,c4_matBC,c4_matAC,c4_matAC. See "dedupedMemApeNames.length != memApeNames" in Dagball088.html 2023-11-10-145pET.',
	],

	//UTC seconds. Before this, filenames like 983Balls_dagball1701807366.23.json should not be transformed using Ap.nextLanguage.
	//After this they should. TODO the nextLanguage upgrade has not started yet (now is 2023-12-7-9aET)
	//so this upgradeTimeToNextLanguage time will likely change.
	//upgradeTimeToNextLanguage: 1701957334,
	upgradeTimeToNextLanguage: 1702000000, //new Date(1702000000*1000) Thu Dec 07 2023 20:46:40 GMT-0500 (Eastern Standard Time)

	//FIXME what to do about Ap.lazyEval(string)? Which syntax does it use?
	//Rename that and all existing test case calls of it to Ap.oldLazyEval, and have Ap.lazyEval call ParseApe.toNextLanguage andOr toOldLanguage.

	/*
	//filenames are generated like dagball1701807366.23.json but often get manually prefixed like 983Balls_dagball1701807366.23.json.
	//Used with Ap.upgradeTimeToNextLanguage and Ap.nextLanguage.
	//If it has no time, return NaN.
	filenameToTime: function(filename){
		//2023-12-14  works in chrome brave1.61InWin10 and edge but not firefoxV72.0.2InWin10 let matches = filename.match(/(?<=\D|^)\d{10}(?:\.\d+)?(?=\D|$)/g);
		//When open https://jsvalidator.com/ in brave and paste Ap.js or just that line, it says valid, but in firefox it says "Invalid regular expression".
		//2023-12-14 GPT4 says "The regular expression you provided uses a lookbehind assertion ((?<=\D|^)),
		//which is a feature that was not supported in all JavaScript engines until recently.".
		//But since im not using this, and instead changed the old files to their "text" field starts with "apeV1:" vs for newer its "ape:",
		//just commentingout filenameToTime and filenameUseNextLanguage 2023-12-14-830aET.
		let matches = filename.match(/(?<=\D|^)\d{10}(?:\.\d+)?(?=\D|$)/g);
		return matches ? matches[matches.length - 1] : NaN;
	},
	filenameUseNextLanguage: function(filename){
		let t = Ap.filenameToTime(filename);
		return Ap.upgradeTimeToNextLanguage <= t || isNaN(t);
	},
	*/
	
	//"next language" is "ape V2" ("ape:"). prev language is "apeV1:".
	apeToStringAsNextLanguage: true,

	/*Only for GLSL, not js. In JS it gives this error so im about to put a condition to make sure its glsl instead of js:
	dagball.html:3279 Uncaught SyntaxError: Private field '#pragma' must be declared in an enclosing class
    at TinyGLSL.js:388:39
    at Object.cache (TinyGLSL.js:406:49)
    at Object.cachedJsEval (TinyGLSL.js:388:19)
    at Ap.Call.eval (Ap.js:941:33)
    at dagball.Game.diffeqMap (dagball.html:11525:25)
    at dagball.Game.doPhysics (dagball.html:11708:40)
    at dagball.Game.nextState (dagball.html:13521:9)
    at mainLoop (dagball.html:3273:20)
	*/
	optionalLineBeforeEachLoopInGLSL: '', //normal as of 2024-5-12, dont put anything on line before each loop
	//optionalLineBeforeEachLoopInGLSL: '#pragma loop', //Experimental 2024-5-13+. compiler hint to compile faster but run slower
	//optionalLineBeforeEachLoopInGLSL: '#pragma unroll', //Experimental 2024-5-13+. compiler hint to compile slower but run faster
	/*if(Ap.optionalLineBeforeEachLoopInGLSL){
		//code += Ap.nline(tablev)+'#pragma loop'; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
		code += Ap.nline(tablev)+Ap.optionalLineBeforeEachLoopInGLSL; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
	}*/

	transformTokensInStringByFunc: function(s, stringToString){
		let tokens = Ap.tokenize(s,true); //true keep whitespace, so the concat of these tokens equals s.
		let ret = '';
		for(let t of tokens){
			ret += stringToString(t);
		}
		return ret;
	},

	//does string substitutions
	stringToNextLanguage: function(s){
		return Ap.transformTokensInStringByFunc(s, x=>(Ap.nextLanguage[x] || x));
	},

	stringFromNextLanguage: function(s){
		return Ap.transformTokensInStringByFunc(s, x=>(Ap.nextLanguageReverse[x] || x));
	},

	//TODO also evanCpuMainPrefix with just (par,loc,big) and evanCpuMainSuffix the same.
	jsDiffeqPrefix: '((par,loc,big,vel,dvel,dpos,dfriction)=>{//reads these. can write loc, dvel, and dpos. par, big, and vel should be used as readonly.\n',
	jsDiffeqSuffix: '\n})',

	//Whatever the apeTypes are (such as 'f+=' or '+=' or 'doList' or 'float' etc), and swap () vs {},
	//they're harder to change in the various parsing and tostring codes than just to string substitute them here.
	//Im changing '*' to 'loop' and '+' to 'do' and 'f+' to '+' etc.
	//Eventually this should be replaced in the parsing and tostring codes and this map becomes empty,
	//but for now I can start using the new language, and have to deal with 2 languages at once when bugs come up.
	//Any apeTypes not in the list are same. int ops such as i- and i* are same. Defaults to float if dont prefix i.
	nextLanguage: {
		'(': '{',
		')': '}',
		'{' : '(',
		'}': ')',
		//'*': 'loop',
		'*': 'oo',
		'+': 'do',
		'f*': '*',
		'f+': '+',
		'f=': '=',
		'f/': '/',
		'f-': '-',
		fmod: 'mod',
		fabs: 'abs',
		flog: 'log',
		fsin: 'sin',
		fsin: 'sin',
		fcos: 'cos',
		ftan: 'tan',
		ftanh: 'tanh',
		fatan: 'atan',
		'f*=': '*=',
		'f+=': '+=',
		'f**': '**',
		'fsqrt': 'sqrt',
		fsigmoid: 'sigmoid',
		fisNaN: 'isNaN',
		fhypot: 'hypot',
		fless: 'less',
		fmore: 'more',
		fmax: 'max',
		fmin: 'min',
		fxtanh: 'xtanh',
		fmin: 'min',
		freturn: 'return',
		fmin: 'min',
		fexp: 'exp',
	},

	booted: false, //set to true end of this file

	//FIXME? Doing a certain apeTest "copy par to loc with +epsilon in 5 GPU threads and array size 4 so at most 1 float gets +epsilon in each thread. See dagball codeMaker"
	//on browser console after page loads doesnt have the "TinyGLSL.js:534 WARNING: Too many active WebGL contexts. Oldest context will be lost." warning (even though I consider it an error),
	//but doing it at boot, when its in the head, does. When I ran Ap.apeTests() in the browser console from dagball console, it had that warning 7 times,
	//compared to the only 3 times it did it if before dagball loaded (in TestApeB.html) 2023-11-19.
	whenBoot_doApeTests: false, //FIXME
	//whenBoot_doApeTests: true, //normal
	//2023-11-19 creating this button in dagball instead: <input type=button value="Do Ap.js tests (check console warnings for: Oldest context will be lost)" onclick="Ap.doApeTests(); TinyGlsl.clearAllCache();">

	singleThreadedSharedTempVars: {parSize: 0, locSize: 0, bigSize: 0},

	logApeSizes: false,

	//used with apeType=='gpucpu' since that gets compiled to lang='js' instead of the usual lang='glsl', in Ap.Call.prototype.eval.
	apCallLogJsCodeBeforeEval: false,

	fillLocWithAll0sRightAfterCreate: true, //TODO optimize by not doing this, since it gets set to contents of par + 0 or epsilon right after that?

	numExtraFloatsFIXME: 0, //normal
	//numExtraFloatsFIXME: 200, //for fixing bugs

	//https://raw.githubusercontent.com/benrayfield/jsutils/master/src/sha256.js
	sha256: function(bytesIn){
		//var t = typeof bytesIn;
		//if(t != 'Uint8Array') throw 'Expected Uint8Array but got a '+t; //this check wont work because its like a map of index to byte
		
		var chunks = Math.floor((bytesIn.byteLength+9+63)/64); //512 bit each
		
		//Copy bytesIn[] into b[], then pad bit1, then pad bit0s,
		//then append int64 bit length, finishing the last block of 512 bits.
		//byte b[] = new byte[chunks*64];
		var b = new Uint8Array(chunks*64);
		
		//System.arraycopy(bytesIn, 0, b, 0, bytesIn.byteLength);
		b.set(bytesIn, 0);
		
		b[bytesIn.byteLength] = 0x80;
		
		//long bitLenTemp = bytesIn.byteLength*8;
		var bitLenTemp = bytesIn.byteLength*8; //in js, this has float64 precision, which is more than enough for Uint8Array size
		for(var i=7; i>=0; i--){
			b[b.byteLength-8+i] = bitLenTemp&0xff;
			bitLenTemp >>>= 8;
		}
		
		//log('b as hex = '+bitfuncs.uint8ArrayToHex(b));
		
		
		var a = new Uint32Array(136);
		//"first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311"
		a[0]=0x428a2f98;
		a[1]=0x71374491;
		a[2]=0xb5c0fbcf;
		a[3]=0xe9b5dba5;
		a[4]=0x3956c25b;
		a[5]=0x59f111f1;
		a[6]=0x923f82a4;
		a[7]=0xab1c5ed5;
		a[8]=0xd807aa98;
		a[9]=0x12835b01;
		a[10]=0x243185be;
		a[11]=0x550c7dc3;
		a[12]=0x72be5d74;
		a[13]=0x80deb1fe;
		a[14]=0x9bdc06a7;
		a[15]=0xc19bf174;
		a[16]=0xe49b69c1;
		a[17]=0xefbe4786;
		a[18]=0x0fc19dc6;
		a[19]=0x240ca1cc;
		a[20]=0x2de92c6f;
		a[21]=0x4a7484aa;
		a[22]=0x5cb0a9dc;
		a[23]=0x76f988da;
		a[24]=0x983e5152;
		a[25]=0xa831c66d;
		a[26]=0xb00327c8;
		a[27]=0xbf597fc7;
		a[28]=0xc6e00bf3;
		a[29]=0xd5a79147;
		a[30]=0x06ca6351;
		a[31]=0x14292967;
		a[32]=0x27b70a85;
		a[33]=0x2e1b2138;
		a[34]=0x4d2c6dfc;
		a[35]=0x53380d13;
		a[36]=0x650a7354;
		a[37]=0x766a0abb;
		a[38]=0x81c2c92e;
		a[39]=0x92722c85;
		a[40]=0xa2bfe8a1;
		a[41]=0xa81a664b;
		a[42]=0xc24b8b70;
		a[43]=0xc76c51a3;
		a[44]=0xd192e819;
		a[45]=0xd6990624;
		a[46]=0xf40e3585;
		a[47]=0x106aa070;
		a[48]=0x19a4c116;
		a[49]=0x1e376c08;
		a[50]=0x2748774c;
		a[51]=0x34b0bcb5;
		a[52]=0x391c0cb3;
		a[53]=0x4ed8aa4a;
		a[54]=0x5b9cca4f;
		a[55]=0x682e6ff3;
		a[56]=0x748f82ee;
		a[57]=0x78a5636f;
		a[58]=0x84c87814;
		a[59]=0x8cc70208;
		a[60]=0x90befffa;
		a[61]=0xa4506ceb;
		a[62]=0xbef9a3f7;
		a[63]=0xc67178f2;
		//h0-h7 "first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19"
		a[64]=0x6a09e667;
		a[65]=0xbb67ae85;
		a[66]=0x3c6ef372;
		a[67]=0xa54ff53a;
		a[68]=0x510e527f;
		a[69]=0x9b05688c;
		a[70]=0x1f83d9ab;
		a[71]=0x5be0cd19;
		//a[72..135] are the size 64 w array of ints
		for(var chunk=0; chunk<chunks; chunk++){
			var bOffset = chunk<<6;
			//copy chunk into first 16 words w[0..15] of the message schedule array
			for(var i=0; i<16; i++){
				//Get 4 bytes from b[]
				var o = bOffset+(i<<2);
				a[72+i] = ((b[o]&0xff)<<24) | ((b[o+1]&0xff)<<16) | ((b[o+2]&0xff)<<8) | (b[o+3]&0xff);
			}
			//Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array:
			for(var i=16; i<64; i++){
				//s0 := (w[i-15] rightrotate 7) xor (w[i-15] rightrotate 18) xor (w[i-15] rightshift 3)
				//s1 := (w[i-2] rightrotate 17) xor (w[i-2] rightrotate 19) xor (w[i-2] rightshift 10)
				//w[i] := w[i-16] + s0 + w[i-7] + s1
				var wim15 = a[72+i-15];
				var s0 = ((wim15>>>7)|(wim15<<25)) ^ ((wim15>>>18)|(wim15<<14)) ^ (wim15>>>3);
				var wim2 = a[72+i-2];
				var s1 = ((wim2>>>17)|(wim2<<15)) ^ ((wim2>>>19)|(wim2<<13)) ^ (wim2>>>10);
				a[72+i] = a[72+i-16] + s0 + a[72+i-7] + s1;
			}
			var A = a[64];
			var B = a[65];
			var C = a[66];
			var D = a[67];
			var E = a[68];
			var F = a[69];
			var G = a[70];
			var H = a[71];
			for(var i=0; i<64; i++){
				/* S1 := (e rightrotate 6) xor (e rightrotate 11) xor (e rightrotate 25)
				ch := (e and f) xor ((not e) and g)
				temp1 := h + S1 + ch + k[i] + w[i]
				S0 := (a rightrotate 2) xor (a rightrotate 13) xor (a rightrotate 22)
				maj := (a and b) xor (a and c) xor (b and c)
				temp2 := S0 + maj
				h := g
				g := f
				f := e
				e := d + temp1
				d := c
				c := b
				b := a
				a := temp1 + temp2
				*/
				var s1 = ((E>>>6)|(E<<26)) ^ ((E>>>11)|(E<<21)) ^ ((E>>>25)|(E<<7));
				var ch = (E&F) ^ ((~E)&G);
				var temp1 = H + s1 + ch + a[i] + a[72+i];
				var s0 = ((A>>>2)|(A<<30)) ^ ((A>>>13)|(A<<19)) ^ ((A>>>22)|(A<<10));
				var maj = (A&B) ^ (A&C) ^ (B&C);
				var temp2 = s0 + maj;
				H = G;
				G = F;
				F = E;
				E = D + temp1;
				D = C;
				C = B;
				B = A;
				A = temp1 + temp2;
			}
			a[64] += A;
			a[65] += B;
			a[66] += C;
			a[67] += D;
			a[68] += E;
			a[69] += F;
			a[70] += G;
			a[71] += H;
		}
		//RETURN h0..h7 = a[64..71]
		//byte ret[] = new byte[32];
		var ret = new Uint8Array(32);
		for(var i=0; i<8; i++){
			var ah = a[64+i];
			ret[i*4] = (ah>>>24)&0xff;
			ret[i*4+1] = (ah>>>16)&0xff;
			ret[i*4+2] = (ah>>>8)&0xff;
			ret[i*4+3] = ah&0xff;
		}
		return ret;
	},

	//Returns a list same size or smaller with the first of each thing so same order.
	dedupList: function(list){
		let ret = [];
		let set = new Set();
		for(let e of list){
			if(!set.has(e)){
				set.add(e);
				ret.push(e);
			}
		}
		return ret;
	},

	//Returns a list same size or smaller with the first of each thing so same order. If it has a .name then its also deduped by that even if !=
	//FIXME if apeA has null name and apeB has name, but they're otherwise equal forest shape?
	dedupListOrByNames: function(list){
		let ret = [];
		let set = new Set();
		for(let e of list){
			if(!set.has(e) && (!e.name || !set.has(e.name))){
				set.add(e);
				if(e.name) set.add(e.name);
				ret.push(e);
			}
		}
		return ret;
	},


	utf8TextEncoder: new TextEncoder('utf-8'),
	utf8TextDecoder: new TextDecoder('utf-8'),
	stringToBytes: function(s){ return Ap.utf8TextEncoder.encode(s); },
	bytesToString: function(bytes){ return vm.utf8TextDecoder.decode(bytes); },
	hexDigits: '0123456789abcdef',
	mapOfHexDigitToInt: {}, //vals are 0 to 15. filled in boot.
	mapOfDoubleHexDigitsToInt: {}, //vals are 0 to 255. filled in boot.
	//TODO move bytesToHex func to DV/Dagverse.js (started that 2024-2-19) and remove duplicate funcs in other js/html files
	bytesToHex: function(bytes){ return Ap.bytesAndRangeToHex(bytes,0,bytes.length); },
	bytesAndRangeToHex: function(bytes,from,toExcl){
		let s = '';
		for(let i=from; i<toExcl; i++) s += Ap.doubleHexDigits[bytes[i]];
		return s;
	},
	sha256HexOfString: function(s){ return Ap.bytesToHex(Ap.sha256(Ap.stringToBytes(s))); },
	//returns 8 hex digits including any leading zeros.
	intToHex: function(i){ return dagball.doubleHexDigits[(i>>24)&0xff]+dagball.doubleHexDigits[(i>>16)&0xff]+dagball.doubleHexDigits[(i>>8)&0xff]+dagball.doubleHexDigits[i&0xff]; },
	sizeOfHashId: 65, //see Ape.prototype.Name, for example, a dagball.syncTypeToChar char concat 64 hex digits of hash (as of 2023-10-6 its sha256)

	parse: function(apeCode){
		throw 'TODO';
	},

	boot: function(){
		console.log('Ape found TinyGlsl = '+TinyGlsl);
		//FIXME is this boot func needed? What calls it? Was I going to put something here?
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
		for(let c of childs) if(!(c instanceof Ap.Ape)){
			Err('Child of Ape is not an Ape: '+c);
		}
		this.name = name;
		//Examples: 'const', '+', '*', '2pow', 'triNoDiag', 'triWithDiag', 'union', 'unionMax', etc.
		//'+' as controlflow is a sequence of things in loopBody. '+' in memory is concat of those child apes in memory.
		//'*' in controlflow is loop in loop (in loop... as many loops as childs).
		this.apeType = apeType;
		if(typeof(apeType) != 'string'){
			Err('typeof(apeType) must be string but is '+typeof(this.apeType)+' and it is '+apeType);
		}
		this.childs = childs || [];
		this.data = data; //{floatVal: 2.34} if its a float literal, for example. (floatVarName float) is the mem form  of it, not a specific float val.
		let constSizeIfLeaf = 1; //FIXME?
		//{par} contains all {parMem} and {parlocMem} and {locparMem}.
		//{loc} contains all {locMem} and {parlocMem} and {locparMem}.
		//{big} contains all {bigMem}.
		//These are apCall.par .loc and .big. Each wraps a shared Float32Array.
		//The containsParLocOrBig is used to prevent the sizes of {parMem} {parlocMem} {locparMem} {locMem} {bigMem}
		//from depending on {par} {loc} {big} since that would be circular logic.
		//It might be allowed in some combos in later versions of this software, but for now I just want it to work
		//when untrusted code comes in.
		//containsParLocOrBig is also used to know that updateApeSize needs to be called a second time after finding the size of {par} {loc} and {big}
		//which should be allowed to change the number of compute cycles but not (unless can prove its not circular logic, TODO) memory size.

		//this.containsParLocOrBig = childs.map(c=>c.containsParLocOrBig).reduce((bitA,bitB)=>(bitA||bitB), (apeType=='par' || apeType=='loc' || apeType=='big'));
		this.containsParLocOrBig = childs.map(c=>c.containsParLocOrBig).reduce((bitA,bitB)=>(bitA||bitB),
			(apeType=='par' || apeType=='loc' || apeType=='big' || apeType=='vel' || apeType=='dvel' || apeType=='dpos'));
		//FIXME this.containsParLocOrBig should also be true if contains gob (the whole shared gobMem array in Ap.Call,
		//similar to par is the whole shared array that contains all the parMems?)
		//gobap

		//If it contains an apeType of gpucpu then it can only be run in lang='js', not lang='glsl',
		//but the first param of gpucpu alone can probably still be run in GPU/GLSL. Normally GPU runs that part,
		//and CPU runs (see diffeqMap in dagball*.html) the whole thing but far less times per second than GPU does times per second.
		this.containsGpucpu = childs.map(c=>c.containsGpucpu).reduce((bitA,bitB)=>(bitA||bitB), apeType=='gpucpu');

		//this.contains
		this.apeSize = constSizeIfLeaf || 0; //FIXME?
		this.updateApeSize();
		if(name && name.length == Ap.sizeOfHashId){ //could be a hash name, like created in Ap.prototype.Name(). Verify that name either is that or null (FIXME can it be undefined? probably shouldnt be. What about ''?)
			if(this.Name() != name){
				throw 'Cant have name the same size as hash id (Ap.sizeOfHashId) unless name is its hash id, name='+name+' hash id (generated from content) = '+this.Name();
			}
		}
		if(this.containsParLocOrBig && (apeType=='parMem' || apeType=='parlocMem' || apeType=='locparMem' || apeType=='locMem' || apeType=='bigMem')){
			throw 'apeType='+apeType+' and containsParLocOrBig='+this.containsParLocOrBig+' which may be circular logic (TODO allow it in cases it can be proven not to be circular logic)';
		}
	},

	//a writable and readable Float32Array that has a list of parlocMem locparMem and parMem apes etc.
	//My .childs is only those, in the same order they occur in the compiled glsl code.
	//whatever goes in par array. Max size about 1000. In that case its apeType is 'par'.
	//
	//FIXME added this.gobs 2024-3-5 but the integration of Gob.js with Ap.js is incomplete.
	//gobap
	//
	Mem: function(apeType, childs){
		//console.log('Mem constructor start');
		this.apeType = apeType;
		this.childs = childs || [];
		this.childToPtr = new Map(); //key is an Ap.Ape. val is int (as double).
		this.nameToPtr = new Map(); //key is an ape.Name() string. val is int (as double). same ints as in childToPtr.
		this.nameToSize = new Map(); //key is an ape.Name() string. val is ape.size(), in case you only give the string name and want the size, avoids looking up in this.childs.
		//key is an ape.Name() string. val is string such as 'parMem' 'parlocMem' 'locparMem' 'locMem' or 'bigMem'.
		//this.apeType will always be 'par' or 'loc' or 'big' which are shared arrays the smaller arrays are inside.
		this.nameToApeType = new Map();
		this.memSize = 0;
		for(let child of this.childs){
			this.childToPtr.set(child, this.memSize);
			let nam = child.Name();
			this.nameToPtr.set(nam, this.memSize); //.Name() creates a name if it doesnt have one yet. This should only happen for arrays, not just any ape such as {f- 15 3.45} is not an array.
			let siz = child.size();
			this.nameToSize.set(nam, siz)
			this.memSize += siz;
			this.nameToApeType.set(nam, child.apeType);
			//if(apeType=='par'){ //TODO remove this. its for tracking down a bug 2024-5-15 where memSize is bigger than sum of childs.
				//console.log('Added '+nam+' siz='+siz+' memSize_so_far='+this.memSize);
			//}
		}
		if(this.memSize === undefined){
			Err('Some size is not an integer cuz total size is undefined');
		}
		if(this.childs.length != this.nameToSize.size){
			Err('this.childs.length ('+this.childs.length+') != this.nameToSize.size() ('+this.nameToSize.size+')');
		}
		this.floats = new Float32Array(this.memSize);
		//gobap
		this.gobs = []; //FIXME compute the gobs size similar to this.memSize
		//console.log('Mem constructor end');
	},

	//emptyGobMem: null, //FIXME gobap
	emptyGobMem: 'TODO_emptyGobMem', //FIXME gobap

	//Use this cuz call.compileToLang and Ap.lang and [call.preferCpu or is it ape.preferCpu] are spaghettic code. FIXME.
	whatLang: code=>{
		if(code.includes('int ')){
			return 'glsl';
		}else if(code.includes('let ')){
			return 'js';
		}else if(code.includes('ape:')){
			return 'ape'; //TODO rename to ap cuz theres already an ape programming language (renamed mine to Ap.Ape Ap.js etc).
		}else if(code.includes('txt:')){ //plain text
			return 'txt';
		}else if(code.startsWith('//DONT_USE_THIS_')){
			return 'err'; //not a language but to say its an error. since .beforeCode and .code are being redesigned to go with the 5-6 kinds of eval, im allowing this for now 2024-7-21.
		}else Err('Unknown lang: '+code);
	},

	//ape is what contains all the childs in par loc and big and that the beforeCode and code are a transpile of (from ape to tinyglsl language which is a subset of glsl).
	//par, loc, and big are Ap.Mem objects. You dont read or write the floats in loc since it only exists in GPU but its there for the indexs.
	Call: function(ape, par, loc, big, vel, beforeCode, code, numGpuThreads, floatsPerGpuThread, gobMem){ //gobap
		if(par.memSize > 1024){
			Err('par.memSize='+par.memSize);
		}
		this.ape = ape;
		this.cpuApe = null; //this.ape with locparMem's replaced by parlocMem's, so it doesnt change the indexs of arrays. Created if you use the eva*Cpu* kinds of eval.
		this.compiled = {}; //TODO fill this with compiled optimizations of the 5 kinds of eval: evalGpuMain evanCpuMain evanCpuMainParloc evalCpuDiffeq evalCpuDiffeqParloc.
		this.par = par; //position. vel is velocity.
		this.loc = loc;
		this.big = big;
		this.vel = vel; //vel is only used when lang is 'js', instead of 'glsl' as usual. Used in second param of apeType='gpucpu' the cpu/js part.
		//UPDATE 2024-3-5 this cant be a js list. This has to be an Ap.Mem object, same as par loc and big, except it uses Mem.gobs instead of Mem.floats.
		//list of GB.Gob objects aka gobs aka game objects, which are each basically a sparse dimensional vector that some of wrap more complex objects.
		//See this.gob[any].w.selFn, .w.rulFn, .w.rulCh, etc, though those are being redesigned to merge its lisplike game scripting language into Ap.js/ape language here.
		//These should be used in a third param of gpucpu which means its not tied to a specific GPU thread nor does it require GPU at all if the gpu part is an empty (do) etc.
		//Use this Ap.Call.gob with the apeTypes/opcodes: gpucpu (of 3 params, gob stuff in third), gobMem, gobPtr, gradLoop, where gradLoop can do things
		//like 3^numBayesVars and rule110ConvField scalar fields by pointer arithmetic. gradLoop is the main way to do potentialEnergy/gradient (gob.grad) in gob,
		//but differentialEquations and min/max/impulse  (gob.dp dv kv ap zp av zv) are easier to scale so can do double loops etc,
		//but dagball.Circ, dagball.Ed, and dagball.Ball still compute potentialEnergy/gradient in the this.par and this.loc arrays without using gobs,
		//and how these may interact with eachother is for future research, likely to involve more opcodes and data structure designs inside gob[any].w.varname.
		//gobap
		this.gob = gobMem || emptyGobMem; //todo remove gobs from call. wait for wikibinator3** or axgob etc.
		//TODO move this into this.compiled[one of 5 names, as some of them have beforeCode and code]
		this.beforeCode = beforeCode;
		//TODO move this into this.compiled[one of 5 names, as some of them have beforeCode and code]
		this.code = code;
		this.numGpuThreads = numGpuThreads;
		this.floatsPerGpuThread = floatsPerGpuThread;
		/* This code is from Ape.prototype.updateApeSize and is used on second pass of calling updateApeSize, after this Call sets the 3 shared vars.
		this.apeSize = Ap.singleThreadedSharedTempVars.parSize; //this.computeSizeOfSharedParArray();
		}break;case 'loc':{ //apCall.loc shared array. //{loc} contains all {locMem} and {parlocMem} and {locparMem}.
			this.apeSize =  Ap.singleThreadedSharedTempVars.locSize; //this.computeSizeOfSharedLocArray();
		}break;case 'big':{ //apCall.big shared array. //{big} contains all {bigMem}.
			this.apeSize =  Ap.singleThreadedSharedTempVars.bigSize; //this.computeSizeOfSharedBigArray();
		*/
		if(this.par.memSize === undefined){ //if any size is 0, its likely (par) or (loc) or (big) which are backed/overlappingInMem views of all parMem parlocMem locparMem locMem and bigMem arrays.
			Err('No this.par.memSize');
		}
		if(this.loc.memSize === undefined){
			Err('No this.loc.memSize');
		}
		if(this.big.memSize === undefined){
			Err('No this.big.memSize');
		}
		Ap.singleThreadedSharedTempVars.parSize = this.par.memSize;
		Ap.singleThreadedSharedTempVars.locSize = this.loc.memSize;
		Ap.singleThreadedSharedTempVars.bigSize = this.big.memSize;
		//TODO remove this, replaced by this.compiled and the 5 kinds of eval.
		this.compileToLang = Ap.whatLang(this.beforeCode+'\n//fixmeConcattedBeforecodeAndCodeDespiteItMightNeedOtherCodeInsertedAroundThem\n'+this.code);
		//this.compileToLang = Ap.lang; //language of this.code and this.beforeCode. this.ape is of course in the Ap.js language.
		//console.log('Ap.Call created, Ap.singleThreadedSharedTempVars='+JSON.stringify(Ap.singleThreadedSharedTempVars)+' TODO second pass of updateApeSize if ape.containsParLocOrBig.');
	},

	empty_prefixEveryApeToStringRecursivelyWithThis: ape=>'',

	//for finding bugs
	prefixEveryApeToStringRecursivelyWithThis: null, //normal. Later code sets this to empty_prefixEveryApeToStringRecursivelyWithThis
	//prefixEveryApeToStringRecursivelyWithThis: ape=>('siz'+ape.size()+'_'),

	limitStringLen: function(str,maxLen){
		maxLen -= '…'.length;
		if(str.length > maxLen) return str.substring(0,maxLen)+'…';
		return str;
	},

	nline: function(tabs){ //newline then tabs
		return '\n'+Ap.fline(tabs);
	},

	fline: function(tabs){ //first line then tabs
		let s = '';
		for(let i=0; i<tabs; i++) s += '\t';
		if(Ap.debugDisplayIndentLevel) s += tabs; //TODO remove this
		return s; //TODO optimize by a long line just take substring of? 
	},

	debugDisplayIndentLevel: false,
	//debugDisplayIndentLevel: true,

};

if(Ap.prefixEveryApeToStringRecursivelyWithThis === null){
	Ap.prefixEveryApeToStringRecursivelyWithThis = Ap.empty_prefixEveryApeToStringRecursivelyWithThis;
}

if(Ap.prefixEveryApeToStringRecursivelyWithThis !== Ap.empty_prefixEveryApeToStringRecursivelyWithThis){
	console.log('WARNING: Cuz of Ap.prefixEveryApeToStringRecursivelyWithThis, Ap.Ape code will include debug strings and not be valid ape code, so dont try to Ap.lazyEval(string) it. This is for finding bugs temporarily and is an option you can change.');
}

Ap.nextLanguageReverse = {};
for(let k in Ap.nextLanguage) Ap.nextLanguageReverse[Ap.nextLanguage[k]] = k;

//UPDATE: optionalCx is a {} like Ap.singleThreadedSharedTempVars.
//recursive. just call this once from top Ape just created after making an Ap.Call that sets Ap.singleThreadedSharedTempVars contents. Returns this ape.
Ap.Ape.prototype.secondPassOfUpdateApeSize = function(optionalCx){
	if(this.containsParLocOrBig){
		this.childs.forEach(child=>child.secondPassOfUpdateApeSize(optionalCx));
		this.updateApeSize(optionalCx);
	}
	return this;
};

//in same order they occur in memory and same order as childs
Ap.Mem.prototype.arrayNames = function(){
	return this.childs.map(c=>c.Name());
};

Ap.Mem.prototype.summarizeMems = function(){
	return this.arrayNames().map(n=>this.summarizeMem(n)).join(' ');
};

Ap.Mem.prototype.summarizeMem = function(apeName){
	return apeName+'='+this.nameToApeType.get(apeName)+'['+this.nameToPtr.get(apeName)+'..'+(this.nameToPtr.get(apeName)+this.nameToSize.get(apeName)-1)+']';
};

//given any array index, returns the name of the array it intersects. a Mem is a concat of multiple arrays.
Ap.Mem.prototype.ptrToName = function(i){
	if(i<0 || i>=this.memSize) Err('i='+i+' memSize='+this.memSize);
	//TODO optimize by binary-search instead of linear search
	let sum = 0;
	for(let child of this.childs){
		sum += child.apeSize;
		if(i<sum) return child.name;
	}
	if(sum != this.memSize) Err('i='+i+', sum='+sum+' != memSize='+this.memSize);
	Err('i='+i+' and didnt find child');
};


//shallow-copy childs. copy this.floats. But if the childs have changed (ur supposed to use them as immutable so they dont) have changed,
//the deriving of Map contents again may differ (an error).
Ap.Mem.prototype.copy = function(){
	let mem = new Ap.Mem(this.apeType, this.childs.slice());
	mem.floats = new Float32Array(this.floats); //copy
	return mem;
};

//If true, can use this.nameToPtr(arrayName) and this.nameToSize(arrayName) and this.nameToApeType(arrayName).
//Its apeType can differ from this.apeType cuz parMem parlocMem and locparMem are all kinds of 'par'. 'par' is
//the apeType of the 1 memory of all of those smaller par arrays together. Similar for big vs bigMem.
Ap.Mem.prototype.hasArrayName = function(arrayName){
	return this.nameToPtr.has(arrayName);
};

Ap.Call.prototype.hasArrayName = function(arrayName){
	return this.par.hasArrayName(arrayName) || this.loc.hasArrayName(arrayName) || this.big.hasArrayName(arrayName);
};

//lazy creates this.cpuApe by a simple forkEdit of this.ape to use parlocMem instead of locparMem, a common calculation to use in cpu diffeq and cpu evan/evalToNumber
//cuz the overlapping range (at the start of both) of par and loc float arrays are used in GPU to compute gradient by adding epsilon to at most 1 array index,
//so copies all par arrays to loc and at most 1 index in at most 1 of such arrays is modified by adding epsilon (modified in loc, not in par).
//It then does d+1 GPU threads to compute a d dimensional gradient. To skip that, use cpuApe which defaults to par instead of loc, where its parlocMem vs locparMem.
Ap.Call.prototype.getCpuApe = function(){
	if(!this.cpuApe){
		this.cpuApe = this.ape.toParloc();
	}
	return this.cpuApe;
};

console.log('Filling in some data structures.');
//256 pairs of hex digits
Ap.doubleHexDigits = []; //TODO move bytesToHex func to DV/Dagverse.js (started that 2024-2-19) and remove duplicate funcs in other js/html files
for(let i=0; i<16; i++){
	Ap.mapOfHexDigitToInt[Ap.hexDigits[i]] = i;
	for(let j=0; j<16; j++){
		let hh = Ap.hexDigits[i]+Ap.hexDigits[j];
		Ap.doubleHexDigits.push(hh);
		Ap.mapOfDoubleHexDigitsToInt[hh] = ((i<<4)|j);
	}
}

Ap.Ape.prototype.type = 'ap_ape';

Ap.Mem.prototype.type = 'ap_mem';

Ap.Call.prototype.type = 'ap_call';

Ap.Call.prototype.toString = function(){
	return '[Ap.Call ape='+this.ape+']';
};

//You might want to copy an Ap.Call to prepare multiple inputs (Float32Arrays of parMem and bigMem) in the same loop before calling any of them.
//Or you can do them sequentially and overwrite the floats between GPU calls without copy. Dont forget that big might be undefined (or null or either?).
Ap.Call.prototype.copy = function(){
	Err('TODO copy the Ap.Mem objects too return new Ap.Call(this.ape, mem: Ap.copyFloatsOrNull(par), ... loc, mem: big, beforeCode, code, numGpuThreads, floatsPerGpuThread){ Also dont forget added vel param.');
};

/*If this.apeType=='gpucpu' it computes the whole thing in CPU, else in GPU.
call GPU in local browser, in a tiny fraction of a second which returns a Float32Array(this.numGpuThreads*this.floatsPerGpuThread).
Can eval again after changing this.par.floats contents andOr (TODO) this.big.floats contents. Dont change the code. Make a new ape and ape.toMem() for that.
Expect around 1 teraflop in a "good gaming computer" such as 5 gigaflops in 5 milliseconds in 1 call, but about .1 seconds on first compile of a code string.
Even if you generate the same code string again, its cached by code string in TinyGlsl so wont compile again unless thats uncached (which it does every minute or so).

If this.apeType=='gpucpu' it computes the whole thing in CPU, else in GPU. Untested (as of 2023-12-11) example:
ape:(gpucpu (do
	{abc locparMem (2)}
	(locparMem (3))
	(locparMem (2))
	<{angle float} (atan y$ x$)>
	<{radius float} (hypot y$ x$)>
	<{curveRadius float} (* radius (+ 1 (* .2 (sin (* 6 (+ [abc 0%55] angle))))))>
	<{gravity float} (* y$ -1.1)>
	<potenCirc$ (+ gravity (* 3.5 (sigmoid (- (* 12 curveRadius) 16))))>
	(+= potenCirc$ (* -.2 [abc 1%55]))
)(do
	(+= (dposPtr abc 1%55) (* .05 [abc 0%55]))
	(+= (dvelPtr abc 1%55) (* -.2 [abc 0%55]))
	[velPtr abc 1%55]
))
*/
Ap.Call.prototype.eval = function(){
	Err('Use evalGpuMain evanCpuMain evanCpuMainParloc evalCpuDiffeq or evalCpuDiffeqParloc instead of apCall.evan or apCall.eval');
	/*if(this.V){
		let vPtr = this.par.ptr('V');
		for(let i=0; i<this.V.length; i++){
			newPar[vPtr+i] = this.V[i]; //in case it was overwritten by world state as usual in gradient calculation
		}
	}*/
	if(this.V){
		this.putFloats('V',this.V);
	}
	if(this.ape.containsGpucpu || this.compileToLang=='js'){
		//compile to javascript and run in CPU. This is for vel dvel and dpos differentialEquation adjustments for gameplay.
		//This is just for the second param of gpucpu aka the cpu part that does diffeq (dfriction dpos dvel etc), but maybe not all the parts
		//of the first param or shrinks the loops to size 1 instead of expanding them??? So if this.preferCpu (like dagball.Circ.preferCpu) then
		//would need to (2024-6-2+) write new javascript code to make this Ap.Call.eval do the same thing GPU does but in CPU,
		//and TODO make sure not to repeat the second param of gpucpu.
		//That more general javascript way should work regardless of if its the gpucpu apeType or not.
		//Or maybe the only different thing is call.numGpuThreads getting set to 1 (and call.floatsPerGpuThread similarly?)?
		//I dont know if i'll create a call.preferCpu field or not, but I am sure I will use call.evan() to fast eval to a number
		//using javascript, so likely call.preferCpu isnt needed since it will be in dagball.Circ.cpuCall so caller knows to call call.evan().


		/*let prefix = '((par,loc,big,vel,dvel,dpos)=>{//reads these. can write loc, dvel, and dpos. par, big, and vel should be used as readonly.\n';
		prefix += 'const y_f = 0; //fIXME y_f or just y?\n';
		prefix += 'const x_f = 0; //fIXME x_f or just x?\n';
		prefix += 'const ids = '+this.numGpuThreads+'; //FIXME ids_i or just ids?\n';
		prefix += 'for(let id=0; id<ids; id++){\n';
		let suffix = '}\n';
		suffix += '\n})';
		*/
		if(this.floatsPerGpuThread != 1){
			Todo('floatsPerGpuThread='+this.floatsPerGpuThread+' but only coded it for 1 so far. In GPU it can be 1 or 4. Its ignoring the apeType="return" and'+
				'getting arrays to return from dpos and dvel. To return many floats at once is why I switched to CPU for this calculation.');
		}
		let newPar = new Float32Array(this.par.floats); //readonly. par=pos, or at least the first n indexs of par that overlap same part of loc.
		let newLoc = new Float32Array(this.loc.floats); //readwrite.
		let newBig = new Float32Array(this.big.floats); //readonly .FIXME this could be wasteful to copy. should be readonly, but since im just building it now, this is easier way to find bugs.
		let newVel = new Float32Array(this.vel.floats); //readonly. This does go in Ap.Call as of 2023-12-12-2pET, even when lang is glsl, just in case lang is or will soon be js. Ugly hack.
		//let newDvel = new Float32Array(this.dvel.length); //readwrite.
		let newDvel = new Float32Array(this.vel.floats.length); //readwrite. //this is dvel but it doesnt go in Ap.Call, just in generated js code.
		let newDpos = new Float32Array(this.vel.floats.length); //readwrite. //this is dvel but it doesnt go in Ap.Call, just in generated js code.
		let newDfriction = new Float32Array(this.vel.floats.length); //velocity *= Math.exp(-dt*friction) per dimension/floatvar.
		if(newVel.length != newDvel.length || newVel.length != newDpos.length){
			Err("Sizes dont match.");
		}
		if(!this.cachedJsFunc){
			//in theory cachedJsFunc saves a few milliseconds per video frame. TODO verify, now is 2024-2-3-843aET and i just wrote this.
			//Similar to dagball.viewDedupString but for the cpu part of (gpucpu gpuAndCpuCanEachDoThisPart onlyCpuDoesThisPart).

			//let jsCode = prefix+this.beforeCode+this.code+suffix+'\n//# sourceURL=cpuPartOfGpucpuStuff.js';
			let jsCode = this.toCode('js');
			if(jsCode.includes('const int ')){
				Err('jsCode does not look like js, includes "const int ". jsCode=\n'+jsCode);
			}
			if(jsCode.includes('vec2')){
				Err('Evan: jsCode does not look like js, includes "vec2". jsCode=\n'+jsCode);
			}
			if(Ap.apCallLogJsCodeBeforeEval){
				console.log('apCall.jsCode=\n'+jsCode);
			}
			this.cachedJsFunc = TinyGlsl.cachedJsEval(jsCode); //FIXME might need to wrap this in (params)=>{...} etc.
		}
		//modifies newLoc, newDvel, and newDpos. Throw away newLoc. Use newDvel and newDpos to add back into dagball.Eds and ball y and x positions and velocities scaled by dt.
		this.cachedJsFunc(newPar, newLoc, newBig, newVel, newDvel, newDpos, newDfriction);
		//2023-12-16+ Dagball can now control friction (actually velocity decay) separately per dimension/floatVar
		//60 times per second. Things can have more friction one direction than the opposite direction,
		//by defining friction as an equation of velocity, for example.
		return {isCpu: true, isDiffeq: true, dvel: newDvel, dpos: newDpos, dfriction: newDfriction};
	}else{ //compile to WebGL2_GLSL_ES_300 and run in GPU
		//return TinyGlsl.simple(this.beforeCode, this.code, this.par.floats, this.big.floats, this.numGpuThreads, this.floatsPerGpuThread);
		let h = Ap.chooseHeight(this.numGpuThreads);
		let w = Ap.chooseWidth(this.numGpuThreads);
		let floatsFromGpu = TinyGlsl.simple(this.beforeCode, this.code, this.par.floats, this.big.floats, h, w, this.floatsPerGpuThread);
		this.doReturnTestCaseIfAny(floatsFromGpu);
		return floatsFromGpu; //whatever apeType='return' gives, 1-4 floats per GPU thread, side by side in this array.
	}
};

//EVAl to 1 Number. Returns same as this.eval()[0] but compiling it (only the first time) to javascript and returning a number,
//not a Float32Array as usual, so its more efficient.
//This is meant for dagball.html to call once per pixel (for graphic) near a circ where circ.preferCpu is true
//and once per such pair of dimension and ball inside its circ.y circ.x circ.r (radius) (for physics),
//and dagball.html modifies this.par.floats (such as using this.put('arrayName',17,2.34)) to set arrayName[17]=2.34
//and maybe this.big.floats (bigMem isnt used yet as of 2024-6-2).
//Ap.Call.prototype.cpuEvalNum = function(){
Ap.Call.prototype.evan = function(){
	Err('Use evalGpuMain evanCpuMain evanCpuMainParloc evalCpuDiffeq or evalCpuDiffeqParloc instead of apCall.evan or apCall.eval');
	//TODO optimize by not creating any arrays, compiling to only take par, loc, and big Float32Arrays (not the other few arrays dfriction dpos dvel etc).
	try{
		if(!this.cachedEvanJsFunc){
			let jsCode = this.toCode('js');
			if(jsCode.includes('const int ')){
				Err('Evan: jsCode does not look like js, includes "const int ". jsCode=\n'+jsCode);
			}
			if(jsCode.includes('vec2')){
				Err('Evan: jsCode does not look like js, includes "vec2". jsCode=\n'+jsCode);
			}
			if(Ap.apCallLogJsCodeBeforeEval){
				console.log('Evan: apCall.jsCode=\n'+jsCode);
			}
			this.cachedEvanJsFunc = TinyGlsl.cachedJsEval(jsCode); //FIXME might need to wrap this in (params)=>{...} etc.
		}
		//It may modify this.loc.floats by setting it to all 0s then modifying it but should not modify this.par.floats. I just dont want it to 
		//returns a number, normally a potential-energy aka potenCirc$ used by dagball.html, but its more general than that. Loc is only here cuz I
		//dont want to allocate a new loc array with each call cuz it might be something very simple where that would be a bottleneck compared to how fast the simple code is.
		return this.cachedEvanJsFunc(this.par.floats, this.loc.floats, this.big.floats);
		//return this.cachedEvanJsFunc(this.par.floats, this.loc.floats);
		//return this.eval()[0];
	}catch(e){
		throw e; //put breakpoint here
	}
};

//For testing, cuz evaling the code string every time is slow. Also it has no params. Example: Ap.evan('(return (+ 2 3))') returns 5.
//Example:  Ap.evan('(do {ab parlocMem (2)} (return (+ [ab 0] [ab 1])))',{ab:[10,7]}) returns 17.
//optionalParams is map of array name to list of numbers or Float32Array.
Ap.evan = (code,optionalParams)=>{
	Err('Use evalGpuMain evanCpuMain evanCpuMainParloc evalCpuDiffeq or evalCpuDiffeqParloc instead of apCall.evan or apCall.eval');
	let call = Ap.lazyEval(code);
	if(optionalParams){
		for(let arrayName in optionalParams){
			call.putFloats(arrayName, optionalParams[arrayName]);
		}
	}
	return call.evan();
};

//The 5 kinds of eval:

//caches compile stuff in this.compiled.evalGpuMain. Compile to WebGL2_GLSL_ES_300 and run in GPU, excluding the second param of Gpucpu apeType which is the cpu diffeq parts, if any.
Ap.Call.prototype.evalGpuMain = function(){
	let cache = this.compiled.evalGpuMain || (this.compiled.evalGpuMain = {});
	if(!cache.codeMap){
		cache.codeMap = this.ape.toCodeMap('glsl'); 
	}
	let h = Ap.chooseHeight(this.numGpuThreads);
	let w = Ap.chooseWidth(this.numGpuThreads);
	if(this.V){
		this.putFloats('V',this.V);
	}
	let floatsFromGpu = TinyGlsl.simple(cache.codeMap.beforeCode, cache.codeMap.code, this.par.floats, this.big.floats, h, w, this.floatsPerGpuThread);
	this.doReturnTestCaseIfAny(floatsFromGpu);
	return floatsFromGpu; //whatever apeType='return' gives, 1-4 floats per GPU thread, side by side in this array.
};

/*
//does evanCpuMain or evanCpuMainParloc depending on param being true/false.
Ap.Call.prototype.evanCpuMain_isParlocOrNot = function(isParloc){
	let ape;
	if(isParloc){
		ape = this.cpuApe || (this.cpuApe = this.getCpuApe());
	}else{
		ape = this.ape;
	}
};*/

//caches compile stuff in this.compiled.evanCpuMain
Ap.Call.prototype.evanCpuMain = function(){
	let cache = this.compiled.evanCpuMain || (this.compiled.evanCpuMain = {});
	if(!cache.jsFunc){
		cache.codeMap = this.ape.toCodeMap('jsEvan');
		cache.jsFunc = TinyGlsl.cachedJsEval(jsCode.code);
	}
	return cache.jsFunc(this.par.floats, this.loc.floats, this.big.floats);
};

//if you have called evanCpuMain at least once, you can call this to do the same thing but a little faster cuz doesnt check if its been compiled. WARNING: if it hasnt, this will throw.
Ap.Call.prototype.evanCpuMainAgain = function(){
	return this.compiled.evanCpuMain.jsFunc(this.par.floats, this.loc.floats, this.big.floats);
};
 
//caches compile stuff in this.compiled.evanCpuMainParloc
Ap.Call.prototype.evanCpuMainParloc = function(){
	let cache = this.compiled.evanCpuMainParloc || (this.compiled.evanCpuMainParloc = {});
	if(!cache.jsFunc){
		cache.codeMap = this.getCpuApe().toCodeMap('jsEvan'); //the parloc version of this.ape
		cache.jsFunc = TinyGlsl.cachedJsEval(cache.codeMap.code); //FIXME also use cache.codeMap.beforeCode?
	}
	return cache.jsFunc(this.par.floats, this.loc.floats, this.big.floats);
};

//if you have called evanCpuMainParloc at least once, you can call this to do the same thing but a little faster cuz doesnt check if its been compiled. WARNING: if it hasnt, this will throw.
Ap.Call.prototype.evanCpuMainParlocAgain = function(){
	return this.compiled.evanCpuMainParloc.jsFunc(this.par.floats, this.loc.floats, this.big.floats);
};

//caches compile stuff in this.compiled.evalCpuDiffeq
Ap.Call.prototype.evalCpuDiffeq = function(){
	return this.evalCpuDiffeq_parlocOrNot(false);
};

//caches compile stuff in this.compiled.evalCpuDiffeqParloc
Ap.Call.prototype.evalCpuDiffeqParloc = function(){
	return this.evalCpuDiffeq_parlocOrNot(true);
};

Ap.Call.prototype.evalCpuDiffeq_parlocOrNot = function(isParloc){
	let cache = isParloc ?
		(this.compiled.evalCpuDiffeqParloc || (this.compiled.evalCpuDiffeqParloc = {})) :
		(this.compiled.evalCpuDiffeq || (this.compiled.evalCpuDiffeq = {}));
	/*if(!cache.jsFunc){
		//FIXME should this be js or jsEvan?
		cache.codeMap = this.getCpuApe().toCodeMap('js'); //the parloc version of this.ape
		cache.jsFunc = TinyGlsl.cachedJsEval(codeMap.code); //FIXME also use codeMap.beforeCode? what if it defines more funcs or arrays?
	}*/
	if(this.V){
		this.putFloats('V',this.V);
	}
	if(!cache.jsFunc){
		let ape = isParloc ? this.getCpuApe() : this.ape;
		//if(ape.apeType == 'gpucpu'){
			cache.codeMap = ape.toCodeMap('js'); //FIXME do i need another type for diffeq? or will just using the main 'js' lang work? Problem is 'js' may drop second param of gpucpu?
			//cache.jsFunc = TinyGlsl.cachedJsEval(cache.codeMap.code); //FIXME what if theres codeMap.beforeCode, not just codeMap.code? It might have a @func func? lambda of n floats and ints in, 1 float out.
			//let jsCode = cache.codeMap.beforeCode+'\n//evalCpuDiffeq_parlocOrNot, beforeCode above, code below'+cache.codeMap.code;
			let jsCode = Ap.jsDiffeqPrefix+cache.codeMap.beforeCode+'\n//evalCpuDiffeq_parlocOrNot isParloc='+isParloc+', beforeCode above, code below'+cache.codeMap.code+Ap.jsDiffeqSuffix;
			cache.jsFunc = TinyGlsl.cachedJsEval(jsCode);
			//cache.jsFunc = TinyGlsl.cachedJsEval(cache.codeMap.code);
		//}else{
		//	Err('Not a gpucpu (first param would be what gpu (and todo some of it also happens in cpu, but only once, not many threaded like in gpu) does, second param the diffeq that cpu does)');
		//}
	}
	let diffeqDims = this.vel.floats.length; //the shared_par_loc size (what overlaps at the start of both of them, size in floats) is the number of dims this diffeq is done on.
	let dvel = new Float32Array(diffeqDims);
	let dpos = new Float32Array(diffeqDims);
	let dfriction = new Float32Array(diffeqDims);
	//TODO truncateMin and trucateMax like in axgob, where if truncateMin <= truncateMax then it does the truncation else leaves it as is.
	//Those start at -Infinity and Infinity and optionally tighten. Careful that glsl doesnt compute float32 infinity or not reliably so just use a big constant.
	cache.jsFunc(this.par.floats, this.loc.floats, this.big.floats, this.vel.floats, dvel, dpos, dfriction);
	return {type: 'ap_diffeqOut', dvel, dpos, dfriction};
};



//normally called by ApGpuTester.js calling a json map generated by Ap.doReturnTestCaseIfAny,
//such as dagball creates by calling Ap.makeTestCaseOfNextGpuPotensCall which happens in the
//"Save last potens/gradient calculation as Ap.Ape test case html (TODO)" button in Dagball*.html 2023-12-3 (likely to be renamed).
/* Example test, though ive never run this one so it might not work, since im still writing Ap.runTest...
The "jsCode":"test=>{ console.log(\"TODO test=\"+JSON.stringify(test)); Todo(); }"
should instead be "jsCode":"Ap.runTest" so eval(test.jsCode)(test) returns Ap.runTest(test).
{
	"apCode":"ape:{doLast (balls locparMem (numBalls 12) (floatsPerBall 2)) (circHeaders locparMem (numCircs 1) (headerFloatsPerCirc 4)) {+ <(epsilon float) 0.0009765625> <(isDisplayElsePotensForGradient float) 0> {* (gradientCopyIndex copy {par}) <[{loc} gradientCopyIndex] {f+ [{par} gradientCopyIndex] {?: {i== gradientCopyIndex {id}} epsilon 0}}>} (addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap? (pairBallDist float) {f* 8.05 {f** {f/ {fmax 0 {f- 0.07 pairBallDist}} 0.07} 2}}) {* numBalls {+ <(heightASum float) 0> <(heightBSum float) 0> <(pixDistSum float) 0> <(pixBalSum float) 0> <(y float) [balls numBalls 0%2]> <(x float) [balls numBalls 1%2]> <(potenOne float) 0> {listLoop numCircs {+ <(circY float) [circHeaders numCircs 0%4]> <(circX float) [circHeaders numCircs 1%4]> <(circR float) [circHeaders numCircs 2%4]> <(circInfluence float) [circHeaders numCircs 3%4]> <(circWindow float) {?: {fless {fhypot {f- circY y} {f- circX x}} circR} 1 0}> <(potenCirc float) 0>} {f+= potenOne {f* potenCirc circInfluence circWindow}} {+ (c6_abc locparMem {5}) <(c6_a float) {locPtr c6_abc 4%99}> <potenCirc$ {f+ 0.2 {fsin {f* {f+ x$ c6_a} y$ 33}}}>}} {* (otherBall copy numBalls) {+ <(otherBallWeight float) {?: {i== otherBall numBalls} 0 1}> <(otherBallY float) [balls otherBall 0%2]> <(otherBallX float) [balls otherBall 1%2]> <(ballOrDisplayYX_vs_otherBall_distance float) {fhypot {f- y otherBallY} {f- x otherBallX}}> {f+= potenOne {f* otherBallWeight {@addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap ballOrDisplayYX_vs_otherBall_distance}}}}} {f+= (potenSum float) potenOne}}} {freturn potenSum}}}",
	"floatsPerGpuThread":1,
	"numGpuThreads":34,
	"apCallMems":{
		"par":[
			-0.26977476477622986,
			2.360982894897461,
			-1.1376034021377563,
			-0.13400527834892273,
			-1.0761297941207886,
			-0.006955037359148264,
			-0.2819247841835022,
			-2.6547369956970215,
			-0.6193387508392334,
			1.91316819190979,
			-0.13252027332782745,
			-0.3879757225513458,
			1.3040307760238647,
			-0.8844376802444458,
			-0.23709270358085632,
			0.22968997061252594,
			0.2883604168891907,
			-0.15937316417694092,
			1.4915629625320435,
			1.7953100204467773,
			1.2690719366073608,
			-1.8173964023590088,
			0.12656058371067047,
			3.0509135723114014,
			-0.6131877899169922,
			1.7999093532562256,
			4.8474555015563965,
			1,
			0.3287881016731262,
			0.38379812240600586,
			-0.04019497334957123,
			-0.12996986508369446,
			-0.14772595465183258
		]
	},
	"evals":[
		{
			"time":1701633754.671,
			"observedOuts":[
				-0.20036698877811432,
				-0.2547793388366699,
				-0.24536444246768951,
				-0.2335672527551651,
				-0.25259673595428467,
				-0.27307212352752686,
				-0.30557870864868164,
				-0.2544882297515869,
				-0.2533222436904907,
				-0.24838055670261383,
				-0.23716284334659576,
				-0.2461249977350235,
				-0.2790234088897705,
				-0.21061886847019196,
				-0.24697865545749664,
				-0.25520241260528564,
				-0.23942728340625763,
				-0.2581586241722107,
				-0.20406551659107208,
				-0.20839770138263702,
				-0.2995734214782715,
				-0.21526487171649933,
				-0.16275276243686676,
				-0.24540521204471588,
				-0.24909736216068268,
				-0.24909736216068268,
				-0.24909736216068268,
				-0.24934059381484985,
				-0.24909736216068268,
				-0.24909736216068268,
				-0.24909736216068268,
				-0.24909736216068268,
				-0.16338928043842316,
				-0.24909736216068268
			]
		}
	],
	"subjects":{
		"apCallGeneratedGpuTest":true
	},
	"jsCode":"test=>{ console.log(\"TODO test=\"+JSON.stringify(test)); Todo(); }"
	}
*/
Ap.runTest = function(test){
	console.log('Start test: '+JSON.stringify(test));
	if(!test.evals.length) Err('No evals to compare it to');
	if(test.evals.length > 1) Err('FIXME what to do with multiple evals? multiple outputs. compare output to which?');
	if(!test.apCode && !test.apCodeOld){
		Err('test as no apCode or apCodeOld: '+JSON.stringify(test));
	}
	let apCall = (test.apCode ? Ap.lazyEval(test.apCode) : Ap.lazyEvalOld(test.apCodeOld)).
		setThreadsFloats(test.numGpuThreads,test.floatsPerGpuThread);
	Ap.testArraysSameSize('apCall.par.floats', apCall.par.floats, test.apCallMems.par, 'test.apCallMems.par');
	for(let i=0; i<apCall.par.floats.length; i++){
		apCall.par.floats[i] = test.apCallMems.par[i];
	}
	if(apCall.big.floats.length || (test.apCallMems.big && test.apCallMems.big.floats.length)){ //if either is nonempty
		Ap.testArraysSameSize('apCall.big.floats', apCall.big.floats, test.apCallMems.big, 'test.apCallMems.big');
		for(let i=0; i<apCall.par.floats.length; i++){
			apCall.big.floats[i] = test.apCallMems.big[i];
		}
	}
	let prevObservedOuts = test.evals[0].observedOuts;
	let nowObservedFloatsOut = apCall.eval();
	Ap.testFloatArraysEqual('prevObservedOuts', prevObservedOuts, nowObservedFloatsOut, 'nowObservedFloatsOut');
	console.log('Test pass: '+JSON.stringify(test));
};

Ap.testArraysSameSize = function(aName, a, b, bName){
	if(a.length != b.length){
		Err(aName+'.length='+a.length+' != '+bName+'.length='+b.length);
	}
};

Ap.testFloatArraysEqual = function(aName, a, b, bName){
	Ap.testArraysSameSize(aName, a, b, bName);
	for(let i=0; i<a.length; i++){
		if(a[i] != b[i]){
			Err(aName+'['+i+']='+a[i]+' != '+bName+'['+i+']='+b[i]);
		}
	}
};

//does nothing if makeTestCaseOfNextGpuPotensCall wasnt called to ask for such a test case to be made
Ap.Call.prototype.doReturnTestCaseIfAny = function(floatsFromGpu){
	if(this.returnTestCase){
		console.log('Ap.Call.returnTestCase exists so making a testcase for ApGpuTester.js that repeats this GPU call and tests it against the output it just did, though not sure if that output is correct or not (FIXME).');
		let mems = {};
		if(this.par.floats.length) mems.par = [...this.par.floats];
		//loc floats only exist in GPU. this.loc is only here for array names sizes etc. if(this.loc.floats.length) mems.loc = [...this.loc.floats];
		//might be too big for a testcase? As of 2023-12-3 big mem doesnt exist yet but is planned for
		//hings like big neuralnets, anything that doesnt fit in 1 GPU core.
		if(this.big.floats.length) mems.big = [...this.big.floats];
		this.returnTestCase({
			//apCode: 'ape:'+this.ape, //FIXME should it be 'ape:' or 'ap:' since theres already a programming language called Ape, other than Ap.Ape in Ap.js.
			apCode: ''+this.ape, //FIXME should it be 'ape:' or 'ap:' since theres already a programming language called Ape, other than Ap.Ape in Ap.js.
			floatsPerGpuThread: this.floatsPerGpuThread,
			numGpuThreads: this.numGpuThreads,
			apCallMems: mems,
			evals:[ //environment/context, like what kind of GPU you're using, what time that GPU evaled it, etc, if known???
				{
					time: TinyGlsl.time(),
					observedOuts: [...floatsFromGpu],
				}
			],
			subjects:{ apCallGeneratedGpuTest: true },
			//jsCode: 'test=>{ console.log("TODO test="+JSON.stringify(test)); Todo(); }',
			jsCode: 'Ap.runTest',
		});
		this.returnTestCase = null;
	}
};

//call is input. floats is output, normally from call.eval() but this constructor doesnt call that.
Ap.EvalTest = function(call, floats){
	this.call = call;
	this.floats = floats;
};

//throws or logs "Test pass: "+description, depending on funcA(this)==funcB(this). Returns this for chaining convenience.
Ap.EvalTest.prototype.testEq = function(funcA, funcB, optionalDescription){
	let aOut = funcA(this);
	let bOut = funcB(this);
	let description = optionalDescription || ('funcA='+funcA+' funcB='+funcB);
	if(aOut != bOut){
		Err('EvalTest.testEq fail: '+description+'\nfuncA(this)='+aOut+' !=\nfuncB(this)='+bOut);
	}
	console.log('Test pass: '+description);
	return this;
};

//throws or logs "Test pass: "+description, depending on funcA(this)==funcB(this). Returns this for chaining convenience.
Ap.EvalTest.prototype.testNear = function(funcA, funcB, epsilon, optionalDescription){
	let aOut = funcA(this);
	let bOut = funcB(this);
	let description = optionalDescription || ('funcA='+funcA+' funcB='+funcB);
	if(typeof(aOut) != 'number'){
		Err('EvalTest.testNear fail: '+description+'\nfuncA(this)='+aOut+' is not a number');
	}
	if(typeof(bOut) != 'number'){
		Err('EvalTest.testNear fail: '+description+'\nfuncB(this)='+bOut+' is not a number');
	}
	let diff = Math.abs(aOut-bOut);
	if(diff > epsilon){
		Err('EvalTest.testEq fail: '+description+'\nfuncA(this)='+aOut+' is not near (epsilon='+epsilon+', diff='+diff+') \nfuncB(this)='+bOut);
	}
	console.log('Test pass: '+description);
	return this;
};

Ap.Call.prototype.evalTest = function(){
	return new Ap.EvalTest(this, this.eval());
};

//Async calls returnTestCase(theTestCase) just before eval (or evalTest which calls eval) returns. Returns this.
//Can call this multiple times and it will add all of those as listeners.
Ap.Call.prototype.makeTestCaseOfNextGpuPotensCall = function(returnTestCase){
	if(this.returnTestCase){
		const prevReturnTestCase = this.returnTestCase;
		this.returnTestCase = function(testCase){
			prevReturnTestCase(testCase);
			returnTestCase(testCase);
		};
	}else{
		this.returnTestCase = returnTestCase;
	}
	return this; //so can chain these along with evalTest testGet etc.
};

//returns the first index in this.floats of that child ape or ape.name
Ap.Mem.prototype.ptr = function(apeOrName){
	if(typeof(apeOrName)=='string'){
		return this.nameToPtr.get(apeOrName);
	}else{
		return this.childToPtr.get(apeOrName);
	}
};

Ap.Mem.prototype.size = function(apeOrName){
	if(typeof(apeOrName)=='string'){
		return this.nameToSize.get(apeOrName);
	}else{
		return apeOrName.size();
	}
};

//returns 1 past the last index in this.floats of that child ape.
Ap.Mem.prototype.end = function(apeOrName){
	return this.ptr(apeOrName)+this.size(apeOrName);
};

//ape can be the name (ape.name) or the ape itself. Returns this.
Ap.Mem.prototype.putFloats = function(apeOrName, floats){
	if(floats.length != this.size(apeOrName)){
		Err('floats.length='+floats.length+' but this.size(apeOrName)='+this.size(apeOrName));
	}
	let i = this.ptr(apeOrName);
	for(let j=0; j<floats.length; j++){
		this.floats[i+j] = floats[j];
	}
	return this;
};

//ape can be the name (ape.name) or the ape itself. 
Ap.Mem.prototype.getFloats = function(apeOrName){
	let i = this.ptr(apeOrName);
	let floats = new Float32Array(this.size(apeOrName));
	for(let j=0; j<floats.length; j++){
		floats[j] = this.floats[i+j];
	}
	return floats;
};

//returns list of array names such as 'c3_matAB' (dagball often puts a prefix on apes per dagball.Circ by which circ its in c3_ index 3 in a list in this case) or 'matAB'.
//FIXME should this be only par and big but not loc mems? And exclude par loc and big themselves, only include parMem bigMem parlocMem etc which are inside those?
Ap.Call.prototype.arrayNames = function(){
	Err('TODO');
};

//ONLY par and big, NOT vel dvel dpos or loc.
//
//Get the arrayName parameter from Ap.Call.prototype.arrayNames() for example.
//Put float in any par or big array (such as parMem or parlocMem or locparMem or bigMem, but not locMem
//since that only exists in GPU despite call.loc.floats existing, call.loc is there for other uses),
//whichever it exists in. loc would be ignored by GPU so does nothing in that case.
//Technically you can put it in loc too using this.loc.put(...) but that will be ignored by GPU.
//Some arrays (apeType of parlocMem or locparMem) existin both par and loc, and in that case will 
//arrayName is an ape.name (or ape.Name() to trigger lazyEval).
//Returns this.
Ap.Call.prototype.put = function(arrayName, index, floatVal){
	if(this.par.hasArrayName(arrayName)){
		this.par.put(arrayName, index, floatVal);
	}else if(this.big.hasArrayName(arrayName)){
		this.big.put(arrayName, index, floatVal);
	}else{
		throw 'Not put float (looked in par and big for the array). arrayName='+arrayName+' index='+index+' floatVal='+floatVal;
	}
	return this;
};

//Get float from array. see Ap.Call.prototype.put
Ap.Call.prototype.get = function(arrayName, index){
	if(this.par.hasArrayName(arrayName)){
		this.par.get(arrayName, index);
	}else if(this.big.hasArrayName(arrayName)){
		this.big.get(arrayName, index);
	}else{
		throw 'Not get float (looked in par and big for the array). arrayName='+arrayName+' index='+index;
	}
};

Ap.floatEpsilonForTestGet = .00001;

//For test cases.
//throws if expectedFloatVal differs more than epsilon (todo which epsilon?) from expectVal. Memtype is 'par' 'loc' or 'big'. Returns this.
Ap.Call.prototype.testGet = function(memType, arrayName, index, expectVal){
	let observedVal = this[memType].get(arrayName, index);
	if((isNaN(observedVal)!=isNaN(expectVal)) || ((observedVal===undefined)!=(expectVal===undefined)) || (Math.abs(observedVal-expectVal)>Ap.floatEpsilonForTestGet)){
		throw 'Call.testGet FAIL memType='+memType+' arrayName='+arrayName+' index='+index+' expectVal='+expectVal+' observedVal='+observedVal+' floatEpsilonForTestGet='+Ap.floatEpsilonForTestGet;
	}
	return this;
};

Ap.EvalTest.prototype.testGet = function(index, expectVal){
	let observedVal = this.floats[index];
	if((isNaN(observedVal)!=isNaN(expectVal)) || ((observedVal===undefined)!=(expectVal===undefined)) || (Math.abs(observedVal-expectVal)>Ap.floatEpsilonForTestGet)){
		throw 'EvalTest.testGet FAIL index='+index+' expectVal='+expectVal+' observedVal='+observedVal+' floatEpsilonForTestGet='+Ap.floatEpsilonForTestGet+' call='+this.call+' floatsOut='+[...(this.floats)];
	}
	return this;
};

Ap.EvalTest.prototype.testMemSizes = function(parSize, locSize, bigSize){
	if(this.call.par.memSize != parSize || this.call.loc.memSize != locSize || this.call.big.memSize != bigSize){
		throw 'mem sizes dont match. Expected par'+parSize+' loc'+locSize+' big'+bigSize+' but got par'+this.call.par.memSize+' loc'+this.call.loc.memSize+' big'+this.call.big.memSize;
	}
	return this;
};

Ap.EvalTest.prototype.log = function(str){
	console.log(str);
	return this;
};

Ap.EvalTest.prototype.err = function(str){
	console.error('EvalTest.call='+this.call+'\nEvalTest.floats='+[...(this.floats)]);
	throw new Error(str);
};

//Put floats in array. see Ap.Call.prototype.put. floats is a Float32Array(this.size(arrayName)). Returns this.
Ap.Call.prototype.putFloats = function(arrayName, floats){
	if(this.par.hasArrayName(arrayName)){
		this.par.putFloats(arrayName, floats);
	}else if(this.big.hasArrayName(arrayName)){
		this.big.putFloats(arrayName, floats);
	}else{
		throw new Error('Not put float (looked in par and big for the array). arrayName='+arrayName+' index='+index+' floatVal='+floatVal);
	}
	return this;
};

//Get floats from array. see Ap.Call.prototype.put
Ap.Call.prototype.getFloats = function(arrayName){
	if(this.par.hasArrayName(arrayName)){
		return this.par.getFloats(arrayName);
	}else if(this.big.hasArrayName(arrayName)){
		return this.big.getFloats(arrayName);
	}else{
		throw 'Not get floats (looked in par and big for the array). arrayName='+arrayName;
	}
};

//any array type that goes in par loc or big. Some of the other funcs only do par and big since loc only exists in GPU, but you need to know the size of them anyways.
Ap.Call.prototype.size = function(arrayName){
	if(this.par.hasArrayName(arrayName)){
		return this.par.size(arrayName);
	}else if(this.loc.hasArrayName(arrayName)){
		return this.loc.size(arrayName);
	}else if(this.big.hasArrayName(arrayName)){
		return this.big.size(arrayName);
	}else{
		throw 'Not get floats (looked in par and loc and big for the array). arrayName='+arrayName;
	}
};

//returns this.
Ap.Call.prototype.setThreadsFloats = function(numGpuThreads,floatsPergpuThread){
	return this.setThreads(numGpuThreads).setFloatsPerThread(floatsPergpuThread);
};

//returns this.
Ap.Call.prototype.setThreads = function(numGpuThreads){
	this.numGpuThreads = numGpuThreads;
	return this;
};

//returns this.
Ap.Call.prototype.setFloatsPerThread = function(floatsPerGpuThread){
	if(floatsPerGpuThread != 1 && floatsPerGpuThread != 4) throw 'floatsPerGpuThread='+floatsPerGpuThread+' but must be 1 or 4.';
	this.floatsPerGpuThread = floatsPerGpuThread;
	return this;
};

Ap.Mem.prototype.putRaw = function(index, floatVal){
	this.floats[index] = floatVal;
	return this;
};

//apeOrName can be the name (ape.name) or the ape itself. Returns this.
Ap.Mem.prototype.put = function(apeOrName, index, floatVal){
	this.floats[this.ptr(apeOrName)+index] = floatVal;
	return this;
};

//apeOrName can be the name (ape.name) or the ape itself.
Ap.Mem.prototype.get = function(apeOrName, index){
	//this.floats[this.ptr(apeOrName)+index] = floatVal;
	return this.floats[this.ptr(apeOrName)+index];
};

Ap.Mem.prototype.testGet = function(arrayName, index, expectVal, epsilonInsteadOfDefaultEpsilon){
	let epsilon = epsilonInsteadOfDefaultEpsilon!==undefined ? epsilonInsteadOfDefaultEpsilon : Ap.floatEpsilonForTestGet;
	let observedVal = this.get(arrayName, index);
	if(isNaN(observedVal)!=isNaN(expectVal) || (observedVal===undefined)!=(expectVal===undefined) || Math.abs(observedVal-expectVal)>epsilon){
		throw 'Mem.testGet FAIL memType='+this.apeType+' arrayName='+arrayName+' index='+index+' expectVal='+expectVal+' observedVal='+observedVal+' epsilon='+epsilon;
	}
	return this;
};

Ap.Mem.prototype.testGetRaw = function(index, expectVal){
	let observedVal = this.floats[index];
	if(isNaN(observedVal)!=isNaN(expectVal) || (observedVal===undefined)!=(expectVal===undefined) || Math.abs(observedVal-expectVal)>Ap.floatEpsilonForTestGet){
		throw 'Mem.testGet FAIL memType='+this.apeType+' index='+index+' expectVal='+expectVal+' observedVal='+observedVal+' floatEpsilonForTestGet='+Ap.floatEpsilonForTestGet;
	}
	return this;
};









Ap.Range = function(from, to){
	if(from < 0 || to < 0) Err('from='+from+' to='+to);
	this.from = from; //inclusive
	this.to = to; //exclusive
	if(to < from) Err('to < from');
};
Ap.Range.prototype.type = 'ap_range';
Ap.Range.prototype.toMap = function(){
	return {
		type: this.type,
		from: this.from,
		to: this.to
	};
};
Ap.Range.prototype.size = function(){
	return this.to-this.from;
};
Ap.Range.prototype.union = function(range){
	let from = Math.min(this.from, range.from);
	let to = Math.max(this.to, range.to);
	if(to-from > this.size()+range.size()) throw 'cant union cuz theres space between them';
	return new Ap.Range(from,to);
};
Ap.Range.prototype.canUnion = function(range){
	return (Math.max(this.to,range.to)-Math.min(this.from,range.from)) <= (this.size()+range.size());
};
Ap.Range.prototype.intersection = function(range){
	let from = Math.max(this.from,range.from);
	let to = Math.min(this.to,from.to);
	if(to < from) return new Ap.Range(from,from); //TODO 0,0 instead?
	return new Ap.Range(from,to);
};
Ap.Range.prototype.equals = function(range){
	return this.from==range.from && this.to==range.to;
};
Ap.Range.prototype.plus = function(i){
	return new Ap.Range(this.from+i,this.to+i);
};
//returns a NRange. TODO this could get expensive if not merged/unioned along the way???
Ap.Range.prototype.multiply = function(range){
	Todo('for every int in this range, for every int in the other range, (which is squared number of ints), include the multiply of those 2 ints.');
};

//compares first by .from then by .to
Ap.rangeComparator = function(a,b){
	if(a.from < b.from) return -1;
	if(a.from > b.from) return 1;
	if(a.to < b.to) return -1;
	if(a.to > b.to) return 1;
	return 0;
};

//n ranges of ints (nonnegative?) used for (TODO) proving ranges possible values of int vars,
//especially where they are used in [...] aka apeType of 'ptr', 'parPtr', 'locPtr', 'bigPtr', for memory fencing,
//since multiple float arrays overlap in {par}, multiple in {loc}, and TODO multiple in {big}.
//Also, the "TinyGLSL.js:511 WARNING: Too many active WebGL contexts. Oldest context will be lost." error was fixed
//in one case by not going out of range.
Ap.NRange = function(ranges){
	this.ranges = ranges;
};
Ap.NRange.prototype.type = 'ap_nrange';
Ap.NRange.prototype.toMap = function(){
	return {
		type: this.type,
		//from: this.from(),
		//to: this.to(),
		ranges: this.ranges.map(r=>r.toMap())
	};
};
Ap.NRange.prototype.plus = function(i){
	return new Ap.NRange(this.ranges.map(r=>r.plus(i)));
};
Ap.NRange.prototype.union = function(nrange){
	return new Ap.NRange(Ap.combineRangeLists(this.ranges,nrange.ranges));
};
//dividei (f/) and modi (fmod) are often used to split {id} into 2 or more dimensions.
Ap.NRange.prototype.dividei = function(i){
	Todo();
};
//dividei (f/) and modi (fmod) are often used to split {id} into 2 or more dimensions.
Ap.NRange.prototype.modi = function(i){
	Todo();
};
Ap.NRange.prototype.multiplyi = function(i){
	Todo();
};
//adds all pairs, one range from each of 2 nranges, then unions the ranges to make a new nrange.
Ap.NRange.prototype.multiply = function(nrange){
	let newRanges = [];
	for(let rangeA of this.ranges){
		for(let rangeB of nrange.ranges){
			for(let newRange of rangeA.multiply(rangeB).ranges){
				newRanges.push(newRange);
			}
		}
	}
	return new Ap.NRange(Ap.normRanges(newRanges));
};
Ap.NRange.prototype.isEmpty = function(){
	return this.ranges.length==0 || this.from()==this.to();
};
//minimum possible int value, or none if from()==to() aka isEmpty().
Ap.NRange.prototype.from = function(){
	Todo();
};
Ap.NRange.prototype.to = function(){
	Todo();
};
Ap.combineRangeLists = function(rangesA, rangesB){
	return Ap.normRanges([...rangesA,...rangesB]);
};
Ap.normRanges = function(ranges){ //returns new array of ranges thats at most the size of the param list and is the same total contents of the ranges.
	ranges.sort(Ap.rangeComparator);
	let ret = [];
	for(let i=0; i<ranges.length; i++){
		if(i>0 && ret[i-1].canUnion(ranges[i])){
			ret[i-1] = ret[i-1].union(ranges[i]);
		}else{
			ret.push(ranges[i]);
		}
	}
};












//If this evals to int (at various places in the code) returns its possible int values as an Ap.NRange.
//TODO throw if its too expensive to compute that, which happens if theres if/else/loop too deep inside eachother.
//FIXME This may include ranges that it cant actually do? Try to make it deterministic.
Ap.Ape.prototype.possibleInts = function(){
	Todo('For each of the apeTypes that returns int, including i+ (someName 55) (someArray parMem {30} (someName 55) {10}) i/ imod, etc, call nrange.multiply(nrange) nrange.union(nrange) etc on child apes to generate this.');
};

//UPDATE: renamer takes second param of apeType string.
//This is for adding a prefix to all names to prevent name overlap. The same content can have multiple names which
//makes it have different behaviors in some combos of loops and more copies of arrays in some cases etc.
//TODO caller must make sure renamer doesnt give the same output for any 2 possible inputs, or at least the inputs that do happen.
//Shares the this.data map.
Ap.Ape.prototype.transformNames = function(renamer, allowNullName){
	//return new Ap.Ape(renamer(this.Name()), this.apeType, this.childs.map(c=>c.transformNames(renamer)), this.data);
	let name = (this.name==null && allowNullName) ? null : renamer(this.Name(),this.apeType); //this.Name() triggers lazyEval of name. It becomes a hash id if was null.
	return new Ap.Ape(name, this.apeType, this.childs.map(c=>c.transformNames(renamer,allowNullName)), this.data);
};

//Example (used in toParloc) retyper replaces 'locparMem' with 'parlocMem' but leaves all other types as they are, for apCall.evalCpuDiffeqParloc and apCall.evanCpuMainParloc.
Ap.Ape.prototype.transformApeTypes = function(retyper){
	return new Ap.Ape(this.name, retyper(this.apeType), this.childs.map(c=>c.transformApeTypes(retyper)), this.data);
};

//Replaces 'locparMem' with 'parlocMem' but leaves all other types as they are, for apCall.evalCpuDiffeqParloc and apCall.evanCpuMainParloc.
Ap.Ape.prototype.toParloc = function(){
	return this.transformApeTypes(apeType=>(apeType=='locparMem' ? 'parlocMem' : apeType));
};

//replace all occurrences of anything with the given name with the given ape`
Ap.Ape.prototype.transformReplaceByName = function(findName, replacementApe){
	if(replacementApe.name != findName){
		Err('replacementApe.name='+replacementApe.name+' != findName='+findName);
	}
	if(this.name == findName){
		return replacementApe;
	}
	return new Ap.Ape(this.name, this.apeType, this.childs.map(c=>c.transformReplaceByName(findName,replacementApe)), this.data);
};

/* Returns {ape: transformedApe, vals: [...floats...]}, so after this is transformed, do apCall.par.putFloats('V',vals).
Throws if theres no 'V' ape. workaroundSomeOfTheCompilerLagByPuttingSomeOfTheNumbersInTheCodeIntoParMem.
This is related code in Ap.js: return recurseDebugString+this.data.floatVal; //Example: '2.34'
but im trying to transform the ape before generating GLSL, to add {V parMem (15)} for example
if theres 15 total floatVals. 'floatVal' is the apeType of 2.34 as in "}else if(this.apeType == 'floatVal'){".
*/
Ap.Ape.prototype.transformFloatValsToVArray = function(){
	let vals = [];
	this.transformFloatValsToVArray_recurse(false, vals); //just fill vals to count them, false dont return an ape.
	let foundV = this.searchApes(ape=>(ape.name=='V'))[0];
	if(!foundV) Err('Did not have a V ape, such as {V parMem (15)}.');
	let ape = this;
	let useV = foundV;
	if(!foundV.childs.length || foundV.childs[0].size() != vals.length || (foundV.apeType != 'parMem' && foundV.apeType != 'locparMem' && foundV.apeType != 'parlocMem')){
		//change V size andOr apeType if its not a parMem or locparMem etc. Caller may have put in a locparMem or parlocMem to experiment with but parMem is default.
		//in case the old V is in the parts transformFloatValsToVArray_recurse doesnt search past "if(this.isDeclaringMem() || this.isAPtr())"
		//useV = Ap.ncall('V', 'parMem', Ap.numSize(vals.length));
		let apeType = (foundV && foundV.apeType == 'parMem' || foundV.apeType == 'locparMem' || foundV.apeType == 'parlocMem') ? foundV.apeType : 'locparMem'; //TODO default to parlocMem?
		useV = Ap.ncall('V', apeType, Ap.numSize(vals.length)); //FIXME make it parMem cuz shouldnt compute gradient on it cuz its constants in the code, though being in locparMem has the advantage of it goes in the "gradient rectangles" at top of screen depending on a checkbox.
		//useV = Ap.ncall('V', 'locparMem', Ap.numSize(vals.length)); //FIXME make it parMem cuz shouldnt compute gradient on it cuz its constants in the code, though being in locparMem has the advantage of it goes in the "gradient rectangles" at top of screen depending on a checkbox.
		//useV = Ap.ncall('V', 'parlocMem', Ap.numSize(vals.length)); //update, also parlocMem. without this, it uses loc when editing loc for gradient. FIXME make it parMem cuz shouldnt compute gradient on it cuz its constants in the code, though being in locparMem has the advantage of it goes in the "gradient rectangles" at top of screen depending on a checkbox.
		ape = ape.transformReplaceByName('V',useV);
	}
	if(useV.apeType != 'locparMem' && useV.apeType != 'parlocMem'){
		let s = "Ap.js: FIXME as of 2024-5-16 the V array (and all arrays, though i have got it to work sometimes thats buggy) have to be locparMem (or also allow parlocMem?) cuz par and loc have to be same size cuz of"+
			`"if(par_sizeInFloats != overlappingParAndLocMems_sizeInFloats)" and in it "let s = 'WARNING: TODO this (par and loc not being same size) has not been tested much and will likely break. see the gradient code in codeMaker that loops over par and loc. I made a workaround for it 2024-5-16 but its likely to not solve it in general. Its 	(ignoreTheseAddingExtraVarsSoGraphicsAndPhysicsHaveSameNumberOfVVars f+ 42 42 42 42) near codemaker in dagball.html which adds 4 float literals so the display ape and physics ape have the same number of float literals which was in the code i tested with 105 in display and 109 in physics, now both 109. par_sizeInFloats='+par_sizeInFloats+' overlappingParAndLocMems_sizeInFloats='+overlappingParAndLocMems_sizeInFloats;"`;
		console.warn(s);
		//Err(s);
	}
	//now ape has the correct V size {V parMem (vals.length)} and 1 of the allowed apeTypes. Next, change floatVal literals (such as 2.34) to [V 12] for example.
	let vals2 = []; //dont need this one but the func has to fill some list of vals
	let newApe = ape.transformFloatValsToVArray_recurse(true, vals2, useV); //true return an ape
	
	//vals and vals2 should equal. Its only cuz used same func 2 times that we got 2 of them. only needed to do it once. but since they both exist, check for bugs.
	if(vals2.length != vals.length) Err('vals2.length='+vals2.length+' != vals.length='+vals.length);
	for(let i=0; i<vals.length; i++) if(vals[i] != vals2[i]) Err('vals['+i+']='+vals[i]+' != vals2['+i+']='+vals2[i]);

	newApe = newApe.dedupByName();
	return {
		ape: newApe,
		vals: vals2, //could be val or val2, they equal
	};
};

//isCreateApe is false the first run to just count them in vals. isCreateApe is true the second run to create the Ape and with V set to size vals.length
Ap.Ape.prototype.transformFloatValsToVArray_recurse = function(isCreateApe, vals, useVForPointers){
	if(this.apeType == 'floatVal'){
		vals.push(this.data.floatVal);
		if(isCreateApe){
			return Ap.Ape.prototype.transformFloatValsToVArray_readVAtIndex(useVForPointers, vals.length-1);
		}
	}else if(this.isDeclaringMem() || this.isAPtr()){
		if(isCreateApe){
			return this; //dont change floats inside parMem locMem locparMem etc (declaringmems) or ptr parPtr locPtr etc (ptrs).
		}
	}else{
		if(isCreateApe){
			return new Ap.Ape(this.name, this.apeType, this.childs.map(c=>c.transformFloatValsToVArray_recurse(isCreateApe,vals,useVForPointers)), this.data);
		}else{
			for(let c of this.childs){
				c.transformFloatValsToVArray_recurse(isCreateApe,vals,useVForPointers);
			}
		}
	}
};

//FIXME dont check for i==2 cuz thats only for specific Ape that im testing 2024-5-16, the one in nnet_1715729165.318.dagball or quickload variants of it,
//for the part near codeMaker where it adds epsilon for gradient. Generalize this.
//Ap.Ape.prototype.transformFloatValsToVArray_readVAtIndex = (V,i)=>(i==2 ? Ap.call('locPtr',V,Ap.num(i)) : Ap.ptr(V,Ap.num(i)));
/*[0.0009765625,.5,0][i] comes from this: epsilon_f was 0.0009765625.
//isDisplayElsePotensForGradient_f was 0 or 1 but was never read so just set it to .5.
//[2] is the 0. in "? epsilon_f : 0."
epsilon_f = loc[V_o+0]; //82
isDisplayElsePotensForGradient_f = loc[V_o+1]; //83
for(int gradientCopyIndex_i=0; gradientCopyIndex_i<106; gradientCopyIndex_i++){ //84
	loc[loc_o+gradientCopyIndex_i] = ( //85
			par[par_o+gradientCopyIndex_i] + //86
			(( //87
					gradientCopyIndex_i == //88
					id) ? epsilon_f : 0.)); //89
} //90
*/
Ap.Ape.prototype.transformFloatValsToVArray_readVAtIndex = (V,i)=>(i<3 ? Ap.num([(dagball ? dagball.game.floatEpsilon : .0009765625),.5,0][i]) : Ap.ptr(V,Ap.num(i)));
//Ap.Ape.prototype.transformFloatValsToVArray_readVAtIndex = (V,i)=>(i==2 ? Ap.num(0) : Ap.ptr(V,Ap.num(i)));
//returns an Ape like [V 12]
//Ap.Ape.prototype.transformFloatValsToVArray_readVAtIndex = (V,i)=>Ap.ptr(V,Ap.num(i));
//Ap.Ape.prototype.transformFloatValsToVArray_readVAtIndex = (V,i)=>Ap.ptr(V,Ap.numSize(i));


//doesnt change names whose apeType is $ or &. Example: potenCirc$ means (potenCirc $) which uses externally defined (potenCirc float).
//UPDATE 2023-11-21 also doesnt transform 'i%s' literals (such as 3%15 has _i/iter/loopName of 3 and _s/size of 15),
//and also doesnt transform 'floatVal' despite those werent being transformed anyways since they had null names.
//Since its externally defined, you dont want to rename it here.
Ap.Ape.prototype.prefixNames = function(prefix){
	//return this.transformNames((name,apeType)=>((apeType=='$' || apeType=='&') ? name : (prefix+name)));
	return this.transformNames((name,apeType)=>((apeType=='$' || apeType=='&' || apeType=='i%s' || apeType=='floatVal') ? name : (prefix+name)), true);
};

Ap.isApe = function(x){
	return x.type=='ap_ape' && typeof(x)=='object';
};

//Example: Ap.num(2.34) wraps 2.34 in an Ape
Ap.num = function(num){
	return new Ap.Ape(null, 'floatVal', [], {floatVal:num});
};

//Example: (20) in {V parMem (20)}. Param in that case is 20.
Ap.numSize = function(num){
	if(num < 0 || num > 0x7fffffff || Math.floor(num)!=num) Err('num='+num);
	return Ap.call(''+num);
};

Ap.externalFloatVar$ = function(floatVarName){
	return new Ap.Ape(floatVarName, '$', [], {});
};

Ap.floats = function(floats){
	let t = TinyGlsl.jsType(floats);
	if(t != 'Float32Array'){
		throw 'TODO type '+t+' maybe its a [2,3.4.56]?';
	}
	return new Ap.Ape(null, 'floatsVal', [], {floatsVal:floats});
};

//wrap a Float32Array or 2.34 etc. TODO more types later
Ap.wrap = function(ob){
	if(Ap.isApe(ob)){
		return ob;
	}else if(ob instanceof Number){
		return Ap.num(ob);
	}else if(ob instanceof Float32Array){
		return Ap.floats(ob);
	}else if(ob instanceof String){
		throw 'No strings. Its for GPU code.';
	}else{
		throw 'TODO type '+TinyGlsl.jsType(ob);
	}
};

//no name, leave it to be derived. ptr. dimensional array get at indexs. [arrayName dimA dimB dimC] for example, if those 4 things are defined earlier in code. Params must all be apes.
Ap.ptr = function(...params){
	//return new Ap.Ape(null, 'ptr', params, {});
	return Ap.call('ptr', ...params);
};

//TODO rename this cuz this has nothing to do with Ap.Call class.
//no name, leave it to be derived. 
//Example apeTypes: 'f*' 'ptr' 'parrMem' 'f+='. params are all apes.
Ap.call = function(apeType, ...params){
	//return new Ap.Ape(null, 'ptr', params, {});
	return Ap.ncall(null, apeType, ...params);
};

//TODO rename this cuz this has nothing to do with Ap.Call class.
//like Ap.call but also gives name, instead of having name generated later.
Ap.ncall = function(name, apeType, ...params){
	return new Ap.Ape(name, apeType, params, {});
};

//define a float var in GPU stack memory. In ape language its (float theName)
Ap.fvar = function(name){
	return Ap.ncall(name, 'float');
};

//sets 1 float var to another, whether its a float var or ptr in arrays. Can be either of those on the left, and on right has option for more complex math expressions.
//This does not set pointers to objects, since those dont exist in GLSL.
Ap.feq = function(lvalue, rvalue){
	return Ap.call('f=', lvalue, rvalue);
};

//If wraps a float or Float32Array, gets that. Dont modify it since its probably still backing in CPU and may get copied to GPU in future calls.
Ap.Ape.prototype.unwrap = function(){
	switch(this.apeType){
		case 'floatVal': return this.data.floatVal; //float as double
		case 'floatsVal': return this.data.floatsVal; //Float32Array
		default: throw 'TODO is there anything to unwrap in apeType='+this.apeType;
	}
};

//returns a Ap.ParseApe, which you should then convert to a Ap.Ape, and then in some cases to tinyGlsl code.
//WARNING: see "If you use Ap.parse(code).toApe(), dont expect the sizes to be correct" comment in Ap.lazyEval about this Ap.parse.
Ap.parse = function(apeCode){
	return Ap.parseTokens(Ap.tokenize(apeCode));
};

//Returns a Ap.ParseApe. js [] list of tokens. Example tokens: [ ] < >  { } ( ) ptr f= varName55
Ap.parseTokens = function(apeTokens){
	return Ap.parseTokensRecurse(apeTokens, new Set());
};

//uses the old language, that was used in files up to time Ap.upgradeTimeToNextLanguage (thats how to be backward compatible).
//For the new language, use Ap.lazyEval. TODO change all existing test cases before that time to use lazyEvalOld instead of lazyEval.
Ap.lazyEvalOld = function(apeCode){
	//FIXME rename Ape.toMem to toCall since it returns an Ap.Call not an Ap.Mem (Call contains 3 Mems).
	return Ap.parse(apeCode).toApe().toMem('glsl');
};

//you dont specify a language cuz it can compile to multiple langs, depending which of the "5 kinds of eval" you call on what this returns.
Ap.lazyEval = function(apeCode){
	if(apeCode.toLowerCase().startsWith('apev1:')){
		if(lang != 'glsl') Err('apev1 does not support langs other than glsl. Its GPU only. lang='+lang);
		return Ap.lazyEvalOld(apeCode.substring('apeV1:'.length)); //might be broken 2024-7-21 and i just never bothered to upgrade it after that, cuz of the 5 kinds of eval. apeV1 RIP?
	}else{
		if(apeCode.startsWith('ape:')){
			apeCode = apeCode.substring('ape:'.length);
		}
		return Ap.parse(apeCode).fromNextLanguage().toApe().toMem();
	}
};
/*
//UPDATE: code can start with "ape:" (newest or V2) or "apeV1:" to choose version, or (defaults to "ape:") neither (start with "(" for example).
//
//returns an Ap.Call object that you put floats into call.par.floats andOr call.big.floats then call.eval() to get Float32Array from GPU.
//The toMem func does second updateApeSize pass to update number of compute cycles based on {par} {loc} andOr {big} sizes summed in first pass,
//such as looping over par and loc together to copy par to loc with 1 index (chosen by {id} aka which GPU thread) +epsilon for computing gradient.
//If you use Ap.parse(code).toApe(), dont expect the sizes to be correct since it hasnt done second pass yet, and second pass is only
//computed correctly after creating an Ap.Call which sums the par loc and big sizes.
Ap.lazyEval = function(apeCode, optionalLang){
	let lang = optionalLang || 'glsl';
	if(apeCode.toLowerCase().startsWith('apev1:')){
		if(lang != 'glsl') Err('apev1 does not support langs other than glsl. Its GPU only. lang='+lang);
		return Ap.lazyEvalOld(apeCode.substring('apeV1:'.length));
	}else{
		if(apeCode.startsWith('ape:')){
			apeCode = apeCode.substring('ape:'.length);
		}
		//FIXME rename Ape.toMem to toCall since it returns an Ap.Call not an Ap.Mem (Call contains 3 Mems).
		//return Ap.parse(apeCode).fromNextLanguage().toApe().toMem();
		return Ap.parse(apeCode).fromNextLanguage().toApe().toMem(lang);
		//let ape = Ap.parse(apeCode).fromNextLanguage().toApe();
		//ape.preferCpu = preferCpu; //causes ape.toMem() to use lang 'js'.
		//return ape.toMem();
	}
};*/
/*
//Returns Ap.Ape. Use this if you want to combine it with a Float32Array before evaling.
Ap.lazyEval = function(apeCode){
	return Ap.parse(apeCode).toApe();
};*/

Ap.lazyEvalV = function(apeCode){
	if(apeCode.toLowerCase().startsWith('apev1:')){
		Err('apeV1 not supported (would be small code change?) with V. Convert to V2 aka (ape:).');
	}else{
		if(apeCode.startsWith('ape:')){
			apeCode = apeCode.substring('ape:'.length);
		}
		return Ap.parse(apeCode).fromNextLanguage().toApe().toMemV();
	}
};

/*
//returns an Ap.Call object that you put floats into call.par.floats andOr call.big.floats then call.eval() to get Float32Array from GPU.
Ap.call = function(apeCode){
	return Ap.lazyEval().toMem();
};*/

/*
//Returns Ap.Ape. parMem and bigMem are optional. As of 2023-11-3 the plan is to make parMem and locMem the only memories, and add bigMem option later.
Ap.eval = function(apeCode, numGpuThreads, floatsPerGpuThread, parMem, bigMem){
	throw 'Use ape.toMem() first then fill mem.par.floats (use funcs in mem to do it by what ape arrays share that floats array, or directly, works either way) THEN mem.eval() -> Float32Array';
	//return Ap.lazyEval(apeCode).eval(numGpuThreads, floatsPerGpuThread, parMem, bigMem);
};*/

//returns the number nearest to Math.sqrt(numPixels), thats less than or equal to that, as possible that numPixels is divisible by.
//FIXME make sure its within about 8192 or 16484 or whatever the max height is, and similar for numPixels/returnVal.
Ap.chooseHeight = function(numPixels){
	for(let possibleH=Math.floor(Math.sqrt(numPixels)); possibleH>=1; possibleH--){
		if(!(numPixels%possibleH)){
			return possibleH;
		}
	}
};

Ap.chooseWidth = function(numPixels){
	return numPixels/Ap.chooseHeight(numPixels);
};

//2024-6-2 is this func used, or is it all Ap.Call.prototype.eval (call.ape is an Ap.Ape thats evaled on call.par which is an Ap.Mem, and other mems)?
//
//all params are optional, but if the code requires parMem andOr bigMem, then those are not. default numGpuThreads and floatsPerGpuThread is 1.
//
//trigger lazyEval. Returns either this Ape if its already evaled (or is just itself as evaled) or does the GPU calculation and returns wrapped Float32Array in an Ape.
//parMem and bigMem are optional. As of 2023-11-3 the plan is to make parMem and locMem the only memories, and add bigMem option later.
//
//given parrMem which is a size 0-1000 Float32Array, and optional optionalBigMem which is another Float32Array, evals this ape's code on it,
//returning another Float32Array, or throws if the code compiles to invalid GLSL code or whatever language its compiled to (might do WebGPU and OpenCL later?).
//TODO this is how to separate ape language from dagball, so theres: dagball dependsOn apeLanguage dependsOn tinyGlsl depends on webGL2Glsl.
//
//dagball dependsOn apeLanguage dependsOn tinyGlsl depends on webGL2Glsl
Ap.Ape.prototype.eval = function(numGpuThreads, floatsPerGpuThread, parMem, bigMem){
	if(!parMem){
		parMem = Float32Array.of(0); //since glsl doesnt work with float[0], or is that just tinyglsl?
	}
	if(!floatsPerGpuThread){
		floatsPerGpuThread = 1; //can be 1 or 4. 4 is max in GLSL unless you output to multiple arrays? Might be way around that using offset= location= etc, todo look into it.
	}
	if(!numGpuThreads){
		//Its most efficient for this to be a multiple of the GPUs number of shader cores. A nvidia 2080 super GPU has 3072 shader cores for example.
		//This should generally be between 1000 and 1000000. It defaults to 1 for testing.
		numGpuThreads = 1;
	}
	let map = this.toTinyGlslCode();
	let beforeCode = map.tinyglslBeforeCode;
	console.log('beforeCode: '+beforeCode);
	let adjustedTinyglslCode = '//START generated tinyglsl code\n'+map.tinyglslCode+'\n//END generated tinyglsl code';
	adjustedTinyglslCode = adjustedTinyglslCode.replaceAll('ret_f','ret');
	adjustedTinyglslCode = adjustedTinyglslCode.replaceAll('retb_f','retb');
	adjustedTinyglslCode = adjustedTinyglslCode.replaceAll('retc_f','retc');
	adjustedTinyglslCode = adjustedTinyglslCode.replaceAll('retd_f','retd');
	//TinyGlsl.simple(function(beforeCode, code, par, big, height, width, optionalFloatsOutPerPixel)
	let height = Ap.chooseHeight(numGpuThreads);
	let width = numGpuThreads/height;
	console.log('code: '+adjustedTinyglslCode);
	//beforeCode += '\n#pragma optimize(off)'; //Experimental 2024-5-13 to try to get it to compile faster but run slower
	let floatsOut = TinyGlsl.simple(beforeCode, adjustedTinyglslCode, parMem, bigMem, height, width, floatsPerGpuThread);
	return floatsOut;
};

//size of parMem
Ap.Ape.prototype.parSize = function(){
	throw 'TODO';
};

//size of locMem + locparMem + parlocMem
Ap.Ape.prototype.locSize = function(){
	throw 'TODO';
};

//size of bigMem
Ap.Ape.prototype.bigSize = function(){
	throw 'TODO';
};

//min size of parMem param you give in other funcs.
Ap.parSize = function(apeCode){
	Ap.eval(apeCode).parSize();
};

//returns a list of Ape matching query(ape)->true in depthFirst order
//Example: ape.seachApes(ape=>(Ap.apeType=='parrMem'))
Ap.Ape.prototype.searchApes = function(query){
	let list = [];
	let set = new Set(); //avoids dups
	this.searchApesRecurse(query, list, set);
	return list;
};






















//Ap.apeType can be '15' or 'parrMem' or 'f+=' etc. If its '15' this is true. It can be used in loops from 0 to 15-1, in that example, or combined with {* {15} {+ {2} {3}}} etc.
//This does not include '2%5' literals etc. In that example _i/iter is 2 and _s/size is 5, as iter ranges 0 to size-1.
Ap.Ape.prototype.apeTypeIsSimpleSize = function(){
	return Number.isInteger(Number(this.apeType))
};

//UPDATE 2024-9-8 theres a bug where Ap.singleThreadedSharedTempVars.parSize and .locSize are from the wrong ape cuz 1 ape is made
//then it becomes part of another ape near dagball codeMaker var where it puts the circs in the merged apes,
//so I'm adding optionalCx param which defaults to Ap.singleThreadedSharedTempVars but TODO eventually get rid of Ap.singleThreadedSharedTempVars
//and always use optionalCx in at least second pass of updateApeSize.
//
//user should not call this after ape is created since the 2 pass system depends on vars shared across multiple Ap.Call objects.
//Since ape and call creation is single threaded only 1 call will use the shared vars at a time. Those vars are in Ap.singleThreadedSharedTempVars.
Ap.Ape.prototype.updateApeSize = function(optionalCx){
	let cx = optionalCx || Ap.singleThreadedSharedTempVars;

	//FIXME check for int overflow, or given max vars such as 1000?
	if(Ap.logApeSizes) console.log('START updateApeSize ape='+this);
	switch(this.apeType){
		case 'floatVal':{
			//this.apeSize = 1; //1 float, not array. Mem for it is like (varName float). Val for it is written like 2.34
			this.apeSize = 0; //FIXME should this be 0 or 1? 0 to not count it in the memory since it goes on GLSL stack in an apeType=='float' var whose memory is already counted. 1 to count it again. ??
		}break;case '$':{ //Example: potenCirc$ accesses a float var without declaring it, expects it to be declared externally. So dont count it toward apeSize of mem.
			this.apeSize = 0; //declared externally so dont count it again here.
		}break;case 'float':{
			this.apeSize = 1; //Example: (varNameX float) which goes in a memory area, a float var but not specific float val.
		}break;case 'par':{ //aka readonly position. apCall.par shared array. //{par} contains all {parMem} and {parlocMem} and {locparMem}.
			//this.apeSize = Ap.singleThreadedSharedTempVars.parSize; //this.computeSizeOfSharedParArray();
			this.apeSize = cx.parSize; //this.computeSizeOfSharedParArray();
			//console.log('Set {par} size to Ap.singleThreadedSharedTempVars.parSize='+Ap.singleThreadedSharedTempVars.parSize);
		}break;case 'loc':{ //apCall.loc shared array. //{loc} contains all {locMem} and {parlocMem} and {locparMem}.
			//this.apeSize = Ap.singleThreadedSharedTempVars.locSize; //this.computeSizeOfSharedLocArray();
			this.apeSize = cx.locSize; //this.computeSizeOfSharedLocArray();
		}break;case 'big':{ //apCall.big shared array. //{big} contains all {bigMem}.
			//this.apeSize =  Ap.singleThreadedSharedTempVars.bigSize; //this.computeSizeOfSharedBigArray();
			this.apeSize = cx.bigSize; //this.computeSizeOfSharedBigArray();
		}break;case 'vel':{ //velocity shared array. use as readonly. dagball.Ed.vel, similar to dagball.Ed.pos.
			//this.apeSize =  Ap.singleThreadedSharedTempVars.parSize; //FIXME same size as par. par (or maybe the first part of par, where par and loc share indexs) is position.
			this.apeSize =  cx.parSize; //FIXME same size as par. par (or maybe the first part of par, where par and loc share indexs) is position.
		}break;case 'dpos':{
			//dpos shared array, change in position per time aka dt WITHOUT GOING THROUGH VELOCITY.
			//Like how chuas circuit has 3 floats of state and given that and dt computes next 3 floats. read and write using dposPtr.
			//this.apeSize =  Ap.singleThreadedSharedTempVars.parSize; //same size as par. par (or maybe the first part of par, where par and loc share indexs) is position.
			this.apeSize =  cx.parSize; //same size as par. par (or maybe the first part of par, where par and loc share indexs) is position.
		}break;case 'dvel':{ //dvel shared array, change in velocity per time aka dt. read and write using dvelPtr.
			//this.apeSize =  Ap.singleThreadedSharedTempVars.parSize; //same size as par. par (or maybe the first part of par, where par and loc share indexs) is position.
			this.apeSize =  cx.parSize; //same size as par. par (or maybe the first part of par, where par and loc share indexs) is position.
		}break;case 'parrMem':case 'localparMem':case 'parMem':case 'parlocMem':case 'locparMem':case 'locMem':{ //TODO remove parrMem and localparMem
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
				let cSiz = c.size();
				if(cSiz === 0){
					Err('Child size is 0 in a mem. this='+this+' child='+c);
				}
				this.apeSize *= c.size();
				//this.apeSize *= Math.max(1,c.size());
			}
		}break;case 'bigMem':{
			throw 'TODO bigMem is one optional shared readOnly array in GPU memory that normally does not fit in a GPU core so is much slower IO than parrMem and localparMem. Its like global constant memory in OpenCL.';
		}break;case 'const':{
			throw 'Getting rid of the const apeType and use string of positive integer as apeType instead such as (matDimA 5) means float[5].';
			//this.apeSize = this.data.const;
		}break;case 'id':{
			this.apeSize = 1; //{id} is like get_global_id(0) in opencl. Its the id of the gpu thread. range 0 to {ids} minus 1. FIXME is there an {ids} yet (2023-11-10) or is that just the int var in tinyglsl?
		}break;case 'doLast':{
			this.apeSize = this.childs[this.childs.length-1].size();
		}break;case '+':{
			this.apeSize = 0;
			for(let c of this.childs){
				this.apeSize += c.size();
			}
		}break;case '*':{
			//TODO merge duplicate code with "}break;case 'parrMem':case 'localparMem':{"?
			this.apeSize = 1;
			for(let c of this.childs){
				this.apeSize *= c.size(); //dont "this.apeSize *= Math.max(1,c.size());" cuz if any loop in loop is size 0, the whole thing doesnt run.
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

			this.apeSize = this.childs[0].size(); //FIXME Bug: for(int c0_corner_i=0; c0_corner_i<0; c0_corner_i++){ //131 but its supposed to be "(oo {corner copy loopSize}".
			//console.log('set copy.apeSize to '+this.apeSize+' ape='+this);
			/*if(this.childs[0].apeType == 'int'){
				//no, cant do it here as string cuz must be number:
				workaround for: Bug: for(int c0_corner_i=0; c0_corner_i<0; c0_corner_i++){ //131 but its supposed to be "(oo {corner copy loopSize}".
				this.apeSize = this.childs[0].LoopName();
			}else{
				this.apeSize = this.childs[0].size();
			}*/

		}break; case 'exceptLast':{
			if(this.childs.length != 1){
				throw 'exceptLast apeType must have exactly 1 child: '+this.childs.length;
			}
			this.apeSize = Math.max(0, this.childs[0].size()-1);
		/*}break;case 'copyRange':{
			//FIXME Since loop sizes cant depend on _i vars, only on _s vars,
			these params dont seem to fit (will use pointer arithmetic instead. see codeMaker)...
			//like apeType of 'copy' (where _i/iter ranges 0 to _s-1) but takes an extra 2 param of a range to copy.
			//Keeps same _s/size so it can still be used in [...] which read or write a tensor using _s for its tensorDimension sizes,
			//when used in a * / loop.
			//{whichBall copyRange numBalls }
		*/
		}break; case 'i+1':{
			//counterpart of exceptLast. If you're looping over {exceptLast abc}
			//then {i+1 abc} ranges 1 to abc.apeSize-1. Looping over abc directly would be 0 to abc.apeSize-1.
			//Example use: a chain of 5 things, you can use 0%5 and 1%5 together, and 1%5 2%5, and 2%5 3%5, and 3%5 4%5.
			//Its apeSize is the same as abc (its param), but the first index doesnt happen.
			if(this.childs.length != 1){
				throw 'i+1 apeType must have exactly 1 child: '+this.childs.length;
			}
			this.apeSize = this.childs[0].size()+1;
		}break;case 'todo_convolutionOpInVariableNumberOfDimsOrJustMergeTheDimsIntoASingleOffsetMaybe?':{
			throw new Error('TODO');
		/*}break;case 'todo_factorial?':{
			throw Error('TODO');
		}break;case 'todo_fibonacci?':{
			throw Error('TODO');
		*/
		}break;case 'union':{
			//TODO remove this apeType/opcode.

			if(this.childs.length < 1){
				Err('union apeType must have at least 1 child (and at least 2 to do any useful unioning): '+this.childs.length);
			}
			this.apeSize = this.childs[0].size();
			for(let c=1; c<this.childs.length; c++){
				if(this.childs[c].size() != this.apeSize){
					Err('union apeType must have all childs same size. First child is size '+this.apeSize+'. Child '+c+' is size '+this.childs[c].size());
				}
			}
		}break;case 'unionMax':{
			//TODO remove this apeType/opcode.

			//like union but childs can be different sizes. Takes the max size of them. Ignores the others.
			//FIXME this might break the addressing model and if so replace each child
			//with (name + thatChild (otherName const whateverRemainingSize)) so theyre all the same size.
			//unionMax is normally used in localparMem since the different gpucircs take turns using localparMem
			//and must write the first n indexs before reading them, for an often-different n per gpucirc.
			if(this.childs.length < 1){
				Err('unionMax apeType must have at least 1 child (and at least 2 to do any useful unioning): '+this.childs.length);
			}
			this.apeSize = 0;
			for(let child of this.childs){
				this.apeSize = Math.max(this.apeSize, child.size()); //child+0 so it doesnt put the child itself in this.apeSize
			}
		}break;case 'threadTimeMemMemMem':{
			//TODO remove this apeType/opcode.

			//Index can be 0 to 2**53-1 and points at a (math abstraction of, not actually computed this way normally)
			//value at a certain memory address, in a certain thread, at a certain time cycle.
			//This is outermost Ape type that generates GLSL code to run in TinyGlsl.
			//Returns new Float32Array(numGpuThreads) that each uses (this.childs[2]+this.childs[3]) amount of mem
			if(this.childs.length != 5){
				Err('threadMemTime apeType is outermost and must have 4 childs: numGpuThreads time parrMem localparMem: '+this.childs.length);
			}
			//the actual compute time is this.childs[0]*this.childs[1] (numGpuThreads*time) but as a math address space its 3d.
			//FIXME should this.childs[2] (parrMem) be added outside the multiply since theres only 1 uniform/constant copy of it per GPU call?
			//But theres another copy of it in local mem the same size that epsilon is added to 1 index of depending on which GPU thread index
			//when computing gradient in numDimensions+1 GPU threads.
			//this.childs[3] (localparMem) differs in each GPU thread.
			//TODO should this just multiply all 4 of them anyways, instead of this.childs[0]*this.childs[1]*(this.childs[2]+this.childs[3])? Its just a math index.
			//this.childs[4] is stackMem, local float variables in glsl code.
			this.apeSize = this.childs[0].size()*this.childs[1].size()*(this.childs[2].size()+this.childs[3].size()+this.childs[4].size());
		}break;case 'int':{
			if(this.childs.length > 1){
				Err('apeType=int must have 0 (default value is 0.0) or 1 childs (what its int value is set to) but has this many: '+this.childs.length);
			}
			this.apeSize = this.childs.length ? this.childs[0].size() : 0; //FIXME this could break the _i/_s system, not counting size right.
		}break;case 'size':{
			if(this.childs.length != 1){
				Err('apeType=size must have 1 child (what it gets the ape.size() of) but has this many: '+this.childs.length);
			}
			this.apeSize = this.childs[0].size();
		}break;case 'imod':{
			if(this.childs.length != 2){
				Err('apeType=imod must have 2 childs but has this many: '+this.childs.length);
			}
			this.apeSize = this.childs[1].size(); //the int its wrapped around. FIXME what if this is done to get 3 ints out of 1 int, instead of just 2?
		}break;case 'i/':{
			if(this.childs.length != 2){
				throw 'apeType=i/ (int divide int) must have 2 childs but has this many: '+this.childs.length;
			}
			this.apeSize = Math.ceil(this.childs[0].size()/this.childs[1].size()); //the int its wrapped around. FIXME what if this is done to get 3 ints out of 1 int, instead of just 2?
		}break;case 'i-':{
			if(this.childs.length == 2){
				Err('FIXME size of i- cant be the subtract of its 2 param sizes. and cant be the max of it. not sure what to do, if i- should even be a size-compatible opcode');
				//this.apeSize = Math.ceil(this.childs[0].size()/this.childs[1].size()); //the int its wrapped around. FIXME what if this is done to get 3 ints out of 1 int, instead of just 2?
			}else{
				Err('size cant be negative, so i- must have 2 params (at least, but just requiring exactly 2 for now. does it make sense for 3+?), ape='+this);
			}
		}break;case 'ishll':{
			if(this.childs.length != 2){
				throw 'ishll aka << must have 2 childs: '+this.childs.length;
			}
			this.apeSize = this.childs[0].size()<<this.childs[1].size(); //FIXME what if this overflows int?
		}break;case 'ishrr':{
			if(this.childs.length != 2){
				throw 'ishrr aka >> must have 2 childs: '+this.childs.length;
			}
			this.apeSize = this.childs[0].size()>>this.childs[1].size();
		}break;case 'i+':{
			this.apeSize = 0; //FIXME start as 0 or 1?
			for(let child of this.childs){
				this.apeSize += child.apeSize;
			}
		}break;case 'i%s':{
			this.apeSize = this.data.size;
		}break;case 'i==':case 'i&':case 'f*':case 'f*=':case 'f+=':case 'f+':case 'f-':case 'f/':case 'f/=':
			case 'f**':case 'fsigmoid':case 'fisNaN':case 'f=':case 'ptr':case 'parPtr':case 'locPtr':case 'bigPtr':case'dposPtr':case 'velPtr':case 'dvelPtr':case 'dfrictionPtr':
				case 'fhypot':case 'fless':case 'fmore':case 'fmax':case 'fmin': case 'fatan': case 'gpucpu': case 'velPtr': case 'dvelPtr': case 'dposPtr':
				case '?:':case 'ftanh':case 'fxtanh':case 'fmod':case 'freturn':case 'flog':case 'fsin':case 'fcos':case 'fsqrt':case 'fabs':case 'fexp':case '?':case 'funk':case '@':case 'funcReturn':{
			//renamed 'call' to '@'
			//FIXME some of these (especially fxtanh) take alot more than 1 flop per child. fxtanh does 2 tanhs etc which are a slow calculation.
			this.apeSize = 1; //+1 for this calculation after childs return. //FIXME start as 0 or 1?
			for(let child of this.childs){
				this.apeSize += child.apeSize;
			}
		}break;case 'listLoop':{
			//{listLoop (listSize 3) {...before each...} {...after each...} item0 item1 item2}, in the case of listSize being 3.
			//listSize_i is 0 then 1 then 2, which can be used inside the other params.
			if(this.childs.length < 3){
				throw 'listLoop apeType must have at least 3 childs: '+this.childs.length;
			}
			let listSize = this.childs.length-3;
			let iter = this.childs[0];
			let beforeEach = this.childs[1];
			let afterEach = this.childs[2];
			if(iter.size() != listSize){
				Err('listLoop apeType must have iter.size() == listSize. iter.size()='+iter.size()+' listSize='+listSize);
			}
			let size = (beforeEach.size()+afterEach.size())*listSize;
			for(let i=3; i<this.childs.length; i++){
				//beforeEach happens here
				size += this.childs[i].size();
				//afterEach happens here
			}
			this.apeSize = size;
		}break;default:{
			try{
				//Example: (matDimA 5) means matDimA is a float[5] but doesnt specify which 5 float vals.
				let apeSize = parseInt(this.apeType);
				if(apeSize <= 0){
					Err('apeSize='+apeSize+' must be positive if its an int literal');
				}
				this.apeSize = apeSize;
			}catch(e){
				Err('unkown apeType: '+this.apeType);
			}
		}
	}
	if(typeof(this.apeSize) != 'number' || isNaN(this.apeSize)){
		Err('apeSize must be a number but is typeof='+typeof(this.apeSize)+': '+this.apeSize+' ape='+this);
	}
	//console.log('apeSize='+this.apeSize);
	if(Ap.logApeSizes) console.log('END updateApeSize size='+this.apeSize+' ape='+this);
	if(isNaN(this.apeSize)){
		/*2024-5-14
		Returning new webgl context [object WebGL2RenderingContext]
		Ap.js:3446 WARNING: TODO this has not been tested much and will likely break. see the gradient code in codeMaker that loops over par and loc.
		this+''
		Ap.js:2281 Uncaught TypeError: c.toApeCodeRecurse is not a function
		at Ap.js:2281:35
		at Array.map (<anonymous>)
		at Ap.Ape.toApeCodeRecurse (Ap.js:2281:26)
		at Ap.Ape.toApeCode (Ap.js:2239:14)
		at Ap.Ape.toString (Ap.js:2222:17)
		at eval (eval at Ap.Ape.toString (Ap.js:1:1), <anonymous>:1:5)
		at Ap.Ape.toString (Ap.js:2222:17)
		at Ap.Ape.updateApeSize (Ap.js:2168:107)
		at new Ape (Ap.js:698:8)
		at Ap.ncall (Ap.js:1664:9)
		*/
		Err("NaN apeSize"); //dont tostring it cuz tostring caused what i thought was this 2024-5-14 so i added this isnan check, but then it didnt do this. why is apeSize NaN?
	}
	return this.apeSize;
};


//FIXME any code using {} should use this instead so Ap.builtInapeTypesOtherThanPositiveInts.toString etc wont be there for example.
Ap.newEmptyMap = function(){
	let ret = {};
	Object.setPrototypeOf(ret, null);
	return ret;
};

Ap.noProto = function(ob){
	Object.setPrototypeOf(ob, null);
	return ob;
};

/*
Ap.builtInapeTypesOtherThanPositiveInts = Ap.newEmptyMap();
//floatVal is not actually written. It appears as 2.34 instead. But Ap.parseApeCode('2.34').apeType=='floatVal'.
//FIXME this is likely to get out of sync as new apeTypes_aka_opcodes are added. Find a way to write it all in 1 place so they tend to get updated together.
//Once the Ap.Ape language is finised, there might be 30 or so standard apeTypes and no more will be added, plus all the the positive integers as strings.
'ptr f= float int par parMem parPtr loc locMem locPtr big bigMem bigPtr parlocMem locparMem floatVal + * 2pow pow union unionMax copy f* f+= f+ f- doLast x y z parrMem localparMem bigMem freturn flast iftri fless fmore $ &'.split(' ').forEach(x=>{
	Ap.builtInapeTypesOtherThanPositiveInts[x] = true;
});

//One of a small set of constant strings or a string of a positive integer less than 2**53 (cuz thats what fits in float64).
Ap.isValidapeType = function(string){
	if(Ap.builtInapeTypesOtherThanPositiveInts[string]){
		return true;
	}
	let intValue = Number(str);
	return /^[1-9]\d*$/.test(string) && 0<intValue && intValue<2**53;
};*/

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
	let str = this.toApeCode();
	if(Ap.apeToStringAsNextLanguage){
		//return ''+this.toParseApe().toNextLanguage(); //FIXME
		str = Ap.stringToNextLanguage(str);
	}
	return str;
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
	//normally is '' but may be like 'siz17_' etc if you replace Ap.prefixEveryApeToStringRecursivelyWithThis to help you find bugs temporarily
	let recurseDebugString = Ap.prefixEveryApeToStringRecursivelyWithThis(this);
	if(this.name === undefined){
		throw 'Name cant be undefined';
	}
	//2023-12-10 moved skipName above the IF and added it in "if(!skipName && this.name != null)", cuz a floatVal 0 was displayed as c0.
	//It might be a mistake to also put f= aka <...> and ptr aka [...] here, in case [a b c] is written as {name ptr a b c} and <a b> is written as {name f= a b}?
	let skipName = this.name==null || this.apeType=='f=' || this.apeType=='ptr' || this.apeType=='floatVal' || this.apeType=='i%s';
	if(!skipName && this.name != null){
	//if(this.name != null){
		if(ns[this.name]){
			if(this.apeType == '$' || this.apeType == '&'){
				return recurseDebugString+this.name+this.apeType; //Example: potenCirc$ means (potenCirc float) may be defined externally. someInt& is same but for int vars.
			}else{
				return recurseDebugString+this.name; //Example: the second sizeA in (matAB * (sizeA 3) sizeA). Dont display as (matAB * (sizeA 3) (sizeA 3)).
			}
		}else{
			ns[this.name] = this; //Example: the (sizeA 3) in (matAB * (sizeA 3) sizeA). sizeA is name in both places, and its the same Ape twice.
		}
	}
	//FIXME only if name is hash of content, instead of some arbitrary name. If name is null, then it means lazyEval of hash of content, so null counts too.
	//let skipName = this.name==null || this.apeType=='f=' || this.apeType=='ptr' || this.apeType=='floatVal' || this.apeType=='i%s';
	//TODO special code here for types???: float
	let ret = recurseDebugString;
	if((this.apeType == '$' || this.apeType == '&') && this.name){
		//Example: potenCirc$ is (potenCirc $) which accesses (potenCirc float) defined externally.
		//Use for (blue$ green$ pixDist$ pixBal$) doubleHeightmap stuff, for example.
		ret += this.name+this.apeType;
	}else if(this.apeType == 'floatVal'){
		if(this.data.floatVal === undefined){
			throw 'apeType=floatVal apeType must have Ap.data.floatVal';
		}
		return recurseDebugString+this.data.floatVal; //Example: '2.34'
	}else if(skipName && this.apeType == 'ptr'){
		ret += '['+this.childs.map(c=>c.toApeCodeRecurse(ns)).join(' ')+']';
	}else if(skipName && this.apeType == 'f='){
		ret += '<'+this.childs.map(c=>c.toApeCodeRecurse(ns)).join(' ')+'>';
	}else if(skipName && this.apeType == 'i%s'){
		ret += this.data.iter+'%'+this.data.size;
	}else if(skipName){
		let spaceOrNot = this.childs.length == 0 ? '' : ' ';
		ret += '{'+this.apeType+spaceOrNot+this.childs.map(c=>c.toApeCodeRecurse(ns)).join(' ')+'}';
	}else{ //do it the long simple way: (name apeType childs...)
		let spaceOrNot = this.childs.length == 0 ? '' : ' ';
		ret += '('+this.name+' '+this.apeType+spaceOrNot+this.childs.map(c=>c.toApeCodeRecurse(ns)).join(' ')+')';
	}
	ret = Ap.mergeTokensInString(ret);
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

/*transforms all name, list symbol (){}[]<>, and apeTypes, by the given function of string to string.
Normally that function wraps Ap.nextLanguage or Ap.nextLanguageReverse, and if somethings not in that, leaves it as it is.
stringToString(undefined) should return undefined, and null to null.
Ap.ParseApe = function(listType){
	this.listType = listType; //One of: [ < { ( l. l means literal.
	this.literal = null;
	this.childs = [];
};*/
Ap.ParseApe.prototype.transformSymbols = function(stringToString){
	let ret = new Ap.ParseApe(stringToString(this.listType));
	ret.childs = this.childs.map(c=>c.transformSymbols(stringToString));
	ret.literal = stringToString(this.literal);
	return ret;
	/*let newListType = stringToString(this.listType);
	if(this.childs.length){
		return new Ap.ParseApe(newListType).add(this.childs.map(c=>c.transformSymbols(stringToString)));
	}else{
		if(newListType != this.listType) return new Ap.ParseApe(newListType);
		return this;
	}
	Todo();
	*/
};

Ap.ParseApe.prototype.toNextLanguage = function(){
	return this.transformSymbols(s=>(Ap.nextLanguage[s] || s));
};

/*2023-12-7-1025aET while doing the nextLanguage upgrade...
a = Ap.parse('(+ 2 (* 5 y$) 3)')
Ap.ParseApe {listType: '(', literal: null, childs: Array(4)}
a+''
'(+ 2 (* 5 y$) 3)'
b = a.fromNextLanguage()
Ap.ParseApe {listType: '{', literal: null, childs: Array(4)}
b+''
'{f+ 2 {f* 5 y$} 3}'
*/
Ap.ParseApe.prototype.fromNextLanguage = function(){
	return this.transformSymbols(s=>(Ap.nextLanguageReverse[s] || s));
};


//returns a Ap.Ape
//See warning in Ap.lazyEval that sizes may be wrong if use this directly insterad of in Ap.lazyEval(code) cuz of a second pass.
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
				if(this.literal.endsWith('$')){ //Example: potenCirc$, a float var declared externally, so it shouldnt be in ns[this.literal]
					let floatVarName = this.literal.substring(0,this.literal.length-1);
					let foundApe = ns[this.literal];
					if(foundApe){
						console.log('WARNING: '+this.literal+' but foundApe='+foundApe+' and its supposed to be defined externally. Maybe you tostringed the combined apes and parsed it again? So allowing it as long as its apeType is float.');
						if(foundApe.apeType != 'float'){
							throw 'Literal '+this.literal+' ends with $ but found an ape of name '+floatVarName+' whose apeType is '+foundApe.apeType+' instead of float';
						}
					}
					return Ap.externalFloatVar$(floatVarName);
				}else{
					let literalAsNum = parseFloat(this.literal); //Example: '2.34' or '2' or 'NaN' or 'Infinity' or '-Infinity'. parseFloat('sizeA') and parseFloat('NaN') both return NaN.
					if(Number.isFinite(literalAsNum)){
						//return new Ap.Ape(null, 'floatVal', [], {floatVal:literalAsNum});
						return Ap.num(literalAsNum);
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
						Err('It didnt work in parseFloat so not a float string, and no Ape found of name '+name+
						'.\nIf name, youre supposed to define it earlier like sizeA in (matAB * (sizeA 3) sizeA).'+
						'\nthisParseApe='+this+'\nnsKeys='+Object.keys(ns));
					}
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
		Err('Not a literal: '+this);
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
			nameParseApe.listType = 'l';
			nameParseApe.literal = this.name;
			parseApe.childs.push(nameParseApe);
		}else{
			parseApe.listType = '{';
		}
		let typeParseApe = new Ap.ParseApe();
		typeParseApe.listType = 'l';
		typeParseApe.literal = this.apeType;
		parseApe.childs.push(typeParseApe);

		this.childs.forEach(child=>{
			parseApe.childs.push(child.toParseApe());
		});
	}
	return parseApe;
};

/*Ap.parseTokensRecurse = function(apeTokens, set){
	throw 'TODO';
};*/
/*Ap.parseTokensRecurse = function(apeTokens, set) {
	if (apeTokens.length === 0) {
		throw "Unexpected end of tokens";
	}

	let token = apeTokens.shift(); // Pop the first token

	let parseApe = new Ap.ParseApe();

	switch(token) {
		case '[':
			parseApe.listType = '[';
			while(apeTokens[0] !== ']') {
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ']'
			break;
		case '<':
			parseApe.listType = '<';
			while(apeTokens[0] !== '>') {
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the '>'
			break;
		case '{':
			parseApe.listType = '{';
			parseApe.apeType = apeTokens.shift(); // Assume next token is the apeType
			while(apeTokens[0] !== '}') {
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the '}'
			break;
		case '(':
			parseApe.listType = '(';
			parseApe.name = apeTokens.shift(); // Assume next token is the name
			parseApe.apeType = apeTokens.shift(); // Next token is the apeType
			while(apeTokens[0] !== ')') {
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ')'
			break;
		default:
			parseApe.listType = 'l';
			parseApe.literal = token;
	}

	return parseApe;
};*/
/*Ap.parseTokensRecurse = function(apeTokens, set) {
	if (apeTokens.length === 0) {
		throw "Unexpected end of tokens";
	}

	let token = apeTokens.shift(); // Pop the first token

	let parseApe = new Ap.ParseApe();

	switch(token) {
		case '[':
			parseApe.listType = '[';
			while(apeTokens[0] !== ']') {
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ']'
			break;
		case '<':
			parseApe.listType = '<';
			while(apeTokens[0] !== '>') {
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the '>'
			break;
		case '{':
			parseApe.listType = '{';
			parseApe.apeType = apeTokens.shift(); // Assume next token is the apeType
			while(apeTokens[0] !== '}') {
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the '}'
			break;
		case '(':
			parseApe.listType = '(';
			while(apeTokens[0] !== ')') {
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ')'
			break;
		default:
			parseApe.listType = 'l';
			parseApe.literal = token;
	}

	return parseApe;
};*/
/*Ap.parseTokensRecurse = function(apeTokens, set) {
	if (apeTokens.length === 0) {
		throw "Unexpected end of tokens";
	}

	let token = apeTokens.shift(); // Pop the first token
	let parseApe = new Ap.ParseApe();

	switch(token) {
		case '[':
			parseApe.listType = '[';
			while(apeTokens[0] !== ']') {
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ']'
			break;
		case '<':
			parseApe.listType = '<';
			while(apeTokens[0] !== '>') {
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the '>'
			break;
		case '{':
			parseApe.listType = '{';
			parseApe.apeType = apeTokens.shift(); // Assume next token is the apeType
			while (apeTokens[0] !== '}') {
				if (apeTokens[0] === '{') {
					parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
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
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the ')'
			break;
		default:
			parseApe.listType = 'l';
			parseApe.literal = token;
	}

	return parseApe;
};*/
Ap.parseTokensRecurse = function(apeTokens, set){
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
			if(token === '['){
				parseApe.listType = '[';
				endToken = ']';
			}else if(token === '<'){
				parseApe.listType = '<';
				endToken = '>';
			}else if(token === '{'){
				parseApe.listType = '{';
				//parseApe.apeType = apeTokens.shift(); // Assume next token is the apeType
				endToken = '}';
			}else{ // '('
				parseApe.listType = '(';
				endToken = ')';
			}

			while (apeTokens[0] !== endToken) {
				parseApe.childs.push(Ap.parseTokensRecurse(apeTokens, set));
			}
			apeTokens.shift(); // Pop the corresponding end token
			break;

		default:
			parseApe.listType = 'l';
			parseApe.literal = token;
	}

	return parseApe;
};


Ap.tokenize = function(apeCode, isKeepWhitespace){
	//let matches = apeCode.match(/({|\[|<|\(|\)|>|\]|}|\s+|\S+)/g);
	//let matches = apeCode.match(/({|\[|<|\(|\)|>|\]|}|[a-zA-Z0-9._]+|\s+)/g);
	//let matches = apeCode.match(/([{}[\]<>()])|(\S+)/g);
	//GPT says 2023-11-26:      /([{}[\]<>()@\?])|([^{}[\]<>()@\s]+)|(\s+)/g
	//GPT says 2023-11-26:      /([{}[\]<>()@\?])|([^{}[\]<>()\s]+)|(\s+)/g
	let matches = apeCode.match(/([{}[\]<>()@?])|([^{}[\]<>()\s?]+)|(\s+)/g) || []; //|| [] in case it returns null for no matches.
	let rawTokens = isKeepWhitespace ? matches : matches.filter(token => !token.match(/^\s+$/));
	return Ap.mergeTokens(rawTokens);
};

/*merges consecutive strings '?' and ':' into '?:' since '?' means func and '@' means call and I want it to look like this without interfering with the '?:' apeType.
ape: {+
	(arr locparMem {5})
	(funcA? (a float) (b float) {fsin {f* a b}}) 
	<potenCirc$
		{@funcA
			{@funcA x$ x$}
			{f* 3 y$}
		}
	>
}
*/
Ap.mergeTokens = function(rawTokens){
	let ret = [];
	for(let rawToken of rawTokens){
		if(ret.length){
			if(ret[ret.length-1] == '?' && rawToken == ':'){
				ret[ret.length-1] += rawToken;
			}else{
				ret.push(rawToken);
			}
			//add other parsing rules here
		}else{
			ret.push(rawToken);
		}
	}
	return ret;
};

//str is a string of Ap.Ape code except has whitespace thats not needed, that Ap.tokenize and Ap.mergeTokens will know to split, especially to change ' ?' to '?' and change '@ ' to '@'.
Ap.mergeTokensInString = function(str){
	return str.replaceAll(' ?','?').replaceAll('@ ','@');
};

Ap.Ape.prototype.sharedArrayName = function(){
	if(this.apeType != 'ptr'){
		Err('Not ptr apeType='+this.apeType);
	}
	if(!this.childs.length){
		Err('No childs. First child tells mem type.');
	}
	let array = this.childs[0];
	if(array.apeType=='parMem' || array.apeType=='parlocMem' || array.apeType=='par'){
		//The par apeType is the whole par memory that many arrays may be isinde.
		//parlocMem exists in both par and loc but defaults to par. To use it as loc use it from inside an apeType of locPtr. Similar to parPtr and bigPtr.
		return 'par';
	}else if(array.apeType=='parrMem' || array.apeType=='locMem' || array.apeType=='locparMem' || array.apeType=='loc'){
		//The loc apeType is the whole loc memory that many arrays may be isinde.
		//return 'parr'; //use as readOnly despite it technically could be written
		return 'loc'; //loc/locMem is a readable and writable memory inside a glsl shader, not shared with other shaders.
	}else if(array.apeType=='localparMem'){
		Err('TODO remove localparMem and parrMem');
		//return 'localpar'; //readable and writable
	}else if(array.apeType=='bigMem' || array.apeType=='big'){
		return 'big';
		//sharedArrayName = 'bigMem';
		//throw 'TOOD write code for bigMem (mem that doesnt fit in a GPU core, and is used as readOnly)';
	}else{
		Err('apeType='+array.apeType+' is not a mem type (parrMem, localparMem, bigMem, and float is another mem type but is not an array)');
	}
};

Ap.Ape.prototype.isDeclaringMem = function(){
	//TODO remove parrMem cuz its replaced by locMem, and derive the calculus behaviors in it.
	//TODO remove localparMem cuz replaced by locMem, locparMem (in locMem and parMem, default locMem), and parlocMem (in locMem and parMem, default parMem).
	//TODO rename float to floatOnStack or something? Cuz I also want float in each of the other kinds of mem.
	return this.apeType=='parMem' || this.apeType=='parrMem' || this.apeType=='localparMem' || this.apeType=='bigMem' || this.apeType=='float' || this.apeType=='int' ||
		this.apeType=='locMem' || this.apeType=='locparMem' || this.apeType=='parlocMem';
};

Ap.Ape.prototype.isDeclaringArrayMem = function(){
	return this.apeType.endsWith('Mem'); //parMem locMem parlocMem locparMem bigMem
};

Ap.Ape.prototype.isAPtr = function(){
	return this.apeType=='ptr' || this.apeType=='parPtr' || this.apeType=='locPtr' || this.apeType=='bigPtr' ||
		this.apeType=='velPtr' || this.apeType=='dvelPtr' || this.apeType=='dposPtr' || this.apeType=='dfrictionPtr'
};


//Code that can be used as an L-value (to write float at) or R-value (to read float at).
//If apeType is 'f+=' 2 of the params x y might be used like x.ptrCode(lang)+' += '+y.ptrCode(lang)+';'
//The syntax [a b c] means {ptr a b c} aka (GeneratedName324 ptr a b c), so check for apeType of 'ptr'.
//If its just a single variable such as sumB ((sumB const 1) in stackMem) then it should return sumB.
//Maybe 'const' isnt the right apeType for that? So Im changing it to (sumB float) in stackMem.
//No more (name const 1) in stackMem since that means an array of floats size 1. Its now (sumB float) and (someSize 12).
Ap.Ape.prototype.ptrCode = function(lang){
	//TODO merge duplicate code between Ap.Ape.prototype.ptrCode and the *ptr parts of Ap.Ape.prototype.toTinyGlslCodeRecurse which these 2 lines are from:
	//}else if(this.apeType=='ptr' || this.apeType=='parPtr' || this.apeType=='locPtr' || this.apeType=='bigPtr' ||
	//		this.apeType=='velPtr' || this.apeType=='dvelPtr' || this.apeType=='dposPtr'){


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


	//if(this.apeType == 'float'){
	if(this.apeType == 'float' || this.apeType == '$'){
		//FIXME float vs floatVal apeTypes?
		//return this.name;
		return this.FloatName();
	//}else if(this.apeType == 'ptr'){
	//}else if(this.apeType=='ptr' || this.apeType=='parPtr' || this.apeType=='locPtr' || this.apeType=='bigPtr'){
	}else if(this.isAPtr()){
		//"TODO merge duplicate code between Ap.Ape.prototype.ptrCode and the *ptr parts of Ap.Ape.prototype.toTinyGlslCodeRecurse which these 2 lines are from"

		//FIXME verify the loop vars are connected to the thing they're looping over, thru union, unionMax, copy, or directly.
		if(this.childs.length == 0){
			throw 'No array';
		}
		let array = this.childs[0];
		//let sharedArrayName = this.sharedArrayName();
		//let sharedArrayName = this.apeType=='ptr' ? this.sharedArrayName() : this.apeType.substring(0,3); //else: par loc or big, force it to use a chosen shared array.
		let sharedArrayName = this.apeType=='ptr' ? this.sharedArrayName() : this.apeType.substring(0,this.apeType.indexOf('Ptr')); //par loc big vel dvel dpos
		/*if(this.childs.length == 2){
			let index = this.childs[1];
			//FIXME must use parr[offset+...], localpar[offset+...] and only give stackMem (sumB float) etc names.
			//Use this.name in the offsets, so its still Human readable, though Humans will normally read it in a new language Im making that generates the glsl code.
			//return 'TODO'+sharedArrayName+'_FIXME__'+array.ptrCode(lang)+'['+index.indexCode()+']';
			return sharedArrayName+'['+array.OffsetName()+'+'+index.indexCode()+']';
		}else if(this.childs.length == 3){
			//return 'TODO'+sharedArrayName+'_FIXME__'+array.ptrCode(lang)+'[todotwothings '+this.childs[1].indexCode()+'*something +'+this.childs[2].indexCode()+']';
			return sharedArrayName+'['+array.OffsetName()+this.childs[1].indexCode()+'*'+this.childs[2].size()+'+'+this.childs[2].indexCode()+'] /*FIXME WHY ISNT THIS GETTING CALLED IN ptrCode*';
		}else throw 'TODO more general ptr indexing, numChilds='+this.childs.length;
		*/
		if(this.childs.length == 2){
			//return this.childs[0].ArrayName()+'['+this.childs[1].LoopName()+']';
			return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].IndexExpr(lang)+']';
		}else if(this.childs.length == 3){
			//return this.childs[0].ArrayName()+'['+this.childs[1].LoopName()+'*'+this.childs[2].SizeName()+'+'+this.childs[2].LoopName()+']';
			//return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].LoopName()+'*'+this.childs[2].SizeName()+'+'+this.childs[2].LoopName()+']';
			return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].IndexExpr(lang)+'*'+this.childs[2].size()+'+'+this.childs[2].IndexExpr(lang)+']';
		}else if(this.childs.length == 4){
			//TODO optimize by this part being just 1 number: '*('+this.childs[2].SizeName()+'*'+this.childs[3].SizeName()+')+'+
			//return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].LoopName()+'*('+this.childs[2].SizeName()+'*'+this.childs[3].SizeName()+')+'+
			//	this.childs[2].LoopName()+'*'+this.childs[3].SizeName()+'+'+this.childs[3].LoopName()+']';
			return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].IndexExpr(lang)+'*'+(this.childs[2].size()*+this.childs[3].size())+
				this.childs[2].IndexExpr(lang)+'*'+this.childs[3].size()+'+'+this.childs[3].IndexExpr(lang)+']';
		}else{
			throw 'TODO generalize for any number of childs, just do the normal x*sizeY+y thing if its not the more complex pointer arithmetic kind of child';
		}
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
		if(this.apeType == 'i%s'){
			this.name = ''+this;
			//console.log('WARNING: setting ape.name of i%s to its toString: '+this.name);
		}else{
			let syncTypeToChar_const = 'c'; //dagball.syncTypeToChar.const
			if(this.apeType == 'floatVal'){
				this.name = syncTypeToChar_const+this.data.floatVal; //FIXME should it just be '2.34' if thats the floatVal?
			}else{
				this.name = syncTypeToChar_const+Ap.sha256HexOfString(this.contentToHash());
			}
		}
	}
	return this.name;
};

//for counting memory offsets in parrMem and localparMem and maybe later bigMem.
Ap.Ape.prototype.OffsetName = function(){
	if(this.apeType=='par' || this.apeType=='loc' || this.apeType=='big'){
		return this.apeType+'_o';
	}
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

/* For use in [...]. The "Bug: {i+1 linkExceptLast} in [...] is not generating code and is just displaying its ape.LoopName()" bug 2023-11-22.

Bug was generating this GLSL code:
for(int c0_linkExceptLast_i=0; c0_linkExceptLast_i<4; c0_linkExceptLast_i++){ //139
	c0_todoRemoveThisVar_f = 3.; //140
	c0_linkY_f = loc[c0_abc_o+c0_linkExceptLast_i*2+0]; //141
	c0_linkX_f = loc[c0_abc_o+c0_linkExceptLast_i*2+1]; //142
	c0_linkY2_f = loc[c0_abc_o+c0_cbe2e6cfd434f4ec05c90be275663119f7e430e63d27235405a6b85346dbee124_i*2+0]; //143
	c0_linkX2_f = loc[c0_abc_o+c0_cbe2e6cfd434f4ec05c90be275663119f7e430e63d27235405a6b85346dbee124_i*2+1]; //144
from this Ap.Ape code:
{* (linkExceptLast exceptLast numChainLinks)
	{+
		<(todoRemoveThisVar float) 3>
		<linkY [abc linkExceptLast 0%2]>
		<linkX [abc linkExceptLast 1%2]>
		<(linkY2 float) [abc {i+1 linkExceptLast} 0%2]>
		<(linkX2 float) [abc {i+1 linkExceptLast} 1%2]>
The {i+1 linkExceptLast} had ape.Name called on it which generated c0_cbe2e6cfd434f4ec05c90be275663119f7e430e63d27235405a6b85346dbee124_i
cuz [...] called ape.LoopName(). 2023-11-22 changed it to clal ape.IndexExpr(lang) instead of ape.LoopName()
in the "}else if(this.apeType=='ptr' || this.apeType=='parPtr' || this.apeType=='locPtr' || this.apeType=='bigPtr'){" code block.
Im going to try expanding it inside the [...] instead of just using ape.LoopName().
But careful not to expand it to {i+1 (linkExceptLast exceptLast numChainLinks)}. I want the result to be "(linkExceptLast_i+1)*2+0".
TODO verify that fixes it.
*/
Ap.Ape.prototype.IndexExpr = function(lang){
	//if(this.apeType == 'i%s') return this.LoopName();
	let ret = this.toTinyGlslCodeRecurse(lang,0,true).trim(); //true forceInt
	//console.log('IndexExpr: '+ret+' ape='+this);
	return ret;
	//throw 'TODO IndexExpr';
};

Ap.Ape.prototype.ArrayName = function(){
	return this.Name()+'_a';
};

Ap.Ape.prototype.FloatName = function(){
	if(this.apeType != 'float' && this.apeType != '$') Err('Not a float var (apeType='+this.apeType+' of float or $): '+this);
	//This breaks things. Its supposed to return y_f in this case: if(this.apeType == '$') Todo('if its y$ would it return y$_f or y$? It should be y$');
	return this.Name()+'_f';
};

Ap.Ape.prototype.StackName = function(){
	if(this.apeType != 'float' && this.apeType != '$') Err('Not a float var (apeType='+this.apeType+' of float or $): '+this);
	return this.Name()+'_e'; //prev _f val.
};

//name of the function, that returns float and takes float (and TODO maybe also int) params, whose code goes in beforeCode (string var)
//that goes before the GLSL main() function in TinyGlsl.
Ap.Ape.prototype.FuncName = function(){
	//apeType='func' was renamed to '?' and 'call' renamed to '@' 2023-11-26. @ and ? are normally displayed without whitespace like funcName? and @funcName
	if(this.apeType != '?') Err('Not apeType=func, observed apeType='+this.apeType+' ape='+this);
	return this.Name()+'_u';
};

//same tablev as caller. Called by toTinyGlslCodeRecurse for f+ f* and maybe others later but its likely just those 2 that are vararg that way???
//isInt defaults to false if dont give that param.
Ap.Ape.prototype.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc = function(lang, tablev, opString, isInt){
	Ap.checkLang(lang);
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
		//if(multiLine) code += Ap.nline(tablev+1)+ch.toTinyGlslCodeRecurse(lang,tablev+1);
		//if(multiLine) code += (i>0 ? Ap.nline(tablev+1) : '')+ch.toTinyGlslCodeRecurse(lang,tablev+1);
		//else code += ch.toTinyGlslCodeRecurse(lang,0).trim();
		if(isInt){
			if(multiLine) code += Ap.nline(tablev+1)+ch.toTinyGlslCodeRecurse(lang,tablev+1,isInt);
			else code += ch.toTinyGlslCodeRecurse(lang,0,isInt).trim();
		}else{
			if(multiLine) code += Ap.nline(tablev+1)+ch.floatCode(lang,tablev+1); //floatCode puts float( ... ) around it if its int.
			else code += (i>0 ? Ap.nline(tablev+1) : '')+ch.floatCode(lang,0).trim();
		}
	}
	if(multiLine) code += Ap.nline(tablev);
	code = code.trim();
	if(this.childs.length > 1) code += ')';
	return code;
	//return code.trim();
};

Ap.wrapInParensIfNotAlready = str=>{
	let t = str.trim();
	if(t.startsWith('(') && t.endsWith(')')) return str;
	return '('+str+')';
};

//2023-12-13 starting in dagball101.html im moving the lang param to be first param in various funcs instead of Ap.lang global param cuz global was creating bugs.
//what language is it currently compiling to: 'glsl' or 'js'. Maybe later also 'webgpu' and 'opencl'. Used in toTinyGlslCodeRecurse* funcs.
//Ap.lang = 'glsl';

//2023-12-13 it can be 'glsl' or 'js'. Ap.langs contains those.
Ap.checkLang = function(lang){
	if(!lang || !Ap.langs.includes(lang)){
		Err('lang='+lang);
	}
};

//isInt defaults to false if dont give that param.
Ap.Ape.prototype.toTinyGlslCodeRecurse_tanhPowSinExpEtc = function(lang, tablev, glslFuncName, isInt){
	Ap.checkLang(lang);
	//return glslFuncName+'('+this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev, ',')+')';
	return glslFuncName+Ap.wrapInParensIfNotAlready(this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang, tablev, ',', isInt));
};

//modifies this.beforeCode and this.code based on Ap.lang which may be 'js' or 'glsl'. TODO this is getting tangled. should put lang param in toMem etc,
//but alot of code would have to change. Save that for a bigger redesign later (now is 2023-12-12). This is an ugly hack.
//Check this.compileToLang after calling to see if it changed. Returns this for convenience.
Ap.Call.prototype.updateCode = function(){
	if(Ap.lang != 'js'){
		Err('Why are you calling this if not changing from glsl to js?');
	}
	let newCall = this.ape.toMem();
	this.beforeCode = newCall.beforeCode;
	this.code = newCall.code;
	this.compileToLang = newCall.compileToLang;
	return this;
};

//of apes that have names (ape.name), uses the first one as the normed form and replaces all later ones with that same ape, unless 
Ap.Ape.prototype.dedupByName = function(){
	return this.dedupByName_recurse({}, {});
};

//namesInside is like a stack except it doesnt care about order, so its a {} of name->true.
Ap.Ape.prototype.dedupByName_recurse = function(ns, namesInside){
	if(this.name){
		if(namesInside[this.name]){
			Err('Found 2 apes with same name, 1 inside the other. name='+this.name+'. If they are not inside eachother, the first one would be used as the normed form to dedup, since it means to use it again like (* x x) is x squared and uses the x (defined earlier) ape twice, but you cant have {x * 3 (+ 10 x)} which means the * has name of x and its the multiply of 3 and 10+x cuz thats a cycle.');
		}
		namesInside[this.name] = true; //in case the same name occurs in 2 apes where 1 is inside the other, detect it and throw
	}
	let newSelf = this;
	let changedSelf = false;
	let newChilds = [];
	for(let ch of this.childs){
		let newChild = ch.dedupByName_recurse(ns, namesInside);
		if(ch !== newChild){
			changedSelf = true;
		}
		newChilds.push(newChild);
	}
	if(changedSelf){
		newSelf = new Ap.Ape(this.name, this.apeType, newChilds, this.data);
		//console.log('Replacing ape with deduped ape,\nape='+this+'\ndeduped='+newSelf);
	}//else{
		//console.log('Not replacing ape='+this);
	//}
	if(this.name){
		delete namesInside[this.name];
	}
	if(this.name){
		if(ns[this.name]){
			return ns[this.name]; //return the earlier ape of same name
		}else{
			ns[this.name] = newSelf; //remember this as the "earlier ape of same name" for later. newSelf may be this or a generated ape by deduping recursively.
		}
	}
	//console.log('ape.dedupByName_recurse returning '+newSelf);
	return newSelf;
};

/*
//of apes that have names (ape.name), uses the first one as the normed form and replaces all later ones with that same ape, unless 
Ap.Ape.prototype.dedupByName = function(){
	let ns = this.getMapOfNameToFirstApeWithThatName();
	return this.dedupByName_recurse(ns);
};

Ap.Ape.prototype.dedupByName_recurse = function(ns){
	let newChilds = [];
	for(let ch of this.childs){
		newChilds.push(ch.dedupByName_recurse(ns));
	}
	FIXME what if i have a name in ns but so do some of my childs recursively that need to be replaced?
};

//only includes those with names.
Ap.Ape.prototype.getMapOfNameToFirstApeWithThatName = function(){
	let ns = {};
	this.getMapOfNameToFirstApeWithThatName_recurse(ns);
	return ns;
}

Ap.Ape.prototype.getMapOfNameToFirstApeWithThatName_recurse = function(ns){ //ns is the map
	if(this.name && !ns[this.name]){
		ns[this.name] = this;
	}
	for(let ch of this.childs){
		ch.getMapOfNameToFirstAjsonToFirstApeWithThatNamepeWithThatName_recurse(ns);
	}
};*/

//uses Ap.Ape.prototype.transformFloatValsToVArray to transform this to a new Ape in a new Ap.Call then fill the V array with the floats.
//This must have a V array of any size (will make a new ape with the right size automatically) and that many floatVal literals such as 2 or 2.34,
//not the transformed ape which this creates.
Ap.Ape.prototype.toMemV = function(){
	let map = this.transformFloatValsToVArray(); //keys: ape, vals.
	//let apCall = map.ape.toMem();
	let apCall = map.ape.toMem('glsl'); //cuz the V system is only useful in GPU.
	apCall.putFloats('V', map.vals);
	//in case it gets overwritten as usual in gradient calculation by current world state, can copy it back from here
	apCall.V = map.vals.slice();
	return apCall;
};

/*Use ape.toMemV() instead of this.
Ap.Call.prototype.transformFloatValsToVArray = function(){
	let map = this.ape.transformFloatValsToVArray(); //keys: ape, vals.
	//FIXME? but copy func doesnt work yet, so will lose whatever floats were in the Ap.Mem's, and put in just the V array. let newCall = this.copy();
	//but even if fixed this.copy(), it would still need the new ape which changes the code.

	//this.ape.transformFloatValsToVArray()
	Err('FIXME if change size of V array then the int ranges in Call are wrong. Make a new Call. Fill in its V par floats call.par.putFloats("V",map.vals). Return that new Call');
};*/

//does a few searches across whole tree.
//similar to ape.cx() but computes it based on the tree, not on caches, except fixme might be a problem with this.secondPassOfUpdateApeSize()?
Ap.Ape.prototype.deepGetParLocBigSizes = function(){
	//TODO? this.secondPassOfUpdateApeSize();
	//FIXME this makes it not just a GET but modifies,
	//depending which ape its called from vs those reachable as its childs recursively.
	//this.secondPassOfUpdateApeSize();

	//parlocMem and locparMem are a kind of array that exists both in parMem and locMem. One has parMem the default, and the other has locMem the default. See parPtr and locPtr and ptr etc.
	//let overlappingParAndLocMems = ret.overlappingParAndLocMems = ret.velMems = this.searchApes(ape=>(ape.apeType=='parlocMem') || ape.apeType=='locparMem'); //with duplicates
	let overlappingParAndLocMems = this.searchApes(ape=>((ape.apeType=='parlocMem') || (ape.apeType=='locparMem')));
	let parOnlyMems = this.searchApes(ape=>(ape.apeType=='parMem'));
	let locOnlyMems = this.searchApes(ape=>(ape.apeType=='locMem'));
	let bigOnlyMems = this.searchApes(ape=>(ape.apeType=='bigMem')); //as of 2023-11-3 this is for future expansion. TinyGlsl has a bigMem/big param but ignores it.
	let floatOnlyMems = this.searchApes(ape=>(ape.apeType=='float')); //GPU stack vars (not that stack exists, but its similar to CPU stack vars)
	let overlappingParAndLocMems_sizeInFloats = overlappingParAndLocMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);
	let parOnlyMems_sizeInFloats = parOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);
	let locOnlyMems_sizeInFloats = locOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);
	let bigOnlyMems_sizeInFloats = bigOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);
	return {
		type: 'ap_cx',
		parSize: overlappingParAndLocMems_sizeInFloats+parOnlyMems_sizeInFloats,
		locSize: overlappingParAndLocMems_sizeInFloats+locOnlyMems_sizeInFloats,
		bigSize: bigOnlyMems_sizeInFloats
	};
};

//ape.toMem (which returns an Ap.Call) is being redesigned to this 2024-7-21+, with the 5 kinds of eval. Returns a {parOnlyMems: [...], locOnlyMems: [...], locMemsDedup: {}, etc}
Ap.Ape.prototype.parseMems = function(){
	if(this.parseMemsEtc_){
		return this.parseMemsEtc_;
	}

	//instead of Ap.singleThreadedSharedTempVars. Duplicates some of the code here,
	//but will infinite loop if u merge it the wrong way, todo maybe.
	this.updateApeSizeTop();

	//deal with par, loc, and big if they are used directly (like in dagballs gradient code where it loops over par and loc together
	//to add epsilon in up to 1 dimension at a time. Updates size recursively.
	//2024-9-12 commentout this cuz use updateApeSizeTop instead. test with 1725560510.9276001.dagball. this.secondPassOfUpdateApeSize();

	let ret = {};

	//parlocMem and locparMem are a kind of array that exists both in parMem and locMem. One has parMem the default, and the other has locMem the default. See parPtr and locPtr and ptr etc.
	//let overlappingParAndLocMems = ret.overlappingParAndLocMems = ret.velMems = this.searchApes(ape=>(ape.apeType=='parlocMem') || ape.apeType=='locparMem'); //with duplicates
	let overlappingParAndLocMems = ret.overlappingParAndLocMems = ret.velMems = this.searchApes(ape=>((ape.apeType=='parlocMem') || (ape.apeType=='locparMem')));
	let parOnlyMems = ret.parOnlyMems = this.searchApes(ape=>(ape.apeType=='parMem'));
	let locOnlyMems = ret.locOnlyMems = this.searchApes(ape=>(ape.apeType=='locMem'));
	//let parMems = this.searchApes(ape=>(ape.apeType=='parMem') || ape.apeType=='parlocMem' || ape.apeType=='locparMem');
	//let locMems = this.searchApes(ape=>(ape.apeType=='locMem') || ape.apeType=='parlocMem' || ape.apeType=='locparMem');
	let bigOnlyMems = ret.bigOnlyMems = this.searchApes(ape=>(ape.apeType=='bigMem')); //as of 2023-11-3 this is for future expansion. TinyGlsl has a bigMem/big param but ignores it.
	let floatOnlyMems = ret.floatOnlyMems = this.searchApes(ape=>(ape.apeType=='float')); //GPU stack vars (not that stack exists, but its similar to CPU stack vars)

	let intOnlyMems = ret.intOnlyMems = this.searchApes(ape=>(ape.apeType=='int')); //GPU pointer arithmetic, cant branch depending on float array contents but can based on int math on {id}. TODO also maybe allow these for computing sha256 etc?

	let overlappingParAndLocMems_sizeInFloats = ret.overlappingParAndLocMems_sizeInFloats = overlappingParAndLocMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);
	let parOnlyMems_sizeInFloats = ret.parOnlyMems_sizeInFloats = parOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);
	let locOnlyMems_sizeInFloats = ret.locOnlyMems_sizeInFloats = locOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);
	let bigOnlyMems_sizeInFloats = ret.bigOnlyMems_sizeInFloats = bigOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);

	//Err('FIXME these sizes in floats include duplicates and sizes arent matching.');

	let par_sizeInFloats = ret.par_sizeInFloats = overlappingParAndLocMems_sizeInFloats+parOnlyMems_sizeInFloats;
	let loc_sizeInFloats = ret.loc_sizeInFloats = overlappingParAndLocMems_sizeInFloats+locOnlyMems_sizeInFloats;
	let big_sizeInFloats = ret.big_sizeInFloats = bigOnlyMems_sizeInFloats;
	
	/*FIXME added this 2024-7-21-1050aET cuz these were undefined in[[[
	Uncaught Error: apeSize must be a number but is typeof=undefined: undefined ape=(par)
	at Ap.Ape.updateApeSize (Ap.js:2438:9)
	at new Ape (Ap.js:705:8)
	at Ap.ParseApe.toApeRecurse (Ap.js:2764:10)
	at Ap.js:2759:93
	at Array.map (<anonymous>)
	at Ap.ParseApe.toApeRecurse (Ap.js:2759:84)
	at Ap.js:2764:90
	at Array.map (<anonymous>)
	at Ap.ParseApe.toApeRecurse (Ap.js:2764:81)
	at Ap.js:2764:90
	Ap.Ape.updateApeSize @ Ap.js:2438
	Ape @ Ap.js:705
	Ap.ParseApe.toApeRecurse @ Ap.js:2764
	(anonymous) @ Ap.js:2759
	Ap.ParseApe.toApeRecurse @ Ap.js:2759
	(anonymous) @ Ap.js:2764
	Ap.ParseApe.toApeRecurse @ Ap.js:2764
	(anonymous) @ Ap.js:2764
	Ap.ParseApe.toApeRecurse @ Ap.js:2764
	(anonymous) @ Ap.js:2764
	Ap.ParseApe.toApeRecurse @ Ap.js:2764
	Ap.ParseApe.toApe @ Ap.js:2647
	Ap.lazyEval @ Ap.js:1971
	dagball.View.updateLocalFields @ dagball.html:13739
	dagball.View @ dagball.html:13041
	dagball.updateView @ dagball.html:12959
	dagball.Game.nextState @ dagball.html:14220
	mainLoop @ dagball.html:3515
	requestAnimationFrame (async)
	mainLoop @ dagball.html:3527
	boot @ dagball.html:3797
	window.onload @ dagball.html:15105
	load (async)
	(anonymous) @ dagball.html:15099
	]]]
	*/


	/* removed 2024-9-12
	Ap.singleThreadedSharedTempVars.parSize = par_sizeInFloats; //for this.secondPassOfUpdateApeSize()
	Ap.singleThreadedSharedTempVars.locSize = loc_sizeInFloats; //for this.secondPassOfUpdateApeSize()
	Ap.singleThreadedSharedTempVars.bigSize = big_sizeInFloats; //for this.secondPassOfUpdateApeSize()
	*/
	//Ap.singleThreadedSharedTempVars.parSize = this.par.memSize;
	//Ap.singleThreadedSharedTempVars.locSize = this.loc.memSize;
	//Ap.singleThreadedSharedTempVars.bigSize = this.big.memSize;


	let velPtrs = this.searchApes(ape=>(ape.apeType=='velPtr')); //FIXME make sure these are only read, never written except before the code starts.
	let dvelPtrs = this.searchApes(ape=>(ape.apeType=='dvelPtr')); //readwrite
	let dposPtrs = this.searchApes(ape=>(ape.apeType=='dposPtr')); //readwrite
	let includeDiffeqMems = ret.includeDiffeqMems = !!(velPtrs.length || dvelPtrs.length || dposPtrs.length);


	//These end with _e from .StackName() instead of _f from .FloatName() and happen inside apeType='func' (not funk or call).
	//It remembers their prev value in the _e var, puts func params in them, then puts their prev value back since func is finished with them.
	//funk (notice the k instead of c) is faster cuz it doesnt remember prev float values and leaves them modified.
	let floatOnlyMemsUsedWithStackName = ret.floatOnlyMemsUsedWithStackName = [];
	let floatOnlyMemsUsedWithStackName_set = new Set();
	for(let func of this.searchApes(ape=>(ape.apeType=='func'))){
		for(let i=0; i<func.childs.length-1; i++){
			let floatVar = func.childs[i];
			if(floatVar.apeType != 'float' && floatVar.apeType != '$') Err('Not a float var so cant be there in apeType=func. theFunc='+func);
			if(!floatOnlyMemsUsedWithStackName_set.has(floatVar)){
				floatOnlyMemsUsedWithStackName_set.add(floatVar);
				floatOnlyMemsUsedWithStackName.push(floatVar);
			}
		}
	}

	//TODO? {call {func (x pfloat) (y pfloat) {f+ x y}} 10 2} -> 12
	//or should they just be (x float) (y float)?
	let funcApes = ret.funcApes = this.searchApes(ape=>(ape.apeType=='?')); //'func' renamed to '?'

	if(bigOnlyMems && bigOnlyMems.length){
		Err('TODO bigMem. As of 2023-11-3 tinyGlsl has a bigMem/big param which will be a Float32Array but its ignored.');
	}

	//FIXME remove parrMem and localparMem. The new mem types are: parMem locMem locparMem parlocMem float bigMem.
	let parrMems = ret.parrMems = this.searchApes(ape=>(ape.apeType=='parrMem')); //TODO Removing these. FIXME 2024-7-21 parr has been gone for long time. Use parMem locMem locparMem parlocMem instead, and maybe someday also bigMem.
	let localparMems = this.searchApes(ape=>(ape.apeType=='localparMem')); //TODO Removing these
	if(parrMems.length){
		Err('Use locMem or locparMem or parlocMem, instead of parrMem.');
	}
	if(localparMems.length){
		Err('Use locMem or locparMem or parlocMem, instead of localparMem.');
	}

	let offset = 0; //doesnt overlap parMem or locMem, so start at 0.

	let overlappingParAndLocMems_deduped = ret.overlappingParAndLocMems_deduped = [];
	//FIXME these dedup maps worked for not adding dups to [mem.nameToPtr, mem.nameToSize, etc] but
	//"let parOnlyMems_sizeInFloats = parOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);" (and similar for loc and big) still had dups,
	//so im gonna try to dedup in ParseApe.toApe() TODO 2024-5-15+ NO dont do it there, make a separate dedup func and use it near codeMaker
	//which is where this started 2024-5-15 as it uses ape.toMemV() which forkEdits to replace some floatVals like 2.34 and 100 of Ape with [V 0] [V 15] etc,
	//which might be creating duplicates.
	let overlappingParAndLocMemsDedup = ret.overlappingParAndLocMemsDedup = {}; //name => true
	let parMems = ret.parMems = [];
	let parMemsDedup = ret.parMemsDedup = {}; //name => true
	let locMems = ret.locMems = []; //loc doesnt exist in input or output in cpu, but make an Ap.Mem for it anyways for testing andOr logging about loc memory indexs.
	let locMemsDedup = ret.locMemsDedup = {}; //name => true
	let bigMems = ret.bigMems = [];
	let bigMemsDedup = ret.bigMemsDedup = {}; //name => true

	//let constInt = (js?'const ':'const int ');
	ret.overlappingParAndLocMem_offset = {}; //string -> int offset where array starts
	for(let overlappingParAndLocMem of overlappingParAndLocMems){
		if(!overlappingParAndLocMem.name){
			Err('Mem must have name: '+overlappingParAndLocMem);
		}
		if(!overlappingParAndLocMemsDedup[overlappingParAndLocMem.name]){ //else would be duplicates in Mem.childs that are not in mem.nameToPtr, mem.nameToSize, etc
			overlappingParAndLocMemsDedup[overlappingParAndLocMem.name] = true;
			overlappingParAndLocMems_deduped.push(overlappingParAndLocMem);
			parMems.push(overlappingParAndLocMem);
			locMems.push(overlappingParAndLocMem);
			if(Ap.logMems) console.log('overlappingParAndLocMem='+overlappingParAndLocMem);
			let size = overlappingParAndLocMem.size();
			let apeType = overlappingParAndLocMem.apeType; //'parlocMem' or 'locparMem'
			//beforeCode += Ap.nline(tablev)+constInt+overlappingParAndLocMem.OffsetName()+' = '+offset+'; //array offset in parMem and locMem ('+apeType+')';
			//beforeCode += Ap.nline(tablev)+constInt+overlappingParAndLocMem.SizeName()+' = '+size+'; //array size in parMem and locMem ('+apeType+')';
			ret.overlappingParAndLocMem_offset[overlappingParAndLocMem.name] = offset;
			offset += size;
			if(offset > 3000){ //FIXME get this var from somewhere, maybe in TinyGlsl. max something (var name). As of 2023-10-14 tinyGlsl doesnt have a localparMem or bigMem, just parrMem.
				Err('localparMemOffset='+offset+' so far, which is too big. the last bigMemApe is '+bigMemApe);
			}
		}
	}
	if(offset != overlappingParAndLocMems_sizeInFloats){
		Err('offset='+offset+' but overlappingParAndLocMems_sizeInFloats='+overlappingParAndLocMems_sizeInFloats);
	}

	//offset starts at overlappingParAndLocMems_sizeInFloats. Start there in parMem, after those that overlap in parMem and locMem.
	ret.parOnlyMem_offset = {}; //string -> int offset where array starts
	for(let parOnlyMem of parOnlyMems){
		if(!parOnlyMem.name){
			Err('Mem must have name: '+parOnlyMem);
		}
		if(!parMemsDedup[parOnlyMem.name]){ //else would be duplicates in Mem.childs that are not in mem.nameToPtr, mem.nameToSize, etc
			parMemsDedup[parOnlyMem.name] = true;
			parMems.push(parOnlyMem);
			if(Ap.logMems) console.log('parOnlyMem='+parOnlyMem);
			let size = parOnlyMem.size();
			//beforeCode += Ap.nline(tablev)+constInt+parOnlyMem.OffsetName()+' = '+offset+'; //array offset in parMem  (after overlapping par and loc mems)';
			//beforeCode += Ap.nline(tablev)+constInt+parOnlyMem.SizeName()+' = '+size+'; //array size in parMem  (after overlapping par and loc mems)';
			ret.parOnlyMem_offset[parOnlyMem.name] = offset;
			offset += size;
			if(offset > 3000){ //FIXME get this var from somewhere, maybe in TinyGlsl. max something (var name). As of 2023-10-14 tinyGlsl doesnt have a localparMem or bigMem, just parrMem.
				Err('parOnlyMemOffset='+offset+' so far, which is too big. the last bigMemApe is '+bigMemApe);
			}
		}
	}
	if(offset != overlappingParAndLocMems_sizeInFloats+parOnlyMems_sizeInFloats){
		Err('offset('+offset+') != overlappingParAndLocMems_sizeInFloats('+overlappingParAndLocMems_sizeInFloats+')+parOnlyMems_sizeInFloats('+parOnlyMems_sizeInFloats+')');
	}

	offset = overlappingParAndLocMems_sizeInFloats; //start there in locMem, after those that overlap in parMem and locMem.
	ret.locOnlyMem_offset = {}; //string -> int offset where array starts
	for(let locOnlyMem of locOnlyMems){
		if(!locOnlyMem.name){
			Err('Mem must have name: '+locOnlyMem);
		}
		if(!locMemsDedup[locOnlyMem.name]){ //else would be duplicates in Mem.childs that are not in mem.nameToPtr, mem.nameToSize, etc
			locMemsDedup[locOnlyMem.name] = true;
			locMems.push(locOnlyMem);
			if(Ap.logMems) console.log('locOnlyMem='+locOnlyMem);
			let size = locOnlyMem.size();
			//beforeCode += Ap.nline(tablev)+constInt+locOnlyMem.OffsetName()+' = '+offset+'; //array offset in locMem (after overlapping par and loc mems)';
			//beforeCode += Ap.nline(tablev)+constInt+locOnlyMem.SizeName()+' = '+size+'; //array size in locMem  (after overlapping par and loc mems)';
			ret.locOnlyMem_offset[locOnlyMem.name] = offset;
			offset += size;
			if(offset > 3000){ //FIXME get this var from somewhere, maybe in TinyGlsl. max something (var name). As of 2023-10-14 tinyGlsl doesnt have a localparMem or bigMem, just parrMem.
				Err('parOnlyMemOffset='+offset+' so far, which is too big. the last bigMemApe is '+bigMemApe);
			}
		}
	}
	if(offset != overlappingParAndLocMems_sizeInFloats+locOnlyMems_sizeInFloats){
		Err('offset != overlappingParAndLocMems_sizeInFloats+locOnlyMems_sizeInFloats');
	}

	offset = 0; //doesnt overlap parMem or locMem, so start at 0.
	ret.bigMem_offset = {}; //string -> int offset where array starts
	for(let bigMemApe of bigOnlyMems){
		if(!bigMemApe.name){
			Err('Mem must have name: '+bigMemApe);
		}
		if(!bigMemsDedup[bigMemApe.name]){ //else would be duplicates in Mem.childs that are not in mem.nameToPtr, mem.nameToSize, etc
			bigMemsDedup[bigMemApe.name] = true;
			bigMems.push(bigMemApe);
			let size = bigMemApe.size();
			//beforeCode += Ap.nline(tablev)+constInt+bigMemApe.OffsetName()+' = '+offset+'; //array offset in bigMem';
			//beforeCode += Ap.nline(tablev)+constInt+bigMemApe.SizeName()+' = '+size+'; //array size in bigMem';
			ret.bigMem_offset[bigMemApe.name] = offset;
			offset += size;
		}
	}
	if(offset != bigOnlyMems_sizeInFloats){
		Err('offset != bigOnlyMems_sizeInFloats');
	}

	if(par_sizeInFloats != overlappingParAndLocMems_sizeInFloats){
		let s = 'WARNING: TODO this (par and loc not being same size) has not been tested much and will likely break. see the gradient code in codeMaker that loops over par and loc. par_sizeInFloats='+par_sizeInFloats+' overlappingParAndLocMems_sizeInFloats='+overlappingParAndLocMems_sizeInFloats;
		//console.log(s);
		//Err(s);
		console.error(s);
	}

	return this.parseMemsEtc_ = ret; //return it from cache next time
};

//find or create the cx param for ape.updateApeSize(cx). Reuses whatever codeMap was created by toCodeMap,
//or picks the first one in {} if multiple. Returns it from this.cx_ if exists, so only computes it the first time.
Ap.Ape.prototype.cx = function(){
	/*ret.par_sizeInFloats = overlappingParAndLocMems_sizeInFloats+parOnlyMems_sizeInFloats;
	let loc_sizeInFloats = ret.loc_sizeInFloats = overlappingParAndLocMems_sizeInFloats+locOnlyMems_sizeInFloats;
	let big_sizeInFloats = ret.big_sizeInFloats = bigOnlyMems_sizeInFloats;
	*/
	/*if(!this.cx_){
		let cache = this.compiled || (this.compiled = {});
		for(let lang in cache){
			//could be 'glsl', 'js', 'jsEvan', etc, but im not sure if all of those create the parSize locSize and bigSize. I know glsl does.
			let c = cache[lang];
			if(c.par_sizeInFloats !== undefined && c.loc_sizeInFloats !== undefined && c.big_sizeInFloats !== undefined){
				this.cx_ = {parSize: c.par_sizeInFloats, locSize: c.loc_sizeInFloats, bigSize: c.big_sizeInFloats};
			}
		}
		//else create an entry in cache and recurse 1 call deep.
		this.toCodeMap('glsl'); //fills this.compiled.glsl
		return this.cx();
	}
	return this.cx_;
	*/
	if(!this.cx_){
		/*infinte loop cuz they call eachother. let codeMap = this.getFirstCodeMapOrMakeOne();
		this.cx_ = {
			type: 'ap_cx',
			parSize: codeMap.par_sizeInFloats,
			locSize: codeMap.loc_sizeInFloats,
			bigSize: codeMap.big_sizeInFloats
		};*/
		this.cx_ = this.deepGetParLocBigSizes();
		console.log('set ape.cx_ = '+JSON.stringify(this.cx_)+' of ape=\n'+this);
	}
	return this.cx_;
};

//uses this ape as the top ape, computing parSize, locSize, and bigSize in childs recursively from that,
//which includes arrays that are not reachable from a child ape still affecting that ape.apeSize if it includes (par) (loc) or (big).
//2024-9-8 this is meant to be a replacement for second pass of ape updateApeSize, but it might end up being a third pass
//cuz of "ugly hack" of Ap.singleThreadedSharedTempVars. This calls that second pass with a cx param.
//If the bug "2024-9-5 see below [found the problem. (par) is 10 in (oo {gradientCopyIndexUglyHackForDisplay copy (par)} <[(loc) gradientCopyIndexUglyHackForDisplay] [(par) gradientCopyIndexUglyHackForDisplay]>).]."
//comes up again then call this and see if that fixes it. 
//The bug is reproduced by running this code, cuz it has <10 instead of <60 in the generated glsl code...
/*
TinyGlsl.callListener = callMap=>console.log(TinyGlsl.callMapToJsCode(callMap));


TinyGlsl.simple(`
float loc[60]; //contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.
const int balls_o = 0; //array offset in parMem and locMem (locparMem)
const int balls_s = 24; //array size in parMem and locMem (locparMem)
const int V_o = 24; //array offset in parMem and locMem (locparMem)
const int V_s = 1; //array size in parMem and locMem (locparMem)
const int curveGrabMid_o = 25; //array offset in parMem and locMem (locparMem)
const int curveGrabMid_s = 12; //array size in parMem and locMem (locparMem)
const int circHeaders_o = 37; //array offset in parMem and locMem (locparMem)
const int circHeaders_s = 8; //array size in parMem and locMem (locparMem)
const int aftrans_o = 45; //array offset in parMem and locMem (locparMem)
const int aftrans_s = 4; //array size in parMem and locMem (locparMem)
const int c0_abc_o = 49; //array offset in parMem and locMem (locparMem)
const int c0_abc_s = 1; //array size in parMem and locMem (locparMem)
const int c1_position_o = 50; //array offset in parMem and locMem (locparMem)
const int c1_position_s = 10; //array size in parMem and locMem (locparMem)
float epsilon_f = 0.;
float isDisplayElsePotensForGradient_f = 0.;
float pairBallDist_f = 0.;
float heightASum_f = 0.;
float heightBSum_f = 0.;
float pixDistSum_f = 0.;
float pixBalSum_f = 0.;
float pixelY_f = 0.;
float pixelX_f = 0.;
float afAddY_f = 0.;
float afAddX_f = 0.;
float afMagnifyY_f = 0.;
float afMagnifyX_f = 0.;
float y_f = 0.;
float x_f = 0.;
float potenOne_f = 0.;
float cy_f = 0.;
float cx_f = 0.;
float cr_f = 0.;
float circInfluence_f = 0.;
float circWindow_f = 0.;
float potenCirc_f = 0.;
float c1_hypercubewaveStdDevOfCorners_f = 0.;
float c1_hypercubewaveWeight_f = 0.;
float c1_scaleHypercubewaveSize_f = 0.;
float c1_sumAllCornerBellCurves_f = 0.;
float c1_hyperCornerY_f = 0.;
float c1_hyperCornerX_f = 0.;
float c1_cornerParity_f = 0.;
float c1_dimParity_f = 0.;
float c1_dy_f = 0.;
float c1_dx_f = 0.;
float c1_distance_f = 0.;
float c1_distanceAsStdDev_f = 0.;
float c1_bellHeight_f = 0.;
float c1_parityFlippedBellHeight_f = 0.;
float otherBallWeight_f = 0.;
float otherBallY_f = 0.;
float otherBallX_f = 0.;
float ballOrDisplayYX_vs_otherBall_distance_f = 0.;
float potenSum_f = 0.;
const int par_o = 0; //view of whole (par) shared array
const int loc_o = 0; //view of whole (loc) shared array
const int big_o = 0; //view of whole (big) shared array
const int par_s = 60; //size of (par) shared array
const int loc_s = 60; //size of (loc) shared array
const int big_s = 0; //size of (big) shared array
float addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap_u(float pairBallDist_f){
return (
		8.05 *
		pow(
			
			max(
				0.,
				(
					0.07 -
					pairBallDist_f))/0.07,
			2.));
}`,`for(int i=0; i<60; i++) loc[i] = 0.; //Ap.fillLocWithAll0sRightAfterCreate
int c1_loopSize_i = (
	1 <<
	5);
epsilon_f = 0.0009765625;(
	42. +
	42. +
	42. +
	42.);
isDisplayElsePotensForGradient_f = 1.;
for(int gradientCopyIndexUglyHackForDisplay_i=0; gradientCopyIndexUglyHackForDisplay_i<10; gradientCopyIndexUglyHackForDisplay_i++){
	loc[loc_o+gradientCopyIndexUglyHackForDisplay_i] = par[par_o+gradientCopyIndexUglyHackForDisplay_i];
}
//Not defining apeType=? here cuz it goes before main(): addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap(pairBallDist);
for(int loopSize1TodoRemoveLoopInThisCase_i=0; loopSize1TodoRemoveLoopInThisCase_i<1; loopSize1TodoRemoveLoopInThisCase_i++){
	heightASum_f = 0.;
	heightBSum_f = 0.;
	pixDistSum_f = 0.;
	pixBalSum_f = 0.;
	pixelY_f = float((
			id /
			600));
	pixelX_f = float((
			id %
			600));
	afAddY_f = loc[aftrans_o+0];
	afAddX_f = loc[aftrans_o+1];
	afMagnifyY_f = loc[aftrans_o+2];
	afMagnifyX_f = loc[aftrans_o+3];
	y_f = (
			pixelY_f -
			afAddY_f)/afMagnifyY_f;
	x_f = (
			pixelX_f -
			afAddX_f)/afMagnifyX_f;
	potenOne_f = 0.;
	int numCircs_i = 0; //listLoop iter {numCircs 2}
	
	cy_f = loc[circHeaders_o+numCircs_i*4+0];
	cx_f = loc[circHeaders_o+numCircs_i*4+1];
	cr_f = loc[circHeaders_o+numCircs_i*4+2];
	circInfluence_f = loc[circHeaders_o+numCircs_i*4+3];
	circWindow_f = ((length(vec2(
					(
						cy_f -
						y_f),
					(
						cx_f -
						x_f)))<cr_f) ? 1. : 0.);
	potenCirc_f = 0.;
	//in {+ ...}, isDeclaringMem c0_abc
	potenCirc_f = 0.;
	
	potenOne_f += (
			potenCirc_f *
			circInfluence_f *
			circWindow_f);
	numCircs_i = 1; //listLoop iter {numCircs 2}
	
	cy_f = loc[circHeaders_o+numCircs_i*4+0];
	cx_f = loc[circHeaders_o+numCircs_i*4+1];
	cr_f = loc[circHeaders_o+numCircs_i*4+2];
	circInfluence_f = loc[circHeaders_o+numCircs_i*4+3];
	circWindow_f = ((length(vec2(
					(
						cy_f -
						y_f),
					(
						cx_f -
						x_f)))<cr_f) ? 1. : 0.);
	potenCirc_f = 0.;
	//in {+ ...}, isDeclaringMem c1_position
	for(int c1_p_i=0; c1_p_i<10; c1_p_i++){
		potenCirc_f += (
				0.0993 *
				pow(
					loc[c1_position_o+c1_p_i],
					2.));
	}
	//in {+ ...}, isDeclaringMem c1_loopSize
	c1_hypercubewaveStdDevOfCorners_f = 0.09;
	c1_hypercubewaveWeight_f = 333.02865;
	c1_scaleHypercubewaveSize_f = 0.1;
	//in {+ ...}, isDeclaringMem c1_sumAllCornerBellCurves
	for(int c1_corner_i=0; c1_corner_i<c1_loopSize_i; c1_corner_i++){
		c1_hyperCornerY_f = 0.;
		c1_hyperCornerX_f = 0.;
		c1_cornerParity_f = 1.;
		for(int c1_hypercubeDims_i=0; c1_hypercubeDims_i<5; c1_hypercubeDims_i++){
			c1_dimParity_f = (
					(
						2. *
						float((
							(
								c1_corner_i >>
								c1_hypercubeDims_i) &
							1))) -
					1.);
			c1_cornerParity_f *= c1_dimParity_f;
			c1_hyperCornerY_f += (
					c1_dimParity_f *
					loc[c1_position_o+c1_hypercubeDims_i*2+0]);
			c1_hyperCornerX_f += (
					c1_dimParity_f *
					loc[c1_position_o+c1_hypercubeDims_i*2+1]);
		}
		c1_hyperCornerY_f *= c1_scaleHypercubewaveSize_f;
		c1_hyperCornerX_f *= c1_scaleHypercubewaveSize_f;
		c1_dy_f = (
				c1_hyperCornerY_f -
				y_f);
		c1_dx_f = (
				c1_hyperCornerX_f -
				x_f);
		c1_distance_f = length(vec2(
				c1_dy_f,
				c1_dx_f));
		c1_distanceAsStdDev_f = c1_distance_f/c1_hypercubewaveStdDevOfCorners_f;
		c1_bellHeight_f = exp(
					-0.5 *
					pow(
						c1_distanceAsStdDev_f,
						2.));
		c1_parityFlippedBellHeight_f = (
				c1_bellHeight_f *
				c1_cornerParity_f);
		c1_sumAllCornerBellCurves_f += (
				c1_hypercubewaveWeight_f *
				c1_parityFlippedBellHeight_f);
	}
	potenCirc_f += c1_sumAllCornerBellCurves_f;
	potenCirc_f += x_f;
	
	potenOne_f += (
			potenCirc_f *
			circInfluence_f *
			circWindow_f);
	for(int otherBall_i=0; otherBall_i<12; otherBall_i++){
		otherBallWeight_f = 1.;
		otherBallY_f = loc[balls_o+otherBall_i*2+0];
		otherBallX_f = loc[balls_o+otherBall_i*2+1];
		ballOrDisplayYX_vs_otherBall_distance_f = length(vec2(
				(
					y_f -
					otherBallY_f),
				(
					x_f -
					otherBallX_f)));
		potenOne_f += (
				otherBallWeight_f *
				
				addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap_u(
					ballOrDisplayYX_vs_otherBall_distance_f));
	}
	potenSum_f += potenOne_f;
}
ret = potenSum_f;`,
Float32Array.of(-20,-20,-8.553068161010742,-1.8158272504806519,3.6904540061950684,20,-18.75564956665039,-12.1903657913208,-4.42930269241333,6.432510852813721,3.2369556427001953,-8.006919860839844,-11.223258972167969,-20,0.6197731494903564,-7.756478309631348,0.8963925838470459,12.85467529296875,-20,-17.471420288085938,7.04562520980835,5.37131404876709,-14.148713111877441,-1.918107032775879,0,-2,-2,-2,-2,2,2,2,-2,-2,2,2,2,0,0,10000,1,0.39808711409568787,0.2621694505214691,3.288344383239746,1,274.41302490234375,334.6575927734375,44.6169319152832,44.6169319152832,0.5037955641746521,1.6338043212890625,-0.37462273240089417,-20,-3.615325927734375,16.878705978393555,20,-20,0.9753764867782593,-20,-15.235151290893555),
Float32Array.of(),
500,540,1)
//end TinyGLSL.simple call.

I evaled that in a new browser tab of dagball.html. It returned:
Float32Array(270000) [0, 0, 0, 0, 0, 0,
270k 0s.
*/
Ap.Ape.prototype.updateApeSizeTop = function(){
	let cx = this.cx();
	this.secondPassOfUpdateApeSize(cx); //is like this.updateApeSize(cx) but ends recursion where !this.containsParLocBig.
};

//used by ape.cx(). It doesnt care which codeMap it gets parSize, locSize, and bigSize from. Defaults to glsl if there isnt one yet.
Ap.Ape.prototype.getFirstCodeMapOrMakeOne = function(){
	let cache = this.compiled || (this.compiled = {});
	for(let lang in cache){
		return cache[lang];
	}
	return this.toCodeMap('glsl'); //fills this.compiled.glsl
};

//returns from cache if call for same lang at same ape again.
//lang is 'js' or 'glsl' or 'jsEvan'. This is for evalGpuMain and evalCpuMain. im undecided if its also for evanCpuMain (which seems to go thru apCall.toCode('js') as of 2024-7-21 and earlier).
//Its not for evalCpuMainParloc or evanCpuMainParloc cuz those would reuse those after parloc is generated in a different Ape.
Ap.Ape.prototype.toCodeMap = function(lang){
	let cache = this.compiled || (this.compiled = {});
	if(cache[lang]){
		return cache[lang];
	}

	//only the first time (fills this.cx_ cache). par loc and big size should be computed correctly by ape.size()
	//in all childs recursively after calling this from here, an ape that can reach them thru its childs recursively.
	this.updateApeSizeTop();

	if(this.apeType == 'gpucpu'){
		return this.childs[0].toCodeMap(lang); //the gpu part of gpucpu is first param. second param is cpu diffeq part.
	}

	let ret = {type: 'ap_codeMap', lang: lang};
	let beforeCode = '';
	let code = '';

	let tablev = 0;

	if(lang != 'js' && lang != 'glsl' && lang != 'jsEvan') Err('lang='+lang);
	
	let js = lang=='js' || lang == 'jsEvan';

	let numGpuThreads = 1; //FIXME its call.numGpuThreads, not ape.numGpuThreads. since its js it does 1 thread. GPU does many.

	if(lang == 'jsEvan'){ //for evanCpuMain and evanCpuMainParloc, which are js lambdas of par loc and big Float32Arrays that efficiently return a double/float for many millions of calls per second.
		let jsCodeMap = this.toCodeMap('js'); //recurse toCodeMap, then change that js code of a func body to a whole lambda (par,loc,big,vel,dvel,dpos,dfriction)=>{...}.
		let useBeforeCode = jsCodeMap.beforeCode;
		let useCode = jsCodeMap.code;
		
		let prefix = Ap.jsDiffeqPrefix+' //lang='+lang; //let prefix = '((par,loc,big,vel,dvel,dpos,dfriction)=>{//reads these. can write loc, dvel, and dpos. par, big, and vel should be used as readonly.\n';
		//let mid = 'const y_f = 0; //fIXME y_f or just y?\n';
		//mid += 'const x_f = 0; //fIXME x_f or just x?\n';
		let mid = '\n';
		if(!useBeforeCode.includes(' ids = ')){ //was already put there by the recursive this.toCodeMap('js')
			mid += 'const ids = '+numGpuThreads+'; //FIXME ids_i or just ids?\n';
		}
		mid += 'let ret = 0;\n';
		mid += 'let retb = 0; //TODO check if code contains retb retc retd and only include these if so\n';
		mid += 'let retc = 0;\n';
		mid += 'let retd = 0;\n';
		let suffix = '';
		if(this.numGpuThreads == 1){ //TODO merge duplicate code, search for "if(this.numGpuThreads == 1)"
			mid += 'const id = 0; //(jsEvan). only 1 id so not making loop\n'; //TODO optimize, leave this loop out and just set id to 0, if this.numGpuThreads is 1.
		}else{
			mid += 'for(let id=0; id<ids; id++){ //(jsEvan)\n'; //TODO optimize, leave this loop out and just set id to 0, if this.numGpuThreads is 1.
			//let suffix = '}\n';
			suffix += '}\n';
		}
		suffix += Ap.jsDiffeqSuffix; //suffix += '\n})';
		//toCodeMap doesnt specify number of threads: if(this.floatsPerGpuThread != 1){
		//	Todo('floatsPerGpuThread='+this.floatsPerGpuThread+' but only coded it for 1 so far. In GPU it can be 1 or 4. Its ignoring the apeType="return" and'+
		//		'getting arrays to return from dpos and dvel. To return many floats at once is why I switched to CPU for this calculation.');
		//}``
		
		code = prefix+useBeforeCode+mid+useCode+suffix;
		/*//beforeCode += Ap.nline(tablev)+'float loc['+loc_sizeInFloats+']; //contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.';
		code = code.replaceAll('float loc[', '//not in js: float loc[');
		code = code.replaceAll('uniform float vel[', '//not in js: uniform float vel[');
		code = code.replaceAll('float dvel[', '//not in js: float dvel[');
		code = code.replaceAll('float dpos[', '//not in js: float dpos[');
		code = code.replaceAll('int ', 'let '); //FIXME what if a var name ends with 'int'? check for whitespace before it or it being first char
		code = code.replaceAll('float ', 'let '); //FIXME what if a var name ends with 'float'? check for whitespace before it or it being first char
		code = code.replaceAll('const let ', 'const ');
		code = code.replaceAll('float(', '('); //leaves an extra (...) in some cases but should still work in js.
		//code = code.replaceAll('}const', '}; const');
		//code = code.replaceAll('}let', '}; let');
		*/


		//if(!code.endsWith('}')){
		if(!code.endsWith('})')){
		//	//Err('code does not end with }: '+code);
			Err('code does not end with }): '+code);
		}
		//for circ.cpuCall which is an Ap.Call of prefix+circ.text+suffix, for generated prefix and constant suffix,
		//if circ.cpuCall exists. Return poten that is given 1 [y,x] at a time in cpuHeaders. TODO make this work 2024-6-2+.
		//code = code.substring(0,code.length-1)+'\nreturn ret;\n}'; //but ret doesnt exist at this level.
		//It exists in TinyGlsl. Use apeType 'return' in ape V2 ('freturn' in apeV1) instead. Use (return potenCirc$) in ape code instead of at GLSL level here.
		code = code.substring(0,code.length-2)+'\nreturn ret;\n})';
		if(Ap.addLineNumbersToGeneratedJsCode) code = TinyGlsl.addLineNumbers(code);
		//return code;
	}else{ //not jsEvan. Make js or glsl code.

		let p = this.parseMems();

		if(p.loc_sizeInFloats){
			if(lang=='js'){
				//beforeCode += Ap.nline(tablev)+'//for js, not defining here: float loc['+loc_sizeInFloats+']; //contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.';
				beforeCode += '//js not creating loc array here cuz it should be a js lambda param'
			}else{
				beforeCode += Ap.nline(tablev)+'float loc['+p.loc_sizeInFloats+']; //contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.';
			}
			//code += Ap.nline(tablev)+'float loc['+loc_sizeInFloats+']; //contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.';
			if(Ap.fillLocWithAll0sRightAfterCreate){
				//if(!js && Ap.optionalLineBeforeEachLoopInGLSL){
				if(Ap.optionalLineBeforeEachLoopInGLSL){ //FIXME if theres gpucpu then need to put this into the js version but then remove it cuz using replaceAll it makes it with js then converts to glsl?
					//code += Ap.nline(tablev)+'#pragma loop'; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
					code += Ap.nline(tablev)+Ap.optionalLineBeforeEachLoopInGLSL; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
					//code += Ap.optionalLineBeforeEachLoopInGLSL;
				}
				code += Ap.nline(tablev)+'for('+(js?'let':'int')+' i=0; i<'+p.loc_sizeInFloats+'; i++) loc[i] = 0.; //Ap.fillLocWithAll0sRightAfterCreate';
			}
		}
		if(Ap.numExtraFloatsFIXME){
			code += Ap.nline(tablev)+'float extraFloatsFIXME['+Ap.numExtraFloatsFIXME+']; //See onlyLowestIndexedNBallsRollOnCurvesTheOthersJustDoVelocity bug 2023-12-2, trying to fix it';
		}

		let constInt = (js?'const ':'const int ');
		//for(let overlappingParAndLocMem of p.overlappingParAndLocMems){
		for(let overlappingParAndLocMem of p.overlappingParAndLocMems_deduped){
			//if(!overlappingParAndLocMem.name){
			//	Err('Mem must have name: '+overlappingParAndLocMem);
			//}
			//if(!overlappingParAndLocMemsDedup[overlappingParAndLocMem.name]){ //else would be duplicates in Mem.childs that are not in mem.nameToPtr, mem.nameToSize, etc
			//	overlappingParAndLocMemsDedup[overlappingParAndLocMem.name] = true;
			//	parMems.push(overlappingParAndLocMem);
			//	locMems.push(overlappingParAndLocMem);
				if(Ap.logMems) console.log('overlappingParAndLocMem='+overlappingParAndLocMem);
				let offset = p.overlappingParAndLocMem_offset[overlappingParAndLocMem.name];
				let size = overlappingParAndLocMem.size();
				let apeType = overlappingParAndLocMem.apeType; //'parlocMem' or 'locparMem'
				beforeCode += Ap.nline(tablev)+constInt+overlappingParAndLocMem.OffsetName()+' = '+offset+'; //array offset in parMem and locMem ('+apeType+')';
				beforeCode += Ap.nline(tablev)+constInt+overlappingParAndLocMem.SizeName()+' = '+size+'; //array size in parMem and locMem ('+apeType+')';
				//offset += size;
			//	if(offset > 3000){ //FIXME get this var from somewhere, maybe in TinyGlsl. max something (var name). As of 2023-10-14 tinyGlsl doesnt have a localparMem or bigMem, just parrMem.
			//		throw 'localparMemOffset='+offset+' so far, which is too big. the last bigMemApe is '+bigMemApe;
			//	}
			//}
		}
		//if(offset != overlappingParAndLocMems_sizeInFloats){
		//	Err('offset='+offset+' but overlappingParAndLocMems_sizeInFloats='+overlappingParAndLocMems_sizeInFloats);
		//}

		//offset starts at overlappingParAndLocMems_sizeInFloats. Start there in parMem, after those that overlap in parMem and locMem.
		for(let parOnlyMem of p.parOnlyMems){
			if(Ap.logMems) console.log('parOnlyMem='+parOnlyMem);
			let size = parOnlyMem.size();
			let offset = ret.parOnlyMem_offset[parOnlyMem.name];
			beforeCode += Ap.nline(tablev)+constInt+parOnlyMem.OffsetName()+' = '+offset+'; //array offset in parMem  (after overlapping par and loc mems)';
			beforeCode += Ap.nline(tablev)+constInt+parOnlyMem.SizeName()+' = '+size+'; //array size in parMem  (after overlapping par and loc mems)';
		}

		for(let locOnlyMem of p.locOnlyMems){
			if(Ap.logMems) console.log('locOnlyMem='+locOnlyMem);
			let size = locOnlyMem.size();
			let offset = ret.locOnlyMem_offset[locOnlyMem.name];
			beforeCode += Ap.nline(tablev)+constInt+locOnlyMem.OffsetName()+' = '+offset+'; //array offset in locMem (after overlapping par and loc mems)';
			beforeCode += Ap.nline(tablev)+constInt+locOnlyMem.SizeName()+' = '+size+'; //array size in locMem  (after overlapping par and loc mems)';
		}

		offset = 0; //doesnt overlap parMem or locMem, so start at 0.
		for(let bigMemApe of p.bigOnlyMems){
			if(!bigMemApe.name){
				Err('Mem must have name: '+bigMemApe);
			}
			if(!bigMemsDedup[bigMemApe.name]){ //else would be duplicates in Mem.childs that are not in mem.nameToPtr, mem.nameToSize, etc
				bigMemsDedup[bigMemApe.name] = true;
				bigMems.push(bigMemApe);
				let size = bigMemApe.size();
				beforeCode += Ap.nline(tablev)+constInt+bigMemApe.OffsetName()+' = '+offset+'; //array offset in bigMem';
				beforeCode += Ap.nline(tablev)+constInt+bigMemApe.SizeName()+' = '+size+'; //array size in bigMem';
				offset += size;
			}
		}
		if(offset != p.bigOnlyMems_sizeInFloats){
			Err('offset != bigOnlyMems_sizeInFloats');
		}


		for(let floatMemApe of p.floatOnlyMems){
			beforeCode += Ap.nline(tablev)+(js?'let ':'float ')+floatMemApe.FloatName()+' = 0.;';
		}

		for(let intMemApe of p.intOnlyMems){
			//Use .childs[0].toTinyGlslCodeRecurse cuz intMemApe.toTinyGlslCodeRecurse would just give its name, for when its used later in code.
			//it wont let me make it const: TinyGLSL.js:679 Uncaught Error: ERROR: 0:33: '=' : assigning non-constant to 'const mediump int'
			let forceInt = true;
			let valCode = intMemApe.childs.length ? intMemApe.childs[0].toTinyGlslCodeRecurse(lang,tablev,forceInt).trim() : '0';
			//beforeCode += Ap.nline(tablev)+'int '+intMemApe.LoopName()+' = '+valCode+';';
			code += Ap.nline(tablev)+'int '+intMemApe.LoopName()+' = '+valCode+';';
		}

		let includeDiffeqMems = p.includeDiffeqMems;
		beforeCode += Ap.nline(tablev)+constInt+'par_o = 0; //view of whole (par) shared array';
		beforeCode += Ap.nline(tablev)+constInt+'loc_o = 0; //view of whole (loc) shared array';
		beforeCode += Ap.nline(tablev)+constInt+'big_o = 0; //view of whole (big) shared array';
		if(includeDiffeqMems){
			beforeCode += Ap.nline(tablev)+constInt+'vel_o = 0; //readonly. view of whole (vel) shared array. normally only used in CPU.';
			beforeCode += Ap.nline(tablev)+constInt+'dvel_o = 0; //readwrite. view of whole (dvel) shared array. normally only used in CPU.';
			beforeCode += Ap.nline(tablev)+constInt+'dpos_o = 0; //readwrite. view of whole (pos) shared array. normally only used in CPU.';
		}

		beforeCode += Ap.nline(tablev)+constInt+'par_s = '+p.par_sizeInFloats+'; //size of (par) shared array';
		beforeCode += Ap.nline(tablev)+constInt+'loc_s = '+p.loc_sizeInFloats+'; //size of (loc) shared array';
		beforeCode += Ap.nline(tablev)+constInt+'big_s = '+p.big_sizeInFloats+'; //size of (big) shared array';
		if(includeDiffeqMems){
			//These will be included in Ap.Call similar to call.par call.loc and call.big.
			//vel is dagball.Ed.vel. par up to overlappingParAndLocMems_sizeInFloats-1 is dagball.Ed.pos. ed.pos += dt*pos; ed.vel += dt*dvel+gradient;
			beforeCode += Ap.nline(tablev)+constInt+'vel_s = '+p.overlappingParAndLocMems_sizeInFloats+'; //readonly. size of (vel) shared array. normally only used in CPU.';
			beforeCode += Ap.nline(tablev)+constInt+'dvel_s = '+p.overlappingParAndLocMems_sizeInFloats+'; //readwrite. size of (dvel) shared array. normally only used in CPU.';
			beforeCode += Ap.nline(tablev)+constInt+'dpos_s = '+p.overlappingParAndLocMems_sizeInFloats+'; //readwrite. size of (dpos) shared array. normally only used in CPU.';
			
			if(js){
				beforeCode += '//js not creating vel, dvel, and dpos arrays cuz those should come in js lambda params';
			}else{
				beforeCode += Ap.nline(tablev)+'uniform float vel['+p.loc_sizeInFloats+']; //fill from... dagball.Ed.vel and dagball.Ball.yv and ball.xv (x and y velocities). so multiple kinds of velocities go here.';
				beforeCode += Ap.nline(tablev)+'float dvel['+p.loc_sizeInFloats+']; //add to velocities for non-gradient changes to gameplay, like a powered pinball bumper.';
				beforeCode += Ap.nline(tablev)+'float dpos['+p.loc_sizeInFloats+']; //add to positions without going through velocities, for non-gradient changes to gameplay, like a powered pinball bumper.';
			}
			if(Ap.fillLocWithAll0sRightAfterCreate){
				//if(!js && Ap.optionalLineBeforeEachLoopInGLSL){
				if(Ap.optionalLineBeforeEachLoopInGLSL){ //FIXME if theres gpucpu then need to put this into the js version but then remove it cuz using replaceAll it makes it with js then converts to glsl?
					//code += Ap.nline(tablev)+'#pragma loop'; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
					code += Ap.nline(tablev)+Ap.optionalLineBeforeEachLoopInGLSL; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
					//code += Ap.optionalLineBeforeEachLoopInGLSL;
				}
				code += Ap.nline(tablev)+'for('+(js?'let':'int')+' i=0; i<'+p.overlappingParAndLocMems_sizeInFloats+'; i++){ //Ap.fillLocWithAll0sRightAfterCreate';
				//fill from dagball.Ed.vel and ball y and x velocities etc before calling this func. code += Ap.nline(tablev)+'	vel[i] = 0.;';
				code += Ap.nline(tablev)+'	dvel[i] = 0.;';
				code += Ap.nline(tablev)+'	dpos[i] = 0.;';
				code += Ap.nline(tablev)+'}';
			}
		}

		for(let funcApe of p.funcApes){
			//TODO merge duplicate code between Ape.jsLambdaCode and the "for(let funcApe of funcApes)" code in Ape.toMem
			let paramApes = funcApe.childs.slice(0,funcApe.childs.length-1);
			let funcBody = funcApe.childs[funcApe.childs.length-1];
			//FIXME allow float and int params
			if(js){
				beforeCode += Ap.nline(tablev)+'let '+funcApe.FuncName()+' = function('+
					paramApes.map(a=>(a.apeType=='int' ? a.LoopName() : a.FloatName())).join(', ')+'){\n';
			}else{
				beforeCode += Ap.nline(tablev)+(funcApe.evalsToInt() ? 'int ' : 'float ')+funcApe.FuncName()+
					'('+paramApes.map(a=>(a.apeType=='int' ? ('int '+a.LoopName()) : 'float '+a.FloatName())).join(', ')+'){\n';
			}
			let forceInt = false; //FIXME?
			let funcBodyCode = funcBody.toTinyGlslCodeRecurse(lang,tablev+1,forceInt);
			if(funcBodyCode.trim().endsWith(')')){ //is expr that returns float (or int sometimes? FIXME). Dont check if it starts with '(' cuz it might start with 'sin(' etc.
				funcBodyCode = Ap.prefixAndSuffixInsideWhitespace('return ',funcBodyCode,';');
			}else{
				//funcBodyCode = Ap.nline(tablev+1)+'float funcReturn = 0.;'+funcBodyCode+Ap.nline(tablev+1)+'return funcReturn;';
				funcBodyCode = Ap.nline(tablev+1)+(js?'let':'float')+' funcReturn = 0.;'+funcBodyCode+Ap.nline(tablev+1)+'return funcReturn;';
				//console.log('WARNING, did i fix this yet?.... apeType=func that does {* ...} or {+ ...} etc, loops and lists of code instead of just an expr (...).\nfuncBodyCode='+funcBodyCode);
				//Todo('apeType=func that does {* ...} or {+ ...} etc, loops and lists of code instead of just an expr (...)');
			}
			beforeCode += funcBodyCode;
			beforeCode += Ap.nline(tablev)+'}';
			if(js) beforeCode += ';';
		}

		let closeJsLoop543245 = false;
		if(lang=='js' && lang!='jsEvan'){ //If its jsEvan then it has different "if(this.numGpuThreads == 1)" code. If its glsl, then it sets id from idh and idw.
			if(numGpuThreads == 1){ //TODO merge duplicate code, search for "if(this.numGpuThreads == 1)"
				beforeCode += 'const '+(js?'':'int ')+'id = 0; //(not jsEvan) (js='+js+') only 1 id so not making loop\n'; //TODO optimize, leave this loop out and just set id to 0, if this.numGpuThreads is 1.
				beforeCode += 'const ids = '+numGpuThreads+'; //sdfkjfs\n';
			}else{
				beforeCode += '//WARNING: there should probably be only 1 thread, cuz its js and is not jsEvan, which means its probably diffeq.\n';
				beforeCode += 'for('+(js?'let':'int')+' id=0; id<ids; id++){ //(not jsEvan) (js='+js+') closeJsLoop543245\n'; //TODO optimize, leave this loop out and just set id to 0, if this.numGpuThreads is 1.
				closeJsLoop543245 = true; //add }
				//let suffix = '}\n';
				//suffix += '}\n';
			}
		}

		code += this.toTinyGlslCodeRecurse(lang,tablev);
		if(closeJsLoop543245){
			code += '\n} //closeJsLoop543245';
		}
		if(code.startsWith('\n')) code = code.substring(1);
		
		//creating Ap.Mem objects is for caller to do, not this Ap.Ape.prototype.toCodeMap.
		//let par = new Ap.Mem('par', parMems);
		//let loc = new Ap.Mem('loc', locMems); //loc only exists in GPU (or in CPU temp calculations if its compiled to javascript), not in input or output.
		//let big = new Ap.Mem('big', bigMems); //as of 2024-5-4 bigMem does not exist but will likely be added later using GLSL buffers andOr textures.
		//let vel = new Ap.Mem('vel', parMems);

		/*
		let thisApe = this;
		let makeCall = function(){
			//FIXME use nonempty Ap.Mem where mem.gobs (instead of mem.floats) is those gobs, instead of always Ap.emptyGobMem here.
			return new Ap.Call(thisApe, par, loc, big, vel, beforeCode, code, numGpuThreads, floatsPerGpuThread, Ap.emptyGobMem);
		};
		if(!optional_isSecondPass && this.containsParLocOrBig){
			//secondPassOfUpdateApeSize already does nothing if !containsParLocOrBig, but dont want to waste making second call.

			//only create this cuz it sets Ap.singleThreadedSharedTempVars.parSize .locSize and .bigSize
			//which {par}.size() {loc}.size() and {big}.size() returns in this.toMem(true). Then let the Ap.Call be garbage collected.
			//console.log('before secondPass makeCall, Ap.singleThreadedSharedTempVars='+JSON.stringify(Ap.singleThreadedSharedTempVars));
			makeCall();
			//console.log('after secondPass makeCall, Ap.singleThreadedSharedTempVars='+JSON.stringify(Ap.singleThreadedSharedTempVars));

			//console.log('ape.secondPassOfUpdateApeSize(), ape='+thisApe);
			thisApe.secondPassOfUpdateApeSize(); //par loc and big apeTypes have their size()/apeSize changed by creating the Ap.Call.

			//console.log('second toMem, this time toMem(true), ape='+thisApe);

			return thisApe.toMem(lang, true); //recurse: optional_isSecondPass is true in that call so it wont recurse again here.
		}else{ //toMem ends after 1 or 2 passes.
			return makeCall();
		}*/
	}

	if(js){
		//code = prefix+useBeforeCode+mid+useCode+suffix;
		//beforeCode += Ap.nline(tablev)+'float loc['+loc_sizeInFloats+']; //contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.';
		code = code.replaceAll('float loc[', '//not in js: float loc[');
		code = code.replaceAll('uniform float vel[', '//not in js: uniform float vel[');
		code = code.replaceAll('float dvel[', '//not in js: float dvel[');
		code = code.replaceAll('float dpos[', '//not in js: float dpos[');
		code = code.replaceAll('int ', 'let '); //FIXME what if a var name ends with 'int'? check for whitespace before it or it being first char
		code = code.replaceAll('float ', 'let '); //FIXME what if a var name ends with 'float'? check for whitespace before it or it being first char
		code = code.replaceAll('const let ', 'const ');
		code = code.replaceAll('float(', '('); //leaves an extra (...) in some cases but should still work in js.
		//code = code.replaceAll('}const', '}; const');
		//code = code.replaceAll('}let', '}; let');
	}

	ret.beforeCode = beforeCode;
	ret.code = code;
	return cache[lang] = ret;
};




Ap.Ape.prototype.toMem = function(){
	let p = this.parseMems();
	//let parFloats = new Float32Array(p.par_sizeInFloats);
	//let locFloats = new Float32Array(p.loc_sizeInFloats);
	//let bigFloats = new Float32Array(p.big_sizeInFloats);
	//let velFloats = new Float32Array(p.vel_sizeInFloats); //FIXME what size should vel be? Should it even be created if not doing diffeq (some of the 5 kinds of eval)?
	let par = new Ap.Mem('par', p.parMems);
	let loc = new Ap.Mem('loc', p.locMems);
	let big = new Ap.Mem('big', p.bigMems);
	let vel = new Ap.Mem('vel', p.velMems); //FIXME what size should vel be? Should it even be created if not doing diffeq (some of the 5 kinds of eval)?
	let beforeCode = '//DONT_USE_THIS_BEFORECODE'; //cuz changing to the 5 kinds of eval. it puts code in call.compiled.evalGpuMain .evanCpuMain etc.
	let code = '//DONT_USE_THIS_CODE';
	let numGpuThreads = 1;
	let floatsPerGpuThread = 1;
	return new Ap.Call(this, par, loc, big, vel, beforeCode, code, numGpuThreads, floatsPerGpuThread, []);
};

//Call this on the top ape you're about to run in GPU. Returns an Ap.Ape that you can put floats in
//since it has multiple apes as arrays but only 1 par mem theyre all in.
//You should probably leave optional_isSecondPass as undefined (dont give that param) since it calls itself once recursively deeper.
//2024-5-15 theres
Ap.Ape.prototype.toMem_OLD = function(lang, optional_isSecondPass){ //FIXME rename Ape.toMem to toCall since it returns an Ap.Call not an Ap.Mem (Call contains 3 Mems).
	//TODO make this ape.toMem func call parseMemsEtc. Move most of its code to there. Then move the rest of code generation (see 5 kinds of eval) somewhere else.
	Err('use ape.toMem() instead. TODO do this in some of the 5 kinds of eval, not here. Also remember theres 2 apes, apCall.ape and apCall.cpuApe, which always have the same array sizes and pointers and differ only by changing locparMems to parlocMems.');
	if(lang != 'js' && lang != 'glsl') Err('lang='+lang);
	//let lang = this.containsGpucpu ? 'js' : 'glsl'; //compileToLang
	//let lang = (this.containsGpucpu || this.preferCpu) ? 'js' : 'glsl'; //compileToLang. FIXME this lang and containsGpucpu and preferCpu stuff is spaghetti code.
	let js = lang=='js';
	//let js = Ap.lang=='js';

	let numGpuThreads = 1; //let numGpuThreads = 100; //FIXME take this param from where? or derive it somehow? make an apeType to specify it?
	let floatsPerGpuThread = 1; //let floatsPerGpuThread = 4; //must be 1 or 4 //FIXME take this param from where? or derive it somehow? make an apeType to specify it?
	let beforeCode = '';
	let code = '';
	//parlocMem and locparMem are a kind of array that exists both in parMem and locMem. One has parMem the default, and the other has locMem the default.
	let overlappingParAndLocMems = this.searchApes(ape=>(ape.apeType=='parlocMem') || ape.apeType=='locparMem'); //BUG missing (
	let parOnlyMems = this.searchApes(ape=>(ape.apeType=='parMem'));
	let locOnlyMems = this.searchApes(ape=>(ape.apeType=='locMem'));
	//let parMems = this.searchApes(ape=>(ape.apeType=='parMem') || ape.apeType=='parlocMem' || ape.apeType=='locparMem');
	//let locMems = this.searchApes(ape=>(ape.apeType=='locMem') || ape.apeType=='parlocMem' || ape.apeType=='locparMem');
	let bigOnlyMems = this.searchApes(ape=>(ape.apeType=='bigMem')); //as of 2023-11-3 this is for future expansion. TinyGlsl has a bigMem/big param but ignores it.
	let floatOnlyMems = this.searchApes(ape=>(ape.apeType=='float')); //GPU stack vars (not that stack exists, but its similar to CPU stack vars)

	let intOnlyMems = this.searchApes(ape=>(ape.apeType=='int')); //GPU pointer arithmetic, cant branch depending on float array contents but can based on int math on {id}. TODO also maybe allow these for computing sha256 etc?

	let overlappingParAndLocMems_sizeInFloats = overlappingParAndLocMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);
	let parOnlyMems_sizeInFloats = parOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);
	let locOnlyMems_sizeInFloats = locOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);
	let bigOnlyMems_sizeInFloats = bigOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);

	let par_sizeInFloats = overlappingParAndLocMems_sizeInFloats+parOnlyMems_sizeInFloats;
	let loc_sizeInFloats = overlappingParAndLocMems_sizeInFloats+locOnlyMems_sizeInFloats;
	let big_sizeInFloats = bigOnlyMems_sizeInFloats;
	let vel_sizeInFloats = ret.vel_sizeInFloats = overlappingParAndLocMems_sizeInFloats; //FIXME is this righut? or should it be par_sizeInFloats? What if this differs from velPtrs sum?


	let velPtrs = this.searchApes(ape=>(ape.apeType=='velPtr')); //FIXME make sure these are only read, never written except before the code starts.
	let dvelPtrs = this.searchApes(ape=>(ape.apeType=='dvelPtr')); //readwrite
	let dposPtrs = this.searchApes(ape=>(ape.apeType=='dposPtr')); //readwrite
	let includeDiffeqMems = !!(velPtrs.length || dvelPtrs.length || dposPtrs.length);


	//These end with _e from .StackName() instead of _f from .FloatName() and happen inside apeType='func' (not funk or call).
	//It remembers their prev value in the _e var, puts func params in them, then puts their prev value back since func is finished with them.
	//funk (notice the k instead of c) is faster cuz it doesnt remember prev float values and leaves them modified.
	let floatOnlyMemsUsedWithStackName = [];
	let floatOnlyMemsUsedWithStackName_set = new Set();
	for(let func of this.searchApes(ape=>(ape.apeType=='func'))){
		for(let i=0; i<func.childs.length-1; i++){
			let floatVar = func.childs[i];
			if(floatVar.apeType != 'float' && floatVar.apeType != '$') Err('Not a float var so cant be there in apeType=func. theFunc='+func);
			if(!floatOnlyMemsUsedWithStackName_set.has(floatVar)){
				floatOnlyMemsUsedWithStackName_set.add(floatVar);
				floatOnlyMemsUsedWithStackName.push(floatVar);
			}
		}
	}


	//TODO? {call {func (x pfloat) (y pfloat) {f+ x y}} 10 2} -> 12
	//or should they just be (x float) (y float)?
	let funcApes = this.searchApes(ape=>(ape.apeType=='?')); //'func' renamed to '?'


	
	//FIXME? (varName float) is counted as 0 floats cuz its not arrays. FIXME maybe it should be counted? Change updateApeSize if so.
	//let floatOnlyMems_sizeInFloats = bigOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);
	//if(floatOnlyMems_sizeInFloats != floatOnlyMems.length){
	//	throw 'Must be 1 float each';
	//}

	//console.error('FIXME sort mems considering that some overlap in parMem and locMem, and some are parMem only, and some are locMem only, etc.');
	//First parlocMems and locparMems. These arrays exist in both parMem and locMem.
	//Then fork that to append parMems on top of that, but only in parMem addresses.
	//Then fork that to append locMems on top of that, but only in locMem addresses.
	//bigMems dont overlap any of that so they start at 0.
	//float (floatMem, but its apeType is 'float') arent indexed like that and just use a float var name.



	if(bigOnlyMems && bigOnlyMems.length){
		Err('TODO bigMem. As of 2023-11-3 tinyGlsl has a bigMem/big param which will be a Float32Array but its ignored.');
	}

	//FIXME remove parrMem and localparMem. The new mem types are: parMem locMem locparMem parlocMem float bigMem.
	let parrMems = this.searchApes(ape=>(ape.apeType=='parrMem')); //TODO Removing these. FIXME 2024-7-21 parr has been gone for long time. Use parMem locMem locparMem parlocMem instead, and maybe someday also bigMem.
	let localparMems = this.searchApes(ape=>(ape.apeType=='localparMem')); //TODO Removing these
	if(parrMems.length){
		Err('Use locMem or locparMem or parlocMem, instead of parrMem.');
	}
	if(localparMems.length){
		Err('Use locMem or locparMem or parlocMem, instead of localparMem.');
	}

	let tablev = 0;
	//FIXME get this from oGlo/nGlo? But for now just hardcode this as 3 since theres {x} {y} {z} apeTypes.
	//2023-11-3 will remove this soon cuz all vars will be in ape. remove apeType of 'x' and 'y'.

	if(loc_sizeInFloats){
		if(lang=='js'){
			//beforeCode += Ap.nline(tablev)+'//for js, not defining here: float loc['+loc_sizeInFloats+']; //contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.';
			beforeCode += '//js not creating loc array here cuz it should be a js lambda param'
		}else{
			beforeCode += Ap.nline(tablev)+'float loc['+loc_sizeInFloats+']; //contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.';
		}
		//code += Ap.nline(tablev)+'float loc['+loc_sizeInFloats+']; //contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.';
		if(Ap.fillLocWithAll0sRightAfterCreate){
			//if(!js && Ap.optionalLineBeforeEachLoopInGLSL){
			if(Ap.optionalLineBeforeEachLoopInGLSL){ //FIXME if theres gpucpu then need to put this into the js version but then remove it cuz using replaceAll it makes it with js then converts to glsl?
				//code += Ap.nline(tablev)+'#pragma loop'; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
				code += Ap.nline(tablev)+Ap.optionalLineBeforeEachLoopInGLSL; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
				//code += Ap.optionalLineBeforeEachLoopInGLSL;
			}
			code += Ap.nline(tablev)+'for('+(js?'let':'int')+' i=0; i<'+loc_sizeInFloats+'; i++) loc[i] = 0.; //Ap.fillLocWithAll0sRightAfterCreate';
		}
	}
	if(Ap.numExtraFloatsFIXME){
		code += Ap.nline(tablev)+'float extraFloatsFIXME['+Ap.numExtraFloatsFIXME+']; //See onlyLowestIndexedNBallsRollOnCurvesTheOthersJustDoVelocity bug 2023-12-2, trying to fix it';
	}

	let offset = 0; //doesnt overlap parMem or locMem, so start at 0.

	//FIXME these dedup maps worked for not adding dups to [mem.nameToPtr, mem.nameToSize, etc] but
	//"let parOnlyMems_sizeInFloats = parOnlyMems.map(x=>x.size()).reduce((a,b)=>(a+b),0);" (and similar for loc and big) still had dups,
	//so im gonna try to dedup in ParseApe.toApe() TODO 2024-5-15+ NO dont do it there, make a separate dedup func and use it near codeMaker
	//which is where this started 2024-5-15 as it uses ape.toMemV() which forkEdits to replace some floatVals like 2.34 and 100 of Ape with [V 0] [V 15] etc,
	//which might be creating duplicates.
	let overlappingParAndLocMemsDedup = {}; //name => true
	let parMems = [];
	let parMemsDedup = {}; //name => true
	let locMems = []; //loc doesnt exist in input or output in cpu, but make an Ap.Mem for it anyways for testing andOr logging about loc memory indexs.
	let locMemsDedup = {}; //name => true
	let bigMems = [];
	let bigMemsDedup = {}; //name => true

	let constInt = (js?'const ':'const int ');
	for(let overlappingParAndLocMem of overlappingParAndLocMems){
		if(!overlappingParAndLocMem.name){
			Err('Mem must have name: '+overlappingParAndLocMem);
		}
		if(!overlappingParAndLocMemsDedup[overlappingParAndLocMem.name]){ //else would be duplicates in Mem.childs that are not in mem.nameToPtr, mem.nameToSize, etc
			overlappingParAndLocMemsDedup[overlappingParAndLocMem.name] = true;
			parMems.push(overlappingParAndLocMem);
			locMems.push(overlappingParAndLocMem);
			if(Ap.logMems) console.log('overlappingParAndLocMem='+overlappingParAndLocMem);
			let size = overlappingParAndLocMem.size();
			let apeType = overlappingParAndLocMem.apeType; //'parlocMem' or 'locparMem'
			beforeCode += Ap.nline(tablev)+constInt+overlappingParAndLocMem.OffsetName()+' = '+offset+'; //array offset in parMem and locMem ('+apeType+')';
			beforeCode += Ap.nline(tablev)+constInt+overlappingParAndLocMem.SizeName()+' = '+size+'; //array size in parMem and locMem ('+apeType+')';
			offset += size;
			if(offset > 3000){ //FIXME get this var from somewhere, maybe in TinyGlsl. max something (var name). As of 2023-10-14 tinyGlsl doesnt have a localparMem or bigMem, just parrMem.
				throw 'localparMemOffset='+offset+' so far, which is too big. the last bigMemApe is '+bigMemApe;
			}
		}
	}
	if(offset != overlappingParAndLocMems_sizeInFloats){
		Err('offset='+offset+' but overlappingParAndLocMems_sizeInFloats='+overlappingParAndLocMems_sizeInFloats);
	}

	//offset starts at overlappingParAndLocMems_sizeInFloats. Start there in parMem, after those that overlap in parMem and locMem.
	for(let parOnlyMem of parOnlyMems){
		if(!parOnlyMem.name){
			Err('Mem must have name: '+parOnlyMem);
		}
		if(!parMemsDedup[parOnlyMem.name]){ //else would be duplicates in Mem.childs that are not in mem.nameToPtr, mem.nameToSize, etc
			parMemsDedup[parOnlyMem.name] = true;
			parMems.push(parOnlyMem);
			if(Ap.logMems) console.log('parOnlyMem='+parOnlyMem);
			let size = parOnlyMem.size();
			beforeCode += Ap.nline(tablev)+constInt+parOnlyMem.OffsetName()+' = '+offset+'; //array offset in parMem  (after overlapping par and loc mems)';
			beforeCode += Ap.nline(tablev)+constInt+parOnlyMem.SizeName()+' = '+size+'; //array size in parMem  (after overlapping par and loc mems)';
			offset += size;
			if(offset > 3000){ //FIXME get this var from somewhere, maybe in TinyGlsl. max something (var name). As of 2023-10-14 tinyGlsl doesnt have a localparMem or bigMem, just parrMem.
				Err('parOnlyMemOffset='+offset+' so far, which is too big. the last bigMemApe is '+bigMemApe);
			}
		}
	}
	if(offset != overlappingParAndLocMems_sizeInFloats+parOnlyMems_sizeInFloats){
		Err('offset('+offset+') != overlappingParAndLocMems_sizeInFloats('+overlappingParAndLocMems_sizeInFloats+')+parOnlyMems_sizeInFloats('+parOnlyMems_sizeInFloats+')');
	}

	offset = overlappingParAndLocMems_sizeInFloats; //start there in locMem, after those that overlap in parMem and locMem.
	for(let locOnlyMem of locOnlyMems){
		if(!locOnlyMem.name){
			Err('Mem must have name: '+locOnlyMem);
		}
		if(!locMemsDedup[locOnlyMem.name]){ //else would be duplicates in Mem.childs that are not in mem.nameToPtr, mem.nameToSize, etc
			locMemsDedup[locOnlyMem.name] = true;
			locMems.push(locOnlyMem);
			if(Ap.logMems) console.log('locOnlyMem='+locOnlyMem);
			let size = locOnlyMem.size();
			beforeCode += Ap.nline(tablev)+constInt+locOnlyMem.OffsetName()+' = '+offset+'; //array offset in locMem (after overlapping par and loc mems)';
			beforeCode += Ap.nline(tablev)+constInt+locOnlyMem.SizeName()+' = '+size+'; //array size in locMem  (after overlapping par and loc mems)';
			offset += size;
			if(offset > 3000){ //FIXME get this var from somewhere, maybe in TinyGlsl. max something (var name). As of 2023-10-14 tinyGlsl doesnt have a localparMem or bigMem, just parrMem.
				Err('parOnlyMemOffset='+offset+' so far, which is too big. the last bigMemApe is '+bigMemApe);
			}
		}
	}
	if(offset != overlappingParAndLocMems_sizeInFloats+locOnlyMems_sizeInFloats){
		Err('offset != overlappingParAndLocMems_sizeInFloats+locOnlyMems_sizeInFloats');
	}
	

	
	/*code += '//FIXME this should be 0, remove {x} and {y} etc, derive them instead. parrMemOffset='+parrMemOffset;
	for(let parrMemApe of parrMems){
		//TODO merge duplicate code between parrMem, localparMem, and maybe bigMem
		//code += Ap.nline(tablev)+'parrMem TODO: '+parrMemAp.Name()+'['+parrMemAp.size()+']';
		let size = parrMemAp.size();
		code += Ap.nline(tablev)+'const int '+parrMemAp.OffsetName()+' = '+offset+'; //array offset in parrMem';
		code += Ap.nline(tablev)+'const int '+parrMemAp.SizeName()+' = '+size+'; //array size in parrMem';
		parrMemOffset += size;
		if(parrMemOffset > 1000){ //FIXME get this var from somewhere, maybe in TinyGlsl. max something (var name).
			throw 'parrMemOffset='+parrMemOffset+' so far, which is too big. the last parrMemApe is '+parrMemApe;
		}
	}

	for(let localparMemApe of localparMems){
		//TODO merge duplicate code between parrMem, localparMem, and maybe bigMem
		//code += Ap.nline(tablev)+'localparMem TODO: '+localparMemAp.Name()+'['+localparMemAp.size()+']';
		let size = localparMemAp.size();
		code += Ap.nline(tablev)+'const int '+localparMemAp.OffsetName()+' = '+offset+'; //array offset in localparMem';
		code += Ap.nline(tablev)+'const int '+localparMemAp.SizeName()+' = '+size+'; //array size in localparMem';
		localparMemOffset += size;
		if(parrMemOffset > 3000){ //FIXME get this var from somewhere, maybe in TinyGlsl. max something (var name). As of 2023-10-14 tinyGlsl doesnt have a localparMem or bigMem, just parrMem.
			throw 'localparMemOffset='+localparMemOffset+' so far, which is too big. the last localparMemApe is '+localparMemApe;
		}
	}*/

	offset = 0; //doesnt overlap parMem or locMem, so start at 0.
	for(let bigMemApe of bigOnlyMems){
		if(!bigMemApe.name){
			Err('Mem must have name: '+bigMemApe);
		}
		if(!bigMemsDedup[bigMemApe.name]){ //else would be duplicates in Mem.childs that are not in mem.nameToPtr, mem.nameToSize, etc
			bigMemsDedup[bigMemApe.name] = true;
			bigMems.push(bigMemApe);
			let size = bigMemApe.size();
			beforeCode += Ap.nline(tablev)+constInt+bigMemApe.OffsetName()+' = '+offset+'; //array offset in bigMem';
			beforeCode += Ap.nline(tablev)+constInt+bigMemApe.SizeName()+' = '+size+'; //array size in bigMem';
			offset += size;
		}
	}
	if(offset != bigOnlyMems_sizeInFloats){
		Err('offset != bigOnlyMems_sizeInFloats');
	}


	//TODO bigMem (that doesnt fit in GPU core)?
	for(let floatMemApe of floatOnlyMems){
		//code += Ap.nline(tablev)+'floatMem TODO: '+floatMemAp.Name();
		beforeCode += Ap.nline(tablev)+(js?'let ':'float ')+floatMemApe.FloatName()+' = 0.;';
		//code += Ap.nline(tablev)+'float '+floatMemApe.FloatName()+' = 0.;';
		//TODO do it here instead of later, but that wont get those with apeType='$' so doing it in separate loop: if(floatOnlyMemsUsedWithStackName_set.has(floatMemApe))
	}
	/*this was replaced by apeType='func' and apeType='call' 2023-11-26
	for(let floatMemApe of floatOnlyMemsUsedWithStackName){
		beforeCode += Ap.nline(tablev)+'float '+floatMemApe.StackName()+' = 0.;';
		if(floatMemApe === floatOnlyMemsUsedWithStackName[0]) code += ' //so can undo changes to '+floatMemApe.FloatName()+' when its used in apeType=call';
	}*/

	for(let intMemApe of intOnlyMems){
		if(intMemApe.childs.length > 1){
			throw 'apeType=int must have 0 or 1 childs. If 0, its first value is 0.0. If 1, its first value is set to that.Theres no child of the intMemApe. Thats supposed to be the code that sets its value in the same line of code that creates the int var in glsl.';
		}

		//Use .childs[0].toTinyGlslCodeRecurse cuz intMemApe.toTinyGlslCodeRecurse would just give its name, for when its used later in code.
		//it wont let me make it const: TinyGLSL.js:679 Uncaught Error: ERROR: 0:33: '=' : assigning non-constant to 'const mediump int'
		let forceInt = true;
		let valCode = intMemApe.childs.length ? intMemApe.childs[0].toTinyGlslCodeRecurse(lang,tablev,forceInt).trim() : '0';
		//beforeCode += Ap.nline(tablev)+'int '+intMemApe.LoopName()+' = '+valCode+';';
		code += Ap.nline(tablev)+'int '+intMemApe.LoopName()+' = '+valCode+';';
		//TODO? code += Ap.nline(tablev)+'int '+intMemApe.SizeName()+' = '+intMemApe.childs[0].toTinyGlslCodeRecurse(lang,tablev,forceInt).trim()+';';
	}

	/* 2023-11-11 before I finish writing this and uncomment it, the loop that was giving the problem is apeType of listLoop
	and its first child (the sizeApe) did not create an _i var in glsl, so fix that in glsl code generator,
	and just come back here if that doesnt fix it all.
	//A size ape has an integer as its apeType (FIXME is that a string or the number form of it? Probably string).
	//Examples: (sizeA 7) and (sizeB 10) in (matAB parMem (sizeA 7) (sizeB 10)). These must have _i and _s ints declared in glsl in case
	//they are used as loop vars or in [...ptr stuff...]. TODO ONLY if theyre used.
	for(let sizeApe of sizeApes){
		code += Ap.nline(tablev)+'int '+intMemApe.LoopName()+' = '+intMemApe.childs[0].toTinyGlslCodeRecurse(lang,tablev).trim()+';';
		//TODO? code += Ap.nline(tablev)+'int '+intMemApe.SizeName()+' = '+intMemApe.childs[0].toTinyGlslCodeRecurse(lang,tablev).trim()+';';
	}*/

	beforeCode += Ap.nline(tablev)+constInt+'par_o = 0; //view of whole (par) shared array';
	beforeCode += Ap.nline(tablev)+constInt+'loc_o = 0; //view of whole (loc) shared array';
	beforeCode += Ap.nline(tablev)+constInt+'big_o = 0; //view of whole (big) shared array';
	if(includeDiffeqMems){
		beforeCode += Ap.nline(tablev)+constInt+'vel_o = 0; //readonly. view of whole (vel) shared array. normally only used in CPU.';
		beforeCode += Ap.nline(tablev)+constInt+'dvel_o = 0; //readwrite. view of whole (dvel) shared array. normally only used in CPU.';
		beforeCode += Ap.nline(tablev)+constInt+'dpos_o = 0; //readwrite. view of whole (pos) shared array. normally only used in CPU.';
	}

	beforeCode += Ap.nline(tablev)+constInt+'par_s = '+par_sizeInFloats+'; //size of (par) shared array';
	beforeCode += Ap.nline(tablev)+constInt+'loc_s = '+loc_sizeInFloats+'; //size of (loc) shared array';
	beforeCode += Ap.nline(tablev)+constInt+'big_s = '+big_sizeInFloats+'; //size of (big) shared array';
	if(includeDiffeqMems){
		//These will be included in Ap.Call similar to call.par call.loc and call.big.
		//vel is dagball.Ed.vel. par up to overlappingParAndLocMems_sizeInFloats-1 is dagball.Ed.pos. ed.pos += dt*pos; ed.vel += dt*dvel+gradient;
		beforeCode += Ap.nline(tablev)+constInt+'vel_s = '+overlappingParAndLocMems_sizeInFloats+'; //readonly. size of (vel) shared array. normally only used in CPU.';
		beforeCode += Ap.nline(tablev)+constInt+'dvel_s = '+overlappingParAndLocMems_sizeInFloats+'; //readwrite. size of (dvel) shared array. normally only used in CPU.';
		beforeCode += Ap.nline(tablev)+constInt+'dpos_s = '+overlappingParAndLocMems_sizeInFloats+'; //readwrite. size of (dpos) shared array. normally only used in CPU.';
		
		if(js){
			beforeCode += '//js not creating vel, dvel, and dpos arrays cuz those should come in js lambda params';
		}else{
			beforeCode += Ap.nline(tablev)+'uniform float vel['+loc_sizeInFloats+']; //fill from... dagball.Ed.vel and dagball.Ball.yv and ball.xv (x and y velocities). so multiple kinds of velocities go here.';
			beforeCode += Ap.nline(tablev)+'float dvel['+loc_sizeInFloats+']; //add to velocities for non-gradient changes to gameplay, like a powered pinball bumper.';
			beforeCode += Ap.nline(tablev)+'float dpos['+loc_sizeInFloats+']; //add to positions without going through velocities, for non-gradient changes to gameplay, like a powered pinball bumper.';
		}
		if(Ap.fillLocWithAll0sRightAfterCreate){
			//if(!js && Ap.optionalLineBeforeEachLoopInGLSL){
			if(Ap.optionalLineBeforeEachLoopInGLSL){ //FIXME if theres gpucpu then need to put this into the js version but then remove it cuz using replaceAll it makes it with js then converts to glsl?
				//code += Ap.nline(tablev)+'#pragma loop'; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
				code += Ap.nline(tablev)+Ap.optionalLineBeforeEachLoopInGLSL; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
				//code += Ap.optionalLineBeforeEachLoopInGLSL;
			}
			code += Ap.nline(tablev)+'for('+(js?'let':'int')+' i=0; i<'+overlappingParAndLocMems_sizeInFloats+'; i++){ //Ap.fillLocWithAll0sRightAfterCreate';
			//fill from dagball.Ed.vel and ball y and x velocities etc before calling this func. code += Ap.nline(tablev)+'	vel[i] = 0.;';
			code += Ap.nline(tablev)+'	dvel[i] = 0.;';
			code += Ap.nline(tablev)+'	dpos[i] = 0.;';
			code += Ap.nline(tablev)+'}';
		}
	}
	/*I guess it has been tested A LITTLE, but not in dagball as of 2023-12-12+. commenting this out cuz its causing...
	ApGpuTester.html:1 Uncaught Error: TODO this has not been tested and will likely break. see the gradient code in codeMaker that loops over par and loc.
    at Err (Ap.js:1697:8)
    at Ap.Ape.toMem (Ap.js:3212:3)
    at Ap.lazyEvalOld (Ap.js:1544:35)
    at Ap.doComplexApeTests (Ap.js:4113:44)
	if(par_sizeInFloats != overlappingParAndLocMems_sizeInFloats){
		Err('TODO this has not been tested and will likely break. see the gradient code in codeMaker that loops over par and loc.');
	}*/
	if(par_sizeInFloats != overlappingParAndLocMems_sizeInFloats){
		let s = 'WARNING: TODO this (par and loc not being same size) has not been tested much and will likely break. see the gradient code in codeMaker that loops over par and loc. par_sizeInFloats='+par_sizeInFloats+' overlappingParAndLocMems_sizeInFloats='+overlappingParAndLocMems_sizeInFloats;
		//console.log(s);
		//Err(s);
		console.error(s);
	}

	for(let funcApe of funcApes){
		//TODO merge duplicate code between Ape.jsLambdaCode and the "for(let funcApe of funcApes)" code in Ape.toMem
		let paramApes = funcApe.childs.slice(0,funcApe.childs.length-1);
		let funcBody = funcApe.childs[funcApe.childs.length-1];
		//FIXME allow float and int params
		if(js){
			beforeCode += Ap.nline(tablev)+'let '+funcApe.FuncName()+' = function('+
				paramApes.map(a=>(a.apeType=='int' ? a.LoopName() : a.FloatName())).join(', ')+'){\n';
		}else{
			beforeCode += Ap.nline(tablev)+(funcApe.evalsToInt() ? 'int ' : 'float ')+funcApe.FuncName()+
				'('+paramApes.map(a=>(a.apeType=='int' ? ('int '+a.LoopName()) : 'float '+a.FloatName())).join(', ')+'){\n';
		}
		let forceInt = false; //FIXME?
		let funcBodyCode = funcBody.toTinyGlslCodeRecurse(lang,tablev+1,forceInt);
		if(funcBodyCode.trim().endsWith(')')){ //is expr that returns float (or int sometimes? FIXME). Dont check if it starts with '(' cuz it might start with 'sin(' etc.
			funcBodyCode = Ap.prefixAndSuffixInsideWhitespace('return ',funcBodyCode,';');
		}else{
			funcBodyCode = Ap.nline(tablev+1)+'float funcReturn = 0.;'+funcBodyCode+Ap.nline(tablev+1)+'return funcReturn;';
			//console.log('WARNING, did i fix this yet?.... apeType=func that does {* ...} or {+ ...} etc, loops and lists of code instead of just an expr (...).\nfuncBodyCode='+funcBodyCode);
			//Todo('apeType=func that does {* ...} or {+ ...} etc, loops and lists of code instead of just an expr (...)');
		}
		beforeCode += funcBodyCode;
		beforeCode += Ap.nline(tablev)+'}';
		if(js) beforeCode += ';';
	}

	code += this.toTinyGlslCodeRecurse(lang,tablev);
	if(code.startsWith('\n')) code = code.substring(1);
	//return code;
	/*return {
		type: 'ape_transpiledToTinyglsl',
		tinyglslBeforeCode: beforeCode,
		tinyglslCode: code,
		parSize: par_sizeInFloats,
		locSize: loc_sizeInFloats,
		bigSize: big_sizeInFloats,
	}*/
	
	let par = new Ap.Mem('par', parMems);
	let loc = new Ap.Mem('loc', locMems); //loc only exists in GPU (or in CPU temp calculations if its compiled to javascript), not in input or output.
	let big = new Ap.Mem('big', bigMems); //as of 2024-5-4 bigMem does not exist but will likely be added later using GLSL buffers andOr textures.


	//vel is only used if Ap.lang=='js' but it might get set later, and copy some stuff from an apCall to the next apCall (see call.updateCode())
	//Despite it might not be needed, create it here in all cases, but leave dpos and dvel to only exist in generated js code.
	//FIXME should vel always be same size as par? See overlappingParAndLocMems_sizeInFloats.
	//par is position. vel is velocity. This is how physics of the whole system works: par += dt*(dpos+vel); vel += dt*(dvel-gradient);
	let vel = new Ap.Mem('vel', parMems);


	/*return {
		type: 'ape_memsMap',
		tinyglslBeforeCode: beforeCode,
		tinyglslCode: code,
		par: par, //can write the floats here before calling GPU.
		loc: loc,
		big: big
	};*/
	
	/*let thisApe = this;
	let makeCall = function(){
		return new Ap.Call(thisApe, par, loc, big, beforeCode, code, numGpuThreads, floatsPerGpuThread);
	};
	let call = makeCall();
	if(thisApe.containsParLocOrBig){ //secondPassOfUpdateApeSize already does nothing if !containsParLocOrBig, but dont want to waste making second call.
		console.log('making call, second pass, secondPassOfUpdateApeSize, ape='+thisApe);
		thisApe.secondPassOfUpdateApeSize(); //par loc and big apeTypes have their size()/apeSize changed by creating the Ap.Call.
		call = makeCall();
	}
	return call;
	*/

	let thisApe = this;
	let makeCall = function(){
		//FIXME use nonempty Ap.Mem where mem.gobs (instead of mem.floats) is those gobs, instead of always Ap.emptyGobMem here.
		return new Ap.Call(thisApe, par, loc, big, vel, beforeCode, code, numGpuThreads, floatsPerGpuThread, Ap.emptyGobMem);
	};
	if(!optional_isSecondPass && this.containsParLocOrBig){
		//secondPassOfUpdateApeSize already does nothing if !containsParLocOrBig, but dont want to waste making second call.

		//only create this cuz it sets Ap.singleThreadedSharedTempVars.parSize .locSize and .bigSize
		//which {par}.size() {loc}.size() and {big}.size() returns in this.toMem(true). Then let the Ap.Call be garbage collected.
		//console.log('before secondPass makeCall, Ap.singleThreadedSharedTempVars='+JSON.stringify(Ap.singleThreadedSharedTempVars));
		makeCall();
		//console.log('after secondPass makeCall, Ap.singleThreadedSharedTempVars='+JSON.stringify(Ap.singleThreadedSharedTempVars));

		//console.log('ape.secondPassOfUpdateApeSize(), ape='+thisApe);
		thisApe.secondPassOfUpdateApeSize(); //par loc and big apeTypes have their size()/apeSize changed by creating the Ap.Call.

		//console.log('second toMem, this time toMem(true), ape='+thisApe);

		return thisApe.toMem(lang, true); //recurse: optional_isSecondPass is true in that call so it wont recurse again here.
	}else{ //toMem ends after 1 or 2 passes.
		return makeCall();
	}

	/*
	let thisApe = this;
	let makeCall = function(){
		return new Ap.Call(thisApe, par, loc, big, beforeCode, code, numGpuThreads, floatsPerGpuThread);
	};
	let call = makeCall();
	if(thisApe.containsParLocOrBig){ //secondPassOfUpdateApeSize already does nothing if !containsParLocOrBig, but dont want to waste making second call.
		console.log('making call, second pass, secondPassOfUpdateApeSize, ape='+thisApe);
		thisApe.secondPassOfUpdateApeSize(); //par loc and big apeTypes have their size()/apeSize changed by creating the Ap.Call.
		call = makeCall();
	}
	return call;
	*/
};

//2024-7-21+ should use the 5 kinds of eval instead, or maybe this will be a 6th kind? Its used for this, for example:
//dagball.defaultSlidersFunc = dagball.cachedApeFuncJs('{func? {ave float} {strength float} {pos float} (funcReturn (* (exp (* 7 strength)) strength (** (- pos ave) 2)))}');
//
//This should only be used if its an isolated lambda (else use Ape.toMem().code and .beforeCode), like this:
//As of 2023-12-30 this is the ball bounce math:
//dagball.addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap is:
//	`(addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap? (pairBallDist float)
//		{f* 8.05 {f** {f/ {fmax 0 {f- .07 pairBallDist}} .07} 2}}
//	)`,
Ap.Ape.prototype.jsLambdaCode = function(){
	//TODO merge duplicate code between Ape.jsLambdaCode and the "for(let funcApe of funcApes)" code in Ape.toMem
	let lang = 'js';
	let tablev = 0;
	let funcApe = this;
	let beforeCode = '';
	if(funcApe.apeType != '?') Err('Not a func/? ape. ape='+funcApe);
	let paramApes = funcApe.childs.slice(0,funcApe.childs.length-1);
	let funcBody = funcApe.childs[funcApe.childs.length-1];
	//FIXME allow float and int params
	//if(js){
		//beforeCode += Ap.nline(tablev)+'let '+funcApe.FuncName()+' = function('+
		beforeCode += '(function('+
			paramApes.map(a=>(a.apeType=='int' ? a.LoopName() : a.FloatName())).join(', ')+'){\n';
	//}else{
	//	beforeCode += Ap.nline(tablev)+(funcApe.evalsToInt() ? 'int ' : 'float ')+funcApe.FuncName()+
	//		'('+paramApes.map(a=>(a.apeType=='int' ? ('int '+a.LoopName()) : 'float '+a.FloatName())).join(', ')+'){\n';
	//}
	let forceInt = false; //FIXME?
	let funcBodyCode = funcBody.toTinyGlslCodeRecurse(lang,tablev+1,forceInt);
	if(funcBodyCode.trim().endsWith(')')){ //is expr that returns float (or int sometimes? FIXME). Dont check if it starts with '(' cuz it might start with 'sin(' etc.
		funcBodyCode = Ap.prefixAndSuffixInsideWhitespace('return ',funcBodyCode,';');
	}else{
		//funcBodyCode = Ap.nline(tablev+1)+'float funcReturn = 0.;'+funcBodyCode+Ap.nline(tablev+1)+'return funcReturn;';
		funcBodyCode = Ap.nline(tablev+1)+'let funcReturn = 0.;'+funcBodyCode+Ap.nline(tablev+1)+'return funcReturn;';
		//console.log('WARNING, did i fix this yet?.... apeType=func that does {* ...} or {+ ...} etc, loops and lists of code instead of just an expr (...).\nfuncBodyCode='+funcBodyCode);
		//Todo('apeType=func that does {* ...} or {+ ...} etc, loops and lists of code instead of just an expr (...)');
	}
	beforeCode += funcBodyCode;
	beforeCode += Ap.nline(tablev)+'}';
	//if(js) beforeCode += ';';
	beforeCode += ')';
	return beforeCode;
};

//allowed params of ape.toCode. (update: call.toCode using call.ape and other fields in call).
Ap.langs = ['glsl', 'js'];
//TODO? Ap.langs = ['glsl', 'js', 'webgpu', 'opencl'];

Ap.addLineNumbersToGeneratedJsCode = true;

Ap.indexOfClosingParen = (code,indexOfOpenParen)=>{
	if(code[indexOfOpenParen] != '(') Err('Not a paren at indexOfOpenParen='+indexOfOpenParen+' code='+code);
	let parenHeight = 1; //include first ( at indexOfOpenParen
	let i = indexOfOpenParen+1;
	for(let i=indexOfOpenParen+1; i<code.length; i++){
		if(code[i] == '(') parenHeight++;
		if(code[i] == ')') parenHeight--;
		if(parenHeight == 0) return i;
	}
	Err('Didnt find closing paren indexOfOpenParen='+indexOfOpenParen+' code='+code);
};

Ap.Call.prototype.toCode = function(lang){
	Err('Use the 5+ kinds of eval and toCodeMap instead');
	let useBeforeCode = this.beforeCode;
	let useCode = this.code;
	if(lang == 'js'){ //if this.compileLang is not already js then make a new Call that is in js, since thats where the code is generated.
		if(this.compileToLang == 'js'){ //base case, to avoid infinite loop or stack overflow
			//return this.beforeCode+'\n//js beforeCode above, js code below\n'+this.code;
			useBeforeCode = this.beforeCode;
			useCode = this.code;
			//continue to [old code that if js, partially translated glsl to js but left things like "sin(" as they are instead of converting to "Math.sin("].
		}else{
			let prevPreferCpu = this.ape.preferCpu;
			let prevApLang = Ap.lang;
			try{
				this.ape.preferCpu = true;
				Ap.lang = 'js';
				//remove the diffeq part of gpucpu (.childs[1]) if has that cuz thats compiled separately, else use the whole thing.
				let ape = this.ape.apeType=='gpucpu' ? this.ape.childs[0] : this.ape;
				if(ape !== this.ape){
					console.warn('Removing diffeq part of gpucpu. If the diffeq stuff (such as dpos dvel dfriction) doesnt work, this may have caused it. This is experimental code 2024-6-12 as circ.preferCpu was recently created. TODO.');
				}
				//let newCall = ape.toMem();
				let newCall = ape.toMem('js');
				return newCall.toCode('js');
			}finally{
				this.ape.preferCpu = prevPreferCpu;
				Ap.lang = prevApLang;
			}
		}
	}
	
	//START: old code that if js, partially translated glsl to js but left things like "sin(" as they are instead of converting to "Math.sin(".

	//FIXME this is supposed to happen in ape.toMem() where "let lang = this.containsGpucpu ? 'js' : 'glsl'; //compileToLang", and todo mod that code. now is 2024-6-3.
	//If do that, then wont have to translate glsl to js, would be js from the start.
	let prevLang = Ap.lang;
	if(lang !== undefined){ //ugly hack cuz some funcs have a lang param and some use Ap.lang. TODO make an Ap.Context object type or something for this, use as param?
		Ap.lang = lang;
	}
	//let prevLang = Ap.lang;
	try{
		//Ap.lang = lang || Ap.langs[0];
		if(lang=='js'){
			if(this.compileToLang != 'js'){
				this.updateCode();
				if(this.compileToLang != 'js'){
					Err('Call.compileToLang didnt change to js in call.updateCode().');
				}
			}
			let prefix = '((par,loc,big,vel,dvel,dpos,dfriction)=>{//reads these. can write loc, dvel, and dpos. par, big, and vel should be used as readonly.\n';
			//let mid = 'const y_f = 0; //fIXME y_f or just y?\n';
			//mid += 'const x_f = 0; //fIXME x_f or just x?\n';
			let mid = '\nconst ids = '+this.numGpuThreads+'; //FIXME ids_i or just ids?\n';
			mid += 'let ret = 0;\n';
			mid += 'let retb = 0; //TODO check if code contains retb retc retd and only include these if so\n';
			mid += 'let retc = 0;\n';
			mid += 'let retd = 0;\n';
			let suffix = '';
			if(this.numGpuThreads == 1){
				mid += 'const id = 0; //only 1 id so not making loop\n'; //TODO optimize, leave this loop out and just set id to 0, if this.numGpuThreads is 1.
			}else{
				mid += 'for(let id=0; id<ids; id++){\n'; //TODO optimize, leave this loop out and just set id to 0, if this.numGpuThreads is 1.
				let suffix = '}\n';
			}
			suffix += '\n})';
			if(this.floatsPerGpuThread != 1){
				Todo('floatsPerGpuThread='+this.floatsPerGpuThread+' but only coded it for 1 so far. In GPU it can be 1 or 4. Its ignoring the apeType="return" and'+
					'getting arrays to return from dpos and dvel. To return many floats at once is why I switched to CPU for this calculation.');
			}``
			let code = prefix+useBeforeCode+mid+useCode+suffix;
			//beforeCode += Ap.nline(tablev)+'float loc['+loc_sizeInFloats+']; //contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.';
			code = code.replaceAll('float loc[', '//not in js: float loc[');
			code = code.replaceAll('uniform float vel[', '//not in js: uniform float vel[');
			code = code.replaceAll('float dvel[', '//not in js: float dvel[');
			code = code.replaceAll('float dpos[', '//not in js: float dpos[');
			code = code.replaceAll('int ', 'let '); //FIXME what if a var name ends with 'int'? check for whitespace before it or it being first char
			code = code.replaceAll('float ', 'let '); //FIXME what if a var name ends with 'float'? check for whitespace before it or it being first char
			code = code.replaceAll('const let ', 'const ');
			code = code.replaceAll('float(', '('); //leaves an extra (...) in some cases but should still work in js.
			//code = code.replaceAll('}const', '}; const');
			//code = code.replaceAll('}let', '}; let');
			//if(!code.endsWith('}')){
			if(!code.endsWith('})')){
			//	//Err('code does not end with }: '+code);
				Err('code does not end with }): '+code);
			}
			//for circ.cpuCall which is an Ap.Call of prefix+circ.text+suffix, for generated prefix and constant suffix,
			//if circ.cpuCall exists. Return poten that is given 1 [y,x] at a time in cpuHeaders. TODO make this work 2024-6-2+.
			//code = code.substring(0,code.length-1)+'\nreturn ret;\n}'; //but ret doesnt exist at this level.
			//It exists in TinyGlsl. Use apeType 'return' in ape V2 ('freturn' in apeV1) instead. Use (return potenCirc$) in ape code instead of at GLSL level here.
			code = code.substring(0,code.length-2)+'\nreturn ret;\n})';
			if(Ap.addLineNumbersToGeneratedJsCode) code = TinyGlsl.addLineNumbers(code);
			return code;
		}else if(lang=='glsl'){
			//Err('As of 2024-5-16 this was not working and some other func [toTinyGlslCode says [Use ape.toMem().code and .beforeCode instead]] was making the glsl code instead');
			//return {beforeCode: this.beforeCode, code: this.code};
			return this.beforeCode+'\n'+this.code;
			//return apCall.code;
		}else Err('lang='+lang);
	}finally{ //ugly hack cuz some funcs have a lang param and some use Ap.lang. TODO make an Ap.Context object type or something for this, use as param?
		if(lang !== undefined){
			Ap.lang = prevLang;
		}
	}
	//END: old code that if js, partially translated glsl to js but left things like "sin(" as they are instead of converting to "Math.sin(".
};


/*Ap.Ape.prototype.toCode = function(lang){
	let prevLang = Ap.lang;
	try{
		Ap.lang = lang || Ap.langs[0];
		let apCall = this.toMem();
		if(lang=='js'){
			let code = apCall.beforeCode+apCall.code;
			code = code.replaceAll('int ', 'let '); //FIXME what if a var name ends with 'int'? check for whitespace before it or it being first char
			code = code.replaceAll('float ', 'let '); //FIXME what if a var name ends with 'float'? check for whitespace before it or it being first char
			code = code.replaceAll('const let ', 'const ');
			if(Ap.addLineNumbersToGeneratedJsCode) code = TinyGlsl.addLineNumbers(code);
			return code;
		}else if(lang=='glsl'){
			return apCall.code;
		}else Err('lang='+lang);
	}finally{
		Ap.lang = prevLang;
	}
};*/

//UPDATE 2023-11-6: returns a {tinyglslCode: '', tinyglslBeforeCode: '', ...}
Ap.Ape.prototype.toTinyGlslCode = function(){ //FIXME rename this 'toTinyGlslCode' to something like 'toMem' and put the beforeCode and code in there.
	//throw 'Use ape.toMem().tinyglslCode and .tinyglslBeforeCode instead';
	Err('Use ape.toMem().code and .beforeCode instead');
};

//toTinyGlslCodeRecurse may return something that evals to float, int, or evals to nothing such as loop/if/else/etc.
//If you want to change what it evals to, such as changing a (varNameX int ...computeFirstVal...) or {id} to a float, use this.
//If its already a float, leaves it as it is. Theres also a forceInt param in some funcs,
//but if its not given (optional param) or is false, it may be float or int depending on apeType.
Ap.Ape.prototype.floatCode = function(lang,tablev){
	Ap.checkLang(lang);
	let r = this.toTinyGlslCodeRecurse(lang,tablev);
	if(this.evalsToInt()){
		/*
		let trimmed = r.trim();
		let i = r.indexOf(trimmed);
		let a = r.substring(0,i);
		let b = r.substring(i,i+trimmed.length);
		let c = r.substring(i+trimmed.length);
		//r==(a+b+c). Put float( ... ) around it while keeping the outer whitespace.
		return a+'float('+b+')'+c; //glsl cast to float
		*/
		return Ap.prefixAndSuffixInsideWhitespace('float(',r,')');
	}else{
		return r;
	}
};

//Like Ap.Ape.prototype.floatCode, skips leading whitespace and puts prefix there, and puts suffix before trailing whitespace, but keeps such whitespaces.
Ap.prefixAndSuffixInsideWhitespace = function(prefix, str, suffix){
	let trimmed = str.trim();
	let i = str.indexOf(trimmed);
	let a = str.substring(0,i);
	let b = str.substring(i,i+trimmed.length);
	let c = str.substring(i+trimmed.length);
	return a+prefix+b+suffix+c;
};

Ap.Ape.prototype.evalsToInt = function(){
	if(this.apeType == '?'){ //func that can be call by '@'
		if(!this.childs.length) Err('No childs in func/?, ape='+this);
		return this.childs[this.childs.length-1].evalsToInt(); //last child in func/? is funcBody. func evals to int iff funcBody evals to int.
	}else if(this.apeType == '@'){ //call a func/'?'
		if(!this.childs.length) Err('No childs in @/call, ape='+this);
		return this.childs[0].evalsToInt(); //first child in call/@ is func/?. The call evals to int iff its func/? evals to int.
	}else{
		//TODO leave idy and idx just in tinyglsl, not available in ape cuz ape just chooses number of gpu threads then does pointer arithmetic.
		return this.apeType=='int' || this.apeType=='id' || this.apeType=='idy' || this.apeType=='idx' || this.apeType=='i%s' ||
		this.apeType=='imod' || this.apeType=='i/' || this.apeType=='i+' || this.apeType=='i&' || this.apeType=='i-' || this.apeType=='copy'; //dont include 'i==' cuz that evals to true/false. '@' is call. '?' is func.
	}
};

/*The forceInt param will not force int in most cases (FIXME) but will in this case:
was added 2023-11-16 for
"if(this.apeTypeIsSimpleSize()) code += forceInt ? this.LoopName() : ('float('+this.LoopName()+')');"
cuz the * and (gradientCopyIndex 4) and {i== gradientCopyIndex {id}} interacted to generate
this glsl code (float(gradientCopyIndex_i) == id) in:
for(int gradientCopyIndex_i=0; gradientCopyIndex_i<4; gradientCopyIndex_i++){ //49
	loc[loc_o+gradientCopyIndex_i] = ( //50
			par[par_o+gradientCopyIndex_i] + //51
			(( //52
					float(gradientCopyIndex_i) == //53
					id) ? 0. : epsilon_f)); //54
} //55
{+
	<(epsilon float) 1>
	(arrayX parMem {4})
	(arrayLocA locMem {2})
	(arrayLocB locMem {2})
	{* (gradientCopyIndex 4)
		<[{loc} gradientCopyIndex] {f+
			[{par} gradientCopyIndex]
			{?: {i== gradientCopyIndex {id}} 0 epsilon}
		}>
	}
	{freturn [arrayLocA 0%2] [arrayLocA 1%2] [arrayLocB 0%2] [arrayLocB 1%2]}
}

lang param is 'glsl' or 'js' (maybe others later).
*/
Ap.Ape.prototype.toTinyGlslCodeRecurse = function(lang, tablev, forceInt){
	Ap.checkLang(lang);
	if(typeof(tablev) != 'number') Err('tablev='+tablev);
	let code = '';
	//let js = Ap.lang=='js'; //else is 'glsl' since only those 2 langs 2023-12-11, and at that time am adding js, doesnt work yet.
	let js = lang=='js'; //else is 'glsl' since only those 2 langs 2023-12-11, and at that time am adding js, doesnt work yet.
	if(this.apeType == '*'){
		for(let c=0; c<this.childs.length-1; c++){
			let ch = this.childs[c];
			//code += Ap.nline(tablev+c)+'for(int '+ch.LoopName()+'=0; '+ch.LoopName()+'<'+ch.SizeName()+'; '+ch.LoopName()+'++){';
			//code += Ap.nline(tablev+c)+'for(int '+ch.LoopName()+'=0; '+ch.LoopName()+'<'+ch.size()+'; '+ch.LoopName()+'++){';
			
			//workaround for: Bug: for(int c0_corner_i=0; c0_corner_i<0; c0_corner_i++){ //131 but its supposed to be "(oo {corner copy loopSize}".
			//let end = ch.apeType=='int' ? ch.LoopName() : ch.size();
			let end = (ch.apeType=='copy' && ch.childs[0].apeType=='int') ? ch.childs[0].LoopName() : ch.size(); //FIXME
			//if(!js && Ap.optionalLineBeforeEachLoopInGLSL){
			if(Ap.optionalLineBeforeEachLoopInGLSL){ //FIXME if theres gpucpu then need to put this into the js version but then remove it cuz using replaceAll it makes it with js then converts to glsl?
				//code += Ap.nline(tablev)+'#pragma loop'; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
				code += Ap.nline(tablev+c)+Ap.optionalLineBeforeEachLoopInGLSL; //opposite of #pragma unroll. Is a hint to compiler to not unroll this loop so its faster to compile but slower to run.
				//code += Ap.optionalLineBeforeEachLoopInGLSL;
			}
			//code += Ap.nline(tablev+c)+'for(int '+ch.LoopName()+'=0; '+ch.LoopName()+'<'+end+'; '+ch.LoopName()+'++){';
			code += Ap.nline(tablev+c)+'for('+(js?'let':'int')+' '+ch.LoopName()+'=0; '+ch.LoopName()+'<'+end+'; '+ch.LoopName()+'++){';
		}
		let lastIndex = this.childs.length-1;
		let innermostFuncBodyGlslCode = this.childs[lastIndex].toTinyGlslCodeRecurse(lang,tablev+lastIndex,forceInt)
		if(innermostFuncBodyGlslCode.endsWith(')')){ //is an expr like sin(x_f*y_f) or (x_f*y_f).
			innermostFuncBodyGlslCode = Ap.prefixAndSuffixInsideWhitespace('',innermostFuncBodyGlslCode,';');
		}
		code += innermostFuncBodyGlslCode;
		for(let c=this.childs.length-2; c>=0; c--){
			let ch = this.childs[c];
			code += Ap.nline(tablev+c)+'}';
			if(Ap.toTinyGlslCode_putsLoopNameInClosingBraceComment){
				code += '//'+ch.Name();
			}
		}
		//code += Ap.nline(tablev)+'for(let '+this.Name()+'=0; '+this.Name()+'<TODO; '+this.Name()+'++){';
		//code += 'for(let '+this.Name()+'=0; '+this.Name()+'<'+this.childs[0].ptrCode(lang)+'.length; '+this.Name()+'++){\n';
		//FIXME gpt made up this.childs[0].ptrCode(lang), what should be there instead
		//code += Ap.nline(tablev+1)+'TODO inner loops/forks'+n;
		//code += Ap.nline(tablev)+'}'+n;
	}else if(this.apeType == 'i%s'){
		code += this.data.iter; //the ap code is this.iter+'%'+this.size and this.data is {floatVal:3, iter:3, size:8} if its 3%8
	}else if(this.apeType == 'iftri'){
		code += Ap.nline(tablev)+'if('+this.childs[0].LoopName()+'<'+this.childs[1].LoopName()+'){ //iftri. TODO optimize this as triangle loop if its parents can';
		code += this.childs[2].toTinyGlslCodeRecurse(lang,tablev+1,forceInt);
		code += Ap.nline(tablev)+'}';
	}else if(this.apeType == 'listLoop'){
		let listSize = this.childs.length-3;
		let iter = this.childs[0];
		//no, it has to be set just before each child starting at this.childs[3], not: code += Ap.nline(tablev)+'for(int '+iter.LoopName()+'=0; '+iter.LoopName()+'<'+iter.SizeName()+'; '+iter.LoopName()+'++){
		let beforeEach = this.childs[1];
		let afterEach = this.childs[2];
		let beforeEachStr = Ap.nline(tablev)+beforeEach.toTinyGlslCodeRecurse(lang,tablev,forceInt);
		let afterEachStr = Ap.nline(tablev)+afterEach.toTinyGlslCodeRecurse(lang,tablev,forceInt);
		//FIXME put a {...} glsl code block to isolate the declaration of iter.LoopName()? Also does [...ptr stuff...] need iter.SizeName()?
		//If so see "2023-11-11 before I finish writing this and uncomment it, the loop that was giving the problem is apeType of listLoop" comment in other code.
		let listIndex = 0;
		for(let i=3; i<this.childs.length; i++){
			code += Ap.nline(tablev)+(i==3?(js?'let ':'int '):'')+iter.LoopName()+' = '+(listIndex++)+'; //listLoop iter '+iter;
			code += beforeEachStr;
			code += Ap.nline(tablev)+this.childs[i].toTinyGlslCodeRecurse(lang,tablev,forceInt).trim();
			code += afterEachStr;
		}
	}else if(this.isDeclaringArrayMem()){
		code +=  Ap.nline(tablev)+'//isDeclaringMem apeType='+this.apeType+' name='+this.Name();
	//}else if(this.apeType == '+'){ //V2 syntax of + is (do ...), a list of statements to do in order. similar to * in V1 is (oo counterA counterB counterC... loopBody) in V2.
	}else if(this.apeType == '+' || this.apeType == 'gpucpu'){ //'+' in apeV1 syntax is 'do' in apeV2 syntax, a list of statements to do in order, a code block.
		//gpucpu and do are same except for in gpu, only the first param runs, and in cpu/js, both run.
		//V2 syntax of + is (do ...), a list of statements to do in order. similar to * in V1 is (oo counterA counterB counterC... loopBody) in V2.
		if(js){
			code += Ap.nline(tablev)+'{';
			tablev++;
		}
		for(let child of this.childs){
			if(child.isDeclaringMem()){ //FIXME this shouldnt be specific to "else if(this.apeType == '+')" and childs. Move it parallel to that.
				code +=  Ap.nline(tablev)+'//in {+ ...}, isDeclaringMem '+child.Name();
			}else{
				let innerCode = child.toTinyGlslCodeRecurse(lang,tablev,forceInt);
				if(innerCode.endsWith(')')){ //is an expr like sin(x_f*y_f) or (x_f*y_f).
					innerCode = Ap.prefixAndSuffixInsideWhitespace('',innerCode,';');
				}
				code += innerCode;
				//code += child.toTinyGlslCodeRecurse(lang,tablev,forceInt);
			}
		}
		if(js){
			tablev--;
			code +=  Ap.nline(tablev)+'}';
		}
	}else if(this.apeType == '?'){ //func. use with call/@
		//renamed 'func' to '?', and renamed 'call' to '@',
		//and am making parsing/tokenizing rules so (funcName? params... body) and {@funcName params...}
		/*}else if(this.apeType == 'funk' || this.apeType =='func'){
		if(this.apeType=='funk'){
			Err('Theres no funk anymore, only func. This is cuz the functions will be defined outside of GLSL main. this='+this);
		}
		*/

		//if(js) Todo('? func @ call compiled to js');

		let listOfParamNames = [];
		for(let c=0; c<this.childs.length-1; c++){
			//2023-11-28 starting to add apeType='int' being allowed in func/?/@ params. float or $ or int.
			let floatOrIntVar = this.childs[c];
			let isInt = floatOrIntVar.apeType == 'int';
			listOfParamNames.push(floatOrIntVar.Name());
			//if(floatVar.apeType != 'float' && floatVar.apeType != '$') Err(this.apeType+' childs['+c+'] '+param+' is not a float var (apeType of float or $)');
			if(floatOrIntVar.apeType != 'float' && floatOrIntVar.apeType != '$' && floatOrIntVar.apeType != 'int'){
				Err(this.apeType+' childs['+c+'] '+param+' is not a float var (apeType of float or $) or int var');
			}
		}
		//code += Ap.nline(tablev)+'//Not defining '+this.apeType+' here cuz call would inline it: '+this.Name()+'('+listOfParamNames.join(',')+')';
		code += Ap.nline(tablev)+'//Not defining apeType='+this.apeType+' here cuz it goes before main(): '+this.Name()+'('+listOfParamNames.join(',')+')';
	//}else if(this.apeType == 'call'){
	}else if(this.apeType == '@'){ //call (a func/? with params). 2023-11-26 renamed apeType='call' to apeType='@'.
		/*
		(funcName funk_or_func (paramA float) (paramB float)... funcBodyReturnsFloat)
		These do the same thing, which is set the float vals of paramA paramB...
		to the float vals in {call funcName 2 3...}, except func remembers their prev values and sets them back after.
		Funk is faster as it does not remember or set them back, so leaves those values modified.

		It has to be {call funcA ...} instead of just {funcA ...} cuz the first thing in {...} has to be the opcode/apeType,
		but I'll probably get tired of writing call and make a syntax for it. Will see how often it gets used.

		(funcWithFloatAndIntParams? (a float) (b int) (c float) {fsin {f* a [{par} b] c}}) 

		Renaming apeType='func' to apeType='?' and doing a similar parsing rule for '?' as '@'.
		ape: {+
			(arr locparMem {5})
			(funcA? (a float) (b float) {fsin {f* a b}}) 
			<potenCirc$
				{@funcA
					{@funcA x$ x$}
					{f* 3 y$}
				}
			>
		}

		This code tested 2023-11-26 and works:
		ape: {+
			(arr locparMem {5})
			(funcA func (a float) (b float) {fsin {f* a b}}) 
			<potenCirc$
				{@funcA
					{@funcA x$ x$}
					{f* 3 y$}
				}
			>
		}


		ape: {+
			(funcA func (a float) (b float) {fsin {f* a b}}) 
			<potenCirc$ {@funcA {@funcA x$ x$} {f* 3 y$}}>
		}

		This one is tested and works (old code before call/@ switch):
		ape: {+
			(funcA func (a float) (b float) {fsin {f* a b}}) 
			<potenCirc$ {call funcA {call funcA x$ x$} {f* 3 y$}}>
		}

		FIXME this Ap.Ape code hasnt been tested since it was written 2023-11-26 before func/funk/call apeTypes existed.
		ape: {+
			(funcA func (a float) (b float) {fsin {f* a b}}) 
			<potenCirc$ {call funcA x$ 1}>
		}

		FIXME this Ap.Ape code hasnt been tested since it was written 2023-11-26 before func/funk/call apeTypes existed.
		ape: {+
			(funcA funk (a float) (b float) {fsin {f* a b}}) 
			<potenCirc$ {call funcA x$ 1}>
		}

		FIXME this Ap.Ape code hasnt been tested since it was written 2023-11-26 before func/funk/call apeTypes existed.
		ape: {+
			(abc locparMem (numChainLinks 35) (yxSize 2))
			<(chainLinkDist float) .132>
			<(chainLinkHoleSize float) .1>
			(distSqFunc funk (fromY float) (fromX float) (toY float) (toX float)
				{f+ {fsqr {f- toY fromY}} {fsqr {f- toX fromX}}}
			)
			(doSpring funk fromY fromX toY toX (targetDist float) (exponent float) (scale float)
				{f+= potenCirc$ {f* scale
					{f**
						{f-
							targetDist
							{fhypot {f- toY fromY} {f- toX fromX}}
						}
						exponent
					}
				}}
			)
			{* numChainLinks {f+= potenCirc$ {f* -1.3 {fexp {f- {f*
				{call distSqFunc y$ x$
					[abc numChainLinks 0%2] [abc numChainLinks 1%2]
				}
				{f** chainLinkHoleSize -2}
			}}}}}}}
			{* (linkExceptLast exceptLast numChainLinks) {call doSpring
				[abc linkExceptLast 0%2] [abc linkExceptLast 1%2]
				[abc {i+1 linkExceptLast} 0%2] [abc {i+1 linkExceptLast} 1%2]
				chainLinkDist 2 .3
			}}
		}
		*/

		/* This is the incomplete old design 2023-11-26 that didnt work cuz GLSL cant set multiple float vars in a (...) expr (I was trying to use apeType=float as params).
		Instead Im going to define new functions outside of main() in GLSL, before main(), in the beforeCode var,
		and I moved most of the var declarations from inside main to before those.

		//if(this.childs.length < 1) throw this.apeType+' must have at least 1 param, the function body that returns a float. That comes after float var params.';
		if(this.childs.length < 1) Err(this.apeType+' must have at least 1 param, the func or funk to call, plus however many float params that function takes.');
		let funcOrFunk = this.childs[0];
		if(this.childs.length != funcOrFunk.childs.length) Err(this.apeType+' must have same number of params as'+
			' the func or funk it calls. call_'+this.childs.length+' vs funcOrFunk_'+funcOrFunk.childs.length);
		let listOfParamNames = [];
		for(let c=1; c<this.childs.length; c++) listOfParamNames.push(this.childs[c].Name());
		code += Ap.nline(tablev)+'//START '+this.Name()+'('+listOfParamNames.join(',')+')';
		if(funcOrFunk.apeType=='func'){
			for(let c=1; c<this.childs.length; c++){
				//(funcName func_or_funk (paramA float) (paramB float)... funcBodyReturnsFloat). First param is theFunc.childs[0] since params are before functionBody.
				//{call funcName valA valB ...}. First param is theCall.childs[1] which is right after the function to call.
				let floatVar = funcOrFunk.childs[c-1]; //apeType is float or $.
				let exprThatReturnsFloat = this.childs[c]; //apeType could be many possible things such as f+ f* fsin doLast floatVal float $.
				//FIXME use false instead of forceInt, since its always gonna be float?
				code += Ap.nline(tablev)+floatVar.StackName()+' = '+floatVar.FloatName()+'; '+floatVar.FloatName()+' = '+exprThatReturnsFloat.toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+';';
			}
		}
		code += funcOrFunk.toTinyGlslCodeRecurse(lang,tablev,forceInt); //FIXME use false instead of forceInt, since its always gonna be float?
		if(funcOrFunk.apeType=='func'){
			for(let c=1; c<this.childs.length; c++){
				let floatVar = funcOrFunk.childs[c-1]; //apeType is float or $.
				code += Ap.nline(tablev)+Ap.nline(tablev)+floatVar.FloatName()+' = '+floatVar.StackName()+';'; //put float vars back how they were before {call {func ...} ...}.
				if(c==1) code += ' //func puts float vars back how found them. funk would not.';
			}
		}else{ //funk
			code += Ap.nline(tablev)+'//funk leaves param float vars modified. func would not.';
		}
		//code += Ap.nline(tablev)+'//END {call '+this.Name()+' ...}';
		code += Ap.nline(tablev)+'//END '+this.Name()+'('+listOfParamNames.join(',')+')';
		*/
		
		//if(js) Todo('? func @ call compiled to js');

		//(funcName func (paramA float) (paramB float)... funcBodyReturnsFloat). First param is theFunc.childs[0] since params are before functionBody.
		//{call funcName valA valB ...}. First param is theCall.childs[1] which is right after the function to call.
		let func = this.childs[0];
		code +=  Ap.nline(tablev)+func.FuncName()+'(';
		for(let c=1; c<this.childs.length; c++){
			//let someKindOfFloatVarButAsParamOfTheFuncOutsideMain = func.childs[c-1]; //FIXME: what apeType? float or $ or make a new one?
			let someKindOfFloatOrIntVarButAsParamOfTheFuncOutsideMain = func.childs[c-1]; //FIXME: what apeType? float or $ or make a new one?
			let exprThatReturnsFloat = this.childs[c]; //apeType could be many possible things such as f+ f* fsin doLast floatVal float $.
			if(c>1) code += ', ';
			//code += Ap.nline(tablev+1)+someKindOfFloatVarButAsParamOfTheFuncOutsideMain.toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim();
			let forceInt = someKindOfFloatOrIntVarButAsParamOfTheFuncOutsideMain.apeType=='int';
			code += Ap.nline(tablev+1)+exprThatReturnsFloat.toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim();
		}
		code += ')';
	}else if(this.apeType == 'f='){
		if(this.childs.length != 2) throw 'f= must have 2 params';
		//code += Ap.nline(tablev)+this.childs[0].ptrCode(lang)+' = '+this.childs[1].toTinyGlslCodeRecurse(lang,tablev+1).trim()+';'; //FIXME make a func that does it in 1 line
		//FIXME verify if its a ptr or parPtr or velPtr etc that its allowed to write. some of the array types are supposed to be used as readonly. Throw if fails that check.
		let rvalue = forceInt ? this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1,forceInt) : this.childs[1].floatCode(lang,tablev+1).trim(); //TODO merge floatCode and toTinyGlslCodeRecurse and the forceInt param.
		code += Ap.nline(tablev)+this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1,forceInt)+' = '+rvalue+';'; //FIXME one line or multiline depending on length
	}else if(this.apeType == 'fsqr'){ //square it, multiply it by itself
		Todo('just use {f** thing 2} for now');
	}else if(this.apeType == 'f+='){
		code += Ap.nline(tablev)+this.childs[0].ptrCode(lang)+' += '+this.childs[1].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+';'; //FIXME make a func that does it in 1 line
	}else if(this.apeType == 'f*='){
		//FIXME if more params, * them all like in f*
		code += Ap.nline(tablev)+this.childs[0].ptrCode(lang)+' *= '+this.childs[1].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+';'; //FIXME make a func that does it in 1 line
	}else if(this.apeType == 'f/='){
		code += Ap.nline(tablev)+this.childs[0].ptrCode(lang)+' /= '+this.childs[1].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+';';
	}else if(this.apeType == 'f+'){
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev, '+');
	}else if(this.apeType == 'f-'){
		if(this.childs.length == 1){
			code += '-'+this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1).trim();
		}else if(this.childs.length == 2){
			code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev, '-');
		}else throw 'f- must have 1 or 2 params';
	}else if(this.apeType == 'f*'){
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev, '*');
		/*let multiLine = true; //FIXME check how long the line would be
		code += '(';
		for(let i=0; i<this.childs.length; i++){
			let ch = this.childs[i];
			if(i>0) code += ' * ';
			if(multiLine) code += Ap.nline(tablev+1)+ch.toTinyGlslCodeRecurse(lang,tablev+1);
			else code += ch.toTinyGlslCodeRecurse(lang,0).trim();
		}
		if(multiLine) code += Ap.nline(tablev);
		code += ')';
		//code += ';';
		*/
	}else if(this.apeType == 'fsigmoid'){
		code += '(1./(1.+'+(js?'Math.':'')+'exp(-'+this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+')))';
	}else if(this.apeType == 'fisNaN'){
		//FIXME dont expand the expr twice, but what its just a float var its not a problem
		if(this.childs.length != 1){
			throw 'fless must have 1 param but has '+this.childs.length;
		}
		let expandedExpr = this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim();
		code += '('+expandedExpr+'!='+expandedExpr+')'; //isNaN
	}else if(this.apeType == 'fless'){
		if(this.childs.length != 2){
			throw 'fless must have 2 params but has '+this.childs.length+' TODO allow 2+, meaning theyre ascending order';
		}
		code += '('+this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+'<'+this.childs[1].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+')';
	}else if(this.apeType == 'fmore'){
		if(this.childs.length != 2){
			throw 'fmore must have 2 params but has '+this.childs.length+' TODO allow 2+, meaning theyre descending order';
		}
		code += '('+this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+'>'+this.childs[1].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+')';
	}else if(this.apeType ==  '?:'){
		code += '('+this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+' ? '+this.childs[1].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+' : '+this.childs[2].toTinyGlslCodeRecurse(lang,tablev+1).trim()+')';
	}else if(this.apeType == 'fxtanh'){
		//Like tanh but exactly equals its param in range -1 to 1 and smoothly (using tanh) limits to range -2 to 1 as param ranges -Infinity to Infinity.
		//{?: {fless x 1} {f- {tanh {f+ x 1}} 1} {?: {fmore x 1} {f+ {tanh {f- x 1}} 1} x}}}
		//code += {?: {fless x 1} {f- {tanh {f+ x 1}} 1} {?: {fmore x 1} {f+ {tanh {f- x 1}} 1} x}}}
		//((x<1.) ? (tanh(x+1.)-1.) : ((x>1.) ? (tanh(x-1.)+1.) : x))
		//((temp1<1.) ? (tanh(temp1+1.)-1.) : ((temp1>1.) ? (tanh(temp1-1.)+1.) : temp1))
		if(this.childs.length != 1){
			throw 'fxtanh must have 1 param';
		}
		/*See this code in TinyGlsl.js:
		"TODO for funcs of up to 10 float params, math expressions to refer to child float outputs multiple times, etc.
		float temp0 = 0.; float temp1 = 0.; float temp2 = 0.; float temp3 = 0.; float temp4 = 0.;
		float temp5 = 0.; float temp6 = 0.; float temp7 = 0.; float temp8 = 0.; float temp9 = 0.;"
		*/
		let s = '(((temp1 = '+this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+')<1.) ? (tanh(temp1+1.)-1.) : ((temp1>1.) ? (tanh(temp1-1.)+1.) : temp1))';
		code += js ? s.replaceAll('tanh','Math.tanh') : s;

	//}else if(this.apeType == 'ffunc'){
	//	//function of up to 10 float params, that returns a float. Stores them in tinyglsl's temp0 to temp9 vars. My last param
	//	code += '//(((temp1 = '+this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1).trim();+')<1.) ? (tanh(temp1+1.)-1.) : ((temp1>1.) ? (tanh(temp1-1.)+1.) : temp1))';
	}else if(this.apeType == 'ftanh'){
		//code += 'tanh('+this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1).trim()+')';
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev,  js?'Math.tanh':'tanh');
	}else if(this.apeType == 'fatan'){
		if(this.childs.length != 1 && this.childs.length != 2){
			Err('fatan must have 1 or 2 params (for Math.atan(num) vs Math.atan2(y,x) in js, but its atan either way in GLSL) but has '+this.childs.length);
		}
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, js?((this.childs.length==2)?'Math.atan2':'Math.atan'):'atan');
		/*if(this.childs.length == 1){
			code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, 'atan');
		}else if(this.childs.length == 2){
			code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, 'atan2');
		}else{
			Err('fatan must have 1 or 2 params (for atan vs atan2) but has '+this.childs.length);
		}*/
	}else if(this.apeType == 'flog'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, js?'Math.log':'log');
	}else if(this.apeType == 'fsin'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, js?'Math.sin':'sin');
	}else if(this.apeType == 'fcos'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, js?'Math.cos':'cos');
	}else if(this.apeType == 'fsqrt'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, js?'Math.sqrt':'sqrt');
	}else if(this.apeType == 'fabs'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, js?'Math.abs':'abs');
	}else if(this.apeType == 'fhypot'){
		if(2 <= this.childs.length && this.childs.length <= 4){
			if(lang=='glsl'){
				code += 'length(vec'+this.childs.length+this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,',')+')';
				//Example: length(vec2(3., 4.)) returns 5 except roundoff
			}else if(lang=='js'){
				code += 'Math.hypot'+this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,',');
			}else Err('lang='+lang);
		}
	}else if(this.apeType == 'fmax'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, js?'Math.max':'max');
	}else if(this.apeType == 'fmin'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, js?'Math.min':'min');
	}else if(this.apeType == 'fmod'){
		//TODO bring this back after i put ape.floatCode(lang,tablev) in a more general place that affects all the code at once?
		/*
		You
		is it mod or fmod
		ChatGPT
		ChatGPT
		In GLSL ES, which is used for WebGL, the correct function for floating-point modulus is mod, not fmod. The fmod function is used
		in the standard GLSL (for OpenGL), but for WebGL and GLSL ES, you should use mod.
		*/
		if(js){
			code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,'%');
		}else{
			code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, 'mod'); //FIXME check for divide by 0? or just let it become NaN or plus/minus infinity?
		}

		//floatCode
	}else if(this.apeType == 'f/'){
		//code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, '/'); //FIXME check for divide by 0? or just let it become NaN or plus/minus infinity?
		code += Ap.nline(tablev)+this.childs[0].toTinyGlslCodeRecurse(lang,tablev,forceInt)+'/'+this.childs[1].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim();
	}else if(this.apeType == 'fexp'){
		code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, js?'Math.exp':'exp'); //FIXME is it fexp?
	}else if(this.apeType == 'f**'){
		//TODO...
		//See bug "TODO 2024-9-28+ change the ** (pow) op to always wrap its first param in max":
		//BROKEN when VArray 2024-9-28-350pET: nnet_1715185342.0410001.dagball
		//but mmMain:"TODO 2024-9-28+ change the ** (pow) op to always wrap its first param in max" will fix it.
		//WORKS when VArray 2024-9-28-350pET: nnet_1715185342.0410001.modifiedToFixNaNWhenVArrayCheckboxIsChecked.dagball
		//code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev, js?'Math.pow':'pow'); //FIXME is it fpow?
		if(this.childs.length != 2) Err('Wrong num of params of **/pow: '+this.childs.length);
		//let s = this.childs[0],toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev,max);
		let base = this.childs[0].toTinyGlslCodeRecurse(lang,tablev,forceInt);
		let exponent = this.childs[1].toTinyGlslCodeRecurse(lang,tablev,forceInt);
		//FIXME this might not indent well, very long lines in some cases, cuz of not using tablev
		if(js){
			code += '(Math.max(0,'+base+')**'+exponent+')';
		}else{
			code += 'pow(max(0.,'+base+'),'+exponent+')';
		}
	}else if(this.apeType == '$'){ //see potenCirc$ var in matmul test code 2023-11-9. Accesses a float var without declaring the var, expects it to be declared externally.
		code += this.FloatName();
	}else if(this.apeType == 'float'){ //a float var name
		//code += Ap.nline(tablev)+this.FloatName();
		code += this.FloatName();
	}else if(this.apeType == 'floatVal'){
		if(forceInt) code += (this.data.floatVal|0); //doubleOrFloat|0 casts to int
		else code += TinyGlsl.jsNumToGlslFloat(this.data.floatVal); //FIXME use lang param?
	}else if(this.apeType == 'funcReturn'){
		if(this.childs.length != 1) Err('funcReturn must have 1 param (thats evals to float) but has '+this.childs.length);
		//happens in apeType=='?' for defining func (that '@' apeType calls). Optionally inside that funcBody {funcReturn 5} or any float,
		//but similar to freturn it doesnt stop controlFlow. It just sets the funcReturn float var that gets returned at end of the ?/func.
		code += Ap.nline(tablev)+'funcReturn = '+this.childs[0].toTinyGlslCodeRecurse(lang,tablev+1,forceInt).trim()+';'; //FIXME use forceInt of false?
	}else if(this.apeType == 'freturn'){
		if(this.childs.length != 1 && this.childs.length != 4){
			throw 'x. Must be 1 or 4 childs if apeType freturn but is '+this.childs.length;
		}
		//code += Ap.nline(tablev)+'return '+this.childs[0].toTinyGlslCodeRecurse(lang,0).trim()+';'; //FIXME make a func that does it in 1 line
		if(this.childs.length == 1){
			//code += Ap.nline(tablev)+'fragColor = vec4('+this.childs[0].toTinyGlslCodeRecurse(lang,0).trim()+',0.,0.,0.); //return 1 float later';
			code += Ap.nline(tablev)+'ret = '+this.childs[0].toTinyGlslCodeRecurse(lang,0,forceInt).trim()+';';
		}else if(this.childs.length == 4){
			//code += Ap.nline(tablev)+'fragColor = vec4('+this.childs[0].toTinyGlslCodeRecurse(lang,0).trim()+','+this.childs[1].toTinyGlslCodeRecurse(lang,0).trim()+','+this.childs[2].toTinyGlslCodeRecurse(lang,0).trim()+','+this.childs[3].toTinyGlslCodeRecurse(lang,0).trim()+'); //return 4 floats later';
			code += Ap.nline(tablev)+'ret = '+this.childs[0].toTinyGlslCodeRecurse(lang,0,forceInt).trim()+';';
			code += Ap.nline(tablev)+'retb = '+this.childs[1].toTinyGlslCodeRecurse(lang,0,forceInt).trim()+';';
			code += Ap.nline(tablev)+'retc = '+this.childs[2].toTinyGlslCodeRecurse(lang,0,forceInt).trim()+';';
			code += Ap.nline(tablev)+'retd = '+this.childs[3].toTinyGlslCodeRecurse(lang,0,forceInt).trim()+';';
		}else throw 'this.childs.length=='+this.childs.length;
		//fragColor = vec4(ret, retb, retc, retd);
	}else if(this.apeType == 'imod'){
		//int mod like 12%5==2
		if(this.childs.length != 2){
			throw 'imod aka int mod int. Must be 2 childs but is '+this.childs.length;
		}

		//OLD: its mod, not %: code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,'%').trim();
		//throw 'FIXME this is for floats. do ints.';

		//FIXME should this |0 both vars to cast them to int?

		//Its int%int or mod(float,float). Since this (imod) is ints, use %.
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,'%',true).trim(); //true isInt
		//code += this.toTinyGlslCodeRecurse_tanhPowSinExpEtc(lang,tablev,'mod',true).trim(); //true isInt
	}else if(this.apeType == 'i=='){
		if(this.childs.length != 2){
			throw 'i== must be 2 childs but is '+this.childs.length;
		}
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,'==',true).trim(); //true isInt
	}else if(this.apeType == 'i/'){
		//int divide int, dropping remainder
		if(this.childs.length != 2){
			throw 'i/ aka int divide int. Must be 2 childs but is '+this.childs.length;
		}
		//throw 'FIXME this is for floats. do ints.';
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,'/',true).trim(); //true isInt
	}else if(this.apeType == 'i-'){
		//int minus int
		if(this.childs.length != 2){
			throw 'i- aka int minus int. Must be 2 childs but is '+this.childs.length;
		}
		//throw 'FIXME this is for floats. do ints.';
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,'-',true).trim(); //true isInt
	}else if(this.apeType == 'i+'){
		//int plus int
		if(this.childs.length != 2){
			throw 'i+ aka int minus int. Must be 2 childs but is '+this.childs.length;
		}
		//throw 'FIXME this is for floats. do ints.';
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,'+',true).trim(); //true isInt
	}else if(this.apeType == 'i&'){
		if(this.childs.length < 2){
			throw 'i& must be at least 2 childs but is '+this.childs.length;
		}
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,'&',true).trim(); //true isInt
	}else if(this.apeType == 'ishll'){ //aka <<
		if(this.childs.length != 2){
			throw 'ishll aka << must have 2 childs: '+this.childs.length;
		}
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,'<<',true).trim(); //true isInt
	}else if(this.apeType == 'ishrr'){ //aka >>
		if(this.childs.length != 2){
			throw 'ishrr aka >> must have 2 childs: '+this.childs.length;
		}
		code += this.toTinyGlslCodeRecurse_listOfMultiplyPlusEtc(lang,tablev,'>>',true).trim(); //true isInt
	}else if(this.apeType == 'flast'){ //get last float in an array
		//return this.childs[0].ArrayName()+'['+this.childs[0].SizeName()+'-1]';
		return this.childs[0].ArrayName()+'['+(this.childs[0].size()-1)+']';
	}else if(this.apeType == 'doLast'){
		if(this.childs.length < 1){
			throw 'Must be at least 1 child: '+this.childs.length;
		}
		//TODO might still be some arrays in the earlier childs need to allocate parr_vs_localpar_vs_stack_vs_bigGlobalMem
		code += this.childs[this.childs.length-1].toTinyGlslCodeRecurse(lang,tablev,forceInt); //last child
	}else if(this.isAPtr()){
		if(this.childs.length < 2){
			throw 'ptr. Must be at least 2 childs (arrayName and index, or can have multiple indexs or other ptr arithmetic) is '+this.childs.length;
		}
		//let sharedArrayName = this.apeType=='ptr' ? this.sharedArrayName() : this.apeType.substring(0,3); //else: par loc or big, force it to use a chosen shared array.
		let sharedArrayName = this.apeType=='ptr' ? this.sharedArrayName() : this.apeType.substring(0,this.apeType.indexOf('Ptr')); //par loc big vel dvel dpos
		let array = this.childs[0];
		if(this.childs.length == 2){
			//return this.childs[0].ArrayName()+'['+this.childs[1].LoopName()+']';
			return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].IndexExpr(lang)+']';
		}else if(this.childs.length == 3){
			//return this.childs[0].ArrayName()+'['+this.childs[1].LoopName()+'*'+this.childs[2].SizeName()+'+'+this.childs[2].LoopName()+']';
			//return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].LoopName()+'*'+this.childs[2].SizeName()+'+'+this.childs[2].LoopName()+']';
			return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].IndexExpr(lang)+'*'+this.childs[2].size()+'+'+this.childs[2].IndexExpr(lang)+']';
		}else if(this.childs.length == 4){
			//TODO optimize by this part being just 1 number: '*('+this.childs[2].SizeName()+'*'+this.childs[3].SizeName()+')+'+
			//return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].LoopName()+'*('+this.childs[2].SizeName()+'*'+this.childs[3].SizeName()+')+'+
			//	this.childs[2].LoopName()+'*'+this.childs[3].SizeName()+'+'+this.childs[3].LoopName()+']';
			return sharedArrayName+'['+array.OffsetName()+'+'+this.childs[1].IndexExpr(lang)+'*'+(this.childs[2].size()*+this.childs[3].size())+
				this.childs[2].IndexExpr(lang)+'*'+this.childs[3].size()+'+'+this.childs[3].IndexExpr(lang)+']';
		}else{
			throw 'TODO generalize for any number of childs, just do the normal x*sizeY+y thing if its not the more complex pointer arithmetic kind of child';
		}
	}else if(this.apeType == 'id'){
		return 'id'; //id of gpu thread
	}else if(this.apeType == 'ids'){
		return 'ids'; //number of gpu threads
	}else if(this.apeType == 'size'){
		//return this.childs[0].SizeName();
		return ''+this.childs[0].size(); //TODO display this.childs[0].SizeName() in comment? or make this.childs[0].SizeName() be a const int? as of 2023-11-7 its not generating code for that unless its an array.
	}else if(this.apeType == 'copy'){
		//TODO Bug: for(int c0_corner_i=0; c0_corner_i<0; c0_corner_i++){ //131 but its supposed to be "(oo {corner copy loopSize}".

		//Example: (gradientCopyIndex copy {par}) can be used in a loop of gradientCopyIndex from 0 to par.floats.length-1 
		//FIXME what if its {size (gradientCopyIndex copy {par})} will that generate the right code aka gradientCopyIndex_s or maybe par_s?
		return this.LoopName(); //Example: 'gradientCopyIndex_i'.
	}else if(this.apeType == 'exceptLast'){ //like the 'copy' op but 1 smaller, and {exceptLast {0}} size is still 0 instead of -1.
		return this.LoopName();
	}else if(this.apeType == 'i+1'){
		//return '('+this.LoopName()+'+1)';
		//FIXME should other calls of LoopName be replaced by recursion of toTinyGlslCodeRecurse like here? This will likely come up as more Ap.Ape code is written that uses other combos of apes.
		return '('+this.childs[0].toTinyGlslCodeRecurse(lang,0,true).trim()+'+1)'; //see "Bug: {i+1 linkExceptLast} in [...] is not generating code and is just displaying its ape.LoopName()".
	}else if(this.apeType == 'x'){ //FIXME remove x and y and z cuz they are dagball specific. 2023-12-11 theres x$ and y$ vars in generated ape code, not built in.
		//read-only x dimension if this is a 2d or 3d cross-section of a many dimensional scalar field.
		//TODO generalize this to the oGlo/nGlo vars so its not specific to x y and z. More generally, Ap.Ape is many GPU codes run on many shared vars in many combos,
		//so far only up to 1000 float vars / dimensions at once but when global memory is added in tinyGlsl (which is much slower than parrMem and localparMem) that could change.
		if(this.childs.length){
			throw 'x. Must be 0 childs if apeType is x, y  or z (or more generally any of the oGlo/nGlo vars) but is '+this.childs.length;
		}
		return 'x';
	}else if(this.apeType == 'y'){ //similar to x. //FIXME remove x and y and z cuz they are dagball specific
		if(this.childs.length){
			throw 'y. Must be 0 childs if apeType is x, y  or z (or more generally any of the oGlo/nGlo vars) but is '+this.childs.length;
		}
		return 'y';
	}else if(this.apeType == 'z'){ //similar to x. //FIXME remove x and y and z cuz they are dagball specific
		if(this.childs.length){
			throw 'z. Must be 0 childs if apeType is x, y  or z (or more generally any of the oGlo/nGlo vars) but is '+this.childs.length;
		}
		return 'z';
	}else if(this.apeType == 'int'){
		return this.LoopName();
	}else if(this.apeTypeIsSimpleSize()){
		if(js){
			code += this.LoopName();
		}else{
			code += forceInt ? this.LoopName() : ('float('+this.LoopName()+')');
		}
	}
	if(!code){
		code = Ap.nline(tablev)+'TODO apeType='+this.apeType+' toTinyGlslCodeRecurse here, ape='+Ap.limitStringLen(this.toApeCode(),35); //TODO make sure this toApeCode is 1 line
	}
	return code;
};

Ap.Ape.prototype.searchApesRecurse = function(query, list, set){
	//Err('dedup by name if exists else by === like in Set. cuz searchApes is giving dups and offset != overlappingParAndLocMems_sizeInFloats is throwing 2024-7-21');
	for(let child of this.childs){
		child.searchApesRecurse(query, list, set);
	}
	if(!(set.has(this) || (this.name && set.has(this.name))) && query(this)){ //count 2 apes as equal if they have the same name or ===, for dedup.
		list.push(this);
		set.add(this);
		if(this.name){
			set.add(this.name);
		}
	}
};

Ap.ave = function(floats){
	if(!floats || !floats.length) Err('No floats to average');
	let sum = 0;
	for(let i=0; i<floats.length; i++) sum += floats[i];
	return sum/floats.length;
};

//If you give optionalAve (from Ap.ave for example) it doesnt have to compute that again.
Ap.stdDev = function(floats, optionalAve){
	if(!floats || !floats.length) Err('No floats to stdDev');
	let ave = optionalAve===undefined ? Ap.ave(floats) : optionalAve;
	let sumOfSquares = 0;
	for(let i=0; i<floats.length; i++){
		let diff = floats[i]-ave;
		sumOfSquares += diff*diff;
	}
	let aveSquare = sumOfSquares/floats.length;
	return Math.sqrt(aveSquare);
};

Ap.aveDev = function(floats){
	let ave = Ap.ave(floats);
	return [ave, Ap.stdDev(floats, ave)];
};

//makes a backing Float32Array viewing another Float32Array. from index inclusive, to index exclusive, or floats itself if from and to are its whole range.
Ap.subfloats = function(floats, from, to){
	if(from==0 && to==floats.length) return floats;
	return new Float32Array(floats.buffer, 4*from, to-from); //4 cuz 4 bytes per float
};

Ap.Ape.prototype.indexCode = function(){ //FIXME i think this has been replaced by ape.LoopName()??
	return this.name+'_i'; //FIXME check if this duplicates another name
};

Ap.Ape.prototype.code = function(){
	throw 'TODO';
};

Ap.doSimpleParsingAndToStringApeTests = function(){
	console.log('START Ap.doSimpleParsingAndToStringApeTests()');
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
		//removing this apeType: '{x}',
		//removing this apeType: '{y}',
		//removing this apeType: '{z}',
		//removing x y z apeTypes: '{f+ {x} {y} {z} 1000}',
	];
	for(let apeCode of apeCodes){
		console.log('\nTesting apeCode='+apeCode);
		//let parseApe = Ap.parseApeCode(apeCode);
		let parseApe = Ap.parse(apeCode);
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
	console.log('END Ap.doSimpleParsingAndToStringApeTests(), all tests pass.');
};

Ap.doComplexApeTests = function(){
	console.log('Ap.doComplexApeTests starts with Ap.apeToStringAsNextLanguage='+Ap.apeToStringAsNextLanguage+' and will set it to false then restore it to whatever it was, after the OLD/ORIGINAL LANGUAGE test cases, in a try/finally.');

	let prev_apeToStringAsNextLanguage = Ap.apeToStringAsNextLanguage; //set it to do tostring as old/original language, then set it back to whatever it was.
	Ap.apeToStringAsNextLanguage = false;
	try{
		console.log('Set Ap.apeToStringAsNextLanguage='+Ap.apeToStringAsNextLanguage);
		//let apeForTestingSharedParArraySize = Ap.lazyEvalOld('{doLast (arrayX parMem {3}) (arrayY parMem {4}) {* (ten 10) {par}}}').ape;
		let apeForTestingSharedParArraySize = Ap.lazyEvalOld('{doLast (arrayX parlocMem {3}) (arrayY parlocMem {4}) {* (ten 10) {par}}}').ape;
		let codeStringOfPar = apeForTestingSharedParArraySize.childs[2].childs[1]+'';
		if(Ap.prefixEveryApeToStringRecursivelyWithThis === Ap.empty_prefixEveryApeToStringRecursivelyWithThis){
			if(codeStringOfPar != '{par}'){
				Err('Expected {par} but got '+codeStringOfPar);
			}
		}
		let parSizeShouldBe7 = apeForTestingSharedParArraySize.childs[2].childs[1].size();
		if(parSizeShouldBe7 != 7){
			Err('Expected 7 but got '+parSizeShouldBe7);
		}
		//TODO similar tests for {loc} and {big}.
		console.log('second_pass_of_updateApeSize tests pass.')

		//Ap.howToUse is this text 2023-11-7:
		//let call = Ap.lazyEval(stringOfApeCode); let parArrays = call.par.childs; call.par.put(parArrays[3],5,6.78); That sets the 5th float in that array to 6.78.
		//Do that for any or all in parArrays. Set call.numGpuThreads. Set call.floatsPerGpuThread to 1 or 4. let floatsFromGpu = call.eval();
		//That should get you around 1 teraflop on a good gaming computers browsers.

		let matDimA = 3;
		let matDimB = 10;
		let matDimC = 7;
		let matmulCode = //par can only be up to size about 1000 so this isnt much use for normal size neuralnets without big/bigMem which doesnt work yet, but for puzzle games and bouncy curves par size is ok.
		`{doLast
			(matAB parMem (matDimA ${matDimA}) (matDimB ${matDimB}))
			(matBC parMem matDimB (matDimC ${matDimC}))
			(c int {imod {id} {size matDimC}})
			(a int {i/ {id} {size matDimC}})
			{+
				<(sumB float) 0>
				{*
					matDimB
					{f+= sumB {f*
						[matAB a matDimB]
						[matBC matDimB c]
					}}
				}
				{freturn sumB}
			}
		}`;
		/*let matmulCode = //par can only be up to size about 1000 so this isnt much use for normal size neuralnets without big/bigMem which doesnt work yet, but for puzzle games and bouncy curves par size is ok.
		`{doLast
			(matAB parMem (matDimA ${matDimA}) (matDimB ${matDimB}))
			(matBC parMem matDimB (matDimC ${matDimC}))
			(c int {imod {id} {size matDimC}})
			(a int {i/ {id} {size matDimC}})
			{+
				<(sumB float) 0>
				{*
					matDimB
					{f+= sumB {f*
						[matAB a matDimB]
						[matBC matDimB c]
					}}
				}
				<potenCirc$ sumB>
			}
		}`;*/
		//TODO potenCirc$ means (potenCirc $) which is the same as (potenCirc float) except it doesnt declare the var, expects it to be declared externally.
		//TODO someIntVar& is similar but for ints. but just do $/float for now.
		console.log('doComplexApeTests matmulCode='+matmulCode);
		let matmulCall = Ap.lazyEvalOld(matmulCode);
		console.log('doComplexApeTests matmulCall='+matmulCall);
		let parArrays = matmulCall.par.childs;
		console.log('doComplexApeTests parArrays='+parArrays);
		let matABSize = matmulCall.par.size('matAB');
		if(matABSize != matDimA*matDimB){
			throw 'matABSize='+matABSize+' != matDimA*matDimB='+matDimA*matDimB;
		}
		let matBCSize = matmulCall.par.size('matBC');
		if(matBCSize != matDimB*matDimC){
			throw 'matBCSize='+matBCSize+' != matDimB*matDimC='+matDimB*matDimC;
		}
		let matAB = new Float32Array(matABSize);
		let matBC = new Float32Array(matBCSize);
		for(let i=0; i<matABSize; i++) matAB[i] = Math.random();
		for(let i=0; i<matBCSize; i++) matBC[i] = Math.random();
		matmulCall.par.putFloats('matAB', matAB);
		matmulCall.par.putFloats('matBC', matBC);
		matmulCall.numGpuThreads = matDimA*matDimC;
		matmulCall.floatsPerGpuThread = 1;
		let matAC = matmulCall.eval(); //gpu
		let correctMatAC = new Float32Array(matDimA*matDimC);
		for(let a=0; a<matDimA; a++){
			for(let c=0; c<matDimC; c++){
				let sum = 0;
				for(let b=0; b<matDimB; b++){
					sum += matAB[a*matDimB+b]*matBC[b*matDimC+c];
				}
				correctMatAC[a*matDimC+c] = sum;
			}
		}
		if(correctMatAC.length != matAC.length){
			throw '(from CPU)correctMatAC.length='+correctMatAC.length+' != (from GPU)matAC.length='+matAC.length;
		}
		for(let ac=0; ac<matAC.length; ac++){
			let floatFromGPU = matAC[ac];
			let floatFromCPU = correctMatAC[ac];
			let diff = Math.abs(floatFromGPU-floatFromCPU);
			if(diff > .00001){
				throw 'doComplexApeTests CPU didnt match GPU in a small matmul test, floatFromGPU='+floatFromGPU+' != floatFromCPU='+floatFromCPU+' at index ac='+ac;
			}
		}
		console.log('matmulCall.code='+matmulCall.code);
		console.log('GPU: '+[...matAC]);
		console.log('CPU: '+[...correctMatAC]);
		console.log('doComplexApeTests test pass: matmul in small par array with '+matmulCall.numGpuThreads+' GPU threads');
		/*
		fourHundredFloatsOneHundredPixels test pass
		TinyGLSL.js:1004 How to use TinyGLSL with 4 floats per pixel: TinyGlsl.simple('', 'ret = par[0]*par[1]; retb = float(id)*1000.+par[0]+par[1]; retc = par[0]-par[1]; retd = par[0]/par[1];', Float32Array.of(10,20), null, 1, 3, 4) -> Float32Array.of(200, 30, -10, 0.5, 200, 1030, -10, 0.5, 200, 2030, -10, 0.5)
		TinyGLSL.js:1016 END: TinyGlsl.testAfterBoot()
		TinyGLSL.js:388 END TinyGlsl.boot() for real this time, done with testAfterBoot().
		Ape.js:2107 matmulCall.code=const int matAB_o = 0; //array offset in parMem  (after overlapping par and loc mems)
		const int matAB_s = 30; //array size in parMem  (after overlapping par and loc mems)
		const int matBC_o = 30; //array offset in parMem  (after overlapping par and loc mems)
		const int matBC_s = 70; //array size in parMem  (after overlapping par and loc mems)
		float sumB_f = 0.;
		int c_i = (id %
			7);
		int a_i = (id /
			7);
		sumB_f = 0.;
		for(int matDimB_i=0; matDimB_i<10; matDimB_i++){
			sumB_f += (par[matAB_o+a_i*10+matDimB_i] *
					par[matBC_o+matDimB_i*7+c_i]);
		}
		ret = sumB_f;
		Ape.js:2108 GPU: 1.1023707389831543,1.6691430807113647,1.264143943786621,1.6519794464111328,1.8682363033294678,1.3562763929367065,1.4190254211425781,2.289501428604126,1.8772157430648804,2.2659735679626465,2.26366925239563,2.451164484024048,2.136610746383667,2.3474364280700684,2.6429426670074463,3.420081615447998,2.84826922416687,1.9104249477386475,3.0215961933135986,2.1477017402648926,2.7955474853515625
		Ape.js:2109 CPU: 1.1023707389831543,1.6691430807113647,1.2641438245773315,1.6519794464111328,1.8682363033294678,1.3562763929367065,1.4190253019332886,2.289501428604126,1.8772157430648804,2.2659738063812256,2.263669490814209,2.451164722442627,2.136610746383667,2.3474364280700684,2.6429426670074463,3.420081615447998,2.84826922416687,1.9104249477386475,3.0215961933135986,2.1477015018463135,2.7955477237701416
		Ape.js:2110 doComplexApeTests test pass: matmul in small par array with 21 GPU threads
		*/


		Ap.lazyEvalOld('{+ <(b float) 1> {* {17} {+ <(next float) {f+ (a float) b}> <a b> <b next>}} {freturn b}}').evalTest().testGet(0,2584).log('Test pass: fibonacci');

		//TinyGlsl.clearAllCache(); //Trying to fix: "TinyGLSL.js:511 WARNING: Too many active WebGL contexts. Oldest context will be lost."
		/* That bug was fixed in Dagball090.html 2023-11-18 by this code. Its likely some of the Ap tests are using it wrong the same way.
		But since the tests are still passing, leave that bug fix for later. It may fail mysteriously later if "Oldest context will be lost" is still in TinyGlsl.caches.
		The number of gl contexts in TinyGlsl cache is returned by Object.keys(TinyGlsl.caches).filter(x=>x.startsWith('gl_')).length, but its not about
		the number of caches. Its about memory fencing. If it goes outside of the "float loc[" array (I found in a certain calculation), it will lose that gl context.
		let gradientCall = Ap.lazyEval(singleHeightmapPotentialEnergiesForGradient_apCode);
		let numberOfParMems = gradientCall.ape.searchApes(ape=>(ape.apeType=='parMem')).length;
		if((gradientCall.par.memSize > gradientCall.loc.memSize) || numberOfParMems){
			throw 'gradientCall.par.memSize('+gradientCall.par.memSize+') > gradientCall.loc.memSize('+gradientCall.loc.memSize+') (this doesnt apply to display, only gradient/potens). gradientCall must have loc.memSize >= par.memSize cuz the gradient calculation copies from par to loc and adds epsilon to 1 of those depending on which GPU thread aka {id}. It must also have no parMem (counted numberOfParMems='+numberOfParMems+') (allow parlocMem and locparMem cuz those exist in both par and loc, and allow locMem cuz that is after par size, but no parMem cuz that would get copied into loc where theres no matched parlocMem or locparMem, so copied over the wrong arrays or even outside of loc memory, resulting in glsl dropping the gl context). See the Ap.js test "copy par to loc with +epsilon in 5 GPU threads and array size 4 so at most 1 float gets +epsilon in each thread. See dagball codeMaker" for how that copying between par and loc and the adding of epsilon is supposed to work. ape='+gradientCall.ape;
		}
		this.mergedApCalls.singleHeightmapPotentialEnergiesForGradient = gradientCall;
		*/

		Ap.lazyEvalOld(`
			{doLast (arrayX parMem {3}) (arrayY locMem {4}) {+
				<[arrayY 0%4] [arrayX 0%3]>
				<[arrayY 1%4] [arrayX 1%3]>
				<[arrayY 2%4] {f+ [arrayX 0%3] [arrayX 1%3]}>
				(returnIndex int {id})
				{freturn [arrayY returnIndex]}
			}}
		`).setThreadsFloats(3,1).putFloats('arrayX',[5,7,100]).evalTest().
			testGet(0,5).testGet(1,7).testGet(2,12).log('Test pass: doLast (arrayX parMem {3}) (arrayY locMem {4})');

		Ap.lazyEvalOld('{freturn 2 20 200 2000}').setThreadsFloats(1,4).evalTest().testGet(0,2).testGet(1,20).testGet(2,200).testGet(3,2000).
			log('Test pass: {freturn 2 20 200 2000}');

		Ap.lazyEvalOld(`
			{+	{* (gradientCopyIndex 5) {f+= (countLoops float) 1} }
				{freturn countLoops}
			}
		`).evalTest().testGet(0,5).log('Test pass: {* (gradientCopyIndex 5) {f+= (countLoops float) 1} }');

		Ap.lazyEvalOld(`
			{+	{* (gradientCopyIndex copy {5}) {f+= (countLoops float) 1} }
				{freturn countLoops}
			}
		`).evalTest().testGet(0,5).log('Test pass: (gradientCopyIndex copy {5}) {f+= (countLoops float) 1} }');

		let test = Ap.lazyEvalOld(`
			{+	(arrayX parMem {5})
				{* (gradientCopyIndex copy {par}) {f+= (countLoops float) 1} }
				{freturn countLoops}
			}
		`);
		if(test.code.includes('gradientCopyIndex_i<0')){
			throw 'test.code contains gradientCopyIndex_i<0 which means {par} size is 0 but should be 5. It should be updated from 0 to 5 in the second updateApeSize pass.'
		}
		test.putFloats('arrayX',[100,200,300,400,500]);
		let evalTest = test.evalTest();
		evalTest.testMemSizes(5,0,0);
		evalTest.testGet(0,5);
		evalTest.log('Test pass: (arrayX parMem {5}) {* (gradientCopyIndex copy {par}) {f+= (countLoops float) 1} }');

		Ap.lazyEvalOld(`
			{+
				<(epsilon float) 1>
				(arrayX parMem {4})
				(arrayLocA locMem {2})
				(arrayLocB locMem {2})
				<(countLoops float)	0>
				{* (gradientCopyIndex copy {par})
					{f+= countLoops 1}
				}
				{freturn countLoops countLoops countLoops countLoops}
			}
		`).setThreadsFloats(5,4).putFloats('arrayX',[100,200,300,400]).evalTest().
			testGet(0,4).testGet(1,4).testGet(2,4).testGet(3,4).
			testGet(4,4).testGet(5,4).testGet(6,4).testGet(7,4).
			log('Test pass: more_1 complex (gradientCopyIndex copy {par}) {f+= countLoops 1} before the similar test that does more than count loops in that loop body.');

		//TinyGlsl.clearAllCache(); //Trying to fix: "TinyGLSL.js:511 WARNING: Too many active WebGL contexts. Oldest context will be lost."

		Ap.lazyEvalOld(`
			{+
				<(epsilon float) 1>
				(arrayX parMem {4})
				(arrayLocA locMem {2})
				(arrayLocB locMem {2})
				<(countLoops float)	0>
				{* (gradientCopyIndex copy {par})
					<[{loc} gradientCopyIndex] gradientCopyIndex>
				}
				{freturn [arrayLocA 0%2] [arrayLocA 1%2] [arrayLocB 0%2] [arrayLocB 1%2]}
			}
		`).setThreadsFloats(5,4).putFloats('arrayX',[100,200,300,400]).evalTest().
			testGet(0,0).testGet(1,1).testGet(2,2).testGet(3,3).
			testGet(4,0).testGet(5,1).testGet(6,2).testGet(7,3).testMemSizes(4,4,0).
			log('Test pass: more_2 complex (gradientCopyIndex copy {par}) <[{loc} gradientCopyIndex] gradientCopyIndex> before the similar test that does more than count loops in that loop body.');

		Ap.lazyEvalOld(`
			{+
				<(epsilon float) 1>
				(arrayX parMem {4})
				(arrayLocA locMem {2})
				(arrayLocB locMem {2})
				<(countLoops float)	0>
				{* (gradientCopyIndex copy {par})
					<[arrayLocA gradientCopyIndex] [{par} gradientCopyIndex]>
				}
				{freturn [arrayLocA 0%2] [arrayLocA 1%2] [arrayLocB 0%2] [arrayLocB 1%2]}
			}
		`).setThreadsFloats(5,4).putFloats('arrayX',[100,200,300,400]).evalTest().testMemSizes(4,4,0).
			testGet(0,100).testGet(1,200).testGet(2,300).testGet(3,400).
			testGet(4,100).testGet(5,200).testGet(6,300).testGet(7,400).
			testGet(8,100).testGet(9,200).testGet(10,300).testGet(11,400).
			testGet(12,100).testGet(13,200).testGet(14,300).testGet(15,400).
			testGet(16,100).testGet(17,200).testGet(18,300).testGet(19,400).
			log('Test pass: more_3 complex (gradientCopyIndex copy {par}) <[arrayLocA gradientCopyIndex] [{par} gradientCopyIndex]> before the similar test that does more than count loops in that loop body.');

		/*Ap.lazyEvalOld(`
			{+
				<(epsilon float) 1>
				(arrayX parMem {4})
				(arrayLocA locMem {2})
				(arrayLocB locMem {2})
				{* (gradientCopyIndex copy {par})
					<[{loc} gradientCopyIndex] {f+
						[{par} gradientCopyIndex]
						{?: {i== gradientCopyIndex {id}} 0 epsilon}
					}>
				}
				{freturn [arrayLocA 0%2] [arrayLocA 1%2] [arrayLocB 0%2] [arrayLocB 1%2]}
			}
		*/
		/*Ap.lazyEvalOld(`
			{+
				<(epsilon float) 1>
				(arrayX parMem {4})
				(arrayLocA locMem {2})
				(arrayLocB locMem {2})
				{* (gradientCopyIndex 4)
					<[arrayLocA gradientCopyIndex] [{par} gradientCopyIndex]>
				}
				{freturn [arrayLocA 0%2] [arrayLocA 1%2] [arrayLocB 0%2] [arrayLocB 1%2]}
			}
		*/
		/*Ap.lazyEvalOld(`
			{+
				<(epsilon float) 1>
				(arrayX parMem {4})
				(arrayLocA locMem {2})
				(arrayLocB locMem {2})
				{* (gradientCopyIndex 4)
					<[{loc} gradientCopyIndex] {f+
						[{par} gradientCopyIndex]
						{?: {i== gradientCopyIndex {id}} epsilon 0}
					}>
				}
				{freturn [arrayLocA 0%2] [arrayLocA 1%2] [arrayLocB 0%2] [arrayLocB 1%2]}
			}
		*/
		/*Ap.lazyEvalOld(`
			{+
				<(epsilon float) 1>
				(arrayX parMem {4})
				(arrayLocA locMem {2})
				(arrayLocB locMem {2})
				{* (gradientCopyIndex copy {par})
					<[{loc} gradientCopyIndex] {f+
						[{par} gradientCopyIndex]
						{?: {i== gradientCopyIndex {id}} epsilon 0}
					}>
				}
				{freturn [arrayLocA 0%2] [arrayLocA 1%2] [arrayLocB 0%2] [arrayLocB 1%2]}
			}
		*/
		/*FIXME it generated this code from the one with (gradientCopyIndex copy {par}), notice "<0" despite {par} is size 4 in that case:
		for(int gradientCopyIndex_i=0; gradientCopyIndex_i<0; gradientCopyIndex_i++){
			loc[loc_o+gradientCopyIndex_i] = float(gradientCopyIndex_i);
		}
		Ap.js:1233 set copy.apeSize to 0 ape=(gradientCopyIndex copy {par})
		Ap.js:1233 set copy.apeSize to 4 ape=(gradientCopyIndex copy {par})
		Ap.js:1233 set copy.apeSize to 4 ape=(gradientCopyIndex copy {par})
		Ap.js:1233 set copy.apeSize to 4 ape=(gradientCopyIndex copy {par})
		Ap.lazyEvalOld(`
			{+
				<(epsilon float) 1>
				(arrayX parMem {4})
				(arrayLocA locMem {2})
				(arrayLocB locMem {2})
				{* (gradientCopyIndex copy {par})
					<[{loc} gradientCopyIndex] gradientCopyIndex>
				}
				{freturn [arrayLocA 0%2] [arrayLocA 1%2] [arrayLocB 0%2] [arrayLocB 1%2]}
			}
		*/
		Ap.lazyEvalOld(`
			{+
				<(epsilon float) 1>
				(arrayX parMem {4})
				(arrayLocA locMem {2})
				(arrayLocB locMem {2})
				<(countLoops float)	0>
				{* (gradientCopyIndex copy {par})
					<[{loc} gradientCopyIndex] {f+
						[{par} gradientCopyIndex]
						{?: {i== gradientCopyIndex {id}} epsilon 0}
					}>
				}
				{freturn [arrayLocA 0%2] [arrayLocA 1%2] [arrayLocB 0%2] [arrayLocB 1%2]}
			}
		`).setThreadsFloats(5,4).putFloats('arrayX',[100,200,300,400]).evalTest().testMemSizes(4,4,0).
			testGet(0,101).testGet(1,200).testGet(2,300).testGet(3,400).
			testGet(4,100).testGet(5,201).testGet(6,300).testGet(7,400).
			testGet(8,100).testGet(9,200).testGet(10,301).testGet(11,400).
			testGet(12,100).testGet(13,200).testGet(14,300).testGet(15,401).
			testGet(16,100).testGet(17,200).testGet(18,300).testGet(19,400).
			log('Test pass: copy par to loc with +epsilon in 5 GPU threads and array size 4 so at most 1 float gets +epsilon in each thread. See dagball codeMaker.');

		//TinyGlsl.clearAllCache(); //Trying to fix: "TinyGLSL.js:511 WARNING: Too many active WebGL contexts. Oldest context will be lost."

		//Ap.lazyEvalOld('{freturn 2 20 200 2000}').setThreadsFloats(1,4).evalTest().
		//	err('TODO write more tests to figure out why doPhysics dagballs codeMaker gradient/potens arent working but the balls and ground is moving when push randomizeVel buttons.');


		//parlocMem and locparMem come first in both {par} and {loc}. After those it forks into {par} addresses and {loc} addresses separately, above the overlapping range.
		//Other than that, to break ties, whatever order the parlocMem and locparMem occur in the code, thats how they occur in memory.
		//In thise case {par} should contain, in this order: pl/6 lp/5 p/100, and {loc} should contain, in this order: pl/6 lp/5 l/7, EXCEPT
		//that it doesnt write it to both arrays. It only writes it to 1. locparMem defaults to loc. parlocMem defaults to par. Both exists in both mems.
		//par is readOnly and is the same across all GPU cores. loc is read and write and differs per GPU core.
		//
		//FIXME <[pl 0%9] 6> shouldnt be allowed since it defaults to par, and par is readonly. Maybe that will fail to GLSL compile? YES, it correctly failed.
		//TinyGLSL.js:691 Uncaught Error: ERROR: 0:51: 'assign' : l-value required (can't modify a uniform "par")
		//loc[lp_o+0] = 5.; //50
		//par[pl_o+0] = 6.; //51
		//loc[l_o+0] = 7.; //52
		//
		//FIXME also, putFloats('pl',...) should throw cuz it defaults to loc, so apCall.loc.floats would get written, but its not read by GPU.
		//apCall.loc is there for the size and offset data of the arrays in loc, not for its floats contents since that exists only in GPU.
		//
		/*Ap.lazyEvalOld(`
			{+	(l locMem {1}) (pl parlocMem {1}) (p parMem {1}) (lp locparMem {1})
				<[lp 0%9] 5> <[pl 0%9] 6> <[l 0%9] 7>
				{freturn [{par} 0%9] [{par} 1%9] [{par} 2%9] 0}
			}
		*/
		Ap.lazyEvalOld(`
			{+	(l locMem {1}) (pl parlocMem {1}) (p parMem {1}) (lp locparMem {1})
				<[lp 0%9] 5> <[l 0%9] 7>
				{freturn [{par} 0%9] [{par} 1%9] [{par} 2%9] 0}
			}
		`).setThreadsFloats(1,4).putFloats('p',[100]).evalTest().testMemSizes(3,3,0).
			testGet(0,0).testGet(1,0).testGet(2,100). //{par}
			log('Test pass: (l locMem {1}) (pl parlocMem {1}) (p parMem {1}) (lp locparMem {1}) <[lp 0%9] 5> <[l 0%9] 7> get par');

		/*Ap.lazyEvalOld(`
			{+	(l locMem {1}) (pl parlocMem {1}) (p parMem {1}) (lp locparMem {1})
				<[lp 0%9] 5> <[pl 0%9] 6> <[l 0%9] 7>
				{freturn [{loc} 0%9] [{loc} 1%9] [{loc} 2%9] 0}
			}
		`).setThreadsFloats(1,4).putFloats('p',[100]).evalTest().
			//testGet(0,6).testGet(1,5).testGet(2,100). //{par}
			testGet(0,6).testGet(1,5).testGet(2,7). //{loc}
			log('Test pass: (l locMem {1}) (pl parlocMem {1}) (p parMem {1}) (lp locparMem {1}) <lp 5> <pl 6> <l 7> get loc');
		*/

		Ap.lazyEvalOld(`
			{+	(pl parlocMem {1})
				<{locPtr pl 0%9} 20>
				{freturn [pl 0%9] {locPtr pl 0%9} {parPtr pl 0%9} {f+ {parPtr pl 0%9} {locPtr pl 0%9}}}
			}
		`).setThreadsFloats(1,4).putFloats('pl',[100]).evalTest().testMemSizes(1,1,0).
			testGet(0,100).testGet(1,20).testGet(2,100).testGet(3,120).
			log('Test pass: (pl parlocMem {1}) <{locPtr pl 0%9} 20>');

		//TinyGlsl.clearAllCache(); //Trying to fix: "TinyGLSL.js:511 WARNING: Too many active WebGL contexts. Oldest context will be lost."



		let five = Ap.lazyEval('(return (+ 2 3))').evan();
		if(5 != five){
			Err('5 != '+five);
		}else{
			console.log('Test pass evanFive');
		}

		let seventeen = Ap.evan('(do {ab parlocMem (2)} (return (+ [ab 0] [ab 1])))',{ab:[10,7]});
		if(17 != seventeen){
			Err('17 != '+seventeen);
		}else{
			console.log('Test pass evanSeventeen_with_size2AbArray');
		}












		//Err('Write and pass more ape tests about copying between parMem, locMem, locparMem, and parlocMem, and returning stuff. 2023-11-16-520pET the Ap.doApeTests() all tests pass. But the potentialEnergy thing I tested there isnt working in codeMaker in dagball, so TODO write more ape tests.');





		/*
		mergedGpuCode += n+'circY = '+preVarsUseWhichArray+'['+(numGpuUniformVars+dagball.varsPerCircIntoGpu_y)+'];';
		mergedGpuCode += n+'circX = '+preVarsUseWhichArray+'['+(numGpuUniformVars+dagball.varsPerCircIntoGpu_x)+'];';
		mergedGpuCode += n+'circR = '+preVarsUseWhichArray+'['+(numGpuUniformVars+dagball.varsPerCircIntoGpu_r)+'];';
		numGpuUniformVars += dagball.varsPerCircIntoGpu;
		mergedGpuCode += n+"circInfluence = "+TinyGlsl.jsNumToGlslFloat(circ.influence)+";";
		mergedGpuCode += n+'circWindow = (length(vec2(circY-y,circX-x))<circR ? 1. : 0.); //FIXME smoother near edges';
		//mergedGpuCode += n+'circWindow = 1.; //FIXME';
		mergedGpuCode += n+'potenCirc = 0.; //in case user code uses += or doesnt se

		mergedGpuCode += n+'potenOne += circInfluence*circWindow*potenCirc;
		//potenSum is all balls. potenOne is inner loop of potentialEnergy.
		potenCirc is part of that inner loop for a specific circ. circ GPU code should set potenCirc, not those other vars.';
		*/

		//renamed intBeforeeachAftereachVararglist to listLoop

		//a simple example similar to dagball.Game.prototype.potens, that loops over balls with y and x position each,
		//not the more complex kind of balls that also have a balance var between 2 heightmaps. This is the 1 heightmap kind.
		let potenForGradientCode =
			`TODO this is getting complex. do a smaller test first.
			{doLast
				(numBalls 20)
				(floatsPerBall 2)
				(balls locparMem numBalls floatsPerBall)
				(numCircs 2)
				(headerFloatsPerCirc 4)
				(circHeaders parMem numCircs headerFloatsPerCirc)
				(circY float)
				(circX float)
				(circR float)
				(circInfluence float)
				(circWindow float)
				(potenCirc float)
				(potenOne float)
				(potenSum float)
				(y float)
				(x float)
				{*
					numBalls
					{+
						<y [balls numBalls 0]>
						<x [balls numBalls 1]>
						<potenOne 0>
						{listLoop
							numCircs
							{+
								<circY [circHeaders numCircs 0]>
								<circX [circHeaders numCircs 1]>
								<circR [circHeaders numCircs 2]>
								<circInfluence [circHeaders numCircs 3]>
								<circWindow {?: {fless {fhypot {f- circY y} {f- circX x}} circR} 1 0}>
							}
							{f+= potenOne {f* potenCirc circWindow circInfluence}}	
							(simpleTestCirc doLast
								<potenCirc {sine {f* 33.4 {f- {f* x x (someVarABC locparMem) .1} {f* y y .1}}}}>
							)
							(matmulTestCirc doLast
								(matAB locparMem (matDimA 3) (matDimB 10))
								(matBC locparMem matDimB (matDimC 7))
								(matAC locMem matDimA matDimC)
								(matmulABCLoop *
									matDimA
									matDimC
									{+
										<(sumB float) 0>
										{*
											matDimB
											{f+= sumB {f*
												[matAB matDimA matDimB]
												[matBC matDimB matDimC]
											}}
										}
										<[matAC matDimA matDimC] sumB>
									}
								)
								<potenCirc [matAC 0 0]>
							)
						}
						{f+= potenSum potenOne}
					}
				}
				{freturn potenSum}
			}`;



		/*No to this... Keep circHeaders array.
		TODO? instead of circHeaders array, do I want to put the numbers directly into the code with some prefix so they generate an array
		and doesnt require glsl compiling it again when those numbers change?
		Other than bigMem, ape language could be just string to floats. would have to put in the numGpuThreads and floatsReturnedPerGpuThread
		into the code, which i could just make another apetype for.
		Theres not alot of float literals, such as 33.4, in it, so could just do it for all those, turn each of them into flo[59] whichever [var index] it is,
		or simpler put them in par array. Dont do it for int literals cuz theyre used for pointers.
		*/



		/*
		//a simple example similar to dagball.Game.prototype.potens, that loops over balls with y and x position each,
		//not the more complex kind of balls that also have a balance var between 2 heightmaps. This is the 1 heightmap kind.
		let potenForGradientCode =
			`{doLast
				(numBalls 20)
				(floatsPerBall 2)
				(balls locparMem numBalls floatsPerBall)
				(numCircs 2)
				(headerFloatsPerCirc 4)
				(circHeaders parMem numCircs headerFloatsPerCirc)
				(circY float)
				(circX float)
				(circR float)
				(circInfluence float)
				(circWindow float)
				(potenCirc float)
				(potenOne float)
				(potenSum float)
				(y float)
				(x float)
				{*
					numBalls
					{+
						<y [balls numBalls 0]>
						<x [balls numBalls 1]>
						<potenOne 0>
						
						{// todo set circY circX circR circInfluence circWindow etc here}
						{+ <circY [circHeaders 0 0]> <circX [circHeaders 0 1]> <circR [circHeaders 0 2]> <circInfluence [circHeaders 0 3]>
							<circWindow {?: {fless {hypot {f- circY y} {f- circX x}} circR} 1 0}>
						}
						(simpleTestCirc doLast
							<potenCirc {sine {f* 33.4 {f- {f* x x (someVarABC locparMem) .1} {f* y y .1}}}}>
						)
						{f+= potenOne {f* potenCirc circWindow circInfluence}}
							
						{// todo set circY circX circR circInfluence circWindow etc here}
						(matmulTestCirc doLast
							(matAB locparMem (matDimA 3) (matDimB 10))
							(matBC locparMem matDimB (matDimC 7))
							(matAC locMem matDimA matDimC)
							(matmulABCLoop *
								matDimA
								matDimC
								{+
									<(sumB float) 0>
									{*
										matDimB
										{f+= sumB {f*
											[matAB matDimA matDimB]
											[matBC matDimB matDimC]
										}}
									}
									<[matAC matDimA matDimC] sumB>
								}
							)
							<potenCirc [matAC 0 0]>
						)
						{f+= potenOne potenCirc}

						{f+= potenSum potenOne}
					}
				}
				{freturn potenSum}
			}`;*/


		console.log('OLD LANGUAGE tests pass. Starting NEW/NEXT LANGUAGE tests. See Ap.stringToNextLanguage and Ap.stringFromNextLanguage to convert between the 2 languages. Use Ap.lazyEval for new/next language, Ap.lazyEvalOld for old/original language. Ap.upgradeTimeToNextLanguage='+Ap.upgradeTimeToNextLanguage+' aka '+new Date(Ap.upgradeTimeToNextLanguage*1000));
	}finally{
		Ap.apeToStringAsNextLanguage = prev_apeToStringAsNextLanguage;
		console.log('Restored Ap.apeToStringAsNextLanguage='+Ap.apeToStringAsNextLanguage);
	}
	if(!Ap.apeToStringAsNextLanguage){
		Err('Ap.apeToStringAsNextLanguage='+Ap.apeToStringAsNextLanguage+' but must be true to do these tests. Should be true from now on. False is just for backward compatibility.');
	}

	//Ap.lazyEval('(do {abc parMem (5)} (return (+ 2 (* 5 [abc (id)]) 3)))').setThreads(5).putFloats('abc',[10,11,12,13,14]).evalTest().
	Ap.lazyEval('(do {abc parlocMem (5)} (return (+ 2 (* 5 [abc (id)]) 3)))').setThreads(5).putFloats('abc',[10,11,12,13,14]).evalTest(). //FIXME was working with just parMem but "TODO this (par and loc not being same size) has not been tested much and will likely break" threw cuz i told it to be overly cautious, so changing this from parmem to locparMem 2024-6-2. Update: parlocMem cuz not copying par to loc.
		testGet(0,55).testGet(1,60).testGet(2,65).testGet(3,70).testGet(4,75);

	//FIXME was working with just parMem but "TODO this (par and loc not being same size) has not been tested much and will likely break" threw cuz i told it to be overly cautious, so changing this from parmem to locparMem 2024-6-2. Update: parlocMem cuz not copying par to loc.
	//let dedupTest1Observed = Ap.lazyEval('(do {abc parMem (5)} (return (+ 2 (* 5 [abc (id)]) 3)))').ape.dedupByName()+'';
	let dedupTest1Observed = Ap.lazyEval('(do {abc parlocMem (5)} (return (+ 2 (* 5 [abc (id)]) 3)))').ape.dedupByName()+'';
	//let dedupTest1Correct = '(do {abc parMem (5)} (return (+ 2 (* 5 [abc (id)]) 3)))';
	let dedupTest1Correct = '(do {abc parlocMem (5)} (return (+ 2 (* 5 [abc (id)]) 3)))';
	if(dedupTest1Observed != dedupTest1Correct){
		Err('Test fail dedupTest1\ndedupTest1Observed='+dedupTest1Observed+'\ndedupTest1Correct='+dedupTest1Correct);
	}else{
		console.log('Test pass dedupTest1');
	}

	console.warn('2024-6-2 This was working weeks ago but not anymore, though the V checkbox and nnet_*.dagball files work fast using the generated V array, so it works in practice, just not in this test.');
	//let transformFloats0 = Ap.lazyEval('(do {V parMem (30)} <{abc float} (+ 2.34 100)>)');
	let transformFloats0 = Ap.lazyEval('(do {V parlocMem (30)} <{abc float} (+ 2.34 100)>)');
	let transformFloatsA = transformFloats0.ape;
	let transformFloatsB = transformFloatsA.transformFloatValsToVArray();
	let tranformFloatsObservedC = transformFloatsB.ape+'_and_'+JSON.stringify(transformFloatsB.vals);
	//let transformFloatsCorrectC = '(do {V parMem (2)} <{abc float} (+ [V 0] [V 1])>)_and_[2.34,100]';
	let transformFloatsCorrectC = '(do {V parlocMem (2)} <{abc float} (+ [V 0] [V 1])>)_and_[2.34,100]';
	if(tranformFloatsObservedC != transformFloatsCorrectC){
		Err('tranformFloatsObservedC != transformFloatsCorrectC, tranformFloatsObservedC='+tranformFloatsObservedC+', transformFloatsCorrectC='+transformFloatsCorrectC);
	}else{
		console.log('Test pass transformFloats');
	}

	//(id) in Ap.js language means the same as get_global_id(0) in OpenCL.

	//These tests in my Ap.js GPU language pass. I'm about to use it to not have to wait on the compiler when I just edit numbers in the code,
	//cuz it turns those constants into vars. (do {V parMem (1)} (return (+ (id) 2.34 100))) -> (do {V parMem (2)} (return (+ (id) [V 0] [V 1])))
	//Ap.lazyEvalV('(do {V parMem (1)} (return (+ (id) 2.34 100)))').setThreadsFloats(5,1).evalTest().
	Ap.lazyEvalV('(do {V parlocMem (1)} (return (+ (id) 2.34 100)))').setThreadsFloats(5,1).evalTest().
		//testEq(te=>(''+te.call.ape), te=>('(do {V parMem (2)} (return (+ (id) [V 0] [V 1])))')).
		testEq(te=>(''+te.call.ape), te=>('(do {V parlocMem (2)} (return (+ (id) [V 0] [V 1])))')).
		testNear(te=>te.call.par.get('V',0), te=>2.34, .00001).testEq(te=>te.call.par.get('V',1), te=>100).
		testMemSizes(2,0,0).testGet(0,102.34).testGet(4,106.34).
		//log('Test pass: lazyEvalV (do {V parMem (1)} (return (+ (id) 2.34 100))>)');
		log('Test pass: lazyEvalV (do {V parlocMem (1)} (return (+ (id) 2.34 100))>)');

	//evan is for things like dagball CPU circs computed 1 number at a time in a loop in CPU instead of GPU. They can be compiled to GPU later,
	//but compiler is slow for some code, so if its simple, its better to first compile it to javascript so it works instantly.
	let evanTestACall = Ap.lazyEval('(do {arr parlocMem (2)} (return (sqrt (+ (** [arr 0] 2) (** [arr 1] 2)))))').setFloats('arr',[6,8]); //right triangle 6 8 10
	if(evanTestACall.cachedEvanJsFunc){
		Err('evanTestACall.cachedEvanJsFunc should not exist yet cuz its a lazyEval');
	}
	let evanTestAObserved = evalTestACall.evan();
	let evanTestACorrect = 10;
	if(evanTestAObserved != evanTestACorrect){
		Err('evanTestAObserved != evanTestACorrect, evanTestAObserved='+evanTestAObserved+', evanTestACorrect='+evanTestACorrect);
	}else{
		console.log('Test pass evanTestACall');
	}
	if(!evanTestACall.cachedEvanJsFunc){
		Err('evanTestACall.cachedEvanJsFunc must exist since already called call.evan()');
	}
	//now reuse evanTestACall with modified inputs and same compiled javascript
	evanTestACall.put('arr',0,12).put('arr',1,5); //right tringle 12 5 13
	let evanTestBObserved = evalTestACall.evan();
	let evanTestBCorrect = 13;
	if(evanTestBObserved != evanTestBCorrect){
		Err('evanTestBObserved != evanTestBCorrect, evanTestBObserved='+evanTestBObserved+', evanTestBCorrect='+evanTestBCorrect);
	}else{
		console.log('Test pass evanTestBObserved_reusingApCall');
	}
	//TODO you should be able to call it many millions of times per second once I optimize it better,
	//though the sqrt might slow it down (maybe i should put in a lower precision approximation of sqrt, sin, cos, exp, etc as alternative apeTypes)


	console.log('Ap.Ape V2 LANGUAGE tests pass');

	console.log('Ap.Ape doComplexApeTests tests pass');
};

Ap.doApeTests = function(){
	console.log('START Ap.doApeTests()');
	if(Ap.prefixEveryApeToStringRecursivelyWithThis !== Ap.empty_prefixEveryApeToStringRecursivelyWithThis){
		console.log('WARNING: skipping Ap.doSimpleParsingAndToStringApeTests() cuz of prefixEveryApeToStringRecursivelyWithThis option you can change.');
	}else{
		Ap.doSimpleParsingAndToStringApeTests();
	}
	Ap.doComplexApeTests();
	console.log('END Ap.doApeTests(), all tests pass (other than tests skipped, if any).');
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

Dagball056.html:3666 END Ap.doSimpleParsingAndToStringApeTests(), all tests pass.
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

Ap.booted = true;

if(Ap.whenBoot_doApeTests){
	Ap.doApeTests();
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


//console.log('Ap.doSimpleParsingAndToStringApeTests()...');
//Ap.doSimpleParsingAndToStringApeTests();

/*2023-10-30-1015pET:
Ape found TinyGlsl = [object Object] (else throw cuz not found)
Ape.js:1521 Ap.doSimpleParsingAndToStringApeTests()...
Ape.js:1255 START Ap.doSimpleParsingAndToStringApeTests()
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

Ape.js:1288 END Ap.doSimpleParsingAndToStringApeTests(), all tests pass.
*/