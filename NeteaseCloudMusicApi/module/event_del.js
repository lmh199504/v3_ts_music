// 删除动态

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {
    id: query.evId,
  }
  return request(
    'POST',
    `/api/event/delete`,
    data,
    createOption(query, 'weapi'),
  )
}
