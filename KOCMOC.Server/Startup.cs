using KOCMOC.Server.Helpers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddKocmocServices(builder.Configuration);
builder.Services.AddKocmocCors();

var app = builder.Build();

app.UseCors();

app.MapGet("/", () => "Hello World2!");

app.Run();