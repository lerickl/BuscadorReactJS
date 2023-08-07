/* eslint-disable no-unused-vars */
import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'
//import withResults from '../mocks/with-result.json'
//import withoutResult from '../mocks/no-results.json'

export function useMovies({search, sort}){
  const [movies, setMovies] = useState([])
  
  const [loading, setLoading] = useState(false)
  const [error, setError]=useState(null)
  const previewSerch= useRef();

    const getMovies = useCallback( async({search}) =>{
    
        if(search===previewSerch.current)return
        try {
          setLoading(true)
          setError(null)
          previewSerch.current = search
          const newMovies = await searchMovies({search})
          setMovies(newMovies)  
          
        } catch (e) {
          setError(e.message)
        } finally {
          //se ejecuta tanto si pasa por try como por catch
          setLoading(false)
        }      
      
    }, [])

    const sortedMovies = useMemo(()=>{
      return sort? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies
    },[sort, movies])
    return  { movies: sortedMovies, getMovies, loading } 
  }