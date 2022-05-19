
import axios from '@/utils/request'

class AlbumService {
    constructor() {
        if (!AlbumService.instance) {
            AlbumService.instance = this;
        }
        return AlbumService.instance;
    }
    get() {
        return axios.get("/albums").then(data => {
            data.forEach(album => {
                if (album.images.length > 0) {
                    let image = album.images[0];
                    if (image.has_uploaded_to_cdn) {
                        album.cover = process.env.VUE_APP_BASE_CDN + image.uri
                    } else {
                        album.cover = process.env.VUE_APP_BASE_BACKEND + image.uri
                    }
                } else {
                    album.cover = "https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png"
                }
            });

            // console.log(data)
        })
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