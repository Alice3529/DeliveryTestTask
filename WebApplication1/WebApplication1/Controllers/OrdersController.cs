using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            var orders = _context.Orders.AsNoTracking().ToList();
            return Ok(orders);
        }

        [HttpPost]
        public IActionResult CreateOrder(Order order)
        {
            if (order.CargoPickupDate.Date < DateTime.Today)
            {
                return BadRequest("Дата забора груза не может быть в прошлом.");
            }

            order.OrderNumber = Guid.NewGuid();

            _context.Orders.Add(order);
            _context.SaveChanges();

            return CreatedAtAction(
                nameof(GetOrder),
                new { orderNumber = order.OrderNumber },
                order
            );
        }

        [HttpGet("{orderNumber}")]
        public IActionResult GetOrder(Guid orderNumber)
        {
            var order = _context.Orders.
                AsNoTracking().
                FirstOrDefault(o => o.OrderNumber == orderNumber);

            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }
    }
}
