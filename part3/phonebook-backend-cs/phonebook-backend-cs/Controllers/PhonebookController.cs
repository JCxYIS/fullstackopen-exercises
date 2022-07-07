using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace phonebook_backend_cs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhonebookController : ControllerBase
    {
        static List<PhonebookEntry> entries = new List<PhonebookEntry>
        {
            new PhonebookEntry{id = 1, name = "Arto Hellas", number = "040-123456" },
            new PhonebookEntry{id = 2, name = "Ada Lovelace", number = "39-44-5323523" },
            new PhonebookEntry{id = 3, name = "Dan Abramov", number = "12-43-234345" },
            new PhonebookEntry{id = 4, name = "Mary Poppendieck", number = "39-23-6423122" },
        };

        [HttpGet("/api/persons")]
        public IEnumerable<PhonebookEntry> Get()
        {
            return entries;
        }

        [HttpGet("/api/persons/{id}")]
        public IActionResult GetOne(int id)
        {
            var result = entries.Find(e => e.id == id);
            if(result != null)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpDelete("/api/persons/{id}")]
        public IActionResult Delete(int id)
        {
            var result = entries.Find(e => e.id == id);
            if (result != null)
            {
                entries.Remove(result);
                return Ok();
            }
            else
                return NotFound();
        }

        [HttpPost("/api/persons")]
        public IActionResult Post([FromBody] PhonebookEntry entry)
        {
            if (entry == null)
                return BadRequest("You sent an empty body");
            if(string.IsNullOrWhiteSpace(entry.name) || string.IsNullOrWhiteSpace(entry.number))
                return BadRequest("Required field is missing");
            if(entries.Find(e=> e.name == entry.name) != null)
                return BadRequest("Name must be unique");

            // new id
            entry.id = new Random().Next();

            // add
            entries.Add(entry);
            return Ok();
        }

        [HttpGet("/info")]
        public IActionResult Info()
        {
            return Ok($"Phonebook has info for {entries.Count} people\n{DateTime.Now}");
        }
    }
}
