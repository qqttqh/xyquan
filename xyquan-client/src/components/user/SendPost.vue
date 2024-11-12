<template>
    <div class="mask" @click="emit('closeSendCard')" :class="{ 'mask-show': sendCardShow }">
        <!-- 创建帖子卡片 -->
        <div class="send-post-card" @click.stop="">
            <!-- 顶部按钮栏 -->
            <header>
                <!-- 返回按钮 -->
                <el-button @click="emit('closeSendCard')" :icon="Back" circle />
                <!-- 发送按钮 -->
                <el-button :loading="isLoding" :icon="Send" circle @click="submitPost" />
            </header>
            <main>
                <!-- 内容文本框 -->
                <div>
                    <el-input style="width: 360px; border: none;" type="textarea" v-model="textareaValue"
                        placeholder="输入内容......" :autosize="{ minRows: 2, maxRows: 6 }" resize="none" />
                </div>
                <!-- 图片上传 -->
                <div class="image-upload">
                    <div v-for="(image, index) in previewImages" :key="index" class="img-container">
                        <el-image :preview-src-list="previewImages" :src="image" :initial-index="index" fit="cover"
                            style="width: 100px; height: 100px; margin: 10px;">
                            <template #error>无法显示图片</template>
                        </el-image>
                        <div class="delete-mask">
                            <el-button @click.stop="deleteImg(index)" :icon="Delete" circle size="small" />
                        </div>
                    </div>
                    <el-button type="plain" @click="handleChooseImages"
                        :class="{ 'hidden-button': selectedImages.length >= maxImages }" :icon="Plus"
                        style="width: 120px; height: 124px; font-size: 20px; border: none; background-color: #edeef1;" />
                </div>
                <!-- 梯子分类 -->
                <div class="classification">
                    <el-radio-group v-model="radio" size="small">
                        <el-radio-button label="日常" value="Daily" />
                        <el-radio-button label="表白墙" value="ConfessionWall" />
                        <el-radio-button label="失物招领" value="LostAndFound" />
                        <!-- 官方专属分类 -->
                        <el-radio-button label="校园新闻" value="SchoolNews"
                            v-if="userStore.userData.userTag[0].type === 'official'" />
                    </el-radio-group>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import Send from '../icons/Send.vue';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user';
import { Back, Plus, Delete } from '@element-plus/icons-vue';
import { uploadImages, createPost } from '@/api/posts';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isLoding = ref(false)
const refreshPage = () => {
    const { fullPath } = route
    router.push('/') // 跳转到一个临时路由
    router.push(fullPath)     // 然后再跳回当前路由
}

const userStore = useUserStore()
const textareaValue = ref('');
const radio = ref('Daily');
const selectedImages = ref([]);
const maxImages = 9;
const previewImages = ref([]);

const props = defineProps({
    sendCardShow: Boolean
});
// 触发关闭创建卡事件
const emit = defineEmits(['closeSendCard']);
// 处理选择图片
const handleChooseImages = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = handleFileChange;
    input.click();
};
// 删除图片
const deleteImg = (index) => {
    selectedImages.value.splice(index, 1);
    previewImages.value.splice(index, 1);
};
// 处理添加成功
const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (selectedImages.value.length + files.length > maxImages) {
        ElMessage.error(`最多只能选择 ${maxImages} 张图片`);
        return;
    }
    files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
            selectedImages.value.push(file);
            previewImages.value.push(reader.result);
        };
        reader.readAsDataURL(file);
    });
};
// 提交表单
const submitPost = async () => {
    isLoding.value = true
    try {
        let imageUrls = [];
        if (selectedImages.value.length > 0) {
            const response = await uploadImages(selectedImages.value);
            imageUrls = response.urls;
        }
        await createPost(radio.value, textareaValue.value, imageUrls);
        ElMessage.success('发帖成功');
        isLoding.value = false
        emit('closeSendCard');
        textareaValue.value = ''
        selectedImages.value = []
        previewImages.value = []
        refreshPage() // 刷新页面
    } catch (error) {
        console.log(error);
        // ElMessage.error('发贴出错');
    }
};
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.mask-show {
    display: flex !important;
}

.mask {
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 20;
    background-color: rgba(#000, 0.2);

    .send-post-card {
        width: 410px;
        padding: 20px 0;
        max-height: 500px;
        overflow-y: auto;
        border-radius: 20px;
        background-color: #fff;
        scrollbar-color: transparent transparent;
        scrollbar-width: 0;

        header {
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            margin-bottom: 20px;
        }

        main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .image-upload {
                display: flex;
                justify-content: start;
                flex-wrap: wrap;
                width: 360px;
                margin-top: 10px;

                .img-container {
                    position: relative;

                    .delete-mask {
                        display: none;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                }

                .img-container:hover {
                    .delete-mask {
                        display: block;
                    }
                }
            }

            .classification {
                margin-top: 10px;
                width: 360px;
            }
        }
    }
}

.hidden-button {
    display: none;
}
</style>
