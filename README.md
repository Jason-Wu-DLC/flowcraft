# FlowCraft 智能业务流程构建平台

## 项目描述

FlowCraft是一个面向企业数字化转型场景的低代码平台，构建支持业务流程快速搭建与可视化配置。平台基于微前端架构拆分模块，配合自研组件库与可视化画布引擎，实现从组件拖拽、流程配置、实时预览到部署的完整链路，支持中小企业快速上线业务流程系统。

## 技术栈

- **前端框架**: React 18 + TypeScript 5
- **状态管理**: Redux Toolkit + React Redux
- **数据请求**: React Query (TanStack Query)
- **微前端**: qiankun
- **画布引擎**: Fabric.js
- **实时通信**: Socket.io
- **代码编辑器**: Monaco Editor
- **组件文档**: Storybook
- **构建工具**: Webpack 5
- **包管理**: npm workspaces (Monorepo)

## 项目架构

### 微前端架构

基于qiankun实现微前端架构，包含以下子应用：

- **Shell**: 主应用，负责路由管理和应用注册
- **Designer**: 设计器应用，提供可视化流程设计
- **Preview**: 预览应用，实时预览流程效果

### 技术选型理由

#### 1. 微前端架构选择

**技术调研过程：**
- **Module Federation**: Webpack 5原生支持，但配置复杂，生态不够成熟
- **qiankun**: 阿里开源，生态成熟，JS沙箱隔离，样式隔离，通信机制完善
- **自研方案**: 成本高，维护困难

**选择qiankun的原因：**
- JS沙箱隔离：避免全局变量污染
- 样式隔离：防止CSS冲突
- 通信机制：完善的props传递和全局状态管理
- 生态成熟：社区活跃，文档完善

#### 2. 画布引擎技术选择

**技术调研过程：**
- **原生DOM+SVG**: 性能好，但开发复杂，需要自己实现拖拽、缩放等
- **Fabric.js**: 成熟的2D画布库，内置拖拽、缩放、选择等功能
- **Konva.js**: 性能优秀，但生态不如Fabric.js
- **自研方案**: 成本高，功能不完善

**选择Fabric.js的原因：**
- 内置拖拽、缩放、选择功能
- 丰富的图形对象和事件系统
- 良好的性能优化
- 完善的文档和社区支持

#### 3. 状态管理选择理由

**技术对比：**
- **Redux**: 生态成熟，DevTools支持好，适合大型应用
- **Zustand**: 轻量级，API简单，但生态不如Redux
- **Context**: 性能问题，不适合复杂状态
- **MobX**: 学习成本高，响应式编程

**选择Redux的原因：**
- 企业级应用标准
- 完善的DevTools和中间件生态
- 可预测的状态管理
- 团队协作友好

## 核心功能

### 1. 可视化设计器
- 基于Fabric.js的画布引擎
- 支持组件拖拽、嵌套、网格吸附
- 实时属性编辑面板
- 撤销/重做功能

### 2. 组件库系统
- 20+通用基础组件
- 支持主题定制与响应式设计
- Storybook文档与独立调试
- 组件版本管理

### 3. 实时协作
- Socket.io实现实时通信
- 多用户光标同步
- 实时状态同步
- 断线重连机制

### 4. 微前端架构
- 基于qiankun的模块化架构
- 独立部署能力
- 样式和JS隔离
- 应用间通信机制

## 开发指南

### 环境要求
- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 启动开发环境
```bash
# 启动所有服务
npm run dev:all

# 启动单个服务
npm run dev:shell
npm run dev:designer
npm run dev:shared
```

### 构建项目
```bash
# 构建所有包
npm run build:all

# 构建单个包
npm run build:shell
npm run build:designer
npm run build:shared
```

### Storybook文档
```bash
npm run storybook
```

## 项目结构

```
flowcraft/
├── packages/
│   ├── shell/          # 主应用
│   ├── designer/       # 设计器应用
│   └── shared/         # 共享组件库
├── apps/               # 独立应用
├── tools/              # 构建工具
└── docs/               # 文档
```


## 许可证

MIT License
