using FishingApp.Data;
using FishingApp.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FishingApp.Controllers
{
    /// <summary>
    /// This controller provides authorization functionality.
    /// It allows users to log in and generate JWT tokens based on valid credentials.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly FishingAppContext _context;

        /// <summary>
        /// Constructor for the AuthorizationController that initializes the database context.
        /// </summary>
        /// <param name="context">The database context used for accessing user data.</param>
        public AuthorizationController(FishingAppContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Generates a JWT token for the user after a successful login.
        /// It checks the user's credentials in the database and creates a JWT token if they are valid.
        /// </summary>
        /// <param name="loginDTO">DTO object containing login data (email and password).</param>
        /// <returns>Returns a JWT token if the credentials are valid; otherwise, returns an error.</returns>
        [HttpPost("token")]
        public IActionResult GenerateToken([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userBase = _context.User
                   .Where(u => u.Email!.Equals(loginDTO.Email))
                   .FirstOrDefault();

            if (userBase == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Wrong authorization data!");
            }
            if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, userBase.Password))
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Oops! The password you entered is incorrect. Please try again.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("MojKljucKojijeJakoTajan i dovoljno dugačak da se može koristiti");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userBase.Email),
                new Claim(ClaimTypes.Role, userBase.Role)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(TimeSpan.FromHours(8)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            Console.WriteLine(jwt);

            return Ok(jwt);
        }
    }
}