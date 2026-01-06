
import './App.css'
import {useEffect} from "react";

function App() {
    useEffect(() => {
        const API_URL = 'http://localhost:3000/api/data';

        fetch(API_URL)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setError(null);
            })
            .catch((error) => {
                setError(error.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

  return (
    <>

    </>
  )
}

export default App
