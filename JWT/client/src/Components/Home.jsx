import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5050/");
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
        </div>
    );
}

export default Home;
