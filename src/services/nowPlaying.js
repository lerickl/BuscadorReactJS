export const nowPlaying= async()=>{
  try{
    

    const option= {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjExZjljOTAyZTcxNmI5OWE1NDM0NWVhY2MyZjA1OCIsInN1YiI6IjY1N2VhYzY2OGYyNmJjMzIzMjc1MThjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V0gvQo1ukw4kK7jCObNTq0btQ_WjUHhwyfR8kOvYEsA'
      }
    }
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,option);
    const json = await response.json() 
    const movies = json.results
    const top10Movies= movies.slice(0,10)
  
    return top10Movies?.map(movies =>({
      id: movies.id,
      title: movies.title,
      release_date: movies.release_date,
      poster_path: movies.poster_path,

    }))

    
  }catch(e)
  {
    throw new Error('error en el top 10 de peliculas')
  } 
}