export const state=()=>({
     // 搜索城市
    searchCity:'',
     // 城市列表
    postData:{}
})
export const mutations={
    changePostData(state,data){
        state.postData=data
    },
    changeSearchCity(state,data){
        state.searchCity=data
    }

}
