using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Services 
{
    public static class DatabaseManagementService 
    {
        public static void MigrationInitialization(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                serviceScope.ServiceProvider.GetService<AppDbContext>().Database.Migrate();
            }
        }
    }
}