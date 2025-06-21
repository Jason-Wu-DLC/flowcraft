// packages/shared/src/components/Modal/Modal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AlertTriangle, Info, CheckCircle, Trash2 } from 'lucide-react';
import Modal from './Modal';
import Button from '../Button';
import Input from '../Input';
import { ThemeProvider } from '../../themes/context';
import { useModal } from '../../hooks/useModal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'FlowCraft 模态框组件，支持多种尺寸、自定义内容和交互方式。',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    centered: {
      control: 'boolean',
    },
    showCloseButton: {
      control: 'boolean',
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// 基础示例
export const Default: Story = {
  render: () => {
    const modal = useModal();

    return (
      <div>
        <Button onClick={modal.open}>打开模态框</Button>
        <Modal
          isOpen={modal.isOpen}
          onClose={modal.close}
          title="基础模态框"
        >
          <p>这是一个基础的模态框示例。</p>
          <p>你可以在这里放置任何内容。</p>
        </Modal>
      </div>
    );
  },
};

// 尺寸变体
export const Sizes: Story = {
  render: () => {
    const [currentSize, setCurrentSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);

    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button onClick={() => setCurrentSize('sm')}>小尺寸</Button>
        <Button onClick={() => setCurrentSize('md')}>中尺寸</Button>
        <Button onClick={() => setCurrentSize('lg')}>大尺寸</Button>
        <Button onClick={() => setCurrentSize('xl')}>超大尺寸</Button>

        {currentSize && (
          <Modal
            isOpen={true}
            onClose={() => setCurrentSize(null)}
            title={`${currentSize.toUpperCase()} 尺寸模态框`}
            size={currentSize}
          >
            <p>这是一个 {currentSize} 尺寸的模态框。</p>
            <p>不同尺寸适用于不同的使用场景：</p>
            <ul>
              <li><strong>sm</strong>: 简单确认对话框</li>
              <li><strong>md</strong>: 表单输入对话框</li>
              <li><strong>lg</strong>: 复杂内容展示</li>
              <li><strong>xl</strong>: 详细信息页面</li>
            </ul>
          </Modal>
        )}
      </div>
    );
  },
};

// 带操作按钮
export const WithActions: Story = {
  render: () => {
    const modal = useModal();
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
      setLoading(true);
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      modal.close();
    };

    return (
      <div>
        <Button onClick={modal.open}>确认操作</Button>
        <Modal
          isOpen={modal.isOpen}
          onClose={modal.close}
          title="确认操作"
          showFooter
          confirmText="确认删除"
          cancelText="取消"
          confirmLoading={loading}
          onConfirm={handleConfirm}
          onCancel={modal.close}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={24} color="#f59e0b" />
            <div>
              <p style={{ margin: 0, fontWeight: '500' }}>确认删除此项目？</p>
              <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '14px' }}>
                此操作不可撤销，删除后将无法恢复。
              </p>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};

// 表单模态框
export const FormModal: Story = {
  render: () => {
    const modal = useModal();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      description: '',
    });

    const handleSubmit = async () => {
      // 表单验证
      if (!formData.name || !formData.email) {
        alert('请填写必填字段');
        return;
      }

      // 模拟提交
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('提交成功！');
      modal.close();
      setFormData({ name: '', email: '', description: '' });
    };

    const handleReset = () => {
      setFormData({ name: '', email: '', description: '' });
    };

    return (
      <div>
        <Button onClick={modal.open}>新建用户</Button>
        <Modal
          isOpen={modal.isOpen}
          onClose={modal.close}
          title="新建用户"
          size="md"
          footer={
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={handleReset}>
                重置
              </Button>
              <Button variant="outline" onClick={modal.close}>
                取消
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                创建用户
              </Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="用户名"
              placeholder="请输入用户名"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              label="邮箱"
              type="email"
              placeholder="请输入邮箱地址"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            <Input
              label="描述"
              placeholder="请输入用户描述（可选）"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </Modal>
      </div>
    );
  },
};

