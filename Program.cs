using FishingApp.Data; 
using FishingApp.Extensions; 
using Microsoft.EntityFrameworkCore; 

// Create a builder for the web application with the provided command-line arguments
var builder = WebApplication.CreateBuilder(args);

// Add MVC controllers to the service collection
builder.Services.AddControllers();

// Add services to support API endpoint exploration and Swagger generation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddFishingAppSwaggerGen(); // Custom Swagger configuration
builder.Services.AddFishingAppCORS(); // Custom CORS configuration

// Configure Entity Framework Core to use SQL Server with the specified connection string
builder.Services.AddDbContext<FishingAppContext>(
    options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("FishingAppContext"));
    }
);

// Add AutoMapper for object-object mapping, specifying the mapping profile
builder.Services.AddAutoMapper(typeof(FishingAppMappingProfile));

// Add security services for JWT authentication
builder.Services.AddFishingAppSecurity();
builder.Services.AddAuthorization(); // Add authorization services

// Build the web application
var app = builder.Build();

// Enable middleware for Swagger and its UI
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true); // Enable request snippets
    options.EnableTryItOutByDefault(); // Enable 'Try It Out' feature by default
    options.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None); // Control documentation expansion
});

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Use authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();

// Map controller routes
app.MapControllers();

// Serve static files and default files
app.UseStaticFiles();
app.UseDefaultFiles();

// Fallback to serve index.html for SPA routing
app.MapFallbackToFile("index.html");

// Use CORS policy defined earlier
app.UseCors("CorsPolicy");

// Run the web application
app.Run();
