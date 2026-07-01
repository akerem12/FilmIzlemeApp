using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class User
    {
        public int Id { get; set; }
        public String Username { get; set; }
        public String Email {  get; set; }
        public String Password { get; set; }
        public String Role { get; set; } = "User";
        public ICollection<WatchedFilm> WatchedByUsers { get; set; } = new List<WatchedFilm>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();

    }
}
