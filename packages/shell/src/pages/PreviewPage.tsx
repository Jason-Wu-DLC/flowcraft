import React from 'react';

const PreviewPage: React.FC = () => {
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
      <h1 style={{ marginBottom: '1rem', color: '#059669' }}>👁️ 预览模块</h1>
      <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
        微前端预览模块将在这里加载
      </p>
      <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
        提供流程的实时预览和测试功能
      </p>
    </div>
  );
};

export default PreviewPage;