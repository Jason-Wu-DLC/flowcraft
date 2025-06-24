import React from 'react';

const CollaborationPage: React.FC = () => {
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
      <h1 style={{ marginBottom: '1rem', color: '#d97706' }}>👥 协作模块</h1>
      <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
        微前端协作模块将在这里加载
      </p>
      <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
        支持多人实时协作编辑业务流程
      </p>
    </div>
  );
};

export default CollaborationPage;