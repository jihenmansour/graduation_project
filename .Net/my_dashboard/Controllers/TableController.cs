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
    public class TableController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public TableController(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        [HttpGet("{firstname}&{name}")]
        public JsonResult Get(string firstname, string name)
        {
            string query = @"
                          select id,firstname,name,subject,issue_status,description,
                           DATE_FORMAT(created_on, '%Y/%m/%d') as created_on
                          ,DATE_FORMAT(closed_on, '%Y/%m/%d') as closed_on
                           from 
                           dashboard.task where name = '" + name + @"' and firstname = '" + firstname + @"'
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
        public JsonResult Post(Table tache)
        {
            string query = @"
                    insert ignore into dashboard.task
                    (firstname,name,subject,issue_status,description ,created_on,closed_on)
                    values 
                    (
                    '" + tache.firstname + @"'
                    ,'" + tache.name + @"'
                    ,'" + tache.subject + @"'
                    ,'" + tache.issue_status + @"'
                    ,'" + tache.description + @"'
                    ,'" + tache.created_on.ToString("yyyy-MM-dd H:mm:ss") + @"'
                    ,'" + tache.closed_on.ToString("yyyy-MM-dd H:mm:ss") + @"'

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

            return new JsonResult("Added Successfully");
        }


        [HttpPut("{id}")]
        public JsonResult Put(Table task, int id)
        {
            string query = @"
                           update dashboard.task
                           set  
                               firstname= @firstname,
                               name= @name,
                               subject= @subject,
                               issue_status= @issue_status,
                               description= @description,
                               created_on= @created_on,
                               closed_on= @closed_on
                            where id = '" + id + @"' 
                             ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@firstname", task.firstname);
                    myCommand.Parameters.AddWithValue("@name", task.name);
                    myCommand.Parameters.AddWithValue("@subject", task.subject);
                    myCommand.Parameters.AddWithValue("@issue_status", task.issue_status);
                    myCommand.Parameters.AddWithValue("@description", task.description);
                    myCommand.Parameters.AddWithValue("@created_on", task.created_on);
                    myCommand.Parameters.AddWithValue("@closed_on", task.closed_on);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dashboard.task
                    where id = " + id + @" 
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
