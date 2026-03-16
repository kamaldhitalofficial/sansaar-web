import { Button, Tag, Typography } from 'antd'
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
  HourglassOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockApplications } from '../data/mockVolunteering'
import type { ApplicationStatus, VolunteerApplication } from '../types/volunteering.types'

const { Title, Text } = Typography

const statusConfig: Record<ApplicationStatus, { label: string; color: string; icon: React.ReactNode }> = {
  approved: { label: 'Approved', color: 'success', icon: <CheckCircleOutlined /> },
  pending:  { label: 'Pending',  color: 'warning', icon: <HourglassOutlined /> },
  rejected: { label: 'Rejected', color: 'error',   icon: <CloseCircleOutlined /> },
}

function ApplicationCard({ application }: { application: VolunteerApplication }) {
  const navigate = useNavigate()
  const { label, color, icon } = statusConfig[application.status]

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden flex flex-col sm:flex-row">
      <div
        className="w-full sm:w-32 h-28 sm:h-auto bg-cover bg-center flex-shrink-0 cursor-pointer"
        style={{ backgroundImage: `url(${application.eventImageUrl})` }}
        onClick={() => navigate(`/events/${application.eventId}`)}
      />
      <div className="p-5 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
          <div>
            <Text strong style={{ fontSize: 15, display: 'block' }}>{application.roleName}</Text>
            <Text
              type="secondary"
              style={{ fontSize: 13, cursor: 'pointer' }}
              className="hover:underline"
              onClick={() => navigate(`/events/${application.eventId}`)}
            >
              {application.eventTitle}
            </Text>
          </div>
          <Tag icon={icon} color={color} style={{ margin: 0 }}>{label}</Tag>
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            <CalendarOutlined />
            <span>{new Date(application.eventDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            <EnvironmentOutlined />
            <span>{application.eventVenue}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            <ClockCircleOutlined />
            <span>Applied {new Date(application.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {application.note && (
          <div className="mt-3 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2">
            <Text type="secondary" style={{ fontSize: 12, fontStyle: 'italic' }}>"{application.note}"</Text>
          </div>
        )}

        {application.status === 'approved' && (
          <div className="mt-3 inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
            <CheckCircleOutlined className="text-green-600 text-xs" />
            <Text style={{ fontSize: 12, color: '#16a34a' }}>You're confirmed! See you at the event.</Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MyVolunteeringPage() {
  const navigate = useNavigate()
  const [applications] = useState(mockApplications)

  const approved = applications.filter(a => a.status === 'approved')
  const pending  = applications.filter(a => a.status === 'pending')
  const rejected = applications.filter(a => a.status === 'rejected')

  const sections = [
    { label: 'Approved', items: approved },
    { label: 'Pending',  items: pending  },
    { label: 'Rejected', items: rejected },
  ].filter(s => s.items.length > 0)

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/volunteering')}
            className="mb-4 -ml-2"
            style={{ color: '#737373' }}
          >
            Back to Opportunities
          </Button>
          <Title level={2} style={{ margin: '0 0 4px' }}>My Applications</Title>
          <Text type="secondary">{applications.length} application{applications.length !== 1 ? 's' : ''} submitted</Text>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col gap-8">
        {sections.map(section => (
          <div key={section.label}>
            <Text type="secondary" className="block mb-3 text-xs uppercase tracking-wide font-medium">
              {section.label} · {section.items.length}
            </Text>
            <div className="flex flex-col gap-3">
              {section.items.map(app => (
                <ApplicationCard key={app.id} application={app} />
              ))}
            </div>
          </div>
        ))}

        {applications.length === 0 && (
          <div className="py-20 text-center">
            <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>You haven't applied to any volunteer roles yet.</Text>
            <Button type="primary" onClick={() => navigate('/volunteering')}>
              Browse Opportunities
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
