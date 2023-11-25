using KOCMOC.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KOCMOC.Server.ORM.Configurations
{
  public class ShowConfiguration : IEntityTypeConfiguration<Show>
  {
    public void Configure(EntityTypeBuilder<Show> builder)
    {
      builder.ToTable("Show");
      builder.HasKey(s => s.Id);
      builder.Property(s => s.Id).ValueGeneratedOnAdd();
      builder.Property(s => s.CreatedDate).IsRequired();
      builder.Property(s => s.ModifiedDate);
      builder.Property(s => s.Title).IsRequired().HasMaxLength(500);
      builder.Property(s => s.Description).HasMaxLength(1000);
      builder.Property(s => s.ImageURL).HasMaxLength(500);
    }
  }
}