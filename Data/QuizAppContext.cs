using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab4Webb
{
    public class QuizAppContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public QuizAppContext(DbContextOptions<QuizAppContext> options) 
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<HiScore> HiScores { get; set; }

        public DbSet<Question> Questions { get; set; }
    }
}
