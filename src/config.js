const getConfig = () => {
  if (typeof window !== 'undefined' && window.__CONFIG__) {
    return window.__CONFIG__
  }
  return {}
}

export const CONFIG = getConfig()

export const siteConfig = (key, defaultValue = null, fallback = null) => {
  const config = getConfig()
  if (config[key] !== undefined) return config[key]
  if (fallback && fallback[key] !== undefined) return fallback[key]
  return defaultValue
}

export default CONFIG