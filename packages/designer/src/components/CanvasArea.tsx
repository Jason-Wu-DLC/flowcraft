import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { selectNode, selectEdge, updateNode, addNode } from '../store';
import styles from './CanvasArea.module.scss';

const CanvasArea: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { nodes, edges, selectedNodeId, selectedEdgeId } = useSelector(
    (state: RootState) => state.canvas
  );

  // 初始化Fabric.js画布
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1200,
      height: 800,
      backgroundColor: '#f8fafc',
      selection: true,
      preserveObjectStacking: true,
    });

    // 设置网格背景
    const gridSize = 20;
    const gridPattern = createGridPattern(gridSize);
    canvas.setBackgroundColor(gridPattern, () => {
      canvas.renderAll();
    });

    // 网格吸附
    canvas.on('object:moving', (e: any) => {
      const obj = e.target;
      if (obj) {
        const left = Math.round(obj.left! / gridSize) * gridSize;
        const top = Math.round(obj.top! / gridSize) * gridSize;
        obj.set({ left, top });
      }
    });

    // 选择事件
    canvas.on('selection:created', (e: any) => {
      const selectedObjects = e.selected;
      if (selectedObjects && selectedObjects.length === 1) {
        const obj = selectedObjects[0];
        if (obj.data?.type === 'node') {
          dispatch(selectNode(obj.data.id));
        } else if (obj.data?.type === 'edge') {
          dispatch(selectEdge(obj.data.id));
        }
      }
    });

    // 清除选择
    canvas.on('selection:cleared', () => {
      dispatch(selectNode(null));
      dispatch(selectEdge(null));
    });

    // 对象移动事件
    canvas.on('object:modified', (e: any) => {
      const obj = e.target;
      if (obj && obj.data?.type === 'node') {
        dispatch(updateNode({
          id: obj.data.id,
          updates: {
            x: obj.left!,
            y: obj.top!,
          },
        }));
      }
    });

    fabricCanvasRef.current = canvas;
    setIsReady(true);

    // 添加画布事件监听
    if (containerRef.current) {
      containerRef.current.addEventListener('drop', handleDrop as any);
      containerRef.current.addEventListener('dragover', handleDragOver as any);
    }

    return () => {
      // 清理事件监听
      if (containerRef.current) {
        containerRef.current.removeEventListener('drop', handleDrop as any);
        containerRef.current.removeEventListener('dragover', handleDragOver as any);
      }
      canvas.dispose();
    };
  }, [dispatch]);

  // 处理拖拽放置事件
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (!fabricCanvasRef.current || !e.dataTransfer) return;

    const componentId = e.dataTransfer.getData('text/plain');
    if (!componentId) return;

    // 获取画布上的坐标
    const pointer = fabricCanvasRef.current.getPointer(e);
    
    // 根据组件类型创建默认props
    const defaultProps: Record<string, any> = {
      button: { label: '按钮', color: '#38bdf8' },
      input: { placeholder: '请输入...', width: 200 },
      text: { content: '文本内容', fontSize: 16 },
      image: { src: '', alt: '图片' },
      container: { backgroundColor: '#f8f9fa', padding: 16 },
      row: { columns: 3 },
      column: { rows: 3 },
      table: { columns: '列1,列2,列3', rows: 3 },
      chart: { type: 'bar' },
      list: { items: ['项目1', '项目2', '项目3'] }
    };

    // 创建新节点
    const newNode = {
      id: `node_${Date.now()}`,
      type: componentId,
      x: pointer.x,
      y: pointer.y,
      props: defaultProps[componentId] || {}
    };

    // 添加到Redux store
    dispatch(addNode(newNode));
  };

  // 阻止默认拖拽行为
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  // 创建网格背景
  const createGridPattern = (size: number) => {
    const patternCanvas = document.createElement('canvas');
    const patternContext = patternCanvas.getContext('2d')!;
    
    patternCanvas.width = size;
    patternCanvas.height = size;
    
    patternContext.strokeStyle = '#e2e8f0';
    patternContext.lineWidth = 1;
    patternContext.beginPath();
    patternContext.moveTo(size, 0);
    patternContext.lineTo(size, size);
    patternContext.lineTo(0, size);
    patternContext.stroke();
    
    return new fabric.Pattern({
      source: patternCanvas,
      repeat: 'repeat',
    });
  };

  // 创建Fabric节点
  const createFabricNode = (node: any) => {
    const nodeConfig = getNodeConfig(node.type);
    
    const fabricNode = new fabric.Group([
      new fabric.Rect({
        left: 0,
        top: 0,
        width: nodeConfig.width,
        height: nodeConfig.height,
        fill: nodeConfig.fill,
        stroke: nodeConfig.stroke,
        strokeWidth: 2,
        rx: 4,
        ry: 4,
      }),
      new fabric.Text(node.props.label || nodeConfig.label, {
        left: 10,
        top: 10,
        fontSize: 14,
        fill: '#1f2937',
        fontFamily: 'Arial',
      }),
    ], {
      left: node.x,
      top: node.y,
      data: { type: 'node', id: node.id },
      hasControls: true,
      hasBorders: true,
      lockRotation: true,
    });

    return fabricNode;
  };

  // 获取节点配置
  const getNodeConfig = (type: string) => {
    const configs: Record<string, any> = {
      button: {
        width: 120,
        height: 40,
        fill: '#3b82f6',
        stroke: '#2563eb',
        label: '按钮',
      },
      input: {
        width: 200,
        height: 40,
        fill: '#ffffff',
        stroke: '#d1d5db',
        label: '输入框',
      },
      text: {
        width: 120,
        height: 40,
        fill: '#ffffff',
        stroke: '#d1d5db',
        label: '文本',
      },
      image: {
        width: 150,
        height: 150,
        fill: '#f0f9ff',
        stroke: '#bae6fd',
        label: '图片',
      },
      container: {
        width: 300,
        height: 200,
        fill: '#ffffff',
        stroke: '#d1d5db',
        label: '容器',
      },
      row: {
        width: 400,
        height: 100,
        fill: '#ffffff',
        stroke: '#d1d5db',
        label: '行',
      },
      column: {
        width: 200,
        height: 200,
        fill: '#ffffff',
        stroke: '#d1d5db',
        label: '列',
      },
      table: {
        width: 300,
        height: 200,
        fill: '#ffffff',
        stroke: '#d1d5db',
        label: '表格',
      },
      chart: {
        width: 300,
        height: 200,
        fill: '#ffffff',
        stroke: '#d1d5db',
        label: '图表',
      },
      list: {
        width: 250,
        height: 200,
        fill: '#ffffff',
        stroke: '#d1d5db',
        label: '列表',
      },
    };
    return configs[type] || configs.button;
  };

  // 同步store状态到画布
  useEffect(() => {
    if (!fabricCanvasRef.current || !isReady) return;

    // 清除画布
    fabricCanvasRef.current.clear();

    // 重新设置背景
    const gridPattern = createGridPattern(20);
    fabricCanvasRef.current.setBackgroundColor(gridPattern, () => {
      fabricCanvasRef.current!.renderAll();
    });

    // 添加所有节点
    nodes.forEach(node => {
      const fabricNode = createFabricNode(node);
      fabricCanvasRef.current!.add(fabricNode);
    });

    // 添加所有连线
    edges.forEach(edge => {
      const fabricEdge = createFabricEdge(edge);
      if (fabricEdge) {
        fabricCanvasRef.current!.add(fabricEdge);
      }
    });

    fabricCanvasRef.current.renderAll();
  }, [nodes, edges, isReady]);

  // 创建Fabric连线
  const createFabricEdge = (edge: any) => {
    const fromNode = nodes.find(n => n.id === edge.from);
    const toNode = nodes.find(n => n.id === edge.to);
    
    if (!fromNode || !toNode) return null;

    const fromCenter = getNodeCenter(fromNode);
    const toCenter = getNodeCenter(toNode);

    const line = new fabric.Line([
      fromCenter.x,
      fromCenter.y,
      toCenter.x,
      toCenter.y,
    ], {
      stroke: '#6b7280',
      strokeWidth: 2,
      selectable: true,
      data: { type: 'edge', id: edge.id },
    });

    // 添加箭头
    const arrow = new fabric.Triangle({
      left: toCenter.x - 5,
      top: toCenter.y - 5,
      width: 10,
      height: 10,
      fill: '#6b7280',
      angle: getArrowAngle(fromCenter, toCenter),
      selectable: false,
    });

    const edgeGroup = new fabric.Group([line, arrow], {
      data: { type: 'edge', id: edge.id },
      selectable: true,
    });

    return edgeGroup;
  };

  // 获取节点中心点
  const getNodeCenter = (node: any) => {
    const config = getNodeConfig(node.type);
    return {
      x: node.x + config.width / 2,
      y: node.y + config.height / 2,
    };
  };

  // 获取箭头角度
  const getArrowAngle = (from: any, to: any) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return Math.atan2(dy, dx) * 180 / Math.PI;
  };

  return (
    <div 
      ref={containerRef}
      className={styles.canvasArea}
    >
      <canvas ref={canvasRef} className={styles.canvas} />
      {!isReady && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>正在初始化Fabric.js画布...</p>
        </div>
      )}
    </div>
  );
};

export default CanvasArea;