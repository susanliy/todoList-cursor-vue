<template>
  <div class="flex justify-center gap-2 mb-6">
    <button
      v-for="option in filterOptions"
      :key="option.value"
      @click="todoStore.filter = option.value"
      class="px-4 py-2 rounded-lg transition-all duration-200"
      :class="[
        todoStore.filter === option.value
          ? 'bg-primary text-white'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      ]"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()

const filterOptions = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'active' },
  { label: '已完成', value: 'completed' }
]
</script> 