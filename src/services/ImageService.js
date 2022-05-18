
import axios from '@/utils/request'

class ImageService {
    constructor() {
        if (!ImageService.instance) {
            ImageService.instance = this;
        }
        return ImageService.instance;
    }
    delete(id) {
        return axios.delete(`/images/${id}`)

    }

    store(images, album, onProgres) {
        // let formData = new FormData();
        // images.forEach(file => {
        //     formData.append('images', file);
        // })
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }
        if (onProgres && typeof (onProgres) == "function") {

            config.onUploadProgress = onProgres
        }
        return axios.post("/images", {
            "images[]": images,
            album
        }, config)
    }

    download(image) {
        axios.get(`https://mini17.net/proxy/cdn/${image.uri}`, {
            responseType: 'blob',
        }).then((response) => {
            let fileURL = window.URL.createObjectURL(new Blob([response.data]));
            let fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', image.name);
            document.body.appendChild(fileLink);
            fileLink.click();
        });
    }
    get(album = 1, page = 1, per_page = 15) {
        return axios.get("/images", {
            params: {
                album, page, per_page
            },
        }).then(res => {
            console.log(res.data)
            res.data.forEach(image => {
                image.src = "http://cdn4s.100pq.cn/" + image.uri
                image.thumbnail_src = "http://cdn4s.100pq.cn/" + image.thumbnail_uri
                image.alt = "http://cdn4s.100pq.cn/" + image.name
            });
            return {
                total: res.total,
                images: res.data,
                last_page: res.last_page,
                current_page: res.current_page,
            }
        })
        // return fetch('demo/data/products-small.json').then(res => res.json()).then(d => d.data);
    }
}

const instance = new ImageService();
Object.freeze(instance);

export default instance;