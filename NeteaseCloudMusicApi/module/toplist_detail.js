// 所有榜单内容摘要

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  return request(
    'POST',
    `/api/toplist/detail`,
    {},
    createOption(query, 'weapi'),
  )
}
