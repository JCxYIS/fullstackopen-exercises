using bloglist_backend_cs.Services;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(option =>
    option.AddPolicy(name: "cors", builder => 
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
    ));

// Add services to the container.
builder.Services.AddSingleton<IBlogService, BlogService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
if(true) // demo
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("cors");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
