var image_url = {};

var retrieveHistory = function(e) {
  $(e.target.parentNode).addClass("active");
  $('#myModal').modal('show');
  $('#modal-header').html('<h3>'+e.target.innerHTML+'</h3>');
  var data_url = image_url[e.target.innerHTML];
  if (data_url) {
      $('#history_image').show();
      $('#history_image').attr('src', image_url[e.target.innerHTML]);
  }
  else {
      $('#history_image').hide();
  }

  var button = $('#modal-btn-spaek');
  button.off('click');
  button.click(function(e2) {
    var text = e.target.innerHTML;
    jellyfishAudio.stingSequence(text);
  });
  console.log(window.location.hash);
};

var addHistory = function(formula, image){
  var num = $('#historyList li').length + 1;
  var id = 'history' + num;
  var newOne = $("<li id=" + id + "><a href=\"#\">"+formula+"</a></li>");
  image_url[formula] = image;
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
