<template>
    <div class="root" v-infinite-scroll="load" infinite-scroll-distance="200" ref="scrollableBox">
        <Post v-for="(item, index) in posts" :propsPostData="item" :index="index"></Post>
    </div>
    <el-backtop :right="50" :bottom="50" target=".root" :visibility-height="200" />
</template>

<script setup>
import { usePostStore } from '@/stores/post'
import { getConfessionPosts } from '@/api/getPosts'
import { onMounted, computed, ref } from 'vue';

const scrollableBox = ref(null);
onMounted(() => {
    scrollableBox.value = document.querySelector('.root');
});

const postStore = usePostStore()

// onMounted(() => {
//     getConfessionPosts()
// })
const count = ref(1)
function load() {
    getConfessionPosts(count.value)
    count.value += 1
}

const posts = computed(() => {
    return postStore.data.filter(post => post.postGroup === 'ConfessionWall')
})

</script>

<style lang="scss" scoped>
.root {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: auto;
    scrollbar-color: #FFFFFF #FFFFFF;
}
</style>