import axios from '../../api/axios';

const TASKS_URL = 'api/v1/tasks';

export const updateTask = async (taskId, updateTaskData) => {
  try {
    const response = await axios.put(
      TASKS_URL+'/'+taskId,
      updateTaskData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Erro ao editar tarefa:', error);
    throw error;
  }
};
