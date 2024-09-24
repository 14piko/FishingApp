using AutoMapper;
using FishingApp.Data;
using FishingApp.Models;
using FishingApp.Models.DTO;
using Microsoft.AspNetCore.Mvc;

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



    }
}
