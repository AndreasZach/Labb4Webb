using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Lab4Webb.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private QuizAppContext _ctx;
        private ILogger<AccountController> _logger;
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private IAntiforgery _antiForgery;

        public AccountController(
            UserManager<User> userManager, 
            SignInManager<User> signInManager, 
            IAntiforgery antiforgery, 
            QuizAppContext ctx, 
            ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _antiForgery = antiforgery;
            _ctx = ctx;
            _logger = logger;
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        [Route("/api/account/login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(user.UserName, user.Password, false, false);

                if (result.Succeeded)
                {
                    var response = await CreateResponse(user.UserName); // remove duplicate code with helpmer method?
                    var tokens = _antiForgery.GetAndStoreTokens(HttpContext);
                    Response.Cookies.Append("XSRF-REQUEST-TOKEN", tokens.RequestToken, new CookieOptions { HttpOnly = false });
                    return Ok(response);
                }
                return Unauthorized("Login failed. Either your username or password was incorrect");
            }
                
            return BadRequest();
        }

        [HttpPost]
        [IgnoreAntiforgeryToken] // Fix token issue somehow
        [Route("/api/account/logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            var response = await CreateResponse();
            Response.Cookies.Delete("XSRF-REQUEST-TOKEN");
            return Ok(response);
        } 

        [HttpPost]
        [IgnoreAntiforgeryToken]
        [Route("/api/account/register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                var newUser = new User { UserName = user.UserName };
                newUser.PasswordHash = _userManager.PasswordHasher.HashPassword(newUser, user.Password);
                var result = await _userManager.CreateAsync(newUser);
                if (result.Succeeded)
                {
                    object response;
                    var signinResult = await _signInManager.PasswordSignInAsync(user.UserName, user.Password, false, false);
                    if (signinResult.Succeeded)
                    {
                        var tokens = _antiForgery.GetAndStoreTokens(HttpContext);
                        Response.Cookies.Append("XSRF-REQUEST-TOKEN", tokens.RequestToken, new CookieOptions { HttpOnly = false });
                        response = await CreateResponse(user.UserName); // remove duplicate code with helpmer method?
                    }
                    else
                        response = await CreateResponse();

                    return Ok(response);
                }
            }

            return BadRequest();
        }
        private async Task<Object> CreateResponse(string userName = "")
        {
            if (userName != "")
            {
                var currentUser = await _userManager.FindByNameAsync(userName);
                var userRoles = await _userManager.GetRolesAsync(currentUser);
                return new { currentUser.Id, currentUser.UserName, isAdmin = userRoles.Contains("administrator")};
            }
            else
                return new { Id = 0, UserName = "" };
        }
    }
}