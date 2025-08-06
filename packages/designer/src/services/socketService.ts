import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  // 连接Socket.io服务器
  connect(url: string = 'ws://localhost:3000') {
    this.socket = io(url, {
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
      timeout: 20000,
    });

    this.setupEventListeners();
  }

  // 设置事件监听器
  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Socket.io连接成功');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket.io连接断开，尝试重连...');
    });

    this.socket.on('reconnect', (attemptNumber: number) => {
      console.log(`✅ Socket.io重连成功，尝试次数: ${attemptNumber}`);
    });

    this.socket.on('reconnect_failed', () => {
      console.log('❌ Socket.io重连失败，已达到最大重试次数');
    });

    this.socket.on('error', (error: any) => {
      console.error('❌ Socket.io连接错误:', error);
    });
  }

  // 发送消息
  emit(event: string, data: any) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket未连接，无法发送消息');
    }
  }

  // 监听消息
  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // 移除监听器
  off(event: string, callback?: (data: any) => void) {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback);
      } else {
        this.socket.off(event);
      }
    }
  }

  // 断开连接
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // 检查连接状态
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // 获取Socket实例
  getSocket(): Socket | null {
    return this.socket;
  }
}

// 创建单例实例
export const socketService = new SocketService();

// 导出类型
export interface SocketEvents {
  'flow:update': { flowId: string; data: any };
  'flow:sync': { flowId: string; data: any };
  'user:join': { userId: string; flowId: string };
  'user:leave': { userId: string; flowId: string };
  'cursor:move': { userId: string; position: { x: number; y: number } };
  'node:select': { userId: string; nodeId: string };
  'node:move': { userId: string; nodeId: string; position: { x: number; y: number } };
  'edge:create': { userId: string; edge: any };
  'edge:delete': { userId: string; edgeId: string };
} 