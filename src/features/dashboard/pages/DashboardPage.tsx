import { Avatar, Button, Progress, Tag, Typography } from 'antd'
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  RightOutlined,
  TagOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { mockProfile } from '@/features/profile/data/mockProfile'
import { mockTickets } from '@/features/tickets/data/mockTickets'
import { mockEvents } from '@/features/events/data/mockEvents'
import EventCard from '@/features/events/components/EventCard'

const { Title, Text } = Typography

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardPage() {
  const navigate = useNavigate()

  const upcomingTickets = mockTickets.filter(t => t.status === 'upcoming')
  const attendedCount = mockTickets.filter(t => t.status === 'attended').length
  const totalSpent = mockTickets.reduce((sum, t) => sum + t.totalPrice, 0)

  const nextEvent = upcomingTickets
    .slice()
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())[0]

  const featuredEvents = mockEvents.slice(0, 3)

  const stats = [
    {
      icon: <TagOutlined className="text-blue-500 text-xl" />,
      label: 'Upcoming Events',
      value: upcomingTickets.length,
      bg: 'bg-blue-50',
    },
    {
      icon: <TrophyOutlined className="text-emerald-500 text-xl" />,
      label: 'Events Attended',
      value: attendedCount,
      bg: 'bg-emerald-50',
    },
    {
      icon: <CalendarOutlined className="text-violet-500 text-xl" />,
      label: 'Total Bookings',
      value: mockTickets.length,
      bg: 'bg-violet-50',
    },
    {
      icon: <TagOutlined className="text-amber-500 text-xl" />,
      label: 'Total Spent (NPR)',
      value: totalSpent.toLocaleString(),
      bg: 'bg-amber-50',
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <Avatar
              size={56}
              src={mockProfile.avatarUrl}
              icon={<UserOutlined />}
              className="border border-neutral-200 flex-shrink-0"
            />
            <div>
              <Text type="secondary" style={{ fontSize: 13 }}>{getGreeting()},</Text>
              <Title level={3} style={{ margin: 0 }}>
                {mockProfile.firstName} {mockProfile.lastName} 👋
              </Title>
            </div>
          </div>
          <Button type="primary" size="large" onClick={() => navigate('/events')}>
            Browse Events
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-xl p-4 flex flex-col gap-2`}
            >
              <div>{stat.icon}</div>
              <div className="text-2xl font-semibold text-neutral-800">{stat.value}</div>
              <Text type="secondary" style={{ fontSize: 12 }}>{stat.label}</Text>
            </div>
          ))}
        </div>

        {/* Next Event Countdown */}
        {nextEvent && (
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Title level={5} style={{ margin: 0 }}>Your Next Event</Title>
              <Button
                type="link"
                size="small"
                icon={<RightOutlined />}
                iconPosition="end"
                onClick={() => navigate('/tickets/my-tickets')}
              >
                All tickets
              </Button>
            </div>
            <div className="flex gap-4 items-center flex-wrap">
              <img
                src={nextEvent.eventImageUrl}
                alt={nextEvent.eventTitle}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Title
                  level={5}
                  style={{ margin: '0 0 6px', cursor: 'pointer' }}
                  onClick={() => navigate(`/events/${nextEvent.eventId}`)}
                  className="hover:underline"
                >
                  {nextEvent.eventTitle}
                </Title>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <CalendarOutlined className="text-neutral-400 text-xs" />
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {new Date(nextEvent.eventDate).toLocaleDateString('en-US', {
                        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                      })}{' '}· {nextEvent.eventTime}
                    </Text>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <EnvironmentOutlined className="text-neutral-400 text-xs" />
                    <Text type="secondary" style={{ fontSize: 13 }}>{nextEvent.eventVenue}</Text>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ClockCircleOutlined className="text-neutral-400 text-xs" />
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {Math.ceil(
                        (new Date(nextEvent.eventDate).getTime() - Date.now()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days away
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <Tag color="green" style={{ margin: 0 }}>Upcoming</Tag>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {nextEvent.quantity} ticket{nextEvent.quantity > 1 ? 's' : ''}
                </Text>
                <Text strong style={{ fontSize: 13 }}>
                  NPR {nextEvent.totalPrice.toLocaleString()}
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Schedule */}
        {upcomingTickets.length > 1 && (
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <Title level={5} style={{ margin: '0 0 16px' }}>Upcoming Schedule</Title>
            <div className="flex flex-col divide-y divide-neutral-100">
              {upcomingTickets
                .slice()
                .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
                .map(ticket => {
                  const eventDate = new Date(ticket.eventDate)
                  const daysUntil = Math.ceil(
                    (eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  )
                  return (
                    <div
                      key={ticket.id}
                      className="flex items-center gap-4 py-3 cursor-pointer hover:bg-neutral-50 -mx-6 px-6 transition-colors"
                      onClick={() => navigate(`/events/${ticket.eventId}`)}
                    >
                      <div className="w-12 text-center flex-shrink-0">
                        <div className="text-lg font-semibold text-neutral-800 leading-none">
                          {eventDate.getDate()}
                        </div>
                        <div className="text-xs text-neutral-400 uppercase">
                          {eventDate.toLocaleString('en-US', { month: 'short' })}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <Text strong ellipsis>{ticket.eventTitle}</Text>
                        <div className="flex items-center gap-1 mt-0.5">
                          <EnvironmentOutlined className="text-neutral-400" style={{ fontSize: 11 }} />
                          <Text type="secondary" style={{ fontSize: 12 }}>{ticket.eventVenue}</Text>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <Text
                          type="secondary"
                          style={{ fontSize: 12 }}
                          className={daysUntil <= 7 ? 'text-orange-500' : ''}
                        >
                          {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
                        </Text>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {/* Activity Summary */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <Title level={5} style={{ margin: '0 0 16px' }}>Activity Summary</Title>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between mb-1">
                <Text style={{ fontSize: 13 }}>Events attended</Text>
                <Text strong style={{ fontSize: 13 }}>{attendedCount} / {mockTickets.length}</Text>
              </div>
              <Progress
                percent={mockTickets.length > 0 ? Math.round((attendedCount / mockTickets.length) * 100) : 0}
                showInfo={false}
                strokeColor="#10b981"
                size="small"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <Text style={{ fontSize: 13 }}>Tickets used</Text>
                <Text strong style={{ fontSize: 13 }}>
                  {mockTickets.filter(t => t.status === 'attended').reduce((s, t) => s + t.quantity, 0)} tickets
                </Text>
              </div>
              <Progress
                percent={65}
                showInfo={false}
                strokeColor="#6366f1"
                size="small"
              />
            </div>
          </div>
        </div>

        {/* Featured Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Title level={5} style={{ margin: 0 }}>Featured Events</Title>
            <Button
              type="link"
              size="small"
              icon={<RightOutlined />}
              iconPosition="end"
              onClick={() => navigate('/events')}
            >
              See all
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <Title level={5} style={{ margin: '0 0 16px' }}>Quick Actions</Title>
          <div className="flex gap-3 flex-wrap">
            <Button icon={<CalendarOutlined />} onClick={() => navigate('/events')}>
              Browse Events
            </Button>
            <Button icon={<TagOutlined />} onClick={() => navigate('/tickets/my-tickets')}>
              My Tickets
            </Button>
            <Button icon={<UserOutlined />} onClick={() => navigate('/profile')}>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
