using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models;

public class User
{
    // public DateTime Date { get; set; }

    public Guid UserId { get; set; }
    public int Age { get; set; }
    public string? Name { get; set; }
    public string? Lastname { get; set; }
    public string? Gender { get; set; }
    public string? Country { get; set; }
    public string? ReasonForTrip { get; set; }
    public string? Whomeetus { get; set; }
    public DateTime? Birthday { get; set; }
}
