package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *application) routes() http.Handler {
	mux := chi.NewRouter()

	mux.Use(middleware.Recoverer)

	mux.Use(app.enableCORS)

	mux.Get("/", app.Home)
	mux.Post("/authenticate", app.Authenticate)
	mux.Get("/movies", app.AllMovies)
	mux.Get("/logout", app.LogOut)
	mux.Get("/refresh", app.RefreshToken)
	mux.Get("/movies/{id}", app.GetMovie)
	mux.Get("/movies/genres/{id}", app.AllMoviesByGenre)

	mux.Get("/genres", app.GetAllGenres)
	mux.Post("/graph", app.movieGraphQL)

	mux.Route("/admin", func(mux chi.Router) {
		mux.Use(app.authRequired)
		mux.Get("/movies", app.MovieCatalog)
		mux.Get("/movies/{id}", app.MovieForEdit)
		mux.Put("/movies/{id}", app.InsertMovie)
		mux.Patch("/movies/{id}", app.UpdateMovie)
		mux.Delete("/movies/{id}", app.DeleteMovie)
	})
	return mux
}
