import '../../assets/styles/main.scss'
import { Board } from '../model/board.js'
const musicMp3 = 'https://res.cloudinary.com/digrqdbso/video/upload/v1702927541/MummySweeper/l0danle2icni56ujkvou.mp3'

import { AppHeader, updateHeader, attachEventListeners, updateMusicButton } from '../AppHeader.js'
import { renderBoard, difficulties } from '../controller/game-manager.js'

const minesweeperBoard = new Board('medium')
let currentMode = 'day-mode'

const appElement = document.querySelector('#app')

function toggleTheme() {
  currentMode = currentMode === 'day-mode' ? 'night-mode' : 'day-mode'

  const mainContainer = appElement.querySelector('.main-container')
  mainContainer.classList.remove('day-mode', 'night-mode')
  mainContainer.classList.add(currentMode)

  updateHeader(currentMode)
  attachEventListeners(toggleTheme)

  updateMusicButton()
}

// Initial rendering of the app
appElement.innerHTML = `
  <div class="main-container ${currentMode}">
      ${AppHeader(currentMode)}
  </div>
  <audio id="background-music" src="${musicMp3}" loop></audio>
`

const boardElement = renderBoard(minesweeperBoard)
appElement.querySelector('.main-container').appendChild(boardElement)

attachEventListeners(toggleTheme)