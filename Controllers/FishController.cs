using AutoMapper;
using FishingApp.Data;
using FishingApp.Models;
using FishingApp.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FishingApp.Controllers
{
    /// <summary>
    /// This controller manages CRUD operations for the Fish entity.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FishController(FishingAppContext context, IMapper mapper) : FishingAppController(context, mapper)
    {
        /// <summary>
        /// Retrieves all fish from the database.
        /// </summary>
        [HttpGet]
        public ActionResult<List<FishDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<FishDTORead>>(_context.Fish));
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        /// <summary>
        /// Retrieves a fish by its ID.
        /// </summary>
        /// <param name="id">The ID of the fish to retrieve.</param>
        /// <returns>Returns the fish if found; otherwise, returns a not found error.</returns>
        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<FishDTORead> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            Fish? e;
            try
            {
                e = _context.Fish.Find(id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { error = "Fish doesn't exist in database!" });
            }

            return Ok(_mapper.Map<FishDTORead>(e));
        }

        /// <summary>
        /// Adds a new fish to the database.
        /// </summary>
        /// <param name="fishDto">The DTO object containing the fish data to insert.</param>
        /// <returns>Returns a success message and the created fish DTO.</returns>
        [HttpPost]
        public IActionResult Post(FishDTOInsertUpdate fishDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            try
            {
                var e = _mapper.Map<Fish>(fishDto);
                _context.Fish.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<FishDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        /// <summary>
        /// Updates an existing fish by its ID.
        /// </summary>
        /// <param name="id">The ID of the fish to update.</param>
        /// <param name="fishDto">The DTO object containing the updated fish data.</param>
        /// <returns>Returns a success message if updated; otherwise, returns a not found error.</returns>
        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, FishDTOInsertUpdate fishDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            try
            {
                Fish? e;
                try
                {
                    e = _context.Fish.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { error = "Fish doesn't exist in database!" });
                }
                e = _mapper.Map(fishDto, e);

                _context.Fish.Update(e);
                _context.SaveChanges();

                return Ok(new { error = "Successfully changed!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        /// <summary>
        /// Deletes a fish by its ID.
        /// </summary>
        /// <param name="id">The ID of the fish to delete.</param>
        /// <returns>Returns a success message if deleted; otherwise, returns a not found error.</returns>
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
                Fish? e;
                try
                {
                    e = _context.Fish.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Fish doesn't exist in database!");
                }
                _context.Fish.Remove(e);
                _context.SaveChanges();
                return Ok(new { message = "Successfully deleted!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        /// <summary>
        /// Searches for fish with pagination and conditions.
        /// </summary>
        /// <param name="page">The page number for pagination.</param>
        /// <param name="condition">The search condition to filter fish.</param>
        /// <returns>Returns a list of fish matching the search criteria.</returns>
        [HttpGet]
        [Route("search-paginator/{page}")]
        public IActionResult SearchFishPaginator(int page, string condition = "")
        {
            var perPage = 6;
            condition = condition.ToLower();
            try
            {
                var fishes = _context.Fish
                    .Where(f => EF.Functions.Like(f.Name.ToLower(), "%" + condition + "%"))
                    .Skip((perPage * page) - perPage)
                    .Take(perPage)
                    .OrderBy(f => f.Name)
                    .ToList();
                return Ok(_mapper.Map<List<FishDTORead>>(fishes));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Sets an image for a fish by its ID.
        /// </summary>
        /// <param name="id">The ID of the fish to set the image for.</param>
        /// <param name="image">The DTO object containing the base64 image data.</param>
        /// <returns>Returns a success message if the image is uploaded successfully; otherwise, returns an error.</returns>
        [HttpPut]
        [Route("set-image/{id:int}")]
        public IActionResult SetImage(int id, ImageDTO image)
        {
            if (id <= 0)
            {
                return BadRequest("Id must be greater than zero (0)");
            }
            if (image.Base64 == null || image.Base64?.Length == 0)
            {
                return BadRequest("Image is not uploaded!");
            }
            var f = _context.Fish.Find(id);
            if (f == null)
            {
                return BadRequest("Fish with id: " + id + " doesn't exist!");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "images" + ds + "fishes");

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
