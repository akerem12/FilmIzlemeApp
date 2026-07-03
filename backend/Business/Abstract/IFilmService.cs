using Entities.Concrete;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IFilmService
    {
        Task<List<Film>> GetPopularAsync();
        Task<List<Film>> SearchAsync(string title);
        Task<Film?> GetByIdAsync(int id);
    }
}
