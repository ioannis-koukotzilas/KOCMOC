using KOCMOC.Server.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace KOCMOC.Server.API.ProducerAPI
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProducerController : ControllerBase
  {
    private readonly ProducerService _producerService;

    public ProducerController(ProducerService producerService)
    {
      _producerService = producerService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Producer>>> GetAllProducers()
    {
      var producers = await _producerService.GetAllProducersAsync();
      return Ok(producers);
    }

    // Other CRUD endpoints can be added here...

  }
}