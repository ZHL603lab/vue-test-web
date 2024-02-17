<script setup lang="ts">

import {ref} from "vue";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'

import { bankFun, bankVal } from "@/lib/views/BankLib";

const openSelectBook = ref(true);
</script>

<template>
  <div class="flex flex-col">
    <div v-if="bankVal.selectCourse"
         @click="openSelectBook = !openSelectBook;"
         class=" flex sm:hidden justify-center p-2 w-full
             hover:cursor-pointer">
      <span v-if="openSelectBook">折叠</span>
      <span v-else>展开</span>
      选择教材/章节
    </div>

    <Accordion
        v-if="openSelectBook"
        type="single"
        :default-value="bankVal.bookVersions[0]?.course_version"
        collapsible
        class="px-2">
      <AccordionItem
          v-for="version in bankVal.bookVersions"
          :value="version.course_version"
          :key="version.course_version">
        <AccordionTrigger>
          <span class="px-4"> {{ version.course_version }} </span>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible>
            <AccordionItem
                v-for="book in version.child"
                :value="book.course_code"
                :key="book.course_code"
                class=" border-none p-1">
              <AccordionTrigger
                  @click="bankFun.handleClickBook({book})"
                  class=" p-1">
                <span class="pl-4">
                  {{ book.course_name }}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <Table v-show="bankVal.selectBook == book.course_code">
                  <TableBody>
                    <TableRow
                        v-for="chapter in bankVal.bookChapters"
                        :key="chapter.course_code"
                        @click="bankFun.handleClickChapter({chapter})"
                        class=" hover:cursor-pointer p-1">
                      <TableCell class="py-2 pl-6 text-sm font-light">
                        <span
                            v-if="chapter.course_code == bankVal.selectChapter"
                            class=" text-primary">
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
</template>

<style scoped>

</style>