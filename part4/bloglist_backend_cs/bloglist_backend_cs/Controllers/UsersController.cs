using bloglist_backend_cs.Models;
using bloglist_backend_cs.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace bloglist_backend_cs.Controllers
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
        [HttpGet("all")]
        [Authorize]
        public async Task<List<User>> GetAllUsers()
        {
            return await _userService.GetAllUsers();
        }

        [HttpPost("/api/login")]
        public async Task<IActionResult> Login(string userName, string password)
        {
            var result = await _userService.ValidateUser(userName, password);
            if (result.IsSuccess)
            {
                return Ok(new ResponseModel(true, "", _jwtService.GenerateToken(userName)));
            }
            return BadRequest(result);
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
            var result = await _userService.CreateUser(username, password, new User{name = name});
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
