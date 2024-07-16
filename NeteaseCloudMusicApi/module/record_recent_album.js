const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {
    limit: query.limit || 100,
  }
  return request(
    'POST',
    `/api/play-record/album/list`,
    data,
    createOption(query, 'weapi'),
  )
}
