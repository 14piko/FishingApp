using CSHARP_FishingApp.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<FishingAppContext>(
    options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("FishingAppContext"));
    }
    );

builder.Services.AddCors(opcije =>
{
    opcije.AddPolicy("CorsPolicy",
        builder =>
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
        options.EnableTryItOutByDefault();
    });
//}
//

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//za potrebe produkcije

app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");
app.UseCors("CorsPolicy");

//završio za potrebe produkcije

app.Run();
