import {React, useState, useEffect} from 'react'
import './Row.css'
import axios from './axios'

function Row({title, fetchUrl, isLargeRow = false}) {   //by default islargeRow is false
    const [movies, setMovies] = useState([])

    const base_url = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await axios.get(fetchUrl)
                setMovies(request.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    // console.log(movies)

  return (
    <div className="row">
        <h2>{title}</h2>

        <div className="row__posters">
            {movies.map((movie) => (
                // only display if poster path and backdrop path are defined
                (isLargeRow && movie.poster_path || !isLargeRow && movie.backdrop_path) && (
                    <img 
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} 
                        key={movie.id}
                    />
                )
            ))}
        </div>
    </div>
  )
}

export default Row