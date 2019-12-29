export const state={
    userInfo:{
        token:'',
        user:{}
    }
}
export const mutations={
    setuserInfo(state,data){
        state.userInfo=data
    }
}