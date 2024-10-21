using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FishingApp.Models
{
    /// <summary>
    /// Base class for all entities in the FishingApp.
    /// Contains a unique identifier property 'Id' which is auto-generated.
    /// All entities in the application should inherit from this class.
    /// </summary>
    public abstract class Entity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }
}