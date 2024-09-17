using CSHARP_FishingApp.Data;
using CSHARP_FishingApp.Models;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.User);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok(_context.User.Find(id));
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
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

            return Ok(new { poruka = "Successfully changed!" });
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
            return Ok(new { poruka = "Successfully deleted!" });
        }
    }
}
