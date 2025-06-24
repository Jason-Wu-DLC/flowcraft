// tools/dev-scripts/start-all.js
const { spawn } = require('child_process');
const path = require('path');

const services = [
  { name: 'shared', port: 3001, path: 'packages/shared' },
  { name: 'designer', port: 3002, path: 'packages/designer' },
  { name: 'shell', port: 3000, path: 'packages/shell' },
];

const startService = (service) => {
  console.log(`🚀 Starting ${service.name} on port ${service.port}...`);

  const child = spawn('npm', ['run', 'dev'], {
    cwd: path.resolve(process.cwd(), service.path),
    stdio: 'inherit',
    shell: true,
  });

  child.on('error', (err) => {
    console.error(`❌ Failed to start ${service.name}:`, err);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ ${service.name} exited with code ${code}`);
    }
  });

  return child;
};

const startAll = () => {
  console.log('🏁 Starting all FlowCraft services...\n');

  const processes = services.map(startService);

  // 优雅关闭
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down all services...');
    processes.forEach(child => {
      child.kill('SIGINT');
    });
    process.exit(0);
  });

  // 等待一段时间后显示访问信息
  setTimeout(() => {
    console.log('\n✅ All services started!');
    console.log('\n📋 Service URLs:');
    services.forEach(service => {
      console.log(`   ${service.name}: http://localhost:${service.port}`);
    });
    console.log('\n🌟 Main Application: http://localhost:3000');
    console.log('📚 Storybook: http://localhost:6006');
  }, 5000);
};

if (require.main === module) {
  startAll();
}

module.exports = { startAll };
