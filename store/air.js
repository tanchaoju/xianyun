export const state=()=>({
    // 搜索历史
    history:[]
})
export const mutations={
    setHistory(sate,data){
        // 将数据追加到history
      
            sate.history.push(data)
        
    }
}
export const actions={
    clearHistory(sate,data){
        sate.history=data
    }
}