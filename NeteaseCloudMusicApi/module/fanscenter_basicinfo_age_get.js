// 粉丝年龄比例
const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {}
  return request(
    'POST',
    `/api/fanscenter/basicinfo/age/get`,
    data,
    createOption(query),
  )
}
