console.log("connected to gamee-manager")

export const difficulties = {
    beginner: { width: 4, height: 4, mines: 2, lives: 2 },
    medium: { width: 8, height: 8, mines: 14, lives: 3 },
    expert: { width: 12, height: 12, mines: 32, lives: 3 }
}

export function renderBoard(board) {
    const boardElement = document.createElement('div')
    boardElement.className = "minesweeper-board flex column"

    const mummyImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702890458/MummySweeper/gxl3fpsmtdsqiong7mua.png'

    board.cells.forEach((row, rowIndex) => {
        const rowElement = document.createElement('div')
        rowElement.className = "board-row flex row"

        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div')
            cellElement.className = "board-cell flex unrevealed"
            cellElement.id = cell.id

            if (cell.isMine) {
                const mineImg = document.createElement('img')
                mineImg.src = mummyImg
                mineImg.style.display = 'none'
                cellElement.appendChild(mineImg)
            } else {
                const countText = document.createTextNode('')
                cellElement.appendChild(countText)
            }
            cellElement.addEventListener('click', () => {
                revealCell(board, rowIndex, colIndex, cellElement)
            })
            rowElement.appendChild(cellElement)
        })
        boardElement.appendChild(rowElement)
    })
    return boardElement
}

function revealCell(board, row, col, cellElement) {
    if (board.lives !== 0) {
        const cell = board.cells[row][col]

        if (cell.isRevealed || cell.isFlagged) return

        cell.reveal()
        cellElement.classList.remove('unrevealed')

        if (cell.isMine) {
            board.lives--
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
    }
}