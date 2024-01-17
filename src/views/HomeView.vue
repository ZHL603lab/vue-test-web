<script setup lang="ts"></script>

<template>
  <main>
    <div class="flex flex-col">

      <div class=" flex flex-row w-4/5 mx-auto" id="head_line">
        <div class="my-5">
          <div class="w-40 h-16 bg-black"></div>
        </div>

        <div class="flex-1 flex justify-center items-center">
          <div class="basis-3/4 h-10 border border-green-500 rounded-md items-center"></div>
        </div>

        <div class="flex flex-row items-center">ACTION1</div>
      </div>

      <div class="bg-gray-100">
        <div class="flex flex-row w-4/5 mx-auto" id="main_info">
          <div
            class=" hidden basis-1/5 sm:flex flex-col border border-green-500 rounded-md bg-white"
            id="main_info_left"
          >
            <div class="flex flex-row" id="head_type">
              <div v-for="i in 3" :key="i">
                <div v-if="i == 1" class="bg-white text-green-500 px-6 py-2">
                  {{ i }}
                </div>
                <div v-if="i != 1" class="bg-green-500 text-white px-6 py-2">
                  {{ i }}
                </div>
              </div>
            </div>
            <div class="space-y-2 py-2" id="sub_type">
              <div v-for="i in 10" :key="i">
                <div class="flex flex-row px-6 hover:cursor-pointer">
                  <div>
                    {{ i }}
                  </div>
                  <div class="flex-1"></div>
                  <div class="text-gray-300">></div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col flex-1 bg-gray-100">
            <div class="flex flex-row flex-wrap bg-white">
              <div v-for="i in 10" :key="i">
                <div class="px-4 py-2 hover:cursor-pointer hover:text-green-500">
                  {{ i }}
                </div>
              </div>
            </div>

            <div class="flex flex-row">
              <div class="flex flex-col flex-1" id="main_info_mid">
                <div class="my-2 mx-2">
                  <div class="w-100% h-40 bg-black"></div>
                </div>

                <div class="flex flex-col mx-2 bg-white">
                  <div class="flex flex-row m-2" id="news_title">
                    <div v-for="i in 3" :key="i" class="hover:cursor-pointer">
                      <div
                        v-if="i == 1"
                        class="text-green-500 border-b-2 border-green-500 px-4 py-1"
                      >
                        {{ i }}
                      </div>
                      <div v-if="i != 1" class="px-4 py-1">
                        {{ i }}
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col" id="news_list">
                    <div v-for="i in 3" :key="i" class="flex flex-row px-4 py-1">
                      <div class="basis-1/2">a</div>
                      <div class="basis-1/2">b</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class=" hidden sm:flex bg-white my-2" id="main_info_right">
                ACTION
              </div>
            </div>
          </div>
        </div>

        <div v-for="i in 4" :key="i">
          <div class=" w-4/5 mx-auto pt-4 bg-gray-100">
            <div class="bg-white pt-5">

              <div class=" border-l-4 border-green-500 pl-4 text-xl" id="content_title">
                TITLE
              </div>

              <div class=" flex flex-col sm:hidden mt-2">
                <div v-for="i in 10" :key="i">
                  <div class=" flex items-center pl-4 py-2 active:bg-gray-100 border-t border-gray-50">
                    item
                  </div>
                </div>
            </div>

              <div class=" hidden sm:flex sm:flex-col px-4" id="content_list">
                <div v-for="i in 10" :key="i" class=" flex flex-row">
                  <div class=" basis-1/2">a</div>
                  <div class=" basis-1/2">b</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>
