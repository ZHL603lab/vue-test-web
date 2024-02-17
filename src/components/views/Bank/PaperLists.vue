<script setup lang="ts">

import {bankVal} from "@/lib/views/BankLib";
</script>

<template>
  <div
      v-for="paper in bankVal.papers"
      :key="paper.id"
      class=" flex flex-row border-b-2 border-gray-50 items-center mx-6 py-2">
    <div class="w-32 h-32 flex justify-center items-center">
      图片
    </div>
    <div class="flex flex-1 flex-col
                sm:flex-row">
      <div class="flex-1 flex flex-col space-y-1">
        <div class="text-md sm:text-xl font-bold">
          {{ paper.paper_name }}
        </div>
        <div class="text-xs font-thin">
          标签：
          <span class="bg-gray-100 shadow-sm m-0.5 p-0.5 opacity-80 hover:cursor-pointer"
                v-for="tag in ['2023', '考试']" :key="tag">{{ tag }}</span>
        </div>
        <div class="text-xs font-thin">信息</div>

      </div>

      <div>
        <RouterLink :to="'/room/' + paper.id">
          <div
              class="bg-primary text-white rounded-sm py-1.5 px-8 mx-8 text-sm hover:cursor-pointer flex justify-center items-center hover:opacity-80 duration-300 active:opacity-60">
            打开
          </div>
        </RouterLink>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>