//Ben F Rayfield offers Dagverse (DAG multiVERSE) opensource MIT license.
//Depends on: nacl-fast.js or nacl.js (TODO test that), but you only need it for ed25519 signing and verifying, not for DAG.
const DV = (()=>{
	let DV = {
		
		
		
		
		name: 'Dagverse',
		license: 'Ben F Rayfield offers Dagverse (DAG multiVERSE) opensource MIT license.',
		description: 'TODO write description of Dagverse',
		
		utf8TextEncoder: new TextEncoder('utf-8'),
		utf8TextDecoder: new TextDecoder('utf-8'),
		stringToBytes: function(s){ return DV.utf8TextEncoder.encode(s); },
		bytesToString: function(bytes){ return DV.utf8TextDecoder.decode(bytes); },
		
		bytesToJsBase64: bytes=>btoa(String.fromCharCode.apply(null, bytes)), //returns string
		
		whitelistJs: new Set(),
		
		defaultRequestJsCode: 'req=>({js:null, error:"TODO", request:req})', //FIXME req could be big, might not want to copy it back if so.
		
		runServerInBrowser_urlSuffix: '?func=runServerInBrowser',
		
	
		//tomcatUrl: 'http://localhost:8080/dagverse/',
		tomcatUrl: window.location.href+'',
		
		runServerInBrowser_lastStringsIn: [],
		runServerInBrowser_nextStringsOut: [],
		
		//ob is a {} [] '' 2.34 etc, the object form of json.
		obToBytes: function(ob){
			//return new Blob([DV.stringToBytes(JSON.stringify(ob) || new Uint8Array(0))], {type: 'application/json'});
			return DV.stringToBytes(JSON.stringify(ob))
		},
		
		bytesToOb: function(bytes){
			let str = DV.bytesToString(bytes);
			console.log('bytesToOb str='+str);
			return JSON.parse(str);
		},
		
		runServerInBrowser_ajaxPostListener: function(bytesFromTomcat){
			console.log('server sent this to browser. START: runServerInBrowser_ajaxPostListener');
			if(!DV.runServerInBrowser_continue){
				console.log('!DV.runServerInBrowser_continue');
				return;
			}
			let obFromTomcat = DV.bytesToOb(bytesFromTomcat);
			let thenSendObToTomcat = [];
			for(let i=0; i<obFromTomcat.length; i++){ //multiple response objects, same indexs as last list sent to tomcat.
				let oneRequestObFromTomcat = obFromTomcat[i]; //This is likely 1 http request from internet to tomcat to this browser
				if(!DV.runServerInBrowser_continue){
					console.log('!DV.runServerInBrowser_continue');
					return;
				}
				let oneResponseObToTomcat;
				try{
					oneResponseObToTomcat = DV.jsonstringreqres(oneRequestObFromTomcat); //may run oneResponseObToTomcat.js js code if whitelisted.
				}catch(e){
					oneResponseObToTomcat = {error: ''+e};
					console.error(e);
				}
				thenSendObToTomcat.push(oneResponseObToTomcat);
			}
			if(!DV.runServerInBrowser_continue){
				console.log('!DV.runServerInBrowser_continue');
				return;
			}
			let url = DV.tomcatUrl+DV.runServerInBrowser_urlSuffix;
			let bytesToTomcat = DV.obToBytes(thenSendObToTomcat);
			DV.ajaxPost(url, bytesToTomcat, 'application/json', DV.runServerInBrowser_ajaxPostListener);
			console.log('END: runServerInBrowser_ajaxPostListener but waiting on async response.');
		},
		
		//connect to the JSP file thats running in a Tomcat (or whatever kind of server),
		//which is only used for crossing CORS borders and making browser able to receive incoming http messages.
		//Param tomcatUrl (moved to DV.tomcatUrl) might for example be: 'http://localhost:8080/dagverse'
		//and gets called like 'http://localhost:8080/dagverse?func=runServerInBrowser'.
		//TODO make sure only those using it from localhost can do that, so players talk to eachother thru this browser
		//instead of being a server themself.
		//
		/*
		write index.jsp that runs in tomcat that makes a browser tab running on same computer which does
		an ajax act as a server that others across internet can send json to and get a json response.
		I will boot tomcat with that jsp in it, then open browser which will ajax to
		http://localhost:8080/dagverse?func=runServerInBrowser then other computers across the internet
		can ajax post json to http://localhost:8080/dagverse and get json back. Tomcat will act as a
		proxy for my local browser tab which has the server logic. However many http requests come in
		to tomcat at http://localhost:8080/dagverse (not the func=runServerInBrowser) before the next
		post to http://localhost:8080/dagverse?func=runServerInBrowser, group them together into a json
		list of those jsons (objects all the way through, not a list of json strings) and send them
		as the response to the http://localhost:8080/dagverse?func=runServerInBrowser call. The browser
		tab that made the http://localhost:8080/dagverse?func=runServerInBrowser call, when it gets that
		from tomcat, does some logic then answers back to tomcat a json list of the same size. Tomcat
		should then split the list and send its contents (1 index each) to the waiting worker threads
		which called http://localhost:8080/dagverse . This should be a general multiplexing proxy that
		allows a browser tab to act as a server.
		*/
		runServerInBrowser: function(){
			DV.runServerInBrowser_continue = true;
			let url = DV.tomcatUrl+DV.runServerInBrowser_urlSuffix;
			let postThis = DV.obToBytes(DV.runServerInBrowser_lastStringsIn);
			//runs an async loop of these until DV.runServerInBrowser_continue becomes false.
			DV.ajaxPost(url, postThis, 'application/json', DV.runServerInBrowser_ajaxPostListener);
		},
		
		stopServerInBrowser: function(){
			DV.runServerInBrowser_continue = false;
		},
		
		hexDigits: '0123456789abcdef',
		mapOfHexDigitToInt: {}, //vals are 0 to 15. filled in boot.
		mapOfDoubleHexDigitsToInt: {}, //vals are 0 to 255. filled in boot.
		bytesToHex: function(bytes){ return DV.bytesAndRangeToHex(bytes,0,bytes.length); },
		bytesAndRangeToHex: function(bytes,from,toExcl){
			let s = '';
			for(let i=from; i<toExcl; i++) s += DV.doubleHexDigits[bytes[i]];
			return s;
		},
		
		/*
		//blob has contentType and bytes. takes Blob param. async returns Blob by asyncReturnBlobHere(blobResponse).
		ajaxPost: function(url, blob, asyncReturnBlobHere){
			throw new Error('TODO');
		},*/
		/*ajaxPost: function(url, blob, asyncReturnBlobHere) {
			const formData = new FormData();
			formData.append("file", blob);
		
			fetch(url, {
				method: "POST",
				body: formData,
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.blob();
			})
			.then(blobResponse => {
				asyncReturnBlobHere(blobResponse);
			})
			.catch(error => {
				console.error('There has been a problem with your fetch operation:', error);
			});
		},*/
		//ajaxPost: function(url, blob, asyncReturnBlobHere) {
		ajaxPost: function(url, bytes, contentType, asyncReturnBytesHere){
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': contentType,
				},
				body: bytes,
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				//return response.blob();
				return response.arrayBuffer();
			})
			.then(blobResponse => {
				asyncReturnBytesHere(blobResponse);
			})
			.catch(error => {
				console.error('There has been a problem with your fetch operation:', error);
			});
		},
	
	
		
		runServerInBrowser_continue: true,
		
		/*runServerInBrowser_loopBody: function(){
			let url = tomcatUrl+runServerInBrowser_urlSuffix;
			if(DV.runServerInBrowser_continue){
				//requestAnimationFrame(DV.runServerInBrowser_loopBody); //TODO setTimeout of 1 instead? might be faster?
				setTimeout(DV.runServerInBrowser_loopBody,1);
			}
		}*/
		
		/*
		//Param is a Uint8Array of the binary http data including headers and content.
		//Return is a Uint8Array of the http response.
		//No, dont do it this way cuz it might try to upgrade to https and this might interfere with that. just do json {}/[]/etc.
		httpreqres: function(httpBytesIn){
			let httpBytesOut = TODO
			return httpBytesOut
		},
		*/
		
		maxJsonChars: 200000,
		
		//list of strings in. list same size of strings out, matching same indexs.
		streqres: function(...stringsIn){
			let stringsOut = [];
			for(let stringIn of stringsIn){
				let stringOut;
				try{
					stringOut = JSON.stringify(DV.obreqres(JSON.parse(stringIn)));
				}catch(e){
					stringOut = JSON.stringify({js:null, error:''+e});
				}
				stringsOut.push(stringOut);
			}
			return stringsOut;
		},
		
		jsonstringreqres: function(json){
			return DV.obreqres(JSON.parse(json));
		},
			
		//like incoming http post (request and response)
		//but data format is {js:'code to eval and call on this {...} and return what
		//to return to the caller who is normally across the internet but may be done locally to.}
		//object comes in. {} object {} goes out. Make sure not to eval just any request.js
		//but only if it can be proven it doesnt infiniteloop or do other things it shouldnt,
		//and normally that js will be 1 of a few standard code strings i write manually
		//and check for them in the DV.whitelistJs Set.
		obreqres: function(request){
			let jsCode = request.js || DV.defaultRequestJsCode;
			if(DV.whitelistJs.has(jsCode)){
				return {js:null, error:'js code is not in DV.whitelistJs: '+jsCode};
			}
			let evaledJsCode = TinyGlsl.cachedJsEval(jsCode); //should be a js lambda that takes a {...} param
			return evaledJsCode(request);
		},
	
		jsBase64ToBytes: base64=>{ //returns Uint8Array
			const binaryString = atob(base64);
			const len = binaryString.length;
			const bytes = new Uint8Array(len);
			for (let i = 0; i < len; i++) {
				bytes[i] = binaryString.charCodeAt(i);
			}
			return bytes;
		},
		
		//dvbase64 has no = padding. expand to multiple of 4 size to convert back to js.
		jsBase64ToDvBase64: function(jsBase64){
			let s = ''; //TODO char array or something is faster?
			let end = jsBase64.indexOf('=');
			if(end == -1) end = jsBase64.length;
			for(let i=0; i<end; i++){
				s += DV.digitJsToDv[jsBase64[i]];
			}
			return s;
		},
		
		dvBase64ToJsBase64: function(dvBase64){
			let s = ''; //TODO char array or something is faster?
			for(let i=0; i<dvBase64.length; i++){
				s += DV.digitDvToJs[dvBase64[i]];
			}
			while(s.length&3){ //while not a multiple of 4
				s += '='; //pad
			}
			return s;
		},
		
		//dvBase64Digits and Uint8Array
		base64ToBytes: function(base64){
			return DV.jsBase64ToBytes(DV.dvBase64ToJsBase64(base64));
		},
		
		//dvBase64Digits and Uint8Array
		bytesToBase64: function(bytes){
			return DV.jsBase64ToDvBase64(DV.bytesToJsBase64(bytes));
		},
		
		digitJsToDv: {},
		digitDvToJs: {},
		
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
		
		//idPrefix: 'DV$';
		//idPrefix: '$';
		//idPrefix: '';
		
		mutidLiteralArrayPrefix: 'a$',
		//jsonIdPrefix: 'j$',
		jsonIdPrefix: 'DV$',
		
		//Cache of immutable data. These are global ids, same across the world, content-addressable.
		//Store DAG content and id of each content here. Can JSON.parse it to get the map form.
		idToJson_: {},
		
		//not sure if ill use this vs only idToJson. Dont modify these maps.
		idToMap_: {},
		
		//FIXME should map have id (dagverseId) cached in it (but set it to undefined recursively when computing id)?
		//thats the hash id, not mutid.
		
		//These are the only 64 chars that are 1 byte UTF8/ASCII and can be used in javascript var names,
		//as long as the first char in the var name is not one of 0123456789.
		//Ids should start with syncType (see dagball synctype such as s for swarm)?
		//Or, type$base64stuff. These 64 chars are sorted by ascending UTF8/ASCII
		//so you can use them as a base64 number, such as in a database column or something.
		//Just add a prefix 'd' or '$' or something if using as js var name.
		dvBase64Digits: '$0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz=',
		
		//This is whats made by javascript atob and btoa funcs. This one is only used internally for atob and btoa
		//and some users might want to convert it to "standard" base64 instead,
		//but dvBase64Digits is better for certain uses as explained in its comment.
		jsBase64Digits: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
		
		isMapNormed: function(map){
			throw new Error('TODO');
		},
		
		prototypeOfMap: Object.getPrototypeOf({}),
		prototypeOfList: Object.getPrototypeOf([]),
		
		isMap: function(ob){
			return ob && Object.getPrototypeOf(ob)===DV.prototypeOfMap;
		},
		
		isList: function(ob){
			if(!ob) return false;
			let p = Object.getPrototypeOf(ob);
			return p==DV.DagProto || p==DV.prototypeOfList;
		},
			
		/*
		//rebuilds all the maps so their keys are in ascending order.
		//In js the order added to the map is the order they are iterated.
		//This is so the same tree contents gives the same json so its hash id is the same.
		mapNorm: function(map){
			if(DV.isMap(map)){
				//TODO check DV.isMapNormed and return same map if so
				let keys = Object.keys(map);
				keys.sort();
				let withKeysSorted = {};
				for(let key of keys){
					withKeysSorted[key] = DV.mapNorm(map[key]);
				}
				return withKeysSorted;
			}else{
				return map; //is not a map, may be a list number string true false null etc.
			}
		},*/
		
		//string to bytes
		sToB: function(str){
			return DV.stringToBytes(str); //TODO skip this extra step
		},
		
		//bytes to string
		bToS: function(bytes){
			return DV.bytesToString(bytes); //TODO skip this extra step
		},
		
		hashBytes: bytes=>DV.sha256(bytes),
		
		hashStringToBytes: function(str){
			return DV.hashBytes(DV.stringToBytes(str));
		},
		
		hashStringToHex: function(str){
			return DV.bytesToHex(DV.hashBytes(DV.stringToBytes(str)));
		},
		
		//the hash is a base64 (no = padding) of sha256 of the string as utf8.
		hashString: function(str){
			return DV.bytesToBase64(DV.hashStringToBytes(str));
		},
		
		/*normedJsonToId: function(normedJson){
			return DV.jsonIdPrefix+DV.hashString(normedJson);
		},
		
		maxLiteralFloatsInId: 8,
		
		idToJson: function(id){
			return DV.idToJson_[id] || null;
		},
		
		//hash id, by converting to normed json then hashing it then converting that hash to dagverseBase64Digits
		//and TODO a prefix. FIXME is the map allowed to be modified after calling this (cuz put the map in a cache with id?
		//Also adds it.
		mapToId: function(map){
			let id;
			let json = DV.contentToHash(map);
			if(map.length && map.length < DV.maxLiteralFloatsInId && typeof(map[1])=='number' && !map[0].includes('_')){
				//if piAndTwenty contained _ as in pi_andTwenty, then couldnt do it this way:
				//["piAndTwenty",3.14159,20] -> 'a$piAndTwenty_3p14159_20'
				id = DV.listToMutidArrayLiteralId(map);
				//FIXME do this? DV.idToJson_[id] = json;
				//FIXME this could get very slow if not cache it
				//FIXME store it or dont store it?
			}else{
				id = DV.normedJsonToId(json);
			}
			DV.idToJson_[id] = json;
			DV.idToMap_[id] = map;
			return id;
		},
		
		//returns from cache if exists
		//FIXME all ids must be DV.Sexpr
		HashIdOf: function(map){
			//return DV.doHashId(map).HashId;
			return DV.doHashId(map).$;
		},
		
		//temp_wrappedMap_forHashIdNull: {hashId: null},
		
		contentToHashWithoutHashId: function(map){
			let modified = {};
			for(let key in map) modified[key] = map[key];
			//modified.HashId = null;
			modified.$ = null;
			//Object.setPrototypeOf(DV.temp_wrappedMap_forHashIdNull,map);
			//let normedJson = DV.contentToHash(DV.temp_wrappedMap_forHashIdNull);
			return DV.contentToHash(modified); //normed json with hashId of null.
		},
		
		//does not modify param
		//FIXME all ids must be DV.Sexpr
		computeHashId: function(map){
			let normedJson = DV.contentToHashWithoutHashId(map); //with hashId of null
			return DV.normedJsonToId(normedJson);
		},
		
		//modifies map to have a 'hashId' (update: 'DV$') key, but TODO hashId should be replaced by null when hashing its content to create the hash and when verifying. returns the param.
		//FIXME all ids must be DV.Sexpr
		doHashId: function(map){
			if(!map.hashId){
				map.HashId = DV.computeHashId(map);
			}
			return map;
		},
		
		//Dont modify the map after calling this.
		idToMap: function(id){
			//if(is a listToMutidArrayLiteralId id){
			//	FIXMEFIXME
			//}
			return DV.idToMap_[id] || null;
		},*/
		
		/*
		//returns list of child ids. Dont modify the list.
		ch: function(id){
			return DV.idToMap(id).ch || [];
		},*/
		
		//2024-2-18 UPDATE: this will be ob.me().mutid, not ob.mutid directly, since the circ.toMap() will go in the 'me' slot.
		//dagball.Circ.id (TODO rename that) and dagball.Ball.id etc are mutids. MUTable object ID.
		//A Dagverse/DV id is a hash id of immutable DAG forest. Returns null if there is no mutid.
		mapToMutid: function(map){
			return map.mutid || null;
		},
		
		idToMutid: function(id){
			return DV.mapToMutid(DV.idToMap(id));
		},
		
		//copy the map so can modify it. idToMap andOr mapToId may cache the maps so dont modify the maps after calling those.
		copyMap: function(map){
			return JSON.parse(JSON.stringify(map)); //TODO theres faster way without converting to json.
		},
		
		//TODO allow Float32Array and Int32Array and Float64Array and Uint8Array directly in maps? Base64 it in mapToId?
		
		//Remove leading 0 like in '{"someIdA":1,"someIdB":0.05,"someIdC":1,"someIdD":0}' should be just .05 not 0.05
		adjustJson: function(json){
			return json.replaceAll(':0.',':.').replaceAll(',0.',',.').replaceAll('_-0.',',_-.').replaceAll('[0.','[.');
		},
		
		//contentToHash: map=>DV.adjustJson(JSON.stringify(DV.mapNorm(map))),
		
		//is either a list or string or possibly a number, see DV.me DV.ch etc.
		contentToHash: ob=>DV.adjustJson(JSON.stringify(DV.normOb(ob))),
		
		normedObToJson: ob=>DV.adjustJson(JSON.stringify(ob)),
		
		//A game or simulation, such as a wrapper of the local copy of Dagball thats running on screen.
		//In that case sim.nextState(dt) would do dagball's nextState which calls doPhysics(dt) etc.
		//To sync dagball across network, and to edit dagball states
		//by turning on/off chosen circs and balls and options etc, Dagverse/DV ids will be used.
		//A circ will be a map/json/id. A ball will be a map/json/id.
		//An option (baseVelocityMul or what was it called?) will be a map/json/id. etc.
		//Checkboxes should appear to turn on/off each such object. The circ will appear/disappear.
		//Objects with the same mutid (id of mutable thing) can only have 1 variant of the object at once,
		//so its like theres an exclude edge between them if u think of it like clique or hopfield math.
		Sim: function(){},
		
		//Example: DV.sims.dagball
		sims: {},
		
		//deletes/uncaches an id, but other computers may still have a copy. If the same map/content is created or found again,
		//it will deterministicly have the same id.
		del: function(id){
			throw new Error('TODO');
		},
		
		keepOnlyReachableFrom: function(id){
			throw new Error('TODO');
		},
		
		//adds a map (such as a dagball_ball or dagball_circ or dagball_option. Computes its id deterministicly by Dv.mapToId(map).
		add: function(normedJsonOrMap){
			throw new Error('this is from old code');
			let json = typeof(normedJsonOrMap)=='string' ? normedJsonOrMap : DV.contentToHash(normedJsonOrMap);
			let id = DV.normedJsonToId(json);
			DV.idToJson[id] = json;
		},
		
		//returns the json content that hashes to that id, or null if not found.
		//For now this just looks in DV.idToJson but later TODO read it from a single remote server running a dagball game etc
		//andOr a peer to peer network running dagball etc. Also wikibinator will be in there somewhere but has its own id system.
		getJson: function(id){
			return DV.idToJson[id] || null;
		},
		
		//If it has to download them, it helps to download a batch at once.
		//exceptReachableFrom can be null/undefined to not use it,
		//but if you dont want duplicates of what you already have, then group some of what you already have into a new id
		//and tell the server(s)/peer(s) not to answer with those.
		//If you dont give the optionalHaves param, it may still fill it in as an optimization.
		//If you give the optionalHaves param as [] it wont exclude anything.
		getJsonsDeepExcept: function(wants, optionalHaves){
			throw new Error('TODO');
		},
		
		//FIXME does this have a mutid? Or just a hashId? FIXME these should be actual ids in the {} keys.
		//This is the kind of Sim.state you will receive.
		exampleStateVector: {
			someIdA: 1,
			someIdB: .05,
			someIdC: 1,
			someIdD: 0,
		},
		
		//ch is a list of DV.Dag childs. me is whatever immutable data is local here.
		/*2024-2-16
		x = new DV.Dag(['hello','world'])
		Dag {me: Array(2), ch: Array(0), HashId: null}
		y = new DV.Dag(['hello',{bob:[2,3,1,5.67]}])
		Dag {me: Array(2), ch: Array(0), HashId: null}
		z = new DV.Dag({abc:4,defg:5},x,y)
		Dag {me: {…}, ch: Array(2), HashId: null}
		z+''
		'{"HashId":"j$wUv_mxp5KLVZnxT2qNOrDrBLlem4Yi_r3IBvNmHmLxk","ch":["j$f1apakv5KlZzAQ6X2yyPgYTWskbGCSWAKAhZQMbvu5g","j$_HOceMvVVinCNI1F0Xnd9fjfr$l_Mw7thOjX4sF2hfF"],"me":{"abc":4,"defg":5}}'
		z.ch[0]+''
		'{"HashId":"j$f1apakv5KlZzAQ6X2yyPgYTWskbGCSWAKAhZQMbvu5g","ch":[],"me":["hello","world"]}'
		z.ch[1]+''
		'{"HashId":"j$_HOceMvVVinCNI1F0Xnd9fjfr$l_Mw7thOjX4sF2hfF","ch":[],"me":["hello",{"bob":[2,3,1,5.67]}]}'
		*/
		//Dag: function(me, ...ch){
		/*Dag: function(MaxEC, MaxTC, MaxTO, MaxTime, MinTPow, MinTime, me, ...ch){ //order of params is sorted by string compare, capitals first, then lowercase.
			console.error('TODO can ch contain DV.Sig andOr DV.Pubkey? I do need the dag to be checked at this level. theres 2 basic object types: hashed dag and pubkeys that sign things and keep track of the newest (by timeMicroseconds they claim, not verifying the time).');
			//E means each dag node. T means total of all dag nodes except self cuz self is still being created during that calculation.
			this.MaxEC = MaxEC; //in childs recursively (but not including self) whats the max child.toString().length (max Chars long in Each).
			this.MaxTC = maxTC; //FIXME compute exponentially too big estimate (just add them from childs and local stuff in childs) if maxC is 1, and compute exact maxC if maxC is 0.
			//MaxTime is for garbage-collection (not an agreement that it will be deleted, only that it can be) 
			this.MaxTime = MaxTime;
			//if an ed25519 pubkey signs this.hashId() then that pubkeys value is the highest dag.MinTime it has signed.
			this.MinTPow = MinTPow;
			this.MinTime = MinTime;
			this.MaxTO = MaxTO; //max Total DV.Dag Objects in childs recursively but not including self. T is only childs recursively.
			this.me = me;
			
			//Contains these object types: DV.Dag, DV.Pubkey, DV.Sig, DV.Powsum, DV.Comment.
			this.ch = ch;
			
			
			this.He = 0; //dag height 0 if leaf
			if(ch.length) for(let child of ch) this.He = Math.max(this.He,1+child.He); 
			
			//FIXME this.$ aka id must be a DV.Sexpr even if its just a leaf. all ids must be Sexprs.
			//Use DV.sexprLeaf('DV$sdfdfgsdfg345435456dfg435456456') cuz it will always be a leaf for this object type.
			//Its tostring wil still be 'DV$sdfdfgsdfg345435456dfg435456456'.
			this.$ = null; //this.HashId = null; //TODO rename to DV$
		},*/
	
		//If GcT is null for a leaf, sets it to now+DV.defaultNodeLifetime	
		defaultNodeLifetime: 60*60*1000000, //1 hour in microseconds. FIXME or just allow float64s?

		
	};
	
	//DV.whitelistJs.add(DV.defaultRequestJsCode);

	for(let i=0; i<65; i++){ //last digit is = for padding, but dv base64 doesnt use it. js base64 does.
		let jsDigit = DV.jsBase64Digits[i];
		let dvDigit = DV.dvBase64Digits[i];
		DV.digitJsToDv[jsDigit] = dvDigit;
		DV.digitDvToJs[dvDigit] = jsDigit;
	}
	
	//DV.idOfExampleStateVector = DV.mapToId(DV.exampleStateVector);
	
	DV.idToOb = {}; //used for ob.dedup(). TODO clear this and refill it when choosing an ob to keep only whats reachable from it andOr gct garbcol 

	DV.DagProto = {
		toString: function(){
			if(!this.toString_){
				//this.id();
				//this.toString_ = JSON.stringify(this);
				this.toString_ = DV.toDAGString(this);
			}
			return this.toString_;
		},
		dedup: function(){
			//FIXME triggers lazyEval of ids and secureHashing recursively. TODO see wikibinator203 for how to do it
			//without secureHashing but still perfect dedup using "localId".
			let id = this.id();
			let found = DV.idToOb[id];
			if(!found){
				DV.idToOb[id] = found = this;
			}
			return found;
		},
		he: function(){ //DAG height, 0 is a leaf, 1 has direct childs of leafs, and so on. Childs dont all have to be the same height.
			if(this.isA('idHeGctChMe')){
				return this[2];
			}else{
				return 0; //FIXME is that true of sigs? they're like weakrefs so not counting height below?
			}
		},
		ch: function(){ //get childs list if its a idHeGctChMe else copy its childs to a (cached) nonbacking list and return that instead
			if(this.ch_){
				return this.ch_; //return from nonbacking cached list				
			}
			if(this.isA('idHeGctChMe')){
				return this[4];
			}else if(this.isA('pubkeyParam')){
				return this.ch_ = [this.pubkey(),this.param()];
			}else if(this.isA('pubkeyParamTimeRetSig')){
				return this.ch_ = [this.pubkey(),this.param(),this.ret()];
			}
		},
		fillInId: function(){
			
			//FIXME this might be creating wrong id by running after this[1] (if this.isA('idHeGctChMe')) has already put id in this[1], though in other types its not there.
			
			if(DV.logDetailedDagMakingStuff) console.log('Making id of a idHeGctChMe');
			let dagStringWithNullId = DV.toDAGString(this,'dag',true);
			let id = 'DV$'+DV.hashString(dagStringWithNullId);
			this[1] = id;
			if(DV.logDetailedDagMakingStuff) console.log('Made id='+id+' of a idHeGctChMe');
			return id;	
		},
		id: function(){
			if(this.isA('idHeGctChMe')){ //avoid creating this.id_ when it already exists
				if(!this[1]){
					this.fillInId();
				}
				return this[1];
			}else if(!this.id_){
				if(this.isA('idHeGctChMe')){ //OLD, remove this cuz of the IF above
					if(!this[1]){
						this.fillInId();
					}
					this.id_ = this[1];
				}else{
					//throw new Error('TODO tostring the whole json, but norm it first');
					this.id_ = c2h;
				}
				
				/*let c2h = DV.contentToHash(this); //similar to JSON.stringify but normed order of map keys etc
				if(this.isA('idHeGctChMe')){
					this[1] = this.id_ = 'DV$'+DV.hashString(c2h);
				}else{
					//throw new Error('TODO tostring the whole json, but norm it first');
					this.id_ = c2h;
				}*/
			}
			return this.id_;
		},
		gct: function(){ //garbcol time. 0 means instead of expire time, garbcol by what has no incoming ptrs.
			if(this.isA('idHeGctChMe')){
				return this[3];
			}else{
				throw new Error('TODO should something other than a idHeGctChMe have a gct? theyre designed to be their own id so they only exist as pointers but have no other content.');
			}
		},
		pubkey: function(){
			if(this[0].startsWith('pubkey')){ //'pubkeyParam' or 'pubkeyParamTimeRetSig'
				return this[1];
			}else{
				throw new Error('TODO should this just return null to say there isnt one?');
			}
		},
		param: function(){
			if(this[0].startsWith('pubkeyParam')){ //'pubkeyParam' or 'pubkeyParamTimeRetSig'
				return this[2];
			}else{
				throw new Error('TODO should this just return null to say there isnt one?');
			}
		},
		pubkeyParam: function(){
			if(this[0] == 'pubkeyParam'){
				return this;
			}else if(this[0].startsWith('pubkeyParam')){ //pubkeyParamTimeRetSig
				return DV.pubkeyParam(this.pubkey(),this.param()); //TODO make sure this caches it, and also dedups?
			}
		},
		ret: function(){
			if(this[0] == 'pubkeyParamTimeRetSig'){
				return this[4];
			}else{
				throw new Error('not a pubkeyParamTimeRetSig');
			}
		},
		//time of a pubkeyParamTimeRetSig, not a gct time cuz thats for garbage collection (garbcol). A pubkeyParam's value is the max known pubkeyParamTimeRetSig of that pubkey and param.
		time: function(){
			if(this[0] == 'pubkeyParamTimeRetSig'){
				return this[3];
			}else{
				throw new Error('not a pubkeyParamTimeRetSig');
			}
		},
		ty: function(){ //get simple type such as 'idHeGctChMe', 'pubkeyParam', or 'pubkeyParamTimeRetSig'
			return this[0];
		},
		isA: function(typeString){
			return DV.isList(this) && this[0]==typeString;
		},
		//gets sig string, which is 'g$' which makes it a string, then base64 digits like this so its 512 bits of ed25519 sig,
		//though this system might also support other pubkey/sig types later.
		//g$kjsefrkjxvksdfSDFDSAFASDf34345xdsfSDFSDF34sxdfSDFsd3245345sdxfSDFDFSGsadf342324sdfsdfs (this one is made up but the right size).
		sig: function(){
			if(this[0] == 'pubkeyParamTimeRetSig'){
				return this[5];
			}else{
				throw new Error('not a pubkeyParamTimeRetSig');
			}
		},
		verifySig: function(){
			let pubkeyParamTimeRetSig = this;
			if(pubkeyParamTimeRetSig[0] != 'pubkeyParamTimeRetSig'){
				throw new Error('not a pubkeyParamTimeRetSig');
			}
			throw new Error('TODO use nacl-fast.js and compare its output to the java version of ed25519 i have code for somewhere that i wrote a basic testcase for');
		},
		//get all dag nodes reachable from this one as childs of a new dag node returned. This dag node is the last child.
		//ob.depthFirst().ch().join('\n\n') is a jsonll file content.
		depthFirst: function(){
			let set = new Set();
			let list = [];
			this.depthFirst_recurse(set,list);
			return DV.chMe(list,{comment:'DV.depthFirst'});
		},
		depthFirst_recurse: function(set, list){
			//if(!set.has(this)){
			if(!set.has(this.id())){ //cuz DV.normOb or something like that, is making set not find duplicates the first time, but id will be the same.
				if(this.isA('idHeGctChMe')){
					for(let child of this.ch()){
						child.depthFirst_recurse(set,list);
					}
				}else{
					throw new Error('TODO');
				}
				if(set.has(this)){
					console.log('WARNING: depthFirst_recurse found an ob got into the set again, not adding it to list again');
				}else{
					//set.add(this);
					set.add(this.id()); //cuz DV.normOb or something like that, is making set not find duplicates the first time, but id will be the same.
					list.push(this);					
				}
			}
		},
		//returns a string thats a jsonll containing only whats reachable from here.
		//A jsonll could also be streamed, but this is all at once.
		toJsonll: function(){
			return this.depthFirst().ch().join('\n\n');
		},
		logJsonll: function(){
			console.log(this.toJsonll());
		},
	};
	
	DV.doubleHexDigits = [];
	for(let i=0; i<16; i++){
		DV.mapOfHexDigitToInt[DV.hexDigits[i]] = i;
		for(let j=0; j<16; j++){
			let hh = DV.hexDigits[i]+DV.hexDigits[j];
			DV.doubleHexDigits.push(hh);
			DV.mapOfDoubleHexDigitsToInt[hh] = ((i<<4)|j);
		}
	};
	
	//in DV.Dv(...params) it uses DV.isDag to check if something is already a dag node vs if it should be wrapped in one.
	DV.isDag = function(ob){
		return Object.getPrototypeOf(ob)==DV.DagProto ||
			(typeof(ob)=='string' && (ob.startsWith('DV$') || ob.startsWith('ED$') || ob.startsWith('x$') || ob.startsWith('g$')));
	},

	//Im ready to start using NACL for ed25519 digital signatures. Have tested it with a variety of random changes to the bytes in privateKey, publicKey, and sig,
	//making sure it verifies, and fails verify, correctly when it should. See code and tests output in: dagball/doc/naclEd255192024-2-19_nacl-fast.js_testsPass.txt
	//TODO but still compare it against that java version of ed25519 i have somewhere, to make sure they generate the same key pairs, sigs, etc. 
	DV.naclBasics = {
		
		testNacl: function(){
			console.log('Starting DV.naclBasics.testNacl tests...');
			let b = DV.naclBasics;
			let sigsCorrectlyVerified = 0;
			let sigsCorrectlyRejected = 0;
			//this is not an efficient way to test it, rebuilding the keys etc every time. and its making browser tab crash, so im removing some parts of the loop ranges...
			//for(let password of ['', 'password', '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132']){
			for(let password of ['password', '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132']){
				//console.log('Testing password['+password+'] (one is empty)');
				console.log('Testing password['+password+']');
				//for(let wrenchAdd of [0, 1, 17, 83, 84, 209, 210, 254, 255]){
				for(let wrenchAdd of [0, 83, 84, 254, 255]){
					console.log('To "throw a wrench in the machine" to make sure ed25519 fails verify, wrenchAdd='+wrenchAdd+' (when its 0 it should true verify)');
					//for(let wrenchWhichByte=160; wrenchWhichByte>=0; wrenchWhichByte--){
					for(let wrenchWhichByte=160; wrenchWhichByte>=0; wrenchWhichByte-=11){
						//if(Math.random()<.9){
						//	console.log('randomly skip test');
						//}
						console.log('--------------------------wrenchWhichByte='+wrenchWhichByte);
						
						//The other times its modifying 1 of the bytes in prikey, pubkey, or sig.
						let correctIsVerified = wrenchAdd==0 || wrenchWhichByte==160;
						
						let prikey = b.passwordToPrikey(password);
						console.log('prikey was: '+DV.bytesToHex(prikey));
						if(wrenchWhichByte < 64){ //prikey has 32 byte seed and privatekey
							prikey[wrenchWhichByte] += wrenchAdd;
							console.log('After adding '+wrenchAdd+' to prikey['+wrenchWhichByte+'], prikeyHex='+DV.bytesToHex(prikey));
						}
						let pubkey = b.passwordToPubkey(password);
						console.log('pubkey was: '+DV.bytesToHex(pubkey));
						if(64 <= wrenchWhichByte && wrenchWhichByte < 96){
							let whichByte = wrenchWhichByte-64;
							pubkey[whichByte] += wrenchAdd;
							console.log('After adding '+wrenchAdd+' to pubkey['+whichByte+'], pubkeyHex='+DV.bytesToHex(pubkey));
						}
						//for(let message of ['a', 'b', 'ab', 'abcdefgzzhz', 'This is a test message for nacl doing ed25519 blah blah 5555sdkjfskdjfjk43w25w43r5 dsfsdf sentence goes on and on blah blah 345345345sdfsdf3245 blah.', '']){
						for(let message of ['a', 'abcdefgzzhz', 'This is a test message for nacl doing ed25519 blah blah 5555sdkjfskdjfjk43w25w43r5 dsfsdf sentence goes on and on blah blah 345345345sdfsdf3245 blah.']){
							//console.log('With that password, message['+message+'] (one is empty)');
							console.log('With that password, message['+message+']');
							let sig = b.signMessage(message, prikey);
							console.log('sig was: '+DV.bytesToHex(sig));
							if(96 <= wrenchWhichByte && wrenchWhichByte < 160){
								let whichByte = wrenchWhichByte-96;
								sig[whichByte] += wrenchAdd;
								console.log('After adding '+wrenchAdd+' to sig['+whichByte+'], sigHex='+DV.bytesToHex(sig));
							}
							console.log('sigHex='+DV.bytesToHex(sig)); 
							let isVerified = b.verifyMessageSigPubkey(message, sig, pubkey);
							console.log('isVerified='+isVerified+' correctIsVerified='+correctIsVerified+' wrenchAdd['+wrenchAdd+'] wrenchWhichByte['+wrenchWhichByte+'] password['+password+'] message['+message+'] prikey['+DV.bytesToHex(prikey)+'] pubkey['+DV.bytesToHex(pubkey)+'] sig['+DV.bytesToHex(sig)+']');
							if(isVerified != correctIsVerified){
								throw new Error('nacl ed25519 test failed. isVerified='+isVerified+' correctIsVerified='+correctIsVerified);
							}
							if(isVerified){
								sigsCorrectlyVerified++;
							}else{
								sigsCorrectlyRejected++;
							}
							console.log('sigsCorrectlyVerified='+sigsCorrectlyVerified+' sigsCorrectlyRejected='+sigsCorrectlyRejected);
							//TODO make sure it fails for sig combos signed by a different key etc. mix it up. make sure the correct combos pass and fail.
							//Change 1 byte somewhere in the sig, prikey, pubkey, etc, and make sure it fails. Do more detailed tests.
						}
					}
				}
			}
			console.log('Tests pass: DV.naclBasics.testNacl tests');
		},
		
		//sha256 of password is the seed
		passwordToSeed: function(password){
			return DV.hashStringToBytes(password);
		},
		
		passwordToKeyPair: function(password){
			return DV.naclBasics.generateKeyPairFromSeed(DV.naclBasics.passwordToSeed(password));
		},
		
		passwordToPubkey: function(password){
			return DV.naclBasics.passwordToKeyPair(password).publicKey;
		},
		
		passwordToPrikey: function(password){
			return DV.naclBasics.passwordToKeyPair(password).secretKey;
		},
		
		passwordAndMessageToSig: function(password,message){
			if(typeof(message)=='string'){
				message = DV.stringToBytes(message);
			}
			return DV.naclBasics.signMessage(message, DV.naclBasics.passwordToPrikey(password));
		},
		
		passwordToKeyPair: function(password,message){
			if(typeof(message)=='string'){
				message = DV.stringToBytes(message);
			}
			return DV.naclBasics.generateKeyPairFromSeed(DV.naclBasics.passwordToSeed(password));
		},
		
		// Verify a signature.
		// message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array
		// Returns: boolean (true if valid, false otherwise)
		verifyMessageSigPubkey: function(message, signature, publicKey){
			if(typeof(message)=='string'){
				message = DV.stringToBytes(message);
			}
			if (!(message instanceof Uint8Array) || !(signature instanceof Uint8Array) || !(publicKey instanceof Uint8Array)) {
				throw new Error('Message, signature, and publicKey must be Uint8Arrays.');
			}
			return nacl.sign.detached.verify(message, signature, publicKey);
		},
		
		// Generate a key pair from a 32-byte seed (Uint8Array).
		generateKeyPairFromSeed: function(seed){
			if (!(seed instanceof Uint8Array) || seed.length !== 32) {
				throw new Error('Seed must be a 32-byte Uint8Array.');
			}
			return nacl.sign.keyPair.fromSeed(seed);
		},
	
		// Sign a message using a private key.
		// message: Uint8Array, secretKey: Uint8Array
		// Returns: Uint8Array (signature)
		signMessage: function(message, secretKey){
			if(typeof(message)=='string'){
				message = DV.stringToBytes(message);
			}
			if (!(message instanceof Uint8Array) && !(secretKey instanceof Uint8Array)) {
				throw new Error('Message and secretKey must be Uint8Arrays.');
			}
			return nacl.sign.detached(message, secretKey);
		},
	};
	
	//FIXME make this faster by...
	//if true, triggers lazyEval of ids and secureHashing recursively.
	//TODO see wikibinator203 for how to do it without secureHashing but still perfect dedup using "localId".
	DV.autoDedupInList = true;
	

	//norms order of {} params recursively so tostring and id derived from it is deterministic.
	//Rebuilds all the maps so their keys are in ascending order.
	//In js the order added to the map is the order they are iterated.
	//This is so the same tree contents gives the same json so its hash id is the same.
	DV.normOb = function(ob){
		if(ob === null) return null;
		if(ob === undefined) return undefined;
		let proto = Object.getPrototypeOf(ob);
		if(DV.isMap(ob)){
			//TODO check DV.isMapNormed and return same map if so
			let keys = Object.keys(ob);
			keys.sort();
			let withKeysSorted = {};
			for(let key of keys){
				withKeysSorted[key] = DV.normOb(ob[key]);
			}
			Object.setPrototypeOf(withKeysSorted,proto); //keep same prototype
			return withKeysSorted;
		}else if(DV.isList(ob)){
			let newList = [];
			for(let i=0; i<ob.length; i++){
				newList.push(DV.normOb(ob[i]));
			}
			Object.setPrototypeOf(newList,proto); //keep same prototype
			return newList;
		}else{
			return ob; //is not a map, may be a list number string true false null etc.
		}
	};

	/*DV.me({zz:2,hello:5,yy:22})+''
	'["idHeGctChMe",null,0,0,[],{"hello":5,"yy":22,"zz":2}]'
	but TODO the null should be (at least if you call .id() on it, may be lazyEvaled?) filled in by a 'DV$' id of the hash of
	the '["idHeGctChMe",null,0,0,[],{"hello":5,"yy":22,"zz":2}]' form (as utf8 bytes).
	*/
	DV.me = function(me){
		let he = 0; //height 0 cuz ch.length is 0, is a leaf, with the ob/{}/[] data being a DAG leaf.
		let gct = 0; //0 means instead of expire time, garbcol by what has no incoming ptrs.
		return DV.list('idHeGctChMe',null,he,gct,[],me); //id starts null, TODO filled in later
	};

	DV.ch = function(...ch){
		return DV.chMe(ch,{});
	};
	
	//returns something like ["idHeGctChMe","DV$myId",He,GcT,[...ch...],{...me...}] that has a custom prototype so has funcs .gct() .he() .toString() etc.
	DV.chMe = function(ch,me){
		if(ch.length == 0){
			return DV.me(me);
		}else{
			//FIXME what if some of the childs are strings like g$hello or x$wikib$43OfBase64DigitsOf256BitId or x$url$https://example.com
			let he = 0;
			let gct = Infinity; //0 means instead of expire time, garbcol by what has no incoming ptrs. FIXME use the minimum of childs gcts.
			for(let c of ch){
				he = Math.max(he,c.he());
				gct = Math.min(gct,c.gct());
			}
			return DV.list('idHeGctChMe',null,he,gct,ch,me);
		}
	};
	
	DV.logDetailedDagMakingStuff = false;
	
	DV.computeId = function(anything){
		let a = anything;
		if(a===null || a===undefined){
			throw new Error('null or undefined');
		}
		if(DV.isDag(a)){
			return a.id();
		}
		let ty = typeof(a);
		if(ty == 'string'){
			if(ty.includes('$')){
				return ty; //g$hello x$wikib$theWikibId345435643 etc
			}else{ //g$stringabc means 'stringabc'
				if(a.includes(' ') || a.includes('\n') || a.includes('\r') || a.includes('\t')){
					//FIXME make a func to verify exactly if a g$ id (of a string) is valid. 'g$hello world'
					//is not cuz it has whitespace, for example. Theres other kinds of whitespace, nonprintable chars,
					//etc, and im unsure which will be ok for the g$ ids.
					throw new Error('TODO define the rules for g$ ids: TODO...');
				}else{
					return 'g$'+a;					
				}
			}
		}
		if(ty == 'number'){
			return ''+a; //FIXME prefix it with n$ or something to mean its a number, or just use ''+a?
		}
		throw new Error('TODO ty='+ty); 
	};
	
	//'g$thenbase64chars' to Uint8Array of the thenbase64chars part. Id of strinG starts with g$.
	DV.g$Base64ToBytes = function(g$){
		if(!g$.startsWith('g$')){
			throw new Error('Does not start with g$: '+g$);
		}
		return DV.base64ToBytes(g$.substring(2));
	};
	
	DV.pubkeyToBytes = function(pubkey){
		return DV.g$Base64ToBytes(pubkey);
	};
	
	DV.sigToBytes = function(sig){
		return DV.g$Base64ToBytes(sig);
	};
	
	//the param time and ret in a pubkeyParamTimeRetSig or when creating one. This is for ed25519 signing and verifying.
	//Returns a Uint8Array since thats what nacl-fast.js or nacl.js use.
	DV.paramTimeRet_bytesToSign = function(param, time, ret){
		if(typeof(time) != 'number'){
			throw new Error('typeof(time) is '+typeof(time)+' but expected number');
		}
		let paramId = DV.computeId(param);
		let timeId = DV.computeId(param);
		let retId = DV.computeId(ret);
		if(paramId.includes(' ') || timeId.includes(' ') || retId.includes(' ')){
			throw new Error('Ids cant have spaces but these do');
		}
		return DV.stringToBytes(paramId+' '+timeId+' '+retId);
	};
	
	//param is a pubkeyParamTimeRetSig list.
	DV.verifySigElseThrow = function(list){
		if(list[0] != 'pubkeyParamTimeRetSig'){
			throw new Error('Expected a pubkeyParamTimeRetSig');
		}
		let pubkey = list[1];
		let param = list[2];
		let time = list[3];
		let ret = list[4];
		let sig = list[5];
		let pubkeyBytes = DV.pubkeyToBytes(pubkey);
		let bytesToSign = DV.paramTimeRet_bytesToSign(param,time,ret);
		let sigBytes = DV.sigToBytes(sig);
		let isVerified = DV.verifyPubkeybytesBytestosignSigbytesElseThrow(pubkeyBytes, bytesToSign, sigBytes);
		if(!isVerified){
			throw new Error('DV.verifySigElseThrow: Failed ed25519 verify pubkey='+pubkey+
				' param='+param+' time='+time+' ret='+ret+' sig='+sig+' pubkeyBytes='+DV.bytesToHex(pubkeyBytes)+
				' bytesToSign='+DV.bytesToHex(bytesToSign)+' sigBytes='+sigBytes);
		}
	};
	
	DV.verifyPubkeybytesBytestosignSigbytesReturnBit = function(pubkeyBytes, bytesToSign, sigBytes){
		return DV.naclBasics.verifyMessageSigPubkey(bytesToSign, sigBytes, pubkeyBytes);
	};
	
	//This is how you bring in data from the internet thats untrusted.
	//Verifies its ed25519 andOr hash before putting in DV.idToOb.
	//Puts in DV.idToOb[itsId] -> it.
	//verifies ed25519, hashes, etc, or whatever it has, for a few standard types.
	//Throws if its not one of the types it knows how to verify.
	DV.importList = function(list){
		if(list[0]=='pubkeyParamTimeRetSig'){
			console.log('DV.importList: START: Trying to verify pubkeyParamTimeRetSig list by ed25519');
			DV.verifySigElseThrow(ret);
			console.log('DV.importList: END, verified: Trying to verify pubkeyParamTimeRetSig list by ed25519');
		}else if(list[0] == 'pubkeyParam'){
			throw new Error('TODO verify pubkey is the right size and base64 chars and that param is a valid object');
		}else if(list[0] == 'idHeGctChMe'){
			throw new Error('TODO verify list[1] is the hash of list with list[1] as null.');
		}else{
			throw new Error('TODO how to verify?')
		}
		if(!list.dedup){
			throw new Error('TODO its hasnt been given the DV.DagProto object yet')
		}
		list.dedup(); //puts in DV.idToOb[DV.computeId(list)] = list, unless idToOb already has one
	};

	//a data structure where list[0] has to be a string of a few standard types such as 'idHeGctChMe', 'pubkeyParam', or 'pubkeyParamTimeRetSig',
	//and the rest has rules about it recursively that you only need 1 or maybe 2 (exactly how deep?) childs in childs deep, to verify.
	//This is a web3 data structure that is not a blockchain cuz that implies money but is a DAG (directed acyclic graph) of json in general and pubkeys and sigs,
	//where you can hash and sign things in many combos.
	//TODO use it for dagball, dagplace, rule110ConfField, and using the x$wikib$ prefix also refer to wikibinator lambda ids but x$ and g$ ids are string only.
	//
	//If first param is 'pubkeyParamTimeRetSig' then does DV.verifySigElseThrow, so only verified sigs
	//and TODO verified hashes (verify when make the list, or TODO make a new func DV.importList for lists not made here)
	//go in DV.idToOb.
	DV.list = function(...ls){
		let ret = [...ls];
		ret = DV.normOb(ret); //FIXME make sure this doesnt save it in DV.idToOb before verifying it.
		Object.setPrototypeOf(ret,DV.DagProto);
		if(DV.autoDedupInList){
			if(DV.logDetailedDagMakingStuff) console.log('Start DV.autoDedupInList');
			if(ls[0]=='pubkeyParamTimeRetSig'){
				console.log('START: Trying to verify pubkeyParamTimeRetSig list by ed25519');
				DV.verifySigElseThrow(ret);
				console.log('END, verified: Trying to verify pubkeyParamTimeRetSig list by ed25519');
			}
			let deduped = ret.dedup();
			if(DV.logDetailedDagMakingStuff) console.log('Did DV.autoDedupInList, replaced='+(deduped!==ret));
			ret = deduped;
		}
		return ret;
	};

	//makes an ed25519 pubkey as a string ED$then43Base64DigitsOf256BitId
	DV.passwordToPubkey = function(password){
		throw new Error('TODO');
	};

	//password is a string (no prefix such as g$thepassword55, just thepassword55).
	//aram is any node. time is an integer number of microseconds utc time. Message is any node.
	//Returns something like...
	//["pubkeyParamTimeRetSig","ED$f1apakv5jlZzAQ3X2yyPgYTWskbGCSWAKAhZQMbvu5g","x$wikib$43OfBase64DigitsOf256BitId",1708276369632541,
	//	"DV$f1apakv5KlZzAQ6X2yyPgYTWskbGCSWAKAhZQMbvu5g","g$kjsefrkjxvksdfSDFDSAFASDf34345xdsfSDFSDF34sxdfSDFsd3245345sdxfSDFDFSGsadf342324sdfsdfs"]
	//that has a custom prototype so has funcs .gct() .he() .toString() etc.
	DV.sign = function(password, param, time, message){
		let pubkey = DV.passwordToPubkey(password);
		throw new Error('TODO');
	};

	//makes a request, a question, something like this... ["pubkeyParam","ED$f1apakv5jlZzAQ3X2yyPgYTWskbGCSWAKAhZQMbvu5g","x$wikib$43OfBase64DigitsOf256BitId"]
	//The response/return would be an output of DV.sign then get value out of that.
	//Does not send the request to call the pubkey on the param. Just makes the object.
	DV.pubkeyParam = function(pubkey,param){
		return DV.list('pubkeyParam',pubkey,param);
	};
	
	DV.escapeStringForJson = function(str){
		let ret = '"';
		for(let ch of str){
			switch(ch){
				case '\n':
					ret += "\\n";
				break;case '\t':
					ret += "\\t";
				break;case '\"':
					ret += "\\\"";
				break;case '\\':
					ret += "\\\\";
				break;default:
					ret += ch;
			}
		}
		return ret+'"';
	};
	
	DV.listIndexOfCh = 4; //idHeGctChMe
	
	//given an object and a syty (syntax type such as 'dag' for an houter node, or 'me' to do normal normed JSON.stringify etc),
	//returns a string similar to JSON.stringify but replaces some branches with their id to keep it in small jsonll-streamable pieces.
	DV.toDAGString = function(ob, syty, isMakingId){
		if(isMakingId && DV.isDag(ob) && ob.isA('idHeGctChMe') && ob[1]){ //TODO remove this after its working
			throw new Error('isMakingId but already has one: '+ob[1]);
		}
		
		let ty = typeof(ob);
		if(ty == 'string'){
			return DV.escapeStringForJson(ob);
		}else if(ty == 'number'){
			return ''+ob;
		}else{
			if(syty === undefined){
				syty = 'dag';
			}
			if(syty == 'ptr'){ //in ch everything is viewed as a ptr
				if(ob.isA('idHeGctChMe')){
					return DV.escapeStringForJson(ob.id());
				}else{
					throw new Error('TODO');
				}
			}else if(syty == 'dag'){
				if(DV.isList(ob)){
					if(ob.isA('idHeGctChMe')){
						if(!isMakingId && ob[1]===null){
							ob.fillInId();
						}
						let s = '[';
						for(let i=0; i<ob.length; i++){
							let isCh = i==DV.listIndexOfCh;
							if(i) s += ',';
							s += DV.toDAGString(ob[i], isCh?'ch':'me');
						}
						return s+']';
					}else if(ob.isA('pubkeyParam')){
						throw new Error('TODO');
					}else if(ob.isA('pubkeyParamTimeRetSig')){
						throw new Error('TODO');
					}else{
						throw new Error('TODO? dvty='+ob.ty());						
					}
				}else if(DV.isMap(ob)){
					throw new Error('There are no dag type maps, those all go in the "me" area.');
				}else{
					throw new Error('TODO? ty='+ty);
				}
			}else if(syty == 'ch'){
				if(DV.isList(ob)){
					let s = '[';
					for(let i=0; i<ob.length; i++){
						if(i) s += ',';
						s += DV.toDAGString(ob[i], 'ptr');
					}
					return s+']';
				}else{
					throw new Error('In ch it must be a list');
				}
			}else if(syty == 'me'){
				//FIXME do DV.normOb(ob) before JSON.stringify, or is it already normed?
				return JSON.stringify(ob);
			}else{
				throw new Error('TODO');
			}
		}
	};
	
	DV.numFastrees = 0;
	
	/* Ive found data structure with perfect dedup that should be able to create 1000s of dagball game state high dimensional
	vectors per sec per comp, possibly millions in some cases. Harmony-search vectors etc. Its variant of AVL tree with 2
	linked hashtables & 1 blob storage array.
	..
	By tiling these high dimensional vectors (contain custom GPU code as part of dimensions and high dimensional vectors,
	dagball should be able to do million simultaneous players, simply attracting local vectors to eachother and load/unload
	them when scroll? --I said in https://twitter.com/DagBallGame/status/1760339507608457418 2024-2-21
	...
	include(circ.influence)InHighDimensionalValuesButNot(y,x,r)_thoughKeepYXROptimizedToNotRecompile_iWantVecsToUseYXRAsDim
	...
	Dagball is nearly ready to scale up and have many players start creating content. Theres still some webGL security stuff
	(dont want one guys content overwriting anothers in GPU memory, etc). The DAG is coming. Its not a sparse game world yet,
	will be soon. --I said 2024-2-21-1133aET in https://twitter.com/benrayfield/status/1760341830841905596
	
	((dagvecAutoincWithWeakIntHashing)WithExtraIntsPerNodeSpecializedInKeyAndValSelfBalancingTrees)LocalAnd(JsonDag)Remote
	Mutable. A fast self balancing tree, likely will be an AVL tree, that has perfectDedup by hashConsing.
	This is a space and time optimized local datastruct specialized in a pair of selfBalancingTrees,
	one for keys (which contain big json) and one for vals, Its alot faster and smaller than combinators
	and guarantees max log number of nodes per add of leaf node of key(s) andOr val(s). The jsondag
	leafs may go in a [] aka object array but all the values (such as numbers for position and
	velocity of balls and circs and maybe checkbox and numberbox options.... This will allow
	putting game states on screen and clicking them to switch between them, merge, average, add,
	subtract, etc them. Its a local datastruct that has to be converted to jsondag when sent to/from
	peers, but locally its alot faster, perfectDedup either way. Its a variant of
	dagvecAutoincWithWeakIntHashing with more ints per node. It of course needs to be rehashed
	every 20 seconds or so, more or less, but it can do exact dedup and merge, average, etc with
	eachother in int[], so those objects on screen that i will drag and drop to add subtract merge
	etc them,
	...
	AVL has same number of nodes as keys and values, other than the "n numbers" per node in this variant of AVL.
	...
	Top half of ints is first node in each hash bucket. The bottom half is linked hash buckets.
	Each node has an int pointer (index in the ints array that a node starts)
	...
	Use Int32Array(1<<20) and int linkSize. linkSize starts as 0 and rises by 4 with each linkedlist node put in the low half. Its full if it reaches half array size. The (int,int)->int hash function always chooses an int in the high half thats a multiple of 4. Every node has 4 ints: self, left, right, next. The first node in a bucket goes in the high half. The second and all nodes after in that bucket go in the low half.
	int nextLinked = 0;
	Code it with these funcs:
	pair(arr,left,right)->int.
	left(arr,parent)->int.
	right(arr,parent)->int.
	size(arr)->int.
	addAll(arrFrom,arrTo) modifies arrTo by calling pair(arrTo,left,right) for each node in arrFrom. Use an int[1<<18] for int[nodeIndexInArrFrom]->nodeIndexInArrTo.
	Make a better hash(left,right) function using rule110 (32 bits -> 30 bits), and adding of 8 of the sha256 int constants
	...
	Int 0 means null. nextLinked therefore starts at intsPerNode, skips the first node.
	...
	Theres no deletes, only adds. Every int[this.intsPerNode] node is used as immutable avl node except for this.OB and this.NEXT etc.
	The this.ME and this.L and this.R are immutable. Use (intL,intR)->intBucketInHighHalfOfInts hash func to choose bucket
	in linked hashtable. TODO get a hash func from wikibinator203 (might be 3 nodes instead of 2, so simpler here)
	or do something with rule110 and adding 8 of the sha256 constants to it, something like that, to make a good (int,int)->int.
	...
	Lets go with a separate int array containing var size int arrays this way: intId,len,varSizeInts.
	UPDATE: can it be done without intId, just len,varSizeInts?
	...
	Since theres vints with var size int arrays as this.VAL ptr (FIXME still need to handle dedup of it
	but will likely involve linear comparing whole int arrays after computing a hash bucket
	from a linear reading of such an int array (of size around 1-100 ints)).
	These ints might be void* cast to float32s or might range approx plus/minus 4096 with 20 bits of fraction
	or something like that. Thats for caller to decide how to use them. Or caller might use 2 ints together
	for a float64 etc.
	...
	Since vals are var size ints, could use just 1 AVL tree, not 2 (not separate avl tree for keys vs vals),
	but it could be done either way. I tend to prefer the 2 parallel AVL trees cuz vals will change alot more often
	than keys, and when converted to jsondags shared across internet it will be smaller total size
	since can have fewer nodes in the vals tree than the keys tree, or the same number of nodes.
	...
	maxIntArrays is a similar datastruct as this.ints. Its low half is linked hash buckets,
	and high half is node at first bucket.
	Each node has: ME INTARRAYPTR.
	In this.vints which is an int array size maxIntArrays its this data per int array:
	NEXT LEN variableNumberOfInts(LENNumberOfInts).
	...
	DV.Fastree has nothing to do with "approximately-maximum-likelihood phylogenetic trees from
	alignments of nucleotide or protein sequences" which I see is also called fastree. I just meant "fast tree".
	...
	jsondagToSizeInInts is a js lambda that takes a jsondag and returns number of ints that should go in its value.
	That includes its .influence, and if influence is 0 then the other numbers have no effect on dagball game state.
	You navigate the multiverse of all possible dagball game states (and dagplace and rule110convfield etc, other apps)
	by changing between influence of 0 (ignore, though may still be in the tree data, can remove it in a tree fork) vs 1
	and gradually between. Dagball GPU code already has influence var on every GPU_circle in WebGL2_GLSL GPU memory. 
	*/
	DV.Fastree = function(maxNodes, vintsSize, maxIntArrayInts, jsondagToSizeInInts, intsPerJsondagHeader){
	//DV.Fastree = function(maxNodes, vfloatsSize){
		this.whichFastree = ++DV.numFastrees; //TODO use uint53 as low bits of ptr inside fastree and high bits of whichFastree?
		this.jsondagToSizeInInts = jsondagToSizeInInts;
		//Is 1 in the simplest case (circ.influence ball.influence etc) but its a research path to explore how multiple fastree vectors
		//(high dimensional dagball game states, though you could use it for other apps such as dagplace and rule110Convfield) fit together,
		//including how to harmonySearch, add, subtract, multiply, etc them. Might need to add another int or 2?
		//Regardless of what those extra jsondagToSizeInInts ints mean (caller decies), the first int in value of a key
		//is always the INFLUENCE field cuz thats how the high dimensional sparse vectors work (TODO). 
		this.intsPerJsondagHeader = intsPerJsondagHeader;
		//if(numInts%(intsPerNode*2)){
		//	throw new Error(numInts+' is not divisible by ()2*intsPerNodes)='+(2*intsPerNode));
		//}
		//it wont reach this actual maximum cuz some hashtable slots dont get used, but maybe will reach 2/3 of this?
		//The low half of this.ints gets densely filled in. The high half is first node in each hashBucket,
		//and this.ints[ptr+this.NEXT] is next node in same hashBucket.
		this.maxNodes = maxNodes;
		
		this.ME = 0; //offset in node, can be in low half or high half of this.ints.
		this.L = 1; //offset in node, can be in low half or high half of this.ints.
		this.R = 2; //offset in node, can be in low half or high half of this.ints.
		this.VAL = 3; //points into this.valHashtable, meaning a variable size int array such as 1-100 ints.
		this.SMALLDATA = 4; //literal int. TODO might only use half this int for max height 64k-1 or 255, use rest for something else.
		//total this.numsSize() in this node and all nodes reachable thru this.L and this.R. Gets a whole int.
		//Used for computing cumulative sum of this.numsSize() in the key tree so can know where to read from
		//vals tree (joined at each top by a isPairOfTrees).
		//FIXME how do u compute the int ranges in the vals from a isPairOfTrees?
		this.TOTALSIZE = 5;
		this.NEXT = 6; //offset in node, can only be in low half of this.ints.
		//offset in node, pointer into this.obs. Every node can have one, but for efficiency only leafs have one to start with.
		//or FIXME maybe this should start at this.ints.length
		this.OB = 7;
		//TODO small area in node to put val nums, or where should that go? If valnums go here,
		//it must be extra ints in DV.Fastree.prototype.lrToBucket.
		this.intsPerNode = 8;
		
		let nextLinked = intsPerNode;
		
		
		this.VALHASHTABLE_ME = 0;
		this.VALHASHTABLE_INTARRAYPTR = 1;
		
		this.VARSIZEINTARRAYS_NEXT = 0;
		this.VARSIZEINTARRAYS_LEN = 1;
		this.VARSIZEINTARRAYS_INTSSTARTAT = 2;
		
		this.ints = new Int32Array(maxNodes*this.intsPerNode); //general keys and vals
		//TODO should this be Float32Array instead?
		//this.vfloats = new Float32Array(vintsSize); //contains len,varSizeInts. this.VAL points here.
		this.vints = new Int32Array(vintsSize); //contains len,varSizeInts. this.VAL points here.
		this.vintsSize = this.VARSIZEINTARRAYS_INTSSTARTAT; //0 means null. its a size 0 array of ints.
		//Low half is linked hashtable. High half is first node in each hashBucket.
		//Each node is 2 ints: ME INTARRAYPTR.
		
		this.valHashtable = new Int32Array(maxIntArrayInts);
		this.obs = []; //append jsondags (can be values in DV.idToOb though if its id is null/notLazyEvaledYet it might not be there)
		this.obsSize = 0;
		this.ptrs = new Set(); //DV.Ptr's where ptr.ptrs contains a FastreePtr whose .tre is this Fastree and whose .ptr is some node by int ptr in this.ints.
	};
	//mutable objects have no .type (thats why theres no .type='dv_fastree');
	
	//returns 0 if not found, else a node ptr.
	DV.Fastree.prototype.jsondagToInt = function(){
		throw new Error('TODO');
	};
	
	//DV.Fastree is a map of jsondag to var number of ints (however many numbers it takes in dagball, is the main usecase).
	//returns a [] list of keys, that are each a jsondag. Excludes middle nodes if those are the kind of nodes that DV.Fastree generates,
	//but in theory in later versions of this software (Dagverse) nonleafs might optionally have values too.
	//FIXME since leafs go in all nodes, including internal nodes, that could get complicated.
	DV.Fastree.prototype.keys = function(intOrJsondag, optionalInts){
		throw new Error('TODO');
	};
	
	//get 1 int in the val of intOrJsondag. offset is relative to where that intOrJsondag starts in values.
	DV.Fastree.prototype.get1 = function(intOrJsondag, offset){
		//TODO optimize by not getting whole range of int vals, just get the one wanted.
		let valInts = this.get(intOrJsonDag);
		if(!valInts){
			return 0; //FIXME this means not found, but what constant should it be instead? Or should it throw?
		}
		return valInts[offset];
	};
	
	//DV.Fastree is a map of jsondag to var number of ints (however many numbers it takes in dagball, is the main usecase).
	//fill ints[0] to optionalInts[whatever is the size of that node]. FIXME how do u know the size of the node if its a jsondag?
	//If optionalInts is not given, creates one of the correct size and returns it.
	DV.Fastree.prototype.get = function(intOrJsondag, optionalInts){
		let int = intOrJsondag;
		if(DV.isDag(intOrJsondag)){
			//intOrJsondag = FIXME what if multiple nodes have that jsondag as their data? Can that happen? Shouldnt.
			int = this.jsondagToInt(intOrJsondag);
		}
		if(int){
			throw new Error('TODO');
		}//else return nothing
	};
	
	//From a isPairOfTrees node (which is normally a nonleaf value (even though nonleafs have jsondags in AVL)),
	//get a range of the number values. If you dont give optionalWriteHere and optionalWriteHereOffset, returns a Int32Array(valToExcl-valFrom).
	DV.Fastree.prototype.getValRange = function(intPairOfTreesPtr, valFrom, valToExcl, optionalWriteHere, optionalWriteHereOffset){
		throw new Error('TODO');
	};
	
	//DV.Fastree is a map of jsondag to var number of ints (however many numbers it takes in dagball, is the main usecase).
	//returns int of a node that is a forkEdited AVL-like-tree where that key is mapped to that value, in the double tree system (top node is a isPairOfTrees).
	DV.Fastree.prototype.put = function(intOrJsondag, ints, optionalFrom, optionalToExcl){
		if(optionalFrom === undefined){
			optionalFrom = 0;
			optionalToExcl = ints.length;
		}
		throw new Error
	};
	
	//TODO use uint53 as ptrs into fastptr, and
	DV.FastreePtr = function(fastree,intPtr){ //TODO exact dedup these
		this.tre = fastree;
		this.ptr = intPtr;
	};
	//mutable objects have no .type (thats why theres no .type='dv_fastree'); //DV.FastreePtr.prototype.type = 'dv_fastreePtr';
	
	//pointer at any set of: FastreePtr (DV.Fastree and an int pointer inside it) andOr jsondags.
	//Fastree.obs is the jsondags that the ints mean. Each fastree may have a different int for the same jsondag.
	//The jsondags are lazyevaled. Fastree is the fast way. Its all the same dag nodes either way.
	//There may be multiple FastreePtr in the same Ptr cuz Fastree doesnt allow removing, only adding,
	//so fastree has to be rehashed often. Ptr never has to be rehashed and abstracts away that.
	DV.Ptr = function(){
		this.ptrs = new Set(); //0 or more FastreePtr andOr jsondags, that all represent the same jsondag forest shape/content, with exact dedup.
	};
	//mutable objects have no .type (thats why theres no .type='dv_fastree'); //DV.FastreePtr.prototype.type = 'dv_ptr';
	
	//0 to 255, since AVL is a self balancing tree
	DV.Fastree.prototype.height = function(ptr){
		this.ints[ptr+this.SMALLDATA]&0xff;
	};
	DV.FastreePtr.prototype.height = function(){
		return this.tre.height(this.ptr);
	};
	
	//0 to 7
	DV.Fastree.prototype.maxHeightDiff = function(ptr){
		return (this.ints[ptr+this.SMALLDATA]&0x700)>>8;
	};
	DV.FastreePtr.prototype.maxHeightDiff = function(){
		return this.tre.maxHeightDiff(this.ptr);
	};
	
	//a top node that is a pair of key tree and val tree
	DV.Fastree.prototype.isPairOfTrees = function(ptr){
		return !!(this.ints[ptr+this.SMALLDATA]&0x800);
	};
	DV.FastreePtr.prototype.isPairOfTrees = function(){
		return this.tre.isPairOfTrees(this.ptr);
	};
	
	//0 to 2**20-1. This is the sum ofnumsSize for the 0or2 child nodes plus whatever local nums it adds.
	//Normally only leafs (dagball.Circ dagball.Ball etc) add to that but its possible any node could.
	DV.Fastree.prototype.numsSize = function(ptr){
		return this.ints[ptr+this.SMALLDATA]>>>12;
	};
	DV.FastreePtr.prototype.numsSize = function(){
		return this.tre.numsSize(this.ptr);
	};
	
	//bucket is an int index where a node starts in the high half of this.ints
	DV.Fastree.prototype.lrToBucket = function(intL,intR){
		throw new Error('TODO');
	};
	DV.FastreePtr.prototype.lrToBucket = function(){
		return this.tre.lrToBucket(this.ptr);
	};
	
	//push the kind of ob that could be value in  DV.idToOb. Returns existing int if its already in this.obs, else pushes it.
	DV.Fastree.prototype.findOrAddOb = function(ob){
		throw new Error('TODO check for dup and return same from ')
		let index = this.obsSize++;
		this.obs[index] = ob;
		return index;
	};
	//push the kind of ob that could be value in  DV.idToOb. Returns the jsondag/ob which is found or put in this.tre.obs
	DV.FastreePtr.prototype.findOrAddOb = function(){
		let ptr = this.tre.findOrAddOb(this.ptr);
		return this.tre.obs[ptr]; //FIXME add some constant to this (this.ints.length for example?)
	};
	
	//int ptr of the start of a node anywhere in this.ints. Fills in the int at ptr+this.OB and returns it, an index in this.obs.
	//This is used for making secureHash form of jsonDag instead of the DV.Fastree which uses local autoinc ids. 
	DV.Fastree.prototype.fillInOb = function(ptr){
		throw new Error('TODO');
	};
	//returns the ob/jsondag, not the int in the Fastree. You can share this object on internet and its id is global / DAG hash.
	DV.FastreePtr.prototype.fillInOb = function(){
		let obPtr = this.tre.fillInOb(this.ptr);
		return this.tre.obs[ptr]; //FIXME add some constant to this (this.ints.length for example?)
	};



	/*
	FIXME how can i store pubkey->param->newest_pubkeyParamTimeRetSig, considering that param and ret may each be [...] instead of just a 'DV$...',
	though maybe i should just use the normedJson string form, and as an optimization i could replace its prototype with one that has toString
	to cache the normedJson string form and return that.
	["idHeGctChMe","DV$myId",He,GcT,[...ch...["idHeGctChMe","DV$myId",He,GcT,[...ch...],{...me...}],[...],'g$hello'],{...me...}]

	x = ["idHeGctChMe","DV$myId",5,3453453,[],{}]
	(6) ['idHeGctChMe', 'DV$myId', 5, 3453453, Array(0), {…}]
	x+''
	'idHeGctChMe,DV$myId,5,3453453,,[object Object]'
	p = {};
	{}
	Object.setPrototypeOf(x,p)
	(6) ['idHeGctChMe', 'DV$myId', 5, 3453453, Array(0), {…}]
	p.toString = function(){ if(!this.toString_) this.toString_ = JSON.stringify(this); return this.toString_; };
	ƒ (){ if(!this.toString_) this.toString_ = JSON.stringify(this); return this.toString_; }
	ondemand.Dropdown.2dcf271a.js:1 [Violation] 'requestAnimationFrame' handler took 62ms
	x+''
	'["idHeGctChMe","DV$myId",5,3453453,[],{}]'
	x
	(6) ['idHeGctChMe', 'DV$myId', 5, 3453453, Array(0), {…}, toString_: '["idHeGctChMe","DV$myId",5,3453453,[],{}]']


	//["idHeGctChMe","DV$myId",He,GcT,[...ch...],{...me...}]
	//["pubkeyParamTimeRetSig","ED$f1apakv5jlZzAQ3X2yyPgYTWskbGCSWAKAhZQMbvu5g","x$wikib$43OfBase64DigitsOf256BitId",1708276369632541,
	//	"DV$f1apakv5KlZzAQ6X2yyPgYTWskbGCSWAKAhZQMbvu5g","g$kjsefrkjxvksdfSDFDSAFASDf34345xdsfSDFSDF34sxdfSDFsd3245345sdxfSDFDFSGsadf342324sdfsdfs"]
	*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//wrap in dag if its not already one. Also looks it up if is loaded into memory and its id has been calculated and that id is the param.
	let Wr = DV.wr = function(ob){
		if(typeof(ob)=='string' && DV.idToOb[ob]){
			return DV.idToOb[ob];
		}
		return DV.isDag(ob) ? ob : DV.me(ob);
	};
	
	let dv = DV.Dv = function(...params){
		let list = [];
		for(let p of params){
			list.push(DV.wr(p))
		}
		if(list.length == 0){
			return DV.me({}); //TODO make a constant for this Nil-like empty object to reuse
		}else if(list.length == 1){
			return DV.me(list[0]); //FIXME should it be a list of that one thing?
		}else{
			return DV.ch(...list);
		}
	};
	


	return DV;
})();
var Dv = DV.Dv;

for(let i=0; i<20; i++){
	console.log(`



TODO create this dagjson object type asap and make a few examples of it as test cases...

Make Free Speech Just Pay Shipping (FSJPS) happen in javascript. Maybe add it to Dagverse.js since its so simple a thing, just proofOfWork on pairs of things. Dagverse already has 256 bit hashes on json. Yes, do FSJPS on jsondag nodes (values in DV.idToOb). At first as an experiment to see what jsons rise to the top, but later maybe it will help organize things. VERY IMPORTANT: It has to be decaying proofOfWork. Each proofOfWork must come with a time that it decays with a halflife from. These decayingProofOfWorksFromATime will each be between 2 jsondags. So create a new thing parallel to idHeGctChMe called fsjps_lowchildHighchildSaltTime etc (but shorter).
...
A 3d chatroom where the things people write gravitate toward eachother based on total strength of associations between those short texts. Strength is a competition of who spends the most computing time trying to associate the texts, similar to Bitcoin's "proof of work" system. While there is unlimited space in the system overall, the space around any specific text is limited by 3d space, which drives competition for what people want that text to be associated with. It can be used like a forum or chatroom to associate text with responses, or to associate election candidates names with their positions on the issues, or to associate your website URL with things. Many possible uses, and a global competition for what gets associated to what else. In this peer to peer network, pairs of short text are communicated based on highest "proof of work" (see Bitcoin's design doc) on each pair, so the pairs of text that the most time is spent toward associating will spread through the network. --I wrote in https://sourceforge.net/projects/freespeechpay/ in year2013.
...
Hadnt thought about Free Speech Just Pay Shipping (never got peer to peer working) in long time, but maybe I'll finish it and use it between jsonDAG nodes in my Dagverse.js library that Dagball is built on, so u can put decaying proofOfWork with halflife between any 2 GPU_Circles --I wrote 2024-2-25 in https://twitter.com/benrayfield/status/1761625254093271113/photo/1

Also put a namespace in it, an arbitrary short string like aNamespaceBlahBlah553 (or maybe another json object)
so u can start a new one and ignore those being bombarded by spammers for a short time until they notice
people are interested in a new namespace, and maybe it will get mixed together later somehow.

//FreeSpeechJustPayShipping_
//fromId
//toId
//NamespaceId //so 3 jsondag ids such as DV$ or ED$ or a pubkeyParam or a pubkeyParam...fewotherfields
//or a ["fsjps..."] is possible but
//TimeAsIntegerMultipleOfHalflife
//TimeDecayFrom can be any time equal to or after TimeAsIntegerMultipleOfHalflife but before the next halflife.
//Salt 
["fsjps_frToNs"]
Actually since this is just a hash node it can go in a DV$ and put a js function in DV.DagProto to
//optimize for fsjps and do networking based on it, prioritizing those linked together, etc,
//but dont let it take over the networking.
//Just put me.type = 'fsjps_...'.
//Maybe start it with the ~10000 wikipedia centroids i found (look up in NLMI project), each as a g$string id
//such as g$Molecule g$Some_Page_Name, just as 
//Bring that ~10000 line file into the dagball project in lib dir (or maybe a data dir?).
//Use my GPU for a few months to make fsjps proofofworks between the specific edges between those pages
//that are defined in the file (as they were years ago when i computed the centroids from
//the 1.3 million wikipedia pages that had the shortest names).
//No, use a hash type that runs faster on CPU for fsjps proofofworks.

	randNum=`+Math.random());
}
