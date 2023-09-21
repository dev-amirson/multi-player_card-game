import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlayGame = (props) => {
  const { socket } = props;
  // States
  const [socketInstance, setsocketInstance] = useState(socket)
  const [totalPlayers, settotalPlayers] = useState(null)
  const [playersJoined, setplayersJoined] = useState(null)
  const [gameId, setgameId] = useState(null);
  const [submit, setSubmit] = useState(0);
  const [cards, setcards] = useState([]);
  const [myTurn, setmyTurn] = useState(null);
  const [clients, setclients] = useState(null);
  const [playerOnePoints, setplayerOnePoints] = useState(0);
  const [playerTwoPoints, setplayerTwoPoints] = useState(0);
  const [currentTurn, setcurrentTurn] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const startMatch = async () => {
      if (submit === 1) {
        const endpoint = 'http://localhost:3001/api/match/startMatch';

        try {
          const response = await axios.post(endpoint, {
            socketId: socket.id,
            gameId: gameId,
          });
          settotalPlayers(response.data.totalPlayers)
          setSubmit(2);
        } catch (e) {
          console.log(e);
        }
      }
    };

    startMatch();

  }, [ gameId, submit]);

  const getCodeOnClick = () => {
    if (gameId !=null){
      setSubmit(1);
    }
  };

  const getInput = () => {
    return (
      <div>
        <div class="card" >
          <div class="card-header">
            Please enter the ID of game you want to join
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <input onChange={(event) => {
                if (gameId !== "") {
                  setgameId(event.target.value);
                }
              }} />
            </li>
            <li className="list-group-item">
              <button button type="button" class="btn btn-primary" onClick={getCodeOnClick}> Submit </button>
            </li>
          </ul>
        </div>

      </div>
    )
  };

  useEffect(() => {
    if (clients !== null) {
      if (!myTurn) {
        for(let i = 0; i < clients.length; i++){
          if(clients[i] == socketInstance.id){
            setmyTurn(i);
            break;
          }
        }
      }
    }
  }, )

  const joinOnClick = () => {
    if (submit == 2) {
      socketInstance.emit("join_room", gameId);

      socketInstance.on("get_total_users_joined", (data) => {
        setplayersJoined(data.totalUsersInRoom)
        setclients(data.clients)
      })
      setSubmit(3)
    }
  };

  const displayOutput = () => {
    return (
      <div>
        <div class="card" >
          <div class="card-header">
            <b>Game ID: </b>{gameId}
          </div>
          <ul className="list-group list-group-flush">

            <li className="list-group-item">
              <button type="button" class="btn btn-primary" onClick={joinOnClick}> START GAME </button>
            </li>
          </ul>
        </div>
      </div>
    )
  };
  const waiting = ()=>{
    return(
      <div style = {{marginTop:"10%"}}>
        <h1 style={{color: "red"}}>Waiting for All Players</h1>
      </div>
    )
  }

  useEffect(() => {
    if(submit == 3){
      if (totalPlayers == playersJoined){
        setSubmit(4)
      }
    }
  },[playersJoined])

  useEffect(() => {
      socket.on("currentTurn", (data) => {
        setcurrentTurn(data.currentTurn)
    })
  },[currentTurn])

  useEffect(() => {

      socket.on("getPoints", (data) => {
        if(submit ==4 ){
          setplayerOnePoints(data.playerOnePoints)
          setplayerTwoPoints(data.playerTwoPoints)
        }
      })
  }, )

  useEffect(() => {
    if (submit == 5) {
      socketInstance.emit("requestCards",{myTurn, totalPlayers, cards, playerOnePoints, playerTwoPoints});

      socket.on("initialCards", (data) => {
        setcards([...cards,...data])
      })
      setSubmit(4);
    }
  }, )

  const drawOnClick = ()=>{
    if(currentTurn == myTurn){
      setSubmit(5);
    }
  }

  const startGame = () => {
    return (
      <div>
        <div>
          <div className="card" >
            <div className="card-header">
              <b style={{background:"yellow"}}>Player 1 Score: </b> {playerOnePoints} -+-+-+-+-+-+-+-+-+-+-+-+-+ <b style = {{background:"yellow"}}>Player 2 Score: </b> {playerTwoPoints}
            </div>
          </div>
        </div>
        <br/>


        <div className="card" >
          <div className="card-header">
            <b>You are Player # </b>{myTurn + 1}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              It is
              {currentTurn == myTurn? <b >  Your Turn</b> : <b> Opponent Turn</b>}
            </li>
            <li className="list-group-item">
              <button type="button" class="btn btn-primary" onClick={drawOnClick}> Draw Card </button>
            </li>
          </ul>
        </div>

        <div className="card" >
          <div className="card-header">
            <b>Your Cards</b>
          </div>

        </div>

        <div className="row">
          {cards.map((card, index) => (
            <div className="col-md-3" key={index}>
              <div className="card mb-6">
                <img
                  src={card.image}
                  className="card-img-top"
                  alt={card.code}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.code}</h5>
                  <p className="card-text">{card.suit} {card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div >
      </div>
    )
  }

  useEffect(() =>{
    if(winner == null){
      if(playerOnePoints >0 ){
        setWinner(0);
        setSubmit(6);
      }
      else if (playerTwoPoints > 0) {
        setWinner(1);
        setSubmit(6);
      }
    }
  })

  const gameEnd = ()=>{
    return (
      <div>
        <div>
          <div className="card" >
            <div className="card-header">
              <b>Player 1 Score: </b>{playerOnePoints} -------------- <b>Player 2 Score: </b>{playerTwoPoints}
            </div>
          </div>

          <div className="card" >
            <div className="card-header">
              {winner == myTurn ? <b>Congratulations!!---You WON!!</b> : <b>Better Luck Next Time!</b>}
            </div>
          </div>
        </div>
        <br />


        <div className="card" >
          <div className="card-header">
            <b>Your Cards</b>
          </div>
        </div>

        <div className="row">
          {cards.map((card, index) => (
            <div className="col-md-3" key={index}>
              <div className="card mb-6">
                <img
                  src={card.image}
                  className="card-img-top"
                  alt={card.code}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.code}</h5>
                  <p className="card-text">{card.suit} {card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div >

      </div>
    )

  }

  if (submit === 0) {return getInput()}
  else if (submit === 1 || submit === 2 ) {return displayOutput()}
  else if (submit === 3) { return waiting() }
  else if (submit === 4) { return startGame() }
  else if (submit === 6) { return gameEnd() }

}

export default PlayGame;

