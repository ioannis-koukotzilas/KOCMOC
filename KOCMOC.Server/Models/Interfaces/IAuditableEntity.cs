namespace KOCMOC.Server.Models.Interfaces
{
  public interface IAuditableEntity
  {
    DateTime CreatedDate { get; set; }
    DateTime? ModifiedDate { get; set; }
  }
}