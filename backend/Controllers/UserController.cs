using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

    IUserService userService;

    private readonly ILogger<UserController> _logger;
    private static List<User> listUser = new List<User>();
    UserContext dbcontext;
    public UserController(ILogger<UserController> logger, IUserService service, UserContext db)
    {
        _logger = logger;
        userService = service;
        dbcontext = db;
    }

    [HttpGet(Name = "GetUser")]
    public IActionResult Get()
    {
        _logger.LogInformation("Get users method was call");
        return Ok(userService.Get());
    }

    [HttpPost]
    public IActionResult Post([FromBody] User user)
    {
        _logger.LogInformation(user.Name);
        userService.Save(user);
        return Ok();
    }

    [HttpPost]
    [Route("createdatabase")]
    public IActionResult CreateDatabase()
    {
        dbcontext.Database.EnsureCreated();
        return Ok();
    }


    [HttpPut("{id}")]
    public IActionResult Put(Guid id, [FromBody] User user)
    {
        userService.Update(id, user);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        userService.Delete(id);
        return Ok();
    }

}
