/* 
    spu的请求
*/
import request from '@/utils/request'

// 获取spu列表的api
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'GET', params: { category3Id } })

// 获取spu的详情信息
export const reqSpu = spuId => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'GET' })

// 获取品牌信息列表
export const reqTradeMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: "GET" })

// 获取spu信息的图片列表
export const reqImageList = spuId => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'GET' })

// 获取基础销售属性列表
export const reqSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'GET' })

// 发送请求进行修改或者添加spu
export const reqAddOrUpdateSpu = spuInfo => {
    // 判断是否有id，如果有id就发送更新请求
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', data: spuInfo, method: 'POST' })
    } else {
        return request({ url: '/admin/product/saveSpuInfo', data: spuInfo, method: 'POST' })
    }
}

// 发送删除Spu的请求
export const reqDeleteSpu = spuId => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'DELETE' })