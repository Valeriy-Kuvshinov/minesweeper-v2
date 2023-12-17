export class Cell {
    constructor(row, col) {
        this.id = `cell-${row}-${col}`
        this.row = row
        this.col = col
        this.isMine = false
        this.isRevealed = false
        this.isFlagged = false
        this.neighborMineCount = 0
    }

    setMine() {
        this.isMine = true
    }

    reveal() {
        if (!this.isFlagged && !this.isRevealed)
            this.isRevealed = true
    }

    getRevealState() {
        return this.isRevealed
    }

    isSafe() {
        return !this.isMine
    }

    toggleFlag() {
        this.isFlagged = !this.isFlagged
    }

    toString() {
        return `Cell [ID: ${this.id}, Row: ${this.row}, Col: 
            ${this.col}, isMine: ${this.isMine}, isRevealed: 
            ${this.isRevealed}, isFlagged: ${this.isFlagged},
            neighborMineCount: ${this.neighborMineCount}]`
    }
}