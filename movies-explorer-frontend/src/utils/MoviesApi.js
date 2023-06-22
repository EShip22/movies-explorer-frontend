class MoviesApi {
  constructor(options) {
    this._beatFilmMovies = options.beatFilmMovies;
  }

  getFilms() {
    return (
      fetch(this._beatFilmMovies)
        .then(res => res.json())
    )
  }

}

export const moviesApi = new MoviesApi({
  beatFilmMovies: 'https://api.nomoreparties.co/beatfilm-movies'
});