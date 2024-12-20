<template>
  <div 
    class="group flex items-center gap-4 p-4 
           bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm
           rounded-lg shadow-sm hover:shadow-md 
           transition-all duration-200 animate-slide-in
           border border-gray-200/50 dark:border-gray-700/50"
  >
    <button 
      @click="todoStore.toggleTodo(todo.id)"
      class="flex-shrink-0 focus:outline-none"
      :disabled="todoStore.loading"
    >
      <div 
        class="w-6 h-6 rounded-full border-2 flex items-center justify-center
               transition-colors duration-200 cursor-pointer"
        :class="[
          todo.completed 
            ? 'border-primary bg-primary' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary'
        ]"
      >
        <CheckIcon 
          v-if="todo.completed" 
          class="w-4 h-4 text-white" 
        />
      </div>
    </button>

    <span 
      class="flex-grow text-lg transition-all duration-200"
      :class="{ 
        'line-through text-gray-400 dark:text-gray-500': todo.completed,
        'text-gray-800 dark:text-gray-200': !todo.completed 
      }"
    >
      {{ todo.text }}
    </span>

    <button 
      @click="todoStore.deleteTodo(todo.id)"
      class="opacity-0 group-hover:opacity-100 transition-opacity duration-200
             text-gray-400 hover:text-red-500 focus:outline-none"
      :disabled="todoStore.loading"
    >
      <TrashIcon class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import { CheckIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()

defineProps({
  todo: {
    type: Object,
    required: true
  }
})
</script> 