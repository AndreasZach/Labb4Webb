using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lab4Webb
{
    public class HiScore
    {
        public int Id { get; set; }

        public int Score { get; set; } = 0;

        public DateTime SubmitDate { get; set; }
    }
}
