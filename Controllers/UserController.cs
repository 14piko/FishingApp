using AutoMapper;
using FishingApp.Data;
using FishingApp.Models;
using FishingApp.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace FishingApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController(FishingAppContext context, IMapper mapper) : FishingAppController(context, mapper)
    {
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
        public ActionResult<List<UserDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<UserDTORead>>(_context.User));
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<UserDTORead> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            User? e;
            try
            {
                e = _context.User.Find(id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { error = "User doesn't exist in database!" });
            }
            return Ok(_mapper.Map<UserDTORead>(e));
        }

        [HttpPost]
        public IActionResult Post(UserDTOInsertUpdate userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }

            if (!IsValidOib(userDTO.Oib))
            {
                return BadRequest(new { message = "Invalid OIB." });
            }

            var existingUser = _context.User.FirstOrDefault(u => u.Oib == userDTO.Oib);

            if (existingUser != null)
            {
                return Conflict(new { message = "User with this OIB already exists." });
            }

            try
            {
                var e = _mapper.Map<User>(userDTO);

                e.Password = BCrypt.Net.BCrypt.HashPassword(userDTO.Password); // Set the hashed password

                _context.User.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<UserDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, UserDTOInsertUpdate userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }

            if (!IsValidOib(userDTO.Oib))
            {
                return BadRequest(new { message = "Invalid OIB." });
            }

            var existingUser = _context.User
                .FirstOrDefault(u => u.Oib == userDTO.Oib && u.Id != id);

            if (existingUser != null)
            {
                return Conflict(new { message = "User with this OIB already exists." });
            }

            try
            {
                User? e;
                try
                {
                    e = _context.User.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { error = "User doesn't exist in database!" });
                }

                e = _mapper.Map(userDTO, e);

                if (!string.IsNullOrEmpty(userDTO.Password))
                {
                    e.Password = BCrypt.Net.BCrypt.HashPassword(userDTO.Password); // Set the hashed password
                }

                _context.User.Update(e);
                _context.SaveChanges();
                return Ok(new { error = "Successfully changed!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            try
            {
                User? e;
                try
                {
                    e = _context.User.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("User doesn't exist in database!");
                }
                _context.User.Remove(e);
                _context.SaveChanges();
                return Ok(new { error = "Successfully deleted!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
