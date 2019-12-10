import request from '@/utils/http'

export function yanzheng(query) {
  return request({
    url: '/wx/user/verify/mobile',
    method: 'get',
    params: query
  })
}
export function infos(query) {
  return request({
    url: '/wx/user/check/build',
    method: 'post',
    params: query
  })
}
export function jiechu_bdwx(query) {
  return request({
    url: '/wx/user/unbind',
    method: 'post',
    data: query
  })
}
export function bangding_wx(query) {
  return request({
    url: '/wx/user/bind',
    method: 'post',
    data: query
  })
}