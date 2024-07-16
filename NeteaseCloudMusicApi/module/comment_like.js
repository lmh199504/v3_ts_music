const { resourceTypeMap } = require('../util/config.json')
// 点赞与取消点赞评论

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  query.cookie.os = 'pc'
  query.cookie.appver = '2.9.7'
  query.t = query.t == 1 ? 'like' : 'unlike'
  query.type = resourceTypeMap[query.type]
  const data = {
    threadId: query.type + query.id,
    commentId: query.cid,
  }
  if (query.type == 'A_EV_2_') {
    data.threadId = query.threadId
  }
  return request(
    'POST',
    `/api/v1/comment/${query.t}`,
    data,
    createOption(query, 'weapi'),
  )
}
