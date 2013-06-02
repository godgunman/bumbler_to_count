var jellyfishAudio = (function() {

	// require js/constants.js
	// require js/utils.js

	var audio = document.getElementById("speech");
	var stingWord = function (word) {
		if(MAP[word]) {
			sting(MAP[word]); 
		} else {
			return undefined;
		}
	};

	var stingSequence = function(formula) {
		formula = delWhiteSpace(formula);
    if (!formula) {
      return ;
    }

		numSeq = formula.split(/[+=\-\*\/]/gi);
		signSeq = formula.match(/[+=\-\*\/]/gi);
		var FUNC = [];
		for (i in numSeq) {
			var s = numSeq[i];
			var completeNum = numTrans(parseInt(s));
			if(numSeq.length == signSeq.length){
				if(i == numSeq-1)
					FUNC.push(bumblerSpeak('neg'));
			}
			for ( x in completeNum ){
				FUNC.push(bumblerSpeak(completeNum[x]));
			}
			if(i!=numSeq.length-1){
				FUNC.push(bumblerSpeak(signSeq[i]));
			}
		}
		next = function() {
			$(document).dequeue("myQueue");
		};
		$(document).queue("myQueue",FUNC);
		next();
	};

	var bumblerSpeak = function(w) {
		return function () { sting(MAP[w])};
	}

  var sting = function (option) {
    if (!option || option.hasOwnProperty('start') ==false 
                || option.hasOwnProperty('duration') == false ) {
      return;
    }

    var start = option['start'];
    var duration = option['duration'];

    audio.currentTime = start; 
    audio.play();
    return setTimeout(function() {
      audio.pause();
      if (typeof(next) != 'undefined') {
        next();
      }
    }, duration * 1000);
  };

  return {
    'sting': sting,
    'stingSequence': stingSequence,
    'stingWord': stingWord,
    'audio': audio,
  };

}());
