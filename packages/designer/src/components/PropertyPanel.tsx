import React from 'react';
import styles from './PropertyPanel.module.scss';

const PropertyPanel: React.FC = () => {
  return (
    <div className={styles.propertyPanel}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>属性面板</h3>
      </div>
      <div className={styles.panelContent}>
        <div className={styles.emptyState}>
          <p>请选择一个组件或连线查看其属性</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;