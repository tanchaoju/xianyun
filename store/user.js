export const state=()=>({
    userInfo:{
        token:'',
        user:{}
    }
})
export const mutations={
    setuserInfo(state,data){
        state.userInfo=data
    }
}
export const actions={
    // 登录函数可能会复用，会多个地方调用到，刚好该函数请求完成后修改state中userInfo
    login(store,data){
       return this.$axios({
            method: "POST",
            url: "/accounts/login",
            data
          }).then(res => {
            const data=res.data
            store.commit("setuserInfo", data);
          });
        
    },
    // 注册
    register(store,data){
        return this.$axios({
            method: "POST",
            url: "/accounts/register",
            data: data 
          }).then(res => {
            const data=res.data
            store.commit("setuserInfo", data);
            })
    },
    // 发送验证码
    setCaptcha(store,data){
        // 发送手机验证码请求
        return this.$axios({
            url: "/captchas",
            method: 'POST',
            data: {
                // 手机号码
                tel: data
            }
        })
    }
}