// 信息模态框
export const InfoModal: Story = {
  render: () => {
    const [modalType, setModalType] = useState<'info' | 'success' | 'warning' | 'error' | null>(null);

    const getModalConfig = (type: string) => {
      const configs = {
        info: {
          title: '信息提示',
          icon: <Info size={24} color="#3b82f6" />,
          content: '这是一条信息提示，用于向用户传达重要信息。',
        },
        success: {
          title: '操作成功',
          icon: <CheckCircle size={24} color="#059669" />,
          content: '操作已成功完成！您的更改已保存。',
        },
        warning: {
          title: '警告',
          icon: <AlertTriangle size={24} color="#d97706" />,
          content: '请注意：此操作可能会影响系统性能，建议在非工作时间执行。',
        },
        error: {
          title: '错误',
          icon: <AlertTriangle size={24} color="#dc2626" />,
          content: '操作失败：网络连接异常，请检查网络后重试。',
        },
      };
      return configs[type as keyof typeof configs];
    };

    const currentConfig = modalType ? getModalConfig(modalType) : null;

    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button onClick={() => setModalType('info')}>信息</Button>
        <Button onClick={() => setModalType('success')}>成功</Button>
        <Button onClick={() => setModalType('warning')}>警告</Button>
        <Button onClick={() => setModalType('error')}>错误</Button>

        {currentConfig && (
          <Modal
            isOpen={true}
            onClose={() => setModalType(null)}
            title={currentConfig.title}
            size="sm"
            showFooter
            confirmText="知道了"
            onConfirm={() => setModalType(null)}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              {currentConfig.icon}
              <p style={{ margin: 0, lineHeight: '1.6' }}>
                {currentConfig.content}
              </p>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

// 无头部模态框
export const NoHeader: Story = {
  render: () => {
    const modal = useModal();

    return (
      <div>
        <Button onClick={modal.open}>无头部模态框</Button>
        <Modal
          isOpen={modal.isOpen}
          onClose={modal.close}
          showCloseButton={false}
          size="sm"
          footer={
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Button onClick={modal.close}>关闭</Button>
            </div>
          }
        >
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle size={48} color="#059669" style={{ marginBottom: '16px' }} />
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '600' }}>
              操作成功！
            </h3>
            <p style={{ margin: 0, color: '#6b7280' }}>
              您的操作已成功完成。
            </p>
          </div>
        </Modal>
      </div>
    );
  },
};

// 长内容模态框
export const LongContent: Story = {
  render: () => {
    const modal = useModal();

    const longContent = Array.from({ length: 20 }, (_, i) => (
      <p key={i} style={{ marginBottom: '16px' }}>
        这是第 {i + 1} 段内容。在实际应用中，模态框可能包含大量文本内容，
        比如用户协议、隐私政策、详细说明等。模态框的内容区域支持滚动，
        确保用户可以查看所有内容。滚动条样式经过优化，提供良好的用户体验。
      </p>
    ));

    return (
      <div>
        <Button onClick={modal.open}>长内容模态框</Button>
        <Modal
          isOpen={modal.isOpen}
          onClose={modal.close}
          title="用户协议"
          size="lg"
          showFooter
          confirmText="同意并继续"
          cancelText="不同意"
          onConfirm={modal.close}
          onCancel={modal.close}
        >
          <div>
            <h4>服务条款</h4>
            {longContent}
          </div>
        </Modal>
      </div>
    );
  },
};

// 嵌套模态框
export const NestedModal: Story = {
  render: () => {
    const firstModal = useModal();
    const secondModal = useModal();

    return (
      <div>
        <Button onClick={firstModal.open}>打开第一个模态框</Button>

        <Modal
          isOpen={firstModal.isOpen}
          onClose={firstModal.close}
          title="第一个模态框"
          zIndex={1050}
        >
          <p>这是第一个模态框的内容。</p>
          <Button onClick={secondModal.open}>打开第二个模态框</Button>
        </Modal>

        <Modal
          isOpen={secondModal.isOpen}
          onClose={secondModal.close}
          title="第二个模态框"
          size="sm"
          zIndex={1060}
          showFooter
          confirmText="确定"
          onConfirm={secondModal.close}
        >
          <p>这是嵌套的第二个模态框。</p>
          <p>它具有更高的 z-index 值。</p>
        </Modal>
      </div>
    );
  },
};
