import { Button, Tag, Typography, Progress, Breadcrumb } from 'antd'
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { mockEvents } from '../data/mockEvents'

const { Title, Text, Paragraph } = Typography

const categoryColors: Record<string, string> = {
  music: 'purple',
  tech: 'blue',
  sports: 'green',
  arts: 'magenta',
  food: 'orange',
  business: 'geekblue',
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const event = mockEvents.find(e => e.id === id)

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Title level={3}>Event not found</Title>
        <Button onClick={() => navigate('/events')}>Back to events</Button>
      </div>
    )
  }

  const spotsLeft = event.capacity - event.attendees
  const fillPercent = Math.round((event.attendees / event.capacity) * 100)
  const isSoldOut = spotsLeft <= 0

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <Breadcrumb
          className="mb-4"
          items={[
            { title: <Link to="/events">Events</Link> },
            { title: event.title },
          ]}
        />

        <button
          onClick={() => navigate('/events')}
          className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-800 mb-6 text-sm transition-colors"
        >
          <ArrowLeftOutlined />
          Back to events
        </button>

        <div className="rounded-2xl overflow-hidden h-72 mb-8">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Tag color={categoryColors[event.category]} className="capitalize">
                {event.category}
              </Tag>
              {event.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>

            <Title level={2} style={{ margin: '0 0 16px' }}>{event.title}</Title>

            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2">
                <CalendarOutlined className="text-neutral-400" />
                <Text>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                  })}
                </Text>
              </div>
              <div className="flex items-center gap-2">
                <ClockCircleOutlined className="text-neutral-400" />
                <Text>{event.time}</Text>
              </div>
              <div className="flex items-center gap-2">
                <EnvironmentOutlined className="text-neutral-400" />
                <Text>{event.venue}, {event.location}</Text>
              </div>
              <div className="flex items-center gap-2">
                <TeamOutlined className="text-neutral-400" />
                <Text>{event.attendees.toLocaleString()} of {event.capacity.toLocaleString()} attending</Text>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <Title level={5}>About this event</Title>
              <Paragraph type="secondary" style={{ lineHeight: 1.8 }}>
                {event.description}
              </Paragraph>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-neutral-200 rounded-xl p-5 sticky top-6">
              <Text type="secondary" style={{ fontSize: 13 }}>Price</Text>
              <div className="my-1">
                <Title level={3} style={{ margin: 0 }}>
                  {event.price === 0 ? 'Free' : `NPR ${event.price.toLocaleString()}`}
                </Title>
              </div>

              <div className="my-4">
                <div className="flex justify-between mb-1">
                  <Text type="secondary" style={{ fontSize: 12 }}>Availability</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {isSoldOut ? 'Sold out' : `${spotsLeft} spots left`}
                  </Text>
                </div>
                <Progress
                  percent={fillPercent}
                  showInfo={false}
                  strokeColor={fillPercent >= 90 ? '#ef4444' : '#262626'}
                  size="small"
                />
              </div>

              <Button
                type="primary"
                size="large"
                block
                disabled={isSoldOut}
                onClick={() => navigate(`/tickets/register/${event.id}`)}
              >
                {isSoldOut ? 'Sold Out' : 'Register Now'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
