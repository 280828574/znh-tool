/**
 * @file 字符串工具函数
 * @description 提供字符串处理相关的工具函数
 */

/**
 * 将字符串首字母大写
 * @param {string} str - 输入字符串
 * @returns {string} 首字母大写的字符串
 */
export function capitalize(str) {
  if (typeof str !== 'string' || !str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 将驼峰命名转换为短横线命名
 * @param {string} str - 驼峰命名的字符串
 * @returns {string} 短横线命名的字符串
 */
export function camelToKebab(str) {
  if (typeof str !== 'string' || !str) return ''
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * 将短横线命名转换为驼峰命名
 * @param {string} str - 短横线命名的字符串
 * @returns {string} 驼峰命名的字符串
 */
export function kebabToCamel(str) {
  if (typeof str !== 'string' || !str) return ''
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

/**
 * 截断字符串到指定长度，并添加省略号
 * @param {string} str - 输入字符串
 * @param {number} maxLength - 最大长度
 * @returns {string} 截断后的字符串
 */
export function truncate(str, maxLength) {
  if (typeof str !== 'string' || !str) return ''
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}
