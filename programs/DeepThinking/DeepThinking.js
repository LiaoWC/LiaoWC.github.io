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
let project_name = 'DeepThinking'

let cur_max_block_id = 0
let cur_max_card_id = 0

let cur_modifying_blockIDStr = ''

let cur_modifying_cardIDStr = ''

let cur_addingCard_BlockIDStr = ''

function newBlockHTMlFront(newBlockNameStr) {
    cur_max_block_id++
    let newBlockID = 'block-' + String(cur_max_block_id)
    return '            <!-- Block Start-->\n' +
        '            <div class="deepthinking-block" id="' + newBlockID + '">\n' +
        '\n' +
        '                <h3 class="text-center">' + newBlockNameStr + '</h3>\n' +
        '                <div class="text-center block-edit">\n' +
        '                    <a href="#" onclick="addCardInBlock(\'' + newBlockID + '\')" data-toggle="modal" data-target="#addCardModal">Add</a>\n' +
        '                    <a href="#" onclick="editBlock(\'' + newBlockID + '\')" data-toggle="modal" data-target="#editBlockNameModal">Edit</a>\n' +
        '                    <a href="#" onclick="removeBlock(\'' + newBlockID + '\')">&#10005;</a>\n' +
        '                </div>\n' +
        '\n' +
        '                <div class="col-1 deepthinking-area">\n' +
        '\n' +
        '                    <!-- Card Area Start -->\n'
}

function newBlockHTMLBack() {
    return '                    <!-- Card Area End -->\n' +
        '\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <!-- Block End -->'
}

