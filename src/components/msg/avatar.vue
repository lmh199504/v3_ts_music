<!-- 头像 -->
<template>
    <div class="avatar">
        <img src="" alt="">
    </div>
</template>
<script setup lang="ts">
interface Props{
    avatarUrl: string
}
const props = withDefaults(defineProps<Props>(), {
    avatarUrl: ''
})

</script>