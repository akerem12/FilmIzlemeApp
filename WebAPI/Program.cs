using Business.Abstract;
using Business.Concrete;
using DataAccess;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFrameWork;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ??? Veritabaný baðlantýsý (SQL Server)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers()
    .AddJsonOptions(x =>
        x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);


// ?? Service ve Repository baðýmlýlýklarý (DI)
builder.Services.AddScoped<IFilmService, FilmManager>();
builder.Services.AddScoped<IFilmRepository, EfFilmRepository>();

builder.Services.AddScoped<IUserService, UserManager>();
builder.Services.AddScoped<IUserRepository, EfUserRepository>();

builder.Services.AddScoped<IWatchedFilmService, WatchedFilmManager>();
builder.Services.AddScoped<IWatchedFilmRepository, EfWatchedFilmRepository>();

builder.Services.AddScoped<IReviewService, ReviewManager>();
builder.Services.AddScoped<IReviewRepository, EfReviewRepository>();

builder.Services.AddScoped<IWatchListService, WatchListManager>();
builder.Services.AddScoped<IWatchListRepository, EfWatchListRepository>();

// ?? Controller ve Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ?? Swagger aktif (geliþtirme ortamý)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
