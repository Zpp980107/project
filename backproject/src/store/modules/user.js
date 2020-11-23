//引入封装好的接口
import {getUserCount, getUserList} from '../../util/axios'

//state
const state = {
    userList: [],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数
  };
//getters
const getters = {
    getUserList(state){
        return state.userList
    },
    //导出user的总条数
    getUserCount(){
        return state.total;
    },
    //导出每一个分页显示的条数
    getUserSize(){
        return state.size;
    }
}

//mutations
const mutations = {
    REQ_USERLIST(state,payload){
        state.userList=payload
    },
    //修改state中count的总条数
    REQ_USERCOUNT(state,payload){
        state.total=payload
    },
    //修改state中的页码数
    REQ_PAGE(state,payload){
        state.page=payload
    }
}

//actions
const actions = {
    //封装一个获取管理员列表的行动
    getUserListAction(context) {
      //调取列表接口
      getUserList({
        size: context.state.size,
        page: context.state.page
      }).then(res => {
        if (res.data.code == 200) {
            let data = res.data.list ?res.data.list :[]
          //提交一个mutations
          context.commit("REQ_USERLIST", res.data.list);
          if(context.state.page!=1&&data.length==0){
              //重新调取修改页码的行动
          context.dispatch('getCurrentChange',context.state.page-1)
          //重新调取列表
          context.dispatch('getUserListAction')
          return
          }
        }
      });
    },
    //封装一个获取总条数的行动
    getCountAction({ commit }) {
        getUserCount().then(res=>{
            if(res.data.code==200){
                commit('REQ_USERCOUNT',res.data.list[0].total)
            }
        });
    },
    //封装一个页码页码切换重新获取数据的行动
    getCurrentChange(context,payload){
        context.commit('REQ_PAGE',payload)
        //重新调用列表函数
        context.dispatch('getUserListAction')
    }

}

//导出
export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced: true
  };
  