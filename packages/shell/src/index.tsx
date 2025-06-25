import React from 'react';
import { createRoot } from 'react-dom/client';

const startApp = async () => {
  try {
    // 动态导入App组件，确保所有依赖模块都已加载
    const { default: App } = await import('./App');

    const container = document.getElementById('root');
    if (container) {
      const root = createRoot(container);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      console.log('✅ Shell application started successfully');
    } else {
      throw new Error('Root container not found');
    }
  } catch (err) {
    // 🔑 修复：处理 unknown 类型的错误
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('❌ Failed to start shell application:', error);

    // 显示错误页面
    const container = document.getElementById('root');
    if (container) {
      container.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: #ef4444;">
          <h1>应用启动失败</h1>
          <p>错误信息: ${error.message}</p>
          <p>请检查所有服务是否正常运行</p>
          <div style="margin-top: 1rem; padding: 1rem; background: #fef2f2; border-radius: 0.5rem; text-align: left;">
            <h4 style="margin: 0 0 0.5rem;">检查步骤:</h4>
            <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.875rem;">
              <li>运行: <code>npm run dev:all</code></li>
              <li>确认端口 3000, 3001, 3002 未被占用</li>
              <li>检查浏览器控制台详细错误</li>
            </ul>
          </div>
        </div>
      `;
    }
  }
};

startApp();