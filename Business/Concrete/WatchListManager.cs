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
    public class WatchListManager : IWatchListService
    {
        private readonly IWatchListRepository _watchListRepository;

        public WatchListManager(IWatchListRepository watchListRepository)
        {
            _watchListRepository = watchListRepository;
        }

        public void Add(WatchList watch)
        {
            _watchListRepository.Add(watch);
        }

        public void Remove(int userId, int filmId)
        {
            _watchListRepository.Remove(userId, filmId);
        }

        public List<WatchList> GetByUserId(int userId)
        {
            return _watchListRepository.GetByUserId(userId);
        }

        public bool Exists(int userId, int filmId)
        {
            return _watchListRepository.Exists(userId, filmId);
        }
    }
}
