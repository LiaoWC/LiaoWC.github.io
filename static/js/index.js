$(function () {
    let if_img_sentence_being_visiting = false
    let avatar_img_sentence_target = $('#avatar_img_sentence')


    function img_when_hover_func() {
        $('#about_me_avatar_img').css('filter', 'drop-shadow(2px 4px 6px #195c82) opacity(0.3)')
        avatar_img_sentence_target.fadeIn(500)
    }

    function img_when_not_hover_func() {
        $('#about_me_avatar_img').css('filter', 'none')
        avatar_img_sentence_target.fadeOut(500)
    }

    function img_being_visiting() {
        // console.log('a start', if_img_sentence_being_visiting)
        if (if_img_sentence_being_visiting === false) {
            if_img_sentence_being_visiting = true
            img_when_hover_func()
        }
        // console.log('a end', if_img_sentence_being_visiting)
    }

    function img_not_being_visiting() {
        // console.log('b start', if_img_sentence_being_visiting)
        if (if_img_sentence_being_visiting === true) {
            if_img_sentence_being_visiting = false
            img_when_not_hover_func()
        }
        // console.log('b end', if_img_sentence_being_visiting)
    }


    // $('#avatar_img_link .mask').on('click',img_being_visiting())
    // avatar_img_sentence_target.hover(img_being_visiting(), img_not_being_visiting())
    // setTimeout(function () {
    let avatar_img_target = $('#about_me_avatar_img, #about_me_avatar_img *')
    function avatar_img_bind() {
        avatar_img_target.hover(function () {
                avatar_img_sentence_target.unbind('mouseenter').unbind('mouseleave')
                img_being_visiting()
            }, function () {
                img_not_being_visiting()
                avatar_sentence_bind()
            }
        )
    }

    function avatar_sentence_bind() {
        avatar_img_sentence_target.hover(function () {
            avatar_img_target.unbind('mouseenter').unbind('mouseleave')
            img_being_visiting()
        }, function () {
            img_not_being_visiting()
            avatar_img_bind()
        })
    }

    avatar_sentence_bind()
    avatar_img_bind()

    // }, 1000)

})

function homepage_jumbotron_clock_about_me(){
    $('#index_top_jumbotron').fadeOut(700)
}
