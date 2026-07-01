using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IFilmRepository
    {
        List<Film> GetAll();
        Film? GetById(int id);
        void Add(Film film);
        void Update(Film film);
        void Delete(int id);
    }
}
