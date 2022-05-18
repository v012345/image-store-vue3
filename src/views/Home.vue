<template>
  <Toolbar>
    <template #end>
      <template v-if="!hasAuth">
        <Button label="Login" icon="pi pi-user" @click="$router.push('/login')" />
      </template>
      <template v-else>
        <UserVue></UserVue>
      </template>

    </template>
  </Toolbar>

</template>

<script>
import Auth from '@/utils/auth'

import UserVue from "@/components/User.vue"
export default {
  name: 'Home',
  components: { UserVue },
  data() {
    return {
      hasAuth: Auth.getToken(),
    }
  },
  methods: {

  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
