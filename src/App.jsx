import './styles/App.css'
import styles from './styles/App.module.css'
import { useMovies } from './hocks/useMovies'
import { useNowPlaying } from './hocks/useNowPlaying'
import { Movies } from './components/movies'
 
import { useEffect, useState, useRef, useCallback } from 'react'

import debounce from 'just-debounce-it'
import TopTen from './ui/topten/topten'
 //custom Hock 
function useSearch () {
  const isFirstInput = useRef(true)
  const [search, updateSearch] = useState('')
  const [outputError, setOutputError]= useState(null) 
 
  useEffect(() => {
    if (isFirstInput.current) {
      //si hay un cambio en search entonces isFirstInput = false
      isFirstInput.current = search === ''/*si es igual => true*/
      return
    }
    if (search === '') {
      setOutputError(null)
      return 
    }
    if (search.length < 3) {
      setOutputError('la busqueda debe tener al menos 3 caracteres')
      return 
    }

    setOutputError(null)
  },[search])
  return {search, updateSearch, outputError}
}

function App() {
  
  const [sort, setSort]= useState(false)
  //          useState          useState
  const {search, updateSearch, outputError} = useSearch()
  const {movies, getMovies, loading} = useMovies({search, sort})
  const {nowPlay, getNowPlaying, load} = useNowPlaying()
 
  const debouncedGetMovies =  useCallback(
    debounce(search=>{
      getMovies({search})
    },300)      
   ,[getMovies])

  const handlersubmit = (event) =>{
    event.preventDefault()
    getMovies({search})

    /*con nativo se puede usar el siguiente codigo para obtener el search
      const {search}= Object.fromEntries(
      new window.FormData(event.target)
    )*/
 
  }
  const handleSort = ()=>{
    setSort(!sort)
  }
  const handlerChange = (event) => {
    const newSearch=event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }
  useEffect(() => {
    getNowPlaying()
  }, [])
  
  return (
    <div className='page'>
    <header className=''>      
      <form className='form px-5 py-5' onSubmit={handlersubmit}>
        <div className='flex w-full flex-wrap  gap-4' key="underlined">         
          <input 
          className={styles.input}
          onChange={handlerChange} value={search} name='search' placeholder='busque su pelicula'></input>
        </div>       
        <input className={styles.checkbox}  type='checkbox' onChange={handleSort} checked={sort} ></input>
        <button className={styles.button} type='submit'>buscar</button>
     </form>
      {outputError &&  <p className='px-5' style={{color : 'red' }} >{outputError}</p>}
      
    </header>
    <main>      
      <div>
        {
        load?
        <p className='px-5 py-5'>cargando...</p>:
          <TopTen nowPlaying={nowPlay}/> }
      </div>
      <h1>Search</h1>
      <div>        
      {
        loading?
        <p className='px-5 py-5'>cargando...</p>: 
        <Movies movies={movies} />          
      }
      </div>    
      
    </main>
    </div>
  )
}


export default App
