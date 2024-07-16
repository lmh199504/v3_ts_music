// 创建歌单

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  query.cookie.os = 'pc'
  query.cookie.appver = '2.9.7'
  const data = {
    name: query.name,
    privacy: query.privacy, //0 为普通歌单，10 为隐私歌单
    type: query.type || 'NORMAL', // NORMAL|VIDEO|SHARED
  }
  return request(
    'POST',
    `/api/playlist/create`,
    data,
    createOption(query, 'weapi'),
  )
}
