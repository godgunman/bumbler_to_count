var calcMaxScore = (function() {
  var strokes;

  var setStrokes = function (input) {
      strokes = input;
  };

  var guess = function (strokes_guess) {
      gesture.strokes = strokes_guess;
      var result = gesture.recognize(true);
      return result ? result.score : 0;
  }

  var dpTable = {};
  var dpPath = {};

  var getDpScore = function (start, end) {
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

      if (!dpPath[[0, strokes.length]]) {
        getDpScore(0, strokes.length - 1);
      }

      return getDpPath(0, strokes.length - 1);
    },
    'getDpScore': function() {
      if(strokes == undefined)
        return undefined;
      return getDpScore(0, strokes.length - 1);
    },
    'setStrokes': setStrokes,
  };
}());
