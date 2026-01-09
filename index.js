/**
 * 主入口文件
 * 这个文件会在项目被导入或执行时运行
 */


console.log('当前工作目录:', process.cwd());
console.log('Node.js 版本:', process.version);
console.log('执行时间:', new Date().toLocaleString('zh-CN'));
console.log('');


const fs = require('fs');
const path = require('path');

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  console.log('项目名称:', packageJson.name);
  console.log('项目版本:', packageJson.version);
  console.log('项目描述:', packageJson.description);
} catch (e) {
  console.log('无法读取 package.json');
}

