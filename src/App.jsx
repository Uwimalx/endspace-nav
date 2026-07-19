import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from '@/lib/global'
import { ThemeProvider } from '@/lib/theme.jsx'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

function App() {
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