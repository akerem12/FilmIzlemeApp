namespace WebAPI.DTOs
{
    public class ReviewCreateDto
    {
        public int FilmId { get; set; }
        public int UserId { get; set; }
        public string Comment { get; set; } = null!;
        public int Rating { get; set; }
    }
}
