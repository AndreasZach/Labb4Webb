using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab4Webb.Data
{
    public static class SeedData
    {
        public static void Init(IServiceProvider service)
        {
            var ctx = new QuizAppContext(service.GetRequiredService<DbContextOptions<QuizAppContext>>());
            ctx.Database.EnsureDeleted();
            ctx.Database.Migrate();
            for (int i = 1; i <= 20; i++)
            {
                ctx.Questions.Add(new Question
                {
                    QuestionString = $"Question {i}",
                    Answer = $"Answer {i}"
                });
            }

            var userManager = service.GetRequiredService<UserManager<User>>();
            var passwordHasher = new PasswordHasher<User>();
            service.GetService<RoleManager<IdentityRole<int>>>().CreateAsync(new UserRole { Name = "administrator", NormalizedName = "administrator" }).Wait();
            var user = new User { UserName = "User" };
            user.PasswordHash = passwordHasher.HashPassword(user, "User");
            var admin = new User { UserName = "Admin" };
            admin.PasswordHash = passwordHasher.HashPassword(admin, "Admin");
            var rdm = new Random();
            user.HiScore = new HiScore { SubmitDate = DateTime.UtcNow.AddMinutes(rdm.Next(21)) };
            admin.HiScore = new HiScore { SubmitDate = DateTime.UtcNow.AddMinutes(rdm.Next(21)) };

            userManager.CreateAsync(user).Wait();
            userManager.CreateAsync(admin).Wait();
            userManager.AddToRoleAsync(admin, "administrator").Wait();
            ctx.SaveChanges();
            ctx.Dispose();
        }
    }
}
