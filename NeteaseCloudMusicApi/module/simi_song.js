// 相似歌曲

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {
    songid: query.id,
    limit: query.limit || 50,
    offset: query.offset || 0,
  }
  return request(
    'POST',
    `/api/v1/discovery/simiSong`,
    data,
    createOption(query, 'weapi'),
  )
}
