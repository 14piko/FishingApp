﻿using AutoMapper;
using FishingApp.Controllers;
using FishingApp.Data;
using FishingApp.Models;
using FishingApp.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace EdunovaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FishingController(FishingAppContext context, IMapper mapper) : FishingAppController(context, mapper)
    {
        [HttpGet]
        public ActionResult<List<FishingDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }

            try
            {
                var fishings = _context.Fishing
                    .Include(f => f.User)
                    .Include(f => f.Fish)
                    .Include(f => f.River)
                    .ToList(); 

                return Ok(_mapper.Map<List<FishingDTORead>>(fishings));
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<FishingDTOInsertUpdate> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            Fishing? e;
            try
            {
                e = _context.Fishing
                    .Include(f => f.User)
                    .Include(f => f.Fish)
                    .Include(f => f.River)
                    .FirstOrDefault(x => x.Id == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Fishing doesn't exist in database!" });
            }

            return Ok(_mapper.Map<FishingDTOInsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(FishingDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }

            User? es;
            try
            {
                es = _context.User.Find(dto.UserId);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { error = "User on fishing doesn't exist in database!" });
            }

            Fish? fs;
            try
            {
                fs = _context.Fish.Find(dto.FishId);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            if (fs == null)
            {
                return NotFound(new { error = "Fish on fishing doesn't exist in database!" });
            }

            River? rv;
            try
            {
                rv = _context.River.Find(dto.RiverId);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            if (rv == null)
            {
                return NotFound(new { error = "River on fishing doesn't exist in database!" });
            }

            try
            {
                var e = _mapper.Map<Fishing>(dto);
                e.User = es;
                e.Fish = fs;
                e.River = rv;
                _context.Fishing.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<FishingDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, FishingDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = ModelState });
            }
            try
            {
                Fishing? e;
                try
                {
                    e = _context.Fishing.Include(f => f.User).FirstOrDefault(x => x.Id == id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { error = "Fishing doesn't exist in database!" });
                }

                User? es;
                try
                {
                    es = _context.User.Find(dto.UserId);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
                if (es == null)
                {
                    return NotFound(new { error = "User on fishing doesn't exist in database!" });
                }


                Fish? fh;
                try
                {
                    fh = _context.Fish.Find(dto.FishId);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
                if (fh == null)
                {
                    return NotFound(new { error = "Fish on fishing doesn't exist in database!" });
                }

                River? rv;
                try
                {
                    rv = _context.River.Find(dto.RiverId);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
                if (rv == null)
                {
                    return NotFound(new { error = "River on fishing doesn't exist in database!" });
                }


                e = _mapper.Map(dto, e);
                e.User = es;
                e.Fish = fh;
                e.River = rv;
                _context.Fishing.Update(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Successfully changed!" });
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
                Fishing? e;
                try
                {
                    e = _context.Fishing.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Fishing doesn't exist in database!");
                }
                _context.Fishing.Remove(e);
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