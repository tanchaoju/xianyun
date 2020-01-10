export const state=()=>({
     // 搜索城市
    searchCity:'',
     // 城市列表
    postData:{},
    // 草稿数据
    raftsPostData:[]
})
export const mutations={
    changePostData(state,data){
        state.postData=data
    },
    changeSearchCity(state,data){
        state.searchCity=data
    },
    sendRaftsPost(state,data){
        state.raftsPostData.unshift(data)
    }

}
