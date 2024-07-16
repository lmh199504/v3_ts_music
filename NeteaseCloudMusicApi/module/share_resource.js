// 分享歌曲到动态

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {
    type: query.type || 'song', // song,playlist,mv,djprogram,djradio,noresource
    msg: query.msg || '',
    id: query.id || '',
  }
  return request(
    'POST',
    `/api/share/friends/resource`,
    data,
    createOption(query, 'weapi'),
  )
}
