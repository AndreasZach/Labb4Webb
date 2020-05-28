using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SQLitePCL;

namespace Lab4Webb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HiscoreController : ControllerBase
    {
        private QuizAppContext _context;
        private ILogger<HiscoreController> _logger;

        public HiscoreController(QuizAppContext context, ILogger<HiscoreController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Hiscore
        [HttpGet]
        [Authorize]
        [IgnoreAntiforgeryToken]
        public async Task<IEnumerable<Object>> Get()
        {
            var usersScore = await _context.Users
                .Where(user => user.HiScore > 0)
                .OrderByDescending(user => user.HiScore)
                .Select(user => new { userName = user.UserName, hiScore = user.HiScore })
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
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult> Put(int id, [FromBody] int hiScore)
        {
            var user = await _context.Users.FindAsync(id);
            if(user.HiScore < hiScore)
            {
                user.HiScore = hiScore;
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
