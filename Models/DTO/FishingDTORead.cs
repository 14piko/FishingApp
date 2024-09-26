namespace FishingApp.Models.DTO
{
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
