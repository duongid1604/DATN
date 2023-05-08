import {
  Layout,
  Menu,
  Avatar,
  Badge,
  Dropdown,
  Button,
  Spin,
  message,
} from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  EnvironmentOutlined,
  PlaySquareOutlined,
  ShoppingOutlined,
  BarChartOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../api/Login'
import ScrollToTop from 'react-scroll-to-top'

const { Header, Sider, Content } = Layout
const nav = [
  {
    key: 1,
    icon: <EnvironmentOutlined className="icon-antd" />,
    text: 'Products',
    link: '/home/products',
  },
  {
    key: 2,
    icon: <UserOutlined className="icon-antd" />,
    text: 'Users',
    link: '/home/users',
  },
  {
    key: 3,
    icon: <PlaySquareOutlined className="icon-antd" />,
    text: 'News',
    link: '/home/news',
  },
  {
    key: 4,
    icon: <ShoppingOutlined className="icon-antd" />,
    text: 'Orders',
    link: '/home/orders',
  },
  {
    key: 5,
    icon: <BarChartOutlined className="icon-antd" />,
    text: 'Income Chart',
    link: '/home/income',
  },
  {
    key: 6,
    icon: <FieldTimeOutlined className="icon-antd" />,
    text: 'Comments',
    link: '/home/comments',
  },
]
const Navigation = ({ content }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [spinning, setSpinning] = useState(false)

  const navigate = useNavigate()
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  const handleLogout = () => {
    setSpinning(true)
    logout()
      .then(() => {
        setSpinning(false)
        localStorage.removeItem('auth')
        navigate(0, { replace: true })
      })
      .catch(() => {
        setSpinning(false)
        localStorage.removeItem('auth')
        navigate(0, { replace: true })

        message.error('Xảy ra lỗi xin vui lòng thử lại')
      })
  }
  return (
    <Spin spinning={spinning}>
      <Layout
        className="layout"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ position: 'sticky', top: 0 }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {nav.map((e, index) => (
              <Menu.Item
                key={e.key}
                icon={e.icon}
                onClick={() => {
                  navigate(`${e.link}`, { replace: true })
                }}
              >
                {e.text}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ overflowY: 'scroll' }}>
          <Header
            className="site-layout-background header"
            style={{ padding: 0 }}
          >
            {collapsed ? (
              <MenuUnfoldOutlined
                className="trigger icon-antd"
                onClick={toggle}
              />
            ) : (
              <MenuFoldOutlined
                className="trigger icon-antd"
                onClick={toggle}
              />
            )}

            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="0">
                    <Button type="link" block onClick={handleLogout}>
                      Logout
                    </Button>
                  </Menu.Item>
                </Menu>
              }
            >
              <span style={{ cursor: 'pointer' }}>
                <Badge dot>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
              </span>
            </Dropdown>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {content}
            <ScrollToTop
              smooth
              color="yellow"
              style={{ background: 'black' }}
            />
          </Content>
        </Layout>
      </Layout>
    </Spin>
  )
}
export default Navigation
