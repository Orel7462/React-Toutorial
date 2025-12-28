import { useState, useEffect } from 'react'

import './App.css'

const API_URL = "https://jsonplaceholder.typicode.com/todos";

function App() {

  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeName, setHomeName] = useState("");
  const [awayName, setAwayName] = useState("");
  const [newScore, setNewScore] = useState("");

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

  const addGame = () => {
    const newGame = { 
      id:  Date.now(),
      homeTeam: homeName,
      awayTeam: awayName,
      score: "0-0",
      status:" Upcoming"
    };

    setStats([...stats, newGame]);
    setHomeName("");
    setAwayName("");
  }

  const updateScore = (id) => {
    if(!newScore) return;
    const updatedStats = stats.map((game) => {
      if (game.id == id){
        return{...game, score: newScore, status:"Live"};
      }
      return game;
    });
    
    setStats(updatedStats);
    setNewScore("");
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
            <input value= {homeName} onChange={(e) => setHomeName(e.target.value)} placeHolder= "Home Team"/>
            <input value= {awayName} onChange={(e) => setAwayName(e.target.value)} placeholder= "Away Team"/>
            <button onClick= {addGame}> Add Game </button>
            <ul className="stats-list">
              {stats.map((game) => (
                <li key={game.id} className="stats-item">
                  <div className="game-info">
                    <strong>{game.homeTeam} vs {game.awayTeam}</strong>
                    <span className="game-score">{game.score}</span>
                    <em className="game-status">({game.status})</em>
                  </div>
                  <input 
                    type="text"
                    placeholder="New score..."
                    
                    onBlur={(e) => setNewScore(e.target.value)}
                  /> 
                  <button onClick={() => updateScore(game.id)} className="update-btn"> Update Score </button>
                  <button onClick={() => deleteGame(game.id)} className="delete-btn"> X </button>
                </li>
              ))}
            </ul>
            <p>Ready to display basketball data!</p>
          </div>
        )}
      </main>

    </>
  );
 }


export default App
