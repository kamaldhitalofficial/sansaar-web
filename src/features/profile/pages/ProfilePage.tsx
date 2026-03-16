import { Avatar, Button, Divider, Form, Input, message, Tabs, Tag, Typography } from 'antd'
import {
  CalendarOutlined,
  EnvironmentOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockProfile } from '../data/mockProfile'
import { mockTickets } from '@/features/tickets/data/mockTickets'
import type { UserProfile } from '../types/profile.types'
import type { TicketStatus } from '@/features/tickets/types/ticket.types'

const { Title, Text } = Typography

const statusColors: Record<TicketStatus, string> = {
  upcoming: 'green',
  attended: 'default',
  cancelled: 'red',
}

function PersonalInfoTab() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [form] = Form.useForm<UserProfile>()
  const [passwordForm] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  function onSaveInfo(values: UserProfile) {
    setProfile(prev => ({ ...prev, ...values }))
    messageApi.success('Profile updated successfully')
  }

  function onChangePassword(values: { current: string; next: string }) {
    console.log('Password change:', values)
    passwordForm.resetFields()
    messageApi.success('Password changed successfully')
  }

  return (
    <>
      {contextHolder}
      <div className="flex flex-col gap-5">
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <Title level={5} style={{ margin: '0 0 20px' }}>Personal Information</Title>
          <Form
            form={form}
            layout="vertical"
            initialValues={profile}
            onFinish={onSaveInfo}
            requiredMark={false}
          >
            <div className="flex gap-3">
              <Form.Item
                name="firstName"
                label="First name"
                className="flex-1"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last name"
                className="flex-1"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input size="large" />
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Required' },
                { type: 'email', message: 'Enter a valid email' },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item name="phone" label="Phone number">
              <Input size="large" placeholder="+977 98XXXXXXXX" />
            </Form.Item>
            <Form.Item name="location" label="Location">
              <Input size="large" placeholder="City, Country" />
            </Form.Item>
            <Form.Item name="bio" label="Bio">
              <Input.TextArea
                rows={3}
                placeholder="Tell us a bit about yourself…"
                maxLength={200}
                showCount
              />
            </Form.Item>
            <Form.Item style={{ margin: 0 }}>
              <Button type="primary" htmlType="submit">Save changes</Button>
            </Form.Item>
          </Form>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <Title level={5} style={{ margin: '0 0 4px' }}>Change Password</Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Use a strong password you don't use elsewhere.
          </Text>
          <Divider style={{ margin: '16px 0' }} />
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={onChangePassword}
            requiredMark={false}
          >
            <Form.Item
              name="current"
              label="Current password"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input.Password prefix={<LockOutlined />} size="large" />
            </Form.Item>
            <Form.Item
              name="next"
              label="New password"
              rules={[
                { required: true, message: 'Required' },
                { min: 8, message: 'At least 8 characters' },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} size="large" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm new password"
              dependencies={['next']}
              rules={[
                { required: true, message: 'Required' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('next') === value) return Promise.resolve()
                    return Promise.reject(new Error('Passwords do not match'))
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} size="large" />
            </Form.Item>
            <Form.Item style={{ margin: 0 }}>
              <Button htmlType="submit">Update password</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

function BookingHistoryTab() {
  const navigate = useNavigate()

  const stats = {
    total: mockTickets.length,
    upcoming: mockTickets.filter(t => t.status === 'upcoming').length,
    attended: mockTickets.filter(t => t.status === 'attended').length,
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Bookings', value: stats.total },
          { label: 'Upcoming', value: stats.upcoming },
          { label: 'Attended', value: stats.attended },
        ].map(stat => (
          <div
            key={stat.label}
            className="bg-white border border-neutral-200 rounded-xl p-4 text-center"
          >
            <div className="text-2xl font-semibold text-neutral-800">{stat.value}</div>
            <Text type="secondary" style={{ fontSize: 13 }}>{stat.label}</Text>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {mockTickets.map(ticket => (
          <div
            key={ticket.id}
            className="bg-white border border-neutral-200 rounded-xl p-4 flex gap-4 items-center"
          >
            <img
              src={ticket.eventImageUrl}
              alt={ticket.eventTitle}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Text
                  strong
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate(`/events/${ticket.eventId}`)}
                >
                  {ticket.eventTitle}
                </Text>
                <Tag color={statusColors[ticket.status]} style={{ margin: 0 }}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </Tag>
              </div>
              <div className="flex gap-3 mt-1 flex-wrap">
                <div className="flex items-center gap-1">
                  <CalendarOutlined className="text-neutral-400 text-xs" />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {new Date(ticket.eventDate).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </Text>
                </div>
                <div className="flex items-center gap-1">
                  <EnvironmentOutlined className="text-neutral-400 text-xs" />
                  <Text type="secondary" style={{ fontSize: 12 }}>{ticket.eventVenue}</Text>
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <Text strong style={{ fontSize: 13 }}>
                NPR {ticket.totalPrice.toLocaleString()}
              </Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {ticket.quantity} ticket{ticket.quantity > 1 ? 's' : ''}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-6 py-8">
        <div className="max-w-3xl mx-auto flex items-center gap-5">
          <Avatar
            size={72}
            src={mockProfile.avatarUrl}
            icon={<UserOutlined />}
            className="flex-shrink-0 border border-neutral-200"
          />
          <div>
            <Title level={3} style={{ margin: '0 0 2px' }}>
              {mockProfile.firstName} {mockProfile.lastName}
            </Title>
            <Text type="secondary">{mockProfile.email}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Member since{' '}
              {new Date(mockProfile.joinedAt).toLocaleDateString('en-US', {
                month: 'long', year: 'numeric',
              })}
            </Text>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6">
        <Tabs
          defaultActiveKey="info"
          items={[
            {
              key: 'info',
              label: 'Personal Info',
              children: <PersonalInfoTab />,
            },
            {
              key: 'bookings',
              label: 'Booking History',
              children: <BookingHistoryTab />,
            },
          ]}
        />
      </div>
    </div>
  )
}
