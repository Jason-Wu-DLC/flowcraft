// packages/shell/src/components/Navigation.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PenTool, Eye, Users, Settings } from 'lucide-react';
import styles from './Navigation.module.scss';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: <Home size={18} /> },
    { path: '/designer', label: '设计器', icon: <PenTool size={18} /> },
    { path: '/preview', label: '预览', icon: <Eye size={18} /> },
    { path: '/collaboration', label: '协作', icon: <Users size={18} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.brand}>
        <Link to="/" className={styles.brandLink}>
          <div className={styles.logo}>FC</div>
          <span className={styles.brandText}>FlowCraft</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <button className={styles.actionButton}>
          <Settings size={18} />
        </button>
        <button className={styles.primaryButton}>登录</button>
        <button className={styles.secondaryButton}>注册</button>
      </div>
    </div>
  );
};

export default Navigation;