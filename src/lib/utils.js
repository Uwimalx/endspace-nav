export const isBrowser = typeof window !== 'undefined'

export const loadExternalResource = (url, type = 'js') => {
  return new Promise((resolve) => {
    if (!isBrowser) {
      resolve(false)
      return
    }
    const existing = document.querySelector(
      type === 'css' ? `link[href="${url}"]` : `script[src="${url}"]`
    )
    if (existing) {
      resolve(true)
      return
    }
    let el
    if (type === 'css') {
      el = document.createElement('link')
      el.rel = 'stylesheet'
      el.href = url
    } else {
      el = document.createElement('script')
      el.src = url
      el.async = true
    }
    el.onload = () => resolve(true)
    el.onerror = () => resolve(false)
    document.head.appendChild(el)
  })
}
