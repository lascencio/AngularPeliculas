using Microsoft.AspNetCore.Identity;

namespace back_end.Entidades
{
    public class Rating
    {
        public int Id { get; set; }
        public int Puntuacion { get; set; }
        public int peliculaId { get; set; }
        public Pelicula Pelicula { get; set; }
        public string UsuarioId { get; set; }
        public IdentityUser Usuario { get; set; }
    }
}
