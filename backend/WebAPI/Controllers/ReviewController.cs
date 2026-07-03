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
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
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

            return Ok(new { message = "Yorum eklendi." });
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
                    r.FilmId
                }).ToList();

            return Ok(reviews);
        }


    }
}
