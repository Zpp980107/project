//引入axios核心库
import axios from 'axios'
//引入路由对象
import router from "../../router";

//重新创建一个实例
const http = axios.create({
    baseURL:'/api'
});

//拦截器的高阶概念
//请求拦截（一般都用于请求头里面添加信息）
http.interceptors.request.use(req=>{
    //登录成功只有得到token，并把token从离线存储中取出来赋值给authorization
    let userInfo = sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : {};
    //把后端要求的令牌的名字authorization中携带token信息
    req.headers.authorization=userInfo.token;
    // req.headers.authorization=111
    return req;
});
//响应拦截
http.interceptors.response.use(res => {
    console.log(res, "响应结果666666");
    //你认为返回内容太多，直接返回data
    // return res.data
    //全局拦截错误
    if (res.data.code == 403) {
      alert(res.data.msg);
      //全局拦截错误之后，跳转到登录
      router.push("/login");
      return res;
    } else if (res.data.code == 500) {
      alert(res.data.msg);
      //全局拦截错误之后，跳转到登录
      router.push("/login");
      return res;
    }else{
        return res
    }
  });

//导出http实例
export default http;