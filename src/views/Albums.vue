<template>
  <div class="Albums">
    <div v-for="album in albums" :key="album.id">
      <router-link :to="{ path: '/images', query: { album: album.id } }">{{ album.name }}</router-link>
    </div>
  </div>
</template>

<script>
import AlbumService from '@/services/AlbumService';
export default {
  name: 'Albums',
  data() {
    return {
      albums: []
    }
  },
  methods: {

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
</style>
