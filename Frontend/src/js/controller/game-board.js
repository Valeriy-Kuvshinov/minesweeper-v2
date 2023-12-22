import { updateGameDisplays } from "./game-manager.js"

const mummyImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702995595/MummySweeper/nbx8rq48skndpyerawni.png'

export function renderBoard(board) {
    const boardElement = document.createElement('div')
    boardElement.className = "minesweeper-board flex column"

    board.cells.forEach((row, rowIndex) => {
        const rowElement = document.createElement('div')
        rowElement.className = "board-row flex row"

        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div')
            cellElement.className = `board-cell flex 
                ${cell.isRevealed ? '' : 'unrevealed'} ${board.difficulty}`
            cellElement.id = cell.id

            if (!cell.isMine) {
                const countText = document.createTextNode
                    (cell.isRevealed && cell.neighborMineCount > 0
                        ? cell.neighborMineCount : '')
                cellElement.appendChild(countText)
            }

            if (cell.isMine) {
                const mineImg = document.createElement('img')
                mineImg.src = mummyImg
                mineImg.style.display = cell.isRevealed ? 'block' : 'none'
                cellElement.appendChild(mineImg)

                if (cell.isRevealed) cellElement.classList.add('mined')
            }
            cellElement.addEventListener('click', () => {
                if (board.hintRevealMode && !cell.isRevealed)
                    hintRevealCells(board, rowIndex, colIndex, cellElement)
                else revealCell(board, rowIndex, colIndex, cellElement)
            })
            cellElement.addEventListener('contextmenu', (e) => {
                e.preventDefault() // Prevent the context menu from opening
                toggleFlag(board, rowIndex, colIndex, cellElement)
            })
            rowElement.appendChild(cellElement)
        })
        boardElement.appendChild(rowElement)
    })
    return boardElement
}

function revealCell(board, row, col, cellElement) {
    if (!board.gameOver) {
        const cell = board.cells[row][col]

        if (cell.isRevealed || cell.isFlagged || cell.isMarkedSafe) return

        cell.reveal()
        cellElement.classList.remove('unrevealed')

        if (cell.isMine) {
            board.lives--
            board.minesLeft--
            updateGameDisplays(board, 'all')
            const mineImg = cellElement.querySelector('img')
            if (mineImg) mineImg.style.display = 'block'

            cellElement.classList.add('mined')
        } else {
            cellElement.textContent = cell.neighborMineCount
                > 0 ? cell.neighborMineCount : ''
            if (cell.neighborMineCount === 0) {
                // Recursively reveal neighboring cells
                for (let offsetX = -1; offsetX <= 1; offsetX++) {
                    for (let offsetY = -1; offsetY <= 1; offsetY++) {
                        const neighborRow = row + offsetX
                        const neighborCol = col + offsetY

                        // Check if neighbor is within the board boundaries
                        if (neighborRow >= 0 && neighborRow < board.height &&
                            neighborCol >= 0 && neighborCol < board.width) {
                            const neighborCellElement = document.getElementById(
                                board.cells[neighborRow][neighborCol].id)
                            revealCell(board, neighborRow, neighborCol, neighborCellElement)
                        }
                    }
                }
            }
        }
        if (board.timeElapsed === 0) toggleGameTimer(board, 'start')
        checkGameOver(board)
    }
}

function toggleFlag(board, row, col, cellElement) {
    if (!board.gameOver) {
        const cell = board.cells[row][col]

        if (!cell.isRevealed) {
            if (cell.isFlagged) {
                cell.toggleFlag()
                cellElement.classList.add('unrevealed')
                cellElement.classList.remove('flagged')
                board.minesLeft++
                updateGameDisplays(board, 'mines')
            }
            else if (board.minesLeft > 0) {
                cell.toggleFlag()
                cellElement.classList.remove('unrevealed')
                cellElement.classList.add('flagged')
                board.minesLeft--
                updateGameDisplays(board, 'mines')
            }
        }
    }
}

function checkGameOver(board) {
    if (board.lives === 0) {
        board.gameOver = true
        revealRemainingMines(board)
        toggleGameTimer(board, 'stop')
    }
    else if (board.checkWinCondition()) {
        board.gameOver = true
        flagRemainingMines(board)
        toggleGameTimer(board, 'stop')

        const restartButton = document.getElementById('restart-button')
        restartButton.textContent = '😎'
    }
}

function revealRemainingMines(board) {
    board.cells.forEach(row => {
        row.forEach(cell => {
            if (cell.isMine && !cell.isRevealed) {
                const cellElement = document.getElementById(cell.id)
                const mineImg = cellElement.querySelector('img')
                if (mineImg) mineImg.style.display = 'block'
                cellElement.classList.remove('unrevealed')
                cellElement.classList.add('mined')
                cell.reveal()
            }
        })
    })
}

function flagRemainingMines(board) {
    board.cells.forEach(row => {
        row.forEach(cell => {
            if (cell.isMine && !cell.isRevealed) {
                const cellElement = document.getElementById(cell.id)
                cellElement.classList.remove('unrevealed')
                cellElement.classList.add('flagged')
                cell.toggleFlag()
            }
        })
    })
}

export function toggleGameTimer(board, action) {
    if (board.gameTimer !== null) {
        clearInterval(board.gameTimer)
        board.gameTimer = null
    }

    if (action === 'start') {
        board.timeElapsed = 0
        board.gameTimer = setInterval(() => {
            board.timeElapsed++
            updateGameDisplays(board, 'time')
        }, 1000)
    } else if (action === 'stop') {
        clearInterval(board.gameTimer)
        board.gameTimer = null
        updateGameDisplays(board, 'time')
    }
}

function hintRevealCells(board, row, col, cellElement) {
    const cellsToRevert = []

    tempRevealCell(board.cells[row][col], cellElement, cellsToRevert)

    // Temporarily reveal neighboring cells
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
        for (let offsetY = -1; offsetY <= 1; offsetY++) {
            if (offsetX === 0 && offsetY === 0) continue
            const neighborRow = row + offsetX
            const neighborCol = col + offsetY

            if (neighborRow >= 0 && neighborRow < board.height &&
                neighborCol >= 0 && neighborCol < board.width) {
                const neighborCell = board.cells[neighborRow][neighborCol]
                const neighborCellElement = document.getElementById(neighborCell.id)

                tempRevealCell(neighborCell, neighborCellElement, cellsToRevert)
            }
        }
    }
    // Revert the cells back to their original state after 3 seconds
    setTimeout(() => {
        cellsToRevert.forEach(({ cellElement, row, col }) => {
            const cell = board.cells[row][col]
            if (!cell.isRevealed) {
                cellElement.classList.add('unrevealed')
                if (cell.isMine) {
                    cellElement.querySelector('img').style.display = 'none'
                } else cellElement.textContent = ''
            }
        })
    }, 3000)
    board.hintRevealMode = false
}

function tempRevealCell(cell, cellElement, cellsToRevert) {
    if (!cell.isRevealed) {
        cellElement.classList.remove('unrevealed')
        if (cell.isMine) cellElement.querySelector('img').style.display = 'block'
        else cellElement.textContent = cell.neighborMineCount > 0
            ? cell.neighborMineCount : ''

        cellsToRevert.push({ cellElement, row: cell.row, col: cell.col })
    }
}