function ListOfMovies({ movies }){
    return (
        <ul className="movies">
            {movies.map(movie =>(
                <li className="movie" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.title}/>
                </li>
            ))}
        </ul>
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
 

 