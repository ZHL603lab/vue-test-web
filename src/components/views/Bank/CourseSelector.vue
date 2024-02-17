<script setup lang="ts">

import {ref} from "vue";

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger, } from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs'
import { bankFun, bankVal } from "@/lib/views/BankLib";

const openSelectCourse = ref(false);
</script>

<template>
  <Popover v-model:open="openSelectCourse">
    <PopoverTrigger class="bg-primary text-white py-2 flex flex-row justify-center rounded-t-md font-bold text-lg">
      <div class="flex-1">
        <span v-if="bankVal.selectStageName && bankVal.selectCourseName">
          {{ bankVal.selectStageName }} - {{ bankVal.selectCourseName }}
        </span>
        <span v-else> 请选择科目 </span>
      </div>
    </PopoverTrigger>
    <PopoverContent>
      <Tabs :default-value="bankVal.selectStage">
        <TabsList class="flex">
          <div v-for="stage in bankVal.stages"
               :key="stage.course_stage">
            <TabsTrigger :value="stage.course_stage">
              {{ stage.dict_label }}
            </TabsTrigger>
          </div>
        </TabsList>
        <div v-for="stage in bankVal.stages" :key="stage.course_stage">
          <TabsContent
              :value="stage.course_stage"
              class="flex flex-row flex-wrap w-full justify-center">
            <div
                v-for="course in stage.child"
                :key="course.course_type"
                class="m-1">
              <div @click="
                      bankFun.handleClickStage({stage, course});
                      openSelectCourse = !openSelectCourse;
                    ">
                <Button
                    v-if="bankVal.selectCourse == course.course_type"
                    variant="secondary">
                  {{ course.type_name }}
                </Button>
                <Button v-else variant="accent">
                  {{ course.type_name }}
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </PopoverContent>
  </Popover>
</template>

<style scoped>

</style>