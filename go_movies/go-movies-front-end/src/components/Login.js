import { useState } from "react";
import Input from "./form/input";
import { useNavigate, useOutletContext } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setJwtToken } = useOutletContext();
  const { setAlertMessage } = useOutletContext();
  const { setAlertClass } = useOutletContext();
  const { toggleRefresh } = useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("email/pass", email, password);

    // if (email === "admin@example.com"){
    //     setJwtToken("abc");
    //     setAlertClass("d-none");
    //     setAlertMessage("");
    //     navigate("/");
    // }else{
    //     setAlertClass("alert-danger");
    //     setAlertMessage("Invalid credential");
    // }
    let payload = {
      email: email,
      password: password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // if you use cookies/sessions
      body: JSON.stringify(payload),
    };

    fetch("/authenticate", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlertClass("alert-danger");
          setAlertMessage(data.Message);
        } else {
          setJwtToken(data.access_token);
          setAlertClass("d-none");
          setAlertMessage("");
          toggleRefresh(true);
          navigate("/");
        }
      })
      .catch((error) => {
        setAlertClass("alert-danger");
        setAlertMessage(error);
      });
  };

  return (
    <div className="text-center">
      <h2> Login </h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <Input
          title="Email Address"
          type="email"
          className="form-control"
          name="email"
          autoComplete="email-new"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          title="Password"
          type="password"
          className="form-control"
          name="password"
          autoComplete="password-new"
          onChange={(event) => setPassword(event.target.value)}
        />

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </div>
  );
};

export default Login;
