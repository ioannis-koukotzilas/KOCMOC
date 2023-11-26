using KOCMOC.Server.API.ProducerAPI;
using KOCMOC.Server.Models.Entities;
using KOCMOC.Server.ORM.Context;
using KOCMOC.Server.ORM.Repositories;
using Microsoft.EntityFrameworkCore;

namespace KOCMOC.Server.Helpers
{
  public static class ServiceExtensions
  {
    public static void AddKocmocServices(this IServiceCollection services, IConfiguration configuration)
    {
      // Context
      services.AddDbContext<KocmocDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("KocmocDb")));

      // Repositories
      services.AddScoped<IEntityRepo<Producer>, ProducerRepo>();

      // Services
      services.AddScoped<ProducerService>();

      // Logs
      services.AddLogging();
    }

    public static void AddKocmocCors(this IServiceCollection services)
    {
      services.AddCors(options =>
      {
        options.AddDefaultPolicy(
              builder =>
              {
                builder.WithOrigins("http://localhost:4200")
                         .AllowAnyHeader()
                         .AllowAnyMethod();
              });
      });
    }
  }
}