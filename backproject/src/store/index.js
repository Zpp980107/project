//引入核心库
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//使用vuex插件
Vue.use(Vuex)

//引入封装好的modules模块
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import member from './modules/member'
import seck from './modules/seck'
import banner from './modules/banner'
import goods from './modules/goods'


//导出实例化的vuex
export default new Vuex.Store({
    state:{
        //userInfo:null
        //判断本地储存是否有值，有值吧数据转化为对象使用
        userInfo:sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
    },
    getters:{
        getUserInfo(state){
            return state.userInfo
        }
    },
    mutations:{
        CHANGE_USER(state,payload){
            state.userInfo=payload;
            //如果payload有值，我们就存到本地存储，否则就删除本地存储
            if(payload){
                sessionStorage.setItem('userInfo',JSON.stringify(payload))
            }else{
                sessionStorage.removeItem('userInfo')
            }
        }
    },
    actions:{
        //创建一个修个userInfo的actions
        changeUserInfoAction({commit},payload){
            commit('CHANGE_USER',payload)
        }
    },
    modules:{
        menu,
        role,
        user,
        cate,
        specs,
        member,
        banner,
        seck,
        goods,
    }
})