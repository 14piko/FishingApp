using AutoMapper;
using FishingApp.Data;
using Microsoft.AspNetCore.Mvc;
namespace FishingApp.Controllers
{
    public abstract class FishingAppController : ControllerBase
    {
        protected readonly FishingAppContext _context;
        protected readonly IMapper _mapper;

        public FishingAppController(FishingAppContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
