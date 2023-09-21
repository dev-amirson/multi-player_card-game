import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewGame = () => {
  const [deckId, setDeckId] = useState(null);
  const [players, setPlayers] = useState(2);
  const [submit, setSubmit] = useState(0);

  useEffect(() => {
    const getDeckInformation = async () => {
      if (deckId === null && submit === 1) {
        const getDeck = 'http://localhost:3001/api/match';

        try {
          const response = await axios.post(getDeck, {
            players: players
          });
          setDeckId(response.data.deck_id);
          setSubmit(2);

        } catch (e) {
          console.log(e);
        }
      }
    };

    getDeckInformation();

  }, [deckId, players, submit]);

  const handleClick = () => {
    setSubmit(1);
  };

  const getInput = () => {
    return (
      <div >
        <div>
          <p><b>Generate Game Id here to challenge your Friend!</b></p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleClick}> Get Game ID </button>
      </div>
    )
  };

  const displayOutput = () => {
    return (
      <div>

        <div className="card" >
          <div className="card-header">
           Game Details
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>Game ID: </b> {deckId}</li>
            <li className="list-group-item"> <b>Total Players: </b>{players}</li>
          </ul>
        </div>
      </div>
    )
  };

  return (
    submit === 0 ? getInput() : displayOutput()
  );
}

export default NewGame;
