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
    public class EfWatchListRepository : IWatchListRepository
    {

        private readonly AppDbContext _context;

        public EfWatchListRepository(AppDbContext context)
        {
            _context = context;
        }

        public void Add(WatchList watch)
        {
            _context.WatchLists.Add(watch);
            _context.SaveChanges();
        }

        public void Remove(int userId, int filmId)
        {
            var record = _context.WatchLists
                .FirstOrDefault(w => w.UserId == userId && w.FilmId == filmId);

            if (record != null)
            {
                _context.WatchLists.Remove(record);
                _context.SaveChanges();
            }
        }

        public List<WatchList> GetByUserId(int userId)
        {
            return _context.WatchLists
                .Where(w => w.UserId == userId)
                .ToList();
        }


        public bool Exists(int userId, int filmId)
        {
            return _context.WatchLists
                .Any(w => w.UserId == userId && w.FilmId == filmId);
        }
    }
}
