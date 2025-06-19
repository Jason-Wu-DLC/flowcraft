import React from 'react';
import './App.css';

// 临时的 Button 组件
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ children, onClick }) => {
  return (
    <button className="flowcraft-button" onClick={onClick}>
      {children}
    </button>
  );
};

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 FlowCraft</h1>
        <p>智能业务流程构建平台</p>
        <Button onClick={() => alert('欢迎使用 FlowCraft!')}>
          开始使用
        </Button>
      </header>
    </div>
  );
};

export default App;