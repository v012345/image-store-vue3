import { createStore } from "vuex";
import Cookies from 'js-cookie'

export default createStore({
    state() {
        return {
            name: Cookies.get("name") ?? "",
            avatar: Cookies.get("avatar") ?? "https://www.primefaces.org/primevue/demo/images/avatar/amyelsner.png"
        }
    },
    mutations: {
        setName(state, name) {
            Cookies.set("name", name)
            state.name = name
        },
        setAvatar(state, avatar) {
            Cookies.set("avatar", avatar)
            state.avatar = avatar
        }
    }
});