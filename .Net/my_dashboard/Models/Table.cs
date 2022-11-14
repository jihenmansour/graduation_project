using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace my_dashboard.Models
{
    public class Table
    {
        public string firstname { get; set; }

        public string name { get; set; }

        public string subject { get; set; }

        public string issue_status { get; set; }

        public string? description { get; set; }
        public DateTime created_on { get; set; }
        public DateTime closed_on { get; set; }


    }
}
