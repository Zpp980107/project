//引入封装好的接口
import {getSeckList} from '../../util/axios'

//state
const state={
    seckList:[]
}

//getters
const getters={
    getSeckList(state){
        return state.seckList
    }
}

//mutations
const  mutations={
    REQ_SECKLIST(state,payload){
        state.seckList=payload
    }
}

//actions
const actions={
    getSeckListAction({commit}){
        getSeckList({
            istree:true
        }).then(res=>{
            if(res.data.code==200){
                commit('REQ_SECKLIST',res.data.list)
            }
        })
    }
}


//导出
export default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}