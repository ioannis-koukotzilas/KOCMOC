using KOCMOC.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KOCMOC.Server.ORM.Configurations
{
  public class ProducerConfiguration : IEntityTypeConfiguration<Producer>
  {
    public void Configure(EntityTypeBuilder<Producer> builder)
    {
      builder.ToTable("Producer");
      builder.HasKey(p => p.Id);
      builder.Property(p => p.Id).ValueGeneratedOnAdd();
      builder.Property(p => p.CreatedDate).IsRequired();
      builder.Property(p => p.ModifiedDate);
      builder.Property(p => p.Name).IsRequired().HasMaxLength(500);
      builder.Property(p => p.Description).HasMaxLength(1000);
      builder.Property(p => p.ImageURL).HasMaxLength(500);
      builder.Property(p => p.ProducerRole);
      builder.Property(p => p.ProducerStatus);
    }
  }
}