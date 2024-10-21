using System.ComponentModel.DataAnnotations;

namespace FishingApp.Models.DTO
{
    /// <summary>
    /// Represents a Data Transfer Object (DTO) for inserting or updating fishing records.
    /// Contains properties for the fishing date, user ID, fish ID, river ID, quantity, and weight.
    /// Validation attributes are applied to ensure required fields and constraints on quantity.
    /// </summary>
    public record FishingDTOInsertUpdate(
       DateTime? Date,
        [Required(ErrorMessage = "User required")]
       int? UserId,
        [Required(ErrorMessage = "Fish required")]
       int? FishId,
        [Required(ErrorMessage = "River required")]
       int? RiverId,
        [Range(1, 200, ErrorMessage = "{0} be between {1} and {2}")]
        [Required(ErrorMessage = "Quantity required")]
       int? Quantity,
        [Required(ErrorMessage = "Weight required")]
       decimal? Weight
       );
}