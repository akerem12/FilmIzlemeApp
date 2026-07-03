using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFrameWork
{
    public class EfWatchedFilmRepository : IWatchedFilmRepository
    {
        private readonly AppDbContext _context;
        public bool Exists(int userId, int filmId)
        {
            return _context.WatchedFilms.Any(w => w.UserId == userId && w.FilmId == filmId);
        }

        public EfWatchedFilmRepository(AppDbContext context)
        {
            _context = context;
        }

        public void Add(WatchedFilm watchedFilm)
        {
            _context.WatchedFilms.Add(watchedFilm);
            _context.SaveChanges();
        }

        public List<WatchedFilm> getWatchedByUser(int userId)
        {
            return _context.WatchedFilms.Where(w => w.UserId == userId).ToList();
        }
        public void Remove(int userId, int filmId)
        {
            var record = _context.WatchedFilms
                .FirstOrDefault(w => w.UserId == userId && w.FilmId == filmId);

            if (record != null)
            {
                _context.WatchedFilms.Remove(record);
                _context.SaveChanges();
            }
        }

    }
}
