<template>
    <Toolbar>
        <template #end>
            <Button label="Sign Up" icon="pi pi-user-plus" class="p-button-success" @click="$router.push('/signup')" />
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
                                        <label for="email">E-mail</label>
                                        <InputText id="email" type="text" v-model="email" />
                                    </div>
                                    <div class="field">
                                        <label for="password">Password</label>
                                        <InputText id="password" type="password" v-model="password" />
                                    </div>
                                    <Button label="Login" @click="login" :loading="isLoggingin"></Button>
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
export default {
    name: 'Login',
    data() {
        return {
            email: "",
            password: "",
            isLoggingin: false,
        }
    },
    methods: {
        login() {
            this.isLoggingin = true
            User.login({
                email: this.email,
                password: this.password
            }).then(() => {
                this.$router.push("/")
            }).catch(e => {
                this.isLoggingin = false
                this.$toast.add({ severity: 'error', summary: e.response.statusText, detail: e.response.data, life: 3000 });
            })
        }
    },
    created() {
    }
}
</script>

<style scoped lang="less">
.container {
    // transform: translateY(50%);
    margin-top: 100px;
}
</style>

