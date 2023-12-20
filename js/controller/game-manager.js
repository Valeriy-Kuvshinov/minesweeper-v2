const mummyImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702995595/MummySweeper/nbx8rq48skndpyerawni.png'
const timeImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1703065478/MummySweeper/j8kylyvhtn2fkrvy5izy.png'

import { Board, difficulties, gameCheats } from "../model/board.js"
import { renderBoard, toggleGameTimer } from "./game-board.js"
import { renderCheatMessage } from "./game-cheats.js"

export let gameBoard = new Board('beginner')

export function renderControls() {
    const controlPanel = document.createElement('div')
    controlPanel.className = 'control-panel grid'

    let optionsHtml = Object.keys(difficulties).map(difficulty =>
        `<option value="${difficulty}">
        ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </option>`
    ).join('')

    let cheatsHtml = Object.entries(gameCheats).map(([key, cheat]) =>
        `<option value="${key}">
        ${cheat.title}
        </option>`
    ).join('')

    controlPanel.innerHTML = `
        <section class="game-options grid">
            <div class="select-area flex column">
                <p>Select Level</p>
                <select id="difficulty-select">
                    ${optionsHtml}
                </select>
            </div>
            <div class="select-area flex column">
                <p>Game Cheats</p>
                <select id="cheat-select">
                    ${cheatsHtml}
                </select>
            </div>
        </section>

        <section class="game-displays grid">
            <div class="amount-display flex column">
                <img src="${mummyImg}" alt="Mummy" />
                <span id="mines-display">0</span>
            </div>
            <div class="amount-display flex column">
                <button id="restart-button">Restart</button>
                <span id="lives-display">2</span>
            </div>
            <div class="amount-display flex column">
                <img src="${timeImg}" alt="Time" />
                <span id="time-display">0</span>
            </div>
        </section>
    `

    const difficultySelect = controlPanel.querySelector('#difficulty-select')
    difficultySelect.addEventListener('change', (event) =>
        changeDifficulty(event.target.value))

    const cheatSelect = controlPanel.querySelector('#cheat-select')
    cheatSelect.addEventListener('change', (event) => {
        const selectedCheatKey = event.target.value
        renderCheatMessage(gameBoard, gameCheats[selectedCheatKey])
    })
    const restartButton = controlPanel.querySelector('#restart-button')
    restartButton.addEventListener('click', restartGame)

    return controlPanel
}

// Function to change difficulty
function changeDifficulty(newDifficulty) {
    toggleGameTimer(gameBoard, 'stop')
    gameBoard = new Board(newDifficulty)
    updateGameBoard(gameBoard)
}

// Function to restart the game
function restartGame() {
    toggleGameTimer(gameBoard, 'stop')
    const currentDifficulty = document.getElementById('difficulty-select').value
    gameBoard = new Board(currentDifficulty)
    updateGameBoard(gameBoard)
}

// Function to update the game board
function updateGameBoard(newBoard) {
    const oldBoardElement = document.querySelector('.minesweeper-board')
    if (oldBoardElement) oldBoardElement.remove()

    const newBoardElement = renderBoard(newBoard)

    const gameWrapper = document.querySelector('#game-wrapper')
    gameWrapper.appendChild(newBoardElement)

    updateGameDisplays(newBoard, 'all')
}

function updateRestartButton(lives) {
    const restartButton = document.getElementById('restart-button')
    switch (lives) {
        case 3:
            restartButton.textContent = '🤠'
            break
        case 2:
            restartButton.textContent = '😨'
            break
        case 1:
            restartButton.textContent = '😱'
            break
        default:
            restartButton.textContent = '💀'
            break
    }
}

// Function to update the game info displays
export function updateGameDisplays(board, dispalyCase) {
    const livesDisplay = document.getElementById('lives-display')
    const minesDisplay = document.getElementById('mines-display')
    const timeDisplay = document.getElementById('time-display')

    switch (dispalyCase) {
        case 'time':
            timeDisplay.textContent = board.timeElapsed
            break
        case 'lives':
            livesDisplay.textContent = board.lives
            updateRestartButton(board.lives)
            break
        case 'mines':
            minesDisplay.textContent = board.minesLeft
            break
        case 'all':
            timeDisplay.textContent = board.timeElapsed
            minesDisplay.textContent = board.minesLeft
            livesDisplay.textContent = board.lives
            updateRestartButton(board.lives)
            break
        default:
            break
    }
}