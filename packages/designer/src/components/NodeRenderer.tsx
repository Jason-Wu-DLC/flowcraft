import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { selectNode, updateNode, removeNode, setSelectedNodeIds } from '../store';
import styles from './NodeRenderer.module.scss';

interface NodeRendererProps {
  node: any;
  selected: boolean;
  onStartConnect?: (nodeId: string, outputIndex: number) => void;
  onEndConnect?: (nodeId: string, inputIndex: number) => void;
  isConnectTarget?: boolean;
}

const NodeRenderer: React.FC<NodeRendererProps> = ({ node, selected, onStartConnect, onEndConnect, isConnectTarget }) => {
  const dispatch = useDispatch();
  const { selectedNodeIds } = useSelector((state: RootState) => state.canvas);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // 拖动事件
  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    dragging.current = true;
    offset.current = {
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;
    
    // 如果是多选状态，批量移动所有选中节点
    if (selectedNodeIds.length > 1 && selectedNodeIds.includes(node.id)) {
      const dx = newX - node.x;
      const dy = newY - node.y;
      selectedNodeIds.forEach(nodeId => {
        dispatch(updateNode({
          id: nodeId,
          updates: { x: node.x + dx, y: node.y + dy }
        }));
      });
    } else {
      // 单选状态，只移动当前节点
      dispatch(updateNode({
        id: node.id,
        updates: { x: newX, y: newY }
      }));
    }
  };

  const onMouseUp = () => {
    dragging.current = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  // 删除节点
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeNode(node.id));
  };

  // 节点点击（支持Shift多选）
  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.shiftKey) {
      // Shift+点击：多选/取消多选
      if (selectedNodeIds.includes(node.id)) {
        const newSelectedIds = selectedNodeIds.filter(id => id !== node.id);
        dispatch(setSelectedNodeIds(newSelectedIds));
      } else {
        const newSelectedIds = [...selectedNodeIds, node.id];
        dispatch(setSelectedNodeIds(newSelectedIds));
      }
    } else {
      // 普通点击：单选
      dispatch(selectNode(node.id));
    }
  };

  // 根据类型和props渲染内容和样式
  const getNodeStyle = () => {
    const baseStyle = {
      position: 'absolute' as const,
      left: node.x,
      top: node.y,
      width: 120,
      height: 40,
      border: selected ? '2px solid #3b82f6' : '1px solid #d1d5db',
      borderRadius: '4px',
      backgroundColor: '#ffffff',
      cursor: 'move',
      userSelect: 'none' as const,
      zIndex: selected ? 10 : 1,
    };

    return baseStyle;
  };

  const nodeStyle = getNodeStyle();

  // 根据节点类型渲染内容
  const renderNodeContent = () => {
    switch (node.type) {
      case 'button':
        return (
          <div style={{ 
            backgroundColor: node.props.color || '#38bdf8',
            color: '#ffffff',
            padding: '8px 12px',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500',
          }}>
            {node.props.label || '按钮'}
          </div>
        );
      
      case 'input':
        return (
          <input
            type="text"
            placeholder={node.props.placeholder || '请输入...'}
            style={{
              width: node.props.width || 120,
              height: '100%',
              border: 'none',
              outline: 'none',
              padding: '8px',
              fontSize: '14px',
            }}
            readOnly
          />
        );
      
      case 'table':
        const columns = node.props.columns ? node.props.columns.split(',') : ['列1', '列2', '列3'];
        const rows = node.props.rows || 3;
        
        return (
          <div style={{ padding: '8px', fontSize: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {columns.map((col: string, index: number) => (
                    <th key={index} style={{ border: '1px solid #d1d5db', padding: '4px', textAlign: 'center' }}>
                      {col.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rows }, (_, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col: string, colIndex: number) => (
                      <td key={colIndex} style={{ border: '1px solid #d1d5db', padding: '4px', textAlign: 'center' }}>
                        -
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return (
          <div style={{ padding: '8px', textAlign: 'center', fontSize: '14px' }}>
            {node.props.label || '节点'}
          </div>
        );
    }
  };

  return (
    <div
      className="node-renderer"
      style={nodeStyle}
      onClick={handleNodeClick}
      onMouseDown={onMouseDown}
    >
      {renderNodeContent()}
      
      {/* 删除按钮 */}
      {selected && (
        <button
          onClick={handleDelete}
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>
      )}

      {/* 连接点 */}
      <div
        style={{
          position: 'absolute',
          left: '-4px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '8px',
          height: '8px',
          backgroundColor: '#6b7280',
          borderRadius: '50%',
          cursor: 'crosshair',
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          onEndConnect?.(node.id, 0);
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '-4px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '8px',
          height: '8px',
          backgroundColor: '#6b7280',
          borderRadius: '50%',
          cursor: 'crosshair',
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onStartConnect?.(node.id, 0);
        }}
      />
    </div>
  );
};

export default NodeRenderer; 