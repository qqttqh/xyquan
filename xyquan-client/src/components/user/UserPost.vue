<template>
    <div class="root" v-infinite-scroll="load" infinite-scroll-distance="200" ref="scrollableBox">
        <div class="nothing-contents" v-show="!userPosts.length">没有内容..........</div>
        <Post v-for="(item, index) in userPosts" :propsPostData="item" :index="index" :key="item.postId"></Post>
        <el-backtop :right="50" :bottom="50" target=".root" :visibility-height="50" />
    </div>
</template>


<script setup>
import Post from '../home/Post.vue'
import { toRefs, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { getMyPosts } from '@/api/getPosts'

// 获取用户帖子数据
const { userPosts } = toRefs(useUserStore())
const scrollableBox = ref(null)

// 组件挂载后获取滚动容器的引用
onMounted(() => {
    scrollableBox.value = document.querySelector('.root')
})

// 滑动到底部请求新的帖子
const count = ref(1)
function load() {
    getMyPosts(count.value)
    count.value += 1
}
</script>


<style lang="scss" scoped>
.root {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: auto;
    scrollbar-color: #FFFFFF #FFFFFF;

    .nothing-contents {
        color: gray;
        padding: 20px;
        font-size: 14px;
    }
}
</style>
