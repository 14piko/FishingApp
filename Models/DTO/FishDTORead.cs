namespace FishingApp.Models.DTO
{
    /// <summary>
    /// Represents a Data Transfer Object (DTO) for reading fish data.
    /// Contains properties for fish attributes including ID, name, hunt timings, description, and an optional image.
    /// </summary>
    public record FishDTORead(
        int Id,
        string Name,
        DateTime? HuntStart,
        DateTime? HuntEnd,
        string? Description,
        string? Image
        );

}
