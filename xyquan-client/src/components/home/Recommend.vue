<template>
    <!-- 推荐 -->
    <div class="root" v-infinite-scroll="load" infinite-scroll-distance="200" ref="scrollableBox">
        <Post @deleteMe="deleteMe" v-for="(item, index) in data" :propsPostData="item" :key="item.postId" :index="index">
        </Post>
        <el-backtop :right="50" :bottom="50" target=".root" :visibility-height="200" />
    </div>
</template>
  
<script setup>
import { usePostStore } from '@/stores/post';
import { getPosts } from '@/api/getPosts';
import { ref, toRefs, onMounted } from 'vue';

const { data } = toRefs(usePostStore());

const scrollableBox = ref(null);

onMounted(() => {
    scrollableBox.value = document.querySelector('.root');
});

// 滑动到底部请求新的帖子
const count = ref(1);
function load() {
    getPosts(count.value);
    count.value += 1;
}

// 删除帖子时将仓库缓存删除
const deleteMe = (postId) => {
    data.value = data.value.filter(item => item.postId !== postId);
};
</script>
  
<style lang="scss" scoped>
.root {
  //flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
  touch-action: auto; /* 确保滑动功能 */
  -webkit-overflow-scrolling: touch; /* iOS设备上的惯性滚动 */
}
</style>
  