function newBlockHTML(newBlockNameStr) {
    return newBlockHTMlFront(newBlockNameStr) + newBlockHTMLBack()

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
    function addNewBlock() {
        $('#blocks-row').append(newBlockHTML('Untitled'))
        renewDragDrop()
    }

    $('#nav-add-block').click(function () {
        addNewBlock()
    })
    // use ctrl+space to add a new block
    let holdOn = false
    let delay = 100 // unit: micro delay
    $('*').keydown(function (e) {
        if (e.ctrlKey && e.keyCode === 32 && holdOn === false) {
            holdOn = true
            addNewBlock()
            setTimeout(function () {
                holdOn = false
            }, delay)

        }
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

            block.removeEventListener('dragleave', function () {
                this.style.backgroundColor = 'rgba(0,0,0,0.14)';
            });

            block.removeEventListener('drop', function () {
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
    cur_addingCard_BlockIDStr = blockIDStr
}

function finish_addCard() {
    let targetBlockSelector = '#' + cur_addingCard_BlockIDStr + ' .deepthinking-area'
    let textTarget = $('#addCardModalInput')
    let newCardContent = textTarget.val()
    textTarget.val('')
    if (newCardContent !== '') {
        $(targetBlockSelector).append(newCardHTML(newCardContent))
    }
    renewDragDrop()
}

$('#addCardModalCreateBtn').click(function () {
    finish_addCard()
})

// use ctrl+enter to add a new card when typing the content in the modal
$('#addCardModal .modal-dialog .modal-content .modal-body textarea').keydown(function (e) {
    if (e.ctrlKey && e.keyCode === 13) {
        finish_addCard()
    }
})
///////////////////////////////////////////
/* Export blocks to backup the block file*/

// reference: https://www.itread01.com/content/1544292747.html

function makeExportText() {
    ///////// rule /////////
    // Both the first line and the second line and the third line have a number.
    // The first line's is called "Block-divider".
    // The second line's is called "Card-divider"
    // The third line's is called "Block-title-divider"
    // Each block is sandwiched by two Block-divider.
    // Each card is sandwiched by two Card-divider.
    // Each of Block-divider or Card-divider or Block-title-divider takes one line.
    // Line is split by '\n'.
    // In every pair of Block-divider, the line next to the first Block-divider in this pair of Block-divider,\
    //   is the title of the block.
    //
    // For example--one block:
    //
    // Block-divider
    // Block-title-divider
    // {Title of this block}
    // Block-title-divider
    // Card-divider
    // {Card Content}
    // Card-divider
    // Card-divider
    // {Card Content}
    // Card-divider
    // ......
    // Block-divider
    //
    //////////////////////////

    let blocks = findAllBlockCardContent()

    /* Use the information we found to make text of file */

    let blockDivider = String(Math.floor(Math.random() * 10000000) + 1);
    let blockTitleDivider = String(Math.floor(Math.random() * 10000000) + 1);
    let cardDivider = String(Math.floor(Math.random() * 10000000) + 1);

    let exportText = blockDivider + '\n' + blockTitleDivider + '\n' + cardDivider + '\n'
    for (let i = 0; i < blocks.length; i++) {
        exportText += blockDivider + '\n'
        exportText += blockTitleDivider + '\n' + blocks[i][0] + '\n' + blockTitleDivider + '\n'
        for (let j = 1; j < blocks[i].length; j++) {
            exportText += cardDivider + '\n' + blocks[i][j] + '\n' + cardDivider + '\n'
        }
        exportText += blockDivider + '\n'
    }

    return exportText
}

function exportTextFile(filename) {
    let element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(makeExportText($('#blocks-row').html())))
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

$(function () {
    $('#nav-exportBlocksText').click(function () {
        /* Use time as the file name */
        let t = new Date()
        let fileName = project_name + '-' + t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + '-' + t.getHours() + "_" + t.getMinutes() + "_" + t.getSeconds()
        exportTextFile(fileName)
    })
})

///////////////////////////////////////////
/* Import a blocks-text-file */

function decodeAndImportBlocksText(fileText) {
    let ifFileTextWrong = false
    // split and get the keywords
    let lineArray = fileText.split('\n')
    let blockDivider = lineArray[0]
    let blockTitleDivider = lineArray[1]
    let cardDivider = lineArray[2]
    //
    let isBlockDividerPaired = true
    let isBlockTitleDividerPaired = true
    let isCardDividerPaired = true
    let resText = '' // result text
    console.log(lineArray)
    console.log('Yo:', blockDivider, blockTitleDivider, cardDivider)
    for (let i = 3; i < lineArray.length - 1; i++) {
        console.log(lineArray[i], typeof lineArray[i])
        if (lineArray[i] === blockDivider) {
            console.log('isBlockDivider:', isBlockDividerPaired, isBlockTitleDividerPaired, isCardDividerPaired)
            // check whether other dividers are not completed before meeting a new block-divider
            if (!(isBlockTitleDividerPaired && isCardDividerPaired)) {
                console.log('1')
                ifFileTextWrong = true
                break
            } else {
                if (isBlockDividerPaired) {
                    console.log('2')
                    // new block
                    isBlockDividerPaired = false
                } else {
                    console.log('3')
                    // end block
                    isBlockDividerPaired = true
                    resText += newBlockHTMLBack()
                }
            }
        } else if (lineArray[i] === blockTitleDivider) {
            // check whether card dividers are not completed and block dividers are completed before meeting a new block-title-divider
            if (!(!isBlockDividerPaired && isCardDividerPaired)) {
                console.log('4')
                ifFileTextWrong = true
                break
            } else {
                if (isBlockTitleDividerPaired) {
                    console.log('5')
                    // new block title
                    isBlockTitleDividerPaired = false
                } else {
                    console.log('6')
                    // end block title
                    isBlockTitleDividerPaired = true
                }
            }
        } else if (lineArray[i] === cardDivider) {
            // check whether block title dividers are not completed and block dividers are completed before meeting a new block-title-divider
            if (!(!isBlockDividerPaired && isBlockTitleDividerPaired)) {
                console.log('7')
                ifFileTextWrong = true
                break
            } else {
                if (isCardDividerPaired) {
                    console.log('8')
                    // new card
                    isCardDividerPaired = false
                } else {
                    console.log('9')
                    // end card
                    isCardDividerPaired = true
                }
            }
        } else {
            /* not a keyword */

            // block divider is completed and this is not a keyword ==> wrong
            if (isBlockDividerPaired) {
                console.log('10')
                ifFileTextWrong = true
                break
            }

            if (isBlockTitleDividerPaired) {
                // It should be a card content.
                if (!isCardDividerPaired) {
                    console.log('11')
                    // There's a card divider not completed.
                    resText += newCardHTML(lineArray[i])
                } else {
                    console.log('12')
                    ifFileTextWrong = true
                    break
                }
            } else {
                // It should be a block title.
                if (!isCardDividerPaired) {
                    console.log('13')
                    ifFileTextWrong = true
                    break
                } else {
                    console.log('14')
                    // Card dividers are completed and block title dividers are not completed.
                    resText += newBlockHTMlFront(lineArray[i])
                }
            }
        }
    }
    if (ifFileTextWrong) {
        console.log("The text file is wrong.")
        console.log("cur restext:", resText)
        resText = "The text file is wrong."
    }

    $('#blocks-row').append(resText)
    renewDragDrop()
}


// reference: https://stackoverflow.com/questions/19038919/is-it-possible-to-upload-a-text-file-to-input-in-html-js

$('#importModalConfirm').click(function () {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.')
        return
    }
    let input = $('#importBlocksFormControlFile')[0]
    if (!input.files) {
        alert("This browser doesn't support the `files` property of file inputs.")
    } else if (!input.files[0]) {
        alert("Please select a file before clicking confirm.");
    } else {
        let file = input.files[0]
        let fileReader = new FileReader()
        fileReader.onload = function () {
            console.log(typeof fileReader.result)
            decodeAndImportBlocksText(fileReader.result)
        }
        fileReader.readAsText(file)
    }
})


/////////////////////////////////

/* clear all blocks */

$('#nav-clearAllBLocks').click(function () {
    let blockArea = $('#blocks-row')
    if (blockArea.text() === '') {
        // There's no block now.
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There is no blocks to delete.',
        })
    } else {
        if (confirm('Are you sure to clear <b>all</b> blocks?')) {
            $('#blocks-row').html('')
            renewDragDrop()
        }
    }

})

//////////////////////////////////

/* the btn of recording in deep mode */
let deepModeRightHandSideColRecordBtnTarget = $('.deepModeRightHandSideColRecordBtn')

deepModeRightHandSideColRecordBtnTarget.mouseover(function () {
    $(this).addClass('btn, btn-primary deepModeRightHandSideColRecordBtnHover')
    $(this).css('border-radius', '10em')
})

deepModeRightHandSideColRecordBtnTarget.mouseleave(function () {
    $(this).removeClass('btn, btn-primary deepModeRightHandSideColRecordBtnHover')
})

//////////////////////////////////

/* Get all the information of blocks and cards. */

function findAllBlockCardContent() {
    /* Find out all the blocks and cards */

    let blocks = []

    $('#blocks-row').find('div.deepthinking-block').each(function () {

        let blockTitle = $(this).find('h3').text().trim()

        /* find cards */
        let cards = []
        cards.push(blockTitle)
        $(this).find('.card p').each(function () {
            cards.push($(this).text().trim())
        })

        // First one in cards array is the title of this block.
        blocks.push(cards)
    })

    return blocks
}

////////////////////////////////////////////

function findAllCards() {
    let AllCards = []

    let allBlockAndCard = findAllBlockCardContent()

    for (let i = 0; i < allBlockAndCard.length; i++) {
        let blockName = allBlockAndCard[i][0]
        for (let j = 1; j < allBlockAndCard[i].length; j++) {
            let card = []
            card.push(allBlockAndCard[i][j])
            card.push(blockName)
            AllCards.push(card)
        }
    }

    return AllCards
}

////////////////////////////////////////////

/* Deep Mode -- Cards */

let cardNum = 0
let allCards = []

function findAllCardsWhenEnteringDeepMode() {
    allCards = findAllCards()
    cardNum = allCards.length
}




























