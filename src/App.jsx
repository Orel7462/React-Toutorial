import { useState, useEffect } from 'react'

import './App.css'

const API_URL = "https://jsonplaceholder.typicode.com/todos";

function App() {

  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        if(!response.ok){
          throw new Error(`\ HTTP error! Status: ${response.status}`);
        }
      } catch {
        console.error("Fetching failed:", error);
        setError(error.message);
        setStats([]);

      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <header>
        <h1>Euroleage stats tracker!</h1>
      </header>
      <main>
        <p>Data will be loaded here using fetch and REST API.</p>
      </main>

    </>
  )
}

export default App
