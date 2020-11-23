//引入封装好的接口
import {getGoodsCount, getGoodsList} from '../../util/axios'

//state
const state = {
    goodsList: [],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数
  };
//getters
const getters = {
    getGoodsList(state){
        return state.goodsList
    },
    //导出Goods的总条数
    getGoodsCount(){
        return state.total;
    },
    //导出每一个分页显示的条数
    getGoodsSize(){
        return state.size;
    }
}

//mutations
const mutations = {
    REQ_GOODSLIST(state,payload){
        state.goodsList=payload
    },
    //修改state中count的总条数
    REQ_GOODSCOUNT(state,payload){
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
    getGoodsListAction(context) {
      //调取列表接口
      getGoodsList({
        size: context.state.size,
        page: context.state.page
      }).then(res => {
        if (res.data.code == 200) {
            let data = res.data.list ?res.data.list :[]
          //提交一个mutations
          context.commit("REQ_GOODSLIST", res.data.list);
          if(context.state.page!=1&&data.length==0){
            //重新调取修改页码的行动
        context.dispatch('getCurrentChange',context.state.page-1)
        //重新调取列表
        context.dispatch('getGoodsListAction')
        return
        }
        }
      });
    },
    //封装一个获取总条数的行动
    getCountAction({ commit }) {
        getGoodsCount().then(res=>{
            if(res.data.code==200){
                commit('REQ_GOODSCOUNT',res.data.list[0].total)
            }
        });
    },
    //封装一个页码页码切换重新获取数据的行动
    getCurrentChange(context,payload){
        context.commit('REQ_PAGE',payload)
        //重新调用列表函数
        context.dispatch('getGoodsListAction')
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
  