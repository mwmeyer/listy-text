/*!
 * jQuery listy-test plugin 
 * http://mwmnj.github.com/listy-text/
 *
 * Copyright 2011,Matt Meyer
 * Dual licensed under the MIT licenses.
 * Date Wed Nov 07 10:25:29 2012 
 */
(function(){
  var count = 1 ;
  function RemoveItem(id) {
    var remove = ',' + $('#' + id).find('input[name='+id+']').val();
    var new_csv_data = $('#' + id).parent().find('input[name="csv-format"]').val().replace(new RegExp(remove, 'g'),'');
    $('#' + id).parent().find('input[name="csv-format"]').val(new_csv_data);
    $('#' + id).remove();
  }

  function make_listy(tbox){
    tbox.attr('placeholder', '');

    // add item as box
    console.log( tbox )
    tbox.closest('li').before($('<li id="list-item-listy' + count + '"><div class="item">' 
                                + tbox.val() + ' <a href="javascript:RemoveItem(\'list-item-listy' 
                                + count 
                                + '\');">x</a></div><input type="hidden" class="individual-format" name="list-item-listy' 
                                + count + '" value="' + tbox.val() + '"></li>'));

    // store data in a hidden input
    var csv_data = tbox.next('input[name="csv-format"]').val() + ','+ tbox.val();
    tbox.next('input[name="csv-format"]').val(csv_data)

    tbox.val('');
    count++;
    
    return false;
  }
  $.fn.listy = function( valEl ){
    var me = $(this);
    me.find( valEl ).change(function(){
      return make_listy( $(this) );
    });
    // on unix or linux system , not-english IME will not been detected unless bind "input" or "propertychange" event but not "keydown"
    me.find( valEl )[ $.browser ? "propertychange" : "input"](function(e) {
      var tbox = $(this);
      // remove deletion highlight 
      if (e.keyCode != 8 && $('li:nth-last-child(2)' , me ).children('.item').hasClass('del-highlight')) {
        $('li:nth-last-child(2)' , me ).children('.item').removeClass('del-highlight');
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
    me.click(function() {
      $('input.text-value', this).focus();
      $(this).addClass('listy-outline');
    });
   
    me.focusout(function() {
      if ($(this).hasClass('listy-outline')) {
        $(this).removeClass('listy-outline');
      }
    });
  }
}(jQuery));
