$(function() {
  // Masonry Grid
  // $('#list_food_home').isotope({
  //   filter: '*',
  //   // itemSelector: '.grid-item',
  
  //   // +layoutMode: 'fitRows'
  // });

  $('.filter a').click(function(){
    $('.filter .current').removeClass('current');
    $(this).addClass('current');

    var selector = $(this).data('filter');
    console.log(selector);
    $('.row').isotope({
      filter: selector
    });
    return false;
  });

});