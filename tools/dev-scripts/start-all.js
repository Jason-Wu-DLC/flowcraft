// tools/dev-scripts/start-all.js
const { spawn } = require('child_process');
const path = require('path');

const processes = [];

// 定义服务启动配置
const services = [
  {
    name: '共享组件库',
    command: 'npm',
    args: ['run', 'dev'],
    cwd: path.resolve(__dirname, '../../packages/shared'),
    port: 3001,
    color: '\x1b[32m', // 绿色
  },
  {
    name: '设计器',
    command: 'npm',
    args: ['run', 'dev'],
    cwd: path.resolve(__dirname, '../../packages/designer'),
    port: 3002,
    color: '\x1b[34m', // 蓝色
    delay: 8000, // 等待 8 秒后启动
  },
  {
    name: '主应用',
    command: 'npm',
    args: ['run', 'dev'],
    cwd: path.resolve(__dirname, '../../packages/shell'),
    port: 3000,
    color: '\x1b[33m', // 黄色
    delay: 15000, // 等待 15 秒后启动
  },
];

// 启动单个服务
function startService(service) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    console.log(`${service.color}[${service.name}] 正在启动... (端口: ${service.port})\x1b[0m`);

    const child = spawn(service.command, service.args, {
      cwd: service.cwd,
      stdio: 'pipe',
      shell: true
    });

    let resolved = false;

    child.stdout.on('data', (data) => {
      const message = data.toString();
      console.log(`${service.color}[${service.name}] ${message.trim()}\x1b[0m`);

      // 检测服务启动成功的多种可能信号
      if (!resolved && (
        message.includes('webpack compiled') ||
        message.includes('Server started') ||
        message.includes('Local:') ||
        message.includes('compiled with') ||
        message.includes('successfully')
      )) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`${service.color}[${service.name}] ✅ 启动成功! (用时: ${elapsed}s)\x1b[0m`);
        resolved = true;
        resolve();
      }
    });

    child.stderr.on('data', (data) => {
      const message = data.toString();
      console.log(`${service.color}[${service.name}] ${message.trim()}\x1b[0m`);

      // 对于 webpack 的警告信息，也认为是启动成功
      if (!resolved && message.includes('webpack compiled')) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`${service.color}[${service.name}] ✅ 启动成功! (用时: ${elapsed}s)\x1b[0m`);
        resolved = true;
        resolve();
      }
    });

    child.on('close', (code) => {
      console.log(`${service.color}[${service.name}] 进程退出，代码: ${code}\x1b[0m`);
    });

    child.on('error', (error) => {
      console.error(`${service.color}[${service.name}] ❌ 启动失败: ${error.message}\x1b[0m`);
      if (!resolved) {
        resolved = true;
        resolve(); // 即使出错也继续
      }
    });

    processes.push(child);

    // 超时保护：如果 30 秒内没有检测到启动成功，强制继续
    setTimeout(() => {
      if (!resolved) {
        console.log(`${service.color}[${service.name}] ⚠️  超时检测，假设启动成功\x1b[0m`);
        resolved = true;
        resolve();
      }
    }, 30000);
  });
}

// 延迟启动
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 主启动函数
async function startAll() {
  console.log('\x1b[36m🚀 FlowCraft 微前端开发环境启动中...\x1b[0m\n');

  try {
    for (const service of services) {
      if (service.delay) {
        console.log(`⏳ 等待 ${service.delay / 1000} 秒后启动 ${service.name}...`);
        await delay(service.delay);
      }

      await startService(service);

      // 每个服务启动后稍微等待一下
      await delay(2000);
    }

    console.log('\n\x1b[32m✅ 所有服务启动完成!\x1b[0m');
    console.log('\x1b[36m📝 访问地址:\x1b[0m');
    console.log('  • 主应用: \x1b[33mhttp://localhost:3000\x1b[0m');
    console.log('  • 共享组件: \x1b[32mhttp://localhost:3001\x1b[0m');
    console.log('  • 设计器: \x1b[34mhttp://localhost:3002\x1b[0m');
    console.log('\n\x1b[35m按 Ctrl+C 停止所有服务\x1b[0m');

  } catch (error) {
    console.error('\n\x1b[31m❌ 启动失败:\x1b[0m', error.message);
    process.exit(1);
  }
}

// 处理进程退出
process.on('SIGINT', () => {
  console.log('\n\x1b[33m🛑 正在停止所有服务...\x1b[0m');

  processes.forEach((child, index) => {
    if (child && !child.killed) {
      child.kill('SIGTERM');
      console.log(`\x1b[36m[服务 ${index + 1}] 已停止\x1b[0m`);
    }
  });

  setTimeout(() => {
    console.log('\x1b[32m✅ 所有服务已停止\x1b[0m');
    process.exit(0);
  }, 1000);
});

// 启动所有服务
startAll();