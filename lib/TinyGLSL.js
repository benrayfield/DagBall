//Ben F Rayfield offers TinyGLSL under opensource MIT license.
const Todo = str=>{ throw new Error(str || 'TODO'); };
const Err = str=>{ throw new Error(str || '(Err with no message)'); };
const TinyGlsl = {
	/* TODO take some parts of this and merge into TinyGlsl.description. Remove the other parts to keep it tiny.
	https://twitter.com/benrayfield/status/1701290751877882096

	TinyGLSL is an opensource 58kB javascript file that brings teraflop speed (trillion+ adds multiplies per second) to
	the browser. TinyGlsl.testAfterBoot() or TinyGlsl.simple(code,aFloat32Array(upTo1024),height,width) -> floatsOut.
	1 GPU thread per float out https://github.com/benrayfield/jsutils/blob/master/src/tinyGlsl/TinyGLSL_2023-9-11-130pET.js
	1:44 PM · Sep 11, 2023
	·
	34
	Views
	View post analytics
	2
	Quotes

	Lambda Rick /acc
	@benrayfield
	·
	1h
	id is GPU thread id, ranges 0 to ids-1 (flattens 2d to 1d). idy ranges 0 to idh-1 (height). idx ranges 0 to idw-1 (width).
	par[0] is first float param. par[theFloatArray.length-1] is last float param. Set ret = anything you want; to return that
	float from that GPU thread.
	Lambda Rick /acc
	@benrayfield
	·
	1h
	Here's an instant demo in browser of 3d mandelbulb fractal using an older version of TinyGlsl. I'm planning to use
	TinyGLSL for making high dimensional browser games and AGI in peer to peer networks.
	https://memecombinator.io/experiments/ForestCurveFit012.html
	Lambda Rick /acc
	@benrayfield
	·
	1h
	TinyGLSL in browser is about as fast as native OpenCL. Eat my dust TensorflowJS.
	Lambda Rick /acc
	@benrayfield
	·
	57m
	let tenThousandFloatsOut = TinyGlsl.simple('ret = float(id)*float(id);', Float32Array.of(0), 1000, 10);
	*/
	description: 'TinyGLSL forked 2023-9-10-8pET from ForestCurveFit (and might modify it?). TinyGLSL (by Ben F Rayfield Y2023, opensource MIT license) is a javascript library that runs GPU code in browser using webgl2 glsl code, but only at most about 1000 floats in for efficiency (IO is the bottleneck of GPUs, so this can be alot faster than matmul in theory), 1 kernel at a time, many times in parallel, with each GPU thread returning 1 float. Use TinyGlsl.simple function to do that. On a good gaming computer it should, as of Y2023, do about 1 teraflop. You might use it to compute 3d fractals with 1 GPU thread per pixel, or ForestCurveFit kind of neuralnet (thats my first usecase), etc. If your use cases need more inputs or multiple kernels used together, you should either make multiple calls in sequence, each time getting a Float32Array back to CPU, or more efficiently, use glsl directly instead of this software. I might add those more complex abilities later.',
	
	todos: [
		'2024-5-21 clean up these todos and dones lists. they havent been updated in a long time. things might be done in them but marked as todo. Lots of new todos are written other places, though thats mostly for stuff that calls TinyGLSL.',
		'TinyGlsl.clearAllCache is doing it not the best way, not sure how well it will work, by just making webgl buffers, off-screen canvases, etc, not reachable by javascript pointers. Need to keep track of which gl instance and canvas instance etc (maybe a dependnet) things were created with and use gl.delete* funcs. TODO also reuse canvas and gl instance if same size (which I tried when making tinyGlsl but it didnt work, dont know why).',
		'very simple 3d voxel system similar to https://github.com/benrayfield/statvoxel , that around each near local area has a 2d grid of voxels, 1 per direction that would be seen from screen there (bucket in that direction, keep nearest that matches, when loop thru other near "near local area"s to copy relevant voxels into here). Do that and make some fun 3d shapes of twisty caves and bridges etc. for monkeyball-like and snakepass-like games etc. will hook in ape language for various stuff maybe NPCs.',
		'TinyGlsl.clearAllCache is doing it not the best way, not sure how well it will work, by just making webgl buffers, off-screen canvases, etc, not reachable by javascript pointers. Need to keep track of which gl instance and canvas instance etc (maybe a dependnet) things were created with and use gl.delete* funcs. TODO also reuse canvas and gl instance if same size (which I tried when making tinyGlsl but it didnt work, dont know why). Maybe those should be grouped by ape code that defines arrays since they are all in parrMem (the part of it that a circ is computed in, which varies in offset in parrMem, ???, or maybe leave ape out of this since that ape code can be changed?). Maybe ape parrMem arrays should be circs at a lower dag level than where the ape code goes?',
		"make a version of this that reads matAB and matBC from bigMem and reads built in var 'id' from tinyGlsl to know which dotProd to do.",
		'the x y and if 3d also z apeTypes',
		'dagballScalarPortsAndDagForest see the big comment near top of the html file 2023-9-14.',
		'plan for how to have AI do airhockey and the moving heightmap game using ForestCurveFit software. rubberbandlike paths vs qlearning etc?',
		'options.useGPUIn_predict_ifNumOutsIs1 and make sure GPU works by computing TriTriRect.predict with it, so graphics and curve fitting work by GPU',
		'optionsuseGPUIn_lossGradient, optimize it by GPU. Is this just the dagball.Game.prototype.potens and dagball.Game.prototype.potentialEnergiesForDisplay funcs? Those are already GPU optimized 2023-10.',
		'fix all webgl2/glsl memory leaks such as by gl.deleteTexture etc, or put them in TinyGlsl.caches to reuse them. but dont keep allocating more each call',
		'Test max loop size, like in GPU.js i think it defaults to max loop size of 1000. is that inherited from GLSL?',
		'Use this software to GPU optimize ForestCurveFit',
		'Clean up unnecessary code, comments, etc in this software',
		'Check this 1024 limit on multiple computers. it likely varies across different computers andOr implementations of webgl2. if(floatsPar.length > 1024)',
		"put error checking back in after fix it: TODO if(correctOut != observedOut) throw 'i='+i+' correctOut='+correctOut+' observedOut='+observedOut;",
		'Its like curling. It would be cool if it moved forward. --@Ken67547214. @benrayfield In-game editor will let players live build and share custom shaped curling game areas or airhockey in chosen parts of endless shared 2d world, custom size/shape of pucks and the end of the sticks but not the poles. Since its 2d cross-section of many dimensions u only get the ends. Might be a problem with the friction being "velocity decay" instead of "subtract from velocity", but might could add both kinds to dimensions in general. Will put that in dagball.todos list but not sure if can do normal friction. Manifold would contain all possible curling games. Actually, the friction limits are only relevant to the balls. If I define the puck and stick-ends as part of the curve itself, I can make them move by any smooth equation I want. -- https://twitter.com/Ken67547214/status/1702442156843995187',
		'Ill probably make a 3d view of the hills and valleys / heightmap, but for now bright is hill and dark is valley.',
	],

	dones: [
		'fix the id var which duplicates and skips numbers if you count it from 0 to 19 (ids==20). Im trying gl_VertexID for that instead of getting it from coord.x.',
		'Use this software to GPU optimize 3d mandelbrot fractal andOr raytracing of n mirror balls',
		'Cache the compiled glsl program (createProgram) etc',
		'Test speed with double loop triple loop etc - See mandelbulb fractal, runs about 1 teraflop as a ballpark estimate',
	],

	//of TinyGlsl.simple(...) calls.
	//measureTime: false, //normal
	measureTime: true, //test
	measureTime_ifTakesLongerThanThis: .05, //If TinyGlsl.simple(...) takes at least this long, log it. This is for tracking down compiler lag 2024-5-10+.
	measureTime_start: 0,
	measureTime_end: 0,

	//times in seconds that TinyGlsl.simple(...) takes to return, but only if its not cached.
	//firstCallTimes: [],
	//like first
	//allCallTimes: [],


	//in TinyGlsl.simple(...), when this is nonnull, it copies the params of simple(...) to a {...} and calls callListener on that.
	//Its main use case as of 2024-5-19 (creating it then) is to track down the NaN bug where GPU outputs are all NaN when
	//no input is NaN and transformFloatValsToVArray checkbox is checked in dagball.html. A button in dagball should
	//set this to find such a call, ignoring the calls where inputs contain any NaNs, and display it in left textarea or console,
	//then set this back to null automatically cuz it found that, when found so user can track down the bug.
	callListener: null,

	//This is how you call GPU from browser. It returns a Float32Array(height*width*floatsOutPerPixel) using height*width GPU threads.
	//If you use the same code, height, width and floatsOutPerPixel, it will reuse the same canvas and GL object and compiled shaders
	//so happens in a few milliseconds without recompiling. That is important in dagball.html for reaching 60 FPS
	//and doing 1 or more tiny neuralnet training batches, physics, and graphics, per video frame, as multiple calls of TinyGlsl.simple.
	//Other than caching and nondeterministic-float32-roundoff, this is a stateless pure-function that blocks/returnsSynchronously.
	//
	//TODO param optionalBlobs is undefined or something like {AB: aFloat32Array, BC: aFloat32Array},
	//and also allow uniform/const int and float params in there such as sizeA sizeB sizeC, for matmul.
	//floatsOutPerPixel can be 1 or 4. Returned Float32Array is size height*width*floatsOutPerPixel. Defaults to 1 if that optional param is not given.
	simple:
		//(function(code, par, outs){
			//let outsLen = typeof(outs)=='number' ? outs : outs.length;
			//parMem and bigMem are Float32Arrays. bigMem can be null and as of 2023-11-3 is for future expansion.
		(function(beforeCode, code, par, big, height, width, optionalFloatsOutPerPixel){
			if(TinyGlsl.measureTime){
				TinyGlsl.measureTime_start = TinyGlsl.time();
			}
			if(typeof(beforeCode) != 'string') Err('beforeCode must be a string but is a '+typeof(beforeCode));
			if(typeof(code) != 'string') Err('code must be a string but is a '+typeof(code));
			if(par.length === undefined) Err('par has no length field. Its normally a Float32Array but potentially could be a js [] list of numbers.');
			if(big && big.length === undefined) Err('big exists but has no length field. Its normally a Float32Array but potentially could be a js [] list of numbers.');
			if(typeof(height) != 'number') Err('height must be a number but is a '+typeof(height));
			if(typeof(width) != 'number') Err('width must be a number but is a '+typeof(width));
			let ret = null;
			let code3 = null; //the final code after all transforms, given to GL.
			try{
				let floatsOutPerPixel = optionalFloatsOutPerPixel || 1;
				if(typeof(floatsOutPerPixel) != 'number') Err('floatsOutPerPixel must be a number but is a '+typeof(floatsOutPerPixel));
				if(floatsOutPerPixel != 1 && floatsOutPerPixel != 4){
					throw 'floatsOutPerPixel='+floatsOutPerPixel+' but must be 1 or 4';
				}
				if(par.length == 0){
					console.log('making it an array size 1 of 0.0. TODO??? throw par.length must be at least 1 (and at most 1000 or what was the exact limit?) cuz glsl doesnt allow empty arrays, and would take time to find the code that depends on it being there for the case when its empty.');
					par = Float32Array.of(0); //FIXME this might cause a problem since Ap.Call.par will think its size 0.
				}
				if(!height || !width) throw 'height='+height+' width='+width;
				TinyGlsl.boot(); //only the first time
				//let outsLen = typeof(outs)=='number' ? outs : outs.length;
				let outsLen = height*width;
				//Code string uses these vars:
				//par - read-only float array, the param. You only get 1 input, and its this array, so put all the params here.
				//pars - size of par array.
				//ret - return this float. starts as 0, in case you dont set it.
				//id - GPU thread id, range 0 to ids-1
				//ids - number of GPU threads. Each returns 1 float.
				//also idy idx idh idw which define the pixel rectangle, since glsl has to do rectangle. use id and ids if you want it flattened.
				//Code can use vec2 vec3 vec4 if for float int etc, whatever you can do in webgl glsl2 #version 300 es.
				//To efficiently use GPU, use at least as big of outs.length as you have GPU cores.
				//Can be more, and they will take turns, but less and some go unused. Normally this is a few hundred to a few thousand.
				//
				//Params:
				//par = the input floats. Float32Array, up to size 1024 or might have to be a little smaller.
				//outs = size of output floats, or give a Float32Array of that size to reuse.
				/*TODO? let height;
				let width;
				if(outsLen > 8192){
					height = width = Math.ceil(Math.sqrt(outsLen)); //equal or slightly more than outsLen, but GLSL has to do rectangle.
					if(outsLen != height*width){
						throw 'TODO allow any size up to a few million, regardless of if its a multiply of 2 integers, by dropping the few extra (maybe a Float32Array backed view of the first outsLen flaots?). outsLen='+outsLen+' height='+height+' width='+width;
					}
				}else{
					height = 1;
					width = outsLen;
				}*/
				/*2023-11-26 before adding functions that return float and take float params. "func4 and call apeTypes (distFunc func4 {fhypot {f- temp0$ temp1$} {f- temp2$ temp3$}})"
				let code2 =
					`${TinyGlsl.glslVersionString}
					precision highp float;
					${beforeCode}
					uniform vec2 mouse;
					uniform float par[${par.length}];
					in vec2 coord;
					//flat in int id;
					out vec4 fragColor;
					void main(){
						const int pars = ${par.length}; //number of params in the par array
						const int idh = ${height}; //height in pixels
						const int idw = ${width}; //width in pixels
						int idy = int(coord.y*float(idh)); //y position from 0 to idh-1
						int idx = int(coord.x*float(idw)); //x position from 0 to idw-1
						int id = idy*idw+idx; //2d pixel index in 1 int
						const int ids = idh*idw; //height*width
						float ret = 0.; //floatsOutPerPixel=${floatsOutPerPixel} use ret retb retc retd if 4, use just ret if 1.
						float retb = 0.;
						float retc = 0.;
						float retd = 0.;
						//TODO for funcs of up to 10 float params, math expressions to refer to child float outputs multiple times, etc.
						float temp0 = 0.; float temp1 = 0.; float temp2 = 0.; float temp3 = 0.; float temp4 = 0.;
						float temp5 = 0.; float temp6 = 0.; float temp7 = 0.; float temp8 = 0.; float temp9 = 0.;
						float circY = 0.; //each dagball.Circ.y //FIXME remove dagball-specific and Ap.Ape-specific code.
						float circX = 0.; //each dagball.Circ.x
						float circR = 0.; //each dagball.Circ.r
						float circInfluence = 0.; //each dagball.Circ.influence
						float circWindow = 0.; //0 to 1. using the circle as a windowing function
						float potenCirc = 0.; //circs GPU code sets this. gets added into potenOne automatically. then in outer loop over balls, potenOne gets added into potenSum.
						//start user code
						${code}
						//end user code
						fragColor = vec4(ret, retb, retc, retd);
					}`;
				*/
				/*2023-12-5 let code2 =
					`${TinyGlsl.glslVersionString}
					precision highp float;
					uniform vec2 mouse;
					uniform float par[${par.length}];
					in vec2 coord;
					//flat in int id;
					out vec4 fragColor;
					const int pars = ${par.length}; //number of params in the par array
					const int idh = ${height}; //height in pixels
					const int idw = ${width}; //width in pixels
					const int ids = idh*idw; //height*width
					float ret = 0.; //floatsOutPerPixel=${floatsOutPerPixel} use ret retb retc retd if 4, use just ret if 1.
					float retb = 0.;
					float retc = 0.;
					float retd = 0.;
					//TODO for funcs of up to 10 float params, math expressions to refer to child float outputs multiple times, etc.
					float temp0 = 0.; float temp1 = 0.; float temp2 = 0.; float temp3 = 0.; float temp4 = 0.;
					float temp5 = 0.; float temp6 = 0.; float temp7 = 0.; float temp8 = 0.; float temp9 = 0.;
					float circY = 0.; //each dagball.Circ.y //FIXME remove dagball-specific and Ap.Ape-specific code.
					float circX = 0.; //each dagball.Circ.x
					float circR = 0.; //each dagball.Circ.r
					float circInfluence = 0.; //each dagball.Circ.influence
					float circWindow = 0.; //0 to 1. using the circle as a windowing function
					float potenCirc = 0.; //circs GPU code sets this. gets added into potenOne automatically. then in outer loop over balls, potenOne gets added into potenSum.
					//float testFunctionASDFASDF(int idABC, float a, float b){ //FIXME remove this
					//	return a+b;
					//}
					${beforeCode}
					void main(){
						int idy = int(coord.y*float(idh)); //y position from 0 to idh-1. FIXME if idy idx or id is used in beforeCode, will need to be passed as param. Maybe just id?
						int idx = int(coord.x*float(idw)); //x position from 0 to idw-1
						int id = idy*idw+idx; //2d pixel index in 1 int
						//start user code
						${code}
						//end user code
						//ret = testFunctionASDFASDF(id, ret,-.5); //FIXME remove this
						fragColor = vec4(ret, retb, retc, retd);
					}`;*/
					let code2 =
					`${TinyGlsl.glslVersionString}
					precision highp float;
					uniform vec2 mouse;
					uniform float par[${par.length}];
					in vec2 coord;
					//flat in int id;
					out vec4 fragColor;
					const int pars = ${par.length}; //number of params in the par array
					const int idh = ${height}; //height in pixels
					const int idw = ${width}; //width in pixels
					const int ids = idh*idw; //height*width
					${beforeCode}
					void main(){
						int idy = int(coord.y*float(idh)); //y position from 0 to idh-1. FIXME if idy idx or id is used in beforeCode, will need to be passed as param. Maybe just id?
						int idx = int(coord.x*float(idw)); //x position from 0 to idw-1
						int id = idy*idw+idx; //2d pixel index in 1 int
						float ret = 0.; //floatsOutPerPixel=${floatsOutPerPixel} use ret retb retc retd if 4, use just ret if 1.
						float retb = 0.;
						float retc = 0.;
						float retd = 0.;
						//start user code
						${code}
						//end user code
						//ret = testFunctionASDFASDF(id, ret,-.5); //FIXME remove this
						fragColor = vec4(ret, retb, retc, retd);
					}`;

				code3 = TinyGlsl.addLineNumbers(code2);
				TinyGlsl.last_code3 = code3;
				//if(TinyGlsl.logNextN_code3){
				//	console.log('TinyGlsl.simple, code3=\n'+code3);
				//	TinyGlsl.logNextN_code3--;
				//}
				//reuse the Float32Array(height*width) if same size as last time
				//TODO remove existing float array of different size from cache.
				let arrCacheKey = 'floatsH'+height+'W'+width+'C'+floatsOutPerPixel;
				let outs = TinyGlsl.caches[arrCacheKey];
				if(!outs){
					outs = TinyGlsl.caches[arrCacheKey] = TinyGlsl.putTid(new Float32Array(height*width*floatsOutPerPixel)); //would automaticaly putTid if use TinyGlsl.cache(key, lazyEvalIfKeyNotFound)
				}
				if(outs.length != height*width*floatsOutPerPixel){
					throw 'outs.length='+outs.length+' but must be height*width*floatsOutPerPixel='+(height*width*floatsOutPerPixel);
				}
				ret = TinyGlsl.internalGLSL_disorganizedTODO(code3, par, big, outs, height, width);
				if(TinyGlsl.measureTime){
					TinyGlsl.measureTime_end = TinyGlsl.time();
					let duration = TinyGlsl.measureTime_end-TinyGlsl.measureTime_start;
					if(duration >= TinyGlsl.measureTime_ifTakesLongerThanThis){
						console.log('TinyGlsl.simple, duration='+duration+', now='+TinyGlsl.measureTime_end);
					}
				}
			}finally{
				if(TinyGlsl.callListener){
					TinyGlsl.callListener({type: 'tinyglsl_simple_call', beforeCode, code, par, big, height, width, floatsOutPerPixel:optionalFloatsOutPerPixel, code3, ret});
				}
			}
			return ret;
		}),

	//the kind of callMap TinyGlsl.callListener is called on if its nonnull, when TinyGlsl.simple(...) is called.
	//does not include callMap.ret.
	callMapToJsCode: callMap=>{
		//FIXME escape strings
		return 'TinyGlsl.simple(`'+callMap.beforeCode+'`,`'+callMap.code+'`,\nFloat32Array.of('+callMap.par.join(',')+'),\nFloat32Array.of('+callMap.big.join(',')+'),\n'+callMap.height+','+callMap.width+','+callMap.floatsOutPerPixel+')';
	},

	//created by TinyGlsl.simple(...). code3 is a string just before anything happens in GL, the unmodified GLSL code.
	//Set this to 1 or higher to get the next code3 in console.log, when you call TinyGlsl.simple.
	last_code3: '',
	//use TinyGlsl.last_code3 instead
	//logNextN_code3: 0,

	//counts down each time glsl code is made in fragmentShaderSource (not vertex shader which just puts a rectangle grid on 2 triangles).
	logNextNGlslCodes: 0,

	logNumGlContexts: false,

	log_cachedJsEval_eval: false,

	//eval 1 code string in 1 gpu thread
	one: function(code){
		return TinyGlsl.simple('', code, Float32Array.of(0), null, 1, 1);
	},
		
	webglType: 'webgl2', //If you change this from 'webgl2' to 'webgl', some features wont be there and it will break.
	
	glslVersionString: '#version 300 es',

	skip_gl_getProgramParameter_LINK_STATUS: false, //2024-5-9-640pET defaulting this to false (dont skip) cuz of I turned SKLT=F (dont skip) by clicking the button and this neuralnet nnet_1715286589.548.dagball compiled in about .1 second when I changed {nodes 12} to {nodes 13}.
	//skip_gl_getProgramParameter_LINK_STATUS: true, //normal as of 2024-5-9 cuz it made compiling GLSL alot faster, probably some thread thing it didnt have to wait on, considering theres multiple off-screen canvases.
	//skip_gl_getProgramParameter_LINK_STATUS: false, //normal before 2024-5-9, but TODO experimentally trying skipping it cuz this line takes .1 to 20 seconds and is likely causing threads to wait on eachother
	//skip_gl_getProgramParameter_LINK_STATUS: true, //for testing, or maybe it will work out this way?

	//as comments at end of most lines
	addLineNumbers: function(code){
		let lines = code.split(/(?:\r\n)|\n|\r/); //?: starts a noncapturing group, so it doesnt include those in the returned list, just whats between
		let code3 = '';
		let lineNum = 1;
		for(let line of lines){
			if(line.startsWith('#version')){ //dont comment on the first line
				code3 += line+'\n';
			}else{
				code3 += line+' //'+(lineNum)+'\n';
			}
			lineNum++;
		}
		return code3;
	},


	//returns 'Uint8Array' or 'Float64Array' or 'object' or 'number' or 'string' for example.
	//https://stackoverflow.com/questions/58280379/how-to-find-the-type-of-a-typedarray
	//FIXME also check (x instanceof DataView)?
	//TODO also check vm.isWikibinator203Lambda(x) and return 'fn' if so?
	jsType: x=>(ArrayBuffer.isView(x) ? x.constructor.name : typeof(x)),
		
	caches: {},

	delete: (glOrCanvasObject,optionalDescription)=>{
		let jsType = TinyGlsl.jsType(glOrCanvasObject);
		if(jsType == 'Float32Array'){
			console.log('Dont need to do extra stuff to delete Float32Array '+glOrCanvasObject);
		}else if(jsType == 'Int32Array'){
			console.log('Dont need to do extra stuff to delete Float32Array '+glOrCanvasObject);
		}else if(glOrCanvasObject instanceof WebGLRenderingContext || glOrCanvasObject instanceof WebGL2RenderingContext){
			/*github copilot says 2023-10-19: console.log('Deleting WebGLRenderingContext '+glOrCanvasObject);
			glOrCanvasObject._gl.getExtension('WEBGL_lose_context').loseContext();
			glOrCanvasObject._gl = null;
			glOrCanvasObject = null;
			*/
			/*GPT4 says 2023-10-19 To delete a WebGL2RenderingContext, you don't actually delete the context itself.
			Instead, you delete the resources associated with that context, and if you want to entirely remove WebGL
			rendering, you can remove the associated canvas element from the DOM.
			*/
			console.log('Dont need to do extra stuff to delete WebGLRenderingContext or WebGL2RenderingContext: '+glOrCanvasObject);
		}else if(glOrCanvasObject instanceof Number){
			console.log('Dont need to do extra stuff to delete Number '+glOrCanvasObject);
		}else if(glOrCanvasObject instanceof WebGLBuffer){
			console.log('Deleting WebGLBuffer '+glOrCanvasObject);
			glOrCanvasObject._gl.deleteBuffer(glOrCanvasObject);
		}else if (glOrCanvasObject instanceof WebGLTexture){
			console.log('Deleting WebGLTexture '+glOrCanvasObject);
			glOrCanvasObject._gl.deleteTexture(glOrCanvasObject);
		}else if (glOrCanvasObject instanceof WebGLFramebuffer){
			console.log('Deleting WebGLFramebuffer '+glOrCanvasObject);
			glOrCanvasObject._gl.deleteFramebuffer(glOrCanvasObject);
		}else if (glOrCanvasObject instanceof WebGLShader){
			console.log('Deleting WebGLShader '+glOrCanvasObject);
			glOrCanvasObject._gl.deleteShader(resource);
		}else if (glOrCanvasObject instanceof WebGLProgram){
			console.log('Deleting WebGLProgram '+glOrCanvasObject);
			glOrCanvasObject._gl.deleteProgram(resource);
		}else if (glOrCanvasObject instanceof HTMLCanvasElement){
			console.log('Deleting HTMLCanvasElement '+glOrCanvasObject);
			glOrCanvasObject.remove();
		}else if(glOrCanvasObject instanceof String){
			console.log('Dont need to delete String '+glOrCanvasObject);
		}else{
			throw 'Dont know how to delete this type '+typeof(glOrCanvasObject)+' val='+glOrCanvasObject+' optionalDescription='+optionalDescription;
		}
		glOrCanvasObject = null; //helps garbcol?
	},

	count_clearAllCache: 0, //number of times TinyGlsl.clearAllCache() was called.
	
	//an "ugly hack"/workaround (TODO test it) for the hard to predict
	//"WARNING: Too many active WebGL contexts. Oldest context will be lost." appearing on browser console warnings.
	//By clearing the cache, all off-screen-canvases and gl contexts will become garbage-collectible,
	//but it might cause immediate errors in expecting that after trying to create a context that it exists.
	//It will compute the wrong thing in GPU or not compute in GPU (i see strange things on screen 2024-2-24
	//in the 2d canvas which is not a WebGL canvas but things from off-screen-canvases thru webgl are copied
	//to cpu memory then cpu modifies that on screen canvas.
	//do_clearAllCache_whenWebglContextLost: false,
	do_clearAllCache_whenWebglContextLost: true,

	clearAllCache: function(){
		let startTime = TinyGlsl.time();
		console.log('START TinyGlsl.clearAllCache(), startTime='+startTime);
		TinyGlsl.count_clearAllCache++;

		console.log('TinyGlsl.clearAllCache is doing it not the best way, not sure how well it will work, by just making webgl buffers, off-screen canvases, etc, not reachable by javascript pointers. Need to keep track of which gl instance and canvas instance etc (maybe a dependnet) things were created with and use gl.delete* funcs. TODO also reuse canvas and gl instance if same size (which I tried when making tinyGlsl but it didnt work, dont know why).');
		/*
		let list = Object.keys(TinyGlsl.caches);
		for(let key in TinyGlsl.caches){
			if(!TinyGlsl.caches[key].tid){
				throw 'Object in TinyGlsl.caches doesnt have tid (timeId that it was created) so dont know what order to delete it in. key='+key+' val='+TinyGlsl.caches[key];
			}
		}
		//creates tid field if not exist. thats why I check if its there first and throw if its not, cuz likely creates errors to delete in wrong order
		//cuz of dependnet in webgl/canvas objects with pointers to eachother.
		list.sort(TinyGlsl.tidComparatorForMapKeys(TinyGlsl.caches));
		for(let key of list){
			let val = TinyGlsl.caches[key];
			console.log('clearAllCache, about to delete, key='+key+' tid='+val.tid); //timeId the val was created
			TinyGlsl.delete(val, key);
			delete tinyGlsl[key];
		}
		*/

		TinyGlsl.caches = {};
		let endTime = TinyGlsl.time();
		console.log('END TinyGlsl.clearAllCache() duration='+(endTime-startTime)+' endTime='+endTime);
	},

	cachedJsEval: function(jsCodeString){
		let key = 'jsEval_'+jsCodeString;
		return TinyGlsl.cache(key, ()=>{
			if(TinyGlsl.log_cachedJsEval_eval){
				console.log('TinyGlsl.cachedJsEval, about to eval, key='+key);
			}
			return eval(jsCodeString)
		});

	},

	//if this is nonnull (a {}), then TinyGlsl.cache(key,lazyVal) puts stats into it when lazyVal is called but does not store the output of lazyVal here.
	//TODO This could get big so it waits for it to be set to {} externally (by a button in dagball normally)
	cacheStats: null,

	//returns the last value returned by lazyVal() or reuses it if exists for same key.
	cache: function(key, lazyVal){
		if(key === undefined) throw 'key is undefined';
		if(lazyVal === undefined) throw 'lazyVal is undefined';
		let val = TinyGlsl.caches[key];
		if(val === undefined){
			//putTid: put a .tid field that is dagball.timeId() so can be deleted in same order as created (or reverse order?) Or might help in choosing the order in some cases?
			let startTime;
			if(TinyGlsl.cacheStats){
				startTime = TinyGlsl.time();
			}
			val = TinyGlsl.caches[key] = TinyGlsl.putTid(lazyVal());
			if(TinyGlsl.cacheStats){
				let now = TinyGlsl.time();
				TinyGlsl.cacheStats[key] = TinyGlsl.cacheStats[key] || {};
				let duration = now-startTime;
				TinyGlsl.cacheStats[key].count = (TinyGlsl.cacheStats[key].count|0)+1;
				TinyGlsl.cacheStats[key].lastDurationEndTime = now;
				TinyGlsl.cacheStats[key].lastDuration = duration;
			}
		}
		return val;
	},

	timeOffset_: performance.timing.navigationStart,
	//UTC seconds with fraction. More precise than Date.now()*.001. Chrome seems to have 4 digits after decimal point, and brave and firefox 3 digits.
	time: ()=>((TinyGlsl.timeOffset_+performance.now())*.001),

	timeIdPrev: 0,

	/*returns a float64 that is bigger than the last float64 returned by this and is as close to the current UTC time as possible.
	..
	Tested this on (Double.doubleToLongBits(1697766252.4079208)-Double.doubleToLongBits(1697766252.3960001)) in java which returned 49999.
	I generated those 2 doubles on browser console in brave by:
	x = TinyGlsl.time();
	1697766252.3960001
	for(let i=0; i<49999; i++) x = TinyGlsl.nextUpPositiveDouble(x)
	1697766252.4079208
	This works cuz all the positive finite doubles are sorted the same way as their raw long/int64 bits. The negatives come after that cuz high bit / sign bit is 1.
	Name these tid (Time ID), like put that in webgl/glsl and canvas objects to know what time created them so can try deleting them in that same order or reverse order???
	*/
	timeId: ()=>{
		let now = TinyGlsl.time();
		return TinyGlsl.timeIdPrev = Math.max(now, TinyGlsl.nextUpPositiveDouble(TinyGlsl.timeIdPrev));
	},

	//put a tid field (timeId) on the object if it doesnt already have one (0 doesnt count), then return the object.
	//Example: let floats = TinyGlsl.putTid(new Float32Array(100));
	putTid: ob=>{
		if(!ob.tid){
			ob.tid = TinyGlsl.timeId();
		}
		return ob;
	},

	//same as TinyGlsl.putTid(ob).tid but usually faster. Returns the timeId of the object, and creates one if it doesnt have it yet.
	tid: ob=>(ob.tid || TinyGlsl.putTid(ob).tid),

	tidComparator: (a,b)=>{
		//cant subtract cuz might lose the difference to roundoff
		let aTid = TinyGlsl.tid(a);
		let bTid = TinyGlsl.tid(b);
		if(aTid < bTid) return -1;
		if(aTid > bTid) return 1;
		return 0;
	},

	//a js {} to sort by valA.tid, valB.tid, etc.
	tidComparatorForMapKeys: map=>{
		return function(a,b){
			return TinyGlsl.tidComparator(map[a],map[b]);
		};
	},

	//returns true (bigEndian) or false (littleEndian) or throws if overlapping Uint8Array and Float64Array dont store pi correctly either way.
	isBigEndian: ()=>{
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
	},

	twoIntsOverlappingADouble: null,

	doubleOverlappingTwoInts: null,

	booted: false,

	doTestAfterBoot: false, //for testing other things if TinyGlsl tests are blocking it
	//doTestAfterBoot: true, //normal

	boot: ()=>{
		if(TinyGlsl.booted){
			return;
		}
		console.log('START TinyGlsl.boot()');
		if(TinyGlsl.isBigEndian()){
			throw 'TinyGlsl detected bigEndian, which was not needed until 2023-10-19 (coding Dagball072), but that is not supported in the TinyGlsl.timeId code (which needs to overlap a Float64Array with an Int32Array and is not supported in Wikibinator203, for example.';
		}else{
			console.log('TinyGlsl VM detected littleEndian and may use that for overlapping .buffer in Uint8Array, Int32Array, Float32Array, Float64Array, etc. Despite that bigEndian is how people usually write things, most hardware seems to be littleEndian.');
		}
		TinyGlsl.twoIntsOverlappingADouble = new Int32Array(2);
		TinyGlsl.doubleOverlappingTwoInts = new Float64Array(TinyGlsl.twoIntsOverlappingADouble.buffer);
		let high32BitsOfPi = TinyGlsl.high32BitsOfDouble(Math.PI);
		let low32BitsOfE = TinyGlsl.low32BitsOfDouble(Math.E); //intentionally mixed the these in case something strange happens in the overlapping Int32Array and Float64Array.
		let low32BitsOfPi = TinyGlsl.low32BitsOfDouble(Math.PI);
		if(high32BitsOfPi != 0x400921fb){
			//in case of something strange going on where Math.PI isnt a specific 64 bits. got this from Long.toString(Double.doubleToLongBits(Math.PI),16) in java.
			//java and browser javascript seem to agree on float64 math at least the basics and constants. IEEE754.
			throw 'high32BitsOfPi should be 0x400921fb but is '+Number.intToHex(high32BitsOfPi);
		}
		if(low32BitsOfPi != 0x54442d18){
			throw 'low32BitsOfPi should be 0x54442d18 but is '+Number.intToHex(low32BitsOfPi); //in case of something strange going on where Math.PI isnt a specific 64 bits
		}
		let high32BitsOfE = TinyGlsl.high32BitsOfDouble(Math.E);
		let rebuiltPi = TinyGlsl.twoIntsToDouble(high32BitsOfPi, low32BitsOfPi);
		let rebuiltE = TinyGlsl.twoIntsToDouble(high32BitsOfE, low32BitsOfE);
		let piTest = 'Math.PI='+Math.PI+" != rebuiltPi="+rebuiltPi+' high32BitsOfPi '+high32BitsOfPi+' low32BitsOfPi '+low32BitsOfPi;
		let eTest = 'Math.E='+Math.E+" != rebuiltE="+rebuiltE+' high32BitsOfE '+high32BitsOfE+' low32BitsOfE '+low32BitsOfE;
		if(rebuiltPi != Math.PI){
			throw piTest;
		}
		if(rebuiltE != Math.E){
			throw eTest;
		}
		console.log('high32BitsOfDouble and low32BitsOfDouble tests pass, '+piTest+', '+eTest);
		TinyGlsl.booted = true;
		if(TinyGlsl.doTestAfterBoot){
			console.log('END TinyGlsl.boot(), about to call testAfterBoot');
			TinyGlsl.testAfterBoot();
			console.log('END TinyGlsl.boot() for real this time, done with testAfterBoot().');
		}
	},

	low32BitsOfDouble: function(d){
		//littleEndian. tested with TinyGlsl.isBigEndian(), throws in TinyGlsl.boot() if its not.
		TinyGlsl.doubleOverlappingTwoInts[0] = d;
		return TinyGlsl.twoIntsOverlappingADouble[0];
	},
	
	high32BitsOfDouble: function(d){
		//littleEndian. tested with TinyGlsl.isBigEndian(), throws in TinyGlsl.boot() if its not.
		TinyGlsl.doubleOverlappingTwoInts[0] = d;
		return TinyGlsl.twoIntsOverlappingADouble[1];
	},

	twoIntsToDouble: function(highInt, lowInt){
		//littleEndian. tested with TinyGlsl.isBigEndian(), throws in TinyGlsl.boot() if its not.
		TinyGlsl.twoIntsOverlappingADouble[0] = lowInt;
		TinyGlsl.twoIntsOverlappingADouble[1] = highInt;
		return TinyGlsl.doubleOverlappingTwoInts[0];
	},

	//If its a positive double and not the max possible positive double, returns the smallest double thats bigger.
	//https://twitter.com/benrayfield/status/1715188907145343046
	//Fixed it so its rolling over from 1-epsilon to 1 to 1+epsilon right now.
	nextUpPositiveDouble: function(d){
		//littleEndian. tested with TinyGlsl.isBigEndian(), throws in TinyGlsl.boot() if its not.
		TinyGlsl.doubleOverlappingTwoInts[0] = d;
		TinyGlsl.twoIntsOverlappingADouble[0]++; //low 32 bits
		if(!TinyGlsl.twoIntsOverlappingADouble[0]){ //if wraps around back to 0
			TinyGlsl.twoIntsOverlappingADouble[1]++; //carry
		}
		return TinyGlsl.doubleOverlappingTwoInts[0];
	},
	/*
	//GPT4 wrote this to do same thing as java.lang.Math.nextUp(double) which returns the smallest double value thats higher than d.
	//This is buggy. dont use.
	nextUpDouble: d=>{
		const EPSILON = 2.220446049250313e-16; // Number.EPSILON
		if(isNaN(d)){
			return NaN;
		}
		if(d === 0){
			return EPSILON * EPSILON; // Smallest positive subnormal value
		}
		if(d === Infinity){
			return Infinity;
		}
		if (d > 0){
			return d * (1 + EPSILON);
		}else{
			return d + EPSILON * d;
		}
	},*/
	
	internalGLSL_disorganizedTODO:
		(function(glslCode, floatsPar, bigMem, floatsOutOrOutputSize, canvasHeight, canvasWidth){
			TinyGlsl.debug_lastCode = glslCode;
			if(canvasHeight < 1 || canvasHeight > 8192) throw 'canvasHeight='+canvasHeight;
			if(canvasWidth < 1 || canvasWidth > 8192) throw 'canvasWidth='+canvasWidth;
			//console.log('internalGLSL_disorganizedTODO code=\n'+glslCode);
			//reads glslCode. reads floatsPar. writes floatsOutOrOutputSize or reads floatsOutOrOutputSize as a number to make new Float32Array to return.
			//runs floatsOut number of GPU threads that return 1 float each.
			//FIXME? floatsPar.length <= 1024 or the limit might be a little less than that or may vary across computers.
			//FIXME remove the coord and mouse arrays, and rename other vars, since im going to use this tool for a variety of things.
			if(floatsPar.length > 1024){
				Err('floatsPar.length is too big: '+floatsPar.length);
			}
			if(bigMem && bigMem.length==0){
				bigMem = undefined;
			}
			if(bigMem){
				Err('TODO upgrade TinyGlsl to have bigMem. As of 2023-11-3 its for future expansion and will use isample2D or texture or buffer or something.');
			}
			let floatsOut = typeof(floatsOutOrOutputSize)=='number' ? (new Float32Array(floatsOutOrOutputSize)) : floatsOutOrOutputSize;
			let floatsOutPerPixel = floatsOut.length/(canvasHeight*canvasWidth);
			if(floatsOutPerPixel != 1 && floatsOutPerPixel != 4){
				Err('floatsOutPerPixel (computed by floatsOut.length/(canvasHeight*canvasWidth)) = '+floatsOutPerPixel+' but must be 1 or 4');
			}
			//FIXME also include TinyGlsl.glslVersionString?
			let cacheKeySuffix = '_cacheKeySuffix_glType'+TinyGlsl.webglType+'_H'+canvasHeight+'_W'+canvasWidth+'_floatsOutLen'+floatsOut.length+'_glslCode['+glslCode+']';

			//let canvasHeight = 512;
			//let canvasWidth = 512;
			//let canvasHeight = 1;
			//let canvasWidth = 801;
			//let canvasWidth = floatsOut.length;

			//const canvas = document.getElementById("canvas");
			
			/*
			//let caches = TinyGlsl.caches || (window.caches = {});
			let cacheKey = 'glslCanvasH'+canvasHeight+'W'+canvasWidth;
			let canvas = TinyGlsl.caches[cacheKey];
			if(!canvas){
				canvas = TinyGlsl.caches[cacheKey] = document.createElement("canvas");
				canvas.setAttribute("height", ''+canvasHeight);
				canvas.setAttribute("width", ''+canvasWidth);
				TinyGlsl.caches.gl = canvas.getContext(TinyGlsl.webglType);
			}
			let gl = TinyGlsl.caches.gl;
			if(!gl) throw 'No gl';
			*/
			let canvas = TinyGlsl.cache('glslCanvas'+cacheKeySuffix, function(){
			//let canvas = TinyGlsl.cache('glslCanvas', function(){
				//FIXME should canvas be deduped just by its size, or should it include cacheKeySuffix?
				let c = document.createElement("canvas");
				c.setAttribute("height", ''+canvasHeight);
				c.setAttribute("width", ''+canvasWidth);
				c.addEventListener('webglcontextlost', function(event){
					//event.preventDefault();
					//activeContexts.delete(context);
					console.log('TinyGLSL says canvas event webglcontextlost, event='+event);
					if(TinyGlsl.do_clearAllCache_whenWebglContextLost){
						console.log('TinyGlsl.do_clearAllCache_whenWebglContextLost STARTING TinyGlsl.clearAllCache()...');
						TinyGlsl.clearAllCache();
						console.log('TinyGlsl.do_clearAllCache_whenWebglContextLost DONE TinyGlsl.clearAllCache().');
					}
				}, false);
				return c;
			});
			let gl = TinyGlsl.cache('gl'+cacheKeySuffix, function(){
				
				
				
				
				
				
				
				
				
				
				
				//FIXME this will make it thrash between gradient and display, since need at least 2 of these at once in dagball. but just for testing 2023-11-18...
				//TinyGlsl.clearAllCache(); //Trying to fix: "TinyGLSL.js:511 WARNING: Too many active WebGL contexts. Oldest context will be lost.")








				if(TinyGlsl.logNumGlContexts) console.log('Number of gl contexts before create another: '+Object.keys(TinyGlsl.caches).filter(x=>x.startsWith('gl_')).length);
				let gl = canvas.getContext(TinyGlsl.webglType);
				glErr = gl.getError();
				if(glErr){
					throw new Error('after canvas.getContext(TinyGlsl.webglType), gl.getError()='+glErr);
				}
				if(!gl.getExtension('EXT_color_buffer_float')){
					throw 'EXT_color_buffer_float not supported so cant return 1 or 4 floats per pixel instead of bytes';
				}
				let isContextLost = gl.isContextLost();
				console.log('creating gl context, gl.isContextLost()=='+isContextLost);
				if(isContextLost){
					throw new Error('gl.isContextLost()=='+isContextLost+', see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isContextLost');
				}
				console.log('Returning new webgl context '+gl);
				return gl;
			});

			let vertexCode_value = `${TinyGlsl.glslVersionString}
			in vec4 position;
			out vec2 coord;
			//flat out int id;
			void main() {
				coord = position.xy * 0.5 + 0.5;
				//id = gl_VertexID;
				gl_Position = position;
			}
			`;

			//let program;

			/*
			const positionBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW); //2 triangles covering canvas rectangle
			*/
			let positionBuffer = TinyGlsl.cache('positionBufferOfSquareOf2Triangles'+cacheKeySuffix, function(){
				const p = gl.createBuffer();
				//FIXME if gl is replaced in cache, positionBuffer must also be. likely similar for other things in cache.
				gl.bindBuffer(gl.ARRAY_BUFFER, p);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW); //2 triangles covering canvas rectangle
				return p;
			});

			/*let mouseX = 0;
			let mouseY = 0;
			canvas.addEventListener("mousemove", (event) => {
				mouseX = event.offsetX;
				mouseY = event.offsetY;
			});*/


			//use these instead of canvas[[[
			//tested in TinyGlsl.cache: if (!gl.getExtension('EXT_color_buffer_float')){
			//	throw 'EXT_color_buffer_float not supported so cant store just 1 float per pixel';
			//}

			
			/*
			//Create and configure the texture
			const texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, canvasWidth, canvasHeight, 0, gl.RED, gl.FLOAT, null);
			*/
			let texture;
			if(floatsOutPerPixel == 1){
				texture = TinyGlsl.cache('texture_onefloatchannel'+cacheKeySuffix, function(){
					let t = gl.createTexture();
					//FIXME if gl is replaced in cache, texture must also be. likely similar for other things in cache.
					gl.bindTexture(gl.TEXTURE_2D, t);
					gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, canvasWidth, canvasHeight, 0, gl.RED, gl.FLOAT, null);
					return t;
				});
			}else if(floatsOutPerPixel == 4){
				texture = TinyGlsl.cache('texture_fourfloatchannels'+cacheKeySuffix, function(){
					let t = gl.createTexture();
					//FIXME if gl is replaced in cache, texture must also be. likely similar for other things in cache.
					gl.bindTexture(gl.TEXTURE_2D, t);
					//gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, canvasWidth, canvasHeight, 0, gl.RED, gl.FLOAT, null);
					gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, canvasWidth, canvasHeight, 0, gl.RGBA, gl.FLOAT, null);
					return t;
				});
			}else{
				throw 'floatsOutPerPixel='+floatsOutPerPixel+' but must be 1 or 4. TODO use "multiple render targets" aka 8 of vec4/float4 with the "out" keyword, instead of just 1 out of gl_fragColor. 8*4=32 floats out are the theoretical limit for WebGL2 GLSL ES 300. Put them in a Ret[up to 32] array. Require it be either 1 or a multiple of 4, and use that instead of ret, retb, retc, and retd if its more than 4.';
			}

			/*
			//Create and configure the framebuffer
			const framebuffer = gl.createFramebuffer();
			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
			*/
			let framebuffer = TinyGlsl.cache('framebuffer'+cacheKeySuffix, function(){
				const f = gl.createFramebuffer();
				//FIXME if gl is replaced in cache, framebuffer must also be. likely similar for other things in cache.
				gl.bindFramebuffer(gl.FRAMEBUFFER, f);
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
				return f;
			});
			//]]]

			
			
			/*//use these instead of canvas[[[
			const framebuffer = gl.createFramebuffer();
			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

			const renderbuffer = gl.createRenderbuffer();
			gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, 512, 512);  // Change the format and dimensions as needed

			// Attach the renderbuffer to the framebuffer
			gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, renderbuffer);

			// Check if framebuffer is complete
			if(gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE){
				console.error('Framebuffer is not complete');
			}
			//]]]
			*/


			/*
			let createProgram = function(vertexShaderSource, fragmentShaderSource){
				let programCacheKey = 'programCacheKey['+vertexShaderSource+']['+fragmentShaderSource+']';
				if(TinyGlsl.caches[programCacheKey]) return TinyGlsl.caches[programCacheKey];


				const vertexShader = gl.createShader(gl.VERTEX_SHADER);
				gl.shaderSource(vertexShader, vertexShaderSource);
				gl.compileShader(vertexShader);
				if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
					throw new Error(gl.getShaderInfoLog(vertexShader));
				}

				const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
				gl.shaderSource(fragmentShader, fragmentShaderSource);
				gl.compileShader(fragmentShader);
				if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
					throw new Error(gl.getShaderInfoLog(fragmentShader));
				}

				const program = gl.createProgram();
				gl.attachShader(program, vertexShader);
				gl.attachShader(program, fragmentShader);
				gl.linkProgram(program);
				if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
					throw new Error(gl.getProgramInfoLog(program));
				}

				TinyGlsl.caches[programCacheKey] = program;
				return program;
			};*/

			let vertexShaderSource = vertexCode_value;
			let fragmentShaderSource = glslCode;
			if(TinyGlsl.logNextNGlslCodes > 0){
				console.log('TinyGlsl.logNextNGlslCodes='+TinyGlsl.logNextNGlslCodes+' fragmentShaderSource=\n'+fragmentShaderSource);
				TinyGlsl.logNextNGlslCodes--;
			}
			let program = TinyGlsl.cache('programCacheKey_vertexShader['+vertexShaderSource+']'+cacheKeySuffix, function(){

				//FIXME does this put extra stuff in gl if theres multiple fragmentShaderSource but reuses same vertexShaderSource?

				/*
				const vertexShader = gl.createShader(gl.VERTEX_SHADER);
				gl.shaderSource(vertexShader, vertexShaderSource);
				gl.compileShader(vertexShader);
				if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
					throw new Error(gl.getShaderInfoLog(vertexShader));
				}*/
				//cacheKeySuffix already contains the fragmentShader, but not the vertexShader since thats always the same 2023-9-10.
				let vertexShader = TinyGlsl.cache('vertexShader['+vertexShaderSource+']'+cacheKeySuffix, function(){
					let v = gl.createShader(gl.VERTEX_SHADER);
					gl.shaderSource(v, vertexShaderSource);
					gl.compileShader(v);
					if(!gl.getShaderParameter(v, gl.COMPILE_STATUS)){
						throw new Error(gl.getShaderInfoLog(v)+'\n\nVERTEXSHADERCODE:\n'+vertexShaderSource);
					}
					return v;
				});
				
				/*
				const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
				gl.shaderSource(fragmentShader, fragmentShaderSource);
				gl.compileShader(fragmentShader);
				if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
					throw new Error(gl.getShaderInfoLog(fragmentShader));
				}*/
				//cacheKeySuffix already contains the fragmentShader, but not the vertexShader since thats always the same 2023-9-10.
				let fragmentShader = TinyGlsl.cache('fragmentShader'+cacheKeySuffix, function(){
					const f = gl.createShader(gl.FRAGMENT_SHADER);
					gl.shaderSource(f, fragmentShaderSource);
					gl.compileShader(f);
					if(!gl.getShaderParameter(f, gl.COMPILE_STATUS)){
						throw new Error(gl.getShaderInfoLog(f)+'\n\nFRAGMENTSHADERCODE:\n'+fragmentShaderSource);
					}
					return f;
				});

				const p = gl.createProgram();
				gl.attachShader(p, vertexShader);
				gl.attachShader(p, fragmentShader);
				gl.linkProgram(p);
				if(!TinyGlsl.skip_gl_getProgramParameter_LINK_STATUS && !gl.getProgramParameter(p, gl.LINK_STATUS)){
					throw new Error(gl.getProgramInfoLog(p));
				}
				return p;
			});

			let par = floatsPar;

			//let outarr = new Float32Array(512*512); //FIXME should be a param
			let outarr = floatsOut;

			/*
			// start with mandelbrot
			//try {
				program = createProgram(vertexCode_value, glslCode);
				//errorTextarea.value = "OK";

				/*
				// Get the uniform location for par after the program is created
				const parLocation = gl.getUniformLocation(program, "par");

				// Set the par uniform
				gl.uniform1fv(parLocation, par);
				*
			//} catch (error) {
			//	errorTextarea.value = error.message;
			//}
			*/

			// compile and link shader on textarea change
			//vertexCode.addEventListener("input", updateShader);
			//glslCode.addEventListener("input", updateShader);

			/*
			function updateShader() {
				try{
					const newProgram = createProgram(vertexCode.value, glslCode.value);
					program = newProgram;
					errorTextarea.value = "OK";
				}catch(error){
					errorTextarea.value = error.message;
				}
			}*/

			//a Texture and RenderBuffer are similar. Texture can be input and output for multiple steps in glsl.
			//RenderBuffer is output only, back to CPU or screen.
			//A FrameBuffer contains things that contain image data
			//but does not directly contain image data. Its more for control-flow.
			//If you dont specify a FrameBuffer, the default one will be to a canvas.

			// render loop
			let render = function(){

				//Bind the offscreen framebuffer. instead of canvas.
				gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

				gl.clearColor(0, 0, 0, 0);
				gl.clear(gl.COLOR_BUFFER_BIT);

				if (program) {
					gl.useProgram(program);

					// set uniforms
					const mouseLocation = gl.getUniformLocation(program, "mouse");
					//gl.uniform2f(mouseLocation, mouseX, mouseY);
					gl.uniform2f(mouseLocation, .67844, .2343234); //FIXME remove mouse since tinyGlsl is not specific to graphics or UI

					// draw rectangle
					gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
					const positionLocation = gl.getAttribLocation(program, "position");
					gl.enableVertexAttribArray(positionLocation);
					gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

					const parLocation = gl.getUniformLocation(program, "par");
					gl.uniform1fv(parLocation, par);

					gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

					if(floatsOutPerPixel == 1){
						//copy from GPU (texture or renderbuffer) to CPU (outarr)
						gl.readPixels(0, 0, canvasWidth, canvasHeight, gl.RED, gl.FLOAT, outarr); //getting gl.RED only uses EXT_color_buffer_float (which may exist only in desktop browsers not mobile?)
						//console.log('outarr[2345]='+outarr[2345]);
					}else if(floatsOutPerPixel == 4){
						//copy from GPU (texture or renderbuffer) to CPU (outarr)
						gl.readPixels(0, 0, canvasWidth, canvasHeight, gl.RGBA, gl.FLOAT, outarr);
					}else{
						throw 'floatsOutPerPixel='+floatsOutPerPixel+' but must be 1 or 4';
					}
				}

				//requestAnimationFrame(render);
			};
			
			render();
			if(outarr != floatsOut) throw 'Diff out arrays';
			TinyGlsl.debug_lastGlGetError = gl.getError();
			return outarr;
		}),
		
	testAfterBoot: (function(){
		//tests work 2023-9-10.
		console.log('START: TinyGlsl.testAfterBoot()');

		/*
		// Create the par array and update the uniform
		let floatsPar = new Float32Array(1000); //at most 1024, or something like that. might be less cuz of other vars in kernels.
		for (let i=0; i<floatsPar.length; i++){
			floatsPar[i] = i;
		}

		let glslCode =
			`${TinyGlsl.glslVersionString}
			precision highp float;
			uniform vec2 mouse;
			uniform float par[${floatsPar.length}];
			//in vec4 position;
			//flat in int id;
			in vec2 coord;
			out vec4 fragColor;

			void main() {
				//TODO gl_VertexID
				//vec2 coord = position.xy * 0.5 + 0.5; //FIXME?
				//gl_Position = position; //FIXME?

				float frompar = par[4]; // Get the corresponding value from par
				float diag[10];
				diag[0] = 1.3;
				for(int d=1; d<10; d++){
					diag[d] = float(d);
				}
				//diag[1] = 1.;
				for(int d=1; d<10; d++){
					diag[d] = diag[d-1]*diag[d-1]+.7*par[d];
				}

				vec2 c = vec2(coord.x, coord.y);
				vec2 z = vec2(0.0, 0.0);
				float i = -mouse.x * 0.71 + 1.0 * coord.x + 0.1 * mouse.y;

				for (int j = 0; j < 1000; j++) {
					vec2 v = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
					if (length(v) > 2.0)
						break;
					z = v;
				}

				fragColor = vec4(z.x / (4.0 + diag[2] + -1.9*frompar)+mouse.x,
					mouse.x * 0.001, 0.0 + mouse.y * mouse.y * 0.000001, 1.0);
			}`;
		
		//let floatsOut = new Float32Array(801); //TODO what size?

		let floatsOut = TinyGlsl.internalGLSL_disorganizedTODO(glslCode, floatsPar, new Float32Array(801), 1, 801);
		console.log('floatsOut[222]='+floatsOut[222]);
		
		
		let parB = Float32Array.of(100,2);
		let outsBSize = 10;
		let testBOuts = TinyGlsl.internalGLSL_disorganizedTODO(
			`${TinyGlsl.glslVersionString}
			precision highp float;
			uniform vec2 mouse;
			uniform float par[${parB.length}];
			in vec2 coord;
			out vec4 fragColor;

			void main(){
				int id = int(coord.x*${outsBSize+'.'});
				float ret = par[0]+pow(par[1],float(id));
				fragColor = vec4(ret, 0., 0., 1.);
			}`,
			parB,
			outsBSize
		);
		for(let i=0; i<10; i++){
			let correctOut = 100+2**i;
			let observedOut = testBOuts[i];
			console.log('i='+i+' correctOut='+correctOut+' observedOut='+observedOut+' diff='+Math.abs(correctOut-observedOut));
			if(correctOut != observedOut){
				throw 'i='+i+' correctOut='+correctOut+' observedOut='+observedOut;
			}
		}
		console.log('GLSL test pass: internalGLSL_disorganizedTODO');
		*/

		//FIXME move the tenThousandFloatsOut test to end cuz its bigger output array so tests TinyGlsl.caches.

		let tenThousandFloatsOut = TinyGlsl.simple('', 'ret = float(id)*float(id);', Float32Array.of(0), null, 1000, 10);
		//let tenThousandFloatsOut = TinyGlsl.simple('', 'ret = float(id)*float(id);', Float32Array.of(0), null, 8000, 1);
		//let tenThousandFloatsOut = TinyGlsl.simple('', 'ret = float(id);', Float32Array.of(0), null, 1, 8000);
		let correct5678 = 5678*5678;
		let observed5678 = tenThousandFloatsOut[5678];
		if(correct5678 != observed5678){
			throw 'correct5678='+correct5678+' observed5678='+observed5678;
		}
		console.log('tenThousandFloatsOut test pass');
		
		let outsId = TinyGlsl.simple('', 'ret = float(id);', Float32Array.of(0,10,20,30,40,50), null, 1, 20);
		//let outsId = TinyGlsl.simple('', 'ret = float(theId);', Float32Array.of(0,10,20,30,40,50), null, 20);
		for(let i=0; i<outsId.length; i++){
			let correctOut = i;
			let observedOut = outsId[i];
			console.log('outsId['+i+']='+outsId[i]);
			if(correctOut != observedOut) throw 'i='+i+' correctOut='+correctOut+' observedOut='+observedOut;
		}

		let outsC = TinyGlsl.simple('', 'ret = par[2]+par[3]+float(id)*.001;', Float32Array.of(0,10,20,30,40,50), null, 1, 100);
		//let outsC = TinyGlsl.simple('', 'ret = par[2]+par[3]+.001;', Float32Array.of(0,10,20,30,40,50), null, 100);
		for(let i=0; i<outsC.length; i++){
			let observedOut = outsC[i];
			let approxCorrectOut = 20+30+i*.001;
			console.log('outsC['+i+']='+observedOut);
			let diff = Math.abs(observedOut-approxCorrectOut);
			if(diff > .001) throw 'i='+i+' approxCorrectOut='+approxCorrectOut+' observedOut='+observedOut;
		}
		console.log('TinyGlsl.simple test A pass');
		
		let hundredFloats = new Float32Array(100);
		for(let i=0; i<hundredFloats.length; i++){
			hundredFloats[i] = Math.random();
		}
		//TODO time it using the performance object, make TinyGlsl.time function, copy it from my other code.
		let hundredOuts = TinyGlsl.simple(
			'',
			`float sum = 0.;
			float idf = float(id);
			for(int i=0; i<pars; i++){
				for(int j=0; j<pars; j++){
					sum += (par[i]+idf)*(par[j]-idf);
				}
			}
			ret = sum;`,
			hundredFloats,
			null,
			1,
			hundredFloats.length
		);
		let id = 71;
		let sum = 0;
		for(let i=0; i<hundredFloats.length; i++){
			for(let j=0; j<hundredFloats.length; j++){
				sum += (hundredFloats[i]+id)*(hundredFloats[j]-id);
			}
		}
		let approxCorrectOut = sum;
		let observedOut = hundredOuts[id];
		let ratio = observedOut/approxCorrectOut;
		let s = 'id='+id+' approxCorrectOut='+approxCorrectOut+' observedOut='+observedOut+' ratio='+ratio;
		console.log(s);
		if(Math.max(ratio,1/ratio) > 1.00001) throw s;
		console.log('TinyGlsl.simple test B pass');

		let tenThousandFloatsOutB = TinyGlsl.simple('', 'ret = float(id)*float(id)+0.;', Float32Array.of(0), null, 1000, 10);
		//let tenThousandFloatsOut = TinyGlsl.simple('', 'ret = float(id)*float(id);', Float32Array.of(0), null, 8000, 1);
		//let tenThousandFloatsOut = TinyGlsl.simple('', 'ret = float(id);', Float32Array.of(0), null, 1, 8000);
		let correct5678B = 5678*5678;
		let observed5678B = tenThousandFloatsOutB[5678];
		if(correct5678B != observed5678B){
			throw 'correct5678B='+correct5678+' observed5678B='+observed5678;
		}
		let correct8989B = 8989*8989;
		let observed8989B = tenThousandFloatsOutB[8989];
		let diff = Math.abs(correct8989B-observed8989B);
		if(diff > 10){ //cuz theres 24 digit bits in float, and 8989*8989 exceeds that. 5678*5678 does too but the answer is a multiple of 4 so its ok.
			throw 'correct8989B='+correct8989B+' observed5678B='+observed8989B;
		}
		console.log('tenThousandFloatsOutB test pass');

		let fourFloatsOnePixel_observedOut = TinyGlsl.simple(
			'',
			`ret = par[0]*par[1];
			retb = par[0]+par[1];
			retc = par[0]-par[1];
			retd = par[0]/par[1];`,
			Float32Array.of(10,20),
			null,
			1,
			1,
			4
		);
		let fourFloatsOnePixel_correctOut = Float32Array.of(200,30,-10,.5);
		for(let i=0; i<4; i++){
			if(fourFloatsOnePixel_observedOut[i] != fourFloatsOnePixel_correctOut[i]){
				throw 'fourFloatsOnePixel_observedOut['+i+']='+fourFloatsOnePixel_observedOut[i]+' fourFloatsOnePixel_correctOut['+i+']='+fourFloatsOnePixel_correctOut[i];
			}
		}
		console.log('fourFloatsOnePixel test pass');

		let fourHundredFloatsOneHundredPixels_observedOut = TinyGlsl.simple(
			'',
			`float add = float(id)*1000.;
			ret = add+par[0]*par[1];
			retb = add+par[0]+par[1];
			retc = add+par[0]-par[1];
			retd = add+par[0]/par[1];`,
			Float32Array.of(10,20),
			null,
			1,
			1,
			4
		);
		let fourHundredFloatsOneHundredPixels_correctOut = new Float32Array(400);
		for(let i=0; i<100; i++){
			fourHundredFloatsOneHundredPixels_correctOut[i*4] = i*1000+200;
			fourHundredFloatsOneHundredPixels_correctOut[i*4] = i*1000+30;
			fourHundredFloatsOneHundredPixels_correctOut[i*4] = i*1000-10;
			fourHundredFloatsOneHundredPixels_correctOut[i*4] = i*1000+.5;
		}
		for(let i=0; i<400; i++){
			if(fourHundredFloatsOneHundredPixels_observedOut[i] != fourFloatsOnePixel_correctOut[i]){
				throw 'fourHundredFloatsOneHundredPixels_observedOut['+i+']='+fourHundredFloatsOneHundredPixels_observedOut[i]+
					' fourHundredFloatsOneHundredPixels_correctOut['+i+']='+fourHundredFloatsOneHundredPixels_correctOut[i];
			}
		}
		console.log('fourHundredFloatsOneHundredPixels test pass');

		console.log("How to use TinyGLSL with 4 floats per pixel: TinyGlsl.simple('', 'ret = par[0]*par[1]; retb = float(id)*1000.+par[0]+par[1]; retc = par[0]-par[1]; retd = par[0]/par[1];', Float32Array.of(10,20), null, 1, 3, 4) -> Float32Array.of(200, 30, -10, 0.5, 200, 1030, -10, 0.5, 200, 2030, -10, 0.5)");
		
		/*
		//let tenThousandFloatsOut = TinyGlsl.simple('', 'ret = float(id)*float(id);', Float32Array.of(0), null, 1000, 10);
		let tenThousandFloatsOut = TinyGlsl.simple('', 'ret = float(id)*float(id);', Float32Array.of(0), null, 8000, 1);
		let correct5678 = 5678*5678;
		let observed5678 = tenThousandFloatsOut[5678];
		if(correct5678 != observed5678){
			throw 'correct5678='+correct5678+' observed5678='+observed5678;
		}
		console.log('tenThousandFloatsOut test pass');
		*/
		console.log('END: TinyGlsl.testAfterBoot()');
	}),

	jsNumToGlslFloat: jsNum=>{
		let s = ''+jsNum;
		if(!s.includes('.') && !s.includes('e')) s += '.'; //Examples: '3.', '3.45', '5e-10', '-5e-10'
		return s;
	},
};


