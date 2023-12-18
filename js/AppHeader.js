const pharaohImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702817777/MummySweeper/rsw1s45xuu16codev2vq.png';
const sunImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702906335/MummySweeper/gyrgt4wabob20rxbbqye.png'
const moonImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702906804/MummySweeper/n6alsecbsrdr3pohcc3v.png'

export function AppHeader(mode) {
    const themeImage = mode === 'day-mode' ? sunImg : moonImg

    return `
        <header class="app-header flex full">
            <div class="header-contents flex row layout-row">
                <img src="${pharaohImg}" alt="header logo" />
                <h1>MummySweeper</h1>
                <img src="${pharaohImg}" alt="header logo" />
            </div>
            <button id="theme-toggle-button">
                <img src="${themeImage}" alt="Toggle Theme" />
            </button>
        </header>
    `
}

export function updateHeader(currentMode) {
    const headerElement = document.querySelector('.app-header')
    headerElement.outerHTML = AppHeader(currentMode)
}

// Function to attach the theme toggle listener
export function attachThemeToggleListener(toggleTheme) {
    const themeToggleButton = document.querySelector('#theme-toggle-button')
    themeToggleButton.addEventListener('click', toggleTheme)
}