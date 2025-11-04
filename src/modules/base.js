/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

import BigNumber from 'bignumber.js'

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    time = new Date()
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 获取指定日期前后几天的日期 0 当前日期 >0当前日期之后 <0 当前日期之前
export function fetchDateByNum(day, today) {
  if (!today) {
    today = new Date()
  }
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
  today.setTime(targetday_milliseconds)
  return parseTime(today, '{y}-{m}-{d}')
}

// 获取月份开始日期和结束日期 本月为1
export function fetchMonthStartAndEnd(sign = 1, date = '') {
  let curDate
  if (date) {
    curDate = new Date(date)
  } else {
    curDate = new Date()
  }
  let y = curDate.getFullYear()
  let m = curDate.getMonth() + sign
  if (m > 12) {
    m = 1
    y++
  }
  let monthLastDay = new Date(y, m, 0).getDate()
  let start = y + '-' + (m < 10 ? '0' + m : m) + '-' + '01'
  let end = y + '-' + (m < 10 ? '0' + m : m) + '-' + (monthLastDay < 10 ? '0' + monthLastDay : monthLastDay)
  return [start, end]
}
// 距离指定日期还有多少天
// dateTime 指定日期
// pattern 日期格式
// isBefore 是否是今天之前的时间
export function getDistanceSpecifiedTime(dateTime, pattern, isBefore = false) {
  const format = pattern || '{d}天{h}小时{m}分{s}秒'
  // 指定日期和时间
  let EndTime = new Date(dateTime)
  // 当前系统时间
  let NowTime = new Date()
  let t = EndTime.getTime() - NowTime.getTime()
  if (t < 0 && isBefore) {
    t = -t
  }
  let formatObj = {
    d: Math.floor(t / 1000 / 60 / 60 / 24),
    h: Math.floor((t / 1000 / 60 / 60) % 24),
    m: Math.floor((t / 1000 / 60) % 60),
    s: Math.floor((t / 1000) % 60),
  }

  if (formatObj.d < 0) {
    return false
  }
  const time_str = format.replace(/{(d|h|m|s)+}/g, (result, key) => {
    let value = formatObj[key]
    return value || 0
  })
  return time_str
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  let search = params
  search.params = typeof search.params === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {}
  dateRange = Array.isArray(dateRange) ? dateRange : []
  if (typeof propName === 'undefined') {
    search.params['beginTime'] = dateRange[0]
    search.params['endTime'] = dateRange[1]
  } else {
    search.params['begin' + propName] = dateRange[0]
    search.params['end' + propName] = dateRange[1]
  }
  return search
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  if (value === undefined || datas === undefined) {
    return ''
  }
  var actions = []
  Object.keys(datas).some(key => {
    if (datas[key].value == '' + value) {
      actions.push(datas[key].label)
      return true
    }
  })
  if (actions.length === 0) {
    actions.push(value)
  }
  return actions.join('')
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  if (value === undefined) {
    return ''
  }
  var actions = []
  var currentSeparator = undefined === separator ? ',' : separator
  var temp = value.split(currentSeparator)
  Object.keys(value.split(currentSeparator)).some(val => {
    var match = false
    Object.keys(datas).some(key => {
      if (datas[key].value == '' + temp[val]) {
        actions.push(datas[key].label + currentSeparator)
        match = true
      }
    })
    if (!match) {
      actions.push(temp[val] + currentSeparator)
    }
  })
  return actions.join('').substring(0, actions.join('').length - 1)
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1
  str = str.replace(/%s/g, function () {
    var arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}

// 数据合并
export function mergeRecursive(source, target) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p])
      } else {
        source[p] = target[p]
      }
    } catch (e) {
      source[p] = target[p]
    }
  }
  return source
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  }

  var childrenListMap = {}
  var nodeIds = {}
  var tree = []

  for (let d of data) {
    let parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (let d of data) {
    let parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

// 返回项目路径
export function getNormalPath(p) {
  if (p.length === 0 || !p || p == 'undefined') {
    return p
  }
  let res = p.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res
}

// 验证是否为blob格式
export async function blobValidate(data) {
  try {
    const text = await data.text()
    JSON.parse(text)
    return false
  } catch (error) {
    return true
  }
}

// 创建嵌套对象
export function createAssign(obj, keys, v) {
  if (keys.length === 1) {
    obj[keys[0]] = v
  } else {
    var key = keys.shift()
    obj[key] = createAssign(typeof obj[key] === 'undefined' ? {} : obj[key], keys, v)
  }

  return obj
}

// 格式化金钱
export function parseMoney(num, returnString = '--') {
  if (!num && num !== 0) {
    return returnString
  }
  let a = num.toString().split('.')
  if (a?.length > 0) {
    let b = a[0].toString().replace(/\d+/, function (m) {
      return m.replace(/(\d)(?=(\d{3})+$)/g, function (y) {
        return y + ','
      })
    })
    return a.length === 1 ? b : `${b}.${a[1]}`
  } else {
    return '-'
  }
}
// 格式化金钱转正常数值
export function parseMoneyToNumber(num, returnString = '--') {
  if (!num) {
    return returnString
  }
  let arr = num.split(',')
  let a = ''
  arr.forEach(item => {
    a += item
  })
  return a
}
// 格式化数值
// val 需要格式化的数值
// type 返回的类型
// 1. 对象类型 number: 数值，unit:单位
// 2. 字符串类型 保留2位小数+单位
export function parseNumber(val, type = 1) {
  val = Number(val)
  let unit = ''
  if (val > 10000 * 10000 * 1000) {
    val = val / (10000 * 10000 * 1000)
    unit = '千亿'
  } else if (val > 10000 * 10000 * 100) {
    val = val / (10000 * 10000 * 100)
    unit = '百亿'
  } else if (val > 10000 * 10000) {
    val = val / (10000 * 10000)
    unit = '亿'
  } else if (val > 10000 * 1000) {
    val = val / (10000 * 1000)
    unit = '千万'
  } else if (val > 10000 * 100) {
    val = val / (10000 * 100)
    unit = '百万'
  } else if (val > 10000) {
    val = val / 10000
    unit = '万'
  }
  if (type === 2) {
    return val.toFixed(2) + unit
  }
  return {
    val,
    unit,
  }
}
// 小数点后补零
// s 格式化数值
// n 小数点后保留几位
// isFormat 是否直接调用格式化方法
// returnSign 返回字符
export function numberToFuxed(s, n, isFormat, returnString = '--') {
  if (!s && s !== 0) {
    return returnString
  }
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d\\.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? '' : '')
  }
  let value = t.split('').reverse().join('') + '.' + r
  if (value.includes('NaN')) {
    return ''
  }
  return isFormat ? parseMoney(value) : value
}
// 根据数组递归查找数据
// arrInit 需要递归的数组
// codeInit 条件判断的字段数值
// keyInit 条件判断字段key
// subKeyInit 子数据的key
export function findItemByCode(arrInit, codeInit, keyInit, subKeyInit) {
  if (!arrInit || !codeInit || !keyInit || !subKeyInit) {
    console.log('缺少必填字段 :')
    return undefined
  }
  let returnItem
  let findCode = function (arr, code, key, subKey) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] === code) {
        returnItem = arr[i]
        return returnItem
      } else if (arr[i][subKey]?.length > 0) {
        findCode(arr[i][subKey], code, key, subKey)
      }
    }
  }
  findCode(arrInit, codeInit, keyInit, subKeyInit)
  return returnItem
}

