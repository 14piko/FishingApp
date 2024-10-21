namespace FishingApp.Models.DTO
{
    /// <summary>
    /// Represents a Data Transfer Object (DTO) for user login credentials.
    /// Contains properties for the user's email and password.
    /// </summary>
    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}