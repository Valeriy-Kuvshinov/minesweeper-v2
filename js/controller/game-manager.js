import { Board, difficulties } from "../model/board"
import { renderBoard } from "./game-board"

export function renderControls() {
    const controlPanel = document.createElement('div')
    controlPanel.className = 'control-panel'

    // Difficulty selection dropdown
    const difficultySelect = document.createElement('select')
    difficultySelect.id = 'difficulty-select'
    Object.keys(difficulties).forEach(difficulty => {
        const option = document.createElement('option')
        option.value = difficulty
        option.textContent = difficulty.charAt(0).toUpperCase()
            + difficulty.slice(1)

        difficultySelect.appendChild(option)
    })
    const restartButton = document.createElement('button')
    restartButton.id = 'restart-button'
    restartButton.textContent = '🤠'

    controlPanel.appendChild(difficultySelect)
    controlPanel.appendChild(restartButton)

    difficultySelect.addEventListener('change', (event) => changeDifficulty(event.target.value))
    restartButton.addEventListener('click', restartGame)

    return controlPanel
}

// Function to change difficulty
function changeDifficulty(newDifficulty) {
    const newBoard = new Board(newDifficulty)
    updateGameBoard(newBoard)
}

// Function to restart the game
function restartGame() {
    const currentDifficulty = document.getElementById('difficulty-select').value
    const newBoard = new Board(currentDifficulty)
    updateGameBoard(newBoard)
}

// Function to update the game board
function updateGameBoard(newBoard) {
    const oldBoardElement = document.querySelector('.minesweeper-board')
    if (oldBoardElement) oldBoardElement.remove()

    const newBoardElement = renderBoard(newBoard)

    const gameWrapper = document.querySelector('#game-wrapper')
    gameWrapper.appendChild(newBoardElement)

    updateRestartButton(newBoard.lives)
}

export function updateRestartButton(lives) {
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
