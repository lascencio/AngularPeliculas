using back_end.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Utilidades
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Paginar<T>(this IQueryable<T> queryable, PaginaciónDTO paginaciónDTO)
        {
            return queryable
                .Skip((paginaciónDTO.Pagina - 1) * paginaciónDTO.RecordsPorPagina)
                .Take(paginaciónDTO.RecordsPorPagina);
        }
    }
}
