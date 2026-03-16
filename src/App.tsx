import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import EventsPage from '@/features/events/pages/EventsPage'
import EventDetailPage from '@/features/events/pages/EventDetailPage'
import TicketRegistrationPage from '@/features/tickets/pages/TicketRegistrationPage'
import CheckoutPage from '@/features/tickets/pages/CheckoutPage'
import MyTicketsPage from '@/features/tickets/pages/MyTicketsPage'
import ProfilePage from '@/features/profile/pages/ProfilePage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailPage />} />
      <Route path="/tickets/register/:eventId" element={<TicketRegistrationPage />} />
      <Route path="/tickets/checkout/:eventId" element={<CheckoutPage />} />
      <Route path="/tickets/my-tickets" element={<MyTicketsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App
