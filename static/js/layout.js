// Click to top button
let click_to_top_btn = $('#click_to_top_btn')
window.onscroll = () => {
    // Only display when dist to top is far enough
    let at_least_dist = 30
    if (document.body.scrollTop > at_least_dist || document.documentElement.scrollTop > at_least_dist) {
        click_to_top_btn.show()
    } else {
        click_to_top_btn.hide()
    }
}

click_to_top_btn.click(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

//　Loader
$(window).on('load', () => {
    $('#loader').fadeOut(500);
});

// Scroll fade in
// Scroll function courtesy of Scott Dowding; http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling

$(document).ready(function() {
  // Check if element is scrolled into view
  function isScrolledIntoView(elem) {
    let docViewTop = $(window).scrollTop();
    let docViewBottom = docViewTop + $(window).height();

    let elemTop = $(elem).offset().top;
    let elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
  // If element is scrolled into view, fade it in
  $(window).scroll(function() {
    $('.scroll-fadeInUp').each(function() {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass('animate__animated animate__fadeInUp');
      }
    });
  });
});


//////// Force to top after refreshing //////////
$(window).on('beforeunload', function() {
  $('body').hide();
  $(window).scrollTop(0);
});