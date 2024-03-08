import axios from "axios";
import React, { useEffect, useState } from "react";

function Protected() {
  const [err , setErr] = useState('')
  useEffect(() => {
    const fetchData = async () => {
//      const accessToken = localStorage.getItem("accessToken");
      // try {
      //   const response = await axios.get("http://localhost:5050/protected", {
      //     headers: {
      //       authorization: `Bearer ${accessToken}`,
      //     },
      //     withCredentials: true,
      //   });
      //   console.log(response);
      // } catch (error) {
      //   console.log("smth went very wrong");
        try {
         const res = await axios.get("http://localhost:5050/refresh", {
            withCredentials: true
          });
          await axios.get("http://localhost:5050/protected", {
          headers: {
            authorization: `Bearer ${res.data.accessToken}`,
          },
          withCredentials: true,
        });
        
        } catch (err) {   
          console.log("smth went wrong again");
          setErr(err)
        }
      // }
    };
    // setInterval(fetchData(),60000)
    fetchData();
  },[]);
  return err ? <div>Protected</div> : <div>You have acess</div>;;
}

export default Protected;
