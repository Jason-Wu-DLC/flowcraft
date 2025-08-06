import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { marketplaceService, MarketComponent, ComponentVersion } from '../services/marketplaceService';
import styles from './MarketplaceDetailsPage.module.scss';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import VersionHistoryList from '../components/VersionHistoryList';
import DependencyList from '../components/DependencyList';
import Button from '@flowcraft/shared/components/Button';
import BackButton from '../components/BackButton';

const MarketplaceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [component, setComponent] = useState<MarketComponent | null>(null);
  const [versions, setVersions] = useState<ComponentVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<boolean>(false);

  // 获取组件详情和版本历史
  const fetchComponentDetails = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      // 并行获取组件详情和版本历史
      const [componentDetails, componentVersions] = await Promise.all([
        marketplaceService.getComponentDetails(id),
        marketplaceService.getComponentVersions(id)
      ]);

      setComponent(componentDetails);
      setVersions(componentVersions);
      // 默认选择最新版本
      if (componentVersions.length > 0) {
        setSelectedVersion(componentVersions[0].version);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取组件详情失败，请稍后重试');
      console.error('Failed to fetch component details:', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载数据
  useEffect(() => {
    if (id) {
      fetchComponentDetails();
    }
  }, [id]);

  // 处理组件下载
  const handleDownload = async () => {
    if (!component || !selectedVersion) return;

    try {
      setDownloading(true);
      await marketplaceService.downloadComponent(component.id, selectedVersion);
      alert(`${component.name} v${selectedVersion} 下载成功！已添加到您的组件库`);
      navigate('/marketplace');
    } catch (err) {
      alert(err instanceof Error ? err.message : '组件下载失败，请重试');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" />
        <p>正在加载组件详情...</p>
      </div>
    );
  }

  if (error || !component) {
    return (
      <div className={styles.errorContainer}>
        <ErrorAlert
          message={error || '组件不存在或已被移除'}
          onRetry={fetchComponentDetails}
        />
        <Button onClick={() => navigate('/marketplace')} className={styles.backButton}>
          返回组件市场
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.detailsPage}>
      <BackButton onClick={() => navigate('/marketplace')} />

      <div className={styles.header}>
        <div className={styles.thumbnail}>
          {component.thumbnailUrl ? (
            <img src={component.thumbnailUrl} alt={component.name} />
          ) : (
            <div className={styles.defaultThumbnail}>{component.icon || '📦'}</div>
          )}
        </div>

        <div className={styles.componentInfo}>
          <div className={styles.titleBar}>
            <h1 className={styles.title}>{component.name}</h1>
            {component.isPremium && (
              <span className={styles.premiumBadge}>高级</span>
            )}
          </div>

          <div className={styles.metaInfo}>
            <span className={styles.version}>v{component.version}</span>
            <span className={styles.author}>作者: {component.author}</span>
            <span className={styles.downloads}>下载: {component.downloadCount.toLocaleString()}</span>
            <span className={styles.rating}>评分: {component.rating.toFixed(1)} ★</span>
          </div>

          <div className={styles.price}>
            {component.price > 0 ? (
              <span>￥{component.price.toFixed(2)}</span>
            ) : (
              <span className={styles.free}>免费</span>
            )}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <Button
            variant="primary"
            size="large"
            onClick={handleDownload}
            disabled={downloading}
            className={styles.downloadButton}
          >
            {downloading ? '下载中...' : `下载 v${selectedVersion}`}
          </Button>
        </div>
      </div>

      <div className={styles.tabs}>
        <div className={styles.tabContent}>
          <h2>组件描述</h2>
          <div className={styles.description}>
            {component.description}
          </div>

          {component.dependencies && Object.keys(component.dependencies).length > 0 && (
            <div className={styles.dependencies}>
              <h3>依赖项</h3>
              <DependencyList dependencies={component.dependencies} />
            </div>
          )}
        </div>

        <div className={styles.tabContent}>
          <h2>版本历史</h2>
          {versions.length > 0 ? (
            <VersionHistoryList
              versions={versions}
              selectedVersion={selectedVersion}
              onSelectVersion={setSelectedVersion}
            />
          ) : (
            <p>暂无版本历史记录</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceDetailsPage;