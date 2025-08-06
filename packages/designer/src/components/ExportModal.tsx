import React from 'react';
import styles from './ExportModal.module.scss';
import Modal from '@flowcraft/shared/components/Modal';
import Button from '@flowcraft/shared/components/Button';
import { useVersionContext } from '../contexts/VersionContext';

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
  selectedVersionId: string | null;
}

const ExportModal: React.FC<ExportModalProps> = ({ visible, onClose, selectedVersionId }) => {
  const { exportVersion } = useVersionContext();
  const [exportData, setExportData] = React.useState('');
  const [isCopying, setIsCopying] = React.useState(false);
  const [copySuccess, setCopySuccess] = React.useState(false);

  React.useEffect(() => {
    if (visible && selectedVersionId) {
      const data = exportVersion(selectedVersionId);
      setExportData(data);
      setCopySuccess(false);
    }
  }, [visible, selectedVersionId, exportVersion]);

  const handleCopy = () => {
    if (!exportData) return;

    setIsCopying(true);
    navigator.clipboard.writeText(exportData)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy export data:', err);
      })
      .finally(() => {
        setIsCopying(false);
      });
  };

  const handleDownload = () => {
    if (!exportData || !selectedVersionId) return;

    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flowcraft-version-${selectedVersionId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <Modal
      title="导出版本"
      visible={visible}
      onClose={onClose}
      footer={null}
    >
      <div className={styles.exportModal}>
        <p className={styles.modalDescription}>
          导出版本数据为JSON格式，可用于备份或分享给其他用户
        </p>

        <div className={styles.exportControls}>
          <Button
            variant={copySuccess ? 'success' : 'primary'}
            onClick={handleCopy}
            disabled={isCopying || !exportData}
            className={styles.copyButton}
          >
            {copySuccess ? '已复制!' : isCopying ? '复制中...' : '复制到剪贴板'}
          </Button>

          <Button
            variant="secondary"
            onClick={handleDownload}
            disabled={!exportData}
          >
            下载JSON文件
          </Button>
        </div>

        <div className={styles.exportDataContainer}>
          <p className={styles.dataLabel}>版本数据预览:</p>
          <pre className={styles.dataPreview}>{exportData || '加载中...'}</pre>
        </div>
      </div>
    </Modal>
  );
};

export default ExportModal;