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
        //const data = await response.json();
        //setStats(data);
        if(!response.ok){
          throw new Error(`\ HTTP error! Status: ${response.status}`);
        }else{
          const data = await response.json();
          setStats(data);
        }
      } catch(err) {
        console.error("Fetching failed:", err);
        setError(err.message);
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
        {isLoading && <p>Loading stats</p>}
        {error && <p style={{color: "red"}}> Error:{error} </p>}
        {!isLoading && !error && (
          <div>
            <h2>Succesfully fetched {stats.length} items.</h2>
            <ul className="stats-list">
              {stats.slice(0,10).map((item) => (
                <li key={item.id} className="stats-item">
                  {item.title}
                </li>
              ))}
            </ul>
            <p>Ready to display basketball data!</p>
          </div>
        )}
      </main>

    </>
  )
}

export default App
