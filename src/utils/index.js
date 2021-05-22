import { default as PROXY_LOCAL_STORAGE } from './ls'
export { PROXY_LOCAL_STORAGE }

export const getTimeDetail = (date = new Date(), isRecursive = false) => {
  if (!isType.isDate(date)) {
    if (isRecursive) throw `Invalid Date: ${date}`
    return getTimeDetail(new Date(date), true)
  }
  const H = date.getHours()
  const HH = getFullNum(H, 2, 0)
  const s = date.getSeconds()
  const ss = getFullNum(s, 2, 0)
  const ms = date.getMilliseconds()
  const M = date.getMonth() + 1
  const MM = getFullNum(M, 2, 0)
  const m = date.getMinutes()
  const mm = getFullNum(m, 2, 0)
  const D = date.getDate()
  const DD = getFullNum(D, 2, 0)
  const YYYY = date.getFullYear()
  return { H, HH, s, ss, ms, M, MM, m, mm, D, DD, YYYY }
}
export const getFullNum = (num, padStart = 2, Accuracy = 2) => {
  const originNum = (Number(num) || 0)
  const withoutAccuracy = (originNum + '').split('.')[0].padStart(padStart, '0')
  if (!Accuracy) return withoutAccuracy
  else return withoutAccuracy.split('.')[0] + '.' + originNum.toFixed(Accuracy).split('.')[1]
}
const tsMap = {
  d: 24 * 60 * 60 * 1000,
  h: 1 * 60 * 60 * 1000,
  m: 1 * 1 * 60 * 1000,
  s: 1 * 1 * 1 * 1000,
}
export const getCountdownDetail = (deadline) => {
  const { d, h, m, s } = tsMap
  const timestamp = deadline - new Date().valueOf()
  if (timestamp <= 0) return { isExpired: true, ts: deadline }
  const dayRemainder = timestamp % d
  const hourRemainder = timestamp % h
  const minuteRemainder = timestamp % m
  const day = Math.floor(timestamp / d)
  const hour = Math.floor(dayRemainder / h)
  const minute = Math.floor(hourRemainder / m)
  const second = Math.floor(minuteRemainder / s)
  return { d: day, h: hour, m: minute, s: second, isExpired: false, ts: deadline }
}

export const checkType = (type, data) => Object.prototype.toString.call(data) === `[object ${type}]`


const curry = (fn, ...args) => ((...innerArgs) => (fn.apply(this, [...args, ...innerArgs])))

const TypeArr = ['Object', 'Date', 'Error']
const isType = {}
TypeArr.forEach(type => {
  isType[`is${type}`] = curry(checkType, type)
})


export { isType }

export default {
  getTimeDetail,
  getCountdownDetail,
  checkType,
  PROXY_LOCAL_STORAGE,
  ...isType,
}
