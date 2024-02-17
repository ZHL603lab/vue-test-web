<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import QuestionSelect from "@/components/views/Room/QuestionSelect.vue";
import QuestionFill from "@/components/views/Room/QuestionFill.vue";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()

import {roomFun, roomVal} from "@/lib/views/RoomLib";
import Question from "@/components/views/Room/Question.vue";

roomFun.init(route.params.id)
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:mx-10">
    <div class="flex order-12 sm:order-1 flex-col sm:basis-2/3 bg-white m-4 shadow-lg relative">

      <div class="my-4">

        <div class="text-3xl mx-4 my-8">
          试卷名：{{ roomVal.paperName }}
        </div>

        <Form @submit="roomFun.handleClickSubmit()">
          <div
              v-for="(question, index) in roomVal.questions"
              :key="index"
              class="mx-4 my-8">
            <Question :index="index"/>
          </div>

          <div class="flex justify-center">
            <Button @click="roomFun.handleClickSubmit()">
              提交
            </Button>
          </div>
        </Form>

      </div>

    </div>
  </div>
</template>
