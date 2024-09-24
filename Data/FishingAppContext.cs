using FishingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FishingApp.Data
{
    public class FishingAppContext : DbContext
    {
        public FishingAppContext(DbContextOptions<FishingAppContext> options) : base(options)
        {
        }
        public DbSet<User> User { get; set; }
        public DbSet<River> River { get; set; }
        public DbSet<Fish> Fish { get; set; }
    }
}
