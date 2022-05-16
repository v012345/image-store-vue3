<template>
    <div class="FileUpload">
        <FileUpload name="images[]" :url="'https://mini17.net/api/v1/images?album=' + album" @upload="onUpload"
            :multiple="true" accept="image/*" :maxFileSize="10000000">
            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
        </FileUpload>
    </div>
</template>

<script>

export default {
    name: 'Upload',
    data() {
        return {
        }
    },
    props: {
        album: {
            type: Number,
        }
    },
    methods: {
        onUpload() {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
            this.$emit('onUpload')
        },
    },
}
</script>

<style scoped lang="less">
</style>
