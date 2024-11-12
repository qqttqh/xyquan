<template>
    <div @click.stop="router.push('/user')" class="root-container">
        <!-- 头像和用户名 -->
        <div class="avatar-and-username">
            <el-avatar shape="square" :size="40" :src="userStore.userData.userAvatar" />
            <span class="username">{{ userStore.userData.userName }}</span>
        </div>
        <div class="send-post-and-expend">
            <!-- 发圈按钮 -->
            <el-button @click.stop="sendCardShow = true" class="btn" :icon="Send" circle size="small" />
            <el-button @click.stop="logout" class="btn" :icon="LogOut" circle size="small" />
        </div>
    </div>
    <!-- 发帖模块 -->
    <SendPost :sendCardShow="sendCardShow" @closeSendCard="sendCardShow = false"></SendPost>
</template>

<script setup>
import LogOut from '@/components/icons/LogOut.vue'
import Send from '@/components/icons/Send.vue'
import SendPost from '@/components/user/SendPost.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '@/api/auth'

const userStore = useUserStore()
const sendCardShow = ref(false)
const router = useRouter()

</script>

<style lang="scss" scoped>
.root-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 15px;
    padding: 10px 20px;
    margin: 10px 0;
    background-color: #FFFFFF;
    box-sizing: border-box;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0,0,0, .1);

    // 头像和用户名
    .avatar-and-username {
        display: flex;
        justify-content: start;
        align-items: center;

        .username {
            padding-left: 15px;
            white-space: nowrap;
            /* 不换行 */
            overflow: hidden;
            /* 溢出部分隐藏 */
            text-overflow: ellipsis;
            /* 显示省略号 */
        }
    }

    .send-post-and-expend {
        display: flex;
        align-items: center;

        .btn {
            margin-left: 3px;
        }

        .icon {
            width: 20px;
            height: 20px;
        }
    }

}
</style>
