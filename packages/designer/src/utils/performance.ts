import { debounce, throttle } from 'lodash';
import { fabric } from 'fabric';
import { CanvasComponent } from '../contexts/DesignerContext';

// 默认防抖延迟时间 (毫秒)
const DEFAULT_DEBOUNCE_DELAY = 100;
// 默认节流延迟时间 (毫秒)
const DEFAULT_THROTTLE_DELAY = 50;

/**
 * 创建防抖函数 - 用于优化频繁触发的事件处理
 * @param func 需要防抖的函数
 * @param delay 延迟时间(毫秒)
 * @returns 防抖处理后的函数
 */
export function createDebouncedFunction<T extends (...args: any[]) => any>(
  func: T,
  delay: number = DEFAULT_DEBOUNCE_DELAY
): (...args: Parameters<T>) => void {
  return debounce(func, delay) as (...args: Parameters<T>) => void;
}

/**
 * 创建节流函数 - 用于优化连续触发的事件处理
 * @param func 需要节流的函数
 * @param delay 节流时间间隔(毫秒)
 * @returns 节流处理后的函数
 */
export function createThrottledFunction<T extends (...args: any[]) => any>(
  func: T,
  delay: number = DEFAULT_THROTTLE_DELAY
): (...args: Parameters<T>) => void {
  return throttle(func, delay) as (...args: Parameters<T>) => void;
}

/**
 * 优化Fabric画布渲染性能
 * @param canvas Fabric画布实例
 * @param options 优化选项
 */
export function optimizeCanvasRendering(
  canvas: fabric.Canvas,
  options: { enableRetinaScaling?: boolean; enableDirtyRendering?: boolean; renderOnAddRemove?: boolean } = {}
): void {
  const { enableRetinaScaling = false, enableDirtyRendering = true, renderOnAddRemove = false } = options;

  // 禁用视网膜缩放以提高性能
  canvas.enableRetinaScaling = enableRetinaScaling;

  // 启用脏区域渲染，只重绘变化的部分
  if (enableDirtyRendering) {
    canvas.renderOnAddRemove = renderOnAddRemove;
    canvas.dirtyRender = true;
  }

  // 优化动画循环
  canvas.set({
    // 减少动画帧率以降低CPU占用
    // animationDuration: 100,
    // 启用图像平滑
    imageSmoothingEnabled: true,
  });
}

/**
 * 批量更新组件，减少画布重绘次数
 * @param canvas Fabric画布实例
 * @param updateFn 更新函数
 */
export function batchUpdateCanvas(
  canvas: fabric.Canvas,
  updateFn: () => void
): void {
  // 暂停画布渲染
  canvas.pauseRendering();

  try {
    // 执行所有更新
    updateFn();
  } finally {
    // 恢复渲染并刷新一次
    canvas.resumeRendering();
    canvas.requestRenderAll();
  }
}

/**
 * 组件数据结构优化 - 移除不必要的属性
 * @param components 组件列表
 * @returns 优化后的组件列表
 */
export function optimizeComponentData(components: CanvasComponent[]): CanvasComponent[] {
  return components.map(component => ({
    ...component,
    // 移除可能存在的临时或计算属性
    tempId: undefined,
    computed: undefined,
    // 仅保留必要的属性
    properties: compactObject(component.properties)
  }));
}

/**
 * 压缩对象，移除值为undefined、null或空字符串的属性
 * @param obj 要压缩的对象
 * @returns 压缩后的对象
 */
function compactObject<T extends Record<string, any>>(obj: T): T {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== '') {
      result[key as keyof T] = value;
    }
  }

  return result as T;
}

/**
 * 计算组件数据大小，用于性能监控
 * @param components 组件列表
 * @returns 数据大小(字节)
 */
export function calculateComponentDataSize(components: CanvasComponent[]): number {
  try {
    const jsonString = JSON.stringify(components);
    return new Blob([jsonString]).size;
  } catch (error) {
    console.error('Failed to calculate component data size:', error);
    return 0;
  }
}

/**
 * 监控并记录性能指标
 * @param metricName 指标名称
 * @param value 指标值
 * @param threshold 阈值，超过时记录警告
 */
export function trackPerformanceMetric(
  metricName: string,
  value: number,
  threshold?: number
): void {
  const performanceData = {
    metric: metricName,
    value,
    timestamp: new Date().toISOString(),
  };

  // 在实际应用中，可以发送到监控系统
  console.log('[Performance]', performanceData);

  if (threshold && value > threshold) {
    console.warn(`[Performance Warning] ${metricName} exceeds threshold: ${value} > ${threshold}`);
  }
}

/**
 * 使用Web Worker处理复杂计算，避免阻塞主线程
 * @param workerScriptPath Worker脚本路径
 * @param data 要发送给Worker的数据
 * @returns Promise，解析为Worker的返回结果
 */
export function runInWorker<T, U>(workerScriptPath: string, data: T): Promise<U> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerScriptPath);

    worker.postMessage(data);

    worker.onmessage = (e) => {
      resolve(e.data);
      worker.terminate();
    };

    worker.onerror = (error) => {
      reject(error);
      worker.terminate();
    };
  });
}