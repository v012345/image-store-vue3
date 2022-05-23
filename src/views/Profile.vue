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
                                        <BlockUI :blocked="needBlocking" class="circle">
                                            <Avatar :image="myAvatar" @click="uploadAvatar" class="mr-2" size="xlarge"
                                                shape="circle" />
                                        </BlockUI>
                                        <FileUpload ref="uploadButton" v-show="false" mode="basic" name="avatar"
                                            url="./upload" :customUpload="true" @uploader="myUploader" :auto="true" />
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
    <Toast />
</template>
 

<script>

import User from '@/services/UserService';
import UserVue from "@/components/User.vue"
import { mapState } from 'vuex'
export default {
    name: 'Profile',
    components: { UserVue },
    computed: {
        ...mapState({
            name: state => state.name,
            avatar: state => state.avatar
        })
    },
    data() {
        return {
            isSaving: false,
            needBlocking: false,
            info: {
                id: undefined,
                name: "",
                avatar: "",
                email: "",
            },
            myAvatar: "",

        }
    },
    methods: {
        save() {
            if (this.info.id && !this.needBlocking) {
                this.isSaving = true
                User.update(this.info).then(() => {
                    this.isSaving = false
                    this.$toast.add({ severity: 'success', summary: "success", detail: "modified successfully", life: 3000 });
                }).catch(e => {

                    this.isSaving = false
                    for (const key in e.response.data.errors) {
                        e.response.data.errors[key].forEach(element => {
                            this.$toast.add({ severity: 'error', summary: key, detail: element, life: 3000 });
                        });
                    }
                })
            }
        },
        uploadAvatar() {
            this.$refs.uploadButton.choose()
        },
        myUploader(event) {
            this.needBlocking = true;
            User.uploadAvatar(event.files).then((avatar) => {
                this.info.avatar = avatar;
                this.myAvatar = process.env.VUE_APP_BASE_BACKEND + avatar
                this.needBlocking = false;
            })
        },
    },
    created() {
        User.getInfo().then(info => {
            this.$store.commit('setName', info.name)
            this.$store.commit('setAvatar', process.env.VUE_APP_BASE_BACKEND + info.avatar)
            this.info = info
        });
        this.myAvatar = this.avatar

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



    .circle {
        border-radius: 50%;
        overflow: hidden;

        .p-avatar {
            margin: 0 !important;
        }
    }
}
</style>
