import { Button, Divider, Form, Input, Radio, Result, Typography } from 'antd'
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  CreditCardOutlined,
  MobileOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import type { PaymentMethod } from '../types/ticket.types'
import type { Event } from '@/features/events/types/event.types'

const { Title, Text } = Typography

interface CheckoutState {
  selectedType: string
  quantity: number
  subtotal: number
  serviceFee: number
  total: number
  event: Event
}

const paymentMethods: { value: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { value: 'esewa', label: 'eSewa', icon: <MobileOutlined /> },
  { value: 'khalti', label: 'Khalti', icon: <MobileOutlined /> },
  { value: 'card', label: 'Credit / Debit Card', icon: <CreditCardOutlined /> },
]

export default function CheckoutPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as CheckoutState | null

  const [method, setMethod] = useState<PaymentMethod>('esewa')
  const [paid, setPaid] = useState(false)
  const [form] = Form.useForm()

  if (!state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Title level={3}>No order found</Title>
        <Button onClick={() => navigate('/events')}>Browse events</Button>
      </div>
    )
  }

  const { event, selectedType, quantity, subtotal, serviceFee, total } = state

  if (paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 max-w-md w-full text-center">
          <Result
            icon={<CheckCircleFilled style={{ color: '#22c55e', fontSize: 64 }} />}
            title="Payment Successful!"
            subTitle={`Your tickets for "${event.title}" are confirmed. Check your email for the booking confirmation.`}
            extra={[
              <Button key="tickets" type="primary" onClick={() => navigate('/tickets/my-tickets')}>
                View My Tickets
              </Button>,
              <Button key="events" onClick={() => navigate('/events')}>
                Browse More Events
              </Button>,
            ]}
          />
        </div>
      </div>
    )
  }

  function onConfirm() {
    form.validateFields().then(() => setPaid(true)).catch(() => {})
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate(`/tickets/register/${eventId}`)}
          className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-800 mb-6 text-sm transition-colors"
        >
          <ArrowLeftOutlined />
          Back to registration
        </button>

        <Title level={3} style={{ margin: '0 0 24px' }}>Checkout</Title>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-white border border-neutral-200 rounded-xl p-5">
              <Title level={5} style={{ margin: '0 0 16px' }}>Payment Method</Title>
              <Radio.Group
                value={method}
                onChange={e => setMethod(e.target.value as PaymentMethod)}
                className="w-full flex flex-col gap-3"
              >
                {paymentMethods.map(pm => (
                  <Radio key={pm.value} value={pm.value}>
                    <div className="flex items-center gap-2 ml-1">
                      {pm.icon}
                      <Text>{pm.label}</Text>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </div>

            {method === 'card' && (
              <div className="bg-white border border-neutral-200 rounded-xl p-5">
                <Title level={5} style={{ margin: '0 0 16px' }}>Card Details</Title>
                <Form form={form} layout="vertical" requiredMark={false}>
                  <Form.Item
                    name="cardNumber"
                    label="Card number"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="1234 5678 9012 3456" size="large" maxLength={19} />
                  </Form.Item>
                  <Form.Item
                    name="cardName"
                    label="Name on card"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="Alex Johnson" size="large" />
                  </Form.Item>
                  <div className="flex gap-3">
                    <Form.Item
                      name="expiry"
                      label="Expiry"
                      className="flex-1"
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input placeholder="MM / YY" size="large" maxLength={7} />
                    </Form.Item>
                    <Form.Item
                      name="cvv"
                      label="CVV"
                      className="flex-1"
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input.Password placeholder="•••" size="large" maxLength={4} />
                    </Form.Item>
                  </div>
                </Form>
              </div>
            )}

            {(method === 'esewa' || method === 'khalti') && (
              <div className="bg-white border border-neutral-200 rounded-xl p-5">
                <Title level={5} style={{ margin: '0 0 8px' }}>
                  {method === 'esewa' ? 'eSewa' : 'Khalti'} Payment
                </Title>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  You will be redirected to {method === 'esewa' ? 'eSewa' : 'Khalti'} to complete your payment of{' '}
                  <Text strong>NPR {total.toLocaleString()}</Text>.
                </Text>
              </div>
            )}

            <Button type="primary" size="large" block onClick={onConfirm}>
              Pay NPR {total.toLocaleString()}
            </Button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-neutral-200 rounded-xl p-5 sticky top-6">
              <Title level={5} style={{ margin: '0 0 12px' }}>Order Summary</Title>
              <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>
                {event.title}
              </Text>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <Text type="secondary" style={{ textTransform: 'capitalize' }}>
                    {selectedType} × {quantity}
                  </Text>
                  <Text>NPR {subtotal.toLocaleString()}</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">Service fee</Text>
                  <Text>NPR {serviceFee.toLocaleString()}</Text>
                </div>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div className="flex justify-between">
                <Text strong>Total</Text>
                <Text strong>NPR {total.toLocaleString()}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
