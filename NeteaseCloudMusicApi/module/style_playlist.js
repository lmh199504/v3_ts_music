// 曲风-歌单

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {
    cursor: query.cursor || 0,
    size: query.size || 20,
    tagId: query.tagId,
    sort: 0,
  }
  return request(
    'POST',
    `/api/style-tag/home/playlist`,
    data,
    createOption(query, 'weapi'),
  )
}
