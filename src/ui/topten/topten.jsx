import { useState } from 'react'
import styles from './topten.module.css'
import React from 'react'
import { LeftArrow, RightArrow } from '../icons'
const MAX_VISIBILITY= 3 
 
const Carousel=({children})=>{
  const [active, setActive]=useState(2)
  const count = React.Children.count(children)
  return (
    <div className={styles.carousel}>
      {
        active>0 && <button className={`${styles.nav} ${styles.left}`} onClick={()=>setActive(i=> i-1)}><LeftArrow/></button>
      }
      {
        React.Children.map(children, (child, i)=>(
          <article className={styles.cardContainer}
            style={{
              '--active': i=== active?  1:0,
              '--offset': (active - i)/3,
              '--direction': Math.sign(i - active),
              '--abs-offset': Math.abs(i - active)/3,
              'pointerEvents': active===i? 'auto':'none',
              'opacity': Math.abs(active-i)>MAX_VISIBILITY? '0':'1',
              'display': Math.abs(active-i)>MAX_VISIBILITY? 'none' : 'block',

            }}>
            {child}
            </article>
        ))
      }
      {
        active<count-1 && <button className={`${styles.nav} ${styles.right}`} onClick={()=>setActive(i=> i+1)}><RightArrow/></button>
      }
    </div>
  )
}
 
export default function TopTen({nowPlaying}){
 
  return (
    <section className={styles.section} >
      <h1>Ultimos Estrenos</h1>
      <Carousel>
      {nowPlaying.map(movie =>(
        <div className={styles.card} key={movie.id}>
          <h3>{movie.title}</h3>       
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} width={240}/>
          <p>{movie.release_date}</p>
        </div>
      ))}
      </Carousel>
    </section>
  )
}