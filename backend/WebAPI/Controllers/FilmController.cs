using Business.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilmController : ControllerBase
    {
        private readonly IFilmService _filmService;

        public FilmController(IFilmService filmService)
        {
            _filmService = filmService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var films = await _filmService.GetPopularAsync();
            return Ok(films);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var film = await _filmService.GetByIdAsync(id);
            if (film == null)
                return NotFound();

            return Ok(film);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchByTitle([FromQuery] string title)
        {
            var films = await _filmService.SearchAsync(title);
            return Ok(films);
        }
    }
}
