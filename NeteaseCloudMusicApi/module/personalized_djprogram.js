// 推荐电台

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  return request(
    'POST',
    `/api/personalized/djprogram`,
    {},
    createOption(query, 'weapi'),
  )
}
