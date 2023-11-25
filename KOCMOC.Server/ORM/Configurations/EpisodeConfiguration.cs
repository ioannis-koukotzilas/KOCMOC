using KOCMOC.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KOCMOC.Server.ORM.Configurations
{
  public class EpisodeConfiguration : IEntityTypeConfiguration<Episode>
  {
    public void Configure(EntityTypeBuilder<Episode> builder)
    {
      builder.ToTable("Episode");
      builder.HasKey(e => e.Id);
      builder.Property(e => e.Id).ValueGeneratedOnAdd();
      builder.Property(e => e.CreatedDate).IsRequired();
      builder.Property(e => e.ModifiedDate);
      builder.Property(e => e.Title).IsRequired().HasMaxLength(500);
      builder.Property(e => e.Description).HasMaxLength(1000);
      builder.Property(e => e.AirDate);
      builder.Property(e => e.Location).HasMaxLength(250);
      builder.Property(e => e.ImageURL).HasMaxLength(500);
      builder.Property(e => e.TrackURL).HasMaxLength(500);
    }
  }
}