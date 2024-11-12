<template>
    <div class="container-root">
        <div class="container-main">
            <!-- 侧边栏 -->
            <aside>
              <UserMenu></UserMenu>
              <div class="nav-button-container">
                <NavButton  v-for="(item) in navList" :icon="item.icon"
                           :router-name="item.routerName" :key="item.id" :index="item.id" :isClick="item.isClick">
                  {{ item.title }}
                </NavButton>
              </div>
            </aside>
          <!--移动端分类栏-->
            <div class="nav-button-container-mobile">
              <div class="nav-button-container-main">
                <NavButton  v-for="(item) in navList" :icon="item.icon"
                           :router-name="item.routerName" :key="item.id" :index="item.id" :isClick="item.isClick">
                  {{ item.title }}
                </NavButton>
              </div>
            </div>
            <!-- 主体 -->
            <main>
                <RouterView />
            </main>
        </div>
    </div>
</template>
  
<script setup>
import NavButton from '@/components/home/NavButton.vue'
import ConfessionWall from '@/components/icons/ConfessionWall.vue';
import { OfficeBuilding, Star, Location, Sunny } from '@element-plus/icons-vue'
import { reactive } from 'vue';
import UserMenu from '@/components/home/UserMenu.vue';

// 导航列表
const navList = reactive([
    {
        id: 0,
        title: '推荐',
        routerName: 'Recommend',
        icon: Star
    },
    {
        id: 1,
        title: '日常',
        routerName: 'Daily',
        icon: Sunny
    },
    {
        id: 2,
        title: '表白墙',
        routerName: 'ConfessionWall',
        icon: ConfessionWall
    },
    {
        id: 3,
        title: '失物招领',
        routerName: 'LostAndFound',
        icon: Location
    },
    {
        id: 4,
        title: '校园新闻',
        routerName: 'SchoolNews',
        icon: OfficeBuilding
    },
])

</script>

<style lang="scss" scoped>
@import url(../assets/styles/Home.scss);
</style>
