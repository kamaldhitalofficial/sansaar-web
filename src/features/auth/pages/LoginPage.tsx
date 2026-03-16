import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

export default function LoginPage() {
  const navigate = useNavigate()

  function onFinish(values: LoginFormValues) {
    console.log('Login:', values)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <Title level={3} style={{ margin: 0 }}>Welcome back</Title>
          <Text type="secondary">Sign in to your Sansaar account</Text>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            requiredMark={false}
          >
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
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>

            <div className="flex items-center justify-between mb-4">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/auth/forgot-password" className="text-sm text-neutral-500 hover:text-neutral-800">
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>
            <Text type="secondary" style={{ fontSize: 13 }}>or</Text>
          </Divider>

          <Text type="secondary" className="block text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/auth/register" className="text-neutral-800 font-medium hover:underline">
              Sign up
            </Link>
          </Text>
        </div>

      </div>
    </div>
  )
}
