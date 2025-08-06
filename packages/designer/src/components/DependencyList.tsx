import React from 'react';
import styles from './DependencyList.module.scss';

interface DependencyListProps {
  dependencies: Record<string, string>;
}

const DependencyList: React.FC<DependencyListProps> = ({ dependencies }) => {
  const dependencyEntries = Object.entries(dependencies);

  if (dependencyEntries.length === 0) {
    return (
      <div className={styles.emptyState}>无依赖项</div>
    );
  }

  return (
    <ul className={styles.dependencyList}>
      {dependencyEntries.map(([name, version]) => (
        <li key={name} className={styles.dependencyItem}>
          <span className={styles.packageName}>{name}</span>
          <span className={styles.packageVersion}>v{version}</span>
        </li>
      ))}
    </ul>
  );
};

export default DependencyList;