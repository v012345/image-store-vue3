<template>

  <div class="Images">
    <Toolbar>
      <template #start>
        <Button label="Back" icon="pi pi-chevron-left" @click="$router.back()" />
      </template>
      <template #end>
        <Button label="Upload" icon="pi pi-upload" class="p-button-success" @click="showUpload = true" />
      </template>
    </Toolbar>
    <!-- <div class="SpeedDial">
      <SpeedDial :model="items" type="quarter-circle" direction="up-left" />
    </div> -->
    <div>
      <Galleria :value="images" v-model:activeIndex="activeIndex" :responsiveOptions="responsiveOptions" :numVisible="7"
        containerStyle="max-width: 850px" :circular="true" :fullScreen="true" :showItemNavigators="true"
        :showThumbnails="false" v-model:visible="displayCustom">
        <template #item="slotProps">
          <img :src="slotProps.item.src" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
        </template>
        <template #thumbnail="slotProps">
          <img :src="slotProps.item.thumbnail_src" :alt="slotProps.item.alt" style="display: block;" />
        </template>
      </Galleria>


      <div v-if="images" class="grid" style="max-width: 1000px;">
        <div v-for="(image, index) of images" class="col-3" :key="index">
          <img :src="image.thumbnail_src" :alt="image.alt" style="cursor: pointer;max-width: 300px;"
            @click="imageClick(index)" />
        </div>
      </div>


    </div>

    <div class="Paginator">
      <Paginator :rows="15" :totalRecords="paginator.totalRecords" :rowsPerPageOptions="[15, 20, 35]"
        @page="onPage($event)"></Paginator>
    </div>
    <Toast position="top-left" />
    <BlockUI :blocked="blockedPanel" :fullScreen="true"></BlockUI>
    <div class="ProgressSpinner" v-if="blockedPanel">
      <ProgressSpinner />
    </div>
    <Sidebar v-model:visible="showUpload" position="full">
      <UploadVue :album="$route.query.album" @onUpload="onUpload"></UploadVue>
    </Sidebar>
  </div>
</template>

<script>
import ImageService from '@/services/ImageService';
import UploadVue from '../components/Upload.vue';
export default {
  name: 'Images',
  components: { UploadVue },
  data() {

    return {
      showUpload: false,
      blockedPanel: false,
      paginator: {
        totalRecords: 0
      },
      images: null,
      activeIndex: 0,
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 5
        },
        {
          breakpoint: '768px',
          numVisible: 3
        },
        {
          breakpoint: '560px',
          numVisible: 1
        }
      ],

      displayCustom: false
    }
  },
  methods: {
    loadData() {
      this.blockedPanel = true
      this.galleriaService.getImages(this.$route.query.album).then(data => {
        this.images = data.images;
        this.paginator.totalRecords = data.total;
        this.blockedPanel = false
      });
    },

    imageClick(index) {
      this.activeIndex = index;
      this.displayCustom = true;
    },
    onUpload() {
      this.showUpload = false
      this.loadData();
    },
    onPage(event) {

      console.log(event)
      this.blockedPanel = true
      this.galleriaService.getImages(this.$route.query.album, event.page + 1, event.rows).then(data => {
        this.images = data.images;
        // console.log(data)
        this.paginator.totalRecords = data.total
        this.blockedPanel = false
      });

      //event.page: New page number
      //event.first: Index of first record
      //event.rows: Number of rows to display in new page
      //event.pageCount: Total number of pages
    }

  },
  galleriaService: null,
  created() {
    this.galleriaService = new ImageService();
  },
  mounted() {
    this.loadData();
  },

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.SpeedDial {
  // border: 1px solid red;
  position: fixed;
  bottom: 150px;
  right: 150px;
}

.ProgressSpinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
}



.grid {
  display: grid;
  grid-template-columns: auto auto auto;
  // background-color: #2196F3;
  padding: 10px;
}

.Paginator {


  // border: 1px solid red;
  // position: fixed;
  bottom: 25px;
  left: 50%;
  // transform: translateX(-50%);
  // right: 150px;

}
</style>
