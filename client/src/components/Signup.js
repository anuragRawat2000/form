import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const { name, email, phone, password, cpassword } = user;
    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
      }),
    });

    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("invalid registration");
      console.log("invalid registration");
    } else {
      window.alert("registration");
      console.log("registration");
      history.push("/login");
    }
  };
  return (
    <div className="signup">
      <form method="POST">
        <h1>signup</h1>
        <input
          value={user.name}
          onChange={handleInputs}
          type="text"
          name="name"
          id=""
          placeholder="name"
        />
        <br />
        <input
          value={user.email}
          onChange={handleInputs}
          type="email"
          name="email"
          id=""
          placeholder="email"
        />
        <br />
        <input
          value={user.phone}
          onChange={handleInputs}
          type="number"
          name="phone"
          id=""
          placeholder="phone"
        />
        <br />
        <input
          value={user.password}
          onChange={handleInputs}
          type="password"
          name="password"
          id=""
          placeholder="password"
        />
        <br />
        <input
          value={user.cpassword}
          onChange={handleInputs}
          type="password"
          name="cpassword"
          id=""
          placeholder="cpassword"
        />
        <br />
        <div className="button" >
          <button onClick={handleClick}>Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
