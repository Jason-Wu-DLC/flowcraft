// packages/shared/src/demo/StandaloneApp.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '../themes/context';
import TestPage from './TestPage';

const StandaloneApp: React.FC = () => {
  return (
    <ThemeProvider>
      <div style={{
        padding: '2rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <h1 style={{ color: '#3b82f6', marginBottom: '1rem' }}>
          🧩 FlowCraft 共享组件库
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          共享组件库正在运行中，Module Federation 服务已启动。
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
            backgroundColor: '#f9fafb'
          }}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#374151' }}>✅ 服务状态</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
              Shared 组件库服务正常运行
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            backgroundColor: '#f0fdf4'
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
            backgroundColor: '#fffbeb'
          }}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#374151' }}>📦 组件导出</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
              Button, Input, Modal, Layout 等组件可用
            </p>
          </div>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: '#eff6ff',
          borderRadius: '0.5rem',
          border: '1px solid #bfdbfe'
        }}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#1e40af' }}>📋 访问信息</h4>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            fontSize: '0.875rem',
            color: '#374151'
          }}>
            <li>当前服务: http://localhost:3001</li>
            <li>Remote Entry: http://localhost:3001/remoteEntry.js</li>
            <li>主应用: http://localhost:3000</li>
            <li>设计器: http://localhost:3002</li>
            <li>Storybook: http://localhost:6006</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>组件测试</h2>
          <TestPage />
        </div>
      </div>
    </ThemeProvider>
  );
};

// 只在独立运行时渲染
if (typeof document !== 'undefined' && document.getElementById('root')) {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<StandaloneApp />);
  }
}

export default StandaloneApp;