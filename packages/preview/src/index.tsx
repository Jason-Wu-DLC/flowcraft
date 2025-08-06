import React from 'react';
import { createRoot } from 'react-dom/client';

// qiankun微前端生命周期
let root: any = null;

export async function bootstrap() {
  console.log('🚀 Preview应用启动中...');
}

export async function mount(props: any) {
  console.log('📦 Preview应用挂载中...', props);
  
  const container = document.getElementById('root') || document.getElementById('preview-container');
  if (container) {
    root = createRoot(container);
    root.render(
      <React.StrictMode>
        <PreviewApp />
      </React.StrictMode>
    );
    console.log('✅ Preview应用挂载成功');
  }
}

export async function unmount() {
  console.log('🗑️ Preview应用卸载中...');
  if (root) {
    root.unmount();
    root = null;
  }
}

// Preview 应用组件
const PreviewApp: React.FC = () => {
  return (
    <div style={{
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        padding: '2rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          color: '#1e40af',
          marginBottom: '1rem',
          fontSize: '2rem'
        }}>
          🎨 FlowCraft 预览器
        </h1>
        
        <p style={{
          color: '#6b7280',
          marginBottom: '2rem',
          fontSize: '1.125rem'
        }}>
          实时预览设计器创建的流程和组件
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            backgroundColor: '#f0fdf4'
          }}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#374151' }}>📊 实时预览</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
              通过 Socket.io 实时接收设计器的更新
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            backgroundColor: '#eff6ff'
          }}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#374151' }}>🎯 组件渲染</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
              使用共享组件库渲染设计内容
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            backgroundColor: '#fef3c7'
          }}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#374151' }}>📱 响应式</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
              支持多种设备和屏幕尺寸
            </p>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f1f5f9',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ margin: '0 0 1rem', color: '#1e40af' }}>🔧 开发状态</h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151' }}>
            预览器功能正在开发中，将支持实时预览设计器创建的流程和组件。
          </p>
        </div>
      </div>
    </div>
  );
};

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  const startApp = async () => {
    try {
      const container = document.getElementById('root');
      if (container) {
        root = createRoot(container);
        root.render(
          <React.StrictMode>
            <PreviewApp />
          </React.StrictMode>
        );
        console.log('✅ Preview应用独立启动成功');
      } else {
        throw new Error('Root container not found');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error('❌ Failed to start preview application:', error);
      
      const container = document.getElementById('root');
      if (container) {
        container.innerHTML = `
          <div style="padding: 2rem; text-align: center; color: #ef4444;">
            <h1>预览器启动失败</h1>
            <p>错误信息: ${error.message}</p>
            <p>请检查依赖服务是否正常运行</p>
          </div>
        `;
      }
    }
  };

  startApp();
} 