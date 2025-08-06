// packages/shared/src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '主要按钮',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '次要按钮',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: '轮廓按钮',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '幽灵按钮',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: '小按钮',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: '大按钮',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '禁用按钮',
  },
};

export const WithIcon: Story = {
  args: {
    children: '🚀 带图标的按钮',
  },
};