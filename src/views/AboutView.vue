<script setup>
</script>

<template>
  <div class=" bg-black text-white flex flex-col">
    <div>标题栏</div>
    <div class=" flex flex-col">
      <div>项目栏</div>
      <div class=" flex flex-row">
        <div class=" flex-1 flex flex-col">
          <div>
            PartA
          </div>
          <div class=" m-10 border border-gray-100 rounded-md bg-gray-800 flex flex-col">
            <div class=" m-2 ">
              Head
            </div>

            <div class=" border-t border-gray-50 border-opacity-40 hover:bg-gray-600 py-1 px-4 hover:cursor-pointer duration-300 flex flex-row"
            v-for="i in [1, 2, 3, 4, 5]" :key="i" >
              <div class=" basis-1/4">
                {{ i }}
              </div>
              <div class=" flex-1 text-gray-400 text-sm">
                描述
              </div>
              <div class=" basis-1/4 text-gray-400 text-sm h-32 flex flex-col justify-center items-center">
                日期
              </div>
            </div>

          </div>
          <div>
            PartC
          </div>
        </div>
        <div class=" basis-1/4">About</div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
