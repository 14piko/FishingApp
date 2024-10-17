using AutoMapper;
using FishingApp.Models.DTO;
using FishingApp.Models;

public class FishingAppMappingProfile : Profile
{
    public FishingAppMappingProfile()
    {
        CreateMap<User, UserDTORead>()
            .ConvertUsing(entity =>
            new UserDTORead(
                entity.Id,
                entity.FirstName ?? "",
                entity.LastName ?? "",
                entity.Email ?? "",
                entity.Password ?? "",
                entity.Oib ?? "",
                entity.LicenseNumber ?? "",
                entity.Role ?? "",
                FilePath(entity)));

        CreateMap<UserDTOInsertUpdate, User>()
            .ForMember(dest => dest.Password, opt => opt.Ignore());

    
        CreateMap<River, RiverDTORead>();
        CreateMap<RiverDTORead, River>();
        CreateMap<RiverDTOInsertUpdate, River>();
        CreateMap<Fish, FishDTORead>();
        CreateMap<FishDTORead, Fish>();
        CreateMap<FishDTOInsertUpdate, Fish>();

        CreateMap<Fishing, FishingDTORead>()
            .ForMember(dest => dest.UserFirstName, opt => opt.MapFrom(src => src.User.FirstName))
            .ForMember(dest => dest.UserLastName, opt => opt.MapFrom(src => src.User.LastName))
            .ForMember(dest => dest.FishName, opt => opt.MapFrom(src => src.Fish.Name))
            .ForMember(dest => dest.RiverName, opt => opt.MapFrom(src => src.River.Name));

        CreateMap<Fishing, FishingDTOInsertUpdate>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id))
            .ForMember(dest => dest.FishId, opt => opt.MapFrom(src => src.Fish.Id))
            .ForMember(dest => dest.RiverId, opt => opt.MapFrom(src => src.River.Id));

        CreateMap<FishingDTOInsertUpdate, Fishing>();
    }

    private static string? FilePath(User e)
    {
        try
        {
            var ds = Path.DirectorySeparatorChar;
            string image = Path.Combine(Directory.GetCurrentDirectory()
                + ds + "wwwroot" + ds + "images" + ds + "users" + ds + e.Id + ".png");
            return File.Exists(image) ? "/images/users/" + e.Id + ".png" : null;
        }
        catch
        {
            return null;
        }
    }
}
