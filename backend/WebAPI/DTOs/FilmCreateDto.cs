namespace WebAPI.DTOs
{
    public class FilmCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int time { get; set; } 
        public int year { get; set; }
        public int DirectorId { get; set; }
        public  string DirectorName { get; set; }
        public double rate { get; set; }
    }
}
