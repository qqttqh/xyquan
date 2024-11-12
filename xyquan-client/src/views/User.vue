<template>
    <div class="container-root">
        <div class="container-main">
            <!-- 导航栏 -->
            <aside>
                <!-- 用户信息 -->
                <UserInfo></UserInfo>
            </aside>

            <!-- 帖子 -->
            <main>
                <RouterView />
                <!-- <Post v-for="(item, index) in userStore.myPosts" :propsPostData="item" :index="index"></Post> -->
            </main>
        </div>
    </div>
</template>
  
<script setup>
import UserInfo from '@/components/user/UserInfo.vue'
import { useUserStore } from '@/stores/user'
import { getMyPosts } from '@/api/getPosts'
import { onMounted, watchEffect } from 'vue'
import router from '@/router';

// onMounted(() => {
//     getMyPosts()
// })

// 帖子仓库
const userStore = useUserStore()

watchEffect(() => {
    if (!userStore.userData.userId) {
        router.push('/')
    }
})

</script>

<style lang="scss" scoped>
@import url(../assets/styles/Home.scss);
</style>