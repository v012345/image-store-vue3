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


      <div class="card" v-if="isloading">
        <div class="grid formgrid">
          <div class="field col-12 md:col-4" v-for="i in 3" :key="i">
            <div class="custom-skeleton p-4">
              <div class="flex mb-3">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <div>
                  <Skeleton width="10rem" class="mb-2"></Skeleton>
                  <Skeleton width="5rem" class="mb-2"></Skeleton>
                  <Skeleton height=".5rem"></Skeleton>
                </div>
              </div>
              <Skeleton width="100%" height="150px"></Skeleton>
              <div class="flex justify-content-center mt-3">
                <Skeleton width="4rem" height="2rem"></Skeleton>
                <Skeleton width="4rem" height="2rem"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="card">
        <DataView :value="images" :lazy="true" :first="first" :totalRecords="paginator.totalRecords" :layout="layout"
          :alwaysShowPaginator="false" :paginator="true" :rows="15" :sortOrder="sortOrder"
          :rowsPerPageOptions="[15, 24, 33]" @page="onPage($event)" :sortField="sortField">
          <template #header>
            <div class="grid grid-nogutter">
              <div class="col-6" style="text-align: left">
                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Id"
                  @change="onSortChange($event)" />
              </div>
              <div class="col-6" style="text-align: right">
                <DataViewLayoutOptions v-model="layout" />
              </div>
            </div>
          </template>
          <template #empty>No records found.</template>
          <template #list="slotProps">
            <!-- {{ slotProps }} -->
            <div class="col-12">
              <div class="product-list-item">
                <img :src="slotProps.data.thumbnail_src" :alt="slotProps.data.name" />
                <div class="product-list-detail">
                  <div class="product-name">{{ slotProps.data.name }}</div>
                  <!-- <div class="product-description">{{ slotProps.data.description }}</div> -->
                  <!-- <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating> -->
                  <i class="pi pi-file product-category-icon"></i>
                  <span class="product-category">{{ slotProps.data.width }} x {{ slotProps.data.height }} px | {{
                      (slotProps.data.size / 1024).toFixed(2)
                  }} KB </span>
                </div>
                <div class="product-list-action">
                  <!-- <span class="product-price">${{ slotProps.data.price }}</span> -->
                  <Button label="download" icon="pi pi-download" @click="downloadImage(slotProps.data)"
                    :loading="slotProps.data.isDownloading"></Button>
                  <!-- <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{
                      slotProps.data.inventoryStatus
                  }}</span> -->
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <!-- {{ slotProps }} -->
            <div class="col-12 md:col-4">
              <div class="product-grid-item card">
                <div class="product-grid-item-top">
                  <div>
                    <i class="pi pi-file product-category-icon"></i>
                    <span class="product-category">{{ slotProps.data.width }} x {{ slotProps.data.height }} px | {{
                        (slotProps.data.size / 1024).toFixed(2)
                    }} KB </span>
                  </div>
                  <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined"
                    @click="deleteImage($event, slotProps.data.id)"></Button>
                  <!-- <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{
                      slotProps.data.inventoryStatus
                  }}</span> -->
                </div>
                <div class="product-grid-item-content">
                  <template v-if="!isChangingPage">
                    <img :src="slotProps.data.thumbnail_src" :alt="slotProps.data.name"
                      @click="imageClick(slotProps.index)" />
                  </template>
                  <template v-else>
                    <div class="progress-spinner-container">
                      <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)"
                        animationDuration=".5s" />
                    </div>
                  </template>

                  <!-- <div class="product-name"></div> -->
                  <Inplace :active="slotProps.data.isInputtingIntro" @open="slotProps.data.isInputtingIntro = true">
                    <template #display>
                      {{ slotProps.data.introduction }}
                    </template>
                    <template #content>
                      <InputText v-model="slotProps.data.introduction" autoFocus /> <Button
                        @click="modifyIntroduction(slotProps.data)" icon="pi pi-check"></Button>
                    </template>
                  </Inplace>


                  <div class="product-description">{{ slotProps.data.name }}</div>
                  <div class="product-description">{{ slotProps.data.created_at }} </div>
                  <!-- <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating> -->
                </div>
                <div class="product-grid-item-bottom">
                  <span class="product-price">id:{{ slotProps.data.id }}</span>
                  <Button icon="pi pi-download" @click="downloadImage(slotProps.data)"
                    :loading="slotProps.data.isDownloading"></Button>
                </div>
              </div>
            </div>


          </template>
        </DataView>
      </div>
    </div>

    <Toast position="top-left" />
    <Sidebar v-model:visible="showUpload" position="full">
      <UploadVue :album="$route.query.album" @onUpload="onUpload"></UploadVue>
    </Sidebar>

  </div>
  <ConfirmPopup>
    <template #message="slotProps">
      <div class="flex p-4">
        <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
        <p class="pl-2">{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmPopup>



</template>

<script>
import Image from '@/services/ImageService';
import UploadVue from '@/components/Upload.vue';
export default {
  name: 'Images',
  components: { UploadVue },
  data() {

    return {
      first: 0,
      showUpload: false,
      isChangingPage: false,
      isloading: false,
      paginator: {
        page: 0,
        totalRecords: 0,
        per_page: 15,
      },
      layout: 'grid',
      orderBy: "-id",
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: 'Id High to Low', value: '-id' },
        { label: 'Id Low to High', value: '+id' },
      ],
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
    modifyIntroduction(image) {
      image.isInputtingIntro = false;
      Image.introduction(image).then(() => { })
    },
    downloadImage(image) {
      image.isDownloading = true
      Image.download(image).then(() => {
        image.isDownloading = false
      })
    },
    loadData(page = 1, per_page = 15, needReload = true, orderBy = "-id") {
      this.isloading = needReload
      this.paginator.page = page
      this.paginator.per_page = per_page
      return Image.get(this.$route.query.album, page, per_page, orderBy).then(data => {
        this.images = data.images;
        this.paginator.totalRecords = data.total;
        this.isloading = false
      });
    },
    onSortChange(event) {
      if (this.orderBy != event.value.value) {
        this.orderBy = event.value.value;
        this.loadData(1, this.paginator.per_page, true, this.orderBy).then(() => {
          this.first = 0
        })
      }

      // console.log(event)
    },
    deleteImage(event, id) {

      this.$confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this image?',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
          this.images = this.images.filter(image => image.id != id);
          Image.delete(id).then(() => {
            this.$toast.add({ severity: 'warn', summary: 'Success Message', detail: `Image ${id} has been deleted !`, life: 3000 });
          });
        },
        reject: () => {
          // this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });

    },

    imageClick(index) {
      this.activeIndex = index;
      this.displayCustom = true;
    },
    onUpload() {
      this.showUpload = false
      this.loadData(1, this.paginator.per_page, true).then(() => {
        this.first = 0
      });
    },
    onPage(event) {
      console.log(event)
      this.isChangingPage = true
      this.loadData(event.page + 1, event.rows, false).then(() => {
        this.first = event.first
        this.isChangingPage = false
      })
    }

  },

  created() {

  },
  mounted() {
    this.loadData();
  },


}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  border-radius: 4px;
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.p-inplace {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.product-description {
  margin: 0 0 0.5rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: .5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 .5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: .5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: .5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: .5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
    max-width: 80%;
    // height: 200px;
    max-height: 80%;
  }

  .product-grid-item-content {
    text-align: center;

    img {
      width: 300px;
      height: 200px;
      object-fit: scale-down;
    }
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}

@keyframes p-progress-spinner-color {

  100%,
  0% {
    stroke: #d62d20;
  }

  40% {
    stroke: #0057e7;
  }

  66% {
    stroke: #008744;
  }

  80%,
  90% {
    stroke: #ffa700;
  }
}

.progress-spinner-container {

  display: flex;
  align-items: center;
  margin: 2rem auto;
  width: 300px;
  height: 200px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
}
</style>
