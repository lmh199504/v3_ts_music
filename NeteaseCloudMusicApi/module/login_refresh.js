// 登录刷新

const createOption = require('../util/option.js')
module.exports = async (query, request) => {
  let result = await request(
    'POST',
    `/api/login/token/refresh`,
    {},
    {
      ...createOption(query, 'weapi'),
      uaType: 'pc',
    },
  )
  if (result.body.code === 200) {
    result = {
      status: 200,
      body: {
        ...result.body,
        cookie: result.cookie.join(';'),
      },
      cookie: result.cookie,
    }
  }
  return result
}
