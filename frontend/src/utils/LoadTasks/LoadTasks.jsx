import axios from '../../api/axios';

const TASKS_URL = 'api/v1/tasks'

export const loadTasks = async () => {
    try {
      const response = await axios.get(TASKS_URL);
      
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar tasks:', error);
      throw error;
    }
  };