import { Badge, Tag, Typography } from 'antd'
import { CalendarOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { Event } from '../types/event.types'

const { Text, Title } = Typography

const categoryColors: Record<Event['category'], string> = {
  music: 'purple',
  tech: 'blue',
  sports: 'green',
  arts: 'magenta',
  food: 'orange',
  business: 'geekblue',
}

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate()
  const spotsLeft = event.capacity - event.attendees
  const isSoldOut = spotsLeft <= 0
  const isAlmostFull = spotsLeft > 0 && spotsLeft <= 50

  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="bg-white border border-neutral-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Tag color={categoryColors[event.category]} className="capitalize m-0">
            {event.category}
          </Tag>
        </div>
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge status="error" text={<Text className="text-white font-medium">Sold Out</Text>} />
          </div>
        )}
      </div>

      <div className="p-4">
        <Title level={5} ellipsis={{ rows: 2 }} style={{ margin: '0 0 8px' }}>
          {event.title}
        </Title>

        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex items-center gap-1.5">
            <CalendarOutlined className="text-neutral-400 text-xs" />
            <Text type="secondary" style={{ fontSize: 13 }}>
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
              })}{' '}· {event.time}
            </Text>
          </div>
          <div className="flex items-center gap-1.5">
            <EnvironmentOutlined className="text-neutral-400 text-xs" />
            <Text type="secondary" style={{ fontSize: 13 }} ellipsis>
              {event.venue}, {event.location}
            </Text>
          </div>
          <div className="flex items-center gap-1.5">
            <TeamOutlined className="text-neutral-400 text-xs" />
            <Text type="secondary" style={{ fontSize: 13 }}>
              {event.attendees.toLocaleString()} attending
              {isAlmostFull && (
                <Text type="warning" style={{ fontSize: 13 }}> · Only {spotsLeft} spots left</Text>
              )}
            </Text>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <Text strong style={{ fontSize: 15 }}>
            {event.price === 0 ? 'Free' : `NPR ${event.price.toLocaleString()}`}
          </Text>
          <div className="flex gap-1 flex-wrap justify-end">
            {event.tags.slice(0, 2).map(tag => (
              <Tag key={tag} style={{ margin: 0, fontSize: 11 }}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
