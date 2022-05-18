<template>
    <Chip :label="name" :image="avatar" class="mr-2 mb-2" @click="toggle" />
    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
</template>

<script>
import User from '@/services/UserService'
import Auth from '@/utils/auth'
export default {
    name: 'User',
    data() {
        return {

            items: [
                {
                    label: 'My',
                    items: [{
                        label: 'albums',
                        icon: 'pi pi-refresh',
                        command: () => {
                            this.$router.push("/albums")
                        }
                    },
                    {
                        label: 'profile',
                        icon: 'pi pi-times',
                        command: () => {

                            // this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                        }
                    }
                    ]
                },
                {
                    label: 'Account',
                    items: [
                        {
                            label: 'github',
                            icon: 'pi pi-external-link',
                            url: 'https://github.com/v012345/'
                        },
                        {
                            label: 'logout',
                            icon: 'pi pi-upload',
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
        this.name = User.name
        this.avatar = User.avatar
    }
}
</script>

<style scoped lang="less">
</style>
