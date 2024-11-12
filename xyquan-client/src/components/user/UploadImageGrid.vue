<template>
    <!-- 图片 -->
    <div v-for="(image, index) in selectedImages" :key="index" class="img-container">
        <el-image :preview-src-list="selectedImages" :src="image" :initial-index="index" fit="contain"
            style="width: 100px; height: 100px; margin: 10px;">
            <template #error>无法显示图片</template>
        </el-image>
        <div class="mask">
            <el-button @click.stop="deleteImg(index)" :icon="Delete" circle size="small" />
        </div>
    </div>
    <!-- 选着图片按钮 -->
    <el-button type="plain" @click="handleChooseImages" :class="{ 'hidden-button': selectedImages.length >= maxImages }"
        :icon="Plus" style="width: 100px;height: 100px;font-size: 20px;border: none;background-color: #edeef1;" />
</template>
  
<script setup>
import { ref } from 'vue'
import { ElMessage, ElImage } from 'element-plus';
import { Plus, Delete } from '@element-plus/icons-vue'

const selectedImages = ref([]);
const maxImages = 9;
// 创建input来选着图片
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
    selectedImages.value.splice(index, 1)
}
// 将选择的图片存入数组
const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (selectedImages.value.length + files.length > maxImages) {
        ElMessage.error(`最多只能选择 ${maxImages} 张图片`);
        return;
    }
    files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
            selectedImages.value.push(reader.result);
        };
        reader.readAsDataURL(file);
    });
};

</script>
  
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.img-container {
    position: relative;

    .mask {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
    }
}

.img-container:hover {
    .mask {
        display: block;
    }
}

.hidden-button {
    display: none;
}
</style>
  