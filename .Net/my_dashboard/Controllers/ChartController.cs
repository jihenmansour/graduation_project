using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using my_dashboard.Models;


namespace my_dashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public ChartController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{firstname}")]
        public JsonResult Get(string firstname)
        {
            string query = @"
                          select count(subject) as count,months.name as month
                           from 
                           dashboard.task
                           LEFT JOIN dashboard.months on MONTH(task.created_on) = months.id
                            where firstname = '" + firstname + @"' and issue_status = ""Terminé"" and
                           YEAR(created_on) = YEAR(NOW()) GROUP BY MONTH(created_on) ORDER BY months.id ASC
                            
                        ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }

    }
}

