const link = 'https://www.youtube.com/watch?v=GI6dOS5ncFc&t=234s'

export function appFooter(mode) {
    return `
    <footer class="app-footer flex full ${mode}">
        <div class="footer-contents flex row layout-row ${mode}">
            <a href="${link}" target="_blank">
                This game's music has been brought to you by the Fiechters
            </a>
        </div>
    </footer>
`
}