using System.ComponentModel.DataAnnotations.Schema;

namespace FishingApp.Models
{
    /// <summary>
    /// Represents a fish entity in the FishingApp.
    /// Inherits from the Entity class and includes properties such as Name, HuntStart, HuntEnd, and Description.
    /// </summary>
    public class Fish : Entity
    {
        [Column("name")]
        public string? Name { get; set; }

        [Column("hunt_start")]
        public DateTime? HuntStart { get; set; }

        [Column("hunt_end")]
        public DateTime? HuntEnd { get; set; }

        [Column("description")]
        public string? Description { get; set; }
    }
}