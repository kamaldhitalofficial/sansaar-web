import type { Ticket, TicketTier } from '../types/ticket.types'

export const mockTickets: Ticket[] = [
  {
    id: 't1',
    eventId: '1',
    eventTitle: 'Kathmandu Tech Summit 2026',
    eventDate: '2026-04-15',
    eventTime: '09:00 AM',
    eventVenue: 'Hyatt Regency Kathmandu',
    eventImageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
    ticketType: 'general',
    quantity: 2,
    totalPrice: 5000,
    status: 'upcoming',
    bookingRef: 'SNS-2026-001',
    purchasedAt: '2026-03-10T10:30:00Z',
  },
  {
    id: 't2',
    eventId: '2',
    eventTitle: 'Himalayan Music Festival',
    eventDate: '2026-05-02',
    eventTime: '04:00 PM',
    eventVenue: 'Fewa Lakeside Grounds',
    eventImageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop',
    ticketType: 'vip',
    quantity: 1,
    totalPrice: 3000,
    status: 'upcoming',
    bookingRef: 'SNS-2026-002',
    purchasedAt: '2026-03-12T14:00:00Z',
  },
  {
    id: 't3',
    eventId: '6',
    eventTitle: 'Kathmandu Half Marathon',
    eventDate: '2025-11-18',
    eventTime: '06:00 AM',
    eventVenue: 'Tundikhel Grounds',
    eventImageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop',
    ticketType: 'general',
    quantity: 1,
    totalPrice: 1000,
    status: 'attended',
    bookingRef: 'SNS-2025-088',
    purchasedAt: '2025-10-20T09:00:00Z',
  },
]

export const ticketTiersByEvent: Record<string, TicketTier[]> = {
  default: [
    {
      type: 'general',
      label: 'General Admission',
      price: 2500,
      description: 'Access to all general sessions and networking areas.',
      available: 160,
    },
    {
      type: 'vip',
      label: 'VIP',
      price: 5000,
      description: 'Priority seating, VIP lounge, and exclusive speaker meet & greet.',
      available: 20,
    },
    {
      type: 'student',
      label: 'Student',
      price: 1000,
      description: 'Valid student ID required at entry.',
      available: 50,
    },
  ],
}

export function getTicketTiers(eventId: string): TicketTier[] {
  return ticketTiersByEvent[eventId] ?? ticketTiersByEvent['default']
}
