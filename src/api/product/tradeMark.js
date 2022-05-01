import request from '@/utils/request'
// 获取品牌列表的接口
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'GET' })
// 添加或者更新品牌
export const reqAddOrUpdateTradeMark = (trademark) => {
    // 判断是请求类型
    if (!trademark.id) {
        // 如果没带id就是新增品牌请求
        return request({ url: '/admin/product/baseTrademark/save', data: trademark, method: 'POST' })
    } else {
        // 如果携带了id,就是修改品牌的请求
        return request({ url: '/admin/product/baseTrademark/update', data: trademark, method: 'PUT' })
    }
}
// 删除品牌的接口
export const reqDeleteTradeMark = id => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'DELETE' })