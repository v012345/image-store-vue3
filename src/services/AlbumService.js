
import axios from '@/utils/request'

export default class AlbumService {
    getAlbums() {
        return axios.get("/albums").then(res => {
            // console.log(res.data)
            return res.data
        })
        // return fetch('demo/data/products-small.json').then(res => res.json()).then(d => d.data);
    }
    createAlbum(name) {
        return axios.post("/albums", {
            name
        }).then(res => {
            // console.log(res.data)
            return res.data
        })
    }
}