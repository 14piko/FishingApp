using AutoMapper;
using FishingApp.Data;
using Microsoft.AspNetCore.Mvc;

namespace FishingApp.Controllers
{
    /// <summary>
    /// An abstract class serving as the base for all controllers in the application. 
    /// It provides common access to the database context and the mapper.
    /// </summary>
    public abstract class FishingAppController : ControllerBase
    {
        /// <summary>
        /// Gets the database context for accessing the application's data.
        /// </summary>
        protected readonly FishingAppContext _context;

        /// <summary>
        /// Enables mapping between models and DTO objects.
        /// </summary>
        protected readonly IMapper _mapper;

        /// <summary>
        /// Constructor that initializes the database context and AutoMapper.
        /// </summary>
        /// <param name="context">The database context for data access.</param>
        /// <param name="mapper">The mapper for converting between models and DTOs.</param>
        public FishingAppController(FishingAppContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}