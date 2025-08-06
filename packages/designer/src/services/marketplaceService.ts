import axios from 'axios';

// 模拟组件市场API基础URL
const MARKETPLACE_API_URL = 'https://api.flowcraft.com/marketplace';

// 组件类型定义
export interface MarketComponent {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  type: string;
  thumbnailUrl: string;
  downloadCount: number;
  rating: number;
  price: number;
  isPremium: boolean;
  dependencies?: Record<string, string>;
}

// 组件版本历史类型
export interface ComponentVersion {
  version: string;
  releaseDate: string;
  changelog: string;
  downloadUrl: string;
}

// 市场服务类
export class MarketplaceService {
  private static instance: MarketplaceService;
  private token?: string;

  private constructor() {
    // 初始化时尝试从本地存储获取token
    this.token = localStorage.getItem('marketplace_token') || undefined;
  }

  // 单例模式获取服务实例
  public static getInstance(): MarketplaceService {
    if (!MarketplaceService.instance) {
      MarketplaceService.instance = new MarketplaceService();
    }
    return MarketplaceService.instance;
  }

  // 设置认证token
  setAuthToken(token: string): void {
    this.token = token;
    localStorage.setItem('marketplace_token', token);
  }

  // 清除认证token
  clearAuthToken(): void {
    this.token = undefined;
    localStorage.removeItem('marketplace_token');
  }

  // 获取组件列表
  async getComponents(filters?: { type?: string; search?: string; page?: number; limit?: number }): Promise<{ components: MarketComponent[]; total: number }> {
    const params = { ...filters, page: filters?.page || 1, limit: filters?.limit || 10 };
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};

    try {
      const response = await axios.get(`${MARKETPLACE_API_URL}/components`, { params, headers });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch components:', error);
      throw new Error('获取组件列表失败，请重试');
    }
  }

  // 获取单个组件详情
  async getComponentDetails(id: string): Promise<MarketComponent> {
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};

    try {
      const response = await axios.get(`${MARKETPLACE_API_URL}/components/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch component ${id} details:`, error);
      throw new Error('获取组件详情失败，请重试');
    }
  }

  // 获取组件版本历史
  async getComponentVersions(componentId: string): Promise<ComponentVersion[]> {
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};

    try {
      const response = await axios.get(`${MARKETPLACE_API_URL}/components/${componentId}/versions`, { headers });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch versions for component ${componentId}:`, error);
      throw new Error('获取组件版本历史失败，请重试');
    }
  }

  // 下载组件
  async downloadComponent(componentId: string, version?: string): Promise<{ success: boolean; data: any }> {
    if (!this.token) {
      throw new Error('请先登录以下载组件');
    }

    try {
      const response = await axios.post(
        `${MARKETPLACE_API_URL}/components/${componentId}/download`,
        { version },
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to download component ${componentId}:`, error);
      throw new Error('下载组件失败，请重试');
    }
  }

  // 搜索组件
  async searchComponents(query: string): Promise<MarketComponent[]> {
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};

    try {
      const response = await axios.get(`${MARKETPLACE_API_URL}/search`, { params: { q: query }, headers });
      return response.data.components;
    } catch (error) {
      console.error(`Failed to search components with query: ${query}`, error);
      throw new Error('搜索组件失败，请重试');
    }
  }
}

// 创建单例实例并导出
export const marketplaceService = MarketplaceService.getInstance();