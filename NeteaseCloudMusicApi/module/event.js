// 动态

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {
    pagesize: query.pagesize || 20,
    lasttime: query.lasttime || -1,
  }
  return request(
    'POST',
    `/api/v1/event/get`,
    data,
    createOption(query, 'weapi'),
  )
}
