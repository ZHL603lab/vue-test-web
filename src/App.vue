<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const navRoutes = [
  { path: '/', name: '首页' },
  { path: '/about', name: '关于' },
  { path: '/bank', name: '题库' }
]
</script>

<template>
  <div class="bg-white flex flex-col min-h-screen">
    <header class="flex w-full bg-white shadow-md">
      <div v-for="route in navRoutes" :key="route.path" class="p-2 m-2">
        <RouterLink :to="route.path">{{ route.name }}</RouterLink>
      </div>
    </header>

    <main class="w-full container mx-auto flex-1">
      <RouterView />
    </main>

    <footer class="flex w-full bg-white p-2 justify-center">
      <div class="text-gray-300">@ 综合楼 603 小组开发</div>
    </footer>
  </div>
</template>

<style scoped></style>
