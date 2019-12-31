import {Message} from 'element-ui'

export default ({$axios})=>{
    // 拦截axios的错误
    $axios.onError(res=>{
        // 通过解构获取statusCode的值，response是js原生Error对象的属性
        const {statusCode,message}=res.response.data;
        if(statusCode===400){
            Message.error(message)
        }
    })
}