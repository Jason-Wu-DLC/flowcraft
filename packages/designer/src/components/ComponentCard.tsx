import React from 'react';
import styles from './ComponentCard.module.scss';
import { MarketComponent } from '../services/marketplaceService';
import { calculateComponentDataSize } from '../utils/performance';

interface ComponentCardProps {
  component: MarketComponent;
  onClick: () => void;
  onDownload: () => void;
  disabled?: boolean;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ 
  component, 
  onClick, 
  onDownload, 
  disabled = false 
}) => {
  // 格式化文件大小显示
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // 计算组件数据大小
  const componentSize = component.components ? 
    calculateComponentDataSize(component.components) : 0;

  return (
    <div className={styles.componentCard}>
      <div className={styles.cardHeader} onClick={onClick}>
        <div className={styles.categoryBadge}>{component.type || '未分类'}</div>
        <h3 className={styles.componentName}>{component.name}</h3>
      </div>

      <div className={styles.cardBody} onClick={onClick}>
        <p className={styles.componentDescription}>
          {component.description || '暂无描述'}
        </p>

        <div className={styles.componentMetadata}>
          <span className={styles.metadataItem}>
            ⭐ {component.rating?.toFixed(1) || '0.0'}
          </span>
          <span className={styles.metadataItem}>
            ↓ {component.downloadCount || 0}
          </span>
          <span className={styles.metadataItem}>
            📦 {formatFileSize(componentSize)}
          </span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <button
          className={styles.downloadButton}
          onClick={onDownload}
          disabled={disabled}
        >
          {disabled ? '下载中...' : '下载组件'}
        </button>
      </div>
    </div>
  );
};

export default ComponentCard;