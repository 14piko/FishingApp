using System.ComponentModel.DataAnnotations.Schema;

namespace FishingApp.Models
{
    /// <summary>
    /// Represents a fishing event in the FishingApp.
    /// Inherits from the Entity class and includes properties such as Date, User, Fish, River, Quantity, and Weight.
    /// </summary>
    public class Fishing : Entity
    {
        [Column("date")]
        public DateTime Date { get; set; }

        [ForeignKey("user")]
        public required User User { get; set; }

        [ForeignKey("fish")]
        public required Fish Fish { get; set; }

        [ForeignKey("river")]
        public required River River { get; set; }

        public int? Quantity { get; set; }
        public decimal? Weight { get; set; }
    }
}