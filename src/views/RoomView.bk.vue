<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from "vue-router";

import RoomQuestionButton from '@/components/RoomQuestionButton.vue'
import {type QuestionRaw, type Question, type QuestionOption} from '@/types/views/room.types'
import { type UserAnswer, type Answer } from '@/types/answers.types'
import {mathjax} from "@/lib/mathjax";
import {adapter} from "@/lib/adapter";
import {roomFun, roomVal} from "@/lib/views/RoomLib";

const router = useRouter()
const route = useRoute()

roomFun.init(route.params.id)

const questionIndex = ref(0)
const questionType = computed(() => {
  if (questionIndex.value === null) return '出现错误'
  if (roomVal.questions[questionIndex.value] == undefined) return '出现错误'
  let type = roomVal.questions[questionIndex.value].type
  if (type == '1') return '选择题'
  if (type == '16') return '填空题'
  return '暂不支持的题型'
})

const usedTime = ref(0)
const usedTimeText = computed(() => {
  const usedSeco = usedTime.value % 60
  const usedMinu = Math.floor(usedTime.value / 60) % 60
  const usedHour = Math.floor(usedTime.value / 3600)
  return usedHour + ' 时 ' + usedMinu + ' 分 ' + usedSeco + ' 秒'
})

let userSelects = ref(new Array(roomVal.questions.length))
let answers: Answer[] = []

let windowUserSelectsConfirm = ref(false)
let windowUserSelectsSubmit = ref(false)
let windowPauseTime = ref(false)

let triggerShowAnswer = ref(false)
let triggerPauseTime = ref(false)
let triggerSubmitSelects = ref(false)

let usedTimeInterval = setInterval(() => {
  usedTime.value = usedTime.value + 1
}, 1000)

function switchPauseTime({ state }: { state?: boolean }) {
  if (state === undefined) {
    if (triggerPauseTime.value) return switchPauseTime({ state: false })
    else return switchPauseTime({ state: true })
  }

  if (state === true) {
    clearInterval(usedTimeInterval)
    triggerPauseTime.value = true
    windowPauseTime.value = true
  } else {
    usedTimeInterval = setInterval(() => {
      usedTime.value = usedTime.value + 1
    }, 1000)
    triggerPauseTime.value = false
    windowPauseTime.value = false
  }
}

function classQuestionStateItem(i: number) {
  let basic =
    'border border-gray-80 h-8 w-8 flex justify-center items-center m-2 hover:cursor-pointer duration-300 '

  if (!triggerShowAnswer.value) {
    if (i == questionIndex.value) return basic + 'text-white bg-blue-400'
    if (!userSelects.value || !userSelects.value[i] || userSelects.value[i] == '')
      return basic + 'hover:bg-gray-100'
    else return basic + 'bg-blue-200 opacity-40 hover:bg-blue-400'
  } else {
    if (i == questionIndex.value) {
      if (answers[i].correct) return basic + 'text-white bg-green-600'
      else return basic + 'text-white bg-red-600'
    } else {
      if (answers[i].correct) return basic + 'bg-green-200 opacity-40 hover:bg-green-500'
      else return basic + 'bg-red-200 opacity-40 hover:bg-red-400'
    }
  }
}

function classSelectId(id: string) {
  const basic = 'h-8 w-8 border ml-4 mr-2 rounded-full flex justify-center items-center '
  if (!triggerShowAnswer.value) {
    if (!userSelects.value[questionIndex.value] || userSelects.value[questionIndex.value] != id)
      return basic + 'text-blue-500'
    else return basic + 'bg-blue-500 text-white'
  } else {
    if (answers[questionIndex.value].answer == id) return basic + 'bg-green-600 text-white'
    if (userSelects.value[questionIndex.value] == id) return basic + 'bg-red-500 text-white'
    return basic + 'text-blue-500'
  }
}

