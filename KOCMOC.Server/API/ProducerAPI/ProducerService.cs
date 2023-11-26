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

    public Task<IList<Producer>> GetAllAsync()
    {
      return _producerRepo.GetAllAsync();
    }

    public Task<Producer?> GetByIdAsync(int id)
    {
      return _producerRepo.GetByIdAsync(id);
    }

    public Task AddAsync(Producer producer)
    {
      return _producerRepo.AddAsync(producer);
    }

    public Task UpdateAsync(int id, Producer producer)
    {
      return _producerRepo.UpdateAsync(id, producer);
    }

    public Task DeleteAsync(int id)
    {
      return _producerRepo.DeleteAsync(id);
    }
  }
}