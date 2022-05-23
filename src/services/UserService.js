import axios from '@/utils/request'
import Auth from '@/utils/auth'
import store from '@/store';


class UserService {
    constructor() {
        if (!UserService.instance) {
            UserService.instance = this;
        }
        return UserService.instance;
    }
    login(data) {
        return axios.post('/auth/login', data).then(res => {
            Auth.setToken("Bearer " + res.token)
            store.commit("setName", res.name)
            store.commit("setAvatar", process.env.VUE_APP_BASE_BACKEND + res.avatar)
            // store.name = res.name
        })
    }
    register(data) {
        return axios.post('/auth/register', data).then(res => {
            Auth.setToken("Bearer " + res.token)
            store.commit("setName", res.name)
            store.commit("setAvatar", process.env.VUE_APP_BASE_BACKEND + res.avatar)
            return res
        })
    }
    getInfo() {
        return axios.get("/me")
    }
    logout() {
        return axios.post('/auth/logout')
    }
    update(user) {
        return axios.put(`/users/${user.id}`, {
            ...user
        }).then((info) => {
            store.commit("setName", info.name)
            store.commit("setAvatar", process.env.VUE_APP_BASE_BACKEND + info.avatar)
            return info
        })
    }
    uploadAvatar(avatar, onProgres) {
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }
        if (onProgres && typeof (onProgres) == "function") {
            config.onUploadProgress = onProgres
        }
        return axios.post("/user/avatar", {
            "avatar": avatar[0],
        }, config)
    }

}

const instance = new UserService();
// Object.freeze(instance);

export default instance;







