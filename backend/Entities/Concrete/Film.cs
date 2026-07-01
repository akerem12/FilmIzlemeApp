using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Film
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public String Description { get; set; }
        

        public int year { get; set; }
        public int time { get; set; }

        public int DirectorId { get; set; }
        public string DirectorName { get; set; }
        public double rate { get; set; }
        public ICollection<WatchedFilm> WatchedByUsers { get; set; } = new List<WatchedFilm>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();


    }
}
