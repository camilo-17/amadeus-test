namespace backend.Services;
using backend.Models;

public class UserService : IUserService
{
    UserContext context;

    public UserService(UserContext dbcontext)
    {
        context = dbcontext;
    }

    public IEnumerable<User> Get()
    {
        return context.Users;
    }

    public void Save(User user)
    {
        // user.CreationDate = DateTime.Now;
        context.Add(user);
        context.SaveChanges();
    }

    public void Update(Guid id, User user)
    {
        var UserActual = context.Users.Find(id);

        if (UserActual != null)
        {
            UserActual.Name = user.Name;
            UserActual.Lastname = user.Lastname;
            UserActual.Gender = user.Gender;
            UserActual.Country = user.Country;
            UserActual.ReasonForTrip = user.ReasonForTrip;
            UserActual.Whomeetus = user.Whomeetus;
            UserActual.Birthday = user.Birthday;
        }
        context.SaveChanges();
    }

    public void Delete(Guid id)
    {
        var UserActual = context.Users.Find(id);

        if (UserActual != null)
        {
            context.Remove(UserActual);
            context.SaveChanges();
        }
    }

}

public interface IUserService
{
    IEnumerable<User> Get();
    void Save(User user);
    void Update(Guid id, User user);
    void Delete(Guid id);
}