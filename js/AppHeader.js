const pharaohImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1702817777/MummySweeper/rsw1s45xuu16codev2vq.png';

export function AppHeader() {
    return `
        <header class="app-header flex row full">
            <img src="${pharaohImg}" alt="header logo" />
            <h1>MummySweeper</h1>
            <img src="${pharaohImg}" alt="header logo" />
        </header>
    `;
}