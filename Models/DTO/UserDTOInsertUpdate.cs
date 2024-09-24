using System.ComponentModel.DataAnnotations;

namespace FishingApp.Models.DTO
{
    public record UserDTOInsertUpdate(
        [Required(ErrorMessage = "First name is required!")]
        string FirstName,
        [Required(ErrorMessage = "Last name is required!")]
        string LastName,
        [Required(ErrorMessage = "E-mail is required!")]
        string Email,
        [Required(ErrorMessage = "Password is required!")]
        string Password,
        [Required(ErrorMessage = "OIB is required!")]
        string Oib,
        [Required(ErrorMessage = "License number is required!")]
        string LicenseNumber,
        [Required(ErrorMessage = "Role name is required!")]
        string Role
        );
}
