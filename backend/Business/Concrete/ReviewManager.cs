using Business.Abstract;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class ReviewManager : IReviewService
    {
        private readonly IReviewRepository _reviewRepository;
        public ReviewManager(IReviewRepository reviewRepository) {
            _reviewRepository = reviewRepository;
        }

        public void add(Review review)
        {
            _reviewRepository.Add(review);
        }

        public List<Review> GetByFilmId(int filmId)
        {
            return _reviewRepository.GetFilmId(filmId);
        }

        public List<Review> GetByUserId(int userId)
        {
            return _reviewRepository.GetUserId(userId);
        }
    }
}
