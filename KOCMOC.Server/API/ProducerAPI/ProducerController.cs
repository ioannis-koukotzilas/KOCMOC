using KOCMOC.Server.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace KOCMOC.Server.API.ProducerAPI
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProducerController : ControllerBase
  {
    private readonly ProducerService _producerService;
    private readonly ILogger<ProducerController> _logger;

    public ProducerController(ProducerService producerService, ILogger<ProducerController> logger)
    {
      _producerService = producerService;
      _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Producer>>> GetAllAsync()
    {
      try
      {
        var producers = await _producerService.GetAllAsync();
        return Ok(producers);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while fetching all producers: {ErrorMessage}", ex.Message);
        return StatusCode(500, "An error occurred while fetching all producers");
      }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Producer>> GetByIdAsync(int id)
    {
      try
      {
        var producer = await _producerService.GetByIdAsync(id);
        if (producer == null)
        {
          return NotFound();
        }
        return Ok(producer);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while fetching the producer with ID {id}: {ErrorMessage}", id, ex.Message);
        return StatusCode(500, $"An error occurred while fetching the producer with ID {id}");
      }
    }

    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] Producer producer)
    {
      try
      {
        await _producerService.AddAsync(producer);
        return Ok(producer);
      }
      catch (ArgumentException ex)
      {
        _logger.LogError(ex, "Invalid data provided: {ErrorMessage}", ex.Message);
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while adding a new producer: {ErrorMessage}", ex.Message);
        return StatusCode(500, "An error occurred while adding the new producer");
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAsync(int id, Producer producer)
    {
      try
      {
        if (id != producer.Id)
        {
          return BadRequest();
        }

        await _producerService.UpdateAsync(id, producer);
        var updatedProducer = await _producerService.GetByIdAsync(id);
        return Ok(updatedProducer);
      }
      catch (KeyNotFoundException ex)
      {
        _logger.LogError(ex, "Producer not found: {ErrorMessage}", ex.Message);
        return NotFound(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while updating the producer with ID {id}: {ErrorMessage}", id, ex.Message);
        return StatusCode(500, $"An error occurred while updating the producer with ID {id}");
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
      try
      {
        await _producerService.DeleteAsync(id);
        return Ok(new { message = $"Producer with ID {id} has been deleted." });
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while deleting the producer with ID {id}: {ErrorMessage}", id, ex.Message);
        return StatusCode(500, "An error occurred while deleting the producer");
      }
    }
  }
}