export interface Event {
  id: string
  title: string
  description: string
  category: 'music' | 'tech' | 'sports' | 'arts' | 'food' | 'business'
  date: string
  time: string
  location: string
  venue: string
  price: number
  imageUrl: string
  tags: string[]
  attendees: number
  capacity: number
}
