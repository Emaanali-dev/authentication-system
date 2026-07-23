using Authentication.Models;
using Microsoft.AspNetCore.Mvc;
using Authentication.Services;

namespace Authentication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var result = await _authService.RegisterUser(model);

            if (result.Succeeded)
                return Ok(new { Message = result.Message });

            return BadRequest(result.Errors.Select(e => new { description = e }));
        }
    }
}