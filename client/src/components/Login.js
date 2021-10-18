import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("invalid");
      console.log("invalid");
    } else {
      window.alert("login successfull");
      console.log("login successfull");
      history.push("/");
    }
  };

  return (
    <div className="login">
      <form method="POST">
        <div className="heading" >
          <h1>Login</h1>
        </div>

        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
          name=""
          id=""
          placeholder="email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          name=""
          id=""
          placeholder="password"
        />
        <div className="button">
          <button onClick={handleClick}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
