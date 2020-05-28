﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lab4Webb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Lab4Webb.Controllers
{
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
        // GET: api/QuizItems
        [HttpGet]
        [Authorize]
        [IgnoreAntiforgeryToken]
        public async Task<IEnumerable<QuizItem>> Get()
        {
            
            var quizItems = new List<QuizItem>();
            var usedQuestionIds = new List<int>();
            var usedAnswerIds = new List<int>();
            // Creates 10 QuizItems with unique Questions, 1 correct answer, and 3 random incorrect answers.
            for (int i = 0; i < 10; i++)
            {

                var question = await GetUniqueRandomQuestion(usedQuestionIds);
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
            var question = await _ctx.Questions.Where(x => !usedIds.Contains(x.Id)).Skip(rdm.Next(questionCount - usedIds.Count())).Take(1).FirstOrDefaultAsync();
            usedIds.Add(question.Id);
            return question;
        }

        private void LogError(string err) => _logger.LogError(err);

        // GET: api/QuizItems/5
        //[HttpGet("{id}", Name = "Get")]
        //public Task<QuizItem> Get(int id)
        //{
        //    return "value";
        //}
        //
        //// POST: api/QuizItems
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}
        //
        //// PUT: api/QuizItems/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}
        //
        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}