//Ben F Rayfield offers Dagverse (DAG multiVERSE) opensource MIT license.
const DV = {
	name: 'Dagverse',
	license: 'Ben F Rayfield offers Dagverse (DAG multiVERSE) opensource MIT license.',
	description: 'TODO write description of Dagverse',
	
	utf8TextEncoder: new TextEncoder('utf-8'),
	utf8TextDecoder: new TextDecoder('utf-8'),
	stringToBytes: function(s){ return DV.utf8TextEncoder.encode(s); },
	bytesToString: function(bytes){ return DV.utf8TextDecoder.decode(bytes); },
	
	bytesToJsBase64: bytes=>btoa(String.fromCharCode.apply(null, bytes)), //returns string

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
	jsonIdPrefix: 'j$',
	
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
		
	//rebuilds all the maps so their keys are in ascending order.
	//In js the order added to the map is the order they are iterated.
	//This is so the same tree contents gives the same json so its hash id is the same.
	mapNorm: function(map){
		return map; //FIXME
	},
	
	//string to bytes
	sToB: function(str){
		return DV.stringToBytes(str); //TODO skip this extra step
	},
	
	//bytes to string
	bToS: function(bytes){
		return DV.bytesToString(bytes); //TODO skip this extra step
	},
	
	hashBytes: bytes=>DV.sha256(bytes),
	
	//the hash is a base64 (no = padding) of sha256 of the string as utf8.
	hashString: function(str){
		return DV.bytesToBase64(DV.sha256(DV.stringToBytes(str)));
	},
	
	normedJsonToId: function(normedJson){
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
	
	//Dont modify the map after calling this.
	idToMap: function(id){
		//if(is a listToMutidArrayLiteralId id){
		//	FIXMEFIXME
		//}
		return DV.idToMap_[id] || null;
	},
	
	//returns list of child ids. Dont modify the list.
	ch: function(id){
		return DV.idToMap(id).ch || [];
	},
	
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
		return json.replaceAll(':0.',':.').replaceAll(',0.',',.').replaceAll('_-0.',',_-.');
	},
	
	contentToHash: map=>DV.adjustJson(JSON.stringify(DV.mapNorm(map))),
	
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
	
};

for(let i=0; i<65; i++){ //last digit is = for padding, but dv base64 doesnt use it. js base64 does.
	let jsDigit = DV.jsBase64Digits[i];
	let dvDigit = DV.dvBase64Digits[i];
	DV.digitJsToDv[jsDigit] = dvDigit;
	DV.digitDvToJs[dvDigit] = jsDigit;
}

DV.idOfExampleStateVector = DV.mapToId(DV.exampleStateVector);

//returns id of that saved sim/game state. This is meant to be the replacement for dagball_wholeGameState.
//That id will be of a map/json thats a vector of id to influence, as in dagball.Circ.influence and .Ball.influence.
//When influence is 0, its the same as that object not existing. Influence is normally 0 or 1 but
//can be between for circs, for example, and how much that circ adds
//to potentialEnergy (in gradient calculation) is multiplied by its influence.
DV.Sim.prototype.save = function(){
	throw new Error('TODO');
};

//number of dimensions, used in position param of saveSparse.
DV.Sim.prototype.dims = function(){
	return 2; //default to 2 since dagball is a moving 2d crossSection through a high dimensional manifold.
};

//only the objects near a given position. In dagball position is 2d. Returns an id.
DV.Sim.prototype.saveSparse = function(radius, ...position){
	throw new Error('TODO');
};

//loads sim/game state by id. id is normally of 
DV.Sim.prototype.load = function(id){
	throw new Error('TODO');
};

//load the id and everything reachable from it (id is normally made by saveSparse) but keep everything that was
//there before unless these replace mutids (such as a dagball.Circ being replaced by a modified version of it).
DV.Sim.prototype.loadSparse = function(ids){
	throw new Error('TODO');
};

//get all the ids loaded in the sim, regardless of their influence/weight even if its 0 or nonzero.
DV.Sim.prototype.ids = function(){
	throw new Error('TODO');
};

