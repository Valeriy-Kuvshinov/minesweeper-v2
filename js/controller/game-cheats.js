import { gameCheats } from "../model/board.js"
import { toggleGameTimer } from "./game-board.js"
import { updateGameBoard } from "./game-manager.js"

export function renderCheatMessage(board, gameCheat) {
    const modalWrapper = document.createElement('div')
    modalWrapper.className = 'modal-wrapper'

    let usageMessage
    if ('usesLeft' in gameCheat && typeof gameCheat.usesLeft === 'number') {
        usageMessage = `${gameCheat.usesLeft} uses left`
    } else if ('isAvailable' in gameCheat && typeof gameCheat.isAvailable === 'boolean') {
        usageMessage = gameCheat.isAvailable ? 'One time use' : 'Already used'
    }

    modalWrapper.innerHTML = `
        <div class="modal-content flex column">
            <h2>${gameCheat.title}</h2>
            <p>${usageMessage}</p>
            <p>${gameCheat.description}</p>
            <p>ATTENTION!</p>
            <p>Using any of the provided cheats will prevent you from submitting your score in the end of the game.</p>

            <div class="modal-buttons flex row">
                <button id="cancel-button">Cancel</button>
                <button id="proceed-button">Proceed</button>
            </div>
        </div>
    `
    document.body.appendChild(modalWrapper)

    modalWrapper.querySelector('#cancel-button').addEventListener('click', () => {
        modalWrapper.remove()
    })
    modalWrapper.querySelector('#proceed-button').addEventListener('click', () => {
        const cheatKey = Object.keys(gameCheats).find(key => gameCheats[key] === gameCheat)
        executeCheat(board, cheatKey)
        modalWrapper.remove()
    })
}

function executeCheat(board, cheatKey) {
    const gameCheat = gameCheats[cheatKey]

    if (board.gameOver) return
    if (board.timeElapsed === 0) toggleGameTimer(board, 'start')
    if (board.hasCheated === false) board.hasCheated = true

    switch (cheatKey) {
        case 'cheatOne':
            executeSafeClick(board, gameCheat)
            break
        case 'cheatTwo':
            if (board.difficulty !== 'beginner')
                executeMummyExterminator(board, gameCheat)
            else alert('really?')
            break
        case 'cheatThree':
            executeSmallReveal(board, gameCheat)
            break
        case 'cheatFour':
            executeMegaReveal(board, gameCheat)
            break
        default:
            console.log('Unknown cheat')
            break
    }
}

function executeSafeClick(board, gameCheat) {
    if (gameCheat.usesLeft !== 0) {
        let safeCells = []
        board.cells.forEach(row => {
            row.forEach(cell => {
                if (!cell.isRevealed && !cell.isMine && !cell.isFlagged)
                    safeCells.push(cell)
            })
        })

        if (safeCells.length > 0) {
            const randomCell = safeCells[Math.floor(Math.random() * safeCells.length)]
            const cellElement = document.getElementById(randomCell.id)

            cellElement.classList.add('safe-click')
            cellElement.classList.remove('unrevealed')
            randomCell.setSafeMark()

            setTimeout(() => {
                cellElement.classList.remove('safe-click')
                cellElement.classList.add('unrevealed')
                randomCell.removeSafeMark()
            }, 3000)
        }
        gameCheat.usesLeft--
    } else gameCheat.isAvailable = false
}

function executeMummyExterminator(board, gameCheat) {
    if (gameCheat.isAvailable) {
        console.log(`Executing cheat: ${gameCheat.title}`)
        let mineCells = []
        board.cells.forEach(row => {
            row.forEach(cell => {
                if ((cell.isMine && !cell.isRevealed)
                    || (cell.isMine && !cell.isFlagged)) mineCells.push(cell)
            })
        })

        for (let i = 0; i < Math.min(3, mineCells.length); i++) {
            const randomIndex = Math.floor(Math.random() * mineCells.length)
            const selectedCell = mineCells[randomIndex]

            selectedCell.isMine = false
            board.minesLeft--
            mineCells.splice(randomIndex, 1)
        }
        board.calculateNeighborMines()
        updateGameBoard(board)
        gameCheat.isAvailable = false
    }
}

function executeSmallReveal(board, gameCheat) {
    if (gameCheat.usesLeft !== 0) {
        console.log(`Executing cheat: ${gameCheat.title}`)
        gameCheat.usesLeft--
    } else gameCheat.isAvailable = false
}

function executeMegaReveal(board, gameCheat) {
    if (gameCheat.isAvailable) {
        console.log(`Executing cheat: ${gameCheat.title}`)
        gameCheat.isAvailable = false
    }
}