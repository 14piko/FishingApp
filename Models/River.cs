using System.ComponentModel.DataAnnotations.Schema;

namespace FishingApp.Models
{
    /// <summary>
    /// Represents a river in the FishingApp.
    /// Inherits from the Entity class and includes properties such as Name and Length.
    /// </summary>
    public class River : Entity
    {
        [Column("name")]
        public string? Name { get; set; }

        [Column("length")]
        public string? Length { get; set; }
    }
}