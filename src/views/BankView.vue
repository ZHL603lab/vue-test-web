<script setup lang="ts">
import { bankVal, bankFun } from "@/lib/views/BankLib";
import CourseSelector from "@/components/views/Bank/CourseSelector.vue";
import BookSelector from "@/components/views/Bank/BookSelector.vue";
import PaperLists from "@/components/views/Bank/PaperLists.vue";
import FilterSelector from "@/components/views/Bank/FilterSelector.vue";
import PageSelector from "@/components/views/Bank/PageSelector.vue";

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

bankFun.init();
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col sm:flex-row">
      <div class="sm:basis-1/5 m-4 shadow-lg flex flex-col">

        <CourseSelector />
        <BookSelector />

      </div>

      <div class="flex-1 m-4 flex flex-col space-y-4">

        <FilterSelector />

        <div class="flex-1 flex flex-col shadow-lg">

          <div class="bg-gray-100 flex">
            <div v-for="item in ['发布时间', '热度', '题数', '名称']" :key="item" @click="handleSortBy(item)">
              <div v-if="store.sortBy != item"
                class="shadow-sm border border-gray-200 m-2 text-xs px-2 py-1 flex flex-row space-x-1 hover:border-primary hover:text-primary hover:cursor-pointer">
                <div>{{ item }}</div>
                <div>V</div>
              </div>
              <div v-else
                class="shadow-sm border m-2 text-xs px-2 py-1 flex flex-row space-x-1 bg-primary text-white hover:cursor-pointer">
                <div>{{ item }}</div>
                <div v-if="store.sortOrderDec">V</div>
                <div v-else>A</div>
              </div>
            </div>
          </div>

          <PaperLists />
          <PageSelector />

        </div>
      </div>
    </div>
  </div>
</template>
