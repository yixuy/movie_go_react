import { useEffect, useState } from "react";
import {
  data,
  useNavigate,
  useOutlet,
  useOutletContext,
  useParams,
} from "react-router";
import Input from "./form/Input.js";
import Select from "./form/Select";
import TextArea from "./form/TextArea";
import CheckBox from "./form/CheckBox.js";
const EditMovie = () => {
  const navigate = useNavigate();
  const { jwtToken } = useOutletContext();

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);

  const mpaaOptions = [
    { id: "G", value: "G" },
    { id: "PG", value: "PG" },
    { id: "PG13", value: "PG13" },
    { id: "R", value: "R" },
    { id: "NC17", value: "NC17" },
    { id: "18A", value: "18A" },
  ];

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    description: "",
    genres: [],
    genres_array: [Array(13).fill(false)],
  });

  let { id } = useParams();
  if (id === undefined) {
    id = 0;
  }

  useEffect(() => {
    if (jwtToken === "") {
      navigate("/login");
      return;
    }

    if (id === "0") {
      // adding a movie
      setMovie({
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        description: "",
        genres: [],
        genres_array: [Array(13).fill(false)],
      });
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetch(`/genres`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          const checks = [];

          data.forEach((g) => {
            checks.push({ id: g.ID, checked: false, genre: g.genre });
          });

          setMovie((m) => ({
            ...m,
            genres: checks,
            genres_array: [],
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // editing an existing movie
    }
  }, [id, jwtToken, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleCheck = (event, index) => {
    let tempArr = movie.genres;
    tempArr[index].checked = !tempArr[index].checked;
    let tempIDs = movie.genres_array;

    console.log(event);

    if (!event.target.checked) {
      tempIDs.splice(tempIDs.indexOf(event.target.value));
    } else {
      tempIDs.push(parseInt(event.target.value));
    }

    setMovie({
      ...movie,
      genres_array: tempIDs,
    });
  };
  // return a function
  const handleChange = () => (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  return (
    <div className="text-center">
      <h2> Add/Edit Movies </h2>
      <hr />
      <pre> {JSON.stringify(movie, null, 3)}</pre>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={movie.id} id="id"></input>
        <Input
          title={"Title"}
          className={"form-control"}
          type={"text"}
          name={"title"}
          value={movie.title}
          onChange={handleChange("title")}
          errorDiv={hasError("title") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a title"}
        />

        <Input
          title={"Release Date"}
          className={"form-control"}
          type={"date"}
          name={"release_date"}
          value={movie.release_date}
          onChange={handleChange("release_date")}
          errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a release date"}
        />

        <Input
          title={"Runtime"}
          className={"form-control"}
          type={"number"}
          name={"runtime"}
          value={movie.runtime}
          onChange={handleChange("runtime")}
          errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a run time"}
        />

        <Select
          title={"MPAA Rating"}
          name={"mpaa_rating"}
          options={mpaaOptions}
          onChange={handleChange("mpaa_rating")}
          placeHolder={"Choose..."}
          errorMsg={"Please choose "}
          errorDiv={hasError("mpaa_rating") ? "text-danger" : "d-none"}
        />

        <TextArea
          title="Description"
          name={"description"}
          value={movie.description}
          rows={"3"}
          onChange={handleChange("description")}
          errorMsg={"Please enter a description"}
          errorDiv={hasError("description") ? "text-danger" : "d-none"}
        />

        <hr />
        <h3> Genres </h3>

        {movie.genres && movie.genres.length > 1 && (
          <>
            {" "}
            {Array.from(movie.genres).map((g, index) => (
              <CheckBox
                title={g.genre}
                name={"genre"}
                key={index}
                id={"genre-" + index}
                onChange={(event) => handleCheck(event, index)}
                value={g.id}
                checked={movie.genres[index].checked}
              />
            ))}
          </>
        )}
      </form>
    </div>
  );
};

export default EditMovie;