/*
Possible test cases to add...

reads loc before writes it. returns all NaNs.

TinyGlsl.simple('', `
float loc[10];
float externalVarX = loc[0];
float externalVarY = loc[1];
float externalVarZ = loc[2];
float externalVarW = loc[3];
float result_f = 0.0;
float intermediate_f = 0.0;
float anotherIntermediate_f = 0.0;
float temp_f = 0.0;

// Initialize loc array
for(int i=0; i<10; i++) loc[i] = par[i];

// Nested loop with complex operations
for (int j = 0; j < 3; j++) {
    for (int k = 0; k < 3; k++) {
        intermediate_f = length(vec2(externalVarX, externalVarY)) + float(j) + float(k);
        anotherIntermediate_f = externalVarZ * loc[4] - loc[5] + float(j) - float(k);

        temp_f = exp(intermediate_f) * log(anotherIntermediate_f + 1.0);

        if (temp_f > 5.0) {
            result_f += sin(temp_f) * externalVarW;
        } else {
            result_f += cos(temp_f) + 2.71 * externalVarZ;
        }
    }
}

ret = result_f;
`, 
Float32Array.of(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0),
Float32Array.of(),
1,10,1);

TinyGLSL.js:532 START TinyGlsl.boot()
TinyGLSL.js:536 TinyGlsl VM detected littleEndian and may use that for overlapping .buffer in Uint8Array, Int32Array, Float32Array, Float64Array, etc. Despite that bigEndian is how people usually write things, most hardware seems to be littleEndian.
TinyGLSL.js:562 high32BitsOfDouble and low32BitsOfDouble tests pass, Math.PI=3.141592653589793 != rebuiltPi=3.141592653589793 high32BitsOfPi 1074340347 low32BitsOfPi 1413754136, Math.E=2.718281828459045 != rebuiltE=2.718281828459045 high32BitsOfE 1074118410 low32BitsOfE -1961601175
TinyGLSL.js:721 creating gl context, gl.isContextLost()==false
TinyGLSL.js:725 Returning new webgl context [object WebGL2RenderingContext]
Float32Array(10) [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, tid: 1716149172.857, buffer: ArrayBuffer(40), byteLength: 40, byteOffset: 0, length: 10, …]








This error shouldnt happen:
TinyGlsl.simple(
  '',
  `
  float loc[106]; // contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.
  const int par_o = 0; // view of whole {par} shared array
  const int loc_o = 0; // view of whole {loc} shared array
  float epsilon_f = 0.0009765625;
  
  // Initialize loc array
  for (int i = 0; i < 106; i++) loc[i] = 0.0;
  
  // Copy values from par to loc with epsilon addition
  for (int gradientCopyIndex_i = 0; gradientCopyIndex_i < 106; gradientCopyIndex_i++) {
    loc[loc_o + gradientCopyIndex_i] = par[par_o + gradientCopyIndex_i] +
      ((gradientCopyIndex_i == id) ? epsilon_f : 0.0);
  }
  
  // Verify the values in loc
  ret = loc[id];
  `,
  Float32Array.of(
    17.90561294555664, 6.370355606079102, 0.0428168959915638, 2.261533260345459, -5.8961029052734375, -7.1521196365356445,
    -0.8353716135025024, -4.276762962341309, -1.009261131286621, 16.826656341552734, -0.13536247611045837, 1.0682892799377441,
    -0.09514517337083817, 0.6129559278488159, 0.27901530265808105, 2.691152811050415, 3.357168436050415, 5.711653709411621,
    0.00581826688721776, 0.880428671836853, 3.6259515285491943, 9.176390647888184, -20.007644653320312, 5.293992519378662,
    0.0009765625, 0, 0, 8.050000190734863, 0, 0.07000000029802322, 0.07000000029802322, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0.20000000298023224, 33, 0, 1, 8.050000190734863, 0, 0.07000000029802322, 0.07000000029802322, 2, 2.3499999046325684,
    2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -2, 2, -2, -2, 2, 2, 2, 2, 2, -2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 10000,
    1, -0.6017442941665649, 1.1215028762817383, 1.840000033378601, 1, 225, 300, 60, 60, 0.30212801694869995, -0.30655813217163086,
    0.4198278784751892, 0.21975739300251007, -0.05462523549795151, -1.1615443229675293
  ),
  Float32Array.of(),
  1, 106, 1
);
Float32Array(106) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, …]
TestTinyGLSL.html:1 [.WebGL-0000114400720700] GL_INVALID_OPERATION: Error: 0x00000502, in ..\..\third_party\angle\src\libANGLE\renderer\d3d\d3d11\Context11.cpp, rx::Context11::triggerDrawCallProgramRecompilation:1054. Internal D3D11 error: HRESULT: 0x80004005: Error compiling dynamic pixel executable








try {
  TinyGlsl.simple(
    '',
    `
    float loc[106]; // contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here.
    const int par_o = 0; // view of whole {par} shared array

    // Initialize loc array to zero
    for (int i = 0; i < 106; i++) loc[i] = 0.0;

    // Copy values from par to loc
    for (int i = 0; i < 10; i++) {
      loc[i] = par[par_o + i];
    }

    // Sum the copied values
    float sum_f = 0.0;
    for (int i = 0; i < 10; i++) {
      sum_f += loc[i];
    }

    // Output the sum to ret
    ret = sum_f;
    `,
    Float32Array.of(
      17.90561294555664, 6.370355606079102, 0.0428168959915638, 2.261533260345459, -5.8961029052734375, -7.1521196365356445,
      -0.8353716135025024, -4.276762962341309, -1.009261131286621, 16.826656341552734, -0.13536247611045837, 1.0682892799377441,
      -0.09514517337083817, 0.6129559278488159, 0.27901530265808105, 2.691152811050415, 3.357168436050415, 5.711653709411621,
      0.00581826688721776, 0.880428671836853, 3.6259515285491943, 9.176390647888184, -20.007644653320312, 5.293992519378662,
      0.0009765625, 0, 0, 8.050000190734863, 0, 0.07000000029802322, 0.07000000029802322, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0,
      0.20000000298023224, 33, 0, 1, 8.050000190734863, 0, 0.07000000029802322, 0.07000000029802322, 2, 2.3499999046325684,
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -2, 2, -2, -2, 2, 2, 2, 2, 2, -2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 10000,
      1, -0.6017442941665649, 1.1215028762817383, 1.840000033378601, 1, 225, 300, 60, 60, 0.30212801694869995, -0.30655813217163086,
      0.4198278784751892, 0.21975739300251007, -0.05462523549795151, -1.1615443229675293
    ),
    Float32Array.of(),
    1, 106, 1
  );
} finally {
  console.log('code3:\n' + TinyGlsl.last_code3);
}

VM435:40 code3:
#version 300 es
					precision highp float; //2
					uniform vec2 mouse; //3
					uniform float par[104]; //4
					in vec2 coord; //5
					//flat in int id; //6
					out vec4 fragColor; //7
					const int pars = 104; //number of params in the par array //8
					const int idh = 1; //height in pixels //9
					const int idw = 106; //width in pixels //10
					const int ids = idh*idw; //height*width //11
					 //12
					void main(){ //13
						int idy = int(coord.y*float(idh)); //y position from 0 to idh-1. FIXME if idy idx or id is used in beforeCode, will need to be passed as param. Maybe just id? //14
						int idx = int(coord.x*float(idw)); //x position from 0 to idw-1 //15
						int id = idy*idw+idx; //2d pixel index in 1 int //16
						float ret = 0.; //floatsOutPerPixel=1 use ret retb retc retd if 4, use just ret if 1. //17
						float retb = 0.; //18
						float retc = 0.; //19
						float retd = 0.; //20
						//start user code //21
						 //22
    float loc[106]; // contains all locMem, locparMem, parlocMem arrays. ptrLoc or ptr can point into here. //23
    const int par_o = 0; // view of whole {par} shared array //24
 //25
    // Initialize loc array to zero //26
    for (int i = 0; i < 106; i++) loc[i] = 0.0; //27
 //28
    // Copy values from par to loc //29
    for (int i = 0; i < 10; i++) { //30
      loc[i] = par[par_o + i]; //31
    } //32
 //33
    // Sum the copied values //34
    float sum_f = 0.0; //35
    for (int i = 0; i < 10; i++) { //36
      sum_f += loc[i]; //37
    } //38
 //39
    // Output the sum to ret //40
    ret = sum_f; //41
     //42
						//end user code //43
						//ret = testFunctionASDFASDF(id, ret,-.5); //FIXME remove this //44
						fragColor = vec4(ret, retb, retc, retd); //45
					} //46

Float32Array(106) [24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, 24.237356185913086, …]
Its all 24.237356185913086
correct cuz [17.90561294555664, 6.370355606079102, 0.0428168959915638, 2.261533260345459, -5.8961029052734375, -7.1521196365356445, -0.8353716135025024, -4.276762962341309, -1.009261131286621, 16.826656341552734].reduce((x,y)=>(x+y))
returns 24.237356800585985 .


TinyGlsl.simple('','ret = par[id*2]+par[id*2+1];',Float32Array.of(5,6,7,8,9,10),[],3,1,1)
Float32Array(3) [11, 15, 19, tid: 1716299274.657, buffer: ArrayBuffer(12), byteLength: 12, byteOffset: 0, length: 3, …]
My core GPU API is a pure-function. This 1 line instantly runs a million GPU threads: TinyGlsl.simple('','ret = par[(id&3)*2]+par[(id&3)*2+1];',Float32Array.of(5,6,7,8,9,10,100,200),[],1000,1000,1) returns Float32Array.of(11, 15, 19, 300, 11, 15, 19, 300.. https://github.com/benrayfield/DagBall/blob/main/lib/TinyGLSL.js
You can call TinyGlsl.simple('','ret = par[(id&3)*2]+par[(id&3)*2+1];',Float32Array.of(5,6,7,8,9,10,100,200),[],1000,1000,1) from webpages in windows desktop browsers. Its still buggy in linux desktop browsers and android browsers, TODO.

*/