using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IFilmService
    {
        List<Film> getAll();
        Film? getId(int id);
        void Add(Film film);

        void MarkedAsWatched(int userId,int filmId );
        void Delete(int id);
        void Update(Film film);
        void UpdateFilmRating(int filmId);

    }
}
