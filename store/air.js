export const state=()=>({
    // 搜索历史
    history:[],
    totalPrice:0
})
export const mutations={
    setHistory(state,data){
        // 将数据追加到history
        if(data.length===0){
            state.history=data
        }else{
            state.history.unshift(data)
        }
    },
    setTotalPrice(state,price){
        state.totalPrice=price
    }
}
