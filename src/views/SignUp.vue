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
                                        <label for="username">Username</label>
                                        <InputText id="username" type="text" />
                                    </div>
                                    <div class="field">
                                        <label for="username">E-mail Address</label>
                                        <InputText id="email" type="text" />
                                    </div>
                                    <div class="field">
                                        <label for="password">Password</label>
                                        <InputText id="password" type="password" />
                                    </div>
                                    <div class="field">
                                        <label for="password">Confirm Password</label>
                                        <InputText id="confirmPassword" type="password" />
                                    </div>
                                    <Button label="Sign Up" class="p-button-success"></Button>
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

export default {
    name: 'SignUp',
    data() {
        return {
        }
    },
    methods: {
    },
}
</script>

<style scoped lang="less">
.container {
    margin-top: 100px;
    // transform: translateY(50%)
}
</style>

