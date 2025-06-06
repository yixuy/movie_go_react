import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router";

const Genre = () => {
  const location = useLocation();
  const { genreName } = location.state;
  const [movies, setMovies] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
    fetch(`/movies/genres/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log("Here");
          console.log(data.message);
        } else {
          setMovies(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <h2>Genre: {genreName} </h2>
      <hr />
      {movies ? (
        <table className="table table-striped table-hover">
          <thread>
            <tr>
              <th>Movie</th>
              <th>Release Date</th>
              <th>Rating</th>
            </tr>
          </thread>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id}>
                <td>
                  <Link to={`/movies/${m.id}`}>{m.title}</Link>
                </td>
                <td>{m.release_date}</td>
                <td>{m.mpaa_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p> No movie in this genre </p>
      )}
    </>
  );
};

export default Genre;
