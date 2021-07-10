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