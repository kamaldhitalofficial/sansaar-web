import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

interface RegisterFormValues {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form] = Form.useForm<RegisterFormValues>()

  function onFinish(values: RegisterFormValues) {
    console.log('Register:', values)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <Title level={3} style={{ margin: 0 }}>Create an account</Title>
          <Text type="secondary">Join Sansaar and discover events</Text>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="fullName"
              label="Full name"
              rules={[{ required: true, message: 'Please enter your full name' }]}
            >
              <Input placeholder="Alex Johnson" size="large" />
            </Form.Item>

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
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter a password' },
                { min: 8, message: 'Password must be at least 8 characters' },
              ]}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Passwords do not match'))
                  },
                }),
              ]}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>

            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator(_, value) {
                    if (value) return Promise.resolve()
                    return Promise.reject(new Error('Please accept the terms'))
                  },
                },
              ]}
            >
              <Checkbox>
                <Text style={{ fontSize: 13 }}>
                  I agree to the{' '}
                  <Link to="/terms" className="text-neutral-800 font-medium hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-neutral-800 font-medium hover:underline">
                    Privacy Policy
                  </Link>
                </Text>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Create account
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>
            <Text type="secondary" style={{ fontSize: 13 }}>or</Text>
          </Divider>

          <Text type="secondary" className="block text-center text-sm">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-neutral-800 font-medium hover:underline">
              Sign in
            </Link>
          </Text>
        </div>

      </div>
    </div>
  )
}
