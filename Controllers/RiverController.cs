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
    public class RiverController(FishingAppContext context, IMapper mapper) : FishingAppController(context, mapper)
    {
        [HttpGet]
        public ActionResult<List<RiverDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<RiverDTORead>>(_context.River));
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }

        }


        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<RiverDTORead> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            River? e;
            try
            {
                e = _context.River.Find(id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { error = "River doesn't exist in database!" });
            }

            return Ok(_mapper.Map<RiverDTORead>(e));
        }

        [HttpPost]
        public IActionResult Post(RiverDTOInsertUpdate riverDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            try
            {
                var e = _mapper.Map<River>(riverDto);
                _context.River.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<RiverDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }



        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, RiverDTOInsertUpdate riverDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            try
            {
                River? e;
                try
                {
                    e = _context.River.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { error = "River doesn't exist in database!" });
                }
                e = _mapper.Map(riverDto, e);

                _context.River.Update(e);
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
                River? e;
                try
                {
                    e = _context.River.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("River doesn't exist in database!");
                }
                _context.River.Remove(e);
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
        public IActionResult SearchRiverPaginator(int page, string condition = "")
        {
            var perPage = 6;
            condition = condition.ToLower();
            try
            {
                var rivers = _context.River
                    .Where(r => EF.Functions.Like(r.Name.ToLower(), "%" + condition + "%"))
                    .Skip((perPage * page) - perPage)
                    .Take(perPage)
                    .OrderBy(r => r.Name)
                    .ToList();
                return Ok(_mapper.Map<List<RiverDTORead>>(rivers));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
