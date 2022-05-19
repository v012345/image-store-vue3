<template>
    <Toolbar>
        <template #end>
            <Button label="Login" icon="pi pi-user" @click="$router.push('/login')" />
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
                                        <label for="Name">Name</label>
                                        <InputText id="Name" type="text" v-model="name" />
                                    </div>
                                    <div class="field">
                                        <label for="email">E-mail Address</label>
                                        <InputText id="email" type="text" v-model="email" />
                                    </div>
                                    <div class="field">
                                        <label for="password">Password</label>
                                        <InputText id="password" type="password" v-model="password" />
                                    </div>
                                    <div class="field">
                                        <label for="password">Confirm Password</label>
                                        <InputText id="confirmPassword" type="password" v-model="confirm_password" />
                                    </div>
                                    <Button label="Sign Up" class="p-button-success" @click="register"
                                        :loading="isSigningUp"></Button>
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
    name: 'SignUp',
    data() {
        return {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            isSigningUp: false,
        }
    },
    methods: {
        register() {
            this.isSigningUp = true
            User.register({
                name: this.name,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password,
            }).then(() => {
                this.$router.push("/")
            }).catch(e => {
                this.isSigningUp = false
                for (const key in e.response.data) {
                    e.response.data[key].forEach(element => {
                        this.$toast.add({ severity: 'error', summary: key, detail: element, life: 3000 });
                    });
                }
                // 
            })
        }
    },
}
</script>

<style scoped lang="less">
.container {
    margin-top: 100px;
    // transform: translateY(50%)
}
</style>

