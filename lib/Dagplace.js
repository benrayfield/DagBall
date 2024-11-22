//Ben F Rayfield offers Dagplace as opensource MIT license. Similar to but not made by r/place.
//Depends on Dagverse.js. Runs on CPU, doesnt need GPU (maybe for faster making and verifying sigs, later?).

/*
one text token whole thing: pubkey_time_2454543534_8324435345_34345435_4564564..._sig
as sig of time_2454543534_8324435345_34345435_4564564.
each such number is maybe a uint21 address and uint32 val,
and the vals must be a vec at most some constant such as maybe 2**16.
so can add about 2**15 of them in an Int32Array.
each such uint53 is a 2d voxel OR a time. as a time make it be in units of microseconds.
or maybe use 10000x10000 position and 7 digits of sum? No, not enuf sum.
1000x1000 address and 1000000000 sum?
12 12 29 for 4kX4k and plus/minus 1/4 million?

use the dagball_bloomtree compression to select n pixels and sign some as white and some as black
and all of the same strength (at most a vector of some constant, scaled to mean unit vector)?

Make a variant of it that has int (or int53) at each branch so can add and subtrct them?
could use 1010101001 as prefix to say theres n literal bits coming, or something like that.
or those vararg bytes that use 7 bits per byte? Or simply, 10 starts a 111110 then n bits literal?
or i could simply define one of the constants such as -(2**31) as branch (intead of 11)
and another constant as ignore/transparent (00) and have an int value at every branch.
so -(2**31) and -(2**31)+1 or maybe -(2**31)-1 aka maxint. yes. do minint and maxint as those 2 constants.
Maxint is branch 4 ways. Minint is transparent. So its just a tree of int32s. 5 base64s would fit 30 bits
so maybe should use int30?
Get rid of the transparent. Just have branch and literal int. Whole space must be filled in.
Or maybe int48 in double and fits in 8 base64 digits each.
Use time in units of 2**-16 or .0001 second etc?
...
just go with the int tree, using -(2**31) as branch and all other values are literal ints.
-(2**31)
-2147483648
x = -(2**31)
-2147483648
x
-2147483648
x-1
-2147483649
x|0
-2147483648
(x-1)|0
2147483647
((x-1)|0)+1
2147483648
(((x-1)|0)+1)|0
-2147483648

Use number of microseconds as time integer that fits in int53 for at least the next 100 years.
Like this one: 1707405934912000. Is a utc time.
Store that separately from the int[] inttree. sig of time_base64OfInts.
dagplaceSignedVec.pubkey.sig.value where value is time.base64OfInts.
For color, use the top branch as reservedForFutureExpansion, red, green, and blue.
Or maybe the top 16 if need room for more stuff, but just go with top 1 or 4 for now.

This tree is simple: -2147483648 (min int32) means 4 way branch. All other ints are literals in range plus/minus 2147483647 and cover the whole 2d area of a powOf2 size square.

Lambda Rick /acc
@benrayfield
If the vector length (sqrt of sum of squares) of such a tree is under 64k then can always sum up to 32k of them and the numbers still fit, and can do so sparsely since every child tree is at some range in the int[].
11:02 AM · Feb 8, 2024
·
2
 Views
View post engagements

Lambda Rick /acc
@benrayfield
·
Now
this means it could stream 32768 r/place -like (not made by r/place just a competing software) vectors from 32768 ed25519 pubkeys, before needing to upgrade to bigger numbers.

TODO paint in a 1024x1024 Int32Array to get started. Display in canvas using sortedPointers.
all values range plus/minus maxint. minint means branch so doesnt occur in the dense form.
Start painting on it from multiple simulated users, with 2 mouse buttons.
Get a feel for how the unit vec or less (max 2**16 vec length) fit together,
that they cant overpower eachother cuz its 2**20 dimensions.

In a 1024x1024 pixel r/place-like massively multiplayer game area (a small one to get started) thats million dimensions
so if theres 30000 players thats about 33 dimensions each adding a vector (stream paint) at most 64k long so could be 64k
pixels or 1 pixel painted stronger.


do sortedPointers.
*/



