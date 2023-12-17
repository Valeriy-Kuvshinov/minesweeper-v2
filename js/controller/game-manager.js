console.log("connected to gamee-manager")

export const difficulties = {
    beginner: { width: 4, height: 4, mines: 2 },
    medium: { width: 8, height: 8, mines: 14 },
    expert: { width: 12, height: 12, mines: 32 }
}

export function renderBoard(board) {
    const boardElement = document.createElement('div')
    boardElement.className = "minesweeper-board flex column"

    board.cells.forEach((row, rowIndex) => {
        const rowElement = document.createElement('div')
        rowElement.className = "board-row flex row"

        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div')
            cellElement.className = "board-cell flex"
            cellElement.id = cell.id

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
    const cell = board.cells[row][col]
    cell.reveal()

    // Update the cell's visual state based on whether it's a mine or safe
    if (cell.isRevealed) {
        if (cell.isMine) cellElement.classList.add('revealed-mine')
        else {
            cellElement.classList.add('revealed-safe')
            cellElement.textContent = cell.neighborMineCount
                > 0 ? cell.neighborMineCount : ''
        }
    }
}
