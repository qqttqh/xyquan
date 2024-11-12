<template>
    <el-button color="#4933ff" size="small" @click="click" class="nav-button" :class="{ 'highlight': route.name === routerName }" plain>
        <slot></slot>
    </el-button>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
const props = defineProps({
    isClick: Boolean,
    index: Number,
    routerName: String
})
const emit = defineEmits(['navBtnClick'])

const navButtonRef = ref(null)

function click() {
    router.push({ name: props.routerName })
}

</script>

<style lang="scss" scoped>
// 非移动端
@media screen and (min-width: 880px) {
  .nav-button {
    justify-content: left;
    width: 75%;
    height: 50px;
    border-radius: 15px;
    border: none;
    font-size: 18px;
    // font-weight: 500;
    margin: 8px 0;
    color: #000;
    box-shadow: 0 4px 8px rgba(175, 175, 175, 0.1),
    0 6px 20px rgba(175, 175, 175, 0.1);
  }

  .nav-button:hover {
    color: #fff;
  }

  .highlight {
    background-color: #4933ff;
    color: #fff;
  }
}
// 移动端
@media screen and (max-width: 880px) {
  .nav-button {
    flex-grow: 0;
    border-radius: 20px;
    border: none;
    font-size: 12px;
    color: #000;
  }

  .nav-button:hover {
    color: #fff;
  }

  .highlight {
    background-color: #4933ff;
    color: #fff;
  }
}

</style>
