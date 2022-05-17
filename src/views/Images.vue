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


      <!-- <div v-if="images" class="grid" style="max-width: 1000px;">
        <div v-for="(image, index) of images" class="col-3" :key="index">
          <img :src="image.thumbnail_src" :alt="image.alt" style="cursor: pointer;max-width: 300px;"
            @click="imageClick(index)" />
        </div>
      </div> -->
      <div class="card">
        <DataView :value="images" :lazy="true" :first="first" :totalRecords="paginator.totalRecords" :layout="layout"
          :paginator="true" :rows="15" :sortOrder="sortOrder" :rowsPerPageOptions="[15, 24, 33]" @page="onPage($event)"
          :sortField="sortField">
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
                  <i class="pi pi-tag product-category-icon"></i><span class="product-category">{{
                      slotProps.data.category
                  }}</span>
                </div>
                <div class="product-list-action">
                  <!-- <span class="product-price">${{ slotProps.data.price }}</span> -->
                  <Button icon="pi pi-shopping-cart" label="Add to Cart"
                    :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
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
                    <i class="pi pi-tag product-category-icon"></i>
                    <span class="product-category">{{ slotProps.data.albums[0].name }}</span>
                  </div>
                  <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined"
                    @click="deleteImage(slotProps.data.id)"></Button>
                  <!-- <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{
                      slotProps.data.inventoryStatus
                  }}</span> -->
                </div>
                <div class="product-grid-item-content">
                  <img :src="slotProps.data.thumbnail_src" :alt="slotProps.data.name"
                    @click="imageClick(slotProps.index)" />
                  <div class="product-name">{{ slotProps.data.name }}</div>
                  <div class="product-description">{{ slotProps.data.created_at }}</div>
                  <!-- <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating> -->
                </div>
                <div class="product-grid-item-bottom">
                  <span class="product-price">id:{{ slotProps.data.id }}</span>
                  <Button icon="pi pi-download" @click="downloadImage(slotProps.data)"></Button>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
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
      first: 0,
      showUpload: false,
      blockedPanel: false,
      paginator: {
        totalRecords: 0
      },
      layout: 'grid',
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: 'Id High to Low', value: '!price' },
        { label: 'Id Low to High', value: 'price' },
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
    downloadImage(image) {
      // console.log(image)
      this.galleriaService.downloadImage(image)
    },
    loadData() {
      this.blockedPanel = true
      this.galleriaService.getImages(this.$route.query.album).then(data => {
        console.log(data.images)
        this.images = data.images;
        this.paginator.totalRecords = data.total;
        this.blockedPanel = false
      });
    },
    onSortChange(event) {
      console.log(event)
    },
    async deleteImage(id) {
      await this.galleriaService.deleteImage(id);
      this.loadData();
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
        console.log(data.images)
        this.first = 0
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
.ProgressSpinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
}






.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  border-radius: 4px;
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
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
</style>
