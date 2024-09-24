using System.ComponentModel.DataAnnotations;

namespace FishingApp.Models.DTO
{
    public record FishDTOInsertUpdate(
       [Required(ErrorMessage = "Name is required!")]
       string Name,
       DateTime? HuntStart,
       DateTime? HuntEnd,
       string? Description
       );
}
