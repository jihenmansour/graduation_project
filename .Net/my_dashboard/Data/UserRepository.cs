using my_dashboard.Models;
using System.Linq;

namespace my_dashboard.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDbContext _context;

        public UserRepository(MyDbContext context)
        {
            _context = context;
        }

        public User create(User user)
        {
            _context.User.Add(user);
            user.Iduser = _context.SaveChanges();

            return user;
        }

        public User GetBylogin(string login)
        {
            return _context.User.FirstOrDefault(u => u.login == login);
        }

        public User GetByIduser(int id)
        {
            return _context.User.FirstOrDefault(u => u.Iduser == id);
        }
    }
}
