import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CanvasComponent } from './DesignerContext';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

// 版本信息类型
export interface Version {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  components: CanvasComponent[];
  isAutoSave?: boolean;
}

// 上下文值类型
export interface VersionContextType {
  versions: Version[];
  currentVersion: Version | null;
  isLoading: boolean;
  error: string | null;
  createVersion: (name: string, description?: string) => void;
  loadVersion: (versionId: string) => void;
  deleteVersion: (versionId: string) => void;
  updateVersionName: (versionId: string, newName: string) => void;
  exportVersion: (versionId: string) => string;
  importVersion: (versionData: string, name?: string) => void;
  getVersionDiff: (versionId1: string, versionId2: string) => object;
}

// 默认上下文值
const defaultContextValue: VersionContextType = {
  versions: [],
  currentVersion: null,
  isLoading: false,
  error: null,
  createVersion: () => {},
  loadVersion: () => {},
  deleteVersion: () => {},
  updateVersionName: () => {},
  exportVersion: () => '',
  importVersion: () => {},
  getVersionDiff: () => ({}),
};

// 创建上下文
const VersionContext = createContext<VersionContextType>(defaultContextValue);

// 提供者组件
export const VersionProvider: React.FC<{ children: ReactNode; components: CanvasComponent[] }> = ({ children, components }) => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [currentVersion, setCurrentVersion] = useState<Version | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const STORAGE_KEY = 'flowcraft_versions';
  const AUTO_SAVE_INTERVAL = 5 * 60 * 1000; // 5分钟自动保存

  // 从本地存储加载版本历史
  useEffect(() => {
    const loadVersions = () => {
      try {
        setIsLoading(true);
        const savedVersions = loadFromLocalStorage<Version[]>(STORAGE_KEY) || [];
        // 解析日期字符串为Date对象
        const parsedVersions = savedVersions.map(version => ({
          ...version,
          createdAt: new Date(version.createdAt)
        }));
        setVersions(parsedVersions);
      } catch (err) {
        setError('加载版本历史失败');
        console.error('Failed to load versions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadVersions();
  }, []);

  // 自动保存当前组件状态
  useEffect(() => {
    if (components.length === 0) return;

    const autoSaveTimer = setTimeout(() => {
      createAutoSaveVersion();
    }, AUTO_SAVE_INTERVAL);

    return () => clearTimeout(autoSaveTimer);
  }, [components]);

  // 保存版本历史到本地存储
  useEffect(() => {
    if (versions.length === 0) return;

    try {
      saveToLocalStorage(STORAGE_KEY, versions);
    } catch (err) {
      setError('保存版本历史失败');
      console.error('Failed to save versions:', err);
    }
  }, [versions]);

  // 创建自动保存版本
  const createAutoSaveVersion = () => {
    // 检查是否需要创建自动保存版本（避免频繁保存相同状态）
    const lastVersion = versions[versions.length - 1];
    if (lastVersion?.isAutoSave) {
      const lastVersionJson = JSON.stringify(lastVersion.components);
      const currentComponentsJson = JSON.stringify(components);
      if (lastVersionJson === currentComponentsJson) {
        return; // 状态未变化，不需要保存
      }
    }

    const autoSaveVersion: Version = {
      id: uuidv4(),
      name: `自动保存 ${new Date().toLocaleString()}`,
      createdAt: new Date(),
      components: [...components],
      isAutoSave: true
    };

    setVersions(prev => [...prev, autoSaveVersion]);
  };

  // 创建新版本
  const createVersion = (name: string, description?: string) => {
    const newVersion: Version = {
      id: uuidv4(),
      name,
      description,
      createdAt: new Date(),
      components: [...components],
      isAutoSave: false
    };

    setVersions(prev => [...prev, newVersion]);
    setCurrentVersion(newVersion);
  };

  // 加载指定版本
  const loadVersion = (versionId: string) => {
    const version = versions.find(v => v.id === versionId);
    if (!version) {
      setError('版本不存在');
      return;
    }

    setCurrentVersion(version);
    return version.components;
  };

  // 删除版本
  const deleteVersion = (versionId: string) => {
    setVersions(prev => prev.filter(v => v.id !== versionId));
    if (currentVersion?.id === versionId) {
      setCurrentVersion(null);
    }
  };

  // 更新版本名称
  const updateVersionName = (versionId: string, newName: string) => {
    setVersions(prev => prev.map(version => 
      version.id === versionId ? { ...version, name: newName } : version
    ));
  };

  // 导出版本为JSON字符串
  const exportVersion = (versionId: string): string => {
    const version = versions.find(v => v.id === versionId);
    if (!version) {
      setError('版本不存在');
      return '';
    }

    try {
      return JSON.stringify(version, null, 2);
    } catch (err) {
      setError('导出版本失败');
      console.error('Failed to export version:', err);
      return '';
    }
  };

  // 导入版本
  const importVersion = (versionData: string, name?: string) => {
    try {
      const parsedData = JSON.parse(versionData);

      // 验证导入的数据结构
      if (!parsedData.components || !Array.isArray(parsedData.components)) {
        setError('无效的版本数据');
        return;
      }

      const newVersion: Version = {
        id: uuidv4(),
        name: name || `导入版本 ${new Date().toLocaleString()}`,
        description: parsedData.description,
        createdAt: new Date(),
        components: parsedData.components,
        isAutoSave: false
      };

      setVersions(prev => [...prev, newVersion]);
      setCurrentVersion(newVersion);
    } catch (err) {
      setError('导入版本失败，无效的JSON数据');
      console.error('Failed to import version:', err);
    }
  };

  // 获取两个版本之间的差异
  const getVersionDiff = (versionId1: string, versionId2: string) => {
    const version1 = versions.find(v => v.id === versionId1);
    const version2 = versions.find(v => v.id === versionId2);

    if (!version1 || !version2) {
      setError('版本不存在');
      return {};
    }

    // 简化的差异比较实现
    return {
      version1Name: version1.name,
      version2Name: version2.name,
      componentCountDiff: version2.components.length - version1.components.length,
      createdAtDiff: Math.abs(version2.createdAt.getTime() - version1.createdAt.getTime()) / (1000 * 60) // 分钟差异
    };
  };

  const contextValue: VersionContextType = {
    versions,
    currentVersion,
    isLoading,
    error,
    createVersion,
    loadVersion,
    deleteVersion,
    updateVersionName,
    exportVersion,
    importVersion,
    getVersionDiff
  };

  return (
    <VersionContext.Provider value={contextValue}>
      {children}
    </VersionContext.Provider>
  );
};

// 自定义Hook便于使用上下文
 export const useVersionContext = () => {
  const context = useContext(VersionContext);
  if (context === defaultContextValue) {
    throw new Error('useVersionContext must be used within a VersionProvider');
  }
  return context;
};

export default VersionContext;