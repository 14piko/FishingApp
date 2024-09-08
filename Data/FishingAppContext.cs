using CSHARP_FishingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CSHARP_FishingApp.Data
{
    public class FishingAppContext : DbContext
    {
        public FishingAppContext(DbContextOptions<FishingAppContext> options) : base(options)
        {
        }
        public DbSet<User> User { get; set; }
    }
}
