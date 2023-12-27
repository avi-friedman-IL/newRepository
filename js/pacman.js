'use strict'

const PACMAN = '🙃'
var gPacman
var gIntervalChangColor

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 3, j: 5 },
        isSuper: false,
        isSuperFood: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return


    if (nextCell === GHOST) {

        if (gPacman.isSuper) {
            isSuperPacman(nextCell)
        } else {
            gameOver()
            return
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gGame.food--
    }

    if (nextCell === SUPER_FOOD) {
        gIntervalChangColor = setInterval(colorChanger, 37)
        gPacman.isSuper = true

        if (gPacman.isSuper) {
            isSuperPacman(nextCell)
        }
    }

    if (nextCell === CHERRY) {
        console.log('hj');
        gGame.score += 10
        updateScore(0)
    }
    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)
    if (gGame.food === 1) {
        victorious()
        return
    }
}

function getNextLocation(eventKeyboard) {
    const nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break;

        case 'ArrowDown':
            nextLocation.i++
            break;

        case 'ArrowLeft':
            nextLocation.j--
            break;

        case 'ArrowRight':
            nextLocation.j++
            break;

        default: return null
    }
    return nextLocation
}

function isSuperPacman(cell) {
    
    var ghosts = []
    var sliceGhost = gGhosts.slice(cell) 
    ghosts.push(sliceGhost)
    
    if (!gPacman.isSuper) return
    
    setTimeout(() => {
        if (!gPacman.isSuper) return
        for (let i = 0; i < ghosts.length; i++) {
            gGhosts.push(ghosts[i])
        }
    }, 3000)

    setTimeout(() => {
        clearInterval(gIntervalChangColor)
        if (!gPacman.isSuper) return
        gPacman.isSuper = false
    }, 3000)

}

function colorChanger() {
    const elSpan = document.querySelectorAll('.board-container span')
    for (let i = 0; i < elSpan.length; i++) {
        elSpan[i].style.color = 'green'
    }
}

