
import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [user, setUser] = useState<string>('');
    useEffect(() => {
        const API_URL = 'http://localhost:3000/';

        fetch(API_URL)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUser(data.item);
            })
            .finally(() => {
                // setLoading(false);
            });
    }, []);

  return (
    <>
        <p>{user}</p>
    </>
  )
}

export default App
