<template>
  <div class="min-h-screen transition-colors duration-300 
              bg-background-light dark:bg-background-dark 
              bg-tech-pattern-light dark:bg-tech-pattern-dark bg-tech-grid
              relative">
    <div class="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-transparent dark:from-primary-dark/5"></div>
    
    <div class="container mx-auto px-4 py-8 max-w-2xl relative z-10">
      <header class="mb-8 text-center relative">
        <button 
          @click="toggleDark()"
          class="absolute right-0 top-0 p-2 rounded-lg hover:bg-gray-100 
                 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <SunIcon v-if="isDark" class="w-6 h-6 text-yellow-400" />
          <MoonIcon v-else class="w-6 h-6 text-gray-600" />
        </button>
        
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-dark 
                   inline-block text-transparent bg-clip-text">
          Todo List
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          保持专注，完成目标
        </p>

        <div class="mt-4 flex justify-center gap-8 text-sm">
          <span class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <CheckIcon class="w-4 h-4 text-primary" />
            简单高效
          </span>
          <span class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <ArrowPathIcon class="w-4 h-4 text-primary" />
            实时同步
          </span>
          <span class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <SwatchIcon class="w-4 h-4 text-primary" />
            主题切换
          </span>
        </div>
      </header>

      <TodoStats />
      <TodoFilter />
      <TodoInput />
      
      <TransitionGroup
        name="list"
        tag="div"
        class="space-y-2"
      >
        <TodoItem
          v-for="todo in todoStore.filteredTodos"
          :key="todo.id"
          :todo="todo"
        />
      </TransitionGroup>
      
      <div v-if="todoStore.loading" class="text-center py-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
      
      <div v-if="todoStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        {{ todoStore.error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { 
  SunIcon, 
  MoonIcon,
  CheckIcon,
  ArrowPathIcon,
  SwatchIcon
} from '@heroicons/vue/24/outline'
import { useTodoStore } from './stores/todo'
import TodoInput from './components/TodoInput.vue'
import TodoItem from './components/TodoItem.vue'
import TodoFilter from './components/TodoFilter.vue'
import TodoStats from './components/TodoStats.vue'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'theme',
  storage: localStorage,
})
const toggleDark = useToggle(isDark)
const todoStore = useTodoStore()

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
