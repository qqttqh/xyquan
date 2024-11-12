<template>
    <div class="root-container">
        <div class="header-container">
            <!-- 头像和用户名 -->
            <div class="avatar-and-username">
                <div class="user-avatar-container" @click="isEdit = true">
                    <el-avatar class="user-avatar" shape="square" :size="40" :src="userStore.userData.userAvatar" />
                    <div class="user-avatar-mask"><span>编辑</span></div>
                </div>
                <span class="username">{{ userStore.userData.userName }}</span>
            </div>
            <div class="send-post-and-expend">
                <!-- 发圈按钮 -->
                <el-button @click.stop="sendCardShow = true" class="btn" :icon="Send" circle size="small" />
                <!-- 注销按钮 -->
                <el-button @click.stop="logout" class="btn" :icon="LogOut" circle size="small" />
                <!-- 回到首页 -->
                <el-button @click.stop="router.push('/')" class="btn" :icon="HomeFilled" circle size="small" />
            </div>
        </div>
        <!-- 用户信息 -->
        <Info v-show="!isEdit"></Info>
        <EditInfo v-show="isEdit" @cancleEdit="isEdit = false"></EditInfo>
        <!-- <component :is="isEdit ? EditInfo : Info"></component> -->
    </div>

    <!-- 发帖模块 -->
    <SendPost :sendCardShow="sendCardShow" @closeSendCard="sendCardShow = false"></SendPost>
</template>

<script setup>
import Info from './Info.vue'
import EditInfo from './EditInfo.vue'
import LogOut from '@/components/icons/LogOut.vue'
import Send from '@/components/icons/Send.vue'
import SendPost from '@/components/user/SendPost.vue'
import { useUserStore } from '@/stores/user'
import { HomeFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '@/api/auth'

const userStore = useUserStore()
const sendCardShow = ref(false)
const router = useRouter()
const isEdit = ref(false)

</script>

<style lang="scss" scoped>
.root-container {
    width: 90%;

    .header-container {
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
        box-shadow: 0 4px 8px rgba(175, 175, 175, 0.1),
            0 6px 20px rgba(175, 175, 175, 0.1);


        // 头像和用户名
        .avatar-and-username {
            display: flex;
            justify-content: start;
            align-items: center;

            .user-avatar-container {
                position: relative;
                cursor: pointer;

                .user-avatar-mask {
                    display: none;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    z-index: 10;
                    top: 0;
                    left: 0;
                    background-color: rgba($color: #000000, $alpha: .3);
                    width: 40px;
                    height: 40px;
                    border-radius: 4px;

                    span {
                        color: #FFFFFF;
                        font-size: 12px;
                    }
                }
            }

            .user-avatar-container:hover {
                .user-avatar-mask {
                    display: flex;
                }
            }

            .username {
                //width: 60px;
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
        }
    }
}
</style>
