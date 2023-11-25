using KOCMOC.Server.Models.Interfaces;

namespace KOCMOC.Server.Models.Entities
{
  public class Episode : IAuditableEntity
  {
    public int Id { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime? AirDate { get; set; }
    public string? Location { get; set; }
    public string? ImageURL { get; set; }
    public string? TrackURL { get; set; }

    public Episode(string title)
    {
      Title = title;
    }
  }
}