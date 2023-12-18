const pharaohImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702817777/MummySweeper/rsw1s45xuu16codev2vq.png';
const sunImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702912103/MummySweeper/o3bdexckxdzkq8cil7a6.png'
const moonImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702906804/MummySweeper/n6alsecbsrdr3pohcc3v.png'
const playAudioImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702928661/MummySweeper/lxu8wiupvevxhxezgl4b.png'
const pauseAudioImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702928662/MummySweeper/zwo1m4nd9ybahabzflo9.png'

export function AppHeader(mode) {
    const themeImage = mode === 'day-mode' ? sunImg : moonImg

    return `
        <header class="app-header flex full ${mode}">
            <div class="header-contents flex row layout-row ${mode}">
                <button id="music-toggle-button">
                    <img src="${playAudioImg}" alt="Toggle Music" />
                </button>

                <div class="title flex row">
                    <img src="${pharaohImg}" alt="header logo" />
                    <h1>MummySweeper</h1>
                    <img src="${pharaohImg}" alt="header logo" />
                </div>

                <button id="theme-toggle-button">
                    <img src="${themeImage}" alt="Toggle Theme" />
                </button>
            </div>
        </header>
    `
}

export function updateHeader(currentMode) {
    const headerElement = document.querySelector('.app-header')
    headerElement.outerHTML = AppHeader(currentMode)
}

export function updateMusicButton() {
    const music = document.getElementById('background-music')
    const musicToggleButton = document.getElementById('music-toggle-button')
    const musicToggleImage = musicToggleButton.querySelector('img')

    if (!music.paused) {
        musicToggleImage.src = pauseAudioImg
        musicToggleImage.alt = "Pause Music"
    } else {
        musicToggleImage.src = playAudioImg
        musicToggleImage.alt = "Play Music"
    }
}

function toggleMusic() {
    const music = document.getElementById('background-music')
    music.volume = 0.1

    if (music.paused) music.play()
    else music.pause()

    updateMusicButton()
}

// Function to attach event listeners
export function attachEventListeners(toggleTheme) {
    const themeToggleButton = document.querySelector('#theme-toggle-button')
    const musicToggleButton = document.querySelector('#music-toggle-button')

    themeToggleButton.addEventListener('click', toggleTheme)
    musicToggleButton.addEventListener('click', toggleMusic)
}