import { Button, Form, Input, InputNumber, Radio, Typography, Divider } from 'antd'
import { ArrowLeftOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockEvents } from '@/features/events/data/mockEvents'
import { getTicketTiers } from '../data/mockTickets'
import type { TicketType } from '../types/ticket.types'

const { Title, Text } = Typography

interface AttendeeFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export default function TicketRegistrationPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm<AttendeeFormValues>()

  const event = mockEvents.find(e => e.id === eventId)
  const tiers = getTicketTiers(eventId ?? '')

  const [selectedType, setSelectedType] = useState<TicketType>(tiers[0].type)
  const [quantity, setQuantity] = useState(1)

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Title level={3}>Event not found</Title>
        <Button onClick={() => navigate('/events')}>Back to events</Button>
      </div>
    )
  }

  const selectedTier = tiers.find(t => t.type === selectedType) ?? tiers[0]
  const subtotal = selectedTier.price * quantity
  const serviceFee = Math.round(subtotal * 0.05)
  const total = subtotal + serviceFee

  function onFinish() {
    navigate(`/tickets/checkout/${eventId}`, {
      state: { selectedType, quantity, subtotal, serviceFee, total, event },
    })
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate(`/events/${eventId}`)}
          className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-800 mb-6 text-sm transition-colors"
        >
          <ArrowLeftOutlined />
          Back to event
        </button>

        <Title level={3} style={{ margin: '0 0 24px' }}>Register for Event</Title>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-white border border-neutral-200 rounded-xl p-5">
              <Title level={5} style={{ margin: '0 0 4px' }}>{event.title}</Title>
              <Text type="secondary" style={{ fontSize: 13 }}>
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
                })} · {event.time} · {event.venue}
              </Text>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-5">
              <Title level={5} style={{ margin: '0 0 16px' }}>Select Ticket Type</Title>
              <Radio.Group
                value={selectedType}
                onChange={e => setSelectedType(e.target.value as TicketType)}
                className="w-full flex flex-col gap-3"
              >
                {tiers.map(tier => (
                  <Radio
                    key={tier.type}
                    value={tier.type}
                    className="w-full"
                    disabled={tier.available === 0}
                  >
                    <div className="flex justify-between items-start ml-1">
                      <div>
                        <Text strong>{tier.label}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>{tier.description}</Text>
                      </div>
                      <Text strong className="ml-4 whitespace-nowrap">
                        {tier.price === 0 ? 'Free' : `NPR ${tier.price.toLocaleString()}`}
                      </Text>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-5">
              <Title level={5} style={{ margin: '0 0 16px' }}>Quantity</Title>
              <div className="flex items-center gap-3">
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                />
                <InputNumber
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={v => setQuantity(v ?? 1)}
                  controls={false}
                  style={{ width: 60, textAlign: 'center' }}
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setQuantity(q => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                />
                <Text type="secondary" style={{ fontSize: 13 }}>Max 10 per order</Text>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-5">
              <Title level={5} style={{ margin: '0 0 16px' }}>Attendee Information</Title>
              <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
                <div className="flex gap-3">
                  <Form.Item
                    name="firstName"
                    label="First name"
                    className="flex-1"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="Alex" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    label="Last name"
                    className="flex-1"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="Johnson" size="large" />
                  </Form.Item>
                </div>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Enter a valid email' },
                  ]}
                >
                  <Input placeholder="you@example.com" size="large" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone number"
                  rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                  <Input placeholder="+977 98XXXXXXXX" size="large" />
                </Form.Item>
                <Form.Item style={{ margin: 0 }}>
                  <Button type="primary" htmlType="submit" size="large" block>
                    Proceed to Checkout
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-neutral-200 rounded-xl p-5 sticky top-6">
              <Title level={5} style={{ margin: '0 0 16px' }}>Order Summary</Title>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <Text type="secondary">{selectedTier.label} × {quantity}</Text>
                  <Text>NPR {subtotal.toLocaleString()}</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">Service fee (5%)</Text>
                  <Text>NPR {serviceFee.toLocaleString()}</Text>
                </div>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div className="flex justify-between">
                <Text strong>Total</Text>
                <Text strong>NPR {total.toLocaleString()}</Text>
              </div>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 8 }}>
                Tickets will be sent to your email after payment.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
