namespace FishingApp.Models.DTO

{
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
