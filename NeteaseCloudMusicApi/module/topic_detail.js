const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {
    actid: query.actid,
  }
  return request('POST', `/api/act/detail`, data, createOption(query, 'weapi'))
}
