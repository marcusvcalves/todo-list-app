import axios from '../../api/axios';

const TASKS_URL = 'api/v1/tasks';

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(
      TASKS_URL+'/'+taskId,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    throw error;
  }
};
