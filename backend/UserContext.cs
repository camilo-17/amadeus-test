using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend;

public class UserContext : DbContext
{
    public DbSet<User> Users { get; set; }

    public UserContext(DbContextOptions<UserContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // modelBuilder.Entity<User>().ToTable("User");
        List<User> usersInit = new List<User>();

        usersInit.Add(new User() { UserId = Guid.Parse("fe2de405-c38e-4c90-ac52-da0540dfb4ef"), Name = "Camilo", Lastname = "Caro", Age = 12, Gender = "Masculino", Country = "Colombia", ReasonForTrip = "is cool", Whomeetus = "Friend" });

        modelBuilder.Entity<User>(user =>
        {
            user.ToTable("User");
            user.HasKey(p => p.UserId);
            user.Property(p => p.Name).IsRequired().HasMaxLength(50);
            user.Property(p => p.Lastname).IsRequired().HasMaxLength(50);
            user.Property(p => p.Age).IsRequired().HasMaxLength(2);
            user.Property(p => p.Gender).IsRequired().HasMaxLength(10);
            user.Property(p => p.Country).IsRequired().HasMaxLength(50);
            user.Property(p => p.ReasonForTrip).IsRequired().HasMaxLength(100);
            user.Property(p => p.Whomeetus).IsRequired().HasMaxLength(40);
            user.Property(p => p.Birthday).IsRequired(false);

            user.HasData(usersInit);

        });

    }

}