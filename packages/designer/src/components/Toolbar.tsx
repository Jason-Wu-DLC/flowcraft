import React from 'react';
import styles from './Toolbar.module.scss';

const Toolbar: React.FC = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolGroup}>
        <button className={styles.toolButton} title="撤销">
          ⟲
        </button>
        <button className={styles.toolButton} title="重做">
          ⟳
        </button>
      </div>

      <div className={styles.toolSeparator} />

      <div className={styles.toolGroup}>
        <button className={styles.toolButton} title="选择工具">
          ↖
        </button>
        <button className={styles.toolButton} title="移动工具">
          ✋
        </button>
        <button className={styles.toolButton} title="矩形">
          ▢
        </button>
        <button className={styles.toolButton} title="圆形">
          ○
        </button>
        <button className={styles.toolButton} title="文本">
          T
        </button>
      </div>

      <div className={styles.toolSeparator} />

      <div className={styles.toolGroup}>
        <button className={styles.toolButton}>
          🔍-
        </button>
        <span className={styles.zoomLevel}>
          100%
        </span>
        <button className={styles.toolButton}>
          🔍+
        </button>
      </div>
    </div>
  );
};

export default Toolbar;