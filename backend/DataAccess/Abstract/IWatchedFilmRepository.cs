using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IWatchedFilmRepository
    {
        bool Exists(int userId, int filmId);

        void Add(WatchedFilm watchedFilm);
        List<WatchedFilm> getWatchedByUser(int userId);
        void Remove(int userId, int filmId);


    }
}
