namespace FishingApp.Models.DTO
{
    /// <summary>
    /// Represents a Data Transfer Object (DTO) for reading river information.
    /// Contains properties for the river's identifier, name, and length.
    /// </summary>
    public record RiverDTORead(
        int Id,
        string Name,
        string? Length
        );
}