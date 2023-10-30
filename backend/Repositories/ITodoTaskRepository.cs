using backend.Models.Entities;

namespace backend.Repositories
{
    public interface ITodoTaskRepository
    {
        Task<List<TodoTask>> GetAllAsync();
        Task<TodoTask?> GetByIdAsync(int id);
        Task<TodoTask> CreateAsync(TodoTask newTodoTask);
        Task UpdateAsync(int id, TodoTask todoTask);
        Task DeleteAsync(int id);

    }
}
