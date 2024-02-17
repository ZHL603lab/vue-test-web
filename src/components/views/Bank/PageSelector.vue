<script setup lang="ts">

import { Button } from '@/components/ui/button'
import {
  Pagination, PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem,
  PaginationNext, PaginationPrev,
} from '@/components/ui/pagination'

import {bankFun, bankVal} from "@/lib/views/BankLib";
import {computed} from "vue";
</script>

<template>
  <div class="flex justify-center items-center m-4 flex-row space-x-2">
    <Pagination
        v-slot="{ page }"
        :total="bankVal.paperNum"
        :itemsPerPage="bankVal.pageLimit"
        :sibling-count="3"
        show-edges
        v-model:page="bankVal.selectPage"
        class="">
      <PaginationList
          v-slot="{ items }"
          class="flex items-center gap-1">
        <PaginationFirst />
        <PaginationPrev />

        <template v-for="(item, index) in items">
          <PaginationListItem
              v-if="item.type === 'page'"
              as-child
              :key="index"
              :value="item.value"
              @click="bankFun.handleClickPagination()">
            <Button
                :variant="item.value === page ? 'default' : 'outline'"
                class="w-10 h-10 p-0">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis
              v-else
              :key="item.type"
              :index="index" />
        </template>

        <PaginationNext />
        <PaginationLast />
      </PaginationList>
    </Pagination>
  </div>
</template>

<style scoped>

</style>