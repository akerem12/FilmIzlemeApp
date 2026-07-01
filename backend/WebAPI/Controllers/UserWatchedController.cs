using Business.Abstract;
using Microsoft.AspNetCore.Mvc;
using Entities.Concrete;
namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/users/{userId}/watched")]
    public class UserWatchedController : ControllerBase
    {
        private readonly IWatchedFilmService _watchedService;

        public UserWatchedController(IWatchedFilmService watchedService)
        {
            _watchedService = watchedService;
        }

        // GET: api/users/{userId}/watched
        [HttpGet]
        public IActionResult GetWatchedFilms(int userId)
        {
            var watchedList = _watchedService.GetWatchedByUser(userId)
                .Select(w => new
                {
                    w.FilmId,
                    w.Film.Title,
                    w.Film.time,
                    w.Film.year,
                    WatchedAt = w.WatchedDate
                }).ToList();

            return Ok(watchedList);
        }


        // POST: api/users/{userId}/watched/{filmId}
        [HttpPost("{filmId}")]
        public IActionResult MarkAsWatched(int userId, int filmId)
        {
            if (_watchedService.Exists(userId, filmId))
                return BadRequest(new { message = "Bu film zaten izlenmiş." });

            _watchedService.Add(new WatchedFilm
            {
                UserId = userId,
                FilmId = filmId,
                WatchedDate = DateTime.UtcNow
            });

            return Ok(new { message = "Film izlenmiş olarak eklendi." });
        }

        // DELETE: api/users/{userId}/watched/{filmId}
        [HttpDelete("{filmId}")]
        public IActionResult RemoveFromWatchlist(int userId, int filmId)
        {
            _watchedService.Remove(userId, filmId);
            return Ok(new { message = "Film izleme listesinden çıkarıldı." });
        }

    }
}
