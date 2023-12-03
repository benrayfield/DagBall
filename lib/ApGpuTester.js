//Ben Rayfield offers this Agt/ApGpuTester software opensource MIT license.
//ApGpuTester.js for testing the Ap.Ape (Ape.js) GPU language and TinyGlsl.js that it uses.
const Agt = {
	subjects: {
		basicAp: 'Basic testing of Ap.js opcodes aka Ap.Ape.apeType, that do multiply, plus, sine, loops, etc. This might just refer to the tests already in Ap.js?',
		
		basicTinyGlsl: 'Basic testing of TinyGlsl.js. This might just refer to the tests already in TinyGlsl.js?',
		
		OS: 'Which operating system? 2023-11 it runs on most browsers in desktop windows but not in ubuntu linux or android. In ubuntu see dagball/doc/gpu/ubuntuTestFailed2023-11-24 [[Dagball now works in most browsers in windows but not in linux or android. Not tested others. Here\'s what happened in ubuntu. WebGL works so can be fixed. My code: "gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, canvasWidth, canvasHeight, 0, http://gl.RED, gl.FLOAT, null);" DagBall - 1000 dimensional hackerspace @DagBallGame Only TinyGLSL needs to be fixed, not Ap.js or Dagball*.html. TinyGLSL is small simple javascript that calls WebGL2_GLSL code. Nothing else calls GPU.]]. TODO can this be measured thru WebGL2 functions or browser functions, to ask what environment its in or something like that?',
		
		chip: 'Which kind of chip is the test run on? nvidia gpu? amd gpu? amd apu? intel something? etc. WebGL2_GLSL is widely compatible across devices and OS but still need to keep track of on what chips (at least general categories of them) it works vs what error it throws. TODO can this be measured thru WebGL2 functions or browser functions, to ask what environment its in or something like that?',
		
		gpuAPI: 'Normally GPUs, but might be a CPU in here later. Ap.js and TinyGlsl.js are originally built for WebGL2_GLSL, but they might later support OpenCL (https://github.com/benrayfield/lazycl uses LWJGL2\'s OpenCL API) and WebGPU (works in chrome and brave at least, but not firefox, when I tried it in 2023) and GPU.js (has multiple backends, some kinds of WebGL mostly, https://github.com/gpujs/gpu.js/tree/develop/src/backend says: cpu gl headless-gl web-gl web-gl2) and maybe a CPU implementation of Ap.js andOr TinyGlsl. ... [[[https://twitter.com/benrayfield/status/1694812521717195108 WebGPU is working in win10 in Brave and Chrome but not Firefox in https://webkit.org/demos/webgpu/hello-triangle.html . Since it works in an opensource browser  (wheres the webGPU code?), WebGPU now qualifies as open web standard. GPU.js works more places. Heres talk in GPUjs github ... https://github.com/gpujs/gpu.js/issues/822 "WebGPU-based successor for GPUjs #822"]]]',
		
		dagballBug_onlyLowestIndexedNBallsRollOnCurvesTheOthersJustDoVelocity: 'A bug likely caused by Ap.js andOr TinyGlsl.js where the dagball potens function returns the same float32 for the last n indexs, but does not do that depending on various combos of array sizes that by the design of Ap.js and TinyGlsl.js should have no effect but it does. ... this bug was reproduced on 2 computers 2023-12-2, both running win10 with nvidia gpu. in chrome firefox and brave in my computer, and at least chrome in the other, and also just verified the software works in general in firefox and opera in that other computer. TODO more computers, but get Agt tests made first. Put it on a website so can get ppl to help test it by just going to a url. etc.',
		
		arrayDefOrder: 'Vary the order of arrays in Ap.Call and therefore in TinyGlsl, but only using TinyGlsls par array, and the loc array (both are float arrays) that Ap gives to TinyGlsl as code, as the multiple arrays go in these 2 bigger shared arrays. Each locparMem (an Ap memory type) goes in both loc and par. The dagballBug_onlyLowestIndexedNBallsRollOnCurvesTheOthersJustDoVelocity bug occurs even if all arrays are locparMem so loc and par are the same size and every array is at the same index 2 times in both.',
		
		replacingConstIntVarsWithConsts: 'In generated glsl code, often theres multiple "const int" vars that have the same value, especially 0. These could be replaced by inlining the constants without the var. This test subject is to do that or not. Also, sometimes GLSL wont compile when a constant is a param of a built in function but does compile when define it as a var on the line before that function call and use the var instead.',
		
		loadTest: 'dagballBug_onlyLowestIndexedNBallsRollOnCurvesTheOthersJustDoVelocity might have been the result of running alot of GPU calculations at once so when the next video frame started, the previous wasnt finished.',
		
		glslContextLost: 'A bug in TinyGlsl andOr the WebGL2_GLSL systems themselves, that has nothing to do with the number of GLSL contexts (which Ive had over 50 of in TinyGlsl.caches at once without this error happening, and the error often happens with only 1 or 2 contexts): "WARNING: Too many active WebGL contexts. Oldest context will be lost." that comes up at hard to predict times, but seems to come up often in Ap tests as of 2023-11. I fixed it in Ap.js in one case by not going out of float array range in GPU, but it seems to happen for other reasons too. QUOTE from Ap.js 2023-12-3 [[[//TinyGlsl.clearAllCache(); //Trying to fix: "TinyGLSL.js:511 WARNING: Too many active WebGL contexts. Oldest context will be lost." /* That bug was fixed in Dagball090.html 2023-11-18 by this code. Its likely some of the Ap tests are using it wrong the same way. But since the tests are still passing, leave that bug fix for later. It may fail mysteriously later if "Oldest context will be lost" is still in TinyGlsl.caches. The number of gl contexts in TinyGlsl cache is returned by Object.keys(TinyGlsl.caches).filter(x=>x.startsWith(\'gl_\')).length, but its not about the number of caches. Its about memory fencing. If it goes outside of the "float loc[" array (I found in a certain calculation), it will lose that gl context. let gradientCall = Ap.lazyEval(singleHeightmapPotentialEnergiesForGradient_apCode); let numberOfParMems = gradientCall.ape.searchApes(ape=>(ape.apeType==\'parMem\')).length; if((gradientCall.par.memSize > gradientCall.loc.memSize) || numberOfParMems){ throw \'gradientCall.par.memSize(\'+gradientCall.par.memSize+\') > gradientCall.loc.memSize(\'+gradientCall.loc.memSize+\') (this doesnt apply to display, only gradient/potens). gradientCall must have loc.memSize >= par.memSize cuz the gradient calculation copies from par to loc and adds epsilon to 1 of those depending on which GPU thread aka {id}. It must also have no parMem (counted numberOfParMems=\'+numberOfParMems+\') (allow parlocMem and locparMem cuz those exist in both par and loc, and allow locMem cuz that is after par size, but no parMem cuz that would get copied into loc where theres no matched parlocMem or locparMem, so copied over the wrong arrays or even outside of loc memory, resulting in glsl dropping the gl context). See the Ap.js test "copy par to loc with +epsilon in 5 GPU threads and array size 4 so at most 1 float gets +epsilon in each thread. See dagball codeMaker" for how that copying between par and loc and the adding of epsilon is supposed to work. ape=\'+gradientCall.ape; } this.mergedApCalls.singleHeightmapPotentialEnergiesForGradient = gradientCall; */]]]]',
		
		enlargeArrays: 'dagballBug_onlyLowestIndexedNBallsRollOnCurvesTheOthersJustDoVelocity only happens depending on combos of array sizes, especially the "abc" and "balls" arrays in a certain dagball save state dagball1701553422.398.json ape:{+	(abc locparMem {55})	<(angle float) {fatan y$ x$}>	<(radius float) {fhypot y$ x$}>	<(curveRadius float) {f* radius {f+ 1 {f* .2 {fsin {f* 6 {f+ [abc 10%55] angle}}}}}}>	<(gravity float) {f* y$ -1.1}>	<potenCirc$ {f+ gravity {f* 3.5 {fsigmoid {f- {f* 12 curveRadius} 16}}}}>} and variants of it. Tried numExtraFloatsFIXME var in Ap.js but it didnt work. This',
		
		numberOfTinyGlslCachedGLObjects: 'Example: Number of gl contexts before create another: Object.keys(TinyGlsl.caches).filter(x=>x.startsWith(\'gl_\')).length; TinyGlsl.clearAllCache() Makes canvases, WebGL2 contexts, etc, garbage collectible. Doesnt seem directly related to Agp.subjects.glslContextLost but its something to test. TinyGlsl.clearAllCache() does this and is called automatically every minute or so, partially at random timing, and whenever you click a button in dagball.',
		
		apMemoryFencing: 'See Ap.Range and Ap.NRange //n ranges of ints (nonnegative?) used for (TODO) proving ranges possible values of int vars, //especially where they are used in [...] aka apeType of \'ptr\', \'parPtr\', \'locPtr\', \'bigPtr\', for memory fencing, //since multiple float arrays overlap in {par}, multiple in {loc}, and TODO multiple in {big}. //Also, the "TinyGLSL.js:511 WARNING: Too many active WebGL contexts. Oldest context will be lost." error was fixed //in one case by not going out of range. Ap.NRange = function(ranges){ this.ranges = ranges; }; Ap.NRange.prototype.type = \'ap_nrange\'; "to prevent player created/shared GPU code from destroying the game world... the memory fencing part of FormalVerification: Ap.Ape.prototype.possibleInts = function(){ Todo(\'For each of the apeTypes that returns int, including i+ (someName 55) (someArray parMem {30} (someName 55) {10}) i/ imod, etc, call nrange.multiply(nrange) nrange.union(nrange) etc on child apes to generate this.\');",',
		
		dagballGeneratedGpuTest: 'If a test case is generated by dagball while calling Ap.js which calls TinyGlsl.js, it can use this Agt.subjects.dagballGeneratedGpuTest. See this incomplete button in dagball096.html 2023-12-3 <input type=button value="Save last gradient calculation as Ap.Ape test case html (TODO)" onclick="alert(\'TODO\');">.',
		
		apFunc: 'Since its such a common thing to do, especially that it will be 2023-11+, just using Ap.js to define functions in GPU does not mean this Agt.subjects.apFunc is relevant. Its relevant if its looking for bugs related to the function system. Dagball 094 now has ints and floats and functions of them. The doSpring function, created in that textarea, is called with 2 int params and 3 float params. doSpring calls doSpringDetail which takes 7 float params. Thats why the blobs stick together like a chain or rubberband --https://twitter.com/DagBallGame/status/1729642244322308332 . The apeType "?" defines a func, whose params can be apeTypes of float or int or $ (and maybe % but thats not coded yet 2023-12-3, $ is extern float, % is extern int). The apeType "@" defines a call of a "?"/func.',
		
		differentSizesOfLocAndPar: 'Ap.js has 2 shared arrays of apeTypes "par" and "loc". ApeTypes of parMem, locparMem, and parlocMem go in the shared "par" array. ApeTypes of locMem, locparMem, and parlocMem go in the shared "loc" array. ApeTypes of "bigMem" will go in the shared "big" array when big is created but it doesnt exist as of 2023-12-3 and is planned to be used for anything that doesnt fit in a single GPU core such as big neuralnets. As of 2023-12, most uses of Ap.js use locparMem, and if all mems in a certain Ap call are locparMem then this Agt.subjects.differentSizesOfLocAndPar is not relevant cuz par size and loc size equal. If you use locparMems with locMems, then loc size will be bigger than par size, and the arrays that exist in both (which normally those parts have +epsilon added in 1 dimension for GPU optimized calculus gradient in high dimensional scalar field) are at the first n indexs, then the parts that are only loc. Similarly, after those n, par can have indexs that are only in par. big doesnt overlap either of those.',
		
		bigMem: 'bigMem is an incomplete (as of 2023-12-3) memory type and feature in Ap.js, explained in Agt.subjects.differentSizesOfLocAndPar',
		
		tinyGlsl: 'If a test case bypasses the Ap.js layer (which uses TinyGlsl.js) to test TinyGlsl directly, it might want to include this Agt.subjects.directTinyGlsl',
		
		ap: 'Counterpart of Agt.subjects.directTinyGlsl, means it does Ap.js which uses TinyGlsl.js but does not use TinyGlsl directly, or maybe uses both? If both of these are included in subjects, I guess it means both happen in the test.',
	},
	
	//TODO sub-subjects, like 'OS.win10' 'OS.ubuntu' 'OS.android' 'gpuAPI.webgpu'
	//'gpuAPI.opencl12' 'gpuAPI.webgl2_glsl' etc?
	
	testGenerators:{
	},
	
	tests:[
		{
			description: 'Run the tests in Ap.js as Ap.doApeTests()',
			subjects: {
				basicAp: true,
				glslContextLost: true,
			},
			jsCode: 'Ap.doApeTests();',
		},
		{
			description: 'Run the tests in TinyGlsl.js as TinyGlsl.testAfterBoot();',
			subjects: {
				basicTinyGlsl: true,
			},
			jsCode: 'TinyGlsl.testAfterBoot();',
		},
		/*{
			subjects: {
				arrayDefOrder: true,
				glslContextLost: true,
			}
		}*/
	],
	
	boot: function(){
		console.log('Agt.boot() //ApGpuTester.js for testing the Ap.Ape (Ape.js) GPU language and TinyGlsl.js that it uses. TODO run andOr generate GPU tests, starting from those in Agt.tests, but TODO make a way to generate tests automatically, cuz theres confusing bugs Im trying to track down.');
	},
	
};
Agt.boot();