using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lab4Webb
{
    public class User : IdentityUser<int>
    {
        public HiScore HiScore { get; set; }

        [NotMapped]
        public string Password { get; set; }
    }
}
