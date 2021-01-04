//////////////////// Constant ///////////////////////////////////
function make_single_board(html_string) {
    return `
        <style>
            .single_board{
                background-color: #F1F1F1;
            }
        </style>        
        <div>
            <table class="single_board">
                <tbody>
                <tr>
                    <td class="align-middle text-center">
                    ${html_string}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>`
}

let START_BOARD = `
        <h1>Welcome!</h1>
        <hr style="width: 30%; margin: 0 auto;">
        <a>Click to start</a>`

let CHAT_START = `
        <div class="talk_con">
            <div class="talk_show" id="words">
                <div class="atalk"><span>親愛的，<br/>我最近看到一個困難的題目，不知道該從何思考<br/>你能幫幫我嗎？🙏🙏</span></div>            
            </div>
            <div class="talk_input text-center">
                <input type="button" value="Next" id="talksub">
            </div>
        </div>`

let content_modals = [
    ['what_is_personal_identity', `<i>是哪些因素讓我們說現在的你，跟過去一個在很多性質上跟你很相似，但又有很多性質不相似的那一個人，是同一個人？透過哪些標準？</i>`],

]


///////////////////// Functions /////////////////////////////////
function renew_board(html_string) {
    $('#game_box_inner').html(html_string)
}

function make_modal(name, content) {
    return `
    <div class="modal fade modal_fullscreen" id="${name}_id" tabindex="-1" aria-labelledby="${name}_modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    ${content}
                </div>
                <!--div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                </div-->
            </div>
        </div>
    </div>`
}


//////////////////////////////////////////////////

