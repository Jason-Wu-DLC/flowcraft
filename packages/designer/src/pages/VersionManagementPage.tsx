import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVersionContext } from '../contexts/VersionContext';
import { useDesignerContext } from '../contexts/DesignerContext';
import styles from './VersionManagementPage.module.scss';
import VersionList from '../components/VersionList';
import VersionDetail from '../components/VersionDetail';
import ExportModal from '../components/ExportModal';
import ImportModal from '../components/ImportModal';
import Button from '@flowcraft/shared/components/Button';
import Input from '@flowcraft/shared/components/Input';
import Textarea from '@flowcraft/shared/components/Textarea';
import Modal from '@flowcraft/shared/components/Modal';
import Alert from '../components/Alert';
import BackButton from '../components/BackButton';

const VersionManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { versions, createVersion, loadVersion, deleteVersion, updateVersionName, exportVersion, importVersion, isLoading } = useVersionContext();
  const { components, updateComponents } = useDesignerContext();
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newVersionName, setNewVersionName] = useState('');
  const [newVersionDescription, setNewVersionDescription] = useState('');
  const [importData, setImportData] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  // 获取选中的版本
  const selectedVersion = versions.find(v => v.id === selectedVersionId) || null;

  // 处理版本选择
  const handleVersionSelect = (versionId: string) => {
    setSelectedVersionId(versionId);
  };

  // 处理版本加载
  const handleLoadVersion = async (versionId: string) => {
    try {
      const versionComponents = loadVersion(versionId);
      if (versionComponents) {
        updateComponents(versionComponents);
        showAlert('版本加载成功', 'success');
        navigate('/designer');
      }
    } catch (err) {
      showAlert('版本加载失败', 'error');
    }
  };

  // 处理版本创建
  const handleCreateVersion = () => {
    if (!newVersionName.trim()) {
      showAlert('版本名称不能为空', 'error');
      return;
    }

    createVersion(newVersionName.trim(), newVersionDescription.trim());
    setShowCreateModal(false);
    setNewVersionName('');
    setNewVersionDescription('');
    showAlert('版本创建成功', 'success');
  };

  // 处理版本删除
  const handleDeleteVersion = (versionId: string) => {
    if (window.confirm('确定要删除此版本吗？此操作不可撤销。')) {
      deleteVersion(versionId);
      if (selectedVersionId === versionId) {
        setSelectedVersionId(null);
      }
      showAlert('版本删除成功', 'success');
    }
  };

  // 处理版本导出
  const handleExportVersion = (versionId: string) => {
    const exportData = exportVersion(versionId);
    if (exportData) {
      // 在实际应用中，这里可以触发文件下载
      navigator.clipboard.writeText(exportData).then(() => {
        showAlert('版本数据已复制到剪贴板', 'success');
      });
      setShowExportModal(false);
    }
  };

  // 处理版本导入
  const handleImportVersion = () => {
    if (!importData.trim()) {
      showAlert('导入数据不能为空', 'error');
      return;
    }

    try {
      importVersion(importData);
      setShowImportModal(false);
      setImportData('');
      showAlert('版本导入成功', 'success');
    } catch (err) {
      showAlert('版本导入失败', 'error');
    }
  };

  // 显示提示信息
  const showAlert = (message: string, type: 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  return (
    <div className={styles.versionManagementPage}>
      <div className={styles.header}>
        <BackButton onClick={() => navigate('/designer')} />
        <h1>版本管理</h1>
        <p>管理您的流程设计历史版本，支持创建、导入和导出</p>
      </div>

      {alertMessage && (
        <Alert type={alertType} className={styles.alert}>
          {alertMessage}
        </Alert>
      )}

      <div className={styles.actionBar}>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          创建新版本
        </Button>
        <Button variant="secondary" onClick={() => setShowImportModal(true)}>
          导入版本
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.versionListContainer}>
          <div className={styles.listHeader}>
            <h2>版本历史</h2>
            <span className={styles.versionCount}>{versions.length} 个版本</span>
          </div>

          {isLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>加载版本历史中...</p>
            </div>
          ) : versions.length === 0 ? (
            <div className={styles.emptyState}>
              <p>暂无版本历史</p>
              <Button variant="text" onClick={() => setShowCreateModal(true)}>
                创建您的第一个版本
              </Button>
            </div>
          ) : (
            <VersionList
              versions={versions}
              selectedVersionId={selectedVersionId}
              onSelect={handleVersionSelect}
              onLoad={handleLoadVersion}
              onDelete={handleDeleteVersion}
              onExport={(id) => {
                setSelectedVersionId(id);
                setShowExportModal(true);
              }}
            />
          )}
        </div>

        {selectedVersion && (
          <div className={styles.versionDetailContainer}>
            <VersionDetail version={selectedVersion} />

            <div className={styles.detailActions}>
              <Button
                variant="primary"
                onClick={() => handleLoadVersion(selectedVersion.id)}
              >
                应用此版本
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowExportModal(true)}
              >
                导出
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteVersion(selectedVersion.id)}
              >
                删除
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 创建版本模态框 */}
      <Modal
        title="创建新版本"
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCreateVersion}
      >
        <div className={styles.modalContent}>
          <div className={styles.formGroup}>
            <label>版本名称</label>
            <Input
              value={newVersionName}
              onChange={(e) => setNewVersionName(e.target.value)}
              placeholder="输入版本名称"
            />
          </div>
          <div className={styles.formGroup}>
            <label>版本描述（可选）</label>
            <Textarea
              value={newVersionDescription}
              onChange={(e) => setNewVersionDescription(e.target.value)}
              placeholder="输入版本描述信息"
              rows={4}
            />
          </div>
        </div>
      </Modal>

      {/* 导出版本模态框 */}
      <Modal
        title="导出版本"
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={() => selectedVersion && handleExportVersion(selectedVersion.id)}
        confirmText="复制到剪贴板"
      >
        <div className={styles.modalContent}>
          <p>将版本数据导出为JSON格式，可用于备份或共享。</p>
          {selectedVersion && (
            <div className={styles.exportInfo}>
              <p><strong>版本名称：</strong>{selectedVersion.name}</p>
              <p><strong>创建时间：</strong>{selectedVersion.createdAt.toLocaleString()}</p>
              <p><strong>组件数量：</strong>{selectedVersion.components.length}</p>
            </div>
          )}
        </div>
      </Modal>

      {/* 导入版本模态框 */}
      <Modal
        title="导入版本"
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
        onConfirm={handleImportVersion}
      >
        <div className={styles.modalContent}>
          <p>粘贴JSON格式的版本数据进行导入。</p>
          <div className={styles.formGroup}>
            <Textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="粘贴版本JSON数据"
              rows={8}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VersionManagementPage;