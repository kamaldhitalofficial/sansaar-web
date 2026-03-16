export type VolunteerCategory = 'registration' | 'logistics' | 'hospitality' | 'technical' | 'first_aid' | 'media'

export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

export interface VolunteerRole {
  id: string
  eventId: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventVenue: string
  eventLocation: string
  eventImageUrl: string
  roleName: string
  category: VolunteerCategory
  description: string
  timeCommitment: string
  slotsTotal: number
  slotsFilled: number
  perks: string[]
}

export interface VolunteerApplication {
  id: string
  roleId: string
  roleName: string
  eventId: string
  eventTitle: string
  eventDate: string
  eventVenue: string
  eventImageUrl: string
  status: ApplicationStatus
  appliedAt: string
  note?: string
}
