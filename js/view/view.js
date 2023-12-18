import '../../assets/styles/main.scss'
import { Board } from '../model/board.js'

import { AppHeader, updateHeader, attachThemeToggleListener } from '../AppHeader.js'
import { renderBoard, difficulties } from '../controller/game-manager.js'

const minesweeperBoard = new Board('expert')
let currentMode = 'day-mode'

const appElement = document.querySelector('#app')

function toggleTheme() {
  currentMode = currentMode === 'day-mode' ? 'night-mode' : 'day-mode'

  const mainContainer = appElement.querySelector('.main-container')
  mainContainer.classList.remove('day-mode', 'night-mode')
  mainContainer.classList.add(currentMode)

  updateHeader(currentMode)
  attachThemeToggleListener(toggleTheme)
}

// Initial rendering of the app
appElement.innerHTML = `
  <div class="main-container ${currentMode}">
      ${AppHeader(currentMode)}
  </div>
`

// Append the board element without re-rendering it
const boardElement = renderBoard(minesweeperBoard)
appElement.querySelector('.main-container').appendChild(boardElement)

attachThemeToggleListener(toggleTheme)