using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Lab4Webb.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class HiScoresController : ControllerBase
    {
        private QuizAppContext _context;
        private ILogger<HiScoresController> _logger;

        public HiScoresController(QuizAppContext context, ILogger<HiScoresController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Object>>> Get()
        {
            var usersScore = await _context.Users
                .Where(user => user.HiScore.Score > 0)
                .OrderByDescending(user => user.HiScore)
                .ThenByDescending(user => user.HiScore.SubmitDate)
                .Select(user => new { userName = user.UserName, hiScore = user.HiScore.Score, submitDate = user.HiScore.SubmitDate })
                .ToListAsync();
            if (usersScore.Count < 1)
                return NotFound();
            return usersScore;
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(int id, [FromBody] int hiScore)
        {
            var userScore = await _context.HiScores.FindAsync(id);
            if(userScore.Score < hiScore)
            {
                userScore.Score = hiScore;
                userScore.SubmitDate = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }

            return Ok("HiScore successfully updated");
        }
    }
}