const dagplace = {

	//to scale up it has to be int32 or int53 (in float64 without roundoff) etc but just to play with it bruteforce it with float32 for now.
	//rebuild it every 1 minute or so to fix roundoff.
	FloatGame: function(){
		this.vecs = []; //each is a Float32Array(1<<16). vecs[0] is the main game.
	},



	Game: function(){
		//this.ints = new Int32Array(1<<20); any value in plus/minus maxint=2**31-1 (so no minint since that means branch).

		//experiment with 256 (1<<8) users and 1<<16 pixels each. The lowest one is the shared game area.
		//TODO experiment with painting 255 vectors and see how they interact.
		this.uyx = new Int32Array(1<<24); //1<<24 ints is 64mB. Multiply each by user.influence.
	},

	User: function(mutid){
		this.mutid = mutid; //ed25519 pubkey or a made up name for now. use dagverse base64 if pubkey.
		this.voxels = []; //uint52s
		//TODO within the same server, allow users to move this "game money" around, to prevent creating a bunch of accounts (ed25519 can create accts in a loop automatically)
		this.influence = 256; //Total influence must be less than 1<<15. Ints
	},

	//1<<20 mutable ints, 1024x1024. voxel is uint52 with int32 as low bits and uint20 as high bits.
	addVoxel: function(ints,voxel){
	},

	//An inttree is an Int32Array where -(2**31) means branch 4 childs, and all other int values are literals.
	addIntTrees: function(ta,tb){
		//TODO optimize by creating an Int32Array thats the sum of sizes of ta and tb
		//then copying it to a smaller Int32Array after recurse.
		let appendIntsHere = [];
		dagplace.addIntTrees_recurse(appendIntsHere, ta, tb, 0, 0, 0);
		return Int32Array.from(appendIntsHere);
	},

	BRANCH: -(2**31), //0x80000000

	/*
	//FIXME what if this gets too deep?
	addIntTrees_recurse: function(appendIntsHere, treeA, treeB, indexA, indexB, depth){
		let treeAIsBranch = treeA[indexA] == dagplace.BRANCH;
		let treeBIsBranch = treeA[indexA] == dagplace.BRANCH;
		if(treeA[])
		let ret = []; //put ints here, then convert it to Int32Array before returning that.
		throw new Error('TODO');
	},*/
	
	//finds signed [time,highDimensionaUnitVectorWhereEachPixelIsADimension]s near that (y,x) coordinate and up
	//to r radius away, approximately since each such signed vector can sign some pixels near and some far away.
	approxSearchSigsNearYXR: function(y,x,r){
		throw new Error('TODO');
	},
	
	//pubkey is a base64 (using the DV.dvBase64Digits digits in Dagverse.js which are sorted by ascending UTF8 and ASCII)
	passwordToPubkey: function(password){
		throw new Error('TODO');
	},
	
	sign: function(password,stringVal){
		throw new Error('TODO');
	},
	
	//Verify any of the stuff returned (in a list or is it a {} or what?) by approxSearchSigsNearYXR. Returns true/false.
	verify: function(sig){
		throw new Error('TODO');
	},
	
	//incoming {} [] etc, the object form of json, and if it contains valid signed vectors of
	//the pubkeys (todo make those a kind of mutid) then keeps only the one with the highest time so far,
	//keeping in mind that they can make up any time they want and sign it but we should only accept it if its below the current time.
	incoming: function(ob){
		throw new Error('TODO');
	}
	
};

dagplace.Game.prototype.addVoxels = function(voxels){
	throw new Error('TODO');
};

dagplace.Game.prototype.subtractVoxels = function(voxels){
	throw new Error('TODO');
};

dagplace.Game.prototype.toNormedColorRGBBySortedPointers = function(){
	throw new Error('TODO');
};

dagplace.len = function(vec){
	let sum = 0;
	for(let i=0; i<vec.length; i++){
		sum += vec[i]*vec[i];
	}
	return Math.sqrt(sum);
};

