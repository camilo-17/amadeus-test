using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

    private readonly ILogger<UserController> _logger;
    private static List<User> listUser = new List<User>();

    public UserController(ILogger<UserController> logger)
    {
        _logger = logger;

        if(listUser == null || !listUser.Any()) {
            listUser = Enumerable.Range(1, 5).Select(index => new User
            {
                Age = 12 + index,
                Name = "camilo",
                Lastname = "caro"
            })
            .ToList();
        }
    }

    [HttpGet(Name = "GetUser")]
    public IEnumerable<User> Get()
    {
        _logger.LogInformation("Get users method was call");
        return listUser;
    }

    [HttpPost]
    public IActionResult Post(User User)
    {
        listUser.Add(User);

        return Ok();
    }

    [HttpDelete("{index}")]
    public IActionResult Delete(int index)
    {
        listUser.RemoveAt(index);
        return Ok();
    }
}