function handleUserSelects({ type, id }: { type: string; id?: string }) {
  if (type == 'select') {
    if (triggerShowAnswer.value == true) return
    if (triggerPauseTime.value == true) return
    userSelects.value[questionIndex.value] = id
  }
  if (type == 'confirm') {
    windowUserSelectsConfirm.value = true
  }
  if (type == 'submit') {
    windowUserSelectsConfirm.value = false
    windowUserSelectsSubmit.value = true
    triggerSubmitSelects.value = true
    clearInterval(usedTimeInterval)

    let userAnswers: UserAnswer[] = new Array(userSelects.value.length)
    for (let i = 0; i < userSelects.value.length; ++i) {
      userAnswers[i] = {
        uuid: roomVal.questions[i].uuid,
        answer: userSelects.value[i]
      }
    }

    setTimeout(() => {
      answers = dataAnswer

      triggerShowAnswer.value = true
      windowUserSelectsSubmit.value = false
    }, 2000)
  }
}
function handleQuestionId({ type, id }: { type: string; id: number }) {
  if (type == 'step') {
    const newId = questionIndex.value + id
    handleQuestionId({ type: 'set', id: newId })
  }
  if (type == 'set') {
    if (id < 0) return
    if (id >= roomVal.questions.length) return
    questionIndex.value = id
  }
}

</script>

