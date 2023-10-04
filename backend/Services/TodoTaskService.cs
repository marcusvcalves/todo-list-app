using backend.Data;
using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TodoTaskService
    {
        private readonly AppDbContext _context;
        public TodoTaskService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TodoTask>> GetAll()
        {
            return await _context.Tasks.ToListAsync();
        }
        public async Task<TodoTask?> GetById(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }
        public async Task<TodoTask> Create(TodoTask newTodoTask)
        {
            _context.Tasks.Add(newTodoTask);
            await _context.SaveChangesAsync();

            return newTodoTask;
        }
        public async Task Update(int id, TodoTask TodoTask)
        {
            var existingTodoTask = await GetById(id);

            if (existingTodoTask != null)
            {
                existingTodoTask.Title = TodoTask.Title;
                existingTodoTask.Description = TodoTask.Description;

                await _context.SaveChangesAsync();
            }
        }
        public async Task Delete(int id)
        {
            var TodoTaskToDelete = await GetById(id);

            if (TodoTaskToDelete != null)
            {
                _context.Tasks.Remove(TodoTaskToDelete);

                await _context.SaveChangesAsync();
            }
        }


    }
}
