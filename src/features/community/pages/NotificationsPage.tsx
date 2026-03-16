import { Badge, Button, Typography } from 'antd'
import {
  BellOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  TagOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockNotifications } from '../data/mockCommunity'
import type { Notification, NotificationType } from '../types/community.types'

const { Title, Text } = Typography

const typeConfig: Record<NotificationType, { icon: React.ReactNode; color: string }> = {
  event_reminder: { icon: <CalendarOutlined />, color: 'text-blue-500 bg-blue-50' },
  ticket_confirmed: { icon: <TagOutlined />, color: 'text-green-500 bg-green-50' },
  community_reply: { icon: <MessageOutlined />, color: 'text-purple-500 bg-purple-50' },
  event_update: { icon: <BellOutlined />, color: 'text-orange-500 bg-orange-50' },
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  return `${mins}m ago`
}

function NotificationItem({
  notification,
  onRead,
}: {
  notification: Notification
  onRead: (id: string) => void
}) {
  const navigate = useNavigate()
  const { icon, color } = typeConfig[notification.type]

  function handleClick() {
    onRead(notification.id)
    if (notification.linkTo) navigate(notification.linkTo)
  }

  return (
    <div
      onClick={handleClick}
      className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-colors ${
        notification.read ? 'bg-white hover:bg-neutral-50' : 'bg-blue-50/40 hover:bg-blue-50/60'
      } border border-neutral-200`}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Text strong style={{ fontSize: 14 }}>{notification.title}</Text>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Text type="secondary" style={{ fontSize: 12 }}>{timeAgo(notification.createdAt)}</Text>
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
            )}
          </div>
        </div>
        <Text type="secondary" style={{ fontSize: 13, lineHeight: 1.5, display: 'block', marginTop: 2 }}>
          {notification.description}
        </Text>
      </div>
    </div>
  )
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const unreadCount = notifications.filter(n => !n.read).length

  function markRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const today = notifications.filter(n => {
    const diff = Date.now() - new Date(n.createdAt).getTime()
    return diff < 1000 * 60 * 60 * 24
  })

  const earlier = notifications.filter(n => {
    const diff = Date.now() - new Date(n.createdAt).getTime()
    return diff >= 1000 * 60 * 60 * 24
  })

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-6 py-8">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Title level={2} style={{ margin: 0 }}>Notifications</Title>
            {unreadCount > 0 && (
              <Badge count={unreadCount} style={{ backgroundColor: '#262626' }} />
            )}
          </div>
          {unreadCount > 0 && (
            <Button icon={<CheckCircleOutlined />} onClick={markAllRead}>
              Mark all read
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6 flex flex-col gap-6">
        {today.length > 0 && (
          <div>
            <Text type="secondary" className="block mb-3 text-xs uppercase tracking-wide font-medium">
              Today
            </Text>
            <div className="flex flex-col gap-2">
              {today.map(n => (
                <NotificationItem key={n.id} notification={n} onRead={markRead} />
              ))}
            </div>
          </div>
        )}

        {earlier.length > 0 && (
          <div>
            <Text type="secondary" className="block mb-3 text-xs uppercase tracking-wide font-medium">
              Earlier
            </Text>
            <div className="flex flex-col gap-2">
              {earlier.map(n => (
                <NotificationItem key={n.id} notification={n} onRead={markRead} />
              ))}
            </div>
          </div>
        )}

        {notifications.length === 0 && (
          <div className="py-20 text-center">
            <BellOutlined className="text-4xl text-neutral-300 mb-3" />
            <Text type="secondary">No notifications yet</Text>
          </div>
        )}
      </div>
    </div>
  )
}
