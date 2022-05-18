
import axios from '@/utils/request'

class AlbumService {
    constructor() {
        if (!AlbumService.instance) {
            AlbumService.instance = this;
        }
        return AlbumService.instance;
    }
    get() {
        return axios.get("/albums")
        // return fetch('demo/data/products-small.json').then(res => res.json()).then(d => d.data);
    }
    create(name) {
        return axios.post("/albums", {
            name
        })
    }
}

const instance = new AlbumService();
Object.freeze(instance);

export default instance;