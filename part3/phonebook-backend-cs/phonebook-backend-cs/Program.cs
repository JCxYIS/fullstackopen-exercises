using phonebook_backend_cs.Models;
using phonebook_backend_cs.Services;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
// cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
                      });
});

// db
//builder.Services.Configure<PhonebookEntry>(
//    builder.Configuration.GetSection("PhonebookDatabase"));

// Add services to the container.
builder.Services.AddSingleton<PhonebookService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
if(true) // open swagger for demo purpose
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("DYNO")))
{
    Console.WriteLine("Use https redirection");
    app.UseHttpsRedirection();
}

// enable wwwroot
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
