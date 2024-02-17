<script setup lang="ts">

import {useBankStore} from "@/stores/bank";

const store = useBankStore()
store.topselect = []
store.sortBy = null
store.sortOrderDec = true
const handleSortBy = (item) => {
  if (store.sortBy == item) {
    store.sortOrderDec = !store.sortOrderDec
  } else {
    store.sortBy = item
  }
}

</script>

<template>
  <div class="shadow-md py-6 px-8 flex flex-col space-y-4">
    <div v-for="item in ['类型', '等级', '年份']" :key="item">
      <div class="text-sm text-gray-400 flex flex-row items-center space-x-2">
        <div>{{ item }} ：</div>
        <div class="flex flex-row space-x-8">
          <div v-for="select in ['a', 'b', 'c', 'd']" :key="select" @click="store.topselect[item] = select">
            <div v-if="store.topselect[item] == select"
                 class="text-white hover:cursor-pointer bg-primary px-4 py-0.5 rounded-sm font-light">
              {{ select }}
            </div>
            <div v-else
                 class="text-black hover:cursor-pointer bg-white px-4 py-0.5 rounded-sm font-light hover:text-primary">
              {{ select }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>