using FishingApp.Data;
using FishingApp.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddFishingAppSwaggerGen();
builder.Services.AddFishingAppCORS();

builder.Services.AddDbContext<FishingAppContext>(
    options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("FishingAppContext"));
    }
);

builder.Services.AddAutoMapper(typeof(FishingAppMappingProfile));

builder.Services.AddFishingAppSecurity();
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
    options.EnableTryItOutByDefault();
    options.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.UseCors("CorsPolicy");

app.Run();
