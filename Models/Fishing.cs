
using System.ComponentModel.DataAnnotations.Schema;

namespace FishingApp.Models
{
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