import sysCfg,{SysConfig} from "./sysconfig"

// 获取配置
function getConfig<T>(key:keyof SysConfig): T {
    return sysCfg[key] as unknown as T
}

const app = {
    getConfig,
}
 
app.getConfig('baseURL')

export default {}