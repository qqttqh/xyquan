import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('postStore', () => {
    const data = ref([]) // 所有帖子数据

    // 从后面将帖子推入缓存队列
    const addPosts = (posts) => {
        posts.forEach(post => {
            if (!data.value.some(existingPost => existingPost.postId === post.postId)) {
                data.value.push(post)
                data.value = data.value.slice() // 触发响应性
            }
        });
    };

    // 从前面将帖子推入缓存队列
    const unshiftPosts = (posts) => {
        posts.forEach(post => {
            if (!data.value.some(existingPost => existingPost.postId === post.postId)) {
                data.value.unshift(post)
                data.value = data.value.slice() // 触发响应性
            }
        });
    };

    return { data, addPosts, unshiftPosts }
})
