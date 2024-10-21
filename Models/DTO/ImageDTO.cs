using System.ComponentModel.DataAnnotations;

namespace FishingApp.Models.DTO
{
    /// <summary>
    /// Represents a Data Transfer Object (DTO) for image data.
    /// Contains a required property for a Base64 encoded image string.
    /// </summary>
    public record ImageDTO([Required(ErrorMessage = "Base64 image required")] string Base64);
}