<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import router from './router';

const tlink = router.getRoutes();

console.log(tlink);
</script>

<template>
  <div 
    class=" bg-white flex flex-col min-h-screen" >
    <header 
      class="flex w-full bg-white shadow-md" >
      <div v-for="route in router.getRoutes()" :key="route.path"
        class=" p-2 m-2" >
        <RouterLink :to="route.path">{{ route.name }}</RouterLink>
      </div>
    </header>

    <main 
      class="w-full container mx-auto flex-1" >
      <RouterView />
    </main>
    <footer
      class="" >
    </footer>
  </div>
</template>

<style scoped>
</style>
