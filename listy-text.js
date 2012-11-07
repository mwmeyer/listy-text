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
  function RemoveItem() {
    var li = $(this).parent().parent();
    var remove = ',' + li.find('input').val();
    var ul = li.parent();
    li.remove();
    if( ul.find("div.item").length < 1 ){
      var tbox = ul.find("input[type!=hidden]") ;
      var orgph = tbox.attr('d-placeholder');
      if( orgph ){
        tbox.attr("placeholder",orgph);
      }
    }
    ul.trigger("change")
  }

  function make_listy(tbox){
    var orgph = tbox.attr('placeholder')
    if( orgph ){
      tbox.attr('placeholder','')
      tbox.attr('d-placeholder',  orgph );
    }
   
    var val = $.trim( tbox.val() );
    if( val ){
      // add item as box
      tbox.closest('li').before($('<li id="list-item-listy' + count + '"><div class="item">' 
                                + tbox.val() + ' <a href="javascript:void(0);">x</a></div><input type="hidden" class="individual-format" name="list-item-listy' 
                                + count + '" value="' + tbox.val() + '"></li>'));

    }

    tbox.val('');
    count++;
    
    return false;
  }

  $.fn.listyVal = function(){
    var me = $(this);
    var items = me.find("li > .individual-format");
    var results = [] ;
    for( var i = 0 ; i< items.length ; i++ ){
      results.push( $( items[i] ).val() );
    }
    return results ;
  }
  $.fn.listy = function( ){
    var me = $(this);
    me.find( ".text-value" ).change(function(){
      me.trigger("change");
      return make_listy( $(this) );
    });
    me.find( ".text-value" ).keydown(function(e) {
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
          var item = $(this).closest('ul').find('li:nth-last-child(2)').children('.item');
          if ( item.hasClass('del-highlight') ){
            RemoveItem.call( item.find("a") );
          }
          else {  // add highlight
            item.addClass('del-highlight');
          }
        }
      }
      
    });
    
    //  clicking anywhere on the pseudo-textbox focuses on text input and adds an outline
    me.click(function() {
      $('input.text-value', this).focus();
      $(this).addClass('listy-outline');
    });

    me.delegate("a","click",RemoveItem);
    me.focusout(function() {
      if ($(this).hasClass('listy-outline')) {
        $(this).removeClass('listy-outline');
      }
    });
  }
}(jQuery));
