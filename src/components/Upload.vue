<template>
    <div class="FileUpload">
        <div class="progress-bar">
            <ProgressBar :value="value" />
        </div>
        <BlockUI :blocked="needBlocking">
            <FileUpload name="images[]" :url="'https://mini17.net/api/v1/images?album=' + album" @upload="onUpload"
                @progress="onProgress" :customUpload="true" @uploader="myUploader" :multiple="true" accept="image/*"
                :maxFileSize="10000000">
                <template #empty>
                    <p>Drag and drop files to here to upload.</p>
                </template>
            </FileUpload>
        </BlockUI>
    </div>
</template>

<script>
import Image from '@/services/ImageService';
export default {
    name: 'Upload',
    data() {
        return {
            value: 0
            ,
            needBlocking: false
        }
    },
    props: {
        album: {
            type: [Number, String],
        }
    },
    methods: {
        onUpload() {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
            this.$emit('onUpload')
        },
        myUploader(event) {
            this.needBlocking = true;
            Image.store(event.files, this.album, (progressEvent) => {
                this.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            }).then(() => {
                this.needBlocking = false;
                this.onUpload()
            }).catch(() => {
                this.needBlocking = false;
            })
            // return true
        },

    },
}
</script>

<style scoped lang="less">
.progress-bar {
    margin-bottom: 1rem;
}
</style>
