import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Layout,
  Header,
  Sidebar,
  Main,
  Footer,
  Container,
  Grid,
  GridItem,
  ThemeProvider,
  useModal,
} from '../components';
import { Search, User, Settings, Bell, Menu } from 'lucide-react';

const TestPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const modal = useModal();
  const formModal = useModal();

  // 表单数据
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // 主题切换
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // 表单验证
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value && !validateEmail(value)) {
      setInputError('请输入有效的邮箱地址');
    } else {
      setInputError('');
    }
  };

  const handleFormSubmit = () => {
    if (!formData.username || !formData.email || !formData.password) {
      alert('请填写所有必填字段');
      return;
    }
    if (!validateEmail(formData.email)) {
      alert('请输入有效的邮箱地址');
      return;
    }
    alert('表单提交成功！');
    formModal.close();
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <ThemeProvider>
      <Layout minHeight="100vh">
        {/* 页面头部 */}
        <Header sticky>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu size={20} />
            </Button>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
              FlowCraft 组件测试
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? '暗色' : '亮色'}
            </Button>
            <Button variant="ghost" size="sm">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <User size={20} />
            </Button>
          </div>
        </Header>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* 侧边栏 */}
          <Sidebar
            width={280}
            collapsible
            collapsed={sidebarCollapsed}
            background="secondary"
          >
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                margin: '0 0 16px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#6b7280'
              }}>
                组件测试
              </h3>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#buttons" style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#3b82f6',
                  backgroundColor: '#eff6ff'
                }}>
                  {!sidebarCollapsed && '按钮组件'}
                </a>
                <a href="#inputs" style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#6b7280'
                }}>
                  {!sidebarCollapsed && '输入框组件'}
                </a>
                <a href="#modals" style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#6b7280'
                }}>
                  {!sidebarCollapsed && '模态框组件'}
                </a>
                <a href="#layout" style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#6b7280'
                }}>
                  {!sidebarCollapsed && '布局组件'}
                </a>
              </nav>
            </div>
          </Sidebar>

          {/* 主内容区 */}
          <Main background="secondary">
            <Container size="full" padding="lg">

              {/* 按钮测试区域 */}
              <section id="buttons" style={{ marginBottom: '48px' }}>
                <h2>🔘 Button 组件测试</h2>

                <div style={{ marginBottom: '24px' }}>
                  <h3>变体测试</h3>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h3>尺寸测试</h3>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h3>状态测试</h3>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button>Normal</Button>
                    <Button loading>Loading</Button>
                    <Button disabled>Disabled</Button>
                    <Button leftIcon={<User size={16} />}>With Icon</Button>
                  </div>
                </div>
              </section>

              {/* 输入框测试区域 */}
              <section id="inputs" style={{ marginBottom: '48px' }}>
                <h2>📝 Input 组件测试</h2>

                <Grid columns={2} gap="lg">
                  <GridItem>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <Input
                        label="基础输入框"
                        placeholder="请输入内容..."
                      />

                      <Input
                        label="带图标输入框"
                        placeholder="搜索..."
                        leftIcon={<Search size={16} />}
                      />

                      <Input
                        label="邮箱验证"
                        type="email"
                        placeholder="请输入邮箱"
                        value={inputValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        errorMessage={inputError}
                        successMessage={inputValue && !inputError ? '邮箱格式正确' : undefined}
                      />

                      <Input
                        label="密码输入"
                        type="password"
                        placeholder="请输入密码"
                        leftIcon={<User size={16} />}
                      />
                    </div>
                  </GridItem>

                  <GridItem>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <Input
                        label="可清除输入框"
                        placeholder="可以清除内容"
                        clearable
                        defaultValue="可以清除的内容"
                      />

                      <Input
                        label="字符计数"
                        placeholder="最多100字符"
                        maxLength={100}
                        showCount
                      />

                      <Input
                        label="禁用状态"
                        placeholder="禁用状态"
                        disabled
                        defaultValue="不可编辑"
                      />

                      <Input
                        label="插槽功能"
                        placeholder="domain"
                        leftAddon="https://"
                        rightAddon=".com"
                      />
                    </div>
                  </GridItem>
                </Grid>
              </section>

              {/* 模态框测试区域 */}
              <section id="modals" style={{ marginBottom: '48px' }}>
                <h2>🔲 Modal 组件测试</h2>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button onClick={modal.open}>基础模态框</Button>
                  <Button onClick={formModal.open}>表单模态框</Button>
                </div>

                {/* 基础模态框 */}
                <Modal
                  isOpen={modal.isOpen}
                  onClose={modal.close}
                  title="基础模态框测试"
                  size="md"
                >
                  <div>
                    <p>这是一个基础的模态框示例。</p>
                    <p>你可以通过以下方式关闭模态框：</p>
                    <ul>
                      <li>点击右上角的关闭按钮</li>
                      <li>点击背景遮罩</li>
                      <li>按 ESC 键</li>
                    </ul>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '8px',
                      marginTop: '16px'
                    }}>
                      <strong>测试要点：</strong>
                      <br />✅ 动画过渡效果
                      <br />✅ 背景模糊效果
                      <br />✅ 键盘导航支持
                      <br />✅ 响应式设计
                    </div>
                  </div>
                </Modal>

                {/* 表单模态框 */}
                <Modal
                  isOpen={formModal.isOpen}
                  onClose={formModal.close}
                  title="用户注册"
                  size="md"
                  showFooter
                  confirmText="注册"
                  cancelText="取消"
                  onConfirm={handleFormSubmit}
                  onCancel={formModal.close}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Input
                      label="用户名"
                      placeholder="请输入用户名"
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      required
                    />
                    <Input
                      label="邮箱"
                      type="email"
                      placeholder="请输入邮箱"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                    <Input
                      label="密码"
                      type="password"
                      placeholder="请输入密码"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                </Modal>
              </section>

              {/* 布局测试区域 */}
              <section id="layout" style={{ marginBottom: '48px' }}>
                <h2>📐 Layout 组件测试</h2>

                <div style={{ marginBottom: '24px' }}>
                  <h3>网格系统测试</h3>
                  <Grid columns={12} gap="md">
                    {Array.from({ length: 12 }, (_, i) => (
                      <GridItem key={i} span={1}>
                        <div style={{
                          padding: '8px',
                          backgroundColor: '#eff6ff',
                          borderRadius: '4px',
                          textAlign: 'center',
                          fontSize: '12px',
                          color: '#3b82f6'
                        }}>
                          {i + 1}
                        </div>
                      </GridItem>
                    ))}
                  </Grid>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h3>响应式网格测试</h3>
                  <Grid columns={3} gap="lg" responsive>
                    <GridItem>
                      <div style={{
                        padding: '24px',
                        backgroundColor: '#f0fdf4',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        <h4 style={{ margin: '0 0 8px' }}>卡片 1</h4>
                        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                          在移动端会变成单列布局
                        </p>
                      </div>
                    </GridItem>
                    <GridItem>
                      <div style={{
                        padding: '24px',
                        backgroundColor: '#fef3c7',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        <h4 style={{ margin: '0 0 8px' }}>卡片 2</h4>
                        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                          尝试缩放浏览器窗口查看效果
                        </p>
                      </div>
                    </GridItem>
                    <GridItem>
                      <div style={{
                        padding: '24px',
                        backgroundColor: '#fee2e2',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        <h4 style={{ margin: '0 0 8px' }}>卡片 3</h4>
                        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                          响应式断点：768px
                        </p>
                      </div>
                    </GridItem>
                  </Grid>
                </div>
              </section>

              {/* 测试总结 */}
              <section style={{
                padding: '24px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <h2>✅ 测试检查清单</h2>
                <Grid columns={2} gap="lg">
                  <GridItem>
                    <h3>功能测试</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>✅ 按钮点击响应</li>
                      <li>✅ 输入框实时验证</li>
                      <li>✅ 模态框交互</li>
                      <li>✅ 侧边栏折叠</li>
                      <li>✅ 主题切换</li>
                      <li>✅ 表单提交</li>
                    </ul>
                  </GridItem>
                  <GridItem>
                    <h3>样式测试</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>✅ 响应式布局</li>
                      <li>✅ 动画过渡</li>
                      <li>✅ 主题色彩</li>
                      <li>✅ 字体排版</li>
                      <li>✅ 间距系统</li>
                      <li>✅ 阴影效果</li>
                    </ul>
                  </GridItem>
                </Grid>
              </section>

            </Container>
          </Main>
        </div>

        {/* 页面底部 */}
        <Footer bordered>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#6b7280',
            fontSize: '14px'
          }}>
            <span>© 2024 FlowCraft. 组件库测试页面</span>
            <span>当前主题: {theme}</span>
          </div>
        </Footer>
      </Layout>
    </ThemeProvider>
  );
};

export default TestPage;