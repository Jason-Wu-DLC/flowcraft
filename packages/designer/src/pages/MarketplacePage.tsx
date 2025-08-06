import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { marketplaceService, MarketComponent } from '../services/marketplaceService';
import styles from './MarketplacePage.module.scss';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import Pagination from '../components/Pagination';
import ComponentCard from '../components/ComponentCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';

// 组件分类选项
const CATEGORY_OPTIONS = [
  { value: '', label: '所有分类' },
  { value: 'button', label: '按钮组件' },
  { value: 'form', label: '表单组件' },
  { value: 'layout', label: '布局组件' },
  { value: 'data', label: '数据展示' },
  { value: 'chart', label: '图表组件' },
];

const MarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const [components, setComponents] = useState<MarketComponent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalComponents, setTotalComponents] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('downloadCount');

  // 每页显示组件数量
  const COMPONENTS_PER_PAGE = 12;

  // 获取组件列表数据
  const fetchComponents = async () => {
    setLoading(true);
    setError(null);

    try {
      const filters = {
        page: currentPage,
        limit: COMPONENTS_PER_PAGE,
        search: searchQuery || undefined,
        type: selectedCategory || undefined,
      };

      const result = await marketplaceService.getComponents(filters);
      setComponents(result.components);
      setTotalComponents(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取组件列表失败，请稍后重试');
      console.error('Failed to fetch marketplace components:', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载和筛选条件变化时重新获取数据
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchComponents();
    }, 300); // 延迟搜索，避免频繁请求

    return () => clearTimeout(timer);
  }, [currentPage, searchQuery, selectedCategory, sortOption]);

  // 处理搜索提交
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // 搜索时重置到第一页
  };

  // 处理分类筛选
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 筛选时重置到第一页
  };

  // 处理排序变更
  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  // 处理组件下载
  const handleDownloadComponent = async (component: MarketComponent) => {
    try {
      setLoading(true);
      await marketplaceService.downloadComponent(component.id);
      // 下载成功后显示提示并刷新组件列表
      alert(`${component.name} 下载成功！已添加到您的组件库`);
      fetchComponents();
    } catch (err) {
      alert(err instanceof Error ? err.message : '组件下载失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 处理组件卡片点击
  const handleComponentClick = (component: MarketComponent) => {
    navigate(`/marketplace/details/${component.id}`);
  };

  return (
    <div className={styles.marketplacePage}>
      <header className={styles.pageHeader}>
        <h1>组件市场</h1>
        <p>浏览和下载高质量的流程组件，加速您的设计工作流</p>
      </header>

      <div className={styles.filterBar}>
        <SearchBar
          placeholder="搜索组件..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />

        <div className={styles.filterControls}>
          <FilterDropdown
            options={CATEGORY_OPTIONS}
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="选择分类"
          />

          <FilterDropdown
            options={[
              { value: 'downloadCount', label: '下载量' },
              { value: 'rating', label: '评分' },
              { value: 'releaseDate', label: '最新发布' },
            ]}
            value={sortOption}
            onChange={handleSortChange}
            placeholder="排序方式"
          />
        </div>
      </div>

      {error && <ErrorAlert message={error} onRetry={fetchComponents} />}

      {loading ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner size="large" />
          <p>正在加载组件市场...</p>
        </div>
      ) : (
        <>{
          components.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>未找到组件</h3>
              <p>尝试调整搜索条件或浏览其他分类</p>
              <button
                className={styles.resetButton}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
              >
                重置筛选条件
              </button>
            </div>
          ) : (
            <div className={styles.componentsGrid}>
              {components.map(component => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  onClick={() => handleComponentClick(component)}
                  onDownload={() => handleDownloadComponent(component)}
                  disabled={loading}
                />
              ))}
            </div>
          )
        }</>
      )}

      {totalComponents > COMPONENTS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalComponents / COMPONENTS_PER_PAGE)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MarketplacePage;