using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public DbSet<TodoTask>? Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var server = Configuration["DBServer"] ?? "localhost";
            var port = Configuration["DBPort"] ?? "1433";
            var user = Configuration["DBUser"] ?? "SA";
            var password = Configuration["DBPassword"] ?? "StrongPassword123!";
            var database = Configuration["Database"] ?? "TodoListDatabase";

            optionsBuilder.UseSqlServer($"Server={server},{port};Initial catalog={database};User ID={user};Password={password};TrustServerCertificate=true",
                                        options => options.EnableRetryOnFailure());
        }
    }
}
