import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addGroup, addNodesToGroup } from '../store';
import styles from './Toolbar.module.scss';

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedNodeIds, nodes } = useSelector((state: RootState) => state.canvas);

  // 计算分组外框
  const handleGroup = () => {
    if (!selectedNodeIds || selectedNodeIds.length < 2) return;
    const groupNodes = nodes.filter(n => selectedNodeIds.includes(n.id));
    if (groupNodes.length < 2) return;
    const minX = Math.min(...groupNodes.map(n => n.x));
    const minY = Math.min(...groupNodes.map(n => n.y));
    const maxX = Math.max(...groupNodes.map(n => n.x + 120));
    const maxY = Math.max(...groupNodes.map(n => n.y + 40));
    const groupId = 'group_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    
    dispatch(addGroup({
      id: groupId,
      name: '分组',
      x: minX - 24,
      y: minY - 24,
      width: maxX - minX + 48,
      height: maxY - minY + 48,
      nodeIds: groupNodes.map(n => n.id),
      collapsed: false,
      zIndex: 1,
    }));
    
    dispatch(addNodesToGroup({ groupId, nodeIds: groupNodes.map(n => n.id) }));
  };

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
        {/* 分组按钮 */}
        <button
          className={styles.toolButton}
          title="分组"
          onClick={handleGroup}
          disabled={!selectedNodeIds || selectedNodeIds.length < 2}
        >
          组
        </button>
        {/* 批量分组按钮 */}
        <button
          className={styles.toolButton}
          title="批量分组"
          onClick={handleGroup}
          disabled={!selectedNodeIds || selectedNodeIds.length < 2}
        >
          批量组
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