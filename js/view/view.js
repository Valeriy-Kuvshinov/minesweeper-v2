import '../../assets/styles/main.scss'
import { Board } from '../model/board.js'

import { AppHeader } from '../AppHeader.js'
import { renderBoard, difficulties } from '../controller/game-manager.js'

const minesweeperBoard = new Board('beginner')

console.log(minesweeperBoard.toString())

const appElement = document.querySelector('#app')
appElement.innerHTML = `
  <div class="main-container">
    ${AppHeader()}
  </div>
`

const boardElement = renderBoard(minesweeperBoard)
appElement.querySelector('.main-container').appendChild(boardElement)