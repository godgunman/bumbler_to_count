var calcMaxScore = (function() {
  var strokes;
  var gesture;

  var setStrokes = function (input) {
      strokes = input;
  };

  var setGesture = function (g) {
      gesture = g;
  };

  var guess = function (strokes_guess) {
      gesture.strokes = strokes_guess;
      var result = gesture.recognize(true);
      var weight = strokes_guess.length * 10;
      console.log(result);
      if (!result)
        return 0;
      return result.score * weight;
  }

  var dpTable = {};
  var dpPath = {};

  var getDpScore = function (start, end) {
    dpTable = {};
    dpPath = {};
    var dp = function (start, end) {
      if (dpTable[[start,end]] != undefined) {
        return dpTable[[start,end]];
      }

      if (start == end) {
        dpPath[[start, end]] = start;
        dpTable[[start, end]] = guess(strokes.slice(start, end+1)) ;
        return dpTable[[start, end]];
      }

      var score = 0;
      for (var i = start; i<end; i++) {
        var tmp = dp(start,i) + dp(i+1,end);
        if (tmp > score) {
          score = tmp;
          dpPath[[start, end]] = i
        }
      }
      var tmp = guess(strokes.slice(start, end+1));
      if (tmp > score) {
        score = tmp;
        dpPath[[start, end]] = -1;
      }
      dpTable[[start,end]] = score;
      return score;
    };
    return dp(start, end);
  };

  var getDpPath = function (start, end) {
    var dpPathSplit = [];
    var dfs = function (start, end) {
      if (dpPath[[start, end]] == -1) {
        return;
      }
      if (start == end) {
        return;
      }
      var split = dpPath[[start, end]];
      dfs(start, split);
      dpPathSplit.push(split);
      dfs(split+1, end);
    }
    dfs(start, end);
    return dpPathSplit;
  };

  return {
    'getDpPath': function() {
      if(strokes == undefined)
        return undefined;

      getDpScore(0, strokes.length - 1);

      return getDpPath(0, strokes.length - 1);
    },
    'getDpScore': function() {
      if(strokes == undefined)
        return undefined;
      return getDpScore(0, strokes.length - 1);
    },
    'setStrokes': setStrokes,
    'setGesture': setGesture,
  };
}());
