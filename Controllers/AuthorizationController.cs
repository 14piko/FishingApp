using FishingApp.Data;
using FishingApp.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FishingApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly FishingAppContext _context;

        public AuthorizationController(FishingAppContext context)
        {
            _context = context;
        }

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
