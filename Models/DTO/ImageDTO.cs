using System.ComponentModel.DataAnnotations;

namespace FishingApp.Models.DTO
{
    public record ImageDTO([Required(ErrorMessage = "Base64 image required")] string Base64);
}
