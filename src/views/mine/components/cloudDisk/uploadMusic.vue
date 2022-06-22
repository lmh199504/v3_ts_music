<template>
    <div class="upMusic">
        <van-uploader :after-read="afterRead" accept=".mp3">
            <template #default>
                <div class="wrapper box_shadow flex_box_center_column">
                    <i class="iconfont icon-yunshangchuan_o"></i>
                </div>
            </template>
        </van-uploader>
    </div>
</template>
<script setup lang="ts">
    import { Toast } from 'vant'
    import { reqUpCloudMusic } from '@/api/user'
    const emit = defineEmits<{
        (e: 'success'): void
    }>()
    // eslint-disable-next-line 
    function afterRead(file: any) {
        const formData = new FormData()
        formData.append('songFile', file.file)
        const loading = Toast.loading({
            message: '上传中...',
            overlay: true,
            duration: 0
        })
        reqUpCloudMusic(formData)
        .then(() => {
            emit('success')
        })
        .finally(() => {
            loading.clear()
        })
    }
</script>
<style scoped lang="less">
    .upMusic{
        position: fixed;
        bottom: 200px;
        left: 30px;
        .wrapper{
            background: #fff;
            border-radius: 50%;
            width: 80px;
            height: 80px;
        }
        .icon-yunshangchuan_o{
            font-size: 60px;
            color: var(--my-primary-color);
        }
    }
</style>