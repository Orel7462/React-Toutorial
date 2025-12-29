import { useState } from "react";

 const GameItem = ({ game, updateScore, deleteGame }) => {
    const [localScore, setLocalScore] = useState("");

    return (
        <li key={game.id} className="stats-item">
            <div className="game-info">
                <strong>{game.homeTeam} vs {game.awayTeam}</strong>
                <span className="game-score">{game.score}</span>
                <em className="game-status">({game.status})</em>
            </div>
            <input
                type="text"
                placeholder="New score..."
                value={localScore}
                onChange={(e) => setNewScore(e.target.value)}
            />
            <button onClick= {() => {
            updateScore(game.id, localScore);
            setLocalScore("");            
            }}
             className="update-btn"> Update Score </button>
            <button onClick={() => deleteGame(game.id)} className="delete-btn"> X </button>
        </li>
    )
}

export default GameItem;