import { useState, useEffect } from "react";
import { Link } from "react-router";
const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch("/genres", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setGenres(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  if (error !== null) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="text-center">
      <h2> Genres </h2>
      <hr />

      <div className="list-group">
        {genres.map((g) => (
          <Link
            key={g.ID}
            className="list-group-item list-group-item-action"
            to={`/genres/${g.ID}`}
            state={{
              genreName: g.genre,
            }}
          >
            {g.genre}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genres;
