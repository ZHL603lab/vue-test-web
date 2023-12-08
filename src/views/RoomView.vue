<script setup lang="ts">
import { computed, ref } from 'vue';
import RoomQuestionButton from '@/components/RoomQuestionButton.vue'
import { Question } from '@/types/questions.types'
import { UserAnswer } from "@/types/answers.types";

const { testName, questions } : {
  testName: string,
  questions: Question[],
} = {
  testName: "计算机系统",
  questions: 
  [
    {
        "uuid": "100",
        "subjectId": "001",
        "chapterId": "DL",
        "body": "SQL中DELETE的作用是（　　）。\n",
        "type": "1",
        "selects": [
            {
                "id": "A",
                "text": " 插入记录\n"
            },
            {
                "id": "B",
                "text": " 删除记录\n"
            },
            {
                "id": "C",
                "text": " 查找记录\n"
            },
            {
                "id": "D",
                "text": " 更新记录"
            }
        ],
        "sort": 1,
        "state": "0"
    },
    {
        "uuid": "101",
        "subjectId": "001",
        "chapterId": "DL",
        "body": "数据管理技术随着计算机技术的发展而发展。数据库阶段具有很多特点，但下面列出的特点中哪一个不是数据库阶段的特点？（   ）\n",
        "type": "1",
        "selects": [
            {
                "id": "A",
                "text": " 无数据冗余     \n"
            },
            {
                "id": "B",
                "text": " 采用复杂的数据结构\n"
            },
            {
                "id": "C",
                "text": " 数据共享       \n"
            },
            {
                "id": "D",
                "text": " 数据具有较高的独立性"
            }
        ],
        "sort": 2,
        "state": "0"
    },
    {
        "uuid": "102",
        "subjectId": "001",
        "chapterId": "DL",
        "body": "数据库管理系统DBMS是（   ）。\n　",
        "type": "1",
        "selects": [
            {
                "id": "A",
                "text": " 一组硬件               \n　"
            },
            {
                "id": "B",
                "text": " 一组软件\n　"
            },
            {
                "id": "C",
                "text": " 既有硬件，也有软件     \n　"
            },
            {
                "id": "D",
                "text": " 一个完整的数据库应用系统"
            }
        ],
        "sort": 3,
        "state": "0"
    }
]
}

let userSelects = ref(new Array(questions.length));

function handleUserSelects({type}: {type: string}) {
  if (type == "submit") {
    let userAnswers: UserAnswer[] = new Array(userSelects.value.length);
    for (let i = 0; i < userSelects.value.length; ++i) {
      userAnswers[i] = {
        uuid: questions[i].uuid,
        answer: userSelects.value[i],
      };
    }
    console.log(userAnswers);
  }
}

const questionIndex = ref(0);
const questionType = computed(() => {
  if (questionIndex.value === null) return "出现错误";
  let type = questions[questionIndex.value].type;
  if (type == "1") return "选择题";
  if (type == "16") return "填空题";
  return "暂不支持的题型";
});

function handleQuestionId({type, id}: {type: string, id: number}) {
  if (type == "step") {
    const newId = questionIndex.value + id;
    handleQuestionId({type: "set", id: newId});
  }
  if (type == "set") {
    if (id < 0) return ;
    if (id >= questions.length) return ;
    questionIndex.value = id;
  }
}

const usedTime = ref(0);

setInterval(() => {
  usedTime.value = usedTime.value + 1;
}, 1000);

const usedTimeText = computed(() => {
  const usedSeco = usedTime.value % 60;
  const usedMinu = Math.floor(usedTime.value / 60) % 60;
  const usedHour = Math.floor(usedTime.value / 3600);
  return usedHour +  " 时 " + usedMinu + " 分 " + usedSeco + " 秒";
})

</script>

