using System.ComponentModel.DataAnnotations.Schema;

namespace FishingApp.Models
{
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
