// 粉丝性别比例
const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {}
  return request(
    'POST',
    `/api/fanscenter/basicinfo/gender/get`,
    data,
    createOption(query),
  )
}
