﻿using System.ComponentModel.DataAnnotations;

namespace back_end.DTOs
{
    public class CredencialesUsuario
    {
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
