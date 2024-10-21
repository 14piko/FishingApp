using System.ComponentModel.DataAnnotations;

namespace FishingApp.Models.DTO
{
    /// <summary>
    /// Represents a Data Transfer Object (DTO) for inserting or updating fish data.
    /// </summary>
    public record FishDTOInsertUpdate(
       [Required(ErrorMessage = "Name is required!")]
       string Name,
       [Required(ErrorMessage = "Hunt start is required!")]
       DateTime? HuntStart,
       [Required(ErrorMessage = "Hunt end is required!")]
       DateTime? HuntEnd,
       string? Description
       );
}