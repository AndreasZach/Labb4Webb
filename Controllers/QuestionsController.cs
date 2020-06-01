using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lab4Webb;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Lab4Webb.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly QuizAppContext _context;
        private readonly ILogger<QuestionsController> _logger;

        public QuestionsController(QuizAppContext context, ILogger<QuestionsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [Authorize(Roles = "administrator")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions() => await _context.Questions.ToListAsync();

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        [Authorize(Roles = "administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.Id)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { Success = true });
        }

        [Authorize(Roles = "administrator")]
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
        }

        [Authorize(Roles = "administrator")]
        [IgnoreAntiforgeryToken]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Question>> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return Ok( new { Success = true });
        }

        private bool QuestionExists(int id) => _context.Questions.Any(e => e.Id == id);

        private void LogError(string err) => _logger.LogError(err);
    }
}