// 生成随机字符串
export function createsString() {
  const hexList = []
  for (let i = 0; i <= 15; i++) {
    hexList[i] = i.toString(16)
  }
  let str = ''
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      str += '-'
    } else if (i === 15) {
      str += 4
    } else if (i === 20) {
      str += hexList[(Math.random() * 4) | 8]
    } else {
      str += hexList[(Math.random() * 16) | 0]
    }
  }
  return str.replace(/-/g, '') + Date.now()
}

// 数值修订
//arr计算数值  symbol +-*/符号
export function numberAmend(arr, symbol, fixed = 'none') {
  if (!arr || arr.length < 2) {
    return '--'
  }
  let fixed1 = 0
  if (fixed === 'none') {
    let arr1 = arr.map(item => {
      try {
        item = item.toString().split('.')[1].length
      } catch (e) {
        item = 0
      }
      return item
    })
    fixed1 = arr1.length > 0 ? Math.max(...arr1) : 0
  } else {
    fixed1 = fixed
  }

  arr = arr.filter(item => item || item === 0).map(item => Number(item))
  let result = ''
  if (symbol === '+') {
    result = BigNumber.sum(...arr).toString()
  }
  if (symbol === '-') {
    result = arr.reduce((pre, cur) => {
      return new BigNumber(pre).minus(cur).toString()
    })
  }
  if (symbol === '*') {
    result = arr.reduce((pre, cur) => {
      return new BigNumber(pre).times(cur).toString()
    })
  }
  if (symbol === '/') {
    result = arr.reduce((pre, cur) => {
      return new BigNumber(pre).div(new BigNumber(cur)).toString()
    })
  }
  result = `${result}`
  let a = 0
  if (fixed === 'none' || !result?.includes('.')) {
    a = result
  } else {
    a = result.substr(0, result.indexOf('.') + fixed1 + 1)
  }
  if (a?.includes('.') && a?.endsWith('0')) {
    a = parseFloat(a)
  }
  return a
}
// 是否为整数
export function isInteger(val) {
  val = Number(val)
  return isNaN(val) && Math.floor(val) === val
}
// 根据经纬度获取地址
export function getLatByAddress(address) {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geocoder', function () {
      var geocoder = new AMap.Geocoder({})
      try {
        geocoder?.error(() => {})
      } catch (error) {
        reject('地址解析错误1')
      }

      geocoder.getLocation(address, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          resolve(result)
        } else {
          reject('地址解析错误2')
        }
      })
    })
  })
}
/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length == 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true
    return false
  }
  return false
}

