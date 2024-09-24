using System.ComponentModel.DataAnnotations;

namespace FishingApp.Models.DTO
{
    public record RiverDTOInsertUpdate(
        [Required(ErrorMessage = "Name is required!")]
        string Name,
        [Required(ErrorMessage = "Length is required!")]
        string? Length
        );
}
