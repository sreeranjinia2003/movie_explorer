import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieDetailsAPI } from '../api/movieApi'

function MovieDetails() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {

    const getMovieDetails = async () => {

      try {

        const data = await getMovieDetailsAPI(id)

        if (data.Response === "False") {
          setError("Movie details not found.")
          return
        }

        setMovie(data)

      } catch (error) {

        console.log(error)

      }
    }

    getMovieDetails()

  }, [id])


  if (error) {
    return (
      <div className="message error-message">

        <h2>
           {error}
        </h2>

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Search
        </button>

      </div>
    )
  }

  // Don't show any loading message
  if (!movie) {
    return null
  }


  return (

    <div className="details-page">

      <button className="back-button" onClick={() => navigate("/")}>
        Back to Search
      </button>

      <div className="details-container">

        <div className="details-poster-section">

          <img
            src={movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster"}
            alt={movie.Title}
            className="details-poster"
          />

        </div>

        <div className="details-content">

          <h1>{movie.Title}</h1>

          <div className="details-rating">
            <i className="fa-solid fa-star"></i> {movie.imdbRating}
          </div>

          <h6>Release Year: {movie.Year}</h6>

          <h5>Genre: {movie.Genre}</h5>

          <h6>Director: {movie.Director}</h6>

          <h6>Actors: {movie.Actors}</h6>

          <h6>Runtime: {movie.Runtime}</h6>

          <h6>Language: {movie.Language}</h6>

          <h6>Awards: {movie.Awards}</h6>


          <div className="plot-section">

            <h2>Plot</h2>

            <p>
              {movie.Plot}
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default MovieDetails