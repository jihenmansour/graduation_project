using my_dashboard.Models;

namespace my_dashboard.Data
{
    public interface IUserRepository
    {
        User create (User user);
        User? GetBylogin (string login);
        User GetByIduser (int id);
    }
}
