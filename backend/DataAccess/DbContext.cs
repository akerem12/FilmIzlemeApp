using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Film> Films => Set<Film>();
        public DbSet<User> Users => Set<User>();
        public DbSet<WatchedFilm> WatchedFilms => Set<WatchedFilm>();
        public DbSet<Review> Reviews => Set<Review>();
        public DbSet<WatchList> WatchLists => Set<WatchList>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WatchedFilm>()
                .HasKey(w => w.Id);

            modelBuilder.Entity<WatchedFilm>()
                .HasOne(w => w.User)
                .WithMany(u => u.WatchedByUsers)
                .HasForeignKey(w => w.UserId);

            modelBuilder.Entity<WatchedFilm>()
                .HasOne(w => w.Film)
                .WithMany(f => f.WatchedByUsers)
                .HasForeignKey(w => w.FilmId);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Film)
                .WithMany(f => f.Reviews)
                .HasForeignKey(r => r.FilmId);
            modelBuilder.Entity<WatchList>()
                .HasOne(w => w.User)
                .WithMany()
                .HasForeignKey(w => w.UserId);

            modelBuilder.Entity<WatchList>()
                .HasOne(w => w.Film)
                .WithMany()
                .HasForeignKey(w => w.FilmId);
        }
    }
}
