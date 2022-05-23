<template>
    <Chip :label="name" :image="avatar" class="mr-2 mb-2" @click="toggle" />
    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
</template>

<script>
import Auth from '@/utils/auth'
import { mapState } from 'vuex'
export default {
    name: 'User',
    computed: mapState({
        name: state => state.name,
        avatar: state => state.avatar
    }),
    data() {
        return {
            items: [
                {
                    label: 'My',
                    items: [{
                        label: 'albums',
                        icon: 'pi pi-folder',
                        command: () => {
                            this.$router.push("/albums")
                        }
                    },
                    {
                        label: 'profile',
                        icon: 'pi pi-user',
                        command: () => {
                            this.$router.push("/profile")
                            // this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                        }
                    }
                    ]
                },
                {
                    label: 'Account',
                    items: [
                        // {
                        //     label: 'github',
                        //     icon: 'pi pi-external-link',
                        //     url: 'https://github.com/v012345/'
                        // },
                        {
                            label: 'logout',
                            icon: 'pi pi-sign-out',
                            command: () => {
                                // window.location.hash = "/fileupload"
                                Auth.removeToken()
                                this.$router.push("/login")
                            }
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
    },
    created() {

    }
}
</script>

<style scoped lang="less">
</style>
