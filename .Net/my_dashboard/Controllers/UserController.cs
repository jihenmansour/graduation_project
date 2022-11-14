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
using System.Security.Cryptography;
using System.Text;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{firstname}")]
        public JsonResult Get(string firstname)
        {
            string query = @"
                          select login,email,password,firstname,lastname,type,numtel,Role
                           from 
                           dashboard.user
                           where login = '" + firstname + @"'  
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

        [HttpPut("{login}")]
        public JsonResult Put(Users user, string login)
        {
            string query = @"
                           update dashboard.user
                           set 
                               email= @email,
                               firstname= @firstname,
                               lastname= @lastname,
                               numtel= @numtel,
                               Role= @Role
                            where login = '" + login + @"' 
                             ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email", user.email);
                    myCommand.Parameters.AddWithValue("@firstname", user.firstname);
                    myCommand.Parameters.AddWithValue("@lastname", user.lastname);
                    myCommand.Parameters.AddWithValue("@numtel", user.numtel);
                    myCommand.Parameters.AddWithValue("@Role", user.Role);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

    }

}

