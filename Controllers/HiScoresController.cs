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
using SQLitePCL;

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

        // GET: api/Hiscore
        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<Object>> Get()
        {
            var usersScore = await _context.Users
                .Where(user => user.HiScore.Score > 0)
                .OrderByDescending(user => user.HiScore)
                .ThenByDescending(user => user.HiScore.SubmitDate)
                .Select(user => new { userName = user.UserName, hiScore = user.HiScore.Score, submitDate = user.HiScore.SubmitDate })
                .ToListAsync();
            return usersScore;
        }

        // GET: api/Hiscore/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Hiscore
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Hiscore/5
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

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
