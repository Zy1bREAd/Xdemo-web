export interface SysConfig{
    baseURL: string, // IP地址和端口
    bmodNames : {
        name: string,
        enabled: boolean,
    }[]
}

const sysCfg:SysConfig = {
    baseURL: "http://127.0.0.1:8088",
    bmodNames: [{
        name: 'auth',
        enabled: true,
    },{
        name: 'containers',
        enabled: true,
    },
    {
        name: 'cloud',
        enabled: false,
    }]

}

export default sysCfg