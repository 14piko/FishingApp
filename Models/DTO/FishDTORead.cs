namespace FishingApp.Models.DTO
{
    public record FishDTORead(
        int Id,
        string Name,
        DateTime? HuntStart,
        DateTime? HuntEnd,
        string? Description,
        string? Image
        );

}
