using KOCMOC.Server.Models.Entities;
using KOCMOC.Server.ORM.Repositories;

namespace KOCMOC.Server.API.ProducerAPI
{
  public class ProducerService
  {
    private readonly IEntityRepo<Producer> _producerRepo;

    public ProducerService(IEntityRepo<Producer> producerRepo)
    {
      _producerRepo = producerRepo;
    }

    public Task<IList<Producer>> GetAllProducersAsync()
    {
      return _producerRepo.GetAllAsync();
    }

    // Other methods for CRUD operations can be added here...
  }
}