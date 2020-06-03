using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lab4Webb.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Lab4Webb.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class QuizItemsController : ControllerBase
    {
        private QuizAppContext _ctx;
        private ILogger _logger;

        public QuizItemsController(QuizAppContext ctx, ILogger<QuizItemsController> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }
        
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<QuizItem>>> Get()
        {
            
            var quizItems = new List<QuizItem>();
            var usedQuestionIds = new List<int>();
            var usedAnswerIds = new List<int>();
            // Creates 10 QuizItems with unique Questions, 1 correct answer, and 3 random incorrect answers.
            for (int i = 0; i < 10; i++)
            {

                var question = await GetUniqueRandomQuestion(usedQuestionIds);
                if (question == null && quizItems.Count < 1)
                    return NotFound();
                if (question == null)
                    continue;
                var quizItem = new QuizItem
                {
                    QuestionId = question.Id,
                    QuestionString = question.QuestionString,
                    AnswerOptions = new List<string> { question.Answer }
                };
                usedQuestionIds.Add(question.Id);
                usedAnswerIds.Add(question.Id);

                for (int j = 0; j < 3; j++)
                {
                    var answerOption = await GetUniqueRandomQuestion(usedAnswerIds);
                    if (answerOption == null)
                        continue;
                    quizItem.AnswerOptions.Add(answerOption.Answer);
                }
                usedAnswerIds.Clear();

                quizItems.Add(quizItem);
            }

            return quizItems;
        }

        private async Task<Question> GetUniqueRandomQuestion(List<int> usedIds)
        {
            var rdm = new Random();
            var questionCount = _ctx.Questions.Count();
            if (questionCount - usedIds.Count < 1)
                return null;
            var question = await _ctx.Questions.Where(x => !usedIds.Contains(x.Id)).Skip(rdm.Next(questionCount - usedIds.Count())).Take(1).FirstOrDefaultAsync();
            if (question == null)
                return null;
            usedIds.Add(question.Id);
            return question;
        }

        private void LogError(string err) => _logger.LogError(err);
    }
}
