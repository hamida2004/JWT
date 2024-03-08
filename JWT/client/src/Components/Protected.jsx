import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Permission from "./Permission.jsx";

function Protected() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5050/refresh", {
          withCredentials: true,
        });

        // Fetch protected data using the access token
        const resp = await axios.get("http://localhost:5050/protected", {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        console.log(resp.data);
        // const data = (resp)=>{
        //   setRoles(resp.data);
        // }
        // await data();
        setRoles(resp.data); // Assuming the roles are in `resp.data`
      } catch (err) {
        setError("Unauthorized"); // Set error message
        navigate("/login"); // Redirect to login page
      }
    };

    fetchData();
  }, [navigate]); // Added navigate to the dependency array to avoid linting warnings

  return (
    <div>
      {error ? (
        <h1>Protected Content</h1>

      ) : (
        <div>
          <Permission roles={roles} />
        </div>
      )}
    </div>
  );
}

export default Protected;