// 数组转树形结构
export function arrToTree(arr, parentCode = '100000') {
  let newArr = []
  arr.forEach(item => {
    if (item.parentCode === parentCode) {
      let children = arrToTree(arr, item.code)
      let len = children.length
      let obj = {
        ...item,
      }
      if (len > 0) {
        obj.children = children
      }
      newArr.push(obj)
    }
  })
  return newArr
}
// 获取所有的页面
export function getViewList(arr, parentCode = '100000') {
  const modules = import.meta.glob('../views/**/*.vue')
  return modules
}
// 字符串 添加换行
// params 需要添加换行的字符串
// len 指定长度
export function stringAddLineFeed(params, len = 5) {
  if (!params) {
    return ''
  }
  let str = '' // 最终拼接成的字符串
  let paramsLen = params.length // 获取每项文字的个数
  let rowNumber = Math.ceil(paramsLen / len) // 换行的话，需要显示几行，向上取整
  if (paramsLen > len) {
    //大于设定的len就换行，不大于就不变化
    for (let i = 0; i < rowNumber; i++) {
      let temp = '' // 表示每一次截取的字符串
      let start = i * len // 开始截取的位置
      let end = start + len // 结束截取的位置
      if (i == rowNumber - 1) {
        // 最后一次不换行
        temp = params.substring(start, paramsLen)
      } else {
        // 每一次拼接字符串并换行
        temp = params.substring(start, end) + '\n'
      }
      str += temp // 最终拼成的字符串
    }
  } else {
    // 给新的字符串赋值
    str = params
  }
  return str //返回字符串
}
// 获取 x年x月x日 星期x
export function getDateTimes(params) {
  let date = new Date(params)
  let y = date.getFullYear().toString()
  let M = (date.getMonth() + 1).toString().padStart(2, '0')
  let d = date.getDate().toString().padStart(2, '0')
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const w = days[date.getDay()]
  //   w = week[w]
  let str = `${y}年${M}月${d}日 ${w}`
  return str //返回字符串
}
