/* Detect if cur block num is zero */
// let cur_page_num = 0
//
// $('#cur-block-num').change(function () {
//     alert("hola")
// })
//
// setTimeout(function () {
//     alert("aaa")
//     let target = $('#cur-block-num')
//     target.attr('title', 'Totally 1 block(s)')
//     target.text('Totally 1 block(s)')
// }, 3000)

let cur_max_block_id = 0
let cur_max_card_id = 0

let cur_modifying_blockIDStr = ''

let cur_modifying_cardIDStr = ''

let cur_addingCard_BlockIDStr = ''


function newBlockHTML(newBlockNameStr) {
    cur_max_block_id++
    let newBlockID = 'block-' + String(cur_max_block_id)
    return '            <!-- Block Start-->\n' +
        '            <div class="deepthinking-block" id="' + newBlockID + '">\n' +
        '\n' +
        '                <h3 class="text-center">Untitled</h3>\n' +
        '                <div class="text-center block-edit">\n' +
        '                    <a href="#" onclick="addCardInBlock(\'' + newBlockID + '\')" data-toggle="modal" data-target="#addCardModal">Add</a>\n' +
        '                    <a href="#" onclick="editBlock(\'' + newBlockID + '\')" data-toggle="modal" data-target="#editBlockNameModal">Edit</a>\n' +
        '                    <a href="#" onclick="removeBlock(\'' + newBlockID + '\')">&#10005;</a>\n' +
        '                </div>\n' +
        '\n' +
        '                <div class="col-1 deepthinking-area">\n' +
        '\n' +
        '                    <!-- Card Area Start -->\n' +
        '                    <!-- Card Area End -->\n' +
        '\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <!-- Block End -->'

}

function newCardHTML(newCardContentStr) {
    cur_max_card_id++
    let newCardID = 'card-' + String(cur_max_card_id)
    return '                    <!-- Card Start -->\n' +
        '                    <div id="' + newCardID + '" class="card" style="width: 15rem;" draggable="true">\n' +
        '                        <div class="card-body">\n' +
        '                            <p class="card-text">\n' +
        '                                \n' + newCardContentStr +
        '                            </p>\n' +
        '                            <a href="#" class="card-link" onclick="editCard(\'' + newCardID + '\')" data-toggle="modal"\n' +
        '                               data-target="#editCardNameModal">&#9997;</a>\n' +
        '                            <a href="#" class="card-link" onclick="removeCard(\'' + newCardID + '\')">&#128465;</a>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <!-- Card End -->'
}

/* Start */
let cards = document.querySelectorAll('.card');
let blocks = document.querySelectorAll('.deepthinking-block');
renewDragDrop()

/* Add a block */

$(document).ready(function () {
    $('#nav-add-block').click(function () {
        $('#blocks-row').append(newBlockHTML())
        renewDragDrop()
    })
})


///////////////////////////////////////

// reference: https://github.com/TylerPottsDev/drag-n-drop/blob/master/main.js

let draggedCard = null;

function dragdrop_addListener() {

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        card.addEventListener('dragstart', function () {
            draggedCard = card;
            setTimeout(function () {
                card.style.display = 'none';
            }, 0)
        });

        card.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedCard.style.display = 'block';
                draggedCard = null;
            }, 0);
        })

        for (let j = 0; j < blocks.length; j++) {
            const block = blocks[j];

            block.addEventListener('dragover', function (e) {
                e.preventDefault();
            });

            block.addEventListener('dragenter', function (e) {
                e.preventDefault();
                this.style.backgroundColor = 'black';
            });

            block.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgba(0,0,0,0.14)';
            });

            block.addEventListener('drop', function (e) {
                // console.log('drop');
                this.append(draggedCard);
                this.style.backgroundColor = 'rgba(0,0,0,0.14)';
            });
        }
    }
}

function dragdrop_removeListener() {
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        card.removeEventListener('dragstart', function () {
            draggedCard = card;
            setTimeout(function () {
                card.style.display = 'none';
            }, 0)
        });

        card.removeEventListener('dragend', function () {
            setTimeout(function () {
                draggedCard.style.display = 'block';
                draggedCard = null;
            }, 0);
        })

        for (let j = 0; j < blocks.length; j++) {
            const block = blocks[j];

            block.removeEventListener('dragover', function (e) {
                e.preventDefault();
            });

            block.removeEventListener('dragenter', function (e) {
                e.preventDefault();
                this.style.backgroundColor = 'grey';
            });

            block.removeEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgba(0,0,0,0.14)';
            });

            block.removeEventListener('drop', function (e) {
                console.log('drop');
                this.append(draggedCard);
                this.style.backgroundColor = 'rgba(0,0,0,0.14)';
            });
        }
    }
}

function renewDragDrop() {
    cards = document.querySelectorAll('.card');
    blocks = document.querySelectorAll('.deepthinking-block');
    dragdrop_removeListener()
    dragdrop_addListener()
}


/////////////////////////////

/* */

function removeBlock(blockIDStr) {
    if (confirm('Are your sure to delete this block?')) {
        $('#' + blockIDStr).remove()
    }
}

function editBlock(blockIDStr) {
    cur_modifying_blockIDStr = blockIDStr
}

$('#editBlockNameModalSaveChangeBtn').click(function () {
    let targetSelector = '#' + cur_modifying_blockIDStr + ' h3'
    $(targetSelector).text($('#editBlockNameModalInput').val())
})

function removeCard(blockIDStr) {
    if (confirm('Are your sure to delete this card?')) {
        $('#' + blockIDStr).remove()
    }
}

function editCard(blockIDStr) {
    cur_modifying_cardIDStr = blockIDStr
}

$('#editCardNameModalSaveChangeBtn').click(function () {
    let targetSelector = '#' + cur_modifying_cardIDStr + ' .card-text'
    $(targetSelector).text($('#editCardNameModalInput').val())
})

function addCardInBlock(blockIDStr) {
    console.log(cur_addingCard_BlockIDStr,blockIDStr)
    cur_addingCard_BlockIDStr = blockIDStr
    console.log(cur_addingCard_BlockIDStr)
}

$('#addCardModalCreateBtn').click(function () {
    let targetBlockSelector = '#' + cur_addingCard_BlockIDStr + ' .deepthinking-area'
    let newCardContent = $('#addCardModalInput').val()
    $(targetBlockSelector).append(newCardHTML(newCardContent))

   renewDragDrop()
})


///////////////////////////////////////////
