using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Order
    {
        public int Id { get; set; }

        [Required]
        public string SenderCity { get; set; } = null!;

        [Required]
        public string RecipientCity { get; set; } = null!;

        [Required]
        public string SenderAddress { get; set; } = null!;

        [Required]
        public string RecipientAddress { get; set; } = null!;

        [Range(0.01, double.MaxValue)]
        public decimal Weight { get; set; }

        public DateTime CargoPickupDate { get; set; }
        public Guid OrderNumber { get; set; }
    }
}
