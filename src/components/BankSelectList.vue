<script setup>
import { ref } from 'vue'

const { data } = defineProps({
  data: Object
})

const showList = ref(false)
</script>

<template>
  <div class="flex flex-row items-center space-x-2">
    <div
      class="pb-0.5 h-3 w-3 text-xs flex justify-center items-center border-2 border-gray-300 text-gray-300 hover:cursor-pointer"
      v-show="data.list"
      @click="showList = !showList"
    >
      <span v-if="showList">-</span>
      <span v-else>+</span>
    </div>
    <div class="pb-0.5 hover:cursor-pointer hover:text-green-500 hover:underline">
      {{ data.key }}
    </div>
  </div>

  <div class="flex flex-col ml-1 border-l border-gray-300 pl-4" v-if="data.list" v-show="showList">
    <div v-for="item in data.list" :key="item.key">
      <BankSelectList :data="item" />
    </div>
  </div>
</template>
