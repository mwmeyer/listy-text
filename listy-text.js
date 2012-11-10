/*!
 * jQuery listy-test plugin 
 * http://mwmnj.github.com/listy-text/
 *
 * Copyright 2011,Matt Meyer
 * Dual licensed under the MIT licenses.
 * Date Wed Nov 07 10:25:29 2012 
 */
(function(){

  themes = ['facebooky', 'bootstrappy'];
  var count = 1 ;

  function RemoveItem() {
    var li = $(this).parent().parent();
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
      tbox.closest('li').before($('<li id="list-item-listy' + count + '"><div value="'+tbox.val()+'" class="item">' 
                                + tbox.val() + ' <a href="javascript:void(0);">x</a></div></li>'));

    }

    tbox.val('');
    count++;
    
    return false;
  }

  $.fn.listyVal = function(){
    var items = $(".item");
    var results = [] ;
    items.each(function() { results.push($(this).attr('value')); });
    return results;
  }
  $.fn.listy = function( ){
    var me = $(this);
    var classList = me.attr('class').split(/\s+/);
    me.wrap('<li class="listy-text-li" />');
    me.parent().wrap('<ul class="listy-text-ul" />');

    for (var i = 0; i < classList.length; i++) {
        if (themes.indexOf(classList[i]) > -1) {
          me.removeClass(classList[i]);
          me.parent().parent().addClass(classList[i]);
        }
    }

    $( me ).change(function(){
      me.parent().parent().trigger("change");
      return make_listy( $(this) );
    });
    $( me ).keydown(function(e) {
      var tbox = $(this);
      // remove deletion highlight 
      if (e.keyCode != 8 && $('li:nth-last-child(2)' , me.parent().parent() ).children('.item').hasClass('del-highlight')) {
        $('li:nth-last-child(2)' , me.parent().parent() ).children('.item').removeClass('del-highlight');
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
    me.parent().parent().click(function() {
      $('input.listy-text', this).focus();
      $(this).addClass('listy-outline');
    });

    me.parent().parent().delegate("a","click",RemoveItem);
    me.parent().parent().focusout(function() {
      if ($(this).hasClass('listy-outline')) {
        $(this).removeClass('listy-outline');
      }
    });
  }
}(jQuery));
