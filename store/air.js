export const state=()=>({
    // 搜索历史
    history:[]
})
export const mutations={
    setHistory(sate,data){
        // 将数据追加到history
        if(data.length===0){
            sate.history=data
        }else{
            sate.history.push(data)
        }
    }
}
