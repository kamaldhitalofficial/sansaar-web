export type PostCategory = 'general' | 'events' | 'help' | 'announcements'
export type NotificationType = 'event_reminder' | 'ticket_confirmed' | 'community_reply' | 'event_update'

export interface Post {
  id: string
  authorName: string
  authorAvatar: string
  category: PostCategory
  content: string
  linkedEventId?: string
  linkedEventTitle?: string
  likes: number
  comments: number
  createdAt: string
  liked: boolean
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  createdAt: string
  read: boolean
  linkTo?: string
}
