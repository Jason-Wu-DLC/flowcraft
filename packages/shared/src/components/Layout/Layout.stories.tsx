// packages/shared/src/components/Layout/Layout.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Menu, Search, Bell, User, Home, Settings, FileText, BarChart3, LogOut } from 'lucide-react';
import { Layout, Header, Sidebar, Main, Footer, Container, Grid, GridItem } from './Layout';
import Button from '../Button';
import Input from '../Input';
import { ThemeProvider } from '../../themes/context';

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ height: '600px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'FlowCraft 布局组件系统，提供完整的页面布局解决方案。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

// 基础布局
export const BasicLayout: Story = {
  render: () => (
    <Layout minHeight="100%">
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>FlowCraft</h1>
          <nav style={{ display: 'flex', gap: '24px', marginLeft: '40px' }}>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>首页</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>产品</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>文档</a>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button variant="outline" size="sm">登录</Button>
          <Button size="sm">注册</Button>
        </div>
      </Header>

      <Main>
        <Container>
          <h2>欢迎使用 FlowCraft</h2>
          <p>这是一个基础的页面布局示例，包含头部、主内容区域和底部。</p>
          <div style={{ height: '300px', backgroundColor: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#6b7280' }}>主要内容区域</span>
          </div>
        </Container>
      </Main>

      <Footer bordered>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          © 2024 FlowCraft. All rights reserved.
        </div>
      </Footer>
    </Layout>
  ),
};

// 带侧边栏的布局
export const WithSidebar: Story = {
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const menuItems = [
      { icon: <Home size={20} />, label: '首页', active: true },
      { icon: <BarChart3 size={20} />, label: '分析' },
      { icon: <FileText size={20} />, label: '项目' },
      { icon: <Settings size={20} />, label: '设置' },
    ];

    return (
      <Layout minHeight="100%">
        <Header sticky>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu size={20} />
            </Button>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Dashboard</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Input
              placeholder="搜索..."
              leftIcon={<Search size={16} />}
              size="sm"
              style={{ width: '200px' }}
            />
            <Button variant="ghost" size="sm">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <User size={20} />
            </Button>
          </div>
        </Header>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar
            width={260}
            collapsible
            collapsed={sidebarCollapsed}
            background="secondary"
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: item.active ? '#3b82f6' : '#6b7280',
                    backgroundColor: item.active ? '#eff6ff' : 'transparent',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {item.icon}
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </a>
              ))}
            </nav>

            {!sidebarCollapsed && (
              <div style={{ marginTop: 'auto', padding: '16px' }}>
                <Button variant="ghost" fullWidth leftIcon={<LogOut size={16} />}>
                  退出登录
                </Button>
              </div>
            )}
          </Sidebar>

          <Main background="secondary">
            <Container size="full" padding="lg">
              <h2 style={{ marginTop: 0 }}>仪表板</h2>
              <Grid columns={3} gap="lg">
                <GridItem>
                  <div style={{
                    padding: '24px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ margin: '0 0 8px' }}>总用户</h3>
                    <p style={{ fontSize: '32px', fontWeight: '600', margin: 0, color: '#3b82f6' }}>2,847</p>
                  </div>
                </GridItem>
                <GridItem>
                  <div style={{
                    padding: '24px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ margin: '0 0 8px' }}>活跃项目</h3>
                    <p style={{ fontSize: '32px', fontWeight: '600', margin: 0, color: '#059669' }}>156</p>
                  </div>
                </GridItem>
                <GridItem>
                  <div style={{
                    padding: '24px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ margin: '0 0 8px' }}>收入</h3>
                    <p style={{ fontSize: '32px', fontWeight: '600', margin: 0, color: '#d97706' }}>¥98,456</p>
                  </div>
                </GridItem>
              </Grid>

              <div style={{
                marginTop: '32px',
                padding: '24px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#6b7280' }}>图表区域</span>
              </div>
            </Container>
          </Main>
        </div>
      </Layout>
    );
  },
};

// 网格布局
export const GridLayout: Story = {
  render: () => (
    <Layout minHeight="100%">
      <Header>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>网格布局示例</h1>
      </Header>

      <Main>
        <Container>
          <h2>响应式网格系统</h2>

          <h3>12列网格</h3>
          <Grid columns={12} gap="md">
            {Array.from({ length: 12 }, (_, i) => (
              <GridItem key={i} span={1}>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '4px',
                  textAlign: 'center',
                  color: '#3b82f6'
                }}>
                  {i + 1}
                </div>
              </GridItem>
            ))}
          </Grid>

          <h3 style={{ marginTop: '32px' }}>不同跨度</h3>
          <Grid columns={12} gap="md">
            <GridItem span={6}>
              <div style={{
                padding: '24px',
                backgroundColor: '#f0fdf4',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#059669'
              }}>
                span={6}
              </div>
            </GridItem>
            <GridItem span={3}>
              <div style={{
                padding: '24px',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#d97706'
              }}>
                span={3}
              </div>
            </GridItem>
            <GridItem span={3}>
              <div style={{
                padding: '24px',
                backgroundColor: '#fee2e2',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#dc2626'
              }}>
                span={3}
              </div>
            </GridItem>
          </Grid>

          <h3 style={{ marginTop: '32px' }}>嵌套网格</h3>
          <Grid columns={2} gap="lg">
            <GridItem>
              <div style={{
                padding: '24px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{ margin: '0 0 16px' }}>左侧区域</h4>
                <Grid columns={2} gap="sm">
                  <GridItem>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#eff6ff',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}>
                      A
                    </div>
                  </GridItem>
                  <GridItem>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#eff6ff',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}>
                      B
                    </div>
                  </GridItem>
                </Grid>
              </div>
            </GridItem>
            <GridItem>
              <div style={{
                padding: '24px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{ margin: '0 0 16px' }}>右侧区域</h4>
                <div style={{
                  padding: '32px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  内容区域
                </div>
              </div>
            </GridItem>
          </Grid>
        </Container>
      </Main>
    </Layout>
  ),
};

// 全屏布局
export const FullscreenLayout: Story = {
  render: () => (
    <Layout minHeight="100vh" fluid>
      <Header background="primary" height={56}>
        <div style={{ color: 'white', fontWeight: '600' }}>FlowCraft Editor</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="ghost" size="sm" style={{ color: 'white' }}>保存</Button>
          <Button variant="outline" size="sm">发布</Button>
        </div>
      </Header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar width={240} background="secondary">
          <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
            组件库
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['按钮', '输入框', '表格', '图表', '容器'].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '12px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </Sidebar>

        <Main padding="none" background="secondary">
          <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            margin: '16px',
            borderRadius: '8px',
            border: '2px dashed #d1d5db'
          }}>
            <span style={{ color: '#9ca3af', fontSize: '18px' }}>画布区域</span>
          </div>
        </Main>

        <Sidebar width={280} position="right" background="secondary">
          <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
            属性面板
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '500' }}>
                宽度
              </label>
              <Input size="sm" placeholder="auto" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '500' }}>
                高度
              </label>
              <Input size="sm" placeholder="auto" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '500' }}>
                背景色
              </label>
              <Input size="sm" placeholder="#ffffff" />
            </div>
          </div>
        </Sidebar>
      </div>
    </Layout>
  ),
};