 
function ListOfMovies({ movies }){
    return (
        <section className="movies px-5 py-5">
            {movies.map(movie =>(
                <article className="movie" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p hidden>{movie.id}</p>
                    <img           
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                 
                    alt={movie.title} 
                   />
                </article>
            ))}
        </section>
    )

}
 
function NoMoviesResult(){
    return (       
        <p> no se encontraronn Peliculas </p> 
         
    )
}
export function Movies ({ movies }) {
  const hastMovies = movies?.length > 0
  return (
    hastMovies
    ? <ListOfMovies movies={movies} />
    : <NoMoviesResult />
  )
}
 

 