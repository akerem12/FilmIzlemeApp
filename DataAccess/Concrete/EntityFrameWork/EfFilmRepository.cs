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
    public class EfFilmRepository:IFilmRepository
    {
        private readonly AppDbContext _context;

        public EfFilmRepository(AppDbContext context)
        {
            _context = context;
        }

        public void Add(Film film)
        {
            _context.Films.Add(film);
            _context.SaveChanges();
        }

        public List<Film> GetAll()
        {
           return _context.Films.Include(f=>f.Reviews).ToList();
            
        }

        public Film? GetById(int id)
        {
            return _context.Films.Include(f=>f.Reviews).FirstOrDefault(f=>f.Id == id);
        }
        public void Update(Film film)
        {
            _context.Films.Update(film);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var film = _context.Films.FirstOrDefault(f => f.Id == id);
            if (film != null)
            {
                _context.Films.Remove(film);
                _context.SaveChanges();
            }
        }

    }
}
