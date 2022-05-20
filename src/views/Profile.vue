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
                                    <div class="field">
                                        <label for="name">Name</label>
                                        <InputText id="name" type="text" v-model="name" />
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
            info: User.getInfo(),
            name: "123"
        }
    },
    methods: {
        save() {
            console.log(this.info)
        }
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
    // transform: translateY(50%);
    margin-top: 100px;
}
</style>
