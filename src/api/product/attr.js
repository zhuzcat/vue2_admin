/* 
    于商品分类有关的接口
*/
import request from '@/utils/request'

// 获取一级分类列表
export const reqCategory1List = () => request({ url: '/admin/product/getCategory1', method: 'GET' })

// 获取二级分类列表
export const reqCategory2List = id => request({ url: `/admin/product/getCategory2/${id}`, method: 'GET' })

// 获取三级分类列表
export const reqCategory3List = id => request({ url: `/admin/product/getCategory3/${id}`, method: 'GET' })

// 获取平台属性列表
export const reqAttrList = ({ category1Id, category2Id, category3Id }) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'GET' })

// 添加或者修改平台属性
export const reqSaveAttr = data => request({ url: '/admin/product/saveAttrInfo', method: 'POST', data })

// 删除平台属性
export const reqDeleteAttr = attrId => request({ url: `/admin/product/deleteAttr/${attrId}`, method: "DELETE" })