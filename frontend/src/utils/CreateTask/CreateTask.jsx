import axios from '../../api/axios';

const TASKS_URL = 'api/v1/tasks';

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(
      TASKS_URL,
      taskData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }
};
