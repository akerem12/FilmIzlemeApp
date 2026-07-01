using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IUserService
    {
        void Add(User user);
        User? GetById(int id);

        User? GetByUserName(string username);

        void Update(User user);

        List<User> GetAll();


    }
}
