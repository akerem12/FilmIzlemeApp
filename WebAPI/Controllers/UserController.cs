using Business.Abstract;
using Entities;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Register([FromBody] UserRegisterDto dto)
        {
            var user = new User
            {
                Username = dto.Username,
                Password = dto.Password,
                Email = dto.Email
            };

            _userService.Add(user);
            return Ok(new { message = "Kayıt başarılı." });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDto dto)
        {
            var user = _userService.GetByUserName(dto.Username);
            if (user == null || user.Password != dto.Password)
                return Unauthorized(new { message = "Hatalı giriş." });

            return Ok(new { user.Id, user.Username, user.Email });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            if (user == null) return NotFound();

            return Ok(new
            {
                user.Id,
                user.Username,
                user.Email
            });
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll()
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Email
                }).ToList();

            return Ok(users);
        }



        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UserUpdateDto dto)
        {
            var user = _userService.GetById(id);
            if (user == null) return NotFound();

            user.Email = dto.Email;
            user.Password = dto.Password;

            _userService.Update(user);
            return Ok(new { message = "Kullanıcı güncellendi." });
        }
    }
}
