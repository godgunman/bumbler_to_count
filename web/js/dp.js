var calcMaxScore = function(strokes) {

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
      return guess(strokes.slice(start, end+1)) ;
    }

    var score = 0;
    for (var i = start; i<=end; i++) {
      var tmp = score, dp(start,i) + dp(i+1,end);
      if (tmp > score) {
        score = tmp;
        dpPath = [[start, end]] = i
      }
    }
    var tmp = guess(strokes.slice(start, end+1));
    if (tmp > score) {
      score = tmp;
      dpPath = [[start, end]] = -1;
    }
    dpTable[[start,end]] = score;
    
    return score;
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
      int split = dpTable[[start, end]];
      dpPathSplit.push(split);
      getDpPath(start, split);
      getDpPath(split+1, end);
    }
    dfs(start, end);
    dpPathSplit.sort(function(a, b){return a-b;});
    return dpPathSplit;
  };
};
