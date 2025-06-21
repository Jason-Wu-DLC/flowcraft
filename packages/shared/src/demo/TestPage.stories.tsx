import type { Meta, StoryObj } from '@storybook/react';
import TestPage from './TestPage';

const meta: Meta<typeof TestPage> = {
  title: 'Demo/完整测试页面',
  component: TestPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '完整的组件库功能测试页面，展示所有组件的使用方法和交互效果。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TestPage>;

export const FullTestPage: Story = {
  name: '完整功能测试',
};
