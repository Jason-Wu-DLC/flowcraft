import React from 'react';
import styles from './VersionDetail.module.scss';
import { Version } from '../contexts/VersionContext';

interface VersionDetailProps {
  version: Version;
}

const VersionDetail: React.FC<VersionDetailProps> = ({ version }) => {
  return (
    <div className={styles.versionDetail}>
      <h2>版本详情</h2>

      <div className={styles.detailSection}>
        <h3>基本信息</h3>
        <div className={styles.infoRow}>
          <span className={styles.label}>版本名称</span>
          <span className={styles.value}>{version.name}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>创建时间</span>
          <span className={styles.value}>{new Date(version.createdAt).toLocaleString()}</span>
        </div>
        {version.description && (
          <div className={styles.infoRow}>
            <span className={styles.label}>描述</span>
            <span className={styles.value}>{version.description}</span>
          </div>
        )}
        {version.isAutoSave && (
          <div className={styles.infoRow}>
            <span className={styles.label}>类型</span>
            <span className={styles.value}><span className={styles.autoSaveBadge}>自动保存版本</span></span>
          </div>
        )}
      </div>

      <div className={styles.detailSection}>
        <h3>内容信息</h3>
        <div className={styles.infoRow}>
          <span className={styles.label}>组件数量</span>
          <span className={styles.value}>{version.components.length} 个组件</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>数据大小</span>
          <span className={styles.value}>
            {Math.round(JSON.stringify(version.components).length / 1024)} KB
          </span>
        </div>
      </div>
    </div>
  );
};

export default VersionDetail;