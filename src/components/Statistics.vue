<template>
    <div class="top">
        <div class="card">
            <Chart type="doughnut" :data="albumsData" :options="lightOptions" />
        </div>
        <div class="card">
            <Chart type="pie" :data="sizeData" :options="lightOptions" />
        </div>
    </div>
    <div class="bottom">
        <div class="card left">
            <Chart type="bar" :data="basicData" :options="basicOptions" />
        </div>
        <div class="card right">
            <Button label="My Albums" icon="pi pi-folder" class="p-button-raised p-button-warning"
                @click="$router.push('/albums')" />
            <Button label="My Profile" icon="pi pi-user" />
        </div>
    </div>
</template>

<script>
import StatisticsData from '@/services/ChartService';
export default {
    name: 'Statistics',
    data() {
        return {
            basicData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: '#42A5F5',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            },
            basicOptions: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    }
                }
            },
            albumsData: {
                labels: ["loading"],
                datasets: [
                    {
                        data: [1],
                        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#F1172F"],
                        hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D", "#A1F721"]
                    }
                ]
            },
            sizeData: {
                labels: ["loading"],
                datasets: [
                    {
                        data: [10],
                        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#F1172F"],
                        hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D", "#A1F721"]
                    }
                ]
            },
            lightOptions: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                }
            }
        }
    },
    methods: {
        openAlnum(id) {
            this.$router.push({ path: '/images', query: { album: id } })
        },
    },
    mounted() {
        StatisticsData.data().then(data => {
            let albumsLabels = [];
            let albumsData = [];
            data.albums.forEach(album => {
                albumsLabels.push(album.name);
                albumsData.push(album.images_count)
            });
            this.albumsData.labels = albumsLabels
            this.albumsData.datasets[0].data = albumsData
            let sizeLabel = []
            let sizeData = []
            for (const key in data.images) {
                sizeLabel.push(key)
                sizeData.push(data.images[key])

            }
            this.sizeData.labels = sizeLabel
            this.sizeData.datasets[0].data = sizeData
        })
    }
}
</script>

<style scoped lang="less">
.top {
    display: flex;
    justify-content: space-around;
}

.bottom {
    display: flex;
    justify-content: space-around;

    .left {
        width: 40vw;
    }

    .right {
        width: 40vw;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}
</style>
