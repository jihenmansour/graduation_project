using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace my_dashboard.Models
{   
    public class User
    {
        internal int salt;

        [Key]
        public int Iduser{ get; set; }
        public string login { get; set; }
        [JsonIgnore]
        public string password { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public string? adresse { get; set; }
        public int? numtel { get; set; }
        public string? type { get; set; }

        public string Role { get; set; }





    }
}
