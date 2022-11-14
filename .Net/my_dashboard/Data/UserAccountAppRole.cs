using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace my_dashboard.Data
{
    [Keyless]
    public class UserAccountAppRole
    {
        public int iduseraccount { get; set; }
        public int idapprole { get; set; }
    }
}
