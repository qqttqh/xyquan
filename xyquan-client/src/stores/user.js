import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
    // 用户信息
    const userData = reactive({
        token: '',
        userId: null,
        userEmail: '',
        userName: '',
        userAvatar: '',
        userTag: [],
    })

    const userPosts = ref([]) // 用户帖子队列

    // 从后边推入帖子
    const addPosts = (posts) => {
        posts.forEach(post => {
            if (!userPosts.value.some(existingPost => existingPost.postId === post.postId)) {
                userPosts.value.push(post);
            }
        });
    };

    // 从前边推入帖子
    const nushiftPosts = (posts) => {
        posts.forEach(post => {
            if (!userPosts.value.some(existingPost => existingPost.postId === post.postId)) {
                userPosts.value.unshift(post);
            }
        });
    };

    return { userData, userPosts, addPosts, nushiftPosts }
}, {
    persist: {
        paths: ['userData']
    }
})


