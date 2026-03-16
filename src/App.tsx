import { Routes, Route } from 'react-router-dom'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import EventsPage from '@/features/events/pages/EventsPage'
import EventDetailPage from '@/features/events/pages/EventDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="p-8 text-center">Sansaar Web — coming soon</div>} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailPage />} />
    </Routes>
  )
}

export default App
