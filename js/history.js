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

var addHistory = function(){
	var num = $('#historyList li').length + 1;
	var id = 'history' + num;
	$("#historyList").prepend("<li id=" + id + "><a href=\"#\">test</a></li>");
	$("#"+id).click(retrieveHistory);
};

var closeModal = function(){
	$('#historyList>li.active').removeClass("active");
};

$('#history1').click(retrieveHistory);
$('#history2').click(retrieveHistory);
$('#modal-btn-close').click(closeModal);
