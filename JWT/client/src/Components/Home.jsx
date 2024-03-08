import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const logout = async ()=>{
        await axios.get("http://localhost:5050/auth/logout", {
                    withCredentials: true
                  });
        navigate('/login')
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5050/", {
                    withCredentials: true
                  });
                setData(response.data.users);
                console.log(response.data.users); // Log response data here
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            
            {data.length > 0 ? (
                data.map((user, index) => ( // Adding unique key prop to each element
                    <div key={index}>
                        <h1>{user.name}</h1>
                        <h2>{user.email}</h2>
                    </div>
                ))
            ) : (
                <p>Loading ...</p>
            )}
            <button onClick={logout}>logout</button>
        </div>
    );
}

export default Home;
