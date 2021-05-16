// //////// Center cards when max width < 576 px
//
// let mql_projects_cards_query = '(min-width: 577px)'
// let mql_projects_cards = window.matchMedia(mql_projects_cards_query);
// let target_cards_container = $('#projects_page_container .card-columns')
//
// mql_projects_cards.addEventListener("change", (e) => {
//     if (e.matches) {
//         /* > 576 pixels wide */
//         target_cards_container.removeClass('row').removeClass('justify-content-center')
//
//     } else {
//         /* <= 576 pixels */
//         target_cards_container.addClass('row').addClass('justify-content-center')
//     }
// })
//
// if(!window.matchMedia(mql_projects_cards_query).matches){
//     target_cards_container.addClass('row').addClass('justify-content-center')
// }
// ///////////////////////////////////////////////////////////////////////////////