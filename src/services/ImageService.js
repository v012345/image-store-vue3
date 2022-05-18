
import axios from '@/utils/request'

export default class ImageService {
    deleteImage(id) {
        return axios.delete(`/images/${id}`)
    }
    downloadImage(image) {
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
    getImages(album = 1, page = 1, per_page = 15) {
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