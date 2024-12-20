<template>
  <div class="mb-6">
    <form @submit.prevent="handleSubmit" class="flex gap-2">
      <input
        v-model="newTodo"
        type="text"
        placeholder="添加新的待办事项..."
        class="todo-input"
        :class="{ 'animate-shake': showError }"
      />
      <button 
        type="submit" 
        class="w-12 h-12 flex items-center justify-center rounded-full
               bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary 
               text-white transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        <PlusIcon class="w-6 h-6" />
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const newTodo = ref('')
const showError = ref(false)

const handleSubmit = () => {
  if (!newTodo.value.trim()) {
    showError.value = true
    setTimeout(() => {
      showError.value = false
    }, 500)
    return
  }
  
  todoStore.addTodo(newTodo.value.trim())
  newTodo.value = ''
}
</script> 