var count = 1;

$(document).ready(function() {
  
  $("#text-value").keyup(function(e) {
    
    var tbox = $('#text-value');

    //alert(e.keyCode);
    if (e.keyCode == 32) {
      
      $('#listy-text-box').before($('<li id="list-item' + count + '"><div class="item">' 
                                  + tbox.val() + '<a href="javascript:RemoveItem(\'list-item' 
                                  + count 
                                  + '\');">&#8855;</a></div></li>'));
      
      tbox.val('');
      
      count++;
      
      return false;
    }
    else if (e.keyCode == 8)  {
      if (tbox.val().length < 1) {
        $('ul li:nth-last-child(2)').children('.item').css('background','whitesmoke');
      }
    }
    
  });

  
  //clicking anywhere on the pseudo-textbox focuses on text input and adds outline
  $('ul.listy-text').click(function() {
    $('#text-value').focus();
  });
});

function RemoveItem(id) {
  $('#' + id).remove();
}