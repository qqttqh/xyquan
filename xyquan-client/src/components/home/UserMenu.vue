<template>
  <div class="user-menu-root">
    <component :is="userStore.userData.token ? IsLogin : NotLogin"></component>
  </div>
</template>

<script setup>
import IsLogin from '../login/IsLogin.vue'
import NotLogin from '../login/NotLogin.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()


</script>

<style lang="scss" scoped>
  /*移动端*/
  @media screen and (max-width: 880px) {
    .user-menu-root{
      width: 95%;
    }
  }
  /*平板端*/
  @media screen and (min-width: 880px) and (max-width: 1100px){
    .user-menu-root{
      width: 90%;
    }
  }
  /*PC端*/
  @media screen and (min-width: 1100px) {
    .user-menu-root{
      width: 95%;
    }
  }
</style>
