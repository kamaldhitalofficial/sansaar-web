export type TicketType = 'general' | 'vip' | 'student'
export type TicketStatus = 'upcoming' | 'attended' | 'cancelled'
export type PaymentMethod = 'esewa' | 'khalti' | 'card'

export interface TicketTier {
  type: TicketType
  label: string
  price: number
  description: string
  available: number
}

export interface Ticket {
  id: string
  eventId: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventVenue: string
  eventImageUrl: string
  ticketType: TicketType
  quantity: number
  totalPrice: number
  status: TicketStatus
  bookingRef: string
  purchasedAt: string
}
