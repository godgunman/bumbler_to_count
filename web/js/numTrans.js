var numTrans = function(num){
	var numStr = num.toString();
	var numLen = numStr.length;
	var numArr = new Array();
	var speakArr = new Array();
	if (numLen <=16){
		for(var i = 0; i < numLen; i++){
			numArr.push(parseInt(numStr[i]));
		}
		for(x in numArr){
			var digit = numLen - x;
			var res = digit % 4;
			var quo = Math.floor(digit / 4);
			if(numArr[x] != 2){
				speakArr.push(numArr[x].toString());
				var len = speakArr.length;
				// HANDLE CONTINUOUS ZERO
				if(len>=2){
					if(speakArr[len-1]==0&& speakArr[len-2] == 0)
						speakArr.pop();
				}
			} else{
				// Handle 2 / 2-2
				if(res == 2){
					speakArr.push('2');
				} else if (res == 3 || res ==0){
					speakArr.push('2-2');
				} else if (quo == 0){
					speakArr.push('2');
				} else if (x == 0){
					speakArr.push('2-2');
				} else {
					speakArr.push('2');
				}
			}

			if(numArr[x]!=0){
				switch(res)
				{
					case 0:
						speakArr.push('1000');
						break;
					case 1:
						break;
					case 2:
						speakArr.push('10');
						break;
					case 3:
						speakArr.push('100');
						break;
					default:
						break;
				}
				if(res == 1){
					if (numArr[x] == 0){
						speakArr.pop();
					}
					switch(quo)
					{
						case 1:
							speakArr.push('10000');
							break;
						case 2:
							speakArr.push('100m');
							break;
						case 3:
							speakArr.push('100b');
							break;
						default:
							break;
					}
				}
			}
		}

		console.log(speakArr);
	}
};