//state is a weightedSet of ids. weight is influence as in dagball.Circ.influence and .Ball.influence.
//influence 0 is same as it not existing. If you dont give the influence param, it returns current influence.
//Influence normally ranges 0 to 1, and is often digital/bit exactly 0 or exactly 1 but some kinds are scalar.
//Call sim.ids() to get the ids already used here. You can add other ids too.
DV.Sim.prototype.go = function(id, optionalInfluence){
	if(optionalInfluence === undefined){
		throw new Error('TODO return influence');	
	}else{
		throw new Error('TODO set influence of that id');
	}
},

//removes the id. If sim.go(id,0) it might be removed or not, like "warming" to keep it ready.
DV.Sim.prototype.del = function(id){
	throw new Error('TODO');
};

//may be nondeterministic such as float roundoff and timing differences.
//dt is change in time. Doesnt have to match physical time. Normally dt is about 1/60 second.
//nextState may change which ids there are, such as dagball has a GPU code editor that adds new dagball.Circs.
DV.Sim.prototype.nextState = function(dt){
	throw new Error('TODO');
};

/* ["piAndTwenty",3.14159,20] 'a$piAndTwenty_3p14159_20', for example.
Nomatter how big the list is, will return its string form.
TODO make a kind of id thats a$piAndTwenty_3p14159_20 . a (as in array of floats at a mutid) means mutid then float32s.
In the number area p means . and e means e as in exponents and m means -. Also it may be NaN or Infinity or mInfinity.
Example: a dagball.Ball would have 4 floats for y yv x xv so maybe 
Every kind of id starts with type$stuff, so j$base64ofhashofthejson.
If the piAndTwenty_3p14159_20 gets bigger than fits in an id (maybe cap it at 50 or something)
then make an id by hashing it. not as json. but hash "piAndTwenty_3p14159_20_..."
(a string is technically json) and get A$base64ofhashofthea$.
No, cuz i might want to hash a string. Maybe do it as ["piAndTwenty",3.14159,20] which is json.
///
DV.mapToId(['sBall5',dagball.balls[4].y,dagball.balls[4].yv,3433333333333333333333333333333,dagball.balls[4].xv])
returned 'a$sBall5_mp1445143845226176_mp14177974616182978_3p4333333333333336e30_mp021837776189999842'
TODO cut down on the precision of numbers in the list, maybe 7 digits after the decimal point.
a$sBall5_mp1445143_mp1417797_3p4333333e30_mp021837
Thats 50 bytes/chars and stores y and x position and velocity of ball named sBall5.
Its not great storage efficiency but 22 bytes is min possible cuz 6 bytes for name and 4 floats 4 bytes each.
Since its all base64 chars, and its human readable, 2.27 times the size is an ok cost.
If theres 200 balls, that get updated 30x/sec, at 50 bytes each,
thats 10kB * 30 = 300kB/sec which is a few times higher than i wanted but i can do it.
Also i could use just 100 balls for 150kB/sec. Also other objects get updated so raise that to 200kB/sec
per player.
*/
DV.listToMutidArrayLiteralId = function(list){
	let literal = list[0];
	let suffix = '';
	for(let i=1; i<list.length; i++){
		suffix += '_'+list[i];
	}
	let s = DV.mutidLiteralArrayPrefix+literal+suffix.replaceAll('-','m').replaceAll('.','p');
	s = s.replaceAll('_0p','_p').replaceAll('_m0p','_mp').replaceAll('+',''); //FIXME do this in adjustJson?
	return s;
};


/*TODO make dagball_bloomfilter literal type y$...base64With3OfBase4DigitsPerBase64Digit,
that is a literal id (similar to a$ is a different kind of literal).
Generalize this to any string whose contents are those base64 digits (regardless of what they mean)
and is small enough, maybe max 50 chars/bytes or max 100 or something. Bigger would be a json string
of "...base64...". A string is technically json, as much as a {} or [] is.

TODO close the strange-loop 
https://twitter.com/benrayfield/status/1743117311823786219
Thinkin bout "closing the strange-loop" of my opensource DAG multiverse by define html + js files as multiverse dimensions, that can only move in with sudo-like command (can crash sandboxed browser tab), to reboot in iframe from given html in json string. Githublike Wikipedialike
*/


//# sourceURL=Dagverse.js