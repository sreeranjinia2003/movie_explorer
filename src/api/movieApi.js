import axios from 'axios'

const API_KEY = "af55e318"

export const searchMoviesAPI = async (movieName) => {
  const response = await axios.get(
    `https://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=${API_KEY}`
  )

  return response.data
}

export const getMovieDetailsAPI = async (imdbID) => {
  const response = await axios.get(
    `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
  )

  return response.data
}