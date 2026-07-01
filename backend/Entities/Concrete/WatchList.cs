using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class WatchList
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } 
        public int FilmId { get; set; }
        public Film Film { get; set; }

        public DateTime AddedDate { get; set; } = DateTime.UtcNow;
    }
}
