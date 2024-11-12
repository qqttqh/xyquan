<template>
    <div class="main-container">
        <!-- 头像 -->
        <div class="user-avatar-container" @click="triggerFileInput">
            <el-avatar class="user-avatar" shape="square" :size="80" :src="previewAvatar" />
            <div class="user-avatar-mask"><span>更换</span></div>
            <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" accept="image/*" />
        </div>
        <!-- 用户名 -->
        <div class="info-item">
            <el-input v-model="userName">
                <template #prefix>
                    <el-icon>
                        <IconColorUser />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <!-- id -->
        <div class="info-item">
            <el-input v-model="userId" disabled>
                <template #prefix>
                    <el-icon>
                        <IconId></IconId>
                    </el-icon>
                </template>
            </el-input>
        </div>
        <!-- 邮箱 -->
        <div class="info-item">
            <el-input v-model="userEmail" disabled>
                <template #prefix>
                    <el-icon>
                        <ColorEmail />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <!-- 标签 -->
        <div class="info-item">
            <el-input v-model="level">
                <template #prefix>
                    <el-icon>
                        <IconTag />
                    </el-icon>
                </template>
                <template #append>级</template>
            </el-input>
        </div>
        <!-- 取消-保存按钮 -->
        <div class="info-item">
            <el-button @click="emit('cancleEdit')">取消</el-button>
            <el-button type="primary" color="#4933FF" @click="handleSave">保存</el-button>
        </div>
    </div>
</template>

<script setup>
import IconColorUser from '../icons/IconColorUser.vue'
import IconId from '../icons/IconId.vue'
import IconTag from '../icons/IconTag.vue'
import ColorEmail from '../icons/ColorEmail.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadImages } from '@/api/posts'
import { updateUser } from '@/api/users'

const userStore = useUserStore()
const emit = defineEmits(['cancleEdit'])

const userName = ref(userStore.userData.userName) // 用户名
const userId = ref(userStore.userData.userId) // ID
const userEmail = ref(userStore.userData.userEmail) // 邮箱
const getLevel = parseInt(userStore.userData.userTag[0].title.replace(/\D/g, ''), 10)
const level = ref(getLevel) // 年级
const previewAvatar = ref(userStore.userData.userAvatar) // 用户头像初始值
// 引用隐藏的文件输入
const fileInput = ref(null)
const selectedFile = ref(null)
// 触发隐藏的文件输入
const triggerFileInput = () => {
    fileInput.value.click()
}
// 处理文件选择
const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        selectedFile.value = file
        const reader = new FileReader()
        reader.onload = () => {
            previewAvatar.value = reader.result
        }
        reader.readAsDataURL(file)
    }
}
// 处理保存
const handleSave = async () => {
    try {
        let avatarUrl = ''
        if (selectedFile.value) {
            const response = await uploadImages([selectedFile.value]) // 接收上传头像响应结果
            avatarUrl = response.urls[0] // 提取头像链接
            userStore.userData.userAvatar = avatarUrl
        }
        const tagArray = [{ title: `${level.value}级`, type: userStore.userData.userTag[0].type }]  // 拼接新的标签
        updateUser({ userName: userName.value, avatar: avatarUrl, tag: tagArray }) // 上传用户数据
        // 更新本地存储
        userStore.userData.userName = userName.value
        userStore.userData.userTag = tagArray
        window.location.reload() // 刷新页面
    } catch (error) {
        console.log(error);
        ElMessage.error('保存错误');
    }
}


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
        justify-content: center;
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

    .user-avatar-container {
        position: relative;
        cursor: pointer;
        margin: 0 0 10px;

        .user-avatar-mask {
            display: none;
            justify-content: center;
            align-items: center;
            position: absolute;
            z-index: 10;
            top: 0;
            left: 0;
            background-color: rgba($color: #000000, $alpha: .3);
            width: 80px;
            height: 80px;
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
}
</style>
