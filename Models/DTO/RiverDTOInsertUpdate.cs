using System.ComponentModel.DataAnnotations;

namespace FishingApp.Models.DTO
{
    /// <summary>
    /// Represents a Data Transfer Object (DTO) for inserting or updating river information.
    /// Contains properties for the river's name and length.
    /// </summary>
    public record RiverDTOInsertUpdate(
        [Required(ErrorMessage = "Name is required!")]
        string Name,
        [Required(ErrorMessage = "Length is required!")]
        string? Length
        );
}