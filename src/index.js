/**
 * @file 工具库入口文件
 * @description 导出所有工具函数
 */

// 导入各个模块
import * as stringUtils from './modules/string.js'
import * as validationUtils from './modules/validation.js'

// 导出所有模块（仅具名导出，避免 default+named 混用）
export { stringUtils, validationUtils }

// 删除默认导出，保持与库构建的 exports: 'named' 一致
export default {
  string: stringUtils,
  validate: validationUtils,
}
