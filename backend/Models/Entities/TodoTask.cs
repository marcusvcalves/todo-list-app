using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entities
{
    public class TodoTask
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
