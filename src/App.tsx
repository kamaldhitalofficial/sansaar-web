import { Routes, Route } from 'react-router-dom'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="p-8 text-center">Sansaar Web — coming soon</div>} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