/* Main task */
function chat() {
    let end = false

    let Words = document.getElementById("words");

    //
    renew_board(CHAT_START)

    //
    function add_new_message(html_string) {
        let target = $('#words')
        let old_message = target.html()
        target.html(old_message + html_string)
    }

    function make_center_message(html_string) {
        return `<div class="text-center"><span class="text-center">${html_string}</span></div>`
    }

    function make_a_message(html_string) {
        return `<div class="atalk"><span>${html_string}</span></div>`
    }

    function make_b_message(html_string) {
        return `<div class="btalk"><span>${html_string}</span></div>`
    }

    function make_mind_message(html_string) {
        return `<div class="mind_talk"><span>${html_string}</span></div>`
    }

    function make_pedestrian_message(html_string) {
        return `<div class="pedestrian_talk"><span>${html_string}</span></div>`
    }

    function make_pedestrian2_message(html_string) {
        return `<div class="pedestrian2_talk"><span>${html_string}</span></div>`
    }

    function make_phase_message(html_string) {
        return make_center_message('---------------------------------------------------------------') +
            make_center_message(html_string) +
            make_center_message('---------------------------------------------------------------')
    }

    function game_over() {
        end = true
        $('#talksub').attr('value', 'Game Over')
        $('#talksub').css('cursor', 'not-allowed')
    }

    //
    function add_message(a_or_b, message) {
        let str = ""

        if (a_or_b === 'q') {
            if (message === '1') {
                let myModal = new bootstrap.Modal(document.getElementById('modal_1'), {
                    backdrop: 'static',
                    keyboard: false
                })
                myModal.toggle()
                $('#modal_1_refuse').click(() => {
                    add_new_message(make_a_message('🤬'))
                    add_new_message(make_center_message('你的帳號已被對方封鎖'))
                    game_over()
                })
            } else if (message === '2') {
                let myModal = new bootstrap.Modal(document.getElementById('modal_2'), {
                    backdrop: 'static',
                    keyboard: false
                })
                myModal.toggle()

            }
        } else if (a_or_b === 'a') {
            str = make_a_message(message)
            add_new_message(str)
        } else if (a_or_b === 'b') {
            str = make_b_message(message)
            add_new_message(str)
        } else if (a_or_b === 'narrator') {
            str = make_center_message(message)
            add_new_message(str)
        } else if (a_or_b === 'phase') {
            str = make_phase_message(message)
            add_new_message(str)
        } else if (a_or_b === 'mind') {
            str = make_mind_message(message)
            add_new_message(str)
        } else if (a_or_b === 'pedestrian') {
            str = make_pedestrian_message(message)
            add_new_message(str)
        } else if (a_or_b === 'pedestrian2') {
            str = make_pedestrian2_message(message)
            add_new_message(str)
        } else if (a_or_b === 'end') {
            $('#talksub').attr('value', 'OK')
            str = make_center_message('<textarea cols="20" rows="6" placeholder="What you learn from this game?"></textarea>')
            add_new_message(str)
            $(document).on('click', '#talksub', () => {
                add_new_message(`
                    <div class="alert alert-primary text-center" role="alert">
                        Thank you! (End)
                    </div>          
                `)
                // $('#talksub').attr('value', 'End')
                // $('#talksub').css('cursor', 'not-allowed')
                $('#talksub').css('display', 'none')
                end = true
            })
        } else if (a_or_b === 'modal') {
            let center_message = ""
            if (message === 'what_is_personal_identity') {
                center_message = `得到道具 [  <button class="btn btn-secondary btn-sm ${message}_modal_toggle">📜什麼是人格等同之殘頁</button>  ]`
            }

            str = make_center_message(center_message)
            add_new_message(str)

            $(document).on('click', `.${message}_modal_toggle`, () => {
                let myModal = new bootstrap.Modal(document.getElementById(`${message}_id`))
                myModal.show()
            })
        }
    }

    let messages = [
        // ['a', `親愛的，<br/>我最近看到一個困難的題目，不知道該從何思考<br/>你能幫幫我嗎？🙏🙏`],
        ['b', `當然沒問題，這個世界沒有我解不了的問題💪`],
        ['a', `如果一個失智症患者在得失智症之前或剛知道自己得失智症時，就簽署表明自己在某些狀態下希望醫生對自己執行安樂死。如果當他已經進入這種狀態後，他卻不記得有過這個意願，甚至有反抗的表現，那麼醫生該繼續執行安樂死嗎？`],
        ['b', `額...原來是這種又倫理又哲學的問題啊...我可能要想一下`],
        ['narrator', `5 hours later...`],
        ['b', `親愛的，你有什麼線索或參考資料嗎...🙄`],
        ['a', `我目前查到的資料裡，評論大概可以分成兩派：<br/>1. 當事人可能希望在還可以控制自己的生命時，就對自己的生命有所掌控。所以即使後來當事人忘了，也要尊重當初的這個意願。<br/>2. 那個反悔的當事人，因為某些性質上的不同，所以他基本上已經不是前面那個人了。為什麼要受已經不是同一個自我的那個人的決定限制？`],
        ['b', `好有趣，對失智症患者來說，得失智症的前後算是同一個人嗎？<br/>我接觸過一位得失智症的長者，他總是在活在不一樣的年齡，<br/>他可能會說：「我現在才十八歲啊。」然後明天可能又回到正常......`],
        ['a', `的確，我也滿好奇失智症患者得病前後是不是同一個人？<br/>又或者說，怎樣才能判斷在時間軸上的兩個人是同一個人？`],
        ['a', `這個社會在進行獎勵或懲罰可能是因為這個人有做過什麼事情，<br/>那麼要怎麼確保做過什麼事情跟受到獎勵/懲罰的是同一個人呢？`],
        ['b', `好問題`],
        ['a', `親愛的，我待會有事要出門<br/>你可以幫我找尋更多的線索嗎？`],
        ['q', `1`],
        ['a', `Thx, 對了，關鍵字好像是"人格等同(Personal Identity)問題"<br/>等你好消息，先走了，掰`],
        ['narrator', `🧠任務總目標: 在親愛的回來前盡可能多認識這個議題`],
        ['phase', `內心時間`],
        ['mind', `先來查一下什麼是人格等同問題`],
        ['mind', `查到了這個`],
        ['mind', `<img src="img/1.png" alt="1.png" width="300px">`],
        ['modal', `what_is_personal_identity`],
        ['mind', `???`],
        ['mind', `我好像不太懂這裡「等同」是什麼意思？`],
        ['narrator', `📓接受任務: [ 集齊殘頁 0/7 ]`],
        ['narrator', `📓任務進度: [ 集齊殘頁 1/7 ]`],
        ['mind', `這系統是不是卡了？`],
        ['mind', `都拿到殘頁了任務才跑出來`],
        ['mind', `回到正題，要了解人格等他，應該要先知道等同是什麼意思`],
        ['pedestrian', `一般人聽到「等同關係」時，首先想到的應該會是「性質」的同一性，<br/>套個名詞來講就是：Qualitative identity。<br/>但是人格等同講的是「Numerical Identity」，他比Qualitative更嚴謹。<br/>舉例來說，每顆彈珠看起來一模一樣，從「性質」來看，好像是等同的；<br/>但是，你在數彈珠的時候會數：1、2、3......每個變化不同，這就是「數」的同一性。`],
        ['narrator', `系統消息：有位路人經過`],
        ['b', `什麼時候突然一個人冒出來？這都啥設定？<br/>還聽得到我的內心對話...`],
        ['b', `不過還是感謝你為我解答`],
        ['b', `知道了解人格等同這個問題的定義後<br/>我想問你，那人格等同的標準是啥？<br/>怎樣才能說這個你跟那個你是同一個你？`],
        ['pedestrian', `我知道你這個遊戲只能玩6分鐘，時間寶貴,<br/>我知道你待會要問什麼，我就直接幫你都解了`],
        ['b', `...喔...好<br/>(😑心想: 我的戲份都要被他搶光了)`],
        ['pedestrian', `那關於這個問題，你怎麼想的呢？<br/>這沒有正確答案，我只能提供給妳一些想法參考`],
        ['pedestrian', `這個問題有的人覺得可以化成像是心裡、身體等層面來看，<br/>也有人解釋成人格等同是由靈魂的等同所組構而成的。`],
        ['pedestrian', `如果從比較心理的層面來看，你覺得什麼東西會讓你覺得可以分辨是否為同一個人？`],
        ['q', `2`],
        ['b', `記憶`],
        ['pedestrian', `的確，很多人都這麼認為的，但是這種說法也有不少會被攻擊到點。<br/>舉幾個給你參考：`],
        ['pedestrian', `第一個例子是「失憶的罪犯」。<br/>如果一個犯罪的人因事故而失憶，<br/>那從記憶不連續性來看，失憶後的犯人是不是跟失憶前的他不是同一個人？<br/>那麼那些罪行是不是就不是現在的那個他犯的？`],
        ['b', `有點懂你在說什麼`],
        ['pedestrian', `第二個例子是「英勇軍官的悖論」。<br/>用x, y, z來表示這個軍官人生的三個不同的時間點：小時候、事業巔峰時期、老年。<br/>這個軍官在小時候幹了一些壞事，而長大後在軍隊表現卓越，<br/>他在青壯年時期還記得小時候的事，他和小時候的記憶是連續的，從記憶的標準的角度來看 x = y。<br/>而他在老年時忘了小時候的事情，但還記得年輕時的英勇事蹟，老年的他和青壯年的他記憶是連續的，所以y = z，但是x =/= z<br/>由等同的角度來看，應該是要有傳遞性的，但在這邊卻矛盾了......`],
        ['b', `好抽象，有沒有圖可以看？`],
        ['pedestrian', `<img src='img/2.png' alt='2.png' width="350px">`],
        ['b', `那我想問你，那麼身體上的延續能不能當標準？`],
        ['pedestrian', '如果你去做了手術，你覺得做完之後還會是同一個人嗎？'],
        ['b', `好問題！`],
        ['pedestrian', `這方面內容還有很多，礙於篇幅，今天就跟你分享到這<br/>有興趣的話我們之後可以再討論喔～`],
        ['narrator', `得到道具：<br/>人格等同問題殘頁、化約論殘頁、心理標準殘頁、<br/>生物標準殘頁、失憶的罪犯殘頁、英勇軍官悖論殘頁`],
        ['narrator', `📓任務進度: [ 集齊殘頁 2/7 ]`],
        ['narrator', `📓任務進度: [ 集齊殘頁 3/7 ]`],
        ['narrator', `📓任務進度: [ 集齊殘頁 4/7 ]`],
        ['narrator', `📓任務進度: [ 集齊殘頁 5/7 ]`],
        ['narrator', `📓任務進度: [ 集齊殘頁 6/7 ]`],
        ['narrator', `📓任務進度: [ 集齊殘頁 7/7 ]`],
        ['pedestrian2', `綠色路人，對於你說的那些，我覺得形上學的人格等同並不重要，<br/>我覺得我們應該談的是「延續性」，而非「等同」的關係。<br/>重要的是如何去回應那些倫理學的問題，而不是這些形上學的關係。`],
        ['b', `這位同學說的也滿有道理的。<br/>等下，怎麼又冒出一位......`],
        ['narrator', `綠綠路人和洋紅路人已離開房間`],
        ['narrator', `熟悉的聲音傳來...`],
        ['a', `親愛的好久不見<br/>關於這個議題你了解的如何？<br/>快跟我分享`],
        ['end', ``]
    ]

    let cur_new_message_idx = 0
    let talksub_valid = true

    // Add modals
    for (let item of content_modals) {
        let a = make_modal(item[0], item[1])
        add_new_message(a)
    }

    //
    $('#talksub').click(() => {
        if (talksub_valid === false) {

        } else if (end === true) {

        } else {
            talksub_valid = false
            add_message(messages[cur_new_message_idx][0], messages[cur_new_message_idx][1])
            cur_new_message_idx++
            talksub_valid = true
        }
    })

    // /* For testing */
    // document.addEventListener('wheel', function (e) {
    //     if (e.deltaY > 5) {
    //         document.getElementById('talksub').click()
    //     }
    // })


}

////////////////////////////////////////////////////////
/* Start */
$(document).ready(() => {
    //
    renew_board(make_single_board(START_BOARD))
    $('.single_board').click(() => {
        renew_board(make_single_board('你的男/女朋友發來了一則訊息...'))
        $('.single_board').click(() => {
            chat()
        })
    })
})

//////////////////////////////////////
