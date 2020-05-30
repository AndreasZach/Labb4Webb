﻿using System;
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
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Lab4Webb.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private QuizAppContext _ctx;
        private ILogger<AccountController> _logger;
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private IConfiguration _config;

        public AccountController(
            UserManager<User> userManager, 
            SignInManager<User> signInManager, 
            QuizAppContext ctx,
            IConfiguration config,
            ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _ctx = ctx;
            _config = config;
            _logger = logger;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(user.UserName, user.Password, false, false);
                if (result.Succeeded)
                {
                    var response = await CreateResponse(user.UserName);
                    return Ok(response);
                }
                return Unauthorized("Login failed. Either your username or password was incorrect");
            }
                
            return BadRequest();
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            var response = await CreateResponse();
            return Ok(response);
        } 

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
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
                        response = await CreateResponse(user.UserName); // remove duplicate code with helpmer method?
                    }
                    else
                        response = await CreateResponse();

                    return Ok(response);
                }
            }

            return BadRequest("An error occured while creating your account.");
        }

        private async Task<string> GenerateJSONWebToken(User user)
        {
            //Hash Security Key Object from the JWT Key
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //Generate list of claims with general and universally recommended claims
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
            //Retreive roles for user and add them to the claims listing
            var roles = await _userManager.GetRolesAsync(user);
            claims.AddRange(roles.Select(r => new Claim(ClaimsIdentity.DefaultRoleClaimType, r)));
            //Generate final token adding Issuer and Subscriber data, claims, expriation time and Key
            var token = new JwtSecurityToken(_config["Jwt:Issuer"]
                , _config["Jwt:Issuer"],
                claims,
                null,
                expires: DateTime.Now.AddHours(5),
                signingCredentials: credentials
            );

            //Return token string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        private async Task<Object> CreateResponse(string userName = "")
        {
            if (userName != "")
            {
                var currentUser = await _userManager.FindByNameAsync(userName);
                var userRoles = await _userManager.GetRolesAsync(currentUser);
                var jwtToken = await GenerateJSONWebToken(currentUser);
                return new { currentUser.Id, currentUser.UserName, isAdmin = userRoles.Contains("administrator"), token = jwtToken};
            }
            else
                return new { Id = 0, UserName = "" };
        }
    }
}