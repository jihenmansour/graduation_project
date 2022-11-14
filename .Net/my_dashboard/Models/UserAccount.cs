using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace my_dashboard.Models
{
   
    public class UserAccount 
    {
        public string login { get; set; }
        public string password { get; set; }
        [Key]
        public int iduser { get; set; }
    }
}
