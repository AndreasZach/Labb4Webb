using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lab4Webb.Models
{
    [NotMapped]
    public class QuizItem
    {
        public int QuestionId { get; set; }

        public string QuestionString { get; set; }

        public List<string> AnswerOptions { get; set; }
    }
}
