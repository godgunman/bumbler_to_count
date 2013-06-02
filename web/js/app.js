var jellyfishAudio = (function() {

  // require js/constants.js

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
