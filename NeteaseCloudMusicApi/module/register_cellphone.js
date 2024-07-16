// 注册账号
const CryptoJS = require('crypto-js')

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  query.cookie.os = 'pc'
  query.cookie.appver = '2.9.7'
  const data = {
    captcha: query.captcha,
    phone: query.phone,
    password: CryptoJS.MD5(query.password).toString(),
    nickname: query.nickname,
    countrycode: query.countrycode || '86',
  }
  return request(
    'POST',
    `/api/register/cellphone`,
    data,
    createOption(query, 'weapi'),
  )
}
