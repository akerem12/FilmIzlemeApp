using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IWatchedFilmService
    {
        void Add(WatchedFilm watchedFilm);
        bool Exists(int userId, int filmId);

        List<WatchedFilm> GetWatchedByUser(int userId);
        void Remove(int userId, int filmId);

    }
}
