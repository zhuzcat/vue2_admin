import request from '@/utils/request'

// 获取销售图片列表的请求
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'GET' })

// 获取销售属性列表的请求
export const reqSaleAttrList = spuId => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'GET' })

// 获取平台属性列表的请求
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'GET' })

// 保存sku的接口
export const reqSavaSpu = spuInfo => request({ url: '/admin/product/saveSkuInfo', method: 'POST', data: spuInfo })

// 获取选中的spu中的sku列表
export const reqSkuList = spuId => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'GET' })

// 获取sku列表的接口
export const reqSkuInfoList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'GET' })

// 上加商品的接口
export const reqSale = skuId => request({ url: `/admin/product/onSale/${skuId}`, method: 'GET' })

// 下架商品的接口
export const reqCancelSale = skuId => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'GET' })

// sku的详情信息
export const reqSkuInfo = skuId => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'GET' })