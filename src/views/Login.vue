<template>
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
                                        <label for="password">Password</label>
                                        <InputText id="password" type="password" />
                                    </div>
                                    <div class="grid">
                                        <div class="col-6">
                                            <Button label="Sign Up" icon="pi pi-user-plus"
                                                class="p-button-success"></Button>
                                        </div>
                                        <div class="col-6">
                                            <Button label="Login"></Button>
                                        </div>
                                    </div>
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
    name: 'Login',
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
    margin-top: 50vh;
    transform: translateY(-50%)
}
</style>

