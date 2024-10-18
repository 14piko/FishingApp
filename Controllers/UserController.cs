using AutoMapper;
using FishingApp.Data;
using FishingApp.Models;
using FishingApp.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FishingApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController(FishingAppContext context, IMapper mapper) : FishingAppController(context, mapper)
    {
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

           
            var existingUser = _context.User
                .FirstOrDefault(u => u.Oib == userDTO.Oib && u.Id != id);

            if (existingUser != null)
            {
                return Conflict(new { message = "User with this OIB already exists." });
            }

            try
            {
             
                User? existingEntity = _context.User.Find(id);

                if (existingEntity == null)
                {
                    return NotFound(new { error = "User doesn't exist in database!" });
                }

          
                _mapper.Map(userDTO, existingEntity);

                if (!string.IsNullOrEmpty(userDTO.Password))
                {
                    existingEntity.Password = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
                }
            
                _context.User.Update(existingEntity);
                _context.SaveChanges();

                return Ok(new { message = "Successfully changed!" });
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

        [HttpGet]
        [Route("search-paginator/{page}")]
        public IActionResult SearchUserPaginator(int page, string condition = "")
        {
            var perPage = 6;
            condition = condition.ToLower();
            try
            {
                var users = _context.User
                    .Where(u => EF.Functions.Like(u.FirstName.ToLower(), "%" + condition + "%")
                                || EF.Functions.Like(u.LastName.ToLower(), "%" + condition + "%"))
                    .Skip((perPage * page) - perPage)
                    .Take(perPage)
                    .OrderBy(u => u.LastName)
                    .ToList();
                return Ok(_mapper.Map<List<UserDTORead>>(users));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("set-image/{id:int}")]
        public IActionResult SetImage(int id, ImageDTO image)
        {
            if (id <= 0)
            {
                return BadRequest("Id must be greater then zero (0)");
            }
            if (image.Base64 == null || image.Base64?.Length == 0)
            {
                return BadRequest("Image is not uploaded!");
            }
            var u = _context.User.Find(id);
            if (u == null)
            {
                return BadRequest("User with id: " + id + " doesnt exist!");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "images" + ds + "users");

                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var path = Path.Combine(dir + ds + id + ".png");
                System.IO.File.WriteAllBytes(path, Convert.FromBase64String(image.Base64!));
                return Ok("Successfully uploaded image");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
