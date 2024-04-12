import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HomePage(){
    const [data, setData] = useState(null);

    useEffect(() => {
        // 在這裡發送 GET 請求
        axios.get('http://localhost:5000')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            {data !== null && <h2>{data}</h2>}
        </div>
    );
}