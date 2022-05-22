<template>
    <Toolbar>
        <template #start>
            <Button label="Home" @click="$router.push('/')" />
        </template>
        <template #end>
            <UserVue></UserVue>
        </template>
    </Toolbar>
    <div class="container">
        <div class="grid">
            <div class="col-4">
            </div>
            <div class="col-4">
                <Card>
                    <template #content>
                        <div class="grid">
                            <div class="col-12 flex align-items-center justify-content-center">
                                <div class="p-fluid">
                                    <div class="avatar">
                                        <Avatar :image="this.info.avatar" class="mr-2" size="xlarge" shape="circle" />
                                    </div>
                                    <div class="field">
                                        <label for="name">Name</label>
                                        <InputText id="name" type="text" v-model="info.name" />
                                    </div>
                                    <div class="field">
                                        <label for="email">E-mail</label>
                                        <InputText id="email" disabled type="text" v-model="info.email" />
                                    </div>
                                    <Button label="Save" @click="save" :loading="isSaving"></Button>
                                </div>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
            <div class="col-4">
            </div>
        </div>
    </div>
</template>
 

<script>

import User from '@/services/UserService';
import UserVue from "@/components/User.vue"
export default {
    name: 'Profile',
    components: { UserVue },
    data() {
        return {
            isSaving: false,
            info: {
                id: undefined,
                name: "",
                avatar: "",
                email: ""
            },
            name: "123"
        }
    },
    methods: {
        save() {
            User.update(this.info).then((info) => {
                console.log(info)
            })
        }
    },
    created() {
        User.getInfo().then(info => {
            this.info = info
        });

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
    // transform: translateY(50%);
    margin-top: 100px;
}

.avatar {
    display: flex;
    justify-content: center;
}
</style>
