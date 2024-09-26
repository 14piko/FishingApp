using System.ComponentModel.DataAnnotations;

namespace FishingApp.Models.DTO
{
    public record FishingDTOInsertUpdate(
       DateTime? Date,
        [Required(ErrorMessage = "User required")]
       int? UserId,
        [Required(ErrorMessage = "Fish required")]
       int? FishId,
        [Required(ErrorMessage = "River required")]
       int? RiverId,
        [Range(1, 200, ErrorMessage = "{0} mora biti između {1} i {2}")]
        [Required(ErrorMessage = "Quantity required")]
       int? Quantity,
        [Required(ErrorMessage = "Weight required")]
       decimal? Weight
       );
}
