$(function () {
    $('#hello-alert').hide()
    let canAddHello = true
    $('#hello-tab').click(function () {
        if (canAddHello) {
            canAddHello = false
            let helloHTML =
                '    <div class="container-fluid" id="hello-alert-container">\n' +
                '        <div class="alert alert-primary text-center hide" role="alert">\n' +
                '            Hello!\n' +
                '        </div>\n' +
                '    </div>'
            $('#hello-alert').append(helloHTML)
            $('#hello-alert').fadeIn(100)
            setTimeout(function () {
                $('#hello-alert').fadeOut(400)
                $('#hello-alert').html('')
                setTimeout(function () {
                    canAddHello = true
                }, 400)

            }, 2000)
        }

    })
})