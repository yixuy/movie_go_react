package repository

import (
	"backend/internal/models"
	"database/sql"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	AllMovies() ([]*models.Movie, error)
	GetOneMovie(ID int) (*models.Movie, error)
	GetOneMovieEdit(ID int) (*models.Movie, []*models.Genre, error)

	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(ID int) (*models.User, error)
	AllGenres() ([]*models.Genre, error)
}
