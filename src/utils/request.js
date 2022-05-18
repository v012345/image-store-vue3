import axios from 'axios'
import Auth from '@/utils/auth'

import router from '@/router'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000
})


service.interceptors.request.use(
    config => {
        config.headers['Authorization'] = Auth.getToken()
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)


service.interceptors.response.use(
    response => response.data
    ,
    error => {
        if (error.response.status == 401) {
            if (Auth.getToken()) {
                Auth.removeToken()
            }
            router.push("/login")
        }
        return Promise.reject(error)
    }
)

export default service
