using backend.Models.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route(template: "api/v1/tasks")]
    public class TodoTaskController : ControllerBase
    {
        private readonly TodoTaskService _service;
        public TodoTaskController(TodoTaskService task)
        {
            _service = task;
        }
        [HttpGet]
        public async Task<IEnumerable<TodoTask>> Get()
        {
            return await _service.GetAll();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoTask>> GetById(int id)
        {
            var todoTask = await _service.GetById(id);

            if (todoTask == null)
            {
                return NotFound();
            }

            return todoTask;
        }
        [HttpPost]
        public async Task<IActionResult> Create(TodoTask todoTask)
        {
            var newTodoTask = await _service.Create(todoTask);

            return CreatedAtAction(nameof(GetById), new { id = newTodoTask.Id }, newTodoTask);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TodoTask todoTask)
        {
            if (id != todoTask.Id)
            {
                return BadRequest();
            }
            var taskToUpdate = await _service.GetById(id);

            if (taskToUpdate != null)
            {
                await _service.Update(id, todoTask);
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var todoTaskToDelete = await _service.GetById(id);

            if (todoTaskToDelete != null)
            {
                await _service.Delete(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

    }
}