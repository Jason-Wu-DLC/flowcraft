import React from 'react';
import styles from './ComponentLibrary.module.scss';

const ComponentLibrary: React.FC = () => {
  const componentGroups = [
    {
      title: '基础组件',
      components: [
        { id: 'button', name: '按钮' },
        { id: 'input', name: '输入框' },
        { id: 'text', name: '文本' },
        { id: 'image', name: '图片' },
      ],
    },
    {
      title: '布局组件',
      components: [
        { id: 'container', name: '容器' },
        { id: 'row', name: '行' },
        { id: 'column', name: '列' },
      ],
    },
    {
      title: '数据组件',
      components: [
        { id: 'table', name: '表格' },
        { id: 'chart', name: '图表' },
        { id: 'list', name: '列表' },
      ],
    },
  ];

  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    e.dataTransfer.setData('text/plain', componentId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className={styles.library}>
      <div className={styles.libraryHeader}>
        <h3 className={styles.libraryTitle}>组件库</h3>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            placeholder="搜索组件..."
          />
        </div>
      </div>

      <div className={styles.libraryContent}>
        {componentGroups.map((group) => (
          <div key={group.title} className={styles.componentGroup}>
            <h4 className={styles.groupTitle}>{group.title}</h4>
            <div className={styles.componentList}>
              {group.components.map((component) => (
                <div
                  key={component.id}
                  className={styles.componentItem}
                  draggable
                  onDragStart={(e) => handleDragStart(e, component.id)}
                >
                  <div className={styles.componentIcon}>
                    📦
                  </div>
                  <span className={styles.componentName}>
                    {component.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentLibrary;