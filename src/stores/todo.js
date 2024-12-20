import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { todoApi } from '../services/api'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  const filter = ref('all')
  const loading = ref(false)
  const error = ref(null)

  // 获取所有待办事项
  const fetchTodos = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await todoApi.getAllTodos()
      todos.value = data.map(todo => ({
        id: todo._id,
        text: todo.value,
        completed: todo.isCompleted,
        createdAt: new Date(todo.createdAt)
      }))
    } catch (err) {
      error.value = '获取待办事项失败'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // 添加新的待办事项
  const addTodo = async (text) => {
    loading.value = true
    error.value = null
    try {
      const newTodo = await todoApi.addTodo(text)
      todos.value.push({
        id: newTodo._id,
        text: newTodo.value,
        completed: newTodo.isCompleted,
        createdAt: new Date(newTodo.createdAt)
      })
    } catch (err) {
      error.value = '添加待办事项失败'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // 切换待办事项状态
  const toggleTodo = async (id) => {
    loading.value = true
    error.value = null
    try {
      const todo = todos.value.find(t => t.id === id)
      if (!todo) return

      const updatedTodo = await todoApi.updateTodo(id, !todo.completed)
      const index = todos.value.findIndex(t => t.id === id)
      if (index !== -1) {
        todos.value[index] = {
          id: updatedTodo._id,
          text: updatedTodo.value,
          completed: updatedTodo.isCompleted,
          createdAt: new Date(updatedTodo.createdAt)
        }
      }
    } catch (err) {
      error.value = '更新待办事项失败'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // 删除待办事项
  const deleteTodo = async (id) => {
    loading.value = true
    error.value = null
    try {
      await todoApi.deleteTodo(id)
      todos.value = todos.value.filter(todo => todo.id !== id)
    } catch (err) {
      error.value = '删除待办事项失败'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // 计算属性保持不变
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })

  const stats = computed(() => {
    const total = todos.value.length
    const completed = todos.value.filter(todo => todo.completed).length
    const active = total - completed
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

    return {
      total,
      completed,
      active,
      percentage
    }
  })

  return {
    todos,
    filter,
    loading,
    error,
    filteredTodos,
    stats,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo
  }
}) 