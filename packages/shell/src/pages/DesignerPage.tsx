import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';

// 动态导入远程 designer 模块
const DesignerApp = lazy(() =>
  import('designer/DesignerApp').catch((err) => {
    // 🔑 修复：处理 unknown 类型的错误
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('Failed to load designer module:', error);

    // 返回错误替代组件
    return {
      default: () => (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#ef4444',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>🚨 设计器模块加载失败</h2>
          <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
            无法连接到设计器服务
          </p>
          <div style={{
            padding: '1rem',
            backgroundColor: '#fef2f2',
            borderRadius: '0.5rem',
            border: '1px solid #fecaca',
            maxWidth: '500px'
          }}>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>🔧 检查清单</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              fontSize: '0.875rem',
              color: '#7f1d1d',
              textAlign: 'left'
            }}>
              <li>❌ 设计器服务运行状态: <a href="http://localhost:3002" target="_blank">http://localhost:3002</a></li>
              <li>❌ 共享组件库状态: <a href="http://localhost:3001" target="_blank">http://localhost:3001</a></li>
              <li>❌ 请运行: <code>npm run dev:all</code></li>
            </ul>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#9ca3af' }}>
            错误详情: {error.message}
          </p>
        </div>
      )
    };
  })
);

const DesignerPage: React.FC = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <DesignerApp />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default DesignerPage;