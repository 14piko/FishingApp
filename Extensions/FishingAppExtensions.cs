using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Text;

namespace FishingApp.Extensions
{
    /// <summary>
    /// This static class contains extension methods for configuring services in the FishingApp.
    /// It includes methods for setting up Swagger, CORS policies, and JWT-based authentication.
    /// </summary>
    public static class FishingAppExtensions
    {
        /// <summary>
        /// Adds Swagger generation with custom settings for the FishingApp API.
        /// </summary>
        /// <param name="Services">The service collection to add the Swagger generation to.</param>
        public static void AddFishingAppSwaggerGen(this IServiceCollection Services)
        {
            Services.AddSwaggerGen(sgo =>
            {
                var o = new Microsoft.OpenApi.Models.OpenApiInfo()
                {
                    Title = "FishingApp API",
                    Version = "v1",
                    Contact = new Microsoft.OpenApi.Models.OpenApiContact()
                    {
                        Email = "mirko.eres1@gmail.com",
                        Name = "Mirko Ereš"
                    },
                    Description = "This is documentation for FishingApp API",
                    License = new Microsoft.OpenApi.Models.OpenApiLicense()
                    {
                        Name = "Educational license"
                    }
                };
                sgo.SwaggerDoc("v1", o);

                sgo.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT authorization works by first authenticating at the route /api/v1/Authorization/token.  
                    You receive a token (without quotes). Enter 'Bearer' [space] and the received token.
                    Example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTc3MTc2MjksImV4cCI6MTY5Nzc0NjQyOSwiaWF0IjoxNjk3NzE3NjI5fQ.PN7YPayllTrWESc6mdyp3XCQ1wp3FfDLZmka6_dAJsY'",

                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                sgo.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                sgo.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);
            });
        }

        /// <summary>
        /// Adds CORS policy to allow any origin, method, and header.
        /// </summary>
        /// <param name="Services">The service collection to add the CORS policy to.</param>
        public static void AddFishingAppCORS(this IServiceCollection Services)
        {
            Services.AddCors(opcije =>
            {
                opcije.AddPolicy("CorsPolicy",
                    builder =>
                        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
                );
            });
        }

        /// <summary>
        /// Adds JWT-based authentication to the service collection.
        /// </summary>
        /// <param name="Services">The service collection to add the authentication to.</param>
        public static void AddFishingAppSecurity(this IServiceCollection Services)
        {
            Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MojKljucKojijeJakoTajan i dovoljno dugačak da se može koristiti")),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = false
                };
            });
        }
    }
}