<template>
    <div @click="isExpand = isExpand ? false : true" class="root-container" :class="{ 'root-container-expand': isExpand }">
        <!-- 头像和用户名 -->
        <div class="avatar-and-username">
            <el-avatar shape="square" :size="40" :src="squareUrl" />
            <span class="username">登录 / 注册</span>
        </div>
        <!-- 下拉图标 -->
        <component :is="isExpand ? ArrowUp : ArrowDown" class="icon"></component>
        <!-- 菜单内容部分 -->
        <div @click.stop="" class="menu-part" :class="{ 'menu-part-expand': isExpand }">
            <LoginForm v-if="toLogin"></LoginForm>
            <RegisterForm v-if="!toLogin" @closeRegist="toLogin = true"></RegisterForm>
            <!-- <component :is="LoginOrRegister ? RegisterForm : LoginForm"></component> -->
            <div class="change-login-register">
                <span @click="toLogin = toLogin ? false : true">{{ toLogin ? '注册' : '登录' }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { ref } from 'vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

const isExpand = ref(false)
const squareUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
// 0是登录-1是注册
const toLogin = ref(true)

</script>

<style lang="scss" scoped>
.root-container-expand {
    border-radius: 15px 15px 0 0 !important;
}

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
    box-shadow: 0 0 10px rgba(0,0,0,.1);

    // 头像和用户名
    .avatar-and-username {
        display: flex;
        justify-content: start;
        align-items: center;

        .username {
            color: #000;
            padding-left: 15px;
        }
    }

    .icon {
        width: 20px;
        height: 20px;
    }

    // 菜单内部
    .menu-part-expand {
        display: block !important;
    }

    .menu-part {
        display: none;
        position: absolute;
        z-index: 10;
        width: 100%;
        left: 0;
        bottom: 0;
        transform: translate(0, 100%);
        margin: 0;
        border-radius: 0 0 15px 15px;
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(175, 175, 175, 0.1),
            0 6px 20px rgba(175, 175, 175, 0.1);

        .change-login-register {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-bottom: 10px;

            span {
                color: gray;
                font-size: 12px;
                text-decoration: underline;
            }

            span:hover {
                color: #000;
            }
        }
    }

}
</style>
