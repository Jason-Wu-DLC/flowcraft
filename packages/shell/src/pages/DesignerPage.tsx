import React from 'react';

const DesignerPage: React.FC = () => {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ marginBottom: '1rem', color: '#3b82f6' }}>🎨 设计器模块</h1>
      <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
        微前端设计器模块将在这里加载
      </p>
      <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
        当前是占位页面，完整的设计器模块需要 shared 服务正常运行
      </p>
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '0.5rem',
        maxWidth: '500px'
      }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>📋 功能预览</h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          fontSize: '0.875rem',
          color: '#4b5563'
        }}>
          <li>✅ 拖拽式组件编排</li>
          <li>✅ 实时属性编辑</li>
          <li>✅ 可视化画布</li>
          <li>✅ 组件库管理</li>
        </ul>
      </div>
    </div>
  );
};

export default DesignerPage;
