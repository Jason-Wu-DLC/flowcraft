import React from 'react';
import styles from './VersionList.module.scss';
import { Version } from '../contexts/VersionContext';
import Button from '@flowcraft/shared/components/Button';

interface VersionListProps {
  versions: Version[];
  selectedVersionId: string | null;
  onSelect: (versionId: string) => void;
  onLoad: (versionId: string) => void;
  onDelete: (versionId: string) => void;
  onExport: (versionId: string) => void;
}

const VersionList: React.FC<VersionListProps> = ({ 
  versions, 
  selectedVersionId, 
  onSelect, 
  onLoad, 
  onDelete, 
  onExport 
}) => {
  // 按创建时间降序排序版本
  const sortedVersions = [...versions].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className={styles.versionList}>
      {sortedVersions.map((version) => (
        <div 
          key={version.id} 
          className={`${styles.versionItem} ${selectedVersionId === version.id ? styles.selected : ''}`}
        >
          <div className={styles.versionInfo} onClick={() => onSelect(version.id)}>
            <div className={styles.versionName}>{version.name}</div>
            <div className={styles.versionMeta}>
              <span className={styles.createdAt}>
                {new Date(version.createdAt).toLocaleString()}
              </span>
              {version.isAutoSave && (
                <span className={styles.autoSaveBadge}>自动保存</span>
              )}
            </div>
          </div>

          <div className={styles.versionActions}>
            <Button 
              variant="icon"
              size="small"
              onClick={() => onLoad(version.id)}
              title="应用版本"
            >
              ↪️
            </Button>
            <Button 
              variant="icon"
              size="small"
              onClick={() => onExport(version.id)}
              title="导出"
            >
              ↓
            </Button>
            <Button 
              variant="icon"
              size="small"
              onClick={() => onDelete(version.id)}
              title="删除"
              className={styles.deleteButton}
            >
              ✕
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VersionList;