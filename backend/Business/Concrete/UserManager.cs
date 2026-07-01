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
    public class UserManager : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserManager(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void Add(User user)
        {
           _userRepository.Add(user);
        }

        public List<User> GetAll()
        {
           return _userRepository.GetAll();
        }

        public User? GetById(int id)
        {
            return _userRepository.GetById(id);
        }

        public User? GetByUserName(string username)
        {
            return _userRepository.GetByUsername(username);
        }

        public void Update(User user)
        {
            _userRepository.Update(user);
        }
    }
}
