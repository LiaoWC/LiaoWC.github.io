function loadHTML(layoutDirectoryRelativePath) {
    let request = new XMLHttpRequest();
    layoutDirectoryRelativePath += '/nav.html'
    // alert(layoutDirectoryRelativePath)
    request.open('GET', layoutDirectoryRelativePath, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // alert(request.responseText)
            document.querySelector('#layout-nav').innerHTML = request.responseText;
        }
    };
    request.send()
}


// $(document).ready(function () {
//     if (document.location.href.indexOf("layout") < 0) {
//         $("#loaded-layout").load("index.html #layout", function () {
//
//             }
//         );
//     }
// });



//
// document.addEventListener("DOMContentLoaded", function() {
// });