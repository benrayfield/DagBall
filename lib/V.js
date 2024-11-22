//Ben F Rayfield offers this V.js (sparse vector/array) software under opensource MIT license.

const V = (()=>{
	const V = {};

	const twoPow32 = 2**32;

	const twoPowNeg32 = 2**-32;

	const twoPow31 = 2**31;

	const twoPow21 = 2**21;
	
	const twoPow21MinusOne = 2**21-1;

	//key is int 0 to 2**21-1 and is wrapped into that range. val is int32 and is |0 into that range.
	//let dSafe = V.keyvalSafe = (key,val)=>((key&0x1fffff)*(2**32) | ((val>>>31)*(2**31))  | (val&0x7fffffff));
	let keyval = V.keyvalSafe = (key,val)=>(((key&twoPow21MinusOne)*twoPow32)|(val>>>0));

	let key = V.key = kv=>((kv*twoPowNeg32)&twoPow21MinusOne);

	//get int32 val from float64
	let val = V.val = kv=>(kv|0);

	//get uint32 from float64
	let uval = V.uval = kv=>(d>>>0);

	//get val as float32
	let fval = V.fval = kv=>V.intBitsToFloat(V.val(kv));

	//TODO verify endian. use that code with Math.PI and 8 bytes. normally its littleEndian of bytes.
	//FIXME should i have allocated it as byte array first or byte array first? Does it matter?
	V.overlappingUint8Array = new Uint8Array(8);
	V.overlappingIntArray = new Int32Array(V.overlappingUint8Array.buffer);
	V.overlappingFloatArray = new Float32Array(V.overlappingIntArray.buffer);
	V.overlappingDoubleArray = new Float64Array(V.overlappingIntArray.buffer);

	//int32 -> float32. not a cast.
	let intBitsToFloat = V.intBitsToFloat = i=>{
		V.overlappingIntArray[0] = i;
		return V.overlappingFloatArray[0];
	};

	//float32 -> int32. not a cast.
	let floatToIntBits = V.floatToIntBits = f=>{
		V.overlappingFloatArray[0] = f;
		return V.overlappingIntArray[0];
	};

	V.valIfNotFound = 0;

	//Float64Array param. key param. TODO binary search. return 0 if not found. or should it be NaN?
	let get = (arr,key)=>{
		let i = V.binarySearchKey(arr,key);
		return (i<0) ? V.valIfNotFound : V.val(arr[i]);
	};

	//FIXME since V.merge is for kv (a float64 with key and val), V.merge would need translation in its param
	//since these just want fval of it.
	//let ave = (arrA,arrB)=>V.merge(arrA,arrB,(a,b)=>((a+b)/2));
	//let weightedSumOf2Arrays = (arrA,weightA,arrB,weightB)=>V.merge(arrA,arrB,(a,b)=>(a*weightA+b*weightB));



	//returns an Int32Array same size, containing V.key(kv) of each, even if theres duplicates.
	let keys = arr=>{
		let keys = new Int32Array(arr.length);
		for(let i=0; i<arr.length; i++){
			keys[i] = V.key(arr[i]);
		}
		return keys;
	};

	//get vals as Uint32Array
	let uvals = arr=>{
		let vals = new Uint32Array(arr.length);
		for(let i=0; i<arr.length; i++){
			vals[i] = V.uval(arr[i]);
		}
		return vals;
	};

	//get vals as Int32Array
	let vals = arr=>{
		let vals = new Int32Array(arr.length);
		for(let i=0; i<arr.length; i++){
			vals[i] = V.val(arr[i]);
		}
		return vals;
	};

	V.dComparator = (b,c)=>{
		if(b===b){
			if(c===c){ //neither is NaN
				if(b < c) return -1;
				if(b > c) return 1;
				return 0;
			}else{ //c is NaN
				return 1; //FIXME should this be -1 or 1? Does NaN go after Infinity or before -Infinity?
			}
		}else{ //b is NaN
			if(c===c){
				return -1; //FIXME should this be -1 or 1? Does NaN go after Infinity or before -Infinity?
			}else{ //c is NaN
				return 0; //both NaN
			}
		}
	};

	//if neither array has duplicate keys, then returns the number of unique keys.
	//TODO test this code written by AI.
	V.mergeSize = (arrA,arrB)=>{
		let iA = 0;
		let iB = 0;
		let size = 0;
		while(iA < arrA.length && iB < arrB.length){
			let keyA = V.key(arrA[iA]);
			let keyB = V.key(arrB[iB]);
			if(keyA < keyB){
				iA++;
			}else if(keyA > keyB){
				iB++;
			}else{ //keyA == keyB
				iA++;
				iB++;
			}
			size++;
		}
		size += arrA.length-iA;
		size += arrB.length-iB;
		return size;
	};

	//Both param arrays must be sorted in the V.sort order (not by default js sort which converts them to string first.)
	//If they have different keys, uses 0 for the one that doesnt have it. Result per index is merger(kvA,kvB).
	//TODO test this code written by AI.
	V.merge = (arrA,arrB,merger)=>{
		let size = V.mergeSize(arrA,arrB);
		let merged = new Float64Array(size);
		let iA = 0;
		let iB = 0;
		let iM = 0;
		while(iA < arrA.length && iB < arrB.length){
			let keyA = V.key(arrA[iA]);
			let keyB = V.key(arrB[iB]);
			if(keyA < keyB){
				merged[iM] = merger(arrA[iA],V.valIfNotFound);
				iA++;
			}else if(keyA > keyB){
				merged[iM] = merger(V.valIfNotFound,arrB[iB]);
				iB++;
			}else{ //keyA == keyB
				merged[iM] = merger(arrA[iA],arrB[iB]);
				iA++;
				iB++;
			}
			iM++;
		}
		while(iA < arrA.length){
			merged[iM] = merger(arrA[iA],V.valIfNotFound);
			iA++;
			iM++;
		}
		while(iB < arrB.length){
			merged[iM] = merger(V.valIfNotFound,arrB[iB]);
			iB++;
			iM++;
		}
		return merged;
	};

	V.dCopy = arr=>{
		let copy = new Float64Array(arr.length);
		copy.set(arr);
		return copy;
	};

	//sort in place. return same array for convenience.
	V.dSortModify = arr=>{
		arr.sort(V.dComparator);
		return arr;
	};

	//return new array. does not modify param.
	V.dSort = arr=>{
		return V.dSortModify(V.dCopy(arr));
	};

	//key ranges 0 to 2**21-1.
	//TODO? (for now just return -1 if not found): ???
	//??? Returns "index of the search key, if it is contained in the array; otherwise, (-(insertion point) - 1).
	//The insertion point is defined as the point at which the key would be inserted into the array: the index of the first element
	//greater than the key, or a.length if all elements in the array are less than the specified key. Note that this guarantees that
	//the return value will be >= 0 if and only if the key is found."
	//like in https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html#binarySearch-byte:A-byte-
	V.binarySearchKey = (arr,key)=>V.binarySearchRange(arr,V.kv(key,0),0,arr.length);

	V.binarySearchKv = (arr,kv)=>V.binarySearchKey(arr,V.key(kv));

	//kv is a uint21*twoPow32. The v/val bits are 0.
	//uses V.key(val) so anything that matches key matches, even if val is different.
	//kv is a float64 with 
	//from is inclusive. to is exclusive. Returns same thing V.binarySearch returns.
	V.binarySearchKvRange = (arr,kv,from,to)=>{
		//ignore NaNs for efficiency. dont put them in there. FIXME?
		if(from+1 >= to){
			if(from === to) return -1;
			if(from+1 === to){
				let foundKey = V.key(arr[from]);
				let searchKey = V.key(kv);
				return (foundKey===searchKey) ? from : -1;
			}
			throw new Error('from='+from+' to='+to);
		}
		let midIndex = (from+to)>>1;
		let midVal = arr[midIndex];
		if(kv <= midVal){
			return V.binarySearchKvRange(arr,kv,from,midIndex);
		}else{
			return V.binarySearchKvRange(arr,kv,midIndex,to);
		}
	};

	//The default dense array. Each index in this is a key. Each float is a val.
	//Dont waste memory allocating this if not sure gonna use it.
	//let dense = V.dense = new Float32Array(2**21);



	return V;
})();
console.log('V='+V);