using bloglist_fullstack.Models;
using bloglist_fullstack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace bloglist_fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;

        public UsersController(UserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        // GET: api/<UsersController>
        [HttpGet]
        [Authorize]
        public async Task<User> GetUser()
        {
            if (User.Identity?.Name == null)
                throw new ArgumentNullException();
            return await _userService.GetUser(User.Identity.Name);
        }

        [HttpGet("all")]
        [Authorize]
        public async Task<List<User>> GetAllUsers()
        {
            return await _userService.GetAllUsers();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginForm loginForm)
        {
            var result = await _userService.ValidateUser(loginForm.username, loginForm.password);
            if (result.IsSuccess)
            {
                string token = _jwtService.GenerateToken(loginForm.username);
                Response.Cookies.Append("X-Access-Token", token); // 把 token 塞進 cookie (如果有)
                return Ok(new ResponseModel(true, "", token));
            }
            return BadRequest(result);
        }

        public class LoginForm
        {
            public string username { get; set; } = "";
            public string password { get; set; } = "";
        }

        // GET api/<UsersController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> PostAsync(string username, string password, string name)
        {
            var result = await _userService.CreateUser(username, password, new User { name = name });
            if (result.IsSuccess)
                return Ok(result);
            else
                return BadRequest(result);
        }

        // PUT api/<UsersController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<UsersController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
