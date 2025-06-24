import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight, Download, Heart } from 'lucide-react';
import Button from './Button';
import { ThemeProvider } from '../../themes/context';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
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
        component: 'FlowCraft 按钮组件，支持多种变体、尺寸和状态。',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  args: {
    // 移除 onClick 的默认 mock，因为不是所有 Storybook 版本都支持 fn()
    onClick: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 基础示例
export const Default: Story = {
  args: {
    children: '按钮',
  },
};

// 变体示例
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// 尺寸示例
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">小按钮</Button>
      <Button size="md">中按钮</Button>
      <Button size="lg">大按钮</Button>
    </div>
  ),
};

// 带图标示例
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button leftIcon={<Download size={18} />}>下载</Button>
      <Button rightIcon={<ChevronRight size={18} />}>继续</Button>
      <Button leftIcon={<Heart size={18} />} rightIcon={<ChevronRight size={18} />}>
        收藏并继续
      </Button>
    </div>
  ),
};

// 状态示例
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button>正常状态</Button>
      <Button loading>加载中...</Button>
      <Button disabled>禁用状态</Button>
    </div>
  ),
};

// 全宽示例
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Button fullWidth>全宽按钮</Button>
    </div>
  ),
};