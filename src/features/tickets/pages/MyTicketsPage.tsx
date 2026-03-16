import { Badge, Button, Empty, Tabs, Tag, Typography } from 'antd'
import { CalendarOutlined, DownloadOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { mockTickets } from '../data/mockTickets'
import type { Ticket, TicketStatus } from '../types/ticket.types'

const { Title, Text } = Typography

const statusConfig: Record<TicketStatus, { color: string; label: string }> = {
  upcoming: { color: 'green', label: 'Upcoming' },
  attended: { color: 'default', label: 'Attended' },
  cancelled: { color: 'red', label: 'Cancelled' },
}

function TicketItem({ ticket }: { ticket: Ticket }) {
  const navigate = useNavigate()
  const { color, label } = statusConfig[ticket.status]

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden flex flex-col sm:flex-row">
      <div className="w-full sm:w-36 h-32 sm:h-auto flex-shrink-0">
        <img
          src={ticket.eventImageUrl}
          alt={ticket.eventTitle}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <Title
              level={5}
              style={{ margin: 0, cursor: 'pointer' }}
              onClick={() => navigate(`/events/${ticket.eventId}`)}
              className="hover:underline"
            >
              {ticket.eventTitle}
            </Title>
            <Tag color={color}>{label}</Tag>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-1.5">
              <CalendarOutlined className="text-neutral-400 text-xs" />
              <Text type="secondary" style={{ fontSize: 13 }}>
                {new Date(ticket.eventDate).toLocaleDateString('en-US', {
                  weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
                })} · {ticket.eventTime}
              </Text>
            </div>
            <div className="flex items-center gap-1.5">
              <EnvironmentOutlined className="text-neutral-400 text-xs" />
              <Text type="secondary" style={{ fontSize: 13 }}>{ticket.eventVenue}</Text>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100 flex-wrap gap-2">
          <div className="flex gap-3">
            <Text type="secondary" style={{ fontSize: 12 }}>
              Ref: <Text strong style={{ fontSize: 12 }}>{ticket.bookingRef}</Text>
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              <span className="capitalize">{ticket.ticketType}</span> × {ticket.quantity}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              NPR {ticket.totalPrice.toLocaleString()}
            </Text>
          </div>
          <Button size="small" icon={<DownloadOutlined />}>
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}

function TicketList({ tickets }: { tickets: Ticket[] }) {
  if (tickets.length === 0) {
    return (
      <div className="py-16">
        <Empty description="No tickets here" />
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4">
      {tickets.map(ticket => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  )
}

export default function MyTicketsPage() {
  const navigate = useNavigate()
  const upcoming = mockTickets.filter(t => t.status === 'upcoming')
  const past = mockTickets.filter(t => t.status === 'attended')
  const cancelled = mockTickets.filter(t => t.status === 'cancelled')

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <Title level={2} style={{ margin: '0 0 4px' }}>My Tickets</Title>
          <Text type="secondary">All your event registrations in one place</Text>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6">
        <Tabs
          defaultActiveKey="upcoming"
          items={[
            {
              key: 'upcoming',
              label: (
                <span>
                  Upcoming{' '}
                  {upcoming.length > 0 && (
                    <Badge count={upcoming.length} style={{ backgroundColor: '#262626' }} />
                  )}
                </span>
              ),
              children: <TicketList tickets={upcoming} />,
            },
            {
              key: 'past',
              label: 'Past',
              children: <TicketList tickets={past} />,
            },
            {
              key: 'cancelled',
              label: 'Cancelled',
              children: <TicketList tickets={cancelled} />,
            },
          ]}
        />

        <div className="mt-8 text-center">
          <Button type="primary" onClick={() => navigate('/events')}>
            Browse More Events
          </Button>
        </div>
      </div>
    </div>
  )
}
