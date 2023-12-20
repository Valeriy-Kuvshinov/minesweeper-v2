const musicMp3 = 'https://res.cloudinary.com/digrqdbso/video/upload/v1702927541/MummySweeper/l0danle2icni56ujkvou.mp3'

import '../../assets/styles/main.scss'
import { AppHeader, updateHeader, attachEventListeners, updateMusicButton } from '../AppHeader.js'
import { renderBoard } from '../controller/game-board.js'
import { renderControls, updateGameDisplays, gameBoard } from '../controller/game-manager.js'

let currentMode = 'day-mode'

const appElement = document.querySelector('#app')

// Initial rendering of the app
appElement.innerHTML = `
  <div class="main-container ${currentMode}">
      ${AppHeader(currentMode)}
      <div id="game-wrapper" class="game-wrapper flex column layout-row">
      </div>
  </div>
  <audio id="background-music" src="${musicMp3}" loop></audio>
`

setTimeout(() => {
  const gameWrapper = appElement.querySelector('#game-wrapper')
  const controlPanelElement = renderControls()
  gameWrapper.appendChild(controlPanelElement)

  const boardElement = renderBoard(gameBoard)
  gameWrapper.appendChild(boardElement)

  updateGameDisplays(gameBoard, 'all')
}, 1)

function toggleTheme() {
  currentMode = currentMode === 'day-mode' ? 'night-mode' : 'day-mode'

  const mainContainer = appElement.querySelector('.main-container')
  mainContainer.classList.remove('day-mode', 'night-mode')
  mainContainer.classList.add(currentMode)

  updateHeader(currentMode)
  attachEventListeners(toggleTheme)

  updateMusicButton()
}

attachEventListeners(toggleTheme)