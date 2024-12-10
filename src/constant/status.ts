import { reactive } from "vue"

const SUCCESS_STATUS = "Success"
const FAILED_STATUS = "Failed"
const UNKNOWN_STATUS = "Unknown"

const RESP_STATUS = reactive<any>({
    SUCCESS_STATUS: "Success",
    FAILED_STATUS: "Failed",
    UNKNOWN_STATUS: "Unknown"
})

// 状态码（与后端统一）
const SUCCESS_CODE = 0
const PARAMS_NULL_CODE = 1
const PARAMS_ERROR_CODE = 2
const SIGNATURE_ERROR_CODE = 3
const REQUEST_TIMEOUT_CODE = 4
const INTERNAL_SERVER_ERROR_CODE = 5
const UNKNOWN_CODE = 666
