//引入封装好的接口
import {getSpecsCount, getSpecsList} from '../../util/axios'

//state
const state = {
    specsList: [],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数
  };
//getters
const getters = {
    getSpecsList(state){
        return state.specsList
    },
    //导出specs的总条数
    getSpecsCount(){
        return state.total;
    },
    //导出每一个分页显示的条数
    getSpecsSize(){
        return state.size;
    }
}

//mutations
const mutations = {
    REQ_SPECSLIST(state,payload){
        state.specsList=payload
    },
    //修改state中count的总条数
    REQ_SPECSCOUNT(state,payload){
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
    getSpecsListAction(context,bool) {
        if(bool){
            //调取列表接口
      getSpecsList({}).then(res => {
        if (res.data.code == 200) {
            let data = res.data.list ?res.data.list :[]
          //提交一个mutations
          context.commit("REQ_SPECSLIST", res.data.list);
          if(context.state.page!=1&&data.length==0){
              //重新调用修改页码的行为
              context.dispatch('getCurrentChange',context.state.page-1);
              //重新调取列表
              context.dispatch('getSpecsListAction');
              return 
          }
        }
      });
        }else{
             //调取列表接口
      getSpecsList({
        size:context.state.size,
        page: context.state.page
      }).then(res => {
        if (res.data.code == 200) {
            let data = res.data.list ?res.data.list :[]
          //提交一个mutations
          context.commit("REQ_SPECSLIST", res.data.list);
          if(context.state.page!=1&&data.length==0){
              //重新调用修改页码的行为
              context.dispatch('getCurrentChange',context.state.page-1);
              //重新调取列表
              context.dispatch('getSpecsListAction');
              return 
          }
        }
      });
        }
     
    },
    //封装一个获取总条数的行动
    getCountAction({ commit }) {
        getSpecsCount().then(res=>{
            if(res.data.code==200){
                commit('REQ_SPECSCOUNT',res.data.list[0].total)
            }
        });
    },
    //封装一个页码页码切换重新获取数据的行动
    getCurrentChange(context,payload){
        context.commit('REQ_PAGE',payload)
        //重新调用列表函数
        context.dispatch('getSpecsListAction')
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
  