dagplace.setLen = function(vec,newLen){
	let len = dagplace.len(vec);
	if(len){
		let mul = newLen/len;
		for(let i=0; i<vec.length; i++){
			vec[i] *= mul;
		}
	}else{
		dagplace.fillVec(vec,1/Math.sqrt(vec.length));
	}
};

//FIXME use randBell. theres a func for it in dagball. but hypercube random is ok for early tests.
dagplace.newRandomVec = function(){
	let vec = new Float32Array(1<<16);
	for(let i=0; i<vec.length; i++){
		vec[i] = Math.random()*2-1;
	}
	dagplace.setLen(vec,1);
};

dagplace.fillVec = function(vec,val){
	for(let i=0; i<vec.length; i++){
		vec[i] = val;
	}
};

//2 vecs
dagplace.addInto = function(read,write){
	if(read.length != write.length) throw new Error('diff sizes');
	for(let i=0; i<read.length; i++){
		write[i] += read[i];
	}
};

dagplace.addMulInto = function(read,mul,write){
	if(read.length != write.length) throw new Error('diff sizes');
	for(let i=0; i<read.length; i++){
		write[i] += mul*read[i];
	}
};

dagplace.clearVec = function(vec){
	dagplace.fillVec(vec,0);
};

dagplace.FloatGame.prototype.rebuild = function(vec){
	dagplace.clearVec(this.vecs[0]);
	for(let i=1; i<this.vecs.length; i++){

	}
};

//display this.vecs[0] in canvas
dagplace.FloatGame.prototype.display = function(){
	throw new Error('TODO');
};

//dagplace.FloatGame.prototype.onUIEvent = function(canvasY, canvasX, button, val){
//};

dagplace.copyVec = function(vec){
	return new Float32Array(vec);
};

//dagplace.newUser = function(){
//};

dagplace.bootFloatGame = function(){
	dagplace.fgame = new dagplace.FloatGame();
	let numUsers = 255;
	for(let i=0; i<numUsers; i++){
		dagplace.fgame.vecs.push(dagplace.newRandomVec());
	}
};


/* GPT4 suggests...

var nacl = (typeof window !== 'undefined') ? window.nacl : require('tweetnacl');
nacl.util = require('tweetnacl-util');

var myNaclAPI = {
	passwordToPubkey: function(password) {
		// Use a hash of the password as the seed for key pair generation.
		var hash = nacl.hash(nacl.util.decodeUTF8(password));
		// Use only the first 32 bytes of the hash as the seed.
		var seed = hash.subarray(0, 32);
		var keyPair = nacl.sign.keyPair.fromSeed(seed);
		// Return the public key in base64 using Dagverse.js base64 digits.
		return nacl.util.encodeBase64(keyPair.publicKey); // Modify to use DV.dvBase64Digits.
	},
	
	sign: function(password, stringVal) {
		var hash = nacl.hash(nacl.util.decodeUTF8(password));
		var seed = hash.subarray(0, 32);
		var keyPair = nacl.sign.keyPair.fromSeed(seed);
		var messageUint8 = nacl.util.decodeUTF8(stringVal);
		var signature = nacl.sign.detached(messageUint8, keyPair.secretKey);
		// Return the signature in base64.
		return nacl.util.encodeBase64(signature);
	},
	
	verify: function(sig, message, publicKeyBase64) {
		// Convert all inputs from base64 to their Uint8Array form.
		var signature = nacl.util.decodeBase64(sig);
		var messageUint8 = nacl.util.decodeUTF8(message);
		var publicKey = nacl.util.decodeBase64(publicKeyBase64);
		// Verify the signature.
		return nacl.sign.detached.verify(messageUint8, signature, publicKey);
	}
};
*/

throw new Error('TODO use 2 mouse buttons, one that makes brighter/positive, one that makes darker/negative, and if hold both then decay toward 0. keep users vec normed to len 1. make fast controls for changing users. Display as sortedpointers. also make an option for rule110 convfield. have canvas save to jpg and have a current jpg that users can download so they download it in a loop or something.');