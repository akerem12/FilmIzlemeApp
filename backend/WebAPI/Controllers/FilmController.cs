using Business.Abstract;
using Entities;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route ("api/[controller]")]
    public class FilmController : ControllerBase
    {
        private readonly IFilmService _filmService;
        private readonly IUserService _userService;

        public FilmController(IFilmService filmService, IUserService userService)
        {
            _filmService = filmService;
            _userService = userService;
        }

        private bool IsAdmin(int userId)
        {
            var user = _userService.GetById(userId);
            return user != null && user.Role == "Admin";
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var films = _filmService.getAll()
                .Select(f => new
                {
                    f.Id,
                    f.Title,
                    f.time,
                    f.year,
                    f.DirectorName,
                    f.DirectorId,
                    f.rate
                }).ToList();

            return Ok(films);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var film = _filmService.getAll()
                .Where(f => f.Id == id)
                .Select(f => new
                {
                    f.Id,
                    f.Title,
                    f.Description,
                    f.time,
                    f.year,
                    f.DirectorName,
                    f.DirectorId,
                    f.rate,
                  
                })
                .FirstOrDefault();

            if (film == null)
                return NotFound();

            return Ok(film);
        }

        [HttpGet("search")]
        public IActionResult SearchByTitle([FromQuery] string title)
        {
            var film = _filmService.getAll()
                .Where(f => f.Title.ToLower().Contains(title.ToLower()))
                .Select(f => new
                {
                    f.Id,
                    f.Title,
                    f.Description,
                    f.time,
                    f.year,
                    f.DirectorName,
                    f.DirectorId,
                    f.rate,
                    reviews = f.Reviews.Select(r => new
                    {
                        r.Comment,
                        r.Rating,
                        r.CreatedAt
                    }).ToList()
                })
                .FirstOrDefault();

            if (film == null)
                return NotFound(new { message = "Film bulunamadı." });

            return Ok(film);
        }

        [HttpPost]
        public IActionResult Add([FromBody] FilmCreateDto filmDto, [FromQuery] int userId)
        {
            if (!IsAdmin(userId))
                return StatusCode(403, new { message = "Bu işlem için admin yetkisi gereklidir." });

            var film = new Film
            {
                Title = filmDto.Title,
                Description = filmDto.Description,
                time=filmDto.time,
                year = filmDto.year,
                DirectorName=filmDto.DirectorName,
                DirectorId=filmDto.DirectorId,
               
            };

            _filmService.Add(film);
            return Ok(new { message = "Film başarıyla eklendi." });
        }

        


        
        [HttpDelete("{id:int}")]
        public IActionResult DeleteFilm(int id, [FromQuery] int userId) {
            if (!IsAdmin(userId))
                return StatusCode(403, new { message = "Bu işlem için admin yetkisi gereklidir." });

            var film = _filmService.getId(id);
            if (film == null)
                return NotFound();

            _filmService.Delete(id);
            return Ok(new { message = "Film silindi." });
        }


        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] FilmUpdateDto dto, [FromQuery] int userId)
        {
            if (!IsAdmin(userId))
                return StatusCode(403, new { message = "Bu işlem için admin yetkisi gereklidir." });

            var film = _filmService.getId(id);
            if (film == null) return NotFound();

            film.Title = dto.Title;
            film.Description = dto.Description;
            film.time = dto.time;
            film.year = dto.year;

            _filmService.Update(film);
            return Ok(new { message = "Film güncellendi." });
        }

    }
}
