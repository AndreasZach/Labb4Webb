using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab4Webb
{
    public class UserRole : IdentityRole<int>
    {
        public string Role { get; set; }
    }
}
