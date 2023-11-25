using KOCMOC.Server.Models.Interfaces;
using KOCMOC.Server.Models.Enums;

namespace KOCMOC.Server.Models.Entities
{
  public class Producer : IAuditableEntity
  {
    public int Id { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string? ImageURL { get; set; }
    public ProducerRole ProducerRole { get; set; }
    public ProducerStatus ProducerStatus { get; set; }

    public Producer(string name)
    {
      Name = name;
    }
  }
}