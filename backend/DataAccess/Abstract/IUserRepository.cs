using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IUserRepository
    {
        void Add(User user);
        User? GetById(int id);
        User? GetByUsername(string username);
        void Update(User user);
        List<User> GetAll();
    }
}
