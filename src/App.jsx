import { useState, useEffect } from 'react'
import GameItem from './GameItem';
import './App.css'

const API_URL = "https://jsonplaceholder.typicode.com/todos";

function App() {

  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeName, setHomeName] = useState("");
  const [awayName, setAwayName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  const getGames = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/src/data/games.json');
      //const data = await response.json();
      //setStats(data);
      if (!response.ok) {
        throw new Error('Could not load local games data');
      }
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
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
      id: Date.now(),
      homeTeam: homeName,
      awayTeam: awayName,
      score: "0-0",
      status: " Upcoming"
    };

    setStats([...stats, newGame]);
    setHomeName("");
    setAwayName("");
  }

  const updateScore = (id, newVal, newStatus = "Live") => {
    if (!newVal) return;
    const updatedStats = stats.map((game) => {
      if (game.id == id) {
        return { ...game, score: newVal,  status: newStatus };
      }
      return game;
    });

    setStats(updatedStats);
  }

  useEffect(() => {
    getGames();
  }, []);

  const filteredGames = stats.filter(game => 
    game.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) || game.awayTeam.toLowerCase().includes(searchTerm.toLowerCase())); 

  const sortedStats = [...filteredGames].sort((a,b) => {
    if (a.status.trim().toLowerCase() === "live") return -1;
    if (b.status.trim().toLowerCase() === "live") return 1;
    return 0;
  });

  return (
    <>
      <header>
        <h1>Euroleage stats tracker!</h1>
        <button onClick={getGames} className="refresh-btn">
          {isLoading ? 'Refreshing...' : 'Refresh Scores'}
        </button>
      </header>
      <main>
        {isLoading && <p>Loading stats</p>}
        {error && <p style={{ color: "red" }}> Error:{error} </p>}
        {!isLoading && !error && (
          <div>
            <h2>Succesfully fetched {stats.length} items.</h2>
            <input value={homeName} onChange={(e) => setHomeName(e.target.value)} placeholder="Home Team" />
            <input value={awayName} onChange={(e) => setAwayName(e.target.value)} placeholder="Away Team" />
            <button onClick={addGame}> Add Game </button>
            <div className="search-container">
              <input
              type="text"
              placeholder="Search Teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              />
            </div>
            {stats.length === 0 ? (
              <div className="empty-state">
                <p>No games tracked yet. add one above!</p>
              </div>  
            ) : (             
              <ul className="stats-list">
              {sortedStats.map((game) => (
                <GameItem
                  key={game.id}
                  game={game}
                  updateScore={updateScore}
                  deleteGame={deleteGame}
                />
              ))}
            </ul>
            )}
            <p>Ready to display basketball data!</p>
          </div>
        )}
      </main>

    </>
  );
}


export default App
