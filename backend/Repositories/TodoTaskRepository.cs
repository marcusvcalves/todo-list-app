using backend.Data;
using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class TodoTaskRepository : ITodoTaskRepository
    {
        private readonly AppDbContext _context;

        public TodoTaskRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<TodoTask>> GetAllAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TodoTask?> GetByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }
        public async Task<TodoTask> CreateAsync(TodoTask newTodoTask)
        {
            _context.Tasks.Add(newTodoTask);
            await _context.SaveChangesAsync();

            return newTodoTask;
        }
        public async Task UpdateAsync(int id, TodoTask todoTask)
        {
            var existingTodoTask = await GetByIdAsync(id);

            if (existingTodoTask != null)
            {
                existingTodoTask.Title = todoTask.Title;
                existingTodoTask.Description = todoTask.Description;

                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var TodoTaskToDelete = await GetByIdAsync(id);

            if (TodoTaskToDelete != null)
            {
                _context.Tasks.Remove(TodoTaskToDelete);

                await _context.SaveChangesAsync();
            }
        }

    }
}
