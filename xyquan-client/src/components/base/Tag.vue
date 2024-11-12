<template>
    <div class="root" :class="{ 'official': official, 'grade': grade }">
        <span>{{ title }}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: String,
    type: String
})

const official = computed(() => {
    return props.type === 'official' ? true : false
})
const grade = computed(() => {
    return props.type === 'grade' ? true : false
})

</script>

<style lang="scss" scoped>
.root {
    padding: 2px 5px;
    color: #fff;
    font-size: 10px;
    border-radius: 6px;
    margin-right: 5px;

    span {
        display: inline-block;
    }
}

// 官方认证标签
.official {
    background-color: #4933FF;
}

// 年级标签
.grade {
    background-color: #E6A23C;
}
</style>