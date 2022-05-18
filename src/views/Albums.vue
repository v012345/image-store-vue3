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
    <div v-for="album in albums" :key="album.id">
      <i class="pi pi-folder-open">
        <router-link :to="{ path: '/images', query: { album: album.id } }">{{ album.name }} [{{ album.images_count }}]
        </router-link>
      </i>
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
    createAlbum(event) {
      console.log(event)
      if (this.albumName) {
        this.isCreating = true
        Album.create(this.albumName).then(data => {
          this.$router.push({ path: '/images', query: { album: data.id } })
        });
      }
    }
  },


  mounted() {
    Album.get().then(albums => {
      console.log(albums)
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
</style>
