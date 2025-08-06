import React from 'react';
import styles from './VersionHistoryList.module.scss';
import { ComponentVersion } from '../services/marketplaceService';

interface VersionHistoryListProps {
  versions: ComponentVersion[];
  selectedVersion: string;
  onSelectVersion: (version: string) => void;
}

const VersionHistoryList: React.FC<VersionHistoryListProps> = ({ 
  versions, 
  selectedVersion, 
  onSelectVersion 
}) => {
  if (!versions.length) {
    return (
      <div className={styles.emptyState}>
        暂无版本历史记录
      </div>
    );
  }

  return (
    <div className={styles.versionHistoryList}>
      <div className={styles.listHeader}>
        <span className={styles.versionColumn}>版本</span>
        <span className={styles.dateColumn}>发布日期</span>
        <span className={styles.changesColumn}>更新内容</span>
      </div>

      {versions.map((version) => (
        <div 
          key={version.version} 
          className={`${styles.versionItem} ${selectedVersion === version.version ? styles.selected : ''}`}
          onClick={() => onSelectVersion(version.version)}
        >
          <div className={styles.versionNumber}>{version.version}</div>
          <div className={styles.releaseDate}>
            {new Date(version.releaseDate).toLocaleString()}
          </div>
          <div className={styles.changeLog}>
            {version.changelog || '无更新说明'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VersionHistoryList;