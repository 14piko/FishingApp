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
    public class FishController(FishingAppContext context, IMapper mapper) : FishingAppController(context, mapper)
    {
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
                return Ok(new { poruka = "Successfully deleted!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

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
            var f = _context.Fish.Find(id);
            if (f == null)
            {
                return BadRequest("Fish with id: " + id + " doesnt exist!");
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
