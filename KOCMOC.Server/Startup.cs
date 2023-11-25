using KOCMOC.Server.ORM.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<KocmocDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("KocmocDb")));

builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(
    builder =>
    {
      builder.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

app.MapGet("/", () => "Hello World2!");

app.Run();