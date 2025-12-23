import { useState, useEffect } from 'react'

import './App.css'

const API_URL = "https://jsonplaceholder.typicode.com/todos";

function App() {

  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGames = async () => {
    try {
        setIsLoading(true);
        const response = await fetch('/src/data/games.json');
        //const data = await response.json();
        //setStats(data);
        if(!response.ok){
          throw new Error('Could not load local games data');
        }
        const data = await response.json();
        setStats(data);
        setError(null);
      } catch(err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

  const deleteGame = (id) => {
    const updatedGames = stats.filter(game => game.id !== id);
    setStats(updatedGames);
  }  
   
  useEffect(() => {
    getGames();      
  }, []);

  return(
    <>
      <header>
        <h1>Euroleage stats tracker!</h1>
        <button onClick={getGames} className="refresh-btn">
          {isLoading ? 'Refreshing...' : 'Refresh Scores'}
        </button>
      </header>
      <main>
        {isLoading && <p>Loading stats</p>}
        {error && <p style={{color: "red"}}> Error:{error} </p>}
        {!isLoading && !error && (
          <div>
            <h2>Succesfully fetched {stats.length} items.</h2>
            <ul className="stats-list">
              {stats.map((game) => (
                <li key={game.id} className="stats-item">
                  <div className="game-info">
                    <strong>{game.homeTeam} vs {game.awayTeam}</strong>
                    <span className="game-score">{game.score}</span>
                    <em className="game-status">({game.status})</em>
                  </div>
                  <button onClick={() => deleteGame(game.id)} className="delete-btn">
                    X
                  </button>
                  
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
