import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { selectNode, selectEdge, updateNode } from '../store';

interface UseFabricCanvasOptions {
  width?: number;
  height?: number;
  gridSize?: number;
  snapToGrid?: boolean;
}

export const useFabricCanvas = (options: UseFabricCanvasOptions = {}) => {
  const {
    width = 1200,
    height = 800,
    gridSize = 20,
    snapToGrid = true,
  } = options;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();
  const { nodes, edges, selectedNodeId, selectedEdgeId } = useSelector(
    (state: RootState) => state.canvas
  );

  // 初始化Fabric.js画布
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#f8fafc',
      selection: true,
      preserveObjectStacking: true,
    });

    // 设置网格背景
    const gridPattern = createGridPattern(gridSize);
    canvas.setBackgroundColor(gridPattern, () => {
      canvas.renderAll();
    });

    // 启用网格吸附
    if (snapToGrid) {
      canvas.on('object:moving', (e) => {
        const obj = e.target;
        if (obj) {
          const left = Math.round(obj.left! / gridSize) * gridSize;
          const top = Math.round(obj.top! / gridSize) * gridSize;
          obj.set({ left, top });
        }
      });
    }

    // 选择事件
    canvas.on('selection:created', (e) => {
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
    canvas.on('object:modified', (e) => {
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

    return () => {
      canvas.dispose();
    };
  }, [dispatch, gridSize, snapToGrid, width, height]);

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

  return {
    canvasRef,
    fabricCanvas: fabricCanvasRef.current,
    isReady,
  };
};