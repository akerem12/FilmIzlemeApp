using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IReviewService
    {
        void add(Review review);
        List<Review> GetByFilmId(int filmId);
        List<Review> GetByUserId(int userId);

    }
}
