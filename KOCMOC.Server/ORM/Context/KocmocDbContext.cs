using KOCMOC.Server.Models.Entities;
using KOCMOC.Server.Models.Interfaces;
using KOCMOC.Server.ORM.Configurations;
using Microsoft.EntityFrameworkCore;

namespace KOCMOC.Server.ORM.Context
{
  public class KocmocDbContext : DbContext
  {
    private readonly IConfiguration _configuration;

    public DbSet<Producer> Producers { get; set; } = null!;
    public DbSet<Show> Shows { get; set; } = null!;
    public DbSet<Episode> Episodes { get; set; } = null!;

    public KocmocDbContext(IConfiguration configuration)
    {
      _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.ApplyConfiguration(new ProducerConfiguration());
      modelBuilder.ApplyConfiguration(new ShowConfiguration());
      modelBuilder.ApplyConfiguration(new EpisodeConfiguration());

      base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        var connectionString = _configuration.GetConnectionString("KocmocDb");
        optionsBuilder.UseSqlServer(connectionString);
      }

      base.OnConfiguring(optionsBuilder);
    }

    public override int SaveChanges()
    {
      SetAuditFields();
      return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
      SetAuditFields();
      return base.SaveChangesAsync(cancellationToken);
    }

    private void SetAuditFields()
    {
      foreach (var entry in ChangeTracker.Entries())
      {
        if (entry.Entity is IAuditableEntity auditableEntity)
        {
          switch (entry.State)
          {
            case EntityState.Added:
              auditableEntity.CreatedDate = DateTime.UtcNow;
              break;

            case EntityState.Modified:
              auditableEntity.ModifiedDate = DateTime.UtcNow;
              break;
          }
        }
      }
    }
  }
}