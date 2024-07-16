const uploadPlugin = require('../plugins/upload')
const createOption = require('../util/option.js')
module.exports = async (query, request) => {
  const uploadInfo = await uploadPlugin(query, request)
  const res = await request(
    'POST',
    `/api/user/avatar/upload/v1`,
    {
      imgid: uploadInfo.imgId,
    },
    createOption(query, 'weapi'),
  )
  return {
    status: 200,
    body: {
      code: 200,
      data: {
        ...uploadInfo,
        ...res.body,
      },
    },
  }
}
