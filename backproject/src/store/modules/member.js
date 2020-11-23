//引入封装好的接口
import {getMemberList} from '../../util/axios'

//state
const state={
    memberList:[]
}

//getters
const getters={
    getMemberList(state){
        return state.memberList
    }
}

//mutations
const mutations ={
    REQ_MEMBERLIST(state,payload){
        state.memberList=payload
    }
}

//actions
const actions ={
    getMemberListAction({commit}){
        getMemberList({
            istree:true
        })
        .then(res=>{
            if(res.data.code==200){
                commit('REQ_MEMBERLIST',res.data.list)
            }
        })
    }
}

//导出
export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced:true
}