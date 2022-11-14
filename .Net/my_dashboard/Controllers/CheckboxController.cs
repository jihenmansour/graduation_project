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
    public class CheckboxController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public CheckboxController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{assigned_to_id}")]
        public JsonResult Get(string assigned_to_id)
        {
            string query = @"
                          select project_name,assigned_to_id,description 
                           from 
                           dashboard.projects_user
                            where assigned_to_id = '" + assigned_to_id + @"' 
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

        [HttpPost]
        public JsonResult Post(List<Dropdown> project)
        {
            foreach (Dropdown dropdown in project)
            {
                string query = @"
                    insert ignore into dashboard.projects_user
                    (project_name,assigned_to_id)
                    values 
                    (
                    '" + dropdown.project_name + @"'
                     ,'" + dropdown.assigned_to_id + @"'

                    );
                    ";
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("Default");
                MySqlDataReader myReader;
                using (MySqlConnection myCon = new MySqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpDelete("{assigned_to_id}")]
        public JsonResult Delete(string assigned_to_id)
        {
            string query = @"
                    delete from dashboard.projects_user
                    where assigned_to_id = '" + assigned_to_id + @"' 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}