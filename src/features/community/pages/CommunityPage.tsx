import { Avatar, Button, Divider, Modal, Input, Tag, Typography } from 'antd'
import {
  LikeOutlined,
  LikeFilled,
  MessageOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockPosts } from '../data/mockCommunity'
import type { Post, PostCategory } from '../types/community.types'

const { Title, Text } = Typography
const { TextArea } = Input

const categories: { label: string; value: PostCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Announcements', value: 'announcements' },
  { label: 'Events', value: 'events' },
  { label: 'General', value: 'general' },
  { label: 'Help', value: 'help' },
]

const categoryColors: Record<PostCategory, string> = {
  announcements: 'blue',
  events: 'purple',
  general: 'default',
  help: 'orange',
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  return `${mins}m ago`
}

function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(post.liked)
  const [likes, setLikes] = useState(post.likes)

  function toggleLike() {
    setLiked(l => !l)
    setLikes(c => liked ? c - 1 : c + 1)
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <Avatar src={post.authorAvatar} icon={<UserOutlined />} size={40} className="flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Text strong style={{ fontSize: 14 }}>{post.authorName}</Text>
            <Tag color={categoryColors[post.category]} style={{ margin: 0, fontSize: 11 }} className="capitalize">
              {post.category}
            </Tag>
            <Text type="secondary" style={{ fontSize: 12 }}>{timeAgo(post.createdAt)}</Text>
          </div>

          <Text style={{ fontSize: 14, lineHeight: 1.6, display: 'block', whiteSpace: 'pre-wrap' }}>
            {post.content}
          </Text>

          {post.linkedEventId && post.linkedEventTitle && (
            <div
              className="mt-3 flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-neutral-100 transition-colors"
              onClick={() => navigate(`/events/${post.linkedEventId}`)}
            >
              <Text type="secondary" style={{ fontSize: 11 }}>Linked event</Text>
              <Text style={{ fontSize: 13 }} className="hover:underline">{post.linkedEventTitle}</Text>
            </div>
          )}

          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={toggleLike}
              className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-800 transition-colors text-sm"
            >
              {liked
                ? <LikeFilled style={{ color: '#262626' }} />
                : <LikeOutlined />}
              <span>{likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-800 transition-colors text-sm">
              <MessageOutlined />
              <span>{post.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState<PostCategory | 'all'>('all')
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [modalOpen, setModalOpen] = useState(false)
  const [newContent, setNewContent] = useState('')
  const [newCategory, setNewCategory] = useState<PostCategory>('general')

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  function submitPost() {
    if (!newContent.trim()) return
    const post: Post = {
      id: `p${Date.now()}`,
      authorName: 'Alex Johnson',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      category: newCategory,
      content: newContent.trim(),
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      liked: false,
    }
    setPosts(prev => [post, ...prev])
    setNewContent('')
    setNewCategory('general')
    setModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-6 py-8">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <Title level={2} style={{ margin: '0 0 4px' }}>Community</Title>
            <Text type="secondary">Connect with fellow event-goers</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
            New Post
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(cat => (
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

        <div className="flex flex-col gap-4">
          {filtered.map((post, i) => (
            <div key={post.id}>
              <PostCard post={post} />
              {i < filtered.length - 1 && <Divider style={{ margin: '4px 0' }} />}
            </div>
          ))}
        </div>
      </div>

      <Modal
        title="Create a post"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={submitPost}
        okText="Post"
        okButtonProps={{ disabled: !newContent.trim() }}
      >
        <div className="flex flex-col gap-3 mt-3">
          <div className="flex gap-2 flex-wrap">
            {categories.slice(1).map(cat => (
              <button
                key={cat.value}
                onClick={() => setNewCategory(cat.value as PostCategory)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  newCategory === cat.value
                    ? 'bg-neutral-800 text-white border-neutral-800'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <TextArea
            rows={4}
            placeholder="What's on your mind?"
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            maxLength={500}
            showCount
          />
        </div>
      </Modal>
    </div>
  )
}
