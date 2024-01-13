const link = 'https://www.youtube.com/watch?v=GI6dOS5ncFc&t=234s'

export function AppFooter(mode) {
    return `
    <footer class="app-footer flex full ${mode}">
        <div class="footer-contents flex column layout-row ${mode}">
            <p>
                This game's music has been brought to you by the Fiechters
            </p>
            <a href="${link}" target="_blank">
                Click here to check out his YouTube channel!
            </a>
            <p>
                © Valeriy Kuvshinov 2023
            </p>
        </div>
    </footer>
`
}

export function updateFooter(currentMode) {
    const footerElement = document.querySelector('.app-footer')
    footerElement.outerHTML = AppFooter(currentMode)
}