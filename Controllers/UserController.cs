using CSHARP_FishingApp.Data;
using CSHARP_FishingApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CSHARP_FishingApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly FishingAppContext _context;
        public UserController(FishingAppContext context)
        {
            _context = context;
        }

        private bool IsValidOib(string oib)
        {
            if (oib.Length != 11 || !oib.All(char.IsDigit))
            {
                return false;
            }

            int[] digits = oib.Select(d => int.Parse(d.ToString())).ToArray();

            int factor = 10;
            for (int i = 0; i < 10; i++)
            {
                factor = factor + digits[i];
                factor = factor % 10;
                if (factor == 0)
                    factor = 10;
                factor *= 2;
                factor = factor % 11;
            }

            int controlDigit = 11 - factor;
            if (controlDigit == 10)
            {
                controlDigit = 0;
            }

            return controlDigit == digits[10];
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.User);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            var user = _context.User.Find(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            if (!IsValidOib(user.Oib))
            {
                return BadRequest(new { message = "Invalid OIB." });
            }

            var existingUser = _context.User.FirstOrDefault(u => u.Oib == user.Oib);
            if (existingUser != null)
            {
                return Conflict(new { message = "User with this OIB already exists." });
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.User.Add(user);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, user);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, User user)
        {
            var db = _context.User.Find(id);

            if (db == null)
            {
                return NotFound(new { message = "User not found." });
            }

            if (!IsValidOib(user.Oib))
            {
                return BadRequest(new { message = "Invalid OIB." });
            }

            var existingUser = _context.User.FirstOrDefault(u => u.Oib == user.Oib && u.Id != id);
            if (existingUser != null)
            {
                return Conflict(new { message = "Another user with this OIB already exists." });
            }

            if (!string.IsNullOrEmpty(user.Password))
            {
                db.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            }

            db.Email = user.Email;
            db.FirstName = user.FirstName;
            db.LastName = user.LastName;
            db.Role = user.Role;
            db.Oib = user.Oib;
            db.LicenseNumber = user.LicenseNumber;

            _context.User.Update(db);
            _context.SaveChanges();

            return Ok(new { message = "Successfully updated!" });
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var db = _context.User.Find(id);

            if (db == null)
            {
                return NotFound(new { message = "User not found." });
            }

            _context.User.Remove(db);
            _context.SaveChanges();
            return Ok(new { message = "Successfully deleted!" });
        }
    }
}
