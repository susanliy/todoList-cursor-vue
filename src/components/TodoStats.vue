<template>
  <div class="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm 
              rounded-lg p-4 shadow-sm mb-6
              border border-gray-200/50 dark:border-gray-700/50">
    <div class="flex justify-between items-center mb-2">
      <span class="text-gray-600 dark:text-gray-400">完成进度</span>
      <span 
        class="text-primary font-semibold"
        :class="{ 'text-green-500': stats.percentage === 100 }"
      >
        {{ stats.percentage }}%
      </span>
    </div>
    <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div 
        class="h-full transition-all duration-500 rounded-full"
        :class="[
          stats.percentage === 100 ? 'bg-green-500' : 'bg-primary'
        ]"
        :style="{ width: `${stats.percentage}%` }"
      ></div>
    </div>
    <div class="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
      <span>总计: {{ stats.total }}</span>
      <span>已完成: {{ stats.completed }}</span>
      <span>未完成: {{ stats.active }}</span>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const { stats } = todoStore
</script> 