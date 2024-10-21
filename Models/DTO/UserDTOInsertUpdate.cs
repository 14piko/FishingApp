using FishingApp.Validations;
using System.ComponentModel.DataAnnotations;

namespace FishingApp.Models.DTO
{
    /// <summary>
    /// Represents a Data Transfer Object (DTO) for inserting or updating user information.
    /// Contains properties for the user's first name, last name, email, password, OIB, license number, and role.
    /// Validation attributes ensure required fields are filled and OIB is valid.
    /// </summary>
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