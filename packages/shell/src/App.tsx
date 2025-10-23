import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.scss';

// 创建React Query客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5分钟
    },
  },
});

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentApp, setCurrentApp] = useState<string>('home');

  useEffect(() => {
    // 确保store已经初始化
    if (!store) {
      return;
    }

    // 注册微应用
    registerMicroApps([
      {
        name: 'designer',
        entry: '//localhost:3002',
        container: '#designer-container',
        activeRule: '/designer',
        props: {
          // 传递给子应用的数据
          globalState: store.getState(),
          setGlobalState: (state: any) => store.dispatch({ type: 'SET_GLOBAL_STATE', payload: state }),
        },
      },
      {
        name: 'preview',
        entry: '//localhost:3003',
        container: '#preview-container',
        activeRule: '/preview',
        props: {
          globalState: store.getState(),
          setGlobalState: (state: any) => store.dispatch({ type: 'SET_GLOBAL_STATE', payload: state }),
        },
      },
    ]);

    // 设置默认启动应用
    setDefaultMountApp('home');

    // 启动qiankun
    start({
      sandbox: {
        strictStyleIsolation: true, // 严格的样式隔离
        experimentalStyleIsolation: true, // 实验性样式隔离
      },
      singular: true, // 单实例模式
    });

    setLoading(false);
  }, [store]);

  const handleAppChange = (appName: string) => {
    setCurrentApp(appName);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="app">
            <header className="app-header">
              <Navigation currentApp={currentApp} onAppChange={handleAppChange} />
            </header>

            <main className="app-main">
              <ErrorBoundary>
                {/* 微应用容器 */}
                <div id="designer-container" className="micro-app-container" />
                <div id="preview-container" className="micro-app-container" />
                
                {/* 默认首页 */}
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
            </main>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};



export default App;