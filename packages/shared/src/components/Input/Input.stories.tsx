// packages/shared/src/components/Input/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Search, User, Mail, Phone, Lock, DollarSign } from 'lucide-react';
import Input from './Input';
import { ThemeProvider } from '../../themes/context';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ maxWidth: '400px', padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'FlowCraft 输入框组件，支持多种变体、尺寸、状态和功能。',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'flushed'],
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 基础示例
export const Default: Story = {
  args: {
    placeholder: '请输入内容...',
  },
};

// 带标签
export const WithLabel: Story = {
  args: {
    label: '用户名',
    placeholder: '请输入用户名',
    required: true,
  },
};

// 尺寸变体
export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState(['', '', '']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          size="sm"
          label="小尺寸"
          placeholder="小尺寸输入框"
          value={values[0]}
          onChange={(e) => setValues([e.target.value, values[1], values[2]])}
        />
        <Input
          size="md"
          label="中尺寸"
          placeholder="中尺寸输入框"
          value={values[1]}
          onChange={(e) => setValues([values[0], e.target.value, values[2]])}
        />
        <Input
          size="lg"
          label="大尺寸"
          placeholder="大尺寸输入框"
          value={values[2]}
          onChange={(e) => setValues([values[0], values[1], e.target.value])}
        />
      </div>
    );
  },
};

// 状态变体
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label="默认状态"
        placeholder="默认状态"
        helperText="这是帮助文本"
      />
      <Input
        label="成功状态"
        placeholder="成功状态"
        successMessage="输入正确！"
        defaultValue="valid@email.com"
      />
      <Input
        label="错误状态"
        placeholder="错误状态"
        errorMessage="请输入有效的邮箱地址"
        defaultValue="invalid-email"
      />
      <Input
        label="禁用状态"
        placeholder="禁用状态"
        disabled
        defaultValue="不可编辑"
      />
      <Input
        label="只读状态"
        placeholder="只读状态"
        readOnly
        defaultValue="只读内容"
      />
    </div>
  ),
};

// 带图标
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label="搜索"
        placeholder="搜索内容..."
        leftIcon={<Search size={18} />}
      />
      <Input
        label="用户名"
        placeholder="请输入用户名"
        leftIcon={<User size={18} />}
      />
      <Input
        label="邮箱"
        type="email"
        placeholder="请输入邮箱"
        leftIcon={<Mail size={18} />}
      />
      <Input
        label="手机号"
        type="tel"
        placeholder="请输入手机号"
        leftIcon={<Phone size={18} />}
      />
    </div>
  ),
};

// 密码输入
export const Password: Story = {
  render: () => {
    const [password, setPassword] = useState('');

    return (
      <Input
        label="密码"
        type="password"
        placeholder="请输入密码"
        leftIcon={<Lock size={18} />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        helperText="密码至少8位，包含字母和数字"
      />
    );
  },
};

// 可清除
export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState('可以清除的内容');

    return (
      <Input
        label="可清除输入框"
        placeholder="输入内容..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        clearable
      />
    );
  },
};

// 字符计数
export const WithCount: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Input
        label="简介"
        placeholder="请输入简介..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={100}
        showCount
        helperText="简短描述一下自己"
      />
    );
  },
};

// 插槽功能
export const WithAddons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label="网站URL"
        placeholder="example.com"
        leftAddon="https://"
        rightAddon=".com"
      />
      <Input
        label="价格"
        type="number"
        placeholder="0.00"
        leftAddon={<DollarSign size={16} />}
        rightAddon="USD"
      />
      <Input
        label="域名"
        placeholder="subdomain"
        rightAddon=".flowcraft.com"
      />
    </div>
  ),
};

// 组合示例
export const Complex: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      website: '',
      bio: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateEmail = (email: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData(prev => ({ ...prev, [field]: value }));

      // 实时验证
      let error = '';
      switch (field) {
        case 'email':
          if (value && !validateEmail(value)) {
            error = '请输入有效的邮箱地址';
          }
          break;
        case 'password':
          if (value && value.length < 8) {
            error = '密码至少8位';
          }
          break;
        case 'confirmPassword':
          if (value && value !== formData.password) {
            error = '密码不一致';
          }
          break;
      }

      setErrors(prev => ({ ...prev, [field]: error }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Input
          label="用户名"
          placeholder="请输入用户名"
          leftIcon={<User size={18} />}
          value={formData.username}
          onChange={handleChange('username')}
          required
          clearable
          onClear={() => setFormData(prev => ({ ...prev, username: '' }))}
        />

        <Input
          label="邮箱"
          type="email"
          placeholder="请输入邮箱"
          leftIcon={<Mail size={18} />}
          value={formData.email}
          onChange={handleChange('email')}
          errorMessage={errors.email}
          successMessage={formData.email && !errors.email ? '邮箱格式正确' : undefined}
          required
        />

        <Input
          label="密码"
          type="password"
          placeholder="请输入密码"
          leftIcon={<Lock size={18} />}
          value={formData.password}
          onChange={handleChange('password')}
          errorMessage={errors.password}
          helperText="密码至少8位，建议包含字母、数字和特殊字符"
          required
        />

        <Input
          label="确认密码"
          type="password"
          placeholder="请再次输入密码"
          leftIcon={<Lock size={18} />}
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          errorMessage={errors.confirmPassword}
          required
        />

        <Input
          label="个人网站"
          placeholder="your-website"
          leftAddon="https://"
          rightAddon=".com"
          value={formData.website}
          onChange={handleChange('website')}
          helperText="可选，展示你的个人网站"
        />

        <Input
          label="个人简介"
          placeholder="简单介绍一下自己..."
          value={formData.bio}
          onChange={handleChange('bio')}
          maxLength={200}
          showCount
          helperText="让大家更好地了解你"
        />
      </div>
    );
  },
};
