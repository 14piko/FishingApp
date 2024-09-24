using AutoMapper;
using FishingApp.Models;
using FishingApp.Models.DTO;

namespace FishingApp.Mapping
{
    public class FishingAppMappingProfile : Profile
    {
        public FishingAppMappingProfile()
        {
            CreateMap<User, UserDTORead>();
            CreateMap<UserDTORead, User>();
            CreateMap<UserDTOInsertUpdate, User>();

            CreateMap<River, RiverDTORead>();
            CreateMap<RiverDTORead, River>();
            CreateMap<RiverDTOInsertUpdate, River>();

            CreateMap<Fish, FishDTORead>();
            CreateMap<FishDTORead, Fish>();
            CreateMap<FishDTOInsertUpdate, Fish>();
        }
    }
}
