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
      
      case 'text':
        return (
          <div style={{ 
            padding: '8px', 
            fontSize: node.props.fontSize || 14,
            color: node.props.color || '#333'
          }}>
            {node.props.content || '文本内容'}
          </div>
        );
      
      case 'image':
        return (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            backgroundColor: '#f0f9ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed #bae6fd'
          }}>
            <span>🖼️ 图片</span>
          </div>
        );
      
      case 'container':
        return (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            backgroundColor: node.props.backgroundColor || '#f8f9fa',
            padding: node.props.padding || 16,
            borderRadius: '4px',
            border: '1px solid #d1d5db'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span>📦 容器</span>
            </div>
          </div>
        );
      
      case 'row':
        return (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex',
            border: '1px solid #d1d5db',
            backgroundColor: '#ffffff'
          }}>
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                style={{ 
                  flex: 1, 
                  borderRight: i < 3 ? '1px solid #d1d5db' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span>行 {i}</span>
              </div>
            ))}
          </div>
        );
      
      case 'column':
        return (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #d1d5db',
            backgroundColor: '#ffffff'
          }}>
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                style={{ 
                  flex: 1, 
                  borderBottom: i < 3 ? '1px solid #d1d5db' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span>列 {i}</span>
              </div>
            ))}
          </div>
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
      
      case 'chart':
        return (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex',
            flexDirection: 'column',
            padding: '8px',
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db'
          }}>
            <div style={{ marginBottom: '8px' }}>📊 图表</div>
            <div style={{ 
              flex: 1, 
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              gap: '4px'
            }}>
              {[60, 80, 40, 70, 50].map((height, index) => (
                <div 
                  key={index}
                  style={{ 
                    width: '16px', 
                    height: `${height}%`, 
                    backgroundColor: '#3b82f6',
                    borderRadius: '2px 2px 0 0'
                  }}
                />
              ))}
            </div>
          </div>
        );
      
      case 'list':
        const items = node.props.items || ['项目1', '项目2', '项目3'];
        return (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            padding: '8px',
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db'
          }}>
            <div style={{ marginBottom: '8px' }}>📋 列表</div>
            <ul style={{ 
              margin: 0, 
              padding: '0 0 0 16px' 
            }}>
              {items.map((item: string, index: number) => (
                <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
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