var count = 1;
$(document).ready(function() {

  $(".text-value").change(function() { 
    var tbox = $(this);
    return make_listy(tbox);
  });
  
  $(".text-value").keydown(function(e) {
    
    var tbox = $(this);

    // remove deletion highlight 
    if (e.keyCode != 8 && $('ul li:nth-last-child(2)').children('.item').hasClass('del-highlight')) {
      $('ul li:nth-last-child(2)').children('.item').removeClass('del-highlight');
    }

    if (e.keyCode == 188) {  // if comma

      return make_listy(tbox);

    }
    else if (e.keyCode == 8)  {  // if backspace
      if (tbox.val().length < 1) {  // if its been highligheted, delete the item
        if ($(this).closest('ul').find('li:nth-last-child(2)').children('.item').hasClass('del-highlight')){
          var remove = ',' + $(this).closest('ul').find('li:nth-last-child(2)').children('.individual-format').val();
          var new_csv_data = $(this).next('input[name="csv-format"]').val().replace(new RegExp(remove, 'g'),'');
          $(this).next('input[name="csv-format"]').val(new_csv_data);
          $(this).closest('ul').find('li:nth-last-child(2)').remove();
        }
        else {  // add highlight
          $(this).closest('ul').find('li:nth-last-child(2)').children('.item').addClass('del-highlight');
        }
      }
    }
    
  });
  
  //  clicking anywhere on the pseudo-textbox focuses on text input and adds an outline
  $('.listy-text').click(function() {
    $('input.text-value', this).focus();
    $(this).addClass('listy-outline');
  });

  $('.listy-text').focusout(function() {
    if ($(this).hasClass('listy-outline')) {
      $(this).removeClass('listy-outline');
    }
  });
});

function RemoveItem(id) {
    var remove = ',' + $('#' + id).find('input[name='+id+']').val();
    var new_csv_data = $('#' + id).parent().find('input[name="csv-format"]').val().replace(new RegExp(remove, 'g'),'');
    $('#' + id).parent().find('input[name="csv-format"]').val(new_csv_data);
    $('#' + id).remove();
}

function make_listy(tbox){
      tbox.attr('placeholder', '');

      // add item as box
      tbox.closest('li').before($('<li id="list-item' + count + '"><div class="item">' 
                                  + tbox.val() + ' <a href="javascript:RemoveItem(\'list-item' 
                                  + count 
                                  + '\');">x</a></div><input type="hidden" class="individual-format" name="list-item' 
                                  + count + '" value="' + tbox.val() + '"></li>'));

      // store data in a hidden input
      var csv_data = tbox.next('input[name="csv-format"]').val() + ','+ tbox.val();
      tbox.next('input[name="csv-format"]').val(csv_data)

      tbox.val('');
      count++;
      
      return false;
}