import Cookies from 'js-cookie'

const TokenKey = 'token_api'

class Auth {
    constructor() {
        if (!Auth.instance) {
            Auth.instance = this;
        }
        return Auth.instance;
    }
    getToken() {
        return Cookies.get(TokenKey)
    }
    setToken(token) {
        return Cookies.set(TokenKey, token)
    }
    removeToken() {
        return Cookies.remove(TokenKey)
    }
}

const instance = new Auth();
Object.freeze(instance);

export default instance;

