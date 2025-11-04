import request from './request'

// 获取音频接口
export const getVideo = params => {
  return request({
    url: 'node-service/getVideo',
    method: 'get',
    params,
  })
}
