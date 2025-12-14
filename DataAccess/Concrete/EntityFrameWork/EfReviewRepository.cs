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
    public class EfReviewRepository : IReviewRepository
    {
        private readonly AppDbContext _context;

        public EfReviewRepository(AppDbContext context)
        {
            _context = context;
        }

        public void Add(Review review)
        {
            _context.Reviews.Add(review);
            _context.SaveChanges();
        }

        public List<Review> GetFilmId(int filmId)
        {
            return _context.Reviews.Include(r=>r.User).Where(r=>r.Film.Id == filmId).ToList();
        }

        public List<Review> GetUserId(int userId)
        {
            return _context.Reviews.Include(r => r.Film).Where(r => r.User.Id == userId).ToList();
        }
    }
}
