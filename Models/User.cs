using System.ComponentModel.DataAnnotations.Schema;

namespace FishingApp.Models
{
    /// <summary>
    /// Represents a user in the FishingApp.
    /// Inherits from the Entity class and includes properties such as Email, Password, First Name, Last Name, Role, OIB, and License Number.
    /// </summary>
    public class User : Entity
    {
        [Column("email")]
        public string? Email { get; set; }

        [Column("password")]
        public string? Password { get; set; }

        [Column("first_name")]
        public string? FirstName { get; set; }

        [Column("last_name")]
        public string? LastName { get; set; }

        [Column("role")]
        public string? Role { get; set; }

        [Column("oib")]
        public string? Oib { get; set; }

        [Column("license_number")]
        public string? LicenseNumber { get; set; }
    }
}