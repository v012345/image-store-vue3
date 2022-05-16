<template>
  <div class="Albums">
    <Toolbar>
      <template #end>
        <InputText type="text" v-model="albumName" placeholder="Album Name" />
        <Button label="Create" icon="pi pi-check" class="p-button-success" @click="createAlbum($event)" />
      </template>
    </Toolbar>
    <div v-for="album in albums" :key="album.id">
      <i class="pi pi-folder-open">
        <router-link :to="{ path: '/images', query: { album: album.id } }">{{ album.name }}</router-link>
      </i>

    </div>
    <!-- <div>
      <InputText type="text" v-model="albumName" />
      <Button label="创建图集"></Button>
    </div> -->
  </div>
</template>

<script>
import AlbumService from '@/services/AlbumService';
export default {
  name: 'Albums',
  data() {
    return {
      albums: [],
      albumName: "",
    }
  },
  methods: {
    createAlbum(event) {
      console.log(event)
      if (this.albumName) {
        this.AlbumService.createAlbum(this.albumName).then(data => {
          this.$router.push({ path: '/images', query: { album: data.id } })
        });
      }

    }
  },
  AlbumService: null,
  created() {
    this.AlbumService = new AlbumService();
  },
  mounted() {
    this.AlbumService.getAlbums().then(albums => {
      this.albums = albums
    });

  },

}
</script>

<style scoped lang="less">
.p-inputtext {

  margin-right: .5rem;


}
</style>
