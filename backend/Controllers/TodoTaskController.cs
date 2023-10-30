using backend.Data;
using backend.Models.Entities;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route(template: "api/v1/tasks")]
    public class TodoTaskController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ITodoTaskRepository _todoTaskRepository;

        public TodoTaskController(AppDbContext context, ITodoTaskRepository todoTaskRepository)
        {
            _context = context;
            _todoTaskRepository = todoTaskRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var todoTasks = await _todoTaskRepository.GetAllAsync();

            return Ok(todoTasks);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoTask>> GetById(int id)
        {
            var todoTask = await _todoTaskRepository.GetByIdAsync(id);

            if (todoTask == null)
            {
                return NotFound();
            }

            return Ok(todoTask);
        }
        [HttpPost]
        public async Task<IActionResult> Create(TodoTask todoTask)
        {
            var newTodoTask = await _todoTaskRepository.CreateAsync(todoTask);

            return CreatedAtAction(nameof(GetById), new { id = newTodoTask.Id }, newTodoTask);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TodoTask todoTask)
        {
            if (id != todoTask.Id)
            {
                return BadRequest();
            }
            var taskToUpdate = await _todoTaskRepository.GetByIdAsync(id);

            if (taskToUpdate != null)
            {
                await _todoTaskRepository.UpdateAsync(id, todoTask);
                return Ok(taskToUpdate);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var todoTaskToDelete = await _todoTaskRepository.GetByIdAsync(id);

            if (todoTaskToDelete != null)
            {
                await _todoTaskRepository.DeleteAsync(id);
                return Ok(todoTaskToDelete);
            }
            else
            {
                return NotFound();
            }
        }

    }
}