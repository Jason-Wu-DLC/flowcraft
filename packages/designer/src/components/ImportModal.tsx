import React, { useState } from 'react';
import styles from './ImportModal.module.scss';
import Modal from '@flowcraft/shared/components/Modal';
import Button from '@flowcraft/shared/components/Button';
import Input from '@flowcraft/shared/components/Input';
import { useVersionContext } from '../contexts/VersionContext';

interface ImportModalProps {
  visible: boolean;
  onClose: () => void;
  onImportSuccess?: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ visible, onClose, onImportSuccess }) => {
  const { importVersion } = useVersionContext();
  const [importData, setImportData] = useState('');
  const [versionName, setVersionName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  // 验证JSON格式
  const isValidJson = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleImport = () => {
    if (!importData.trim()) {
      setError('请输入有效的版本数据');
      return;
    }

    if (!isValidJson(importData)) {
      setError('JSON格式无效，请检查输入');
      return;
    }

    if (!versionName.trim()) {
      setVersionName(`导入版本 ${new Date().toLocaleString()}`);
    }

    try {
      setIsImporting(true);
      setError(null);
      importVersion(importData, versionName.trim());
      onImportSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : '版本导入失败，请检查数据格式');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Modal
      title="导入版本"
      visible={visible}
      onClose={onClose}
      footer={null}
    >
      <div className={styles.importModal}>
        <p className={styles.modalDescription}>
          导入JSON格式的版本数据，可从其他项目或备份中恢复版本
        </p>

        <div className={styles.versionNameInput}>
          <Input
            label="版本名称"
            value={versionName}
            onChange={(e) => setVersionName(e.target.value)}
            placeholder={`导入版本 ${new Date().toLocaleString()}`}
          />
        </div>

        <div className={styles.importDataContainer}>
          <p className={styles.dataLabel}>版本数据:</p>
          <textarea
            className={styles.dataInput}
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            placeholder='粘贴JSON格式的版本数据...'
            rows={8}
          />
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <div className={styles.importControls}>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isImporting}
          >
            取消
          </Button>

          <Button
            variant="primary"
            onClick={handleImport}
            disabled={isImporting || !importData.trim()}
          >
            {isImporting ? '导入中...' : '导入版本'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImportModal;