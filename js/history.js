var retrieveHistory = function(e) {
	$(e.target.parentNode).addClass("active");
	$('#myModal').modal('show');
	$('#modal-header').html('<h3>'+e.target.innerHTML+'</h3>');
  
  var button = $('#modal-btn-spaek');
  button.off('click');
  button.click(function(e2) {
    var text = e.target.innerHTML;
    jellyfishAudio.stingSequence(text);
  });
};

var addHistory = function(formula){
  var num = $('#historyList li').length + 1;
  var id = 'history' + num;
  var newOne = $("<li id=" + id + "><a href=\"#\">"+formula+"</a></li>");
  newOne.hide();
  $("#historyList").prepend(newOne);
  newOne.fadeIn({duration:1000});
  $("#"+id).click(retrieveHistory);
};

var closeModal = function(){
  $('#historyList>li.active').removeClass("active");
};

$('#history1').click(retrieveHistory);
$('#history2').click(retrieveHistory);
$('#modal-btn-close').click(closeModal);


addHistory('32+3+9*2=53');
addHistory('1+1+1=3');
addHistory('0+1+4=5');
