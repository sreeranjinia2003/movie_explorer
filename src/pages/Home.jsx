import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import {searchMoviesAPI, getMovieDetailsAPI} from '../api/movieApi'

function Home() {

  const [movies, setMovies] = useState([])
  
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  const handleSearch = async (movieName) => {

    setError("")
    setMovies([])
    setSearched(true)

    try {

      // First API call - search movies
      const searchData = await searchMoviesAPI(movieName)

      if (searchData.Response === "False") {
        setError("Movie not found. Try searching for another movie!")
      
        return
      }

      // Second API call - get complete details
      const movieDetails = await Promise.all(
        searchData.Search.map(async (movie) => {

          try {
            const details = await getMovieDetailsAPI(movie.imdbID)
            return details
          } catch (error) {
            console.log("Error getting movie details:", error)
            return null
          }

        })
      )

      const validMovies = movieDetails.filter(
        (movie) => movie !== null
      )

      setMovies(validMovies)

    } catch (error) {

      console.log(error)

      setError(
        "Something went wrong while fetching movies. Please try again."
      )

    } 
  }

  return (
    <div>

      <SearchBar onSearch={handleSearch} />

      <main className="home-container">

        {!searched && (
          <section className="welcome-section">

            <h1><i class="fa-solid fa-clapperboard" style={{color:'purple'}}></i> Discover Your Favorite Movies</h1>

            <p>
              Search for a movie and explore its details.
            </p>

          </section>
        )}

       

        {error && (
          <div className="message error-message">
            <h2>{error}</h2>
          </div>
        )}

        { !error && movies.length > 0 && (

          <section>

            <h2 className="results-title">
              Search Results
            </h2>

            <div className="movie-grid">

              {movies.map((movie) => (<MovieCard key={movie.imdbID} movie={movie}/>))}

            </div>

          </section>

        )}

      </main>

    </div>
  )
}

export default Home