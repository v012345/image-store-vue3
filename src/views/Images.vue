<template>
  <div class="Images">
    <div class="FileUpload">
      <FileUpload name="images[]" url="https://mini17.net/api/v1/images " @upload="onUpload" :multiple="true"
        accept="image/*" :maxFileSize="10000000">
        <template #empty>
          <p>Drag and drop files to here to upload.</p>
        </template>
      </FileUpload>
    </div>
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
  </div>
</template>

<script>
import ImageService from '@/services/ImageService';
export default {
  name: 'Images',
  data() {

    return {
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
    onUpload() {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    },
    imageClick(index) {
      this.activeIndex = index;
      this.displayCustom = true;
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
    this.blockedPanel = true
    this.galleriaService.getImages(this.$route.query.album).then(data => {
      this.images = data.images;
      this.paginator.totalRecords = data.total;
      this.blockedPanel = false
    });
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

.FileUpload {
  position: fixed;
  right: 0;
  top: 0;
  width: 500px;
  height: 100vh;
  overflow: scroll;
  overflow-x: hidden;
  // scrollbar-width: 0;
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
