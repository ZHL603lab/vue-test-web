<script setup lang="ts">

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import type {Question} from "@/types/views/room.types";
import {roomVal} from "@/lib/views/RoomLib";
import {computed, ref} from "vue";

const props = defineProps<{
  index: number
}>()

let question : Question = roomVal.questions[props.index];
</script>

<template>
  <RadioGroup v-model:model-value="question.selectOptionId">
    <div
        v-for="option in question.subitems"
        :key="option.id"
        class="flex items-center space-x-2">
      <RadioGroupItem
          :id="option.id"
          :value="option.id" />
      <Label :for="option.id">
        <div class="flex flex-row items-center space-x-2 hover:cursor-pointer">
          <div v-html="option.text"></div>
        </div>
      </Label>
    </div>
  </RadioGroup>
</template>

<style scoped>

</style>