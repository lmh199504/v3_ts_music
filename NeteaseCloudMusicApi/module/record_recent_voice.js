const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {
    limit: query.limit || 100,
  }
  return request(
    'POST',
    `/api/play-record/voice/list`,
    data,
    createOption(query, 'weapi'),
  )
}
