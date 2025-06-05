import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Movie = () => {
  const [movie, setMovie] = useState({});
  let { id } = useParams();

  useEffect(() => {
    //     let myMovie = {
    //     id: 1,
    //     title: "Highlander",
    //     release_date: "1986-03-07",
    //     runtime: 116,
    //     mpaa_rating: "R",
    //     description: "Some long description",
    //   }
    //   setMovie(myMovie);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`/movies/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (movie.Genres) {
    console.log(movie);
    movie.genres = Object.values(movie.Genres);
  } else {
    movie.Genres = [];
  }
  return (
    <div className="text-center">
      <h2> Movie: {movie.title} </h2>
      <small>
        {movie.Genres.map((g) => (
          <span key={g.genres} className="badge bg-secondary me-2">
            {g.genre}
          </span>
        ))}
        <em>
          {movie.release_date}, {movie.runtime} minutes, Rated{" "}
          {movie.mpaa_rating}
        </em>
        <hr />
      </small>

      {movie.image !== "" && (
        <div className="mb-3">
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.image}`}
            alt="poster"
          />
        </div>
      )}
      <hr />
      <p>{movie.description}</p>
    </div>
  );
};

export default Movie;
