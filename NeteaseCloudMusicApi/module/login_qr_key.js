const createOption = require('../util/option.js')
module.exports = async (query, request) => {
  const data = {
    type: 1,
  }
  const result = await request(
    'POST',
    `/api/login/qrcode/unikey`,
    data,
    createOption(query, 'weapi'),
  )
  return {
    status: 200,
    body: {
      data: result.body,
      code: 200,
    },
    cookie: result.cookie,
  }
}
