// 关注歌手列表

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {
    limit: query.limit || 25,
    offset: query.offset || 0,
    total: true,
  }
  return request(
    'POST',
    `/api/artist/sublist`,
    data,
    createOption(query, 'weapi'),
  )
}
