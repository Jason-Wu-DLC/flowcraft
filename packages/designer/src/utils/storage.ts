import { Version } from '../contexts/VersionContext';

/**
 * 将数据保存到localStorage
 * @param key 存储键名
 * @param data 要存储的数据
 */
export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Failed to save data to localStorage with key ${key}:`, error);
    throw new Error('保存数据失败，请检查存储空间');
  }
}

/**
 * 从localStorage加载数据
 * @param key 存储键名
 * @returns 解析后的数据或null
 */
export function loadFromLocalStorage<T>(key: string): T | null {
  try {
    const serializedData = localStorage.getItem(key);
    if (!serializedData) return null;
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error(`Failed to load data from localStorage with key ${key}:`, error);
    throw new Error('加载数据失败，可能是数据格式损坏');
  }
}

/**
 * 从localStorage删除数据
 * @param key 存储键名
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove data from localStorage with key ${key}:`, error);
    throw new Error('删除数据失败');
  }
}

/**
 * 清除所有版本相关的本地存储数据
 */
export function clearVersionStorage(): void {
  try {
    // 只清除版本相关的存储项
    Object.keys(localStorage)
      .filter(key => key.startsWith('flowcraft_versions'))
      .forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Failed to clear version storage:', error);
    throw new Error('清除版本数据失败');
  }
}