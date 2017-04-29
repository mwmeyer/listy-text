/*!
 * jQuery Listy-Text Plugin 
 * http://mwmnj.github.com/listy-text/
 * License: http://mwmeyer.mit-license.org
 */
(($ => {

  var themes = ['facebooky', 'bootstrappy'];
  var count = 1 ;

  function RemoveItem() {
    var li = $(this).parent().parent();
    var ul = li.parent();
    li.remove();
    if( ul.find("div.item").length < 1 ){
      var tbox = ul.find("input[type!=hidden]") ;
    }
    ul.trigger("change")
  }

  function make_listy(tbox){
   
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
    var items = $(this).parent().parent().find(".item");
    var results = [] ;
    items.each(function() { results.push($(this).attr('value')); });
    return results;
  }
  $.fn.listy = function( ){
    this.each(function( i , input  ){
      $input = $(input);
      var classList = $input.attr('class').replace(/listy-text/g,"").split(/\s+/);  // get all classes on input, ignore listy-text
      $input.wrap('<li class="listy-text-li" />');
      $input.parent().wrap('<ul class="listy-text-ul" />');

      //pre populate the listy input
      if($input.val().length > 0){
        var default_vals = $input.val().split(',');
        var dlength = default_vals.length;
        for (var i = 0; i < dlength; i++) {
          $input.val(default_vals[i].trim());
          make_listy( $(this) );
        }
      }

      for (var i = 0; i < classList.length; i++) {
          if (themes.indexOf(classList[i]) > -1) {
            $input.removeClass(classList[i]);
            $input.parent().parent().addClass(classList[i]);
          }
      }

      $input.change(function(){
        $input.parent().parent().trigger("change");
        return make_listy( $(this) );
      });
      $input.keydown(function(e) {
        var tbox = $(this);
        // remove deletion highlight 
        if (e.keyCode != 8 && $('li:nth-last-child(2)' , $input.parent().parent() ).children('.item').hasClass('del-highlight')) {
          $('li:nth-last-child(2)' , $input.parent().parent() ).children('.item').removeClass('del-highlight');
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
      $input.parent().parent().click(function() {
        $('input.listy-text', this).focus();
        $(this).addClass('listy-outline');
      });

      $input.parent().parent().delegate("a","click",RemoveItem);
      $input.parent().parent().focusout(function() {
        if ($(this).hasClass('listy-outline')) {
          $(this).removeClass('listy-outline');
        }
      });
    });

    return this;
  }
})(jQuery));
