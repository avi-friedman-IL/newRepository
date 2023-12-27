'use strict'

const GHOST = '&#9781'

var gGhosts = []
var gGhostsInterval

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    
    gGhostsInterval = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // TODO: Create a ghost with arbitrary start pos & currCellContent
    const ghost = {
        location: { i: 3, j: 3 },
        currCellContent: FOOD,
        color: getRandomColor()

    }
    // TODO: Add the ghost to the ghosts array
    gGhosts.push(ghost)
    
    // TODO: Update the board
    board[ghost.location.i][ghost.location.j] = GHOST
    
}

function moveGhosts() {
    // TODO: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i])
        
    }
}

function moveGhost(ghost) {

    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL || nextCell === GHOST) return

    if (nextCell === PACMAN) {
        gameOver()
        return
    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    renderCell(ghost.location, ghost.currCellContent)

    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST

    renderCell(ghost.location, getGhostHTML(ghost))

}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color};">${GHOST}</span>`
}