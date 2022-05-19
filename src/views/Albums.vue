<template>
  <div class="Albums">
    <Toolbar>
      <template #start>
        <Button label="Home" @click="$router.push('/')" />
      </template>
      <template #end>
        <InputText type="text" v-model="albumName" placeholder="Album Name" />
        <Button label="Create" icon="pi pi-check" class="p-button-success" @click="createAlbum($event)"
          :loading="isCreating" />
      </template>
    </Toolbar>
    <div class="albums">
      <div v-for="album in albums" :key="album.id" class="album">
        <Card style="width: 330px">
          <template #header>
            <img :src="album.cover" style="height: 180px" />
          </template>
          <template #title>
            {{ album.name }}
          </template>
          <template #subtitle>
            contain {{ album.images_count }} {{ album.images_count > 1 ? "images" : "image" }}
          </template>

          <template #footer>
            <div class="buttons">
              <Button icon="pi pi-check" label="Open" @click="openAlnum(album.id)" />
              <Button icon="pi pi-times" label="Delete" class="p-button-secondary" style="margin-left: .5em" />
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div class="field col-12 md:col-12" v-if="loading">
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton width="10rem" class="mb-2"></Skeleton>
      <Skeleton width="5rem" class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2"></Skeleton>
      <Skeleton width="10rem" height="4rem"></Skeleton>
    </div>

  </div>
</template>

<script>
import Album from '@/services/AlbumService';
export default {
  name: 'Albums',
  data() {
    return {
      loading: true,
      isCreating: false,
      albums: [],
      albumName: "",
    }
  },
  methods: {
    createAlbum() {
      if (this.albumName) {
        this.isCreating = true
        Album.create(this.albumName).then(data => {
          this.$router.push({ path: '/images', query: { album: data.id } })
        });
      }
    },
    openAlnum(id) {
      this.$router.push({ path: '/images', query: { album: id } })
    }

  },


  mounted() {
    Album.get().then(albums => {
      this.albums = albums;
      this.loading = false;
    });
  },

}
</script>

<style scoped lang="less">
.p-inputtext {
  margin-right: .5rem;
}

p {
  line-height: 1.5;
  margin: 0;
}

.buttons {
  display: flex;
  justify-content: space-around;
}

.albums {
  display: grid;
  grid-template-columns: repeat(auto-fill, 350px);
  justify-content: space-between;
  grid-gap: 20px;



  .album {

    margin: 0.5rem
  }

  img {
    object-fit: scale-down;
  }
}
</style>
