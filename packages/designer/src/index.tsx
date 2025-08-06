import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import DesignerApp from './DesignerApp';

// 创建React Query客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// qiankun微前端生命周期
let root: any = null;

export async function bootstrap() {
  console.log('🚀 Designer应用启动中...');
}

export async function mount(props: any) {
  console.log('📦 Designer应用挂载中...', props);
  
  const container = document.getElementById('root') || document.getElementById('designer-container');
  if (container) {
    root = createRoot(container);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <DesignerApp />
          </QueryClientProvider>
        </Provider>
      </React.StrictMode>
    );
    console.log('✅ Designer应用挂载成功');
  }
}

export async function unmount() {
  console.log('🗑️ Designer应用卸载中...');
  if (root) {
    root.unmount();
    root = null;
  }
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  const startApp = async () => {
    try {
      const container = document.getElementById('root');
      if (container) {
        root = createRoot(container);
        root.render(
          <React.StrictMode>
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <DesignerApp />
              </QueryClientProvider>
            </Provider>
          </React.StrictMode>
        );
        console.log('✅ Designer应用独立启动成功');
      } else {
        throw new Error('Root container not found');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error('❌ Failed to start designer application:', error);
      
      const container = document.getElementById('root');
      if (container) {
        container.innerHTML = `
          <div style="padding: 2rem; text-align: center; color: #ef4444;">
            <h1>设计器启动失败</h1>
            <p>错误信息: ${error.message}</p>
            <p>请检查依赖服务是否正常运行</p>
          </div>
        `;
      }
    }
  };

  startApp();
}