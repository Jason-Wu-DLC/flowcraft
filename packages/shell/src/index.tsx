import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

const App: React.FC = () => {
  const handleClick = () => {
    alert('欢迎使用 FlowCraft!');
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#1890ff', fontSize: '3em', marginBottom: '20px' }}>
        🚀 FlowCraft
      </h1>
      <p style={{ fontSize: '1.2em', color: '#666', marginBottom: '30px' }}>
        智能业务流程构建平台
      </p>
      <button 
        onClick={handleClick}
        style={{
          backgroundColor: '#1890ff',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#40a9ff';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#1890ff';
        }}
      >
        开始使用
      </button>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}