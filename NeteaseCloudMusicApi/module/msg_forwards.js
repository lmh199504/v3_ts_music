// @我

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {
    offset: query.offset || 0,
    limit: query.limit || 30,
    total: 'true',
  }
  return request(
    'POST',
    `/api/forwards/get`,
    data,
    createOption(query, 'weapi'),
  )
}
