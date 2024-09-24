using System.ComponentModel.DataAnnotations.Schema;

namespace FishingApp.Models
{
    public class River : Entity
    {
        [Column("name")]
        public string? Name { get; set; }

        [Column("length")]
        public string? Length { get; set; }
    }
}
