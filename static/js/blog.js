// function blog_left_nav_media_query(x) {
//     if (x.matches) { // If media query matches
//         document.body.style.backgroundColor = "yellow";
//         console.log("kkk")
//     } else {
//         document.body.style.backgroundColor = "pink";
//                 console.log("sss")
//
//     }
// }
//
// let blog_left_nav_media = window.matchMedia("(min-width: 768px)")
// blog_left_nav_media_query(blog_left_nav_media) // Call listener function at run time
// x.addEventListener('change', function () {
//     blog_left_nav_media_query
// })

///////////////////////////////////////////////////////////////////////////////

//////// Hide the blog left nav into the header nav if max width < 768 px

let mql_blog_left_nav_query = '(min-width: 768px)'
let mql_blog_left_nav = window.matchMedia(mql_blog_left_nav_query);
let target_blog_left_nav = $('#blog_left_nav')
let target_blog_left_nav_hidden_place = $('#hidden_blog_nav')
let blog_left_nav_html_content = target_blog_left_nav.html()

mql_blog_left_nav.addEventListener("change", (e) => {
    if (e.matches) {
        /* > 768 pixels wide */
        target_blog_left_nav_hidden_place.html('').css('display', 'none')
        target_blog_left_nav.html(blog_left_nav_html_content).css('display', 'block')
        $('#blog_center_area').removeClass('my-4').addClass('my-4')
        $('#blog_center_area').removeClass('mx-4').addClass('mx-4')
    } else {
        /* <= 768 pixels */
        target_blog_left_nav_hidden_place.html(blog_left_nav_html_content).css('display', 'block')
        target_blog_left_nav.html('').css('display', 'none')
        $('#blog_center_area').removeClass('my-4')
        $('#blog_center_area').removeClass('mx-4')
    }
})

if (window.matchMedia(mql_blog_left_nav_query).matches ){
    // modify dom
    $('#blog_center_area').removeClass('my-4').addClass('my-4')
    $('#blog_center_area').removeClass('mx-4').addClass('mx-4')
    //
}



//
if (!window.matchMedia(mql_blog_left_nav_query).matches) {
    target_blog_left_nav.css('display', 'none')
    target_blog_left_nav_hidden_place.html(blog_left_nav_html_content).css('display', 'block')
}

///////////////////////////////////////////////////////////////////////////////