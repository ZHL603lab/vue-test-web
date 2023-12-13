<script setup>
import BankSelectList from "@/components/BankSelectList.vue"

const items = [ "a", "b", "c" ]

const data = {
  key: "body",
  list: [
    {
      key: "a",
      list: [
        {
          key: "1",
          list: null,
        },
        {
          key: "2",
          list: null
        }
      ]
    },
    {
      key: "b",
      list: [
        {
          key: "1",
          list: null
        },
        {
          key: "2",
          list: null
        }
      ]
    },
    {
      key: "c",
      list: [
        {
          key: "1",
          list: null
        },
        {
          key: "2",
          list: null
        }
      ]
    }
  ]
}
</script>

<template>
  <div class=" flex flex-row">
    <div class=" basis-1/5 m-4 shadow-lg flex flex-col">
      <div class=" bg-green-500 text-white py-2 flex flex-row justify-center pl-4 rounded-t-md">
        <div class=" flex-1">
          计算机
        </div>
        <div class=" basis-1/5 hover:cursor-pointer flex justify-center">
          a
        </div>
      </div>

      <div class=" flex flex-col m-3">
        <BankSelectList :data="data"  />
      </div>
    </div>

    <div class=" flex-1 m-4 flex flex-col space-y-4">

      <div class=" shadow-md py-6 px-8 flex flex-col space-y-4">
        <div v-for="item in ['类型', '等级', '年份']" :key="item">
          <div class=" text-sm text-gray-400 flex flex-row items-center space-x-2"> 
            <div>
              {{ item }} ： 
            </div>
            <div class=" flex flex-row space-x-8">
              
              <div v-for="select in ['a']" :key="select">
                <div class=" text-white hover:cursor-pointer bg-green-500 px-4 py-0.5 rounded-sm font-light"> 
                  {{ select }}
                </div>
              </div>

              <div v-for="select in ['b', 'c', 'd']" :key="select">
                <div class=" text-black hover:cursor-pointer bg-white px-4 py-0.5 rounded-sm font-light hover:text-green-500"> 
                  {{ select }}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div class=" flex-1 flex flex-col shadow-lg">
        <div class=" bg-gray-100 flex">

          <div class=" shadow-sm border border-gray-200 m-2 text-xs px-2 py-1 flex flex-row space-x-1 
          hover:border-red-500 hover:text-red-500 hover:cursor-pointer "> 
            <div> 发布时间 </div>
            <div> U </div>
          </div>

          <div class=" shadow-sm border border-gray-200 m-2 text-xs px-2 py-1 flex flex-row space-x-1 
          hover:border-red-500 hover:text-red-500 hover:cursor-pointer"> 
            <div> 热度 </div>
            <div> U </div>
          </div>

          <div class=" shadow-sm border border-gray-200 m-2 text-xs px-2 py-1 flex flex-row space-x-1 
          hover:border-red-500 hover:text-red-500 hover:cursor-pointer"> 
            <div> 题数 </div>
            <div> U </div>
          </div>

          <div class=" shadow-sm border border-gray-200 m-2 text-xs px-2 py-1 flex flex-row space-x-1 
          hover:border-red-500 hover:text-red-500 hover:cursor-pointer"> 
            <div> 名称  </div>
            <div> U </div>
          </div>

        </div>
        <div>
          <div class=" flex flex-row border-b-2 border-gray-50 items-center mx-6" v-for="item in items" :key="item">
            <div class=" w-32 h-32 flex justify-center items-center">
              图片
            </div>
            <div class=" flex-1 flex flex-col space-y-1">
              <div class=" text-xl font-bold">
                标题 {{ item }}
              </div>
              <div class=" text-xs font-thin">
                标签：
                <span class=" bg-gray-100 shadow-sm m-0.5 p-0.5 opacity-80 hover:cursor-pointer"
                v-for="tag in ['2023', '考试']" :key="tag">{{ tag }}</span>
              </div>
              <div class=" text-xs font-thin">
                信息
              </div>
            </div>
            <div>
              <RouterLink to="/room"> 
                <div class=" bg-green-500 text-white rounded-sm py-1.5 px-8 mx-8 text-sm hover:cursor-pointer flex justify-center items-center hover:bg-green-600 duration-300 active:bg-green-700"> 
                    打开
                </div>
              </RouterLink>
            </div>
          </div>
        </div>

        <div class=" flex justify-center items-center m-4 flex-row space-x-2">
          <div class=" hover:cursor-pointer shadow-md w-8 h-8 flex justify-center items-center">
            &lt; 
          </div>
          <div class=" shadow-md h-8 flex justify-center items-center p-2">
          第 <span class=" mx-1">1</span> 页
          </div>
          <div class=" hover:cursor-pointer shadow-md w-8 h-8 flex justify-center items-center">
            &gt;
          </div>
        </div>

      </div>
    </div>
  </div>
</template>