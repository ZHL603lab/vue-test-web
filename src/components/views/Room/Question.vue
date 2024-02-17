<script setup lang="ts">
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import QuestionFill from "@/components/views/Room/QuestionFill.vue";
import QuestionSelect from "@/components/views/Room/QuestionSelect.vue";
import {Question} from "@/types/views/room.types";
import {roomVal} from "@/lib/views/RoomLib";

const props = defineProps<{
  index: number
}>()

let question : Question = roomVal.questions[props.index];
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        第 {{ index + 1 }} 题
      </CardTitle>
      <CardDescription>
        题目类型：{{ question.type }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div v-html="question.body"></div>
    </CardContent>
    <CardFooter>
      <QuestionSelect v-if="question.type=='选择题'" :index="index" />
      <QuestionFill v-if="question.type=='填空题'" :index="index" />
    </CardFooter>
  </Card>
</template>

<style scoped>

</style>