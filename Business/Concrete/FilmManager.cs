using Business.Abstract;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class FilmManager : IFilmService
    {
        private readonly IFilmRepository _filmRepository;
        private readonly IWatchedFilmRepository _watchedRepo;

        public FilmManager(IFilmRepository filmRepository,IWatchedFilmRepository watchedFilmRepository)
        {
            _filmRepository= filmRepository;
            _watchedRepo= watchedFilmRepository;
        }

        public void Add(Film film)
        {
            _filmRepository.Add(film);
        }

        public void Update(Film film)
        {
            _filmRepository.Update(film);
        }

        public void Delete(int id)
        {
            _filmRepository.Delete(id);
        }


        public List<Film> getAll()
        {
            return _filmRepository.GetAll();
        }

        public Film? getId(int id)
        {
           return _filmRepository.GetById(id);
        }

        public void MarkedAsWatched(int userId, int filmId)
        {
            var watched = new WatchedFilm
            {
                UserId = userId,
                Id = filmId
            };
            _watchedRepo.Add(watched);
        }
        public void UpdateFilmRating(int filmId)
        {
            var film = _filmRepository.GetById(filmId);
            if (film == null) return;

            if (film.Reviews == null || !film.Reviews.Any())
            {
                film.rate = 0;
            }
            else
            {
                film.rate = (double)Math.Round(
                    film.Reviews.Average(r => r.Rating), 2
                );
            }


            _filmRepository.Update(film);
        }



    }
}
