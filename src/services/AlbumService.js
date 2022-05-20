
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
                album.isRenaming = false;
                album.size = 0
                album.isDownloading = false;
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
                album.images.forEach(image => {
                    album.size += image.size
                })
            });
            return data
            // console.log(data)
        })
        // return fetch('demo/data/products-small.json').then(res => res.json()).then(d => d.data);
    }
    create(name) {
        return axios.post("/albums", {
            name
        })
    }
    remane(album) {
        return axios.put("/albums/" + album.id, {
            name: album.name
        })
    }
    download(album) {
        return axios.get(`/download/album`, {
            params: {
                id: album.id
            },
            // responseType: 'arraybuffer',
            responseType: 'blob',
        }).then((response) => {

            // const url = new Blob([response.data], { type: 'application/zip' });
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', album.name + ".zip");
            // document.body.appendChild(link);
            // link.click();

            console.log(response);
            let fileURL = window.URL.createObjectURL(new Blob([response]));
            let fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', album.name + ".zip");
            document.body.appendChild(fileLink);
            fileLink.click();
        });
    }
}

const instance = new AlbumService();
Object.freeze(instance);

export default instance;