import React from 'react';
import styles from './PropertyPanel.module.scss';

const PropertyPanel: React.FC = () => {
  return (
    <div className={styles.propertyPanel}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>属性面板</h3>
        <button className={styles.deleteButton} title="删除">
          🗑️
        </button>
      </div>

      <div className={styles.panelContent}>
        <div className={styles.emptyState}>
          <p>请选择一个组件查看其属性</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;