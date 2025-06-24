import React, { useRef, useEffect } from 'react';
import styles from './CanvasArea.module.scss';


const CanvasArea: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = 'copy';
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const componentId = e.dataTransfer!.getData('text/plain');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      console.log(`添加组件 ${componentId} 到位置 (${x}, ${y})`);
      // TODO: 添加组件逻辑
    };

    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);

    return () => {
      canvas.removeEventListener('dragover', handleDragOver);
      canvas.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div className={styles.canvasArea}>
      <div className={styles.canvasContainer}>
        <div
          ref={canvasRef}
          className={styles.canvas}
        >
          {/* 网格背景 */}
          <div className={styles.grid} />

          {/* 空状态提示 */}
          <div className={styles.emptyState}>
            <h3>开始设计你的流程</h3>
            <p>从左侧组件库拖拽组件到画布开始设计</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasArea;
