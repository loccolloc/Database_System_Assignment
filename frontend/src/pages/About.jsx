import React, { useEffect, useState } from "react";
import axios from "../api/axios";

// GET request to /demo
const About = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/demo")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

export default About;
