import { Input, Select, Empty, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { mockEvents } from '../data/mockEvents'
import EventCard from '../components/EventCard'
import type { Event } from '../types/event.types'

const { Title, Text } = Typography

const categories: { label: string; value: Event['category'] | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Music', value: 'music' },
  { label: 'Tech', value: 'tech' },
  { label: 'Sports', value: 'sports' },
  { label: 'Arts', value: 'arts' },
  { label: 'Food', value: 'food' },
  { label: 'Business', value: 'business' },
]

export default function EventsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Event['category'] | 'all'>('all')

  const filtered = mockEvents.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = category === 'all' || event.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <Title level={2} style={{ margin: '0 0 4px' }}>Discover Events</Title>
          <Text type="secondary">Find events happening around you</Text>

          <div className="flex gap-3 mt-6 flex-wrap">
            <Input
              prefix={<SearchOutlined className="text-neutral-400" />}
              placeholder="Search events, locations, tags…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="large"
              className="max-w-sm"
              allowClear
            />
            <Select
              value={category}
              onChange={setCategory}
              size="large"
              style={{ width: 160 }}
              options={categories}
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Text type="secondary" className="block mb-5">
          {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
        </Text>

        {filtered.length === 0 ? (
          <div className="py-20">
            <Empty description="No events match your search" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
