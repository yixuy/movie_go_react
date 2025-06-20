import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router";

const ManageCatalogue = () => {
  const [movies, setMovies] = useState([]);
  const { jwtToken } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtToken === "") {
      navigate("/login");
      return;
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // check Authorization
    headers.append("Authorization", "Bearer " + jwtToken);

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`/admin/movies`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jwtToken, navigate]);

  return (
    <div className="text-center">
      <h2> Movies Catalogue</h2>
      <hr />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th> Movie </th>
            <th> Release Date</th>
            <th> Rating </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td>
                <Link to={`/admin/movie/${m.id}`}>{m.title}</Link>
              </td>
              <td> {m.release_date}</td>
              <td> {m.mpaa_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCatalogue;
