<template>
    <div class="main-container">
        <!-- 用户名 -->
        <div class="info-item">
            <el-icon>
                <IconColorUser />
            </el-icon>
            <span>{{ userStore.userData.userName }}</span>
        </div>
        <!-- id -->
        <div class="info-item">
            <el-icon>
                <IconId />
            </el-icon>
            <span>{{ userStore.userData.userId }}</span>
        </div>
        <!-- 邮箱 -->
        <div class="info-item">
            <el-icon>
                <ColorEmail />
            </el-icon>
            <span>{{ userStore.userData.userEmail }}</span>
        </div>
        <!-- 标签 -->
        <div class="info-item">
            <el-icon>
                <IconTag />
            </el-icon>
            <span>
                <Tag v-for="item in userStore.userData.userTag" :title="item.title" :type="item.type" />
            </span>

        </div>
    </div>
</template>

<script setup>
import IconColorUser from '../icons/IconColorUser.vue'
import IconId from '../icons/IconId.vue'
import IconTag from '../icons/IconTag.vue'
import Tag from '../base/Tag.vue'
import ColorEmail from '../icons/ColorEmail.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

</script>

<style lang="scss" scoped>
.main-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 15px;
    padding: 10px 20px;
    margin: 10px 0;
    background-color: #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0 4px 8px rgba(175, 175, 175, 0.1),
        0 6px 20px rgba(175, 175, 175, 0.1);

    .info-item {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: rgb(126, 121, 121);
        // border: 1px solid #b7b2b2;
        border-radius: 10px;
        width: 100%;
        padding: 5px 10px;
        margin-bottom: 10px;

        span {
            margin-left: 5px;
        }
    }
}
</style>