
import axios from "axios";

export default class AlbumService {
    getAlbums() {
        return axios.get("https://mini17.net/api/v1/albums").then(res => {
            // console.log(res.data)
            return res.data
        })
        // return fetch('demo/data/products-small.json').then(res => res.json()).then(d => d.data);
    }
    createAlbum(name) {
        return axios.post("https://mini17.net/api/v1/albums", {
            name
        }).then(res => {
            // console.log(res.data)
            return res.data
        })
    }
}