/* 
    将操作商品的接口存储起来挂载到vue的原型上
*/
import * as tradeMark from './product/tradeMark'
import * as attr from './product/attr'
import * as sku from './product/sku'
import * as spu from './product/spu'
import permission from './acl/permission'
import role from './acl/role'
import * as user from './acl/user'

export default {
    tradeMark,
    attr,
    sku,
    spu,
    permission,
    role,
    user
}