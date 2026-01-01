import { useState } from "react";

 const GameItem = ({ game, updateScore, deleteGame }) => {
    const [localScore, setLocalScore] = useState("");
    const [inputError, setInputError] = useState("");

    const scores = game.score.includes("-") ? game.score.split("-") : [0,0];
    const homeScore = parseInt(scores[0]) || 0;
    const awayScore = parseInt(scores[1]) || 0;

    const isHomeLeading = homeScore > awayScore;
    const isAwayLeading = awayScore > homeScore;

    return (
        <li key={game.id} className={`stats-item ${game.status.toLowerCase().trim()}`} >
            <div className="game-info">
                <strong>
                    <span className={isHomeLeading ? "Leader" : ""}> {game.homeTeam} </span>
                       {"vs"} 
                    <span className={isAwayLeading ? "Leader" : ""}> {game.awayTeam} </span>   
                </strong>
                <span className="game-score">{game.score} </span>
                <em className={`game-status ${game.status.toLowerCase().trim()}`}>
                    {game.status.toLowerCase().trim() === "live" && <span className="live-dot"></span>}
                    ({game.status})
                </em>
            </div>
            <input
                type="text"
                placeholder="New score..."
                value={localScore}
                className={inputError ? "input-error" : "input-standard"}
                onChange={(e) =>{
                    const val = e.target.value;
                    setLocalScore(val);
                    const hasLetters = /[a-zA-Zא-ת]/.test(val);
                    setInputError(hasLetters);
                }}               
            />
            {inputError && <p style={{color: "red", fontSize:"12px"}}> Please enter only digits between 0-99 </p>}
            <button
             disabled={inputError || !localScore}
             onClick= {() => {
            updateScore(game.id, localScore);
            setLocalScore("");            
            }}
             className="update-btn"> Update Score </button>
             <button
             className="reset-btn"
             onClick= {() =>{
                updateScore(game.id, "0-0", "Upcoming");
                setLocalScore("");
             }}
             > Reset Score </button>
            <button onClick={() => deleteGame(game.id)} className="delete-btn"> X </button>
        </li>
    )
}

export default GameItem;