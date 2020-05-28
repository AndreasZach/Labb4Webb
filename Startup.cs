using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Lab4Webb
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging();
            services.AddIdentity<User, IdentityRole<int>>( opts =>
            {
                opts.Password.RequireUppercase = false;
                opts.Password.RequiredUniqueChars = 0;
                opts.Password.RequiredLength = 3;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequireLowercase = false;
                opts.Password.RequireDigit = false;
            })
            .AddEntityFrameworkStores<QuizAppContext>()
            .AddDefaultTokenProviders();
            services.AddControllersWithViews();
            services.AddMvc(options => {
                options.Filters.Add(new ValidateAntiForgeryTokenAttribute());
            });
            services.AddDbContext<QuizAppContext>(
                opts => opts.UseSqlServer(Configuration.GetConnectionString("QuizAppContext")));
            services.AddAntiforgery(opts => opts.HeaderName = "X-XSRF-TOKEN");
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAntiforgery antiforgery)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseCors(opts =>
            {
                opts.AllowAnyHeader();
                opts.AllowAnyMethod();
                opts.AllowCredentials();
            });

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(opt =>
            {
                opt.Options.SourcePath = "react-app";
                if (env.IsDevelopment())
                    opt.UseReactDevelopmentServer(npmScript: "start");
            });
        }
    }
}
