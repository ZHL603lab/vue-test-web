<script setup>

const { value } = defineProps({
  value: {
    type: String,
    required: false,
    default: "按键",
  }
})

</script>

<template>
  <button class=" hover:cursor-pointer px-4 py-1 my-4 border border-gray-200 shadow-md rounded-lg hover:bg-gray-200 transition ease-in-out duration-500 active:bg-gray-300">
    {{ value }}
  </button>
</template>