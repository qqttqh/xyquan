<template>
  <RouterView />
</template>

<script setup>
import sentry from '@/utils/sentry.js'
import {onMounted} from "vue"

onMounted(()=>{
  sentry()
})
</script>

<style lang="scss" scoped></style>
