import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from '@/lib/global'
import { ThemeProvider } from '@/lib/theme.jsx'
import { siteConfig } from '@/config'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

function App() {
  useEffect(() => {
    const avatar = siteConfig('AVATAR')
    if (!avatar) return
    let link = document.querySelector("link[rel='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = avatar
  }, [])

  return (
    <GlobalProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default App
