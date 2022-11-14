using System;
using System.Collections.Generic;
using System.Text;

namespace my_dashboard.Dtos
{
    public class LoginResponseDto
    {
        public string username { get; set; }
        public string Token { get; set; }
        public int EmployeeId { get; set; }
        public List<int> AppRoleIds { get; set; }
        public int UserAccountId { get; set; }
    }
}