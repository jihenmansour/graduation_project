using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using my_dashboard.Models;
using my_dashboard.Data;


namespace my_dashboard.Data
{
    public class UserAccountRepository
    {
        private readonly MyDbContext _dbContext;
        public UserAccountRepository(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool Add(User user)
        {
            var success = false;

            if (user != null)
            {
                try
                {
                    _dbContext.User.Add(user);
                    _dbContext.SaveChanges();
                    success = true;
                }
                catch
                { }
            }

            return success;
        }

        public User GetBylogin(string login)
        {
            return _dbContext.User.Where(ua => ua.login == login).FirstOrDefault();
        }

        public List<int> GetAppRoleIds(int userAccountId)
        {
            return _dbContext.UserAccountAppRole.Where(ua => ua.iduseraccount == userAccountId)
                .Select(ua => ua.idapprole).ToList();
        }

    }
}
