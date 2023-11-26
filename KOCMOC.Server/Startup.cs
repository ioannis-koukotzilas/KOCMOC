using KOCMOC.Server.Helpers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddKocmocServices(builder.Configuration);
builder.Services.AddKocmocCors();

var app = builder.Build();

app.UseCors();

app.UseRouting();

app.MapControllers();

app.Run();