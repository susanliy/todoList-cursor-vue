import axios from 'axios'

const baseURL = 'https://frwhxkeyueyd.sealoshzh.site'

const api = axios.create({
  baseURL,
  timeout: 10000,
})

export const todoApi = {
  // 获取所有待办事项
  getAllTodos: async () => {
    try {
      const response = await api.get('/api/get-todo')
      return response.data
    } catch (error) {
      console.error('获取待办事项失败:', error)
      throw error
    }
  },

  // 添加新的待办事项
  addTodo: async (value) => {
    try {
      const response = await api.post('/api/add-todo', {
        value,
        isCompleted: false
      })
      return response.data
    } catch (error) {
      console.error('添加待办事项失败:', error)
      throw error
    }
  },

  // 更新待办事项状态
  updateTodo: async (id, isCompleted) => {
    try {
      const response = await api.post(`/api/update-todo/${id}`, {
        isCompleted: isCompleted
      })
      return response.data
    } catch (error) {
      console.error('更新待办事项失败:', error)
      throw error
    }
  },

  // 删除待办事项
  deleteTodo: async (id) => {
    try {
      const response = await api.post(`/api/del-todo/${id}`)
      return response.data
    } catch (error) {
      console.error('删除待办事项失败:', error)
      throw error
    }
  }
} 