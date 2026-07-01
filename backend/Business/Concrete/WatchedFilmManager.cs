using Business.Abstract;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFrameWork;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class WatchedFilmManager : IWatchedFilmService
    {
        private readonly IWatchedFilmRepository _repository;

        public WatchedFilmManager(IWatchedFilmRepository watchedFilm)
        {
            _repository = watchedFilm;
        }

        public void Add(WatchedFilm watchedFilm)
        {
            _repository.Add(watchedFilm);
        }

        public List<WatchedFilm> GetWatchedByUser(int userId)
        {
            return _repository.getWatchedByUser(userId);
        }
        public void Remove(int userId, int filmId)
        {
            _repository.Remove(userId, filmId);
        }
        public bool Exists(int userId, int filmId)
        {
            return _repository.Exists(userId, filmId);
        }


    }
}
