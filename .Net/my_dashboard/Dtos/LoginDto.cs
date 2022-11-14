namespace my_dashboard.Dtos
{
    public class LoginDto
    {
        internal string hashed_password;

        public string login { get; set; }
        public string password { get; set; }

    }
}
