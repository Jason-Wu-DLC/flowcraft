// packages/designer/src/DesignerApp.tsx
import React, { useState } from 'react';
import { DesignerProvider } from './contexts/DesignerContext';
import ComponentLibrary from './components/ComponentLibrary';
import CanvasArea from './components/CanvasArea';
import PropertyPanel from './components/PropertyPanel';
import Toolbar from './components/Toolbar';
import styles from './DesignerApp.module.scss';

const DesignerApp: React.FC = () => {
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

export default DesignerApp;