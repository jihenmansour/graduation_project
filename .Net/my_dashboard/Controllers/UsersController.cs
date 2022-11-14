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
using System.Text;
using System.IO;
using System.Security.Cryptography;
using Microsoft.Rest.ClientRuntime.Azure.Authentication.Utilities;
using Abp;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                          select iduser,login,email,password,firstname,lastname,type,numtel,Role
                           from 
                           dashboard.user
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
        public JsonResult Post(Users user)
        {
            string sqlDataSource1 = _configuration.GetConnectionString("Default");
            MySqlConnection mycon = new MySqlConnection(sqlDataSource1) ;
            MySqlCommand cmd = new MySqlCommand("Select count(*) from dashboard.user where login = '" + user.login + @"'", mycon);
            cmd.Parameters.AddWithValue(user.login, user.login);
            mycon.Open();
            var result = Convert.ToInt32(cmd.ExecuteScalar().ToString()); 
            if (result != 0)
            {
                return new JsonResult("Utilisateur déja exist");
            }
            else
            {
                string query = @"
                    insert ignore into dashboard.user 
                    (login,email,password,firstname,lastname,numtel,Role)
                    values 
                    (
                    '" + user.login + @"'
                    ,'" + user.email + @"'
                    ,'" + (BitConverter.ToString(SHA256.Create().ComputeHash(Encoding.ASCII.GetBytes(user.password))).Replace("-", "")).ToLower() + @"'
                    ,'" + user.firstname + @"'
                    ,'" + user.lastname + @"'
                    ,'" + user.numtel + @"'
                    ,'" + user.Role + @"'


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

                return new JsonResult("Utilisateur ajouté avec succès!");
            }
        }

        [HttpPut("{login}")]
        public JsonResult Put(Users user,string login)
        {
            string query = @"
                           update dashboard.user
                           set  
                               email= @email,
                               password= @password,
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
                    myCommand.Parameters.AddWithValue("@password", (BitConverter.ToString(SHA256.Create().ComputeHash(Encoding.ASCII.GetBytes(user.password))).Replace("-", "")).ToLower());
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

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dashboard.user
                    where iduser = " + id + @" 
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


