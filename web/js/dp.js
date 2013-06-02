var calcMaxScore = (function(strokes) {

  var getDpScore = function (start, end) {
    var dpTable = {};
    var dpPath = {};

    var dp = function (start, end) {

      if (dpTable[[start,end]]) {
        return dpTable[[start,end]];
      }
      if (start > end) {
        return 0;
      }

      if (start == end) {
        dpPath[[start, end]] = start;
        dbTable[[start, end]] = guess(strokes.slice(start, end+1)) ;
        return dbTable[[start, end]];
      }

      var score = 0;
      for (var i = start; i<=end; i++) {
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
      if (start>end) {
        return;
      }
      if (start == end) {
        dpPathSplit.push(start);  
        return;
      }
      var split = dpTable[[start, end]];
      getDpPath(start, split);
      dpPathSplit.push(split);
      getDpPath(split+1, end);
    }
    dfs(start, end);
    return dpPathSplit;
  };

  return {
    'getDpPath':getDpPath,
    'getDpScore':getDpScore,
  };
}());
