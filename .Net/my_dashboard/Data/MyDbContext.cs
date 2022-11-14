using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using my_dashboard.Models;

namespace my_dashboard.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options): base(options)
        {

        }
        public DbSet<User> User { set; get; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.login).IsUnique(); });
        }
        public DbSet<UserAccount> UserAccount { get; set; }
        public DbSet<UserAccountAppRole> UserAccountAppRole { get; set; }
    }
}
