/**
 * @file api入口文件
 * @description 导出所有api
 */
// 使用Vite的import.meta.glob动态导入modules目录中的所有文件
const moduleFiles = import.meta.glob('./*.js', { eager: true })
// 创建模块映射和导出对象
const api = {}

// 处理导入的模块
for (const path in moduleFiles) {
  let arr = ['./request.js']
  if (arr.includes(path)) continue
  // 获取文件名（不含路径）
  const filename = path.split('/').pop()
  // 获取模块名（不含扩展名）
  const moduleName = filename.replace('.js', '')

  // 保存到模块映射

  // 保存到模块映射
  api[moduleName] = moduleFiles[path]
}
// 默认导出（整体导出所有模块）
export default api
