const CLASSNAME = 'lu-overflow-y-hidden'

let count = 0
let scrollX = 0
let scrollY = 0

export const getHtml = () => {
  return document.querySelector('html')
}

export default function useLockScroll(shouldLock: boolean) {
  const lock = () => {
    if (shouldLock) {
      if (!count) {
        scrollX = window.pageXOffset
        scrollY = window.pageYOffset

        document.body.classList.add(CLASSNAME)
        getHtml()?.classList.add(CLASSNAME)
      }
      count++
    }
  }

  const unlock = () => {
    if (shouldLock && count) {
      count--
      if (!count) {
        document.body.classList.remove(CLASSNAME)
        getHtml()?.classList.remove(CLASSNAME)

        window?.scrollTo(scrollX, scrollY)
      }
    }
  }

  return { lock, unlock }
}
