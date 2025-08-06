import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DesignerProvider } from './contexts/DesignerContext';
import ComponentLibrary from './components/ComponentLibrary';
import CanvasArea from './components/CanvasArea';
import PropertyPanel from './components/PropertyPanel';
import Toolbar from './components/Toolbar';
import { store } from './store';
import styles from './DesignerApp.module.scss';

// 创建React Query客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5分钟
    },
  },
});

const DesignerAppContent: React.FC = () => {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);

  return (
    <DesignerProvider>
      <div className={styles.designerApp}>
        {/* 头部工具栏 */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              className={styles.menuButton}
              onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
              aria-label="切换侧边栏"
            >
              ☰
            </button>
            <div className={styles.projectInfo}>
              <h1 className={styles.projectTitle}>FlowCraft 设计器</h1>
              <span className={styles.projectStatus}>未保存</span>
            </div>
          </div>

          <Toolbar />

          <div className={styles.headerRight}>
            <button className={styles.actionButton}>保存</button>
            <button className={styles.actionButton}>导出</button>
            <button className={styles.primaryButton}>预览</button>
          </div>
        </header>

        <div className={styles.designerBody}>
          {/* 左侧组件库 */}
          {!leftSidebarCollapsed && (
            <aside className={styles.sidebar}>
              <ComponentLibrary />
            </aside>
          )}

          {/* 中间画布区域 */}
          <main className={styles.main}>
            <CanvasArea />
          </main>

          {/* 右侧属性面板 */}
          <aside className={styles.propertySidebar}>
            <PropertyPanel />
          </aside>
        </div>
      </div>
    </DesignerProvider>
  );
};

const DesignerApp: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DesignerAppContent />
      </QueryClientProvider>
    </Provider>
  );
};

export default DesignerApp;