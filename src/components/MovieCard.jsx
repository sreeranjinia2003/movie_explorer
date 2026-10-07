import React from 'react'
import { Link } from 'react-router-dom'

function MovieCard({ movie }) {

  return (
    <div className="movie-card">

      <Link
        to={`/movie/${movie.imdbID}`}
        className="movie-card-link"
      >

        <div className="poster-container">

          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Poster"
            }
            alt={movie.Title}
            className="movie-poster"
          />

        </div>

        <div className="movie-card-content">

          <h2>{movie.Title}</h2>

          <p className="movie-year">
             {movie.Year}
          </p>

          <p className="movie-rating">
            ⭐ {movie.imdbRating}
          </p>

          <p className="movie-plot">
            {movie.Plot}
          </p>

        </div>

      </Link>

    </div>
  )
}

export default MovieCard