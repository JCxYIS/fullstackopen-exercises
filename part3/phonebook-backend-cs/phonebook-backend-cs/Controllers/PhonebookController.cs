using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using phonebook_backend_cs.Models;
using phonebook_backend_cs.Services;

namespace phonebook_backend_cs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhonebookController : ControllerBase
    {
        private PhonebookService _phonebookService;

        //static List<PhonebookEntry> entries = new List<PhonebookEntry>
        //{
        //    new PhonebookEntry{id = "1", name = "Arto Hellas", number = "040-123456" },
        //    new PhonebookEntry{id = "2", name = "Ada Lovelace", number = "39-44-5323523" },
        //    new PhonebookEntry{id = "3", name = "Dan Abramov", number = "12-43-234345" },
        //    new PhonebookEntry{id = "4", name = "Mary Poppendieck", number = "39-23-6423122" },
        //};

        public PhonebookController(Services.PhonebookService phonebookService)
        {
            _phonebookService = phonebookService;
        }

        [HttpGet("/api/persons")]
        public async Task<IEnumerable<PhonebookEntry>> Get()
        {
            return await _phonebookService.GetAsync();
        }

        [HttpGet("/api/persons/{id}")]
        public async Task<IActionResult> GetOne(string id)
        {
            var result = await _phonebookService.GetAsync(id);
            if(result != null)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpDelete("/api/persons/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _phonebookService.GetAsync(id);
            if (result != null)
            {
                await _phonebookService.RemoveAsync(id);
                return Ok();
            }
            else
                return NotFound();
        }

        [HttpPut("/api/persons/{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]PhonebookEntry entry)
        {
            var result = await _phonebookService.GetAsync(id);
            if (result != null)
            {
                await _phonebookService.UpdateAsync(id, entry);
                return Ok();
            }
            else
                return NotFound();
        }

        [HttpPost("/api/persons")]
        public async Task<IActionResult> PostAsync([FromBody] PhonebookEntry entry)
        {
            if (entry == null)
                return BadRequest("You sent an empty body");
            if(string.IsNullOrWhiteSpace(entry.name) || string.IsNullOrWhiteSpace(entry.number))
                return BadRequest("Required field is missing");
            if(await _phonebookService.GetWithNameAsync(entry.name) != null)
                return BadRequest("Name must be unique");

            // new id
            entry.id = new Random().Next().ToString();

            // add
            await _phonebookService.CreateAsync(entry);
            return Ok();
        }

        [HttpGet("/info")]
        public async Task<IActionResult> InfoAsync()
        {
            var entries = await _phonebookService.GetAsync();
            return Ok($"Phonebook has info for {entries.Count} people\n{DateTime.Now}");
        }
    }
}
