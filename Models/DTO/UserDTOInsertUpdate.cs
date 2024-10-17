using FishingApp.Validations;
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

        string? Password,

        [OibValidator]
        string Oib,

        [Required(ErrorMessage = "License number is required!")]
        string LicenseNumber,

        [Required(ErrorMessage = "Role name is required!")]
        string Role
        );
}
