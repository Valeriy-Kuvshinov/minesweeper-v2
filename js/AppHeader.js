const pharaohImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702817777/MummySweeper/rsw1s45xuu16codev2vq.png';

export function AppHeader() {
    return `
        <header class="app-header flex full">
            <div class="header-contents flex row layout-row">
                <img src="${pharaohImg}" alt="header logo" />
                <h1>MummySweeper</h1>
                <img src="${pharaohImg}" alt="header logo" />
            </div>
        </header>
    `;
}