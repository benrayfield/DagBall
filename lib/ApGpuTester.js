//Ben Rayfield offers this Agt/ApGpuTester software opensource MIT license.
//ApGpuTester.js for testing the Ap.Ape (Ape.js) GPU language and TinyGlsl.js that it uses.
const Agt = {
	subjects: {
		basicAp: 'TODO rename or merge Agt.subjects.basicAp .ap .basicTinyGlsl .tinyGlsl. Basic testing of Ap.js opcodes aka Ap.Ape.apeType, that do multiply, plus, sine, loops, etc. This might just refer to the tests already in Ap.js?',
		
		basicTinyGlsl: 'TODO rename or merge Agt.subjects.basicAp .ap .basicTinyGlsl .tinyGlsl. Basic testing of TinyGlsl.js. This might just refer to the tests already in TinyGlsl.js?',
		
		OS: 'Which operating system? 2023-11 it runs on most browsers in desktop windows but not in ubuntu linux or android. In ubuntu see dagball/doc/gpu/ubuntuTestFailed2023-11-24 [[Dagball now works in most browsers in windows but not in linux or android. Not tested others. Here\'s what happened in ubuntu. WebGL works so can be fixed. My code: "gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, canvasWidth, canvasHeight, 0, http://gl.RED, gl.FLOAT, null);" DagBall - 1000 dimensional hackerspace @DagBallGame Only TinyGLSL needs to be fixed, not Ap.js or Dagball*.html. TinyGLSL is small simple javascript that calls WebGL2_GLSL code. Nothing else calls GPU.]]. TODO can this be measured thru WebGL2 functions or browser functions, to ask what environment its in or something like that?',
		
		chip: 'Which kind of chip is the test run on? nvidia gpu? amd gpu? amd apu? intel something? etc. WebGL2_GLSL is widely compatible across devices and OS but still need to keep track of on what chips (at least general categories of them) it works vs what error it throws. TODO can this be measured thru WebGL2 functions or browser functions, to ask what environment its in or something like that?',
		
		gpuAPI: 'Normally GPUs, but might be a CPU in here later. Ap.js and TinyGlsl.js are originally built for WebGL2_GLSL, but they might later support OpenCL (https://github.com/benrayfield/lazycl uses LWJGL2\'s OpenCL API) and WebGPU (works in chrome and brave at least, but not firefox, when I tried it in 2023) and GPU.js (has multiple backends, some kinds of WebGL mostly, https://github.com/gpujs/gpu.js/tree/develop/src/backend says: cpu gl headless-gl web-gl web-gl2) and maybe a CPU implementation of Ap.js andOr TinyGlsl. ... [[[https://twitter.com/benrayfield/status/1694812521717195108 WebGPU is working in win10 in Brave and Chrome but not Firefox in https://webkit.org/demos/webgpu/hello-triangle.html . Since it works in an opensource browser  (wheres the webGPU code?), WebGPU now qualifies as open web standard. GPU.js works more places. Heres talk in GPUjs github ... https://github.com/gpujs/gpu.js/issues/822 "WebGPU-based successor for GPUjs #822"]]]',
		
		dagballBug_onlyLowestIndexedNBallsRollOnCurvesTheOthersJustDoVelocity: 'A bug likely caused by Ap.js andOr TinyGlsl.js where the dagball potens function returns the same float32 for the last n indexs, but does not do that depending on various combos of array sizes that by the design of Ap.js and TinyGlsl.js should have no effect but it does. ... this bug was reproduced on 2 computers 2023-12-2, both running win10 with nvidia gpu. in chrome firefox and brave in my computer, and at least chrome in the other, and also just verified the software works in general in firefox and opera in that other computer. TODO more computers, but get Agt tests made first. Put it on a website so can get ppl to help test it by just going to a url. etc. To test this bug in dagball, load a json game state that the bug happens, randomize ball positions button, then quickly run this on console: dagball.balls.map((b,i)=>[b.gradientY,b.gradientX,dagball.debug_lastPotens[i*2],dagball.debug_lastPotens[i*2+1],dagball.debug_lastPotens[dagball.debug_lastPotens.length-1]]); to get something like this, and the last 3 rows shouldnt have 0s: 29		: 		(5) [1.0000228881835938, 0.03719329833984375, -10.6068115234375, -10.616439819335938, -10.616811752319336]		30		: 		(5) [1.0000228881835938, 0.03719329833984375, -10.6068115234375, -10.616439819335938, -10.616811752319336]		31		: 		(5) [1.0000228881835938, 0.03719329833984375, -10.6068115234375, -10.616439819335938, -10.616811752319336]		32		: 		(5) [0, 0, -10.6068115234375, -10.616439819335938, -10.616811752319336]		33		: 		(5) [0, 0, -10.6068115234375, -10.616439819335938, -10.616811752319336]		34		: 		(5) [0, 0, -10.6068115234375, -10.616439819335938, -10.616811752319336]. In that case, its either comparing 2 different physics cycles (one video frame back vs current video frame, as its dagball.balls vs dagball.debug_lastPotens which may have been updated at different times, OR (more likely) thats a bug in CPU not seeing the difference -10.6068115234375 vs -10.616811752319336. Also I had set dagball.game.floatEpsilon to .01 so I could see the potential energy differences easier and test for if its a roundoff problem. But 1 in game coordinates is around 100 or a few hundred pixels (TODO which?) so epsilon shouldnt be that big normally). Maybe its this code since it doesnt use dagball.game.pos in all the code anymore (moved it into circ.edsOut and dagball.balls etc): for(let i=0; i<this.pos.length; i++){			gradient[i] = (potens[i]-neutralPoten)/this.floatEpsilon;		} Added check for that. Dagball097.html:1557 Uncaught Error: gradient.length(33) != this.pos.length(32). Changed to for(let i=0; i<gradient.length; i++), and that may have just fixed it 2023-12-5-308pET. Test more TODO. But even if that fixed it, this ApGpuTester.js is still going to be useful for testing a bunch of stuff, including stuff thats been fixed in case its broken on other computers or in some cases or cuz of future code changes etc. After I made the code change described here (loop up to gradient.length instead of this.pos.length which differs in size by 1) I saw all balls that werent moving start moving in dagball1701804687.142.json.',
		
		arrayDefOrder: 'Vary the order of arrays in Ap.Call and therefore in TinyGlsl, but only using TinyGlsls par array, and the loc array (both are float arrays) that Ap gives to TinyGlsl as code, as the multiple arrays go in these 2 bigger shared arrays. Each locparMem (an Ap memory type) goes in both loc and par. The dagballBug_onlyLowestIndexedNBallsRollOnCurvesTheOthersJustDoVelocity bug occurs even if all arrays are locparMem so loc and par are the same size and every array is at the same index 2 times in both.',
		
		replacingConstIntVarsWithConsts: 'In generated glsl code, often theres multiple "const int" vars that have the same value, especially 0. These could be replaced by inlining the constants without the var. This test subject is to do that or not. Also, sometimes GLSL wont compile when a constant is a param of a built in function but does compile when define it as a var on the line before that function call and use the var instead.',
		
		loadTest: 'dagballBug_onlyLowestIndexedNBallsRollOnCurvesTheOthersJustDoVelocity might have been the result of running alot of GPU calculations at once so when the next video frame started, the previous wasnt finished.',
		
		glslContextLost: 'A bug in TinyGlsl andOr the WebGL2_GLSL systems themselves, that has nothing to do with the number of GLSL contexts (which Ive had over 50 of in TinyGlsl.caches at once without this error happening, and the error often happens with only 1 or 2 contexts): "WARNING: Too many active WebGL contexts. Oldest context will be lost." that comes up at hard to predict times, but seems to come up often in Ap tests as of 2023-11. I fixed it in Ap.js in one case by not going out of float array range in GPU, but it seems to happen for other reasons too. QUOTE from Ap.js 2023-12-3 [[[//TinyGlsl.clearAllCache(); //Trying to fix: "TinyGLSL.js:511 WARNING: Too many active WebGL contexts. Oldest context will be lost." /* That bug was fixed in Dagball090.html 2023-11-18 by this code. Its likely some of the Ap tests are using it wrong the same way. But since the tests are still passing, leave that bug fix for later. It may fail mysteriously later if "Oldest context will be lost" is still in TinyGlsl.caches. The number of gl contexts in TinyGlsl cache is returned by Object.keys(TinyGlsl.caches).filter(x=>x.startsWith(\'gl_\')).length, but its not about the number of caches. Its about memory fencing. If it goes outside of the "float loc[" array (I found in a certain calculation), it will lose that gl context. let gradientCall = Ap.lazyEval(singleHeightmapPotentialEnergiesForGradient_apCode); let numberOfParMems = gradientCall.ape.searchApes(ape=>(ape.apeType==\'parMem\')).length; if((gradientCall.par.memSize > gradientCall.loc.memSize) || numberOfParMems){ throw \'gradientCall.par.memSize(\'+gradientCall.par.memSize+\') > gradientCall.loc.memSize(\'+gradientCall.loc.memSize+\') (this doesnt apply to display, only gradient/potens). gradientCall must have loc.memSize >= par.memSize cuz the gradient calculation copies from par to loc and adds epsilon to 1 of those depending on which GPU thread aka {id}. It must also have no parMem (counted numberOfParMems=\'+numberOfParMems+\') (allow parlocMem and locparMem cuz those exist in both par and loc, and allow locMem cuz that is after par size, but no parMem cuz that would get copied into loc where theres no matched parlocMem or locparMem, so copied over the wrong arrays or even outside of loc memory, resulting in glsl dropping the gl context). See the Ap.js test "copy par to loc with +epsilon in 5 GPU threads and array size 4 so at most 1 float gets +epsilon in each thread. See dagball codeMaker" for how that copying between par and loc and the adding of epsilon is supposed to work. ape=\'+gradientCall.ape; } this.mergedApCalls.singleHeightmapPotentialEnergiesForGradient = gradientCall; */]]]]',

		fillAllMutableFloatArraysWith0sWhenCreate: 'This is probably just float loc[...] in TinyGlsl. Despite it gets set to par[...] or that plus epsilon. Test this by changing Ap.fillLocWithAll0sRightAfterCreate.',

		tinyglslMutableVarsInGlslMainVsBeforeMain: 'such as "float ret = 0.;". GPU threads might be interfering with eachother through these? Or state might be getting saved between GPU calls?',
		
		enlargeArrays: 'dagballBug_onlyLowestIndexedNBallsRollOnCurvesTheOthersJustDoVelocity only happens depending on combos of array sizes, especially the "abc" and "balls" arrays in a certain dagball save state dagball1701553422.398.json ape:{+	(abc locparMem {55})	<(angle float) {fatan y$ x$}>	<(radius float) {fhypot y$ x$}>	<(curveRadius float) {f* radius {f+ 1 {f* .2 {fsin {f* 6 {f+ [abc 10%55] angle}}}}}}>	<(gravity float) {f* y$ -1.1}>	<potenCirc$ {f+ gravity {f* 3.5 {fsigmoid {f- {f* 12 curveRadius} 16}}}}>} and variants of it. Tried numExtraFloatsFIXME var in Ap.js but it didnt work. This',
		
		numberOfTinyGlslCachedGLObjects: 'Example: Number of gl contexts before create another: Object.keys(TinyGlsl.caches).filter(x=>x.startsWith(\'gl_\')).length; TinyGlsl.clearAllCache() Makes canvases, WebGL2 contexts, etc, garbage collectible. Doesnt seem directly related to Agp.subjects.glslContextLost but its something to test. TinyGlsl.clearAllCache() does this and is called automatically every minute or so, partially at random timing, and whenever you click a button in dagball.',
		
		apMemoryFencing: 'See Ap.Range and Ap.NRange //n ranges of ints (nonnegative?) used for (TODO) proving ranges possible values of int vars, //especially where they are used in [...] aka apeType of \'ptr\', \'parPtr\', \'locPtr\', \'bigPtr\', for memory fencing, //since multiple float arrays overlap in {par}, multiple in {loc}, and TODO multiple in {big}. //Also, the "TinyGLSL.js:511 WARNING: Too many active WebGL contexts. Oldest context will be lost." error was fixed //in one case by not going out of range. Ap.NRange = function(ranges){ this.ranges = ranges; }; Ap.NRange.prototype.type = \'ap_nrange\'; "to prevent player created/shared GPU code from destroying the game world... the memory fencing part of FormalVerification: Ap.Ape.prototype.possibleInts = function(){ Todo(\'For each of the apeTypes that returns int, including i+ (someName 55) (someArray parMem {30} (someName 55) {10}) i/ imod, etc, call nrange.multiply(nrange) nrange.union(nrange) etc on child apes to generate this.\');",',
		
		apCallGeneratedGpuTest: 'If a test case is generated by "Ap.Call.prototype.makeTestCaseOfNextGpuPotensCall = function(returnTestCase)" such as dagball while calling Ap.js which calls TinyGlsl.js, it can use this Agt.subjects.apCallGeneratedGpuTest. See this incomplete button in dagball096.html 2023-12-3 <input type=button value="Save last gradient calculation as Ap.Ape test case html (TODO)" onclick="alert(\'TODO\');">.',
		
		apFunc: 'Since its such a common thing to do, especially that it will be 2023-11+, just using Ap.js to define functions in GPU does not mean this Agt.subjects.apFunc is relevant. Its relevant if its looking for bugs related to the function system. Dagball 094 now has ints and floats and functions of them. The doSpring function, created in that textarea, is called with 2 int params and 3 float params. doSpring calls doSpringDetail which takes 7 float params. Thats why the blobs stick together like a chain or rubberband --https://twitter.com/DagBallGame/status/1729642244322308332 . The apeType "?" defines a func, whose params can be apeTypes of float or int or $ (and maybe % but thats not coded yet 2023-12-3, $ is extern float, % is extern int). The apeType "@" defines a call of a "?"/func.',
		
		differentSizesOfLocAndPar: 'Ap.js has 2 shared arrays of apeTypes "par" and "loc". ApeTypes of parMem, locparMem, and parlocMem go in the shared "par" array. ApeTypes of locMem, locparMem, and parlocMem go in the shared "loc" array. ApeTypes of "bigMem" will go in the shared "big" array when big is created but it doesnt exist as of 2023-12-3 and is planned to be used for anything that doesnt fit in a single GPU core such as big neuralnets. As of 2023-12, most uses of Ap.js use locparMem, and if all mems in a certain Ap call are locparMem then this Agt.subjects.differentSizesOfLocAndPar is not relevant cuz par size and loc size equal. If you use locparMems with locMems, then loc size will be bigger than par size, and the arrays that exist in both (which normally those parts have +epsilon added in 1 dimension for GPU optimized calculus gradient in high dimensional scalar field) are at the first n indexs, then the parts that are only loc. Similarly, after those n, par can have indexs that are only in par. big doesnt overlap either of those.',
		
		bigMem: 'bigMem is an incomplete (as of 2023-12-3) memory type and feature in Ap.js, explained in Agt.subjects.differentSizesOfLocAndPar',
		
		tinyGlsl: 'TODO rename or merge Agt.subjects.basicAp .ap .basicTinyGlsl .tinyGlsl. If a test case bypasses the Ap.js layer (which uses TinyGlsl.js) to test TinyGlsl directly, it might want to include this Agt.subjects.directTinyGlsl',
		
		ap: 'TODO rename or merge Agt.subjects.basicAp .ap .basicTinyGlsl .tinyGlsl. Counterpart of Agt.subjects.directTinyGlsl, means it does Ap.js which uses TinyGlsl.js but does not use TinyGlsl directly, or maybe uses both? If both of these are included in subjects, I guess it means both happen in the test.',
	},
	
	//TODO sub-subjects, like 'OS.win10' 'OS.ubuntu' 'OS.android' 'gpuAPI.webgpu'
	//'gpuAPI.opencl12' 'gpuAPI.webgl2_glsl' etc?
	
	testGenerators:{
	},
	
	boot: function(){
		console.log('Agt.boot() //ApGpuTester.js for testing the Ap.Ape (Ape.js) GPU language and TinyGlsl.js that it uses. TODO run andOr generate GPU tests, starting from those in Agt.tests, but TODO make a way to generate tests automatically, cuz theres confusing bugs Im trying to track down.');
	},

	//one of Agt.tests or index in it. Throws if fails, or never halts (such as infinite loop) if it fails a very wrong way.
	//Returns (whatever the test.jsCode says to, TODO what should that be? or just return true?) if it passes.
	test: function(testOrIndex){
		if(typeof testOrIndex == 'number'){
			return this.test(this.tests[testOrIndex]);
		}else{
			return eval(testOrIndex.jsCode)(testOrIndex); //so it can see its own json. TODO use cachedEval (i have that in code somewhere)
		}
	},
	
	tests:[
		{
			description: 'Run the tests in Ap.js as Ap.doApeTests()',
			subjects: {
				basicAp: true,
				glslContextLost: true,
			},
			jsCode: 'test=>{ Ap.doApeTests(); }',
		},
		{
			description: 'Run the tests in TinyGlsl.js as TinyGlsl.testAfterBoot();',
			subjects: {
				basicTinyGlsl: true,
			},
			jsCode: 'test=>{ TinyGlsl.testAfterBoot(); }',
		},
		/*{
			subjects: {
				arrayDefOrder: true,
				glslContextLost: true,
			}
		}*/
		
		{
			"apCodeOld":"{doLast (balls locparMem (numBalls 12) (floatsPerBall 2)) (circHeaders locparMem (numCircs 1) (headerFloatsPerCirc 4)) {+ <(epsilon float) 0.0009765625> <(isDisplayElsePotensForGradient float) 0> {* (gradientCopyIndex copy {par}) <[{loc} gradientCopyIndex] {f+ [{par} gradientCopyIndex] {?: {i== gradientCopyIndex {id}} epsilon 0}}>} (addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap? (pairBallDist float) {f* 8.05 {f** {f/ {fmax 0 {f- 0.07 pairBallDist}} 0.07} 2}}) {* numBalls {+ <(heightASum float) 0> <(heightBSum float) 0> <(pixDistSum float) 0> <(pixBalSum float) 0> <(y float) [balls numBalls 0%2]> <(x float) [balls numBalls 1%2]> <(potenOne float) 0> {listLoop numCircs {+ <(circY float) [circHeaders numCircs 0%4]> <(circX float) [circHeaders numCircs 1%4]> <(circR float) [circHeaders numCircs 2%4]> <(circInfluence float) [circHeaders numCircs 3%4]> <(circWindow float) {?: {fless {fhypot {f- circY y} {f- circX x}} circR} 1 0}> <(potenCirc float) 0>} {f+= potenOne {f* potenCirc circInfluence circWindow}} {+ (c6_abc locparMem {5}) <(c6_a float) {locPtr c6_abc 4%99}> <potenCirc$ {f+ 0.2 {fsin {f* {f+ x$ c6_a} y$ 33}}}>}} {* (otherBall copy numBalls) {+ <(otherBallWeight float) {?: {i== otherBall numBalls} 0 1}> <(otherBallY float) [balls otherBall 0%2]> <(otherBallX float) [balls otherBall 1%2]> <(ballOrDisplayYX_vs_otherBall_distance float) {fhypot {f- y otherBallY} {f- x otherBallX}}> {f+= potenOne {f* otherBallWeight {@addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap ballOrDisplayYX_vs_otherBall_distance}}}}} {f+= (potenSum float) potenOne}}} {freturn potenSum}}}",
			"floatsPerGpuThread":1,
			"numGpuThreads":34,
			"apCallMems":{
				"par":[
					-1.0134574174880981,
					-0.1012020856142044,
					0.7137698531150818,
					-0.004243271425366402,
					-0.6378809213638306,
					-0.6242078542709351,
					0.915749192237854,
					-0.5245952010154724,
					0.10687926411628723,
					-0.8847805857658386,
					-0.5528501868247986,
					-0.7142418026924133,
					-0.43822309374809265,
					0.1861017644405365,
					0.7201663255691528,
					1.26949143409729,
					-0.2957339584827423,
					-0.42836475372314453,
					-1.4664419889450073,
					-1.023977279663086,
					1.6685187816619873,
					-0.11632595956325531,
					0.389517605304718,
					-0.4226902425289154,
					-0.42684027552604675,
					1.8345235586166382,
					4.30369758605957,
					1,
					-0.4878319799900055,
					0.17923933267593384,
					-0.30668291449546814,
					-0.31956273317337036,
					-0.036762867122888565
				]
			},
			"evals":[
				{
					"time":1701631707.5180001,
					"observedOuts":[
						1.2588080167770386,
						1.2620967626571655,
						1.2576111555099487,
						1.2716599702835083,
						1.2534154653549194,
						1.2535959482192993,
						1.2638055086135864,
						1.2488149404525757,
						1.2878330945968628,
						1.2549375295639038,
						1.2478803396224976,
						1.2506970167160034,
						1.255698561668396,
						1.266288161277771,
						1.2383196353912354,
						1.2464874982833862,
						1.261054277420044,
						1.2600481510162354,
						1.2413347959518433,
						1.2345560789108276,
						1.261056661605835,
						1.2303352355957031,
						1.2445566654205322,
						1.2700023651123047,
						1.2583619356155396,
						1.2583619356155396,
						1.2583619356155396,
						1.2595906257629395,
						1.2583619356155396,
						1.2583619356155396,
						1.2583619356155396,
						1.2583619356155396,
						1.2075384855270386,
						1.2583619356155396
					]
				}
			],
			"subjects":{
			"apCallGeneratedGpuTest":true
			},
			//"jsCode":"test=>{ console.log(\"TODO test=\"+JSON.stringify(test)); Todo(); }"
			"jsCode":"Ap.runTest"
		},

		{
			"apCodeOld":"{doLast (balls locparMem (numBalls 12) (floatsPerBall 2)) (circHeaders locparMem (numCircs 1) (headerFloatsPerCirc 4)) {+ <(epsilon float) 0.0009765625> <(isDisplayElsePotensForGradient float) 0> {* (gradientCopyIndex copy {par}) <[{loc} gradientCopyIndex] {f+ [{par} gradientCopyIndex] {?: {i== gradientCopyIndex {id}} epsilon 0}}>} (addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap? (pairBallDist float) {f* 8.05 {f** {f/ {fmax 0 {f- 0.07 pairBallDist}} 0.07} 2}}) {* numBalls {+ <(heightASum float) 0> <(heightBSum float) 0> <(pixDistSum float) 0> <(pixBalSum float) 0> <(y float) [balls numBalls 0%2]> <(x float) [balls numBalls 1%2]> <(potenOne float) 0> {listLoop numCircs {+ <(circY float) [circHeaders numCircs 0%4]> <(circX float) [circHeaders numCircs 1%4]> <(circR float) [circHeaders numCircs 2%4]> <(circInfluence float) [circHeaders numCircs 3%4]> <(circWindow float) {?: {fless {fhypot {f- circY y} {f- circX x}} circR} 1 0}> <(potenCirc float) 0>} {f+= potenOne {f* potenCirc circInfluence circWindow}} {+ (c6_abc locparMem {5}) <(c6_a float) {locPtr c6_abc 4%99}> <potenCirc$ {f+ 0.2 {fsin {f* {f+ x$ c6_a} y$ 33}}}>}} {* (otherBall copy numBalls) {+ <(otherBallWeight float) {?: {i== otherBall numBalls} 0 1}> <(otherBallY float) [balls otherBall 0%2]> <(otherBallX float) [balls otherBall 1%2]> <(ballOrDisplayYX_vs_otherBall_distance float) {fhypot {f- y otherBallY} {f- x otherBallX}}> {f+= potenOne {f* otherBallWeight {@addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap ballOrDisplayYX_vs_otherBall_distance}}}}} {f+= (potenSum float) potenOne}}} {freturn potenSum}}}",
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
			//"jsCode":"test=>{ console.log(\"TODO test=\"+JSON.stringify(test)); Todo(); }"
			"jsCode":"Ap.runTest"
		},

		{
			"apCodeOld":"{doLast (balls locparMem (numBalls 12) (floatsPerBall 2)) (circHeaders locparMem (numCircs 1) (headerFloatsPerCirc 4)) {+ <(epsilon float) 0.0009765625> <(isDisplayElsePotensForGradient float) 0> {* (gradientCopyIndex copy {par}) <[{loc} gradientCopyIndex] {f+ [{par} gradientCopyIndex] {?: {i== gradientCopyIndex {id}} epsilon 0}}>} (addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap? (pairBallDist float) {f* 8.05 {f** {f/ {fmax 0 {f- 0.07 pairBallDist}} 0.07} 2}}) {* numBalls {+ <(heightASum float) 0> <(heightBSum float) 0> <(pixDistSum float) 0> <(pixBalSum float) 0> <(y float) [balls numBalls 0%2]> <(x float) [balls numBalls 1%2]> <(potenOne float) 0> {listLoop numCircs {+ <(circY float) [circHeaders numCircs 0%4]> <(circX float) [circHeaders numCircs 1%4]> <(circR float) [circHeaders numCircs 2%4]> <(circInfluence float) [circHeaders numCircs 3%4]> <(circWindow float) {?: {fless {fhypot {f- circY y} {f- circX x}} circR} 1 0}> <(potenCirc float) 0>} {f+= potenOne {f* potenCirc circInfluence circWindow}} {+ (c6_abc locparMem {5}) <(c6_a float) {locPtr c6_abc 4%99}> <potenCirc$ {f+ 0.2 {fsin {f* {f+ x$ c6_a} y$ 33}}}>}} {* (otherBall copy numBalls) {+ <(otherBallWeight float) {?: {i== otherBall numBalls} 0 1}> <(otherBallY float) [balls otherBall 0%2]> <(otherBallX float) [balls otherBall 1%2]> <(ballOrDisplayYX_vs_otherBall_distance float) {fhypot {f- y otherBallY} {f- x otherBallX}}> {f+= potenOne {f* otherBallWeight {@addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap ballOrDisplayYX_vs_otherBall_distance}}}}} {f+= (potenSum float) potenOne}}} {freturn potenSum}}}",
			"floatsPerGpuThread":1,
			"numGpuThreads":34,
			"apCallMems":{
				"par":[
					-1.0145810842514038,
					-1.1364165544509888,
					-0.10933250188827515,
					1.048651099205017,
					0.45051613450050354,
					0.7482581734657288,
					-0.41402071714401245,
					-0.17621785402297974,
					0.3268742561340332,
					0.13479484617710114,
					-0.17940513789653778,
					-0.4762725830078125,
					0.40220436453819275,
					-0.2308540791273117,
					0.18339693546295166,
					0.03127872571349144,
					0.2382846474647522,
					0.02667808160185814,
					0.1629171073436737,
					-0.2610732614994049,
					-1.2777029275894165,
					0.13942155241966248,
					-0.33815017342567444,
					0.4496011734008789,
					0.7726737260818481,
					0.5358325242996216,
					4.292970180511475,
					1,
					0.624894917011261,
					-0.006711942609399557,
					0.07194910198450089,
					-0.31216251850128174,
					-0.299546480178833
				]
			},
			"evals":[
				{
					"time":1701639498.17,
					"observedOuts":[
						-2.6544713973999023,
						-2.662760019302368,
						-2.703838586807251,
						-2.6789186000823975,
						-2.668764114379883,
						-2.668710470199585,
						-2.697108030319214,
						-2.6951587200164795,
						-2.681009292602539,
						-2.6842148303985596,
						-2.678826093673706,
						-2.681406259536743,
						-2.6944386959075928,
						-2.6726293563842773,
						-2.5831003189086914,
						-2.6912176609039307,
						-2.7696032524108887,
						-2.679090738296509,
						-2.664170980453491,
						-2.687316656112671,
						-2.686721086502075,
						-2.7192251682281494,
						-2.6825993061065674,
						-2.6809241771698,
						-2.6821107864379883,
						-2.6821107864379883,
						-2.6821107864379883,
						-2.6854443550109863,
						-2.6821107864379883,
						-2.6821107864379883,
						-2.6821107864379883,
						-2.6821107864379883,
						-2.696712017059326,
						-2.6821107864379883
					]
				}
			],
			"subjects":{
				"apCallGeneratedGpuTest":true
			},
			"jsCode":"Ap.runTest"
		},
		
		{
			"apCodeOld":"{doLast (balls locparMem (numBalls 3) (floatsPerBall 2)) (circHeaders locparMem (numCircs 1) (headerFloatsPerCirc 4)) {+ <(epsilon float) 0.0009765625> <(isDisplayElsePotensForGradient float) 0> {* (gradientCopyIndex copy {par}) <[{loc} gradientCopyIndex] {f+ [{par} gradientCopyIndex] {?: {i== gradientCopyIndex {id}} epsilon 0}}>} (addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap? (pairBallDist float) {f* 8.05 {f** {f/ {fmax 0 {f- 0.07 pairBallDist}} 0.07} 2}}) {* numBalls {+ <(heightASum float) 0> <(heightBSum float) 0> <(pixDistSum float) 0> <(pixBalSum float) 0> <(y float) [balls numBalls 0%2]> <(x float) [balls numBalls 1%2]> <(potenOne float) 0> {listLoop numCircs {+ <(circY float) [circHeaders numCircs 0%4]> <(circX float) [circHeaders numCircs 1%4]> <(circR float) [circHeaders numCircs 2%4]> <(circInfluence float) [circHeaders numCircs 3%4]> <(circWindow float) {?: {fless {fhypot {f- circY y} {f- circX x}} circR} 1 0}> <(potenCirc float) 0>} {f+= potenOne {f* potenCirc circInfluence circWindow}} <potenCirc$ 0.7>} {* (otherBall copy numBalls) {+ <(otherBallWeight float) {?: {i== otherBall numBalls} 0 1}> <(otherBallY float) [balls otherBall 0%2]> <(otherBallX float) [balls otherBall 1%2]> <(ballOrDisplayYX_vs_otherBall_distance float) {fhypot {f- y otherBallY} {f- x otherBallX}}> {f+= potenOne {f* otherBallWeight {@addToEnergyPerBallDistanceCodePerPairOfBallsForSingleHeightmap ballOrDisplayYX_vs_otherBall_distance}}}}} {f+= (potenSum float) potenOne}}} {freturn potenSum}}}",
			"floatsPerGpuThread":1,
			"numGpuThreads":11,
			"apCallMems":{
				"par":[
					-1.390127182006836,
					-0.7570266127586365,
					-1.3846405744552612,
					1.1078050136566162,
					-0.7466100454330444,
					-0.8411117792129517,
					-0.08120840787887573,
					0.9488611817359924,
					2.8138229846954346,
					1
				]
			},
			"evals":[
				{
					"time":1701715602.997,
					"observedOuts":[
						2.0999999046325684,
						2.0999999046325684,
						2.0999999046325684,
						2.0999999046325684,
						2.0999999046325684,
						2.0999999046325684,
						2.0999999046325684,
						2.0999999046325684,
						2.0999999046325684,
						2.10205078125,
						2.0999999046325684
					]
				}
			],
			"subjects":{
				"apCallGeneratedGpuTest":true
			},
			"jsCode":"Ap.runTest"
		}
	],
	
};
Agt.boot();