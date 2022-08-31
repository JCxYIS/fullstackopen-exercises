using bloglist_fullstack.Models;
using MongoDB.Driver;
using System.Security.Cryptography;
using System.Text;

namespace bloglist_fullstack.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(DatabaseService database)
        {
            _users = database.Database.GetCollection<User>("Users");
        }

        /// <summary>
        /// Create a user in DB.
        /// </summary>
        /// <param name="userData">Initial User Data, id, password will be overwritten</param>
        /// <returns></returns>
        public async Task<ResponseModel> CreateUser(string userName, string password, User? userData = null)
        {
            // validate
            if (userName.Length < 3)
                return new ResponseModel(false, "Username must be at least 3 characters long");
            if (password.Length < 3)
                return new ResponseModel(false, "Password must be at least 3 characters long");
            if ((await _users.FindAsync(u => u.username == userName)).Any())
                return new ResponseModel(false, "User with that username already exists");

            // new user model
            User user = userData == null ? new User() : userData;
            string salt = GetRandomString(new Random().Next(8, 12)); // salt
            user.id = "";
            user.username = userName;
            user.passwordHash = GetSHA256(salt + password);
            user.passwordSalt = salt;

            // insert to db
            await _users.InsertOneAsync(user);
            return new ResponseModel(true, "");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<ResponseModel<User>> ValidateUser(string userName, string password)
        {
            var user = (await _users.FindAsync(u => u.username == userName)).FirstOrDefault();
            if (user == null)
            {
                return new ResponseModel<User>(false, "No such account");
            }
            if (user.passwordHash != GetSHA256(user.passwordSalt + password))
            {
                // wrong psw
                return new ResponseModel<User>(false, "Wrong password");
            }

            // success
            return new ResponseModel<User>(true, "", user);
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _users.Find(_ => true).ToListAsync();
        }

        public async Task<User> GetUser(string userName)
        {
            return await _users.Find(u => u.username == userName).FirstOrDefaultAsync();
        }

        //----------------------------------------------------

        public string GetSHA256(string data)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(data);
            byte[] hash = SHA256.Create().ComputeHash(bytes);

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                builder.Append(hash[i].ToString("X2"));
            }

            return builder.ToString().ToLower();
        }

        public string GetRandomString(int length)
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[length];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            return new String(stringChars);
        }
    }
}
