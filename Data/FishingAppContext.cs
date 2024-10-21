using FishingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FishingApp.Data
{
    /// <summary>
    /// The <see cref="FishingAppContext"/> class is the Entity Framework Core database context for the FishingApp.
    /// It manages the database connections and the entities used within the application.
    /// This context includes DbSet properties for Users, Rivers, Fishes, and Fishings.
    /// </summary>
    public class FishingAppContext : DbContext
    {
        public FishingAppContext(DbContextOptions<FishingAppContext> options) : base(options)
        {
        }

        /// <summary>
        /// Gets or sets the Users in the database.
        /// </summary>
        public DbSet<User> User { get; set; }

        /// <summary>
        /// Gets or sets the Rivers in the database.
        /// </summary>
        public DbSet<River> River { get; set; }

        /// <summary>
        /// Gets or sets the Fishes in the database.
        /// </summary>
        public DbSet<Fish> Fish { get; set; }

        /// <summary>
        /// Gets or sets the Fishing records in the database.
        /// </summary>
        public DbSet<Fishing> Fishing { get; set; }

        /// <summary>
        /// Configures the model relationships for the Fishing entity.
        /// </summary>
        /// <param name="modelBuilder">The model builder used to configure the model.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Fishing>().HasOne(f => f.User);
            modelBuilder.Entity<Fishing>().HasOne(f => f.Fish);
            modelBuilder.Entity<Fishing>().HasOne(f => f.River);
        }
    }
}