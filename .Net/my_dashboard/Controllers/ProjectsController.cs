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
    public class ProjectsController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public ProjectsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{login}")]
        public JsonResult Get(string login)
        {
            string query = @"
                          select DISTINCT(name), projects.description
                           from 
                           dashboard.issues
                           join dashboard.user on dashboard.issues.assigned_to_id=dashboard.user.iduser
                           join dashboard.projects on dashboard.issues.project_id=dashboard.projects.id
                            where login = '" + login + @"' 
                           order by dashboard.issues.created_on desc
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