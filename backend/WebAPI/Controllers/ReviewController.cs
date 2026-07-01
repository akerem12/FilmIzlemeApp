using Business.Abstract;
using Entities;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IFilmService _filmService;
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService, IFilmService filmService)
        {
            _reviewService = reviewService;
            _filmService = filmService;
        }
        [HttpPost]
        public IActionResult AddReview([FromBody] ReviewCreateDto dto)
        {
            var review = new Review
            {
                FilmId = dto.FilmId,
                UserId = dto.UserId,
                Comment = dto.Comment,
                Rating = dto.Rating,
                CreatedAt = DateTime.UtcNow
            };

            _reviewService.add(review);

            // Film’in ortalama puanını güncelle
            _filmService.UpdateFilmRating(dto.FilmId);

            return Ok(new { message = "Yorum eklendi ve puan güncellendi." });
        }

        [HttpGet("film/{filmId}")]
        public IActionResult GetByFilmId(int filmId)
        {
            var reviews = _reviewService.GetByFilmId(filmId)
                .Select(r => new
                {
                    r.Id,
                    r.Comment,
                    r.Rating,
                    r.CreatedAt,
                    r.UserId,
                    Username = r.User.Username
                }).ToList();

            return Ok(reviews);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetByUserId(int userId)
        {
            var reviews = _reviewService.GetByUserId(userId)
                .Select(r => new
                {
                    r.Id,
                    r.Comment,
                    r.Rating,
                    r.CreatedAt,
                    r.FilmId,
                    FilmTitle = r.Film.Title
                }).ToList();

            return Ok(reviews);
        }


    }
}
