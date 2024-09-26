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

            CreateMap<Fishing, FishingDTORead>()
                .ForMember(dest => dest.UserFirstName,
                            opt => opt.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.UserLastName,
                            opt => opt.MapFrom(src => src.User.LastName))
                .ForMember(dest => dest.FishName,
                           opt => opt.MapFrom(src => src.Fish.Name))
                .ForMember(dest => dest.RiverName,
                           opt => opt.MapFrom(src => src.River.Name));

            CreateMap<Fishing, FishingDTOInsertUpdate>()
               .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id))
               .ForMember(dest => dest.FishId, opt => opt.MapFrom(src => src.Fish.Id))
               .ForMember(dest => dest.RiverId, opt => opt.MapFrom(src => src.River.Id));

            CreateMap<FishingDTOInsertUpdate, Fishing>();
        }
    }
}
