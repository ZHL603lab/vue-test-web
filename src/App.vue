<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const navRoutes = [
  { path: '/', name: '首页' },
  { path: '/about', name: '关于' },
  { path: '/bank', name: '题库' }
]

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

</script>

<template>
  <div class="bg-white flex flex-col min-h-screen">

    <header>

      <div class=" flex sm:hidden flex-row w-full bg-white shadow-md justify-center items-center px-8">
        <div class=" py-4 px-4">LOGO</div>
        <div class="flex-1" ></div>
        <DropdownMenu>
          <DropdownMenuTrigger class="px-8 py-4 my-4 border border-gray-100 rounded-lg active:bg-gray-100">
            =
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel class=" text-xl">
              导航
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div v-for="route in navRoutes" :key="route.path">
              <RouterLink :to="route.path">
                <DropdownMenuItem class=" text-lg">
                    {{ route.name }}
                </DropdownMenuItem>
              </RouterLink>
            </div>
            <DropdownMenuLabel class=" text-xl">
              用户
            </DropdownMenuLabel>
            <RouterLink to="/user/login">
              <DropdownMenuItem class=" text-lg">
                登录
              </DropdownMenuItem>
            </RouterLink>
            <RouterLink to="/user/signup">
              <DropdownMenuItem class=" text-lg">
                注册
              </DropdownMenuItem>
            </RouterLink>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div class=" hidden sm:flex flex-row w-full bg-white shadow-md items-center px-8 ">
        <div class=" px-4 py-4">LOGO</div>

        <div v-for="route in navRoutes" :key="route.path">
          <div class=" px-4 py-4 hover:bg-gray-100">
            <RouterLink :to="route.path">{{ route.name }}</RouterLink>
          </div>
        </div>

        <div class="flex-1"></div>
        <div v-if="1" class="flex flex-row">
          <div class=" px-4 py-4 hover:bg-gray-100">
            <RouterLink to="/user/login">登录</RouterLink>
          </div>
          <div class=" px-4 py-4 hover:bg-gray-100">
            <RouterLink to="/user/signup">注册</RouterLink>
          </div>
        </div>
        <div v-if="0"></div>
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
