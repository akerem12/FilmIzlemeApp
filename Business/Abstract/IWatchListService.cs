using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IWatchListService
    {
        void Add(WatchList watch);
        void Remove(int userId, int filmId);
        List<WatchList> GetByUserId(int userId);
        bool Exists(int userId, int filmId);
    }
}
