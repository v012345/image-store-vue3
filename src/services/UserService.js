import axios from '@/utils/request'
import Auth from '@/utils/auth'


export default class UserService {
    login(data) {
        console.log(data)
        return axios.post('/auth/login', data).then(res => {
            Auth.setToken("Bearer " + res.token)
            return res
        })
    }
    register(data) {
        return axios({
            url: '/auth/register',
            method: 'post',
            data
        })
    }
    getInfo() {
        return axios.get("/me")
    }
    logout() {
        return axios({
            url: '/auth/logout',
            method: 'post'
        })
    }

}









