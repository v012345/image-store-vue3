import axios from '@/utils/request'
import Auth from '@/utils/auth'
import Cookies from 'js-cookie'


class UserService {
    constructor() {
        if (!UserService.instance) {
            this.name = Cookies.get("username") ?? "";
            this.avatar = "https://www.primefaces.org/primevue/demo/images/avatar/amyelsner.png"
            UserService.instance = this;
        }
        return UserService.instance;
    }
    login(data) {
        console.log(data)
        return axios.post('/auth/login', data).then(res => {
            Auth.setToken("Bearer " + res.token)
            Cookies.set("username", res.name)
            this.name = res.name

            return res
        })
    }
    register(data) {
        return axios.post('/auth/register', data).then(res => {
            Auth.setToken("Bearer " + res.token)
            Cookies.set("username", res.name)
            this.name = res.name
            return res
        })
    }
    getInfo() {
        return axios.get("/me")
    }
    logout() {
        return axios.post('/auth/logout')
    }

}

const instance = new UserService();
// Object.freeze(instance);

export default instance;







