import { useState, useCallback } from "react"
import { nowPlaying } from "../services/nowPlaying"

export function useNowPlaying() {
  const [nowPlay, setnowPlay] = useState([])
  const [load, setLoad] = useState(false)
  const [, setError] = useState(null)

  const getNowPlaying = useCallback(async () => {
      try {
          setLoad(true)
          setError(null)
          const newMovies = await nowPlaying()
          setnowPlay(newMovies)      
          return nowPlay
        } catch (e) {
          setError(e.message)
        } finally {
          //se ejecuta tanto si pasa por try como por catch
          setLoad(false)
        }
  }, [])
  return {    
    nowPlay,
    getNowPlaying,
    load
  }
}