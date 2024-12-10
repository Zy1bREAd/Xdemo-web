import xdemoReq from "./axios";

function getUserToken(origin: string):string | null {
    // 通常要从请求头中获取Token给后端
    let userToken:any = ""
    if (origin == 'local'){
        userToken = localStorage.getItem('token');
    }else if (origin == 'session'){
        userToken = sessionStorage.getItem('token');
    }else if (origin == 'vuex'){
        // userToken = store.state.token
        userToken = ""
    }
    console.log(userToken);
    
    return userToken
}

export default getUserToken