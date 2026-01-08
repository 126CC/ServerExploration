
import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [user, setUser] = useState<{email: string, password: string, id: number}[]>([]);
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
    </>
  )
}

export default App
