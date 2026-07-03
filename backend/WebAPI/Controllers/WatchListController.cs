using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/users/{userId}/watchlist")]
    public class WatchListController : ControllerBase
    {
        private readonly IWatchListService _watchListService;

        public WatchListController(IWatchListService watchListService)
        {
            _watchListService = watchListService;
        }

        
        [HttpGet]
        public IActionResult GetWatchList(int userId)
        {
            var list = _watchListService.GetByUserId(userId)
                .Select(w => new
                {
                    w.FilmId,
                    AddedAt = w.AddedDate
                }).ToList();

            return Ok(list);
        }


        
        [HttpPost("{filmId}")]
        public IActionResult AddToWatchList(int userId, int filmId)
        {

            
            if (_watchListService.Exists(userId, filmId))
                return BadRequest(new { message = "Bu film zaten watchlist’te var." });

            _watchListService.Add(new WatchList
            {
                UserId = userId,
                FilmId = filmId,
                AddedDate = DateTime.UtcNow
            });

            return Ok(new { message = "Film watchlist’e eklendi." });
        }


        
        [HttpDelete("{filmId}")]
        public IActionResult RemoveFromWatchList(int userId, int filmId)
        {
            _watchListService.Remove(userId, filmId);
            return Ok(new { message = "Film watchlist’ten çıkarıldı." });
        }
    }
}
