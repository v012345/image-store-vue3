import axios from '@/utils/request'


class ChartService {
    constructor() {
        if (!ChartService.instance) {
            ChartService.instance = this;
        }
        return ChartService.instance;
    }

    data() {
        return axios.get('/statistics/data')
    }

}

const instance = new ChartService();
Object.freeze(instance);

export default instance;







