import './App.css'

import { useMovies } from './hocks/useMovies'
import { Movies } from './components/movies'
import { useEffect, useState, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
//custom Hock 
function useSearch () {
  const isFirstInput = useRef(true)
  const [search, updateSearch] = useState('')
  const [outputError, setOutputError]= useState(null) 
  //el useEffect se usa cada ves que search cambia
  useEffect(() => {
    if (isFirstInput.current) {
      //si hay un cambio en search entonces isFirstInput = false
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setOutputError('Ingrese una pelicula')
      return 
    }
    if (search.length > 3) {
      setOutputError('la busqueda debe tener al menos 3 caracteres')
      return 
    }

    setOutputError(null)
  },[search])
  return {search, updateSearch, outputError}
}

function App() {
  
  const [sort, setSort]= useState(false)
  const {search, updateSearch, outputError} = useSearch()
  const {movies, getMovies, loading} = useMovies({search, sort})
 
  const debouncedGetMovies = useCallback(
      debounce(search=>{
        getMovies({search})
      },300)      
    , [getMovies])


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
  
  return (
    <div className='page'>
    <header>
      <form className='form' onSubmit={handlersubmit}>
        <input onChange={handlerChange} value={search} name='search' placeholder='busque su pelicula'></input>
        <input type='checkbox' onChange={handleSort} checked={sort}/>
        <button type='submit'>buscar</button>
       
      </form>
      {outputError &&  <p style={{color : 'red' }} >{outputError}</p>}
      
    </header>
    <main>
    {
      loading? <p>cargando...</p>: <Movies movies={movies} /> 
           
    }
    </main>
    </div>
  )
}

export default App
