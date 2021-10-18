import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./About.css"

function About() {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <div className="about">
      <h1>About ME</h1>
      <div className="inner_about" > 
        <form>
          <label htmlFor="">Name :</label>
          <input type="text" value={userData.name} id="name" />
          <br />
          <label htmlFor="">Email :</label>
          <input type="text" value={userData.email} id="email" />
          <br />
          <label htmlFor="">Password: </label>
          <input type="text" value={userData.password} id="password" />
          <br />
          <label htmlFor="">Phone : </label>
          <input type="text" value={userData.phone} id="phone" />
        </form>
      </div>
    </div>
  );
}

export default About;
