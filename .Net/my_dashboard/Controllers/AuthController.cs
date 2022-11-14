using my_dashboard.Data;
using Microsoft.AspNetCore.Mvc;
using my_dashboard.Models;
using my_dashboard.Dtos;
using Org.BouncyCastle.Crypto.Generators;
using my_dashboard.Helpers;
using Microsoft.AspNetCore.Http;
using System;
using System.Text;
using System.IO;
using System.Security.Cryptography;

namespace my_dashboard.Controllers
{
    [Route(template: "api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public AuthController(IUserRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        [HttpPost(template: "login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetBylogin(dto.login);
            if (user == null) return BadRequest(error: new { message = "Utlisateur n'existe pas" });
            string hash =(BitConverter.ToString(SHA256.Create().ComputeHash(Encoding.ASCII.GetBytes(dto.password))).Replace("-", "")).ToLower();
            if (hash.Equals(user.password))
            {
                return Ok(new
                {
                    message = user.login
                });
            }

            else
            {

                return BadRequest(error: new { message = "Mot de passe incorrect" });

            }





        }
    }
}


