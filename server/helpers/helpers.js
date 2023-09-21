const { getIO } = require('../utils/socket');
const axios = require('axios');
const api = axios.create();

const fetchDeck = async () => {
  const getDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  try{
    const result =  await api.get(getDeck)
    return result.data
  }
  catch(e){
    console.log(e);
  }

}

const drawcards = async (deckId,cardCount)=>{
  const draw = "https://deckofcardsapi.com/api/deck/" + deckId +"/draw/?count="+cardCount;

  try {
    const result = await api.get(draw)
    return result.data
  }
  catch (e) {
    console.log(e);
  }

}

const incrementTurn = (totalPlayers, turn) =>{
  if(turn  < totalPlayers ){
    return turn + 1;
  }
  return 0;
}

const simulateMatch = (socketId, clients, deckId)=>{
  const io = getIO();
}

const checkForA = (cards)=>{
  let check = false;
  for(let i=0; i<cards.length; i++){
    if(cards[i].code[0]== "A"){
      check = true;
    }
  }
  return check;
}

module.exports = {
  fetchDeck,
  drawcards,
  simulateMatch,
  incrementTurn,
  checkForA
}
