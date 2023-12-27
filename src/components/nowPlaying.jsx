
function ListOfNowPlaying({ nowPlaying }) {
  return(
    <section className='content'>
      {nowPlaying.map(movie =>(
        <article key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} width={240}/>
        </article>
      ))}
    </section>
  )
}
 
function NoNowPlayingResult(){
  return (       
      <p> no se encontraronn now play </p> 
       
  )
}
export function NowPlaying({ nowPlaying }) {
  const hasNowPlaying = nowPlaying?.length > 0
  return (
    hasNowPlaying
    ? <ListOfNowPlaying nowPlaying={nowPlaying} />
    : <NoNowPlayingResult />
  )
}