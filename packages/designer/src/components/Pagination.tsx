import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = '' 
}) => {
  // 生成页码范围
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    // 处理边界情况
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // 当前页在开始位置
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    // 当前页在结束位置
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // 当前页在中间位置
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ];
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label="分页导航">
      <ul className={styles.pageList}>
        <li className={styles.pageItem}>
          <button
            className={styles.pageLink}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
          >
            上一页
          </button>
        </li>

        {pageNumbers.map((page, index) => (
          <li key={index} className={styles.pageItem}>
            {typeof page === 'number' ? (
              <button
                className={`${styles.pageLink} ${currentPage === page ? styles.active : ''}`}
                onClick={() => handlePageClick(page)}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span className={styles.ellipsis}>...</span>
            )}
          </li>
        ))}

        <li className={styles.pageItem}>
          <button
            className={styles.pageLink}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
          >
            下一页
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;