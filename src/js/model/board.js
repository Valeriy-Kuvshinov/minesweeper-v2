import { Cell } from "./cell.js"

export let gameCheats = {
    cheatOne: { title: 'Safe Click', isAvailable: true, usesLeft: 3, description: 'Find a random unrevealed cell that does not contain a mine, said flagged cell will appear for 3 seconds, then disappear.' },
    cheatTwo: { title: 'Mummy Exterminator', isAvailable: true, description: 'Destroy up to 3 undiscovered mummies, and recalculate the whole board again afterwards.' },
    cheatThree: { title: 'Small Reveal', isAvailable: true, usesLeft: 3, description: 'Temporarily reveal a cell and its neighbors for a second, then let the fog return.' },
    cheatFour: { title: 'Mega Reveal', isAvailable: true, description: 'Temporarily reveal a portion of the board (or all of it) by selecting point A and point B with your mouse.' }
}

export const difficulties = {
    beginner: { width: 4, height: 4, mines: 2, lives: 2 },
    easy: { width: 6, height: 6, mines: 8, lives: 3 },
    medium: { width: 8, height: 8, mines: 14, lives: 3 },
    hard: { width: 10, height: 10, mines: 21, lives: 3 },
    expert: { width: 12, height: 12, mines: 32, lives: 3 }
}

export class Board {
    constructor(difficulty) {
        const config = difficulties[difficulty]
        this.difficulty = difficulty
        this.lives = config.lives
        this.width = config.width
        this.height = config.height
        this.gameOver = false
        this.gameTimer = null
        this.timeElapsed = 0
        this.numberOfMines = config.mines
        this.minesLeft = config.mines
        this.cells = this.createBoard()
        this.placeMines()
        this.calculateNeighborMines()
        this.hasCheated = false
        this.hintRevealMode = false
        // console.log(this.toString())
    }

    createBoard() {
        const board = []
        for (let row = 0; row < this.height; row++) {
            const rowArray = []
            for (let col = 0; col < this.width; col++) {
                rowArray.push(new Cell(row, col))
            }
            board.push(rowArray)
        }
        return board
    }

    placeMines() {
        let minesPlaced = 0
        while (minesPlaced < this.numberOfMines) {
            const row = Math.floor(Math.random() * this.height)
            const col = Math.floor(Math.random() * this.width)

            const cell = this.cells[row][col]
            if (!cell.isMine) {
                cell.setMine()
                minesPlaced++
            }
        }
    }

    calculateNeighborMines() {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const cell = this.cells[row][col]
                if (!cell.isMine) {
                    let count = 0
                    // Check all surrounding cells
                    for (let offsetX = -1; offsetX <= 1; offsetX++) {
                        for (let offsetY = -1; offsetY <= 1; offsetY++) {
                            const neighborRow = row + offsetX
                            const neighborCol = col + offsetY

                            // Check if neighbor is within the board boundaries
                            if (neighborRow >= 0 && neighborRow < this.height &&
                                neighborCol >= 0 && neighborCol < this.width) {
                                const neighborCell = this.cells[neighborRow][neighborCol]
                                if (neighborCell.isMine) {
                                    count++
                                }
                            }
                        }
                    }
                    cell.neighborMineCount = count
                }
            }
        }
    }

    checkWinCondition() {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const cell = this.cells[row][col]
                if (!cell.isMine && !cell.isRevealed) return false
            }
        }
        return true // All non-mine cells are revealed, return true
    }

    checkForUnrevealed() {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const cell = this.cells[row][col]
                if (!cell.isRevealed) return true
            }
        }
        return false // All cells are revealed, return false
    }

    toString() {
        let boardString = `Board [Difficulty: ${this.difficulty}, Width: 
            ${this.width}, Height: ${this.height}, Mines: 
            ${this.numberOfMines}]\n`

        for (let row = 0; row < this.height; row++) {
            let rowString = ''
            for (let col = 0; col < this.width; col++) {
                const cell = this.cells[row][col]
                rowString += cell.isMine ? 'X' : cell.neighborMineCount.toString()
                rowString += cell.isFlagged ? 'F' : '.'
                rowString += ' '
            }
            boardString += rowString.trim() + '\n'
        }
        return boardString
    }
}
