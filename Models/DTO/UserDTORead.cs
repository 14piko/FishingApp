namespace FishingApp.Models.DTO
{
    /// <summary>
    /// Represents a Data Transfer Object (DTO) for reading user information.
    /// Contains properties for the user's ID, first name, last name, email, password, OIB,
    /// license number, role, and an optional image.
    /// </summary>
    public record UserDTORead(
        int Id,
        string FirstName,
        string LastName,
        string Email,
        string Password,
        string? Oib,
        string? LicenseNumber,
        string? Role,
        string? Image
        );

}