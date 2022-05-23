<template>
    <div class="stack-container">
        <img src="@/assets/primevue-logo-dark.svg" />
        <img src="@/assets/logotype.min.svg" />
        <img src="@/assets/vue-js-seeklogo.com.svg" />
    </div>
</template>

<script>

export default {
    name: 'TechStack',
    data() {
        return {
        }
    },
    methods: {
    },
}
</script>

<style scoped lang="less">
.stack-container {
    margin-top: 3rem;
    display: flex;
    justify-content: center;

    img {
        margin: 0 3rem;
    }
}
</style>
