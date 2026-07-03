using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Review
    {
        public int Id { get; set; }

        public int FilmId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } 

        public string Comment { get; set; } 
        public int Rating { get; set; }  

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    }
}
