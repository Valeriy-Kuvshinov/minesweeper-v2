import { Cell } from "./cell.js"
import { difficulties } from "../controller/game-manager.js"

export class Board {
    constructor(difficulty) {
        const config = difficulties[difficulty]
        this.difficulty = difficulty
        this.width = config.width
        this.height = config.height
        this.numberOfMines = config.mines
        this.cells = this.createBoard()
        this.placeMines()
        this.calculateNeighborMines()
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

    toString() {
        let boardString = `Board [Difficulty: ${this.difficulty}, Width: 
            ${this.width}, Height: ${this.height}, Mines: 
            ${this.numberOfMines}]\n`

        for (let row = 0; row < this.height; row++) {
            let rowString = ''
            for (let col = 0; col < this.width; col++) {
                const cell = this.cells[row][col]
                if (cell.isRevealed)
                    rowString += cell.isMine ? 'X' : cell.neighborMineCount.toString()
                else
                    rowString += cell.isFlagged ? 'F' : '.'
                rowString += ' '
            }
            boardString += rowString.trim() + '\n'
        }
        return boardString
    }
}
