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
    var FUNC = [];
    for (i in formula) {
      var s = formula[i];
      var f = function(w) {
        return function () { sting(MAP[w])};
      }
      FUNC.push(f(s));
    }
    next = function() {
      $(document).dequeue("myQueue");
    };
    $(document).queue("myQueue",FUNC);
    next();
  };

  var sting = function (option) {
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
