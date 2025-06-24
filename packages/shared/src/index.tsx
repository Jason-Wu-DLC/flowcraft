// packages/shared/src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './themes/context';

// 组件导出 - 必须放在文件顶部
export { default as Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { default as Input } from './components/Input';
export type { InputProps, InputSize, InputVariant, InputStatus } from './components/Input';

export { default as Modal } from './components/Modal';
export type { ModalProps, ModalSize } from './components/Modal';

export {
  Layout,
  Header,
  Sidebar,
  Main,
  Footer,
  Container,
  Grid,
  GridItem,
} from './components/Layout';
export type {
  LayoutProps,
  HeaderProps,
  SidebarProps,
  MainProps,
  FooterProps,
  ContainerProps,
  GridProps,
  GridItemProps,
} from './components/Layout';

// 主题系统导出
export { ThemeProvider, useTheme } from './themes/context';
export { defaultTheme } from './themes/default';
export type {
  Theme,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
  ThemeBorderRadius,
  ThemeShadows
} from './themes/types';

// Hook 导出
export { default as useLocalStorage } from './hooks/useLocalStorage';
export { useModal } from './hooks/useModal';
export type { UseModalReturn } from './hooks/useModal';

// 全局样式
import './styles/global.scss';

// 组件库独立运行的演示页面
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div style={{
        padding: '40px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            color: '#3b82f6',
            marginBottom: '1rem',
            fontSize: '2.5rem'
          }}>
            🧩 FlowCraft 共享组件库
          </h1>
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            fontSize: '1.25rem'
          }}>
            组件库已成功加载！Module Federation 服务正在运行。
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              backgroundColor: '#f0fdf4'
            }}>
              <h3 style={{ margin: '0 0 0.5rem', color: '#374151' }}>✅ 服务状态</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                组件库服务正常运行
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              backgroundColor: '#eff6ff'
            }}>
              <h3 style={{ margin: '0 0 0.5rem', color: '#374151' }}>🔗 Module Federation</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                远程模块已暴露，可供其他应用消费
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              backgroundColor: '#fef3c7'
            }}>
              <h3 style={{ margin: '0 0 0.5rem', color: '#374151' }}>📦 组件导出</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                Button, Input, Modal, Layout 等组件可用
              </p>
            </div>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            textAlign: 'left'
          }}>
            <h4 style={{ margin: '0 0 1rem', color: '#1e40af' }}>📋 访问信息</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: '#374151'
            }}>
              <div>• 当前服务: http://localhost:3001</div>
              <div>• 主应用: http://localhost:3000</div>
              <div>• 设计器: http://localhost:3002</div>
              <div>• Storybook: http://localhost:6006</div>
            </div>
          </div>

          <p style={{
            marginTop: '2rem',
            color: '#9ca3af',
            fontSize: '0.875rem'
          }}>
            请访问 <a href="http://localhost:6006" target="_blank" style={{ color: '#3b82f6' }}>Storybook</a> 查看完整组件文档
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

// 只在独立运行时渲染
if (typeof document !== 'undefined') {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
}

export default App;