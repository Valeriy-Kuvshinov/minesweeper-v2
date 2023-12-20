import { gameCheats } from "../model/board.js"
import { toggleGameTimer } from "./game-board.js"

export function renderCheatMessage(board, gameCheat) {
    const modalWrapper = document.createElement('div')
    modalWrapper.className = 'modal-wrapper'

    modalWrapper.innerHTML = `
        <div class="modal-content flex column">
            <h2>${gameCheat.title}</h2>
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

    switch (cheatKey) {
        case 'cheatOne':
            executeSafeClick(board, gameCheat)
            break
        case 'cheatTwo':
            executeMummyExterminator(board, gameCheat)
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
    console.log(`Executing cheat: ${gameCheat.title}`)
    if (board.timeElapsed === 0) toggleGameTimer(board, 'start')
    if (board.hasCheated === false) board.hasCheated = true
}

function executeMummyExterminator(board, gameCheat) {
    console.log(`Executing cheat: ${gameCheat.title}`)
    if (board.timeElapsed === 0) toggleGameTimer(board, 'start')
    if (board.hasCheated === false) board.hasCheated = true
}

function executeSmallReveal(board, gameCheat) {
    console.log(`Executing cheat: ${gameCheat.title}`)
    if (board.timeElapsed === 0) toggleGameTimer(board, 'start')
    if (board.hasCheated === false) board.hasCheated = true
}

function executeMegaReveal(board, gameCheat) {
    console.log(`Executing cheat: ${gameCheat.title}`)
    if (board.timeElapsed === 0) toggleGameTimer(board, 'start')
    if (board.hasCheated === false) board.hasCheated = true
}