
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
        return axios.get(`/download/image`, {
            params: {
                id: image.id
            },
            responseType: 'blob',
        }).then((response) => {
            console.log(response);
            let fileURL = window.URL.createObjectURL(new Blob([response]));
            let fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', image.name);
            document.body.appendChild(fileLink);
            fileLink.click();
        });
    }
    get(album = 1, page = 1, per_page = 15, order_by = "-id") {
        return axios.get("/images", {
            params: {
                album, page, per_page, order_by
            },
        }).then(res => {
            res.data.forEach(image => {
                if (image.has_uploaded_to_cdn) {
                    image.src = process.env.VUE_APP_BASE_CDN + image.uri
                } else {
                    image.src = process.env.VUE_APP_BASE_BACKEND + image.uri
                }

                if (image.thumbnail_has_uploaded_to_cdn) {
                    image.thumbnail_src = process.env.VUE_APP_BASE_CDN + image.thumbnail_uri
                } else {
                    image.thumbnail_src = process.env.VUE_APP_BASE_BACKEND + image.thumbnail_uri
                }
                image.alt = image.name
                image.isDownloading = false
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