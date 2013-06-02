var jellyfishAudio = (function() {

  var MAP = {
    '1': {
      'start': 0,
      'duration': 1
    },
    '2': {
      'start': 1,
      'duration': 1
    },
    '3': {
      'start': 2,
      'duration': 1
    },
    '4': {
      'start': 3,
      'duration': 1
    },
 }

  var audio = document.getElementById("speech");
  var stingWord = function (word) {
    if(MAP[word]) {
      return sting(MAP[word]); 
    } else {
      return undefined;
    }
  };

  var sting = function (option) {
    var start = option['start'];
    var duration = option['duration'];

    audio.currentTime = start; 
    audio.play();
    return setTimeout(function() {
      audio.pause();
    }, duration * 1000);
  };

  return {
    'sting': sting,
    'stingWord': stingWord,
    'audio': audio,
  };

}());
