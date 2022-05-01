import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, constantRoutes, asyncRoutes, anyRoutes } from '@/router'
// 引入路由
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(), // 登录token 
    name: '', // 用户名
    avatar: '', // 头像
    roles: [], // 用户角色 
    buttons: [], // 按钮权限  
    routes: [],  // 权限路由
    asyncRouters: [],// 动态路由
    resultRouters: [],// 最终路由
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    // 用户名
    state.name = userInfo.name
    // 头像
    state.avatar = userInfo.avatar
    // 角色
    state.roles = userInfo.roles
    // 菜单权限标记
    state.routes = userInfo.routes
    // 按钮权限标记     
    state.buttons = userInfo.buttons
  },
  // 设置动态路由
  SET_ROUTES: (state, routes) => {
    // 将路由过滤后的路由赋值给asyncRouters
    state.asyncRouters = routes
    // 拼接最终路由
    state.resultRouters = constantRoutes.concat(state.asyncRouters, anyRoutes)
    // 绑定最终路由
    router.addRoutes(state.resultRouters)
  }
}

// 定义函数用于过滤路由
function filterRouters(asyncRoutes, routes) {
  // 返回过滤后的路由
  return asyncRoutes.filter(item => {
    // 判断routes中是否与asyncRoutes中的路由相同
    if (routes.indexOf(item.name) != -1) {
      // 判断是否有子路由
      if (item.children && item.children.length > 0) {
        // 递归过滤
        item.children = filterRouters(item.children, routes)
      }
      return true
    }
  })
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    // 发送登录请求，获取请求结果
    let result = await login({ username: username.trim(), password: password })
    // 判断是否登陆成功
    if (result.code === 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    }
    else {
      throw new Error('登录失败')
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        // 将用户信息存储到store中
        commit('SET_USERINFO', data)
        // 将过滤后的路由存储到store中
        commit('SET_ROUTES', filterRouters(asyncRoutes, data.routes))

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  async logout({ commit, state }) {
    // 退出登录请求
    let result = await logout(state.token)
    // 判断结果
    if (result.code === 20000) {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      return 'ok'
    }
    else {
      throw new Error('出错了')
    }
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

