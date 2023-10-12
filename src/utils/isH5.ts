let isH5 = false
const ua = window.navigator.userAgent
const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod', 'iPad']

agents.forEach((i) => {
  // console.log(i, ua.indexOf(i));
  if (ua.indexOf(i) > 0) {
    isH5 = true
  }
})

if (window.innerWidth < 720) {
  isH5 = true
}

export default isH5