<template>
  <div class=" flex flex-row mx-10">

    <div class=" flex flex-col basis-2/3 bg-white m-4 shadow-md" >

      <div class=" flex flex-1 flex-col border-b">
        <div class=" border-gray-100 border-b py-5 px-4">
          <span class=" text-xl font-bold"> {{ testName }} </span>
        </div>
        <div class=" flex flex-1 border-gray-100 border m-4 flex-col" >
          <div class=" bg-gray-50 p-4">
            <span class=" text-red-500 font-bold"
            id="questionInfo">
              {{ questionIndex }} [{{ questionType }}] 
            </span>
            <span class=" font-thin"
            id="questionBody">
              {{ questions[questionIndex].body }}
            </span>
          </div>
          <div class=" flex flex-col my-4">

            <div class=" flex flex-row items-center p-2 hover:bg-gray-100 transition ease-in-out duration-500 hover:cursor-pointer"
                 v-for="select in questions[questionIndex].selects" :key="questionIndex +  select.id"
                 @click="userSelects[questionIndex] = select.id;">

              <div class=" h-8 w-8 border border-blue-500 text-blue-500 ml-4 mr-2 rounded-full flex justify-center items-center"
                   v-if="!userSelects[questionIndex] || userSelects[questionIndex] != select.id">
                {{ select.id }}
              </div>

              <div class=" h-8 w-8 border border-blue-500 bg-blue-500 text-white ml-4 mr-2 rounded-full flex justify-center items-center"
                   v-else>
                {{ select.id }}
              </div>

              <div>{{ select.text }}</div>
            </div>

          </div>
        </div>
      </div>
      
      <div class=" flex justify-center space-x-8">
        <RoomQuestionButton value="上一题"
                            v-if="questionIndex > 0" @click="handleQuestionId({type: 'step', id: -1})"/>
        <RoomQuestionButton value="下一题"
                            v-if="questionIndex < questions.length - 1" @click="handleQuestionId({type: 'step', id: 1})"/>
        <RoomQuestionButton value="清除"
                            v-if="userSelects[questionIndex]" @click="userSelects[questionIndex] = null;"/>
        <RoomQuestionButton value="提交"
                            v-if="questionIndex == questions.length - 1"
                            @click="handleUserSelects({type: 'submit'})"/>
      </div>

    </div>

    <div class=" flex-1 bg-white m-4 flex-col" >
      <div class=" shadow-lg mb-10">
        <div class=" flex flex-col md:flex-row p-4 bg-blue-400 text-white">
          <div class=" flex flex-col flex-1 mb-4 md:mb-0 justify-center items-center">
            <div class="font-bold text-xl">用时</div>
            <div>{{ usedTimeText }}</div>
          </div>
          <div class=" border border-dashed border-gray-50">
          </div>
          <div class=" md:mt-0 md:ml-4 mt-4 basis-1/4 flex flex-col items-center hover:cursor-pointer">
            <div class=" flex justify-center items-center border-2 border-white rounded-full w-8 h-8 hover:text-blue-400 hover:bg-white transition ease-in-out duration-500">
              P
            </div>
            <div class=" mt-2">
            暂停
            </div>
          </div>
        </div>

        <div class=" flex justify-center w-full">
          <RoomQuestionButton class=" w-3/4"
          value="切换多题模式" />
        </div>
      </div>

      <div class=" flex flex-col shadow-lg">
        <div class=" p-4 bg-gray-50">答题卡</div>
        <div class=" flex flex-wrap content-between max-h-80 overflow-scroll px-2 justify-center">
          <template v-for="(item, i) in questions" :key="i">

            <div class=" border border-gray-80 h-8 w-8 flex justify-center items-center m-2 text-white bg-blue-400" 
              v-if="i == questionIndex" @click="handleQuestionId({type: 'set', id: i })" >
              {{ i }}
            </div>

            <div class=" border border-gray-80 h-8 w-8 flex justify-center items-center m-2 hover:cursor-pointer bg-green-200 opacity-40"
            v-else-if="userSelects[i] && userSelects[i] != ''" @click="handleQuestionId({type: 'set', id: i })">
              {{ i }}
            </div>

            <div class=" border border-gray-80 h-8 w-8 flex justify-center items-center m-2 hover:cursor-pointer"
              v-else @click="questionIndex = i" >
              {{ i }}
            </div>

          </template>
        </div>
        <div class=" flex flex-row justify-center space-x-4 my-4">
          <div class=" flex flex-row justify-center items-center">
            <div class=" w-4 h-4 bg-gray-50 opacity-40 border border-gray-600 mx-2"></div>
            <div>未答</div>
          </div>

          <div class=" flex flex-row justify-center items-center">
            <div class=" w-4 h-4 bg-green-200 opacity-40 border border-green-600 mx-2"></div>
            <div>已答</div>
          </div>
        </div>
      </div>
      
    </div>

  </div>
</template>