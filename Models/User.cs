namespace CSHARP_FishingApp.Models
{
    public class User : Entity
    {
        public string? email { get; set; }
        public string? password { get; set; }
        public string? first_name { get; set; }
        public string? last_name { get; set; }
        public string? role { get; set; }
        public string? oib { get; set; }
        public string? license_number { get; set; }
    }
}
