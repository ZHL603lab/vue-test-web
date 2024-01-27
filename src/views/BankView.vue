<script setup lang="ts">
import { useBankStore } from '@/stores/bank'
import axios from 'axios'
import { computed, ref } from 'vue'
import {
  type Course,
  type CourseRaw,
  type CourseVersionRaw,
  type CourseChapterRaw,
} from '@/types/courses.types'
import {
  type PaperRaw,
} from '@/types/papers.types'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

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

const courses = ref<CourseRaw[]>([]);
const courseVersions = ref<CourseVersionRaw[]>([]);
const courseChapters = ref<CourseChapterRaw[]>([]);
const papers = ref<PaperRaw[]>([]);

const openSelectCourse = ref(false);
const openSelectBook = ref(true);

const selectStage = ref<string>();
const selectStageName = ref<string>();
const selectCourse = ref<string>();
const selectCourseName = ref<string>();
const selectBook = ref<string>();
const selectChapter = ref<string>();

let config = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Authorization': '', // 可选：如果需要验证，请在请求头中添加令牌  
  },
};

function getCourse() {
  axios.post("http://jsjxxw.cn:3009/api/c/getcourse")
    .then(function (res) {
      courses.value = res.data.course;
      selectStage.value = courses.value[0].course_stage;
    })
}

function getCourseVersion() {
  axios.get("http://jsjxxw.cn:3009/api/c/getcourseversion", {
    params: {
      course_stage: selectStage.value,
      course_type: selectCourse.value,
    }, headers: config.headers
  }).then(function (res) {
    courseVersions.value = res.data.course;
  });
}

function getCourseChapter() {
  axios.get("http://jsjxxw.cn:3009/api/c/getcoursechapter", {
    params: {
      course_code: selectBook.value,
    },
    headers: config.headers
  }).then(function (res) {
    courseChapters.value = res.data.course;
  })
}

const items = computed(() => {
  if (selectStage.value && selectCourse.value) {
    return [selectStage.value, selectCourse.value];
  } else {
    return ['a', 'b', 'c'];
  }
})

function getPaper(code: string) {
  console.log(code);

  axios.get("http://jsjxxw.cn:3009/api/p/getpaper", {
    params: {
      course_code: code,
      offset: 0,
      limit: 10,
    }, headers: config.headers
  }).then(function (res) {
    console.log(res.data.course);
    papers.value = res.data.course;
  })
}

getCourse();
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col sm:flex-row">

      <div class="sm:basis-1/5 m-4 shadow-lg flex flex-col">
        <Popover v-model:open="openSelectCourse">
          <PopoverTrigger class="bg-primary text-white py-2 flex flex-row justify-center rounded-t-md font-bold text-lg">
            <div class="flex-1">
              <span v-if="selectStageName && selectCourseName">
                {{ selectStageName }} - {{ selectCourseName }}
              </span>
              <span v-else> 请选择科目 </span>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Tabs :default-value="selectStage">
              <TabsList class="flex">
                <div v-for="stage in courses" :key="stage.course_stage">
                  <TabsTrigger :value="stage.course_stage">
                    {{ stage.dict_label }}
                  </TabsTrigger>
                </div>
              </TabsList>
              <div v-for="stage in courses" :key="stage.course_stage">
                <TabsContent :value="stage.course_stage" class="flex flex-row flex-wrap w-full justify-center">
                  <div v-for="subject in stage.child" :key="subject.course_type" class="m-1">
                    <div @click="
                      openSelectCourse = !openSelectCourse;
                      selectStage = stage.course_stage;
                      selectStageName = stage.dict_label;
                      selectCourse = subject.course_type;
                      selectCourseName = subject.type_name;
                      getCourseVersion();
                    ">
                      <Button v-if="selectCourse == subject.course_type" variant="secondary">
                        {{ subject.type_name }}
                      </Button>
                      <Button v-else variant="accent"> {{ subject.type_name }} </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </PopoverContent>
        </Popover>

        <div class="flex flex-col">
          <div v-if="selectCourse" 
            class=" 
             flex sm:hidden justify-center p-2 w-full
             hover:cursor-pointer
            "
            @click="openSelectBook = !openSelectBook;"
          >
            <span v-if="openSelectBook">折叠</span>
            <span v-else>展开</span>
            选择教材/章节
          </div>

          <Accordion type="single" collapsible class="px-2" v-if="openSelectBook">
            <AccordionItem :value="version.course_version" :key="version.course_version"
              v-for="version in courseVersions">
              <AccordionTrigger>
                <span class="px-4"> {{ version.course_version }} </span>
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible>
                  <AccordionItem :value="book.course_code" v-for="book in version.child" :key="book.course_code"
                    class=" border-none p-1">
                    <AccordionTrigger class=" p-1" @click="
                      courseChapters = [];
                    selectChapter = undefined;
                    selectBook = book.course_code;
                    getCourseChapter();
                    getPaper(book.course_code);
                    ">
                      <span class="pl-4"> {{ book.course_name }} </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table v-show="selectBook == book.course_code">
                        <TableBody>
                          <TableRow class=" hover:cursor-pointer p-1" v-for="chapter in courseChapters"
                            :key="chapter.course_code" @click="
                              selectChapter = chapter.course_code;
                            getPaper(chapter.course_code);
                            ">
                            <TableCell class="py-2 pl-6 text-sm font-light">
                              <span v-if="chapter.course_code == selectChapter" class=" text-primary">
                                {{ chapter.course_name }}
                              </span>
                              <span v-else>
                                {{ chapter.course_name }}
                              </span>
                            </TableCell>

                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>

      </div>

      <div class="flex-1 m-4 flex flex-col space-y-4">

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

          <div>
            <div class="
                flex flex-row border-b-2 border-gray-50 items-center mx-6 py-2
              " v-for="paper in papers" :key="paper.id">
              <div class="w-32 h-32 flex justify-center items-center">
                图片
              </div>
              <div class=" 
                flex flex-1 
                flex-col
                sm:flex-row 
              ">
                <div class="flex-1 flex flex-col space-y-1">
                  <div class="text-md sm:text-xl font-bold">
                    {{ paper.paper_name }}
                  </div>
                  <div class="text-xs font-thin">
                    标签：
                    <span class="bg-gray-100 shadow-sm m-0.5 p-0.5 opacity-80 hover:cursor-pointer"
                      v-for="tag in ['2023', '考试']" :key="tag">{{ tag }}</span>
                  </div>
                  <div class="text-xs font-thin">信息</div>

                </div>

                <div>
                  <RouterLink :to="'/room/' + paper.id">
                    <div
                      class="bg-primary text-white rounded-sm py-1.5 px-8 mx-8 text-sm hover:cursor-pointer flex justify-center items-center hover:opacity-80 duration-300 active:opacity-60">
                      打开
                    </div>
                  </RouterLink>
                </div>

              </div>

            </div>
          </div>

          <div class="flex justify-center items-center m-4 flex-row space-x-2">
            <Pagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="2">
              <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationFirst />
                <PaginationPrev />

                <template v-for="(item, index) in items">
                  <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                    <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                      {{ item.value }}
                    </Button>
                  </PaginationListItem>
                  <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>

                <PaginationNext />
                <PaginationLast />
              </PaginationList>
            </Pagination>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
