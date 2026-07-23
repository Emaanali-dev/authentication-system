using Authentication.Models;
using Microsoft.AspNetCore.Identity;

namespace Authentication.Services
{
    public class AuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        public AuthService(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<(bool Succeeded, string Message, IEnumerable<string> Errors)> RegisterUser(RegisterModel model)
        {
            var user = new IdentityUser
            {
                UserName = model.FullName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
                return (true, "User registered successfully", Enumerable.Empty<string>());

            return (false, "Registration failed", result.Errors.Select(e => e.Description));
        }
    }
}