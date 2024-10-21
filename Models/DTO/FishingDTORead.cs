namespace FishingApp.Models.DTO
{
    /// <summary>
    /// Represents a Data Transfer Object (DTO) for reading fishing records.
    /// Contains properties for the fishing record ID, date, user details (first and last name),
    /// fish name, river name, quantity, and weight.
    /// </summary>
    public record FishingDTORead(
        int Id,
        DateTime? Date,
        string? UserFirstName,
        string? UserLastName,
        string? FishName,
        string? RiverName,
        int? Quantity,
        decimal? Weight
        );

}
