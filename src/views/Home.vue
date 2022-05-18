<template>
  <Toolbar>
    <template #end>
      <template v-if="!hasAuth">
        <Button label="Login" icon="pi pi-user" @click="$router.push('/login')" />
      </template>
      <template v-else>
        <Button label="My Albums" icon="pi pi-folder-open" @click="$router.push('/albums')" />
      </template>

    </template>
  </Toolbar>

</template>

<script>
import Auth from '@/utils/auth'
export default {
  name: 'Home',
  data() {
    return {
      hasAuth: Auth.getToken()
    }
  },
  methods: {

  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