<template>
  <div class="flex flex-col sm:flex-row sm:mx-10">
    <div class="flex order-12 sm:order-1 flex-col sm:basis-2/3 bg-white m-4 shadow-lg relative">
      <div class="flex flex-1 flex-col border-b">
        <div class="border-gray-100 border-b py-5 px-4">
          <span class="text-xl font-bold"> 测试标题 </span>
        </div>

        <div class="flex flex-1 border-gray-100 border m-4 flex-col">
          <div class="bg-gray-50 p-4">
            <span class="text-red-500 font-bold" id="questionInfo">
              {{ questionIndex }} [{{ questionType }}]
            </span>
            <!--
            <span class="font-thin" id="questionBody">
              {{ roomVal.questions[questionIndex]?.body }}
            </span>
            -->

            <span class="font-thin" id="questionBody" v-html="roomVal.questions[questionIndex]?.body"></span>

          </div>

          <div class="flex flex-col my-4">
            <div
              class="flex flex-row items-center p-2 hover:bg-gray-100 transition ease-in-out duration-500 hover:cursor-pointer"
              v-for="select in roomVal.questions[questionIndex]?.selects"
              :key="questionIndex + select.id"
              @click="handleUserSelects({ type: 'select', id: select.id })">
              <div :class="classSelectId(select.id)">
                {{ select.id }}
              </div>
              <div v-html="select.text"></div>
            </div>
          </div>

        </div>

        <div class="flex flex-1 flex-col py-4 px-8 bg-gray-50" v-if="triggerShowAnswer">
          <div>
            选择答案：<span>{{ userSelects[questionIndex] }}</span>
          </div>
          <div>
            正确答案：<span>{{ answers[questionIndex]?.answer }}</span>
          </div>
          <div>
            题目解析：<span>{{ answers[questionIndex]?.explain }}</span>
          </div>
        </div>
      </div>

      <div class="flex justify-center space-x-8">
        <RoomQuestionButton
            value="上一题" v-show="questionIndex > 0"
            @click="handleQuestionId({ type: 'step', id: -1 }); mathjax.render();"
        />
        <RoomQuestionButton
            value="下一题"
            v-show="questionIndex < roomVal.questions.length - 1"
            @click="handleQuestionId({ type: 'step', id: 1 }); mathjax.render();"
        />
        <RoomQuestionButton value="提交" v-show="questionIndex == roomVal.questions.length - 1 && !triggerShowAnswer"
          @click="handleUserSelects({ type: 'confirm' })" />
        <RoomQuestionButton value="清除" v-show="userSelects[questionIndex] && !triggerShowAnswer"
          @click="userSelects[questionIndex] = null" />
      </div>

      <div class="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-gray-300 opacity-80"
        v-show="windowUserSelectsConfirm || windowUserSelectsSubmit || windowPauseTime">
        <!-- 提交确认框 -->
        <div class="flex w-1/3 bg-white shadow-lg flex-col rounded-xl" v-show="windowUserSelectsConfirm">
          <div class="py-2 px-4 w-full bg-gray-100 font-bold text-xl rounded-t-xl">提醒</div>
          <div class="flex-1 p-4 flex flex-col justify-center">
            <div>确定要提交吗？</div>
          </div>
          <div class="flex flex-col sm:flex-row items-center border-t border-gray-300">
            <div
              class="flex-1 flex justify-center py-2 hover:cursor-pointer hover:bg-gray-100 duration-300 active:bg-gray-300"
              @click="handleUserSelects({ type: 'submit' })">
              确定
            </div>
            <div class="border-l border-gray-300 h-1/2"></div>
            <div
              class="flex-1 flex justify-center py-2 hover:cursor-pointer hover:bg-gray-100 duration-300 active:bg-gray-300"
              @click="windowUserSelectsConfirm = false">
              取消
            </div>
          </div>
        </div>

        <!-- 提交加载框 -->
        <div class="flex bg-white flex-col p-5 space-y-4 rounded-lg justify-center items-center"
          v-show="windowUserSelectsSubmit">
          <div class="flex flex-row items-center space-x-2 justify-center">
            <div class="h-4 w-4 animate-spin bg-purple-600"></div>
            <div>请耐心等待，结果正在飞速加载中...</div>
          </div>
          <div class="flex space-x-2 flex-row">
            <div class="p-2 w-4 h-4 rounded-full animate-bounce bg-red-600" style="animation-delay: 0s"></div>
            <div class="p-2 w-4 h-4 rounded-full animate-bounce delay-75 bg-yellow-500" style="animation-delay: 0.1s">
            </div>
            <div class="p-2 w-4 h-4 rounded-full animate-bounce delay-150 bg-green-600" style="animation-delay: 0.2s">
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4" v-show="windowPauseTime">暂停中...</div>
      </div>
    </div>

    <div class="order-1 sm:order-12 flex-1 bg-white m-4 flex-col">
      <div class="shadow-lg mb-10">
        <div class="flex flex-row p-2 bg-blue-400 text-white">
          <div class="flex flex-col flex-1 justify-center items-center">
            <div class="font-bold text-xl">用时</div>
            <div>{{ usedTimeText }}</div>
          </div>
          <div v-show="!triggerSubmitSelects" class="border border-dashed border-gray-50"></div>

          <div v-show="!triggerSubmitSelects"
            class="my-2 md:my-0 md:mx-2 basis-1/4 flex flex-col items-center hover:cursor-pointer"
            @click="switchPauseTime({ state: undefined })">
            <div
              class="flex justify-center items-center border-2 border-white rounded-full w-8 h-8 hover:text-blue-400 hover:bg-white transition ease-in-out duration-500">
              <span v-if="triggerPauseTime">C</span>
              <span v-else>P</span>
            </div>
            <div class="mt-2">
              <span v-if="triggerPauseTime">继续</span>
              <span v-else>暂停</span>
            </div>
          </div>
        </div>

        <div class="flex justify-center w-full">
          <RoomQuestionButton class="w-3/4" value="切换多题模式" />
        </div>
      </div>

      <div class="flex flex-col shadow-lg">
        <div class="flex justify-center text-xl p-2 bg-gray-50">答题卡</div>
        <div class="flex flex-wrap content-between max-h-80 overflow-scroll px-2 justify-center">
          <template v-for="(item, i) in roomVal.questions" :key="i">
            <div :class="classQuestionStateItem(i)" @click="handleQuestionId({ type: 'set', id: i })">
              {{ i }}
            </div>
          </template>
        </div>
        <div>
          <div v-show="!triggerShowAnswer" class="flex flex-row justify-center space-x-4 my-4">
            <div class="flex flex-row justify-center items-center">
              <div class="w-4 h-4 bg-gray-50 opacity-40 border border-gray-600 mx-2"></div>
              <div>未答</div>
            </div>

            <div class="flex flex-row justify-center items-center">
              <div class="w-4 h-4 bg-blue-200 opacity-40 border border-blue-600 mx-2"></div>
              <div>已答</div>
            </div>
          </div>

          <div v-show="triggerShowAnswer" class="flex flex-row justify-center space-x-4 my-4">
            <div class="flex flex-row justify-center items-center">
              <div class="w-4 h-4 bg-green-200 opacity-40 border border-green-600 mx-2"></div>
              <div>正确</div>
            </div>

            <div class="flex flex-row justify-center items-center">
              <div class="w-4 h-4 bg-red-200 opacity-40 border border-red-600 mx-2"></div>
              <div>错误</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
