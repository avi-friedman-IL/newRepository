'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const SUPER_FOOD = '&#10022;'
const EMPTY = ' '
const CHERRY = '&#10086;'

const gGame = {
    score: 0,
    isOn: false,
    food: 0,
}
var gBoard
var gAddCherry
function init() {
    const elRestart = document.querySelector('.restart')
    const elBoard = document.querySelector('.board-container')
    gAddCherry = setInterval(addCherry, 2000)

    gBoard = buildBoard()

    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard, '.board-container')

    gGame.score = 0
    updateScore(0)

    gGame.isOn = true

    elRestart.style.display = 'none'
    elBoard.classList.remove('victor')
}
function buildBoard() {
    const size = 10
    const board = []
    var fakeJ = size - 2

    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < size; j++) {


            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL

            } else if (i === 1 && j === 1 ||
                i === 1 && j === fakeJ ||
                i === fakeJ && j === 1 ||
                i === fakeJ && j === fakeJ) {
                board[i][j] = SUPER_FOOD

            } else {
                board[i][j] = FOOD
                gGame.food++
            }
        }
    }
    return board
}

function updateScore(diff) {
    const elScore = document.querySelector('h2 span')

    // Model
    gGame.score += diff
    // DOM
    elScore.innerText = gGame.score
}

function addCherry() {
    var cell = getEmptyCell()

    if (!cell) return

    gBoard[cell.i][cell.j] = CHERRY

    renderCell(cell, CHERRY)

    setTimeout(() => {
        // MODEL
        gBoard[cell.i][cell.j] = EMPTY
        // DOM 
        renderCell(cell, EMPTY)
    }, 3000)
}

function getEmptyCell() {
    var empty = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currBoard = gBoard[i][j]
            if (currBoard === EMPTY) empty.push({ i, j })
        }
    }
    var idx = empty[getRandomIntInclusive(0, empty.length)]
    return idx
}

function gameOver() {
    const elRestart = document.querySelector('.restart')
    elRestart.style.display = 'block'

    gGame.isOn = false
    gGame.food = 0
    gGhosts = []
    clearInterval(gGhostsInterval)

}

function victorious() {
    const elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = 'VICTORIOUS!'
    elBoard.classList.add('victor')
    gameOver()
}
function getCherryHTML() {
    return `<span style="color:red;">${CHERRY}</span>`
}
