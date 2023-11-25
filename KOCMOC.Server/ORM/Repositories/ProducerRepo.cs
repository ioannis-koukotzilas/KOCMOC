using KOCMOC.Server.Models.Entities;
using KOCMOC.Server.ORM.Context;
using Microsoft.EntityFrameworkCore;

namespace KOCMOC.Server.ORM.Repositories
{
  public class ProducerRepo : IEntityRepo<Producer>
  {
    private readonly KocmocDbContext _dbContext;

    public ProducerRepo(KocmocDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    public async Task<IList<Producer>> GetAllAsync()
    {
      var dbProducers = await _dbContext.Producers.ToListAsync();
      return dbProducers;
    }

    public async Task<Producer?> GetByIdAsync(int id)
    {
      var dbProducer = await _dbContext.Producers.SingleOrDefaultAsync(p => p.Id == id);
      return dbProducer;
    }

    public async Task AddAsync(Producer entity)
    {
      if (entity.Id != 0)
      {
        throw new ArgumentException("Given entity should not have an ID set", nameof(entity));
      }

      await _dbContext.AddAsync(entity);
      await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(int id, Producer entity)
    {
      var dbProducer = await _dbContext.Producers.SingleOrDefaultAsync(p => p.Id == id);

      if (dbProducer == null)
      {
        throw new KeyNotFoundException($"ID: '{id}' was not found in the database");
      }

      dbProducer.Name = entity.Name;
      dbProducer.Description = entity.Description;
      dbProducer.ImageURL = entity.ImageURL;
      dbProducer.ProducerRole = entity.ProducerRole;
      dbProducer.ProducerStatus = entity.ProducerStatus;

      // Note: ModifiedDate is automatically set in SaveChangesAsync() due to IAuditableEntity implementation.

      await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
      var dbProducer = await _dbContext.Producers.SingleOrDefaultAsync(p => p.Id == id);

      if (dbProducer == null)
      {
        throw new KeyNotFoundException($"ID: '{id}' was not found in the database");
      }

      _dbContext.Remove(dbProducer);
      await _dbContext.SaveChangesAsync();
    }
  }
}