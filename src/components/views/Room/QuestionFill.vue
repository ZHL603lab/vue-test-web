<script setup lang="ts">
import { Input } from '@/components/ui/input'

import {roomVal} from "@/lib/views/RoomLib";
import type {Question} from "@/types/views/room.types";

const props = defineProps<{
  index: number
}>()

let question : Question = roomVal.questions[props.index];

</script>

<template>
  <div
      v-for="(blank, index) in question.subitems"
      :key="index"
      class="flex flex-col">
    <div class="flex flex-row items-center pl-4 py-1">
      <div>第 {{index + 1}} 空：</div>
      <div class="flex-1">
        <Input
            v-model:model-value="blank.value"
            placeholder="在此处输入答案"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>