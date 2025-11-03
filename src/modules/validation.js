/**
 * @file 验证工具函数
 * @description 提供数据验证相关的工具函数
 */

/**
 * 验证是否为邮箱格式
 * @param {string} email - 邮箱字符串
 * @returns {boolean} 是否为有效邮箱
 */
export function isEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

/**
 * 验证是否为手机号码格式
 * @param {string} phone - 手机号码字符串
 * @returns {boolean} 是否为有效手机号码
 */
export function isPhoneNumber(phone) {
  const re = /^1[3-9]\d{9}$/
  return re.test(phone)
}

// 在这里添加更多验证工具函数
