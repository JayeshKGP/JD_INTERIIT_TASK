import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/aa')
            .then(response => {
                console.log(response)
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Data from API</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Home;