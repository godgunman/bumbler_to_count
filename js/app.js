var yishih = ['0', '1', '4', '=', '8', '1000', '3', '100', '10000'];

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

        var FUNC = [];
        if(formula.search('014=')==0){
            for(i in yishih){
                FUNC.push(bumblerSpeak(yishih[i]));
            }
        } else{

            var splited = [];
            var hasNum = 1;
            var numVal = 0;
            for (i in formula) {
                var s = formula[i];
                if (isNaN(s)) {
                    if (hasNum) {
                        splited.push(numVal);
                    }

                    hasNum = 0;
                    numVal = 0;

                    splited.push(s);
                } else {
                    hasNum = 1;
                    numVal = numVal*10 + parseInt(s, 10);
                }
            }
            if (hasNum) {
                splited.push(numVal);
            }

            var afterEqual = false;
            for (i in splited) {
                var s = splited[i];

                if (s == '=') {
                    afterEqual = true;
                }

                if (isNaN(s)) {
                    if (s=='-' && afterEqual == true) {
                        FUNC.push(bumblerSpeak('neg'));
                    } else {
                        FUNC.push(bumblerSpeak(s));
                    }
                } else {
                    var completeNum = numTrans(s);
                    for ( x in completeNum ){
                        FUNC.push(bumblerSpeak(completeNum[x]));
                    }
                }
            }
            if (afterEqual) {
                FUNC.push(bumblerSpeak('thanks'));
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
