using KOCMOC.Server.Models.Interfaces;

namespace KOCMOC.Server.Models.Entities
{
  public class Show : IAuditableEntity
  {
    public int Id { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public string? ImageURL { get; set; }

    public Show(string title)
    {
      Title = title;
    }
  }
}