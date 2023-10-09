export default function isSystemThemeDark() {
  const themeMedia = window?.matchMedia?.('(prefers-color-scheme: dark)')
  return !!themeMedia?.matches
}

// const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
// themeMedia.addListener(e => {
//     if (e.matches) {
//         console.log('light')
//     } else {
//         console.log('dark')
//     }
// });
