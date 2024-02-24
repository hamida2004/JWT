import axios from "axios";
import React, { useEffect, useState } from "react";

function Protected() {
  const [err, setErr] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get("http://localhost:5050/protected", {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (error) {
        console.log("smth went very wrong");
        try {
          await axios.get("http://localhost:5050/refresh");
        } catch (err) {
          console.log("smth went wrong again");
          
        }
      }
    };

    fetchData();
  }, []);
  return <div>Protected</div>;
}

export default Protected;
