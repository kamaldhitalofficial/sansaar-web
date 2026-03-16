import { Avatar, Badge, Button, Modal, Progress, Tag, Typography, Input, message } from 'antd'
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  GiftOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockRoles } from '../data/mockVolunteering'
import type { VolunteerCategory, VolunteerRole } from '../types/volunteering.types'

const { Title, Text } = Typography
const { TextArea } = Input

type FilterCategory = VolunteerCategory | 'all'

const categoryFilters: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Registration', value: 'registration' },
  { label: 'Logistics', value: 'logistics' },
  { label: 'Hospitality', value: 'hospitality' },
  { label: 'Technical', value: 'technical' },
  { label: 'First Aid', value: 'first_aid' },
  { label: 'Media', value: 'media' },
]

const categoryColors: Record<VolunteerCategory, string> = {
  registration: 'blue',
  logistics: 'purple',
  hospitality: 'green',
  technical: 'orange',
  first_aid: 'red',
  media: 'cyan',
}

const categoryLabels: Record<VolunteerCategory, string> = {
  registration: 'Registration',
  logistics: 'Logistics',
  hospitality: 'Hospitality',
  technical: 'Technical',
  first_aid: 'First Aid',
  media: 'Media',
}

function RoleCard({
  role,
  onApply,
  applied,
}: {
  role: VolunteerRole
  onApply: (role: VolunteerRole) => void
  applied: boolean
}) {
  const navigate = useNavigate()
  const slotsLeft = role.slotsTotal - role.slotsFilled
  const full = slotsLeft <= 0
  const fillPercent = Math.round((role.slotsFilled / role.slotsTotal) * 100)

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
      <div
        className="h-36 bg-neutral-100 bg-cover bg-center cursor-pointer relative"
        style={{ backgroundImage: `url(${role.eventImageUrl})` }}
        onClick={() => navigate(`/events/${role.eventId}`)}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <Text className="text-white font-semibold text-sm block leading-tight">{role.eventTitle}</Text>
            <div className="flex items-center gap-1 mt-0.5">
              <EnvironmentOutlined className="text-white/80 text-xs" />
              <Text className="text-white/80 text-xs">{role.eventLocation}</Text>
            </div>
          </div>
          <Tag color={categoryColors[role.category]} style={{ margin: 0, fontSize: 11 }}>
            {categoryLabels[role.category]}
          </Tag>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Title level={5} style={{ margin: 0, fontSize: 15 }}>{role.roleName}</Title>
        </div>

        <Text type="secondary" style={{ fontSize: 13, lineHeight: 1.6, display: 'block', marginBottom: 12 }}>
          {role.description}
        </Text>

        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            <CalendarOutlined />
            <span>{new Date(role.eventDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            <ClockCircleOutlined />
            <span>{role.timeCommitment}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            <TeamOutlined />
            <span>{slotsLeft > 0 ? `${slotsLeft} of ${role.slotsTotal} spots left` : 'Fully booked'}</span>
          </div>
        </div>

        <Progress
          percent={fillPercent}
          showInfo={false}
          strokeColor={full ? '#ef4444' : '#262626'}
          trailColor="#e5e7eb"
          size="small"
          style={{ marginBottom: 12 }}
        />

        <div className="flex flex-wrap gap-1.5 mb-4">
          {role.perks.map(perk => (
            <div key={perk} className="flex items-center gap-1 bg-neutral-50 border border-neutral-200 rounded-full px-2.5 py-0.5">
              <GiftOutlined className="text-neutral-400 text-xs" />
              <Text style={{ fontSize: 11 }}>{perk}</Text>
            </div>
          ))}
        </div>

        <Button
          type="primary"
          block
          disabled={full || applied}
          onClick={() => onApply(role)}
        >
          {applied ? 'Applied' : full ? 'Fully Booked' : 'Apply to Volunteer'}
        </Button>
      </div>
    </div>
  )
}

export default function VolunteeringPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all')
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set(['r1']))
  const [modalRole, setModalRole] = useState<VolunteerRole | null>(null)
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const filtered = activeCategory === 'all'
    ? mockRoles
    : mockRoles.filter(r => r.category === activeCategory)

  function openApply(role: VolunteerRole) {
    setModalRole(role)
    setNote('')
  }

  function submitApplication() {
    if (!modalRole) return
    setSubmitting(true)
    setTimeout(() => {
      setAppliedIds(prev => new Set([...prev, modalRole.id]))
      setModalRole(null)
      setSubmitting(false)
      message.success("Application submitted! We'll be in touch soon.")
    }, 800)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <Title level={2} style={{ margin: '0 0 4px' }}>Volunteer</Title>
            <Text type="secondary">Give back to the community and get exclusive perks</Text>
          </div>
          <Button onClick={() => navigate('/volunteering/my-applications')} icon={<UserOutlined />}>
            My Applications
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex gap-2 flex-wrap mb-6">
          {categoryFilters.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                activeCategory === cat.value
                  ? 'bg-neutral-800 text-white border-neutral-800'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <Text type="secondary" style={{ fontSize: 13 }}>{filtered.length} role{filtered.length !== 1 ? 's' : ''} available</Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(role => (
            <RoleCard
              key={role.id}
              role={role}
              onApply={openApply}
              applied={appliedIds.has(role.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <Text type="secondary">No volunteer roles in this category yet.</Text>
          </div>
        )}
      </div>

      <Modal
        title={`Apply — ${modalRole?.roleName}`}
        open={!!modalRole}
        onCancel={() => setModalRole(null)}
        onOk={submitApplication}
        okText="Submit Application"
        confirmLoading={submitting}
      >
        {modalRole && (
          <div className="flex flex-col gap-4 mt-3">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 flex gap-3">
              <Avatar
                shape="square"
                size={48}
                src={modalRole.eventImageUrl}
                className="flex-shrink-0 rounded-lg"
              />
              <div>
                <Text strong style={{ fontSize: 14, display: 'block' }}>{modalRole.eventTitle}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>{modalRole.eventVenue}</Text>
                <div className="flex items-center gap-1 mt-1">
                  <ClockCircleOutlined className="text-neutral-400 text-xs" />
                  <Text type="secondary" style={{ fontSize: 12 }}>{modalRole.timeCommitment}</Text>
                </div>
              </div>
            </div>

            <div>
              <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>
                Perks you'll receive
              </Text>
              <div className="flex flex-wrap gap-1.5">
                {modalRole.perks.map(perk => (
                  <Badge key={perk} color="#262626" text={<Text style={{ fontSize: 12 }}>{perk}</Text>} />
                ))}
              </div>
            </div>

            <div>
              <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>
                Why do you want to volunteer? <Text type="secondary">(optional)</Text>
              </Text>
              <TextArea
                rows={3}
                placeholder="Share any relevant experience or motivation..."
                value={note}
                onChange={e => setNote(e.target.value)}
                maxLength={300}
                showCount
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
