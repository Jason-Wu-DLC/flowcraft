import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentApp } from '../store';
import { RootState } from '../store';
import { Home, PenTool, Eye, Settings } from 'lucide-react';
import styles from './Navigation.module.scss';

interface NavigationProps {
  currentApp?: string;
  onAppChange?: (appName: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentApp, onAppChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const globalState = useSelector((state: RootState) => state.global);

  const handleAppChange = (appName: string) => {
    dispatch(setCurrentApp(appName));
    onAppChange?.(appName);
    
    // 根据应用类型进行路由跳转
    switch (appName) {
      case 'designer':
        navigate('/designer');
        break;
      case 'preview':
        navigate('/preview');
        break;
      case 'home':
      default:
        navigate('/');
        break;
    }
  };

  const isActive = (appName: string) => {
    return currentApp === appName || location.pathname.startsWith(`/${appName}`);
  };

  const navItems = [
    { app: 'home', label: '首页', icon: <Home size={18} /> },
    { app: 'designer', label: '设计器', icon: <PenTool size={18} /> },
    { app: 'preview', label: '预览', icon: <Eye size={18} /> },
  ];

  return (
    <div className={styles.navigation}>
      <div className={styles.brand}>
        <div className={styles.brandLink}>
          <div className={styles.logo}>FC</div>
          <span className={styles.brandText}>FlowCraft</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <button
            key={item.app}
            onClick={() => handleAppChange(item.app)}
            className={`${styles.navLink} ${isActive(item.app) ? styles.active : